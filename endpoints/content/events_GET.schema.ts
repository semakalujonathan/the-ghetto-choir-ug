import { z } from "zod";
import superjson from "superjson";
export const schema=z.object({});
export type OutputType={events:Array<{id:string;title:string;eventDate:Date;venue:string;description:string;status:string;createdAt:Date}>};
export const getEvents=async(init?:RequestInit):Promise<OutputType>=>superjson.parse<OutputType>(await (await fetch("/_api/content/events",{method:"GET",...init})).text());