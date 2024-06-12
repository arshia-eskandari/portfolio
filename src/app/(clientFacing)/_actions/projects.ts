import db from "@/db/db";

export async function getProjects() {
  try {
    const projects = await db.project.findMany();

    return projects;
  } catch (error) {
    console.log("🚀 ~ getProjects ~ error:", error);
    return [];
  }
}