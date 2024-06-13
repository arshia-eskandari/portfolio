"use server";
import db from "@/db/db";
import { z } from "zod";

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

const updateSchema = z.object({
  id: z.string().min(5).max(100),
  projectTitle: z.string().min(5).max(100),
  urlTitles: z.string().max(1000).optional(),
  urls: z.string().max(1000).optional(),
  projectTechnologies: z.string().max(1000).optional(),
  objective: z.string().max(150).optional(),
  keyResults: z.string().max(1000).optional(),
  experienceId: z.string().max(1000).optional(),
  media: z.string().max(1500).optional(),
});

export async function updateProject(formData: FormData) {
  try {
    const result = updateSchema.safeParse(
      Object.fromEntries(formData.entries()),
    );
    if (!result.success) {
      return {
        status: 400,
        message: "Invalid project details",
      };
    }
    const {
      id,
      urlTitles,
      urls,
      projectTechnologies,
      projectTitle,
      objective,
      keyResults,
      media,
      experienceId,
    } = result.data;

    if (!(await db.project.findFirst({ where: { id } }))) {
      return {
        status: 404,
        message: "Project not found",
      };
    }

    const urlTitlesArray: string[] = [];
    const urlArray = urls?.split(",") || [];
    for (let i = 0; i < urlArray.length; i++) {
      urlTitlesArray.push(
        urlTitles ? urlTitles.split(",")[i] || `Title ${i}` : `Title ${i}`,
      );
    }

    const mediaArray = media?.split(",") || [];
    for (let i = 0; i < mediaArray.length; i++) {
      const url = mediaArray[i];
      if (!db.media.findFirst({ where: { url } })) {
        return {
          status: 404,
          message: "Url not found",
        };
      }
    }

    await db.project.update({
      where: { id },
      data: {
        urlTitles: urlTitlesArray?.map((x) => x.trim()),
        urls: urlArray?.map((x) => x.trim()),
        projectTechnologies:
          projectTechnologies !== ""
            ? projectTechnologies?.split(",")?.map((x) => x.trim()) || []
            : [],
        projectTitle: projectTitle?.trim(),
        objective: objective?.trim(),
        keyResults: keyResults?.split(",")?.map((x) => x.trim()) || [],
        media: mediaArray,
        experienceId,
      },
    });

    return {
      status: 200,
      message: "Project details successfully updated",
    };
  } catch (error) {
    console.log("🚀 ~ updateProject ~ error:", error);
    return { status: 500, message: "Failed to update project" };
  }
}
