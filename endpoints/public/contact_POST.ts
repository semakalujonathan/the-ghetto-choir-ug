import { db } from "../../helpers/db";
import { schema } from "./contact_POST.schema";
import superjson from "superjson";
export async function handle(request:Request){
  try{const input=schema.parse(superjson.parse(await request.text()));await db.insertInto("contactMessages").values(input).execute();return new Response(superjson.stringify({ok:true,message:"Message received. We will get back to you."}),{headers:{"Content-Type":"application/json"}})}
  catch(error){return new Response(superjson.stringify({ok:false,message:error instanceof Error?error.message:"Unable to send message."}),{status:400,headers:{"Content-Type":"application/json"}})}
}