import {body,hashPassword,createSession,setSessionCookie,json} from "../../_shared";
export const onRequestPost=async({request,env}:any)=>{
 try{
  const count=await env.DB.prepare("SELECT COUNT(*) AS n FROM users").first<any>();
  if(Number(count?.n||0)>0)return json({message:"Admin setup has already been completed."},409);
  const b=await body<{displayName:string;email:string;password:string}>(request);
  if(!b.displayName||!b.email||!b.password)return json({message:"All fields are required."},400);
  const p=await hashPassword(b.password);
  const r=await env.DB.prepare("INSERT INTO users(email,display_name,password_hash,password_salt,role) VALUES(?,?,?,?,?)").bind(b.email.trim().toLowerCase(),b.displayName.trim(),p.hash,p.salt,"admin").run();
  const id=Number(r.meta.last_row_id); const token=await createSession(id,env);
  return json({user:{id,email:b.email.trim().toLowerCase(),displayName:b.displayName.trim(),role:"admin"}},200,{"Set-Cookie":setSessionCookie(token)});
 }catch{return json({message:"Could not create admin account."},500)}
};