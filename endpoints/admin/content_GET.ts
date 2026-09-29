import { db } from "../../helpers/db";
import { getServerUserSession } from "../../helpers/getServerUserSession";
import superjson from "superjson";
export async function handle(request:Request){
  try{
    const {user}=await getServerUserSession(request);
    if(user.role!=="admin") return new Response(superjson.stringify({message:"Forbidden"}),{status:403});
    const [events,announcements,auditions,messages,gallery]=await Promise.all([
      db.selectFrom("events").selectAll().orderBy("eventDate","desc").execute(),
      db.selectFrom("announcements").selectAll().orderBy("createdAt","desc").execute(),
      db.selectFrom("auditionSubmissions").selectAll().orderBy("createdAt","desc").execute(),
      db.selectFrom("contactMessages").selectAll().orderBy("createdAt","desc").execute(),
      db.selectFrom("galleryPhotos").selectAll().orderBy("featured","desc").orderBy("createdAt","desc").execute()
    ]);
    return new Response(superjson.stringify({events,announcements,auditions,messages,gallery}),{headers:{"Content-Type":"application/json"}});
  }catch(error){return new Response(superjson.stringify({message:error instanceof Error?error.message:"Not authenticated"}),{status:401})}
}