import { db } from "../../helpers/db";
import { getServerUserSession } from "../../helpers/getServerUserSession";
import { schema } from "./gallery_POST.schema";
import superjson from "superjson";
import * as storage from "@floot/storage";
import { nanoid } from "nanoid";

export async function handle(request:Request){
  try{
    const {user}=await getServerUserSession(request);
    if(user.role!=="admin") return new Response(superjson.stringify({message:"Forbidden"}),{status:403});
    const input=schema.parse(superjson.parse(await request.text()));
    if(input.action==="prepare_upload"){
      const safeName=input.fileName.toLowerCase().replace(/[^a-z0-9._-]+/g,"-").slice(-120) || "photo.jpg";
      const key=`gallery/${nanoid(14)}-${safeName}`;
      const result=await storage.upload({visibility:"public",filename:key,contentType:input.contentType,sizeBytes:input.sizeBytes});
      if(!result.ok) throw new Error(result.error.message);
      if(input.featured) await db.updateTable("galleryPhotos").set({featured:false}).execute();
      await db.insertInto("galleryPhotos").values({imageUrl:result.url,storageKey:key,caption:input.caption??"",featured:input.featured??false}).execute();
      return new Response(superjson.stringify({ok:true,presignedUrl:result.presignedUrl,url:result.url}),{headers:{"Content-Type":"application/json"}});
    }
    if(input.action==="delete_photo"){
      const photo=await db.selectFrom("galleryPhotos").select(["storageKey"]).where("id","=",input.id).executeTakeFirst();
      if(photo) await storage.remove({visibility:"public",filename:photo.storageKey});
      await db.deleteFrom("galleryPhotos").where("id","=",input.id).execute();
    }
    if(input.action==="set_featured"){
      if(input.featured) await db.updateTable("galleryPhotos").set({featured:false}).execute();
      await db.updateTable("galleryPhotos").set({featured:input.featured}).where("id","=",input.id).execute();
    }
    return new Response(superjson.stringify({ok:true,message:"Gallery updated."}),{headers:{"Content-Type":"application/json"}});
  }catch(error){
    return new Response(superjson.stringify({ok:false,message:error instanceof Error?error.message:"Gallery action failed."}),{status:400});
  }
}