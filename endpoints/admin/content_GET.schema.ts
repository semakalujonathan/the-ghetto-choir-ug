import superjson from "superjson";
import { z } from "zod";
export const schema=z.object({});
export type OutputType={events:any[];announcements:any[];auditions:any[];messages:any[];gallery:any[]};
export const getAdminContent=async(init?:RequestInit):Promise<OutputType>=>{const r=await fetch("/_api/admin/content",{method:"GET",...init});return superjson.parse<OutputType>(await r.text())};