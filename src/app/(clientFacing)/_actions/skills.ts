import db from "@/db/db";

export async function getSkills() {
  try {
    const skills = await db.skills.findFirst();

    return skills || { id: null, skills: null };
  } catch (error) {
    console.log("🚀 ~ getSkills ~ error:", error);
    return { id: null, skills: null };
  }
}
