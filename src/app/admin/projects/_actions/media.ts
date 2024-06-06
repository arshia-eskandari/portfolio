import db from "@/db/db";
import { MediaType } from "@prisma/client";

export async function getMedia() {
  try {
    const media = await db.media.findMany({
      where: {
        OR: [{ mediaType: MediaType.IMAGE }, { mediaType: MediaType.VIDEO }],
      },
    });

    return media;
  } catch (error) {
    console.log("🚀 ~ getMedia ~ error:", error);
    return [];
  }
}
