import { z } from "zod";
import superjson from "superjson";
export const schema=z.object({displayName:z.string().min(2),email:z.string().email(),password:z.string().min(8).regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/)});
export type OutputType={user:{id:number;email:string;displayName:string;avatarUrl:string|null;role:"admin"}};
export const postAdminSetup=async(body:z.infer<typeof schema>,init?:RequestInit):Promise<OutputType>=>{const r=await fetch("/_api/admin/setup",{method:"POST",...init,headers:{"Content-Type":"application/json",...(init?.headers??{})},body:superjson.stringify(body)});const text=await r.text();if(!r.ok)throw new Error(superjson.parse<{message:string}>(text).message);return superjson.parse<OutputType>(text)};