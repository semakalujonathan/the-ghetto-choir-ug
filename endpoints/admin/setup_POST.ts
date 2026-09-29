import { db } from "../../helpers/db";
import { schema } from "./setup_POST.schema";
import { generatePasswordHash } from "../../helpers/generatePasswordHash";
import { randomBytes } from "crypto";
import { setServerSession,SessionExpirationSeconds } from "../../helpers/getSetServerSession";
import superjson from "superjson";
export async function handle(request:Request){
  try{
    const input=schema.parse(superjson.parse(await request.text()));
    const count=await db.selectFrom("users").select(({fn})=>fn.countAll().as("count")).executeTakeFirstOrThrow();
    if(Number(count.count)>0) return new Response(superjson.stringify({message:"Initial administrator setup is already complete."}),{status:409});
    const passwordHash=await generatePasswordHash(input.password);
    const user=await db.transaction().execute(async trx=>{
      const created=await trx.insertInto("users").values({email:input.email,displayName:input.displayName,role:"admin"}).returning(["id","email","displayName","avatarUrl","role"]).executeTakeFirstOrThrow();
      await trx.insertInto("userPasswords").values({userId:created.id,passwordHash}).execute();
      return created;
    });
    const sessionId=randomBytes(32).toString("hex");const now=new Date();const expiresAt=new Date(now.getTime()+SessionExpirationSeconds*1000);
    await db.insertInto("sessions").values({id:sessionId,userId:user.id,createdAt:now,lastAccessed:now,expiresAt}).execute();
    const response=new Response(superjson.stringify({user}),{headers:{"Content-Type":"application/json"}});
    await setServerSession(response,{id:sessionId,createdAt:now.getTime(),lastAccessed:now.getTime()});
    return response;
  }catch(error){return new Response(superjson.stringify({message:error instanceof Error?error.message:"Setup failed."}),{status:400})}
}