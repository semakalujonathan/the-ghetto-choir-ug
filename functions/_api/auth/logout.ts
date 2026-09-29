import {cookieValue,sha256,clearSessionCookie,json} from "../../_shared";
export const onRequestPost=async({request,env}:any)=>{
 const token=cookieValue(request,"ghetto_session");
 if(token)await env.DB.prepare("DELETE FROM sessions WHERE token_hash=?").bind(await sha256(token)).run();
 return json({success:true,message:"Signed out."},200,{"Set-Cookie":clearSessionCookie()});
};