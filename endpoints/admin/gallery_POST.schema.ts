import { z } from "zod";
export const schema = z.discriminatedUnion("action",[
  z.object({action:z.literal("prepare_upload"),fileName:z.string().min(1).max(160),contentType:z.string().min(3).max(100),sizeBytes:z.number().int().positive().max(100*1024*1024),caption:z.string().max(300).optional(),featured:z.boolean().optional()}),
  z.object({action:z.literal("delete_photo"),id:z.string().min(1)}),
  z.object({action:z.literal("set_featured"),id:z.string().min(1),featured:z.boolean()})
]);
export type GalleryAdminInput = z.infer<typeof schema>;