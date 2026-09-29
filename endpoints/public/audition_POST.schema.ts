import { z } from "zod";
import superjson from "superjson";
export const schema=z.object({fullName:z.string().min(2),age:z.coerce.number().int().min(12).max(100),phone:z.string().min(7),email:z.string().email().optional().or(z.literal("")),experience:z.string().max(1000).optional(),message:z.string().max(1500).optional()});
export type OutputType={ok:boolean;message:string};
export const postAudition=async(body:z.infer<typeof schema>,init?:RequestInit):Promise<OutputType>=>{const r=await fetch("/_api/public/audition",{method:"POST",...init,headers:{"Content-Type":"application/json",...(init?.headers??{})},body:superjson.stringify(body)});return superjson.parse<OutputType>(await r.text())};