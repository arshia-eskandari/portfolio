"use server";
import db from "@/db/db";
import { MediaType } from "@prisma/client";

export async function getImageMedia() {
  try {
    const media = await db.media.findMany({
      where: { mediaType: MediaType.IMAGE },
    });

    return media;
  } catch (error) {
    console.log("🚀 ~ getImageMedia ~ error:", error);
    return [];
  }
}