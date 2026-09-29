import { db } from "../../helpers/db";
import { schema } from "./audition_POST.schema";
import superjson from "superjson";
export async function handle(request:Request){
  try{
    const input=schema.parse(superjson.parse(await request.text()));
    await db.insertInto("auditionSubmissions").values(input).execute();
    return new Response(superjson.stringify({ok:true,message:"Thank you. Your audition interest has been received."}),{headers:{"Content-Type":"application/json"}});
  }catch(error){return new Response(superjson.stringify({ok:false,message:error instanceof Error?error.message:"Unable to submit audition."}),{status:400,headers:{"Content-Type":"application/json"}})}
}