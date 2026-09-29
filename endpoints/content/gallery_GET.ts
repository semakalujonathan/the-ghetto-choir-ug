import { db } from "../../helpers/db";
import superjson from "superjson";
export async function handle(){
  const rows = await db.selectFrom("galleryPhotos").selectAll().orderBy("featured","desc").orderBy("createdAt","desc").execute();
  const photos=rows.map(photo=>({id:String(photo.id),imageUrl:photo.imageUrl,caption:photo.caption,featured:photo.featured,createdAt:new Date(photo.createdAt).toISOString()}));
  return new Response(JSON.stringify({photos}),{headers:{"Content-Type":"application/json"}});
}