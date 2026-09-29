import { db } from "../../helpers/db";
import superjson from "superjson";
export async function handle(){
  const events=await db.selectFrom("events").selectAll().orderBy("eventDate","asc").execute();
  return new Response(superjson.stringify({events}),{headers:{"Content-Type":"application/json"}});
}