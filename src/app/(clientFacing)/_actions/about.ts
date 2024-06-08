import db from "@/db/db";

export async function getAbout() {
  try {
    const about = await db.about.findFirst();

    return about || { id: null, title: null, text: null, resumeUrl: null };
  } catch (error) {
    console.log("🚀 ~ getAbout ~ error:", error);
    return { id: null, title: null, text: null, resumeUrl: null };
  }
}
