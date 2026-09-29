import { z } from "zod";
import superjson from "superjson";
export const schema=z.object({action:z.enum(["create_event","update_event","delete_event","create_announcement","update_announcement","delete_announcement"]),id:z.string().optional(),title:z.string().min(2).optional(),eventDate:z.string().optional(),venue:z.string().optional(),description:z.string().optional(),body:z.string().optional()});
export type OutputType={ok:boolean;message:string};
export const postAdminContent=async(body:z.infer<typeof schema>,init?:RequestInit):Promise<OutputType>=>{const r=await fetch("/_api/admin/content",{method:"POST",...init,headers:{"Content-Type":"application/json",...(init?.headers??{})},body:superjson.stringify(body)});return superjson.parse<OutputType>(await r.text())};