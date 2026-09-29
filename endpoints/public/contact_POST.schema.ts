import { z } from "zod";
import superjson from "superjson";
export const schema=z.object({name:z.string().min(2),email:z.string().email().optional().or(z.literal("")),phone:z.string().optional(),message:z.string().min(5).max(2500)});
export type OutputType={ok:boolean;message:string};
export const postContact=async(body:z.infer<typeof schema>,init?:RequestInit):Promise<OutputType>=>{const r=await fetch("/_api/public/contact",{method:"POST",...init,headers:{"Content-Type":"application/json",...(init?.headers??{})},body:superjson.stringify(body)});return superjson.parse<OutputType>(await r.text())};