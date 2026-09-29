import {body,verifyPassword,createSession,setSessionCookie,json} from "../../_shared";
export const onRequestPost=async({request,env}:any)=>{
 try{
  const b=await body<{email:string;password:string}>(request);
  const row=await env.DB.prepare("SELECT id,email,display_name,role,password_hash,password_salt FROM users WHERE lower(email)=lower(?)").bind(b.email).first<any>();
  if(!row||!(await verifyPassword(b.password,row.password_salt,row.password_hash)))return json({message:"Invalid email or password."},401);
  const token=await createSession(row.id,env);
  return json({user:{id:row.id,email:row.email,displayName:row.display_name,role:row.role}},200,{"Set-Cookie":setSessionCookie(token)});
 }catch{return json({message:"Login failed."},500)}
};