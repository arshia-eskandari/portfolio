import db from "@/db/db";

export async function getMedia() {
  try {
    const media = await db.media.findMany();

    return media;
  } catch (error) {
    console.log("🚀 ~ getMedia ~ error:", error)
    return [];
  }
}
