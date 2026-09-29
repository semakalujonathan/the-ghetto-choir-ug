import {body,requireAdmin,json} from "../../_shared";
export const onRequestGet=async({request,env}:any)=>{
 if(!await requireAdmin(request,env))return json({message:"Unauthorized"},401);
 const [events,announcements,auditions,messages,gallery]=await Promise.all([
  env.DB.prepare("SELECT id,title,event_date AS eventDate,venue,description,created_at AS createdAt FROM events ORDER BY event_date ASC").all(),
  env.DB.prepare("SELECT id,title,body,created_at AS createdAt FROM announcements ORDER BY created_at DESC").all(),
  env.DB.prepare("SELECT id,full_name AS fullName,age,phone,email,experience,created_at AS createdAt FROM auditions ORDER BY created_at DESC").all(),
  env.DB.prepare("SELECT id,name,phone,email,message,created_at AS createdAt FROM messages ORDER BY created_at DESC").all(),
  env.DB.prepare("SELECT id,image_url AS imageUrl,caption,featured,created_at AS createdAt FROM gallery ORDER BY created_at DESC").all()
 ]);
 return json({events:events.results||[],announcements:announcements.results||[],auditions:auditions.results||[],messages:messages.results||[],gallery:(gallery.results||[]).map((p:any)=>({...p,featured:Boolean(p.featured)}))});
};
export const onRequestPost=async({request,env}:any)=>{
 if(!await requireAdmin(request,env))return json({ok:false,message:"Unauthorized"},401);
 const b=await body<any>(request);
 try{
  if(b.action==="create_event")await env.DB.prepare("INSERT INTO events(title,event_date,venue,description) VALUES(?,?,?,?)").bind(b.title,b.eventDate,b.venue,b.description||"").run();
  else if(b.action==="delete_event")await env.DB.prepare("DELETE FROM events WHERE id=?").bind(b.id).run();
  else if(b.action==="create_announcement")await env.DB.prepare("INSERT INTO announcements(title,body) VALUES(?,?)").bind(b.title,b.body).run();
  else if(b.action==="delete_announcement")await env.DB.prepare("DELETE FROM announcements WHERE id=?").bind(b.id).run();
  else return json({ok:false,message:"Unsupported action."},400);
  return json({ok:true,message:"Saved successfully."});
 }catch{return json({ok:false,message:"Could not save that change."},500)}
};