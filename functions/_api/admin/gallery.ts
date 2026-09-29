import {requireAdmin,json,body} from "../../_shared";
const safe=(name:string)=>name.toLowerCase().replace(/[^a-z0-9._-]+/g,"-").slice(-120);
export const onRequestPost=async({request,env}:any)=>{
 const admin=await requireAdmin(request,env); if(!admin)return json({ok:false,message:"Unauthorized"},401);
 try{
  const type=request.headers.get("content-type")||"";
  if(type.includes("multipart/form-data")){
   const form=await request.formData(); const file=form.get("file"); const caption=String(form.get("caption")||"");
   if(!(file instanceof File))return json({ok:false,message:"No image received."},400);
   if(!["image/jpeg","image/png","image/webp"].includes(file.type))return json({ok:false,message:"Only JPG, PNG and WebP images are allowed."},400);
   if(file.size>100*1024*1024)return json({ok:false,message:"Image is larger than 100MB."},400);
   const key="gallery/"+Date.now()+"-"+crypto.randomUUID()+"-"+safe(file.name);
   await env.BUCKET.put(key,file.stream(),{httpMetadata:{contentType:file.type}});
   await env.DB.prepare("INSERT INTO gallery(object_key,image_url,caption) VALUES(?,?,?)").bind(key,"/media/"+key,caption).run();
   return json({ok:true,message:"Photo added to the gallery."});
  }
  const b=await body<any>(request);
  if(b.action==="delete_photo"){const p=await env.DB.prepare("SELECT object_key FROM gallery WHERE id=?").bind(b.id).first<any>();if(p?.object_key)await env.BUCKET.delete(p.object_key);await env.DB.prepare("DELETE FROM gallery WHERE id=?").bind(b.id).run();return json({ok:true,message:"Photo deleted."});}
  if(b.action==="set_featured"){await env.DB.prepare("UPDATE gallery SET featured=0").run();if(b.featured)await env.DB.prepare("UPDATE gallery SET featured=1 WHERE id=?").bind(b.id).run();return json({ok:true,message:"Gallery updated."});}
  return json({ok:false,message:"Unsupported gallery action."},400);
 }catch{return json({ok:false,message:"Gallery operation failed."},500)}
};