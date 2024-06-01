"use server"
import db from "@/db/db";
import { MediaType } from "@prisma/client";

export async function getPDFMedia() {
  try {
    const media = await db.media.findMany({
      where: { mediaType: MediaType.PDF },
    });

    return media;
  } catch (error) {
    console.log("🚀 ~ getPDFMedia ~ error:", error);
    return [];
  }
}
