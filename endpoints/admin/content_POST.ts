import { db } from "../../helpers/db";
import { getServerUserSession } from "../../helpers/getServerUserSession";
import { schema } from "./content_POST.schema";
import superjson from "superjson";
export async function handle(request:Request){
  try{
    const {user}=await getServerUserSession(request);
    if(user.role!=="admin") return new Response(superjson.stringify({message:"Forbidden"}),{status:403});
    const input=schema.parse(superjson.parse(await request.text()));
    if(input.action==="create_event") await db.insertInto("events").values({title:input.title!,eventDate:new Date(input.eventDate!),venue:input.venue!,description:input.description??"",status:"upcoming"}).execute();
    if(input.action==="update_event") await db.updateTable("events").set({title:input.title!,eventDate:new Date(input.eventDate!),venue:input.venue!,description:input.description??""}).where("id","=",input.id!).execute();
    if(input.action==="delete_event") await db.deleteFrom("events").where("id","=",input.id!).execute();
    if(input.action==="create_announcement") await db.insertInto("announcements").values({title:input.title!,body:input.body!,published:true}).execute();
    if(input.action==="update_announcement") await db.updateTable("announcements").set({title:input.title!,body:input.body!}).where("id","=",input.id!).execute();
    if(input.action==="delete_announcement") await db.deleteFrom("announcements").where("id","=",input.id!).execute();
    return new Response(superjson.stringify({ok:true,message:"Saved."}),{headers:{"Content-Type":"application/json"}});
  }catch(error){return new Response(superjson.stringify({ok:false,message:error instanceof Error?error.message:"Action failed."}),{status:400})}
}