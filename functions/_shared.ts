export type Env={DB:D1Database;BUCKET:R2Bucket};
export const json=(data:unknown,status=200,headers:Record<string,string>={})=>new Response(JSON.stringify(data),{status,headers:{"Content-Type":"application/json; charset=utf-8",...headers}});
export async function body<T>(request:Request):Promise<T>{return await request.json() as T}
const enc=new TextEncoder();
const hex=(bytes:ArrayBuffer)=>Array.from(new Uint8Array(bytes)).map(b=>b.toString(16).padStart(2,"0")).join("");
const bytes=(hexString:string)=>{const a=new Uint8Array(hexString.length/2);for(let i=0;i<a.length;i++)a[i]=parseInt(hexString.slice(i*2,i*2+2),16);return a};
export async function sha256(value:string){return hex(await crypto.subtle.digest("SHA-256",enc.encode(value)))}
export async function hashPassword(password:string,saltHex?:string){const salt=saltHex?bytes(saltHex):crypto.getRandomValues(new Uint8Array(16));const key=await crypto.subtle.importKey("raw",enc.encode(password),"PBKDF2",false,["deriveBits"]);const bits=await crypto.subtle.deriveBits({name:"PBKDF2",salt,iterations:100000,hash:"SHA-256"},key,256);return {salt:hex(salt.buffer),hash:hex(bits)}}
export async function verifyPassword(password:string,salt:string,expected:string){const result=await hashPassword(password,salt);return result.hash===expected}
export function cookieValue(request:Request,name:string){const header=request.headers.get("Cookie")||"";const match=header.split(";").map(v=>v.trim()).find(v=>v.startsWith(name+"="));return match?decodeURIComponent(match.slice(name.length+1)):null}
export async function sessionUser(request:Request,env:Env){const token=cookieValue(request,"ghetto_session");if(!token)return null;const hash=await sha256(token);const row=await env.DB.prepare("SELECT u.id,u.email,u.display_name,u.role FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.token_hash=? AND s.expires_at>datetime('now')").bind(hash).first<any>();return row?{id:row.id,email:row.email,displayName:row.display_name,role:row.role as "admin"|"user"}:null}
export async function requireAdmin(request:Request,env:Env){const user=await sessionUser(request,env);return user&&user.role==="admin"?user:null}
export function setSessionCookie(token:string){return "ghetto_session="+encodeURIComponent(token)+"; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800"}
export function clearSessionCookie(){return "ghetto_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0"}
export async function createSession(userId:number,env:Env){const raw=hex(crypto.getRandomValues(new Uint8Array(32)).buffer);const hash=await sha256(raw);await env.DB.prepare("INSERT INTO sessions(token_hash,user_id,expires_at) VALUES(?,?,datetime('now','+7 days'))").bind(hash,userId).run();return raw}