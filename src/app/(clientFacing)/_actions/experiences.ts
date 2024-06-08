import db from "@/db/db";

export async function getExperiences() {
  try {
    const experiences = await db.experience.findMany();

    return experiences;
  } catch (error) {
    console.log("🚀 ~ getExperiences ~ error:", error);
    return [];
  }
}
