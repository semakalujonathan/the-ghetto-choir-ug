import { z } from "zod";
export const outputSchema = z.object({
  photos: z.array(z.object({
    id: z.string(),
    imageUrl: z.string(),
    caption: z.string(),
    featured: z.boolean(),
    createdAt: z.string()
  }))
});
export type GalleryOutput = z.infer<typeof outputSchema>;
export async function getGallery(){
  const response = await fetch("/_api/content/gallery");
  if(!response.ok) throw new Error("Unable to load gallery.");
  return outputSchema.parse(await response.json());
}