"use server";
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

export async function addDefaultProject() {
  try {
    await db.project.create({
      data: {
        projectTitle: "Title",
        urls: [],
        urlTitles: [],
        projectTechnologies: [],
        objective: "",
        keyResults: [],
        experienceId: "",
        media: [],
      },
    });
    return {
      status: 201,
      message: "Default project details successfully created",
    };
  } catch (error) {
    console.log("🚀 ~ addDefaultProject ~ error:", error);
    return { status: 500, message: "Failed to generate projects details" };
  }
}

export async function deleteProject(id: string) {
  try {
    await db.project.delete({ where: { id } });
    return {
      status: 200,
      message: "project successfully deleted",
    };
  } catch (error) {
    console.log("🚀 ~ deleteProject ~ error:", error);
    return { status: 500, message: "Failed to delete project" };
  }
}

// TODO: Add the update action