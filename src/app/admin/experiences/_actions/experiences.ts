"use server";
import db from "@/db/db";
import { addDays } from "date-fns";
import { z } from "zod";

export async function getExperiences() {
  try {
    const experiences = await db.experience.findMany();

    return experiences;
  } catch (error) {
    console.log("🚀 ~ getExperiences ~ error:", error);
    return [];
  }
}

export async function addDefaultExperience() {
  try {
    await db.experience.create({
      data: {
        jobTitle: "Title",
        company: "Company",
        startDate: new Date(2024, 0, 20),
        endDate: addDays(new Date(2024, 0, 20), 20),
        achievements: [],
        responsibilities: [],
        recommendationLetterUrls: [],
        location: "Location",
      },
    });
    return {
      status: 201,
      message: "About details successfully created",
    };
  } catch (error) {
    console.log("🚀 ~ addDefaultExperience ~ error:", error);
    return { status: 500, message: "Failed to upload about details" };
  }
}

const updateSchema = z.object({
  id: z.string().max(1000),
  jobTitle: z.string().min(5).max(30),
  company: z.string().min(5).max(30),
  location: z.string().min(5).max(30),
  achievements: z.string().min(0).max(1000),
  responsibilities: z.string().min(0).max(1000),
  startDate: z.string().min(10).max(100),
  endDate: z.string().max(100),
  recommendationLetterUrls: z.string().min(0).max(1500),
});

export async function updateExperience(formData: FormData) {
  try {
    const result = updateSchema.safeParse(
      Object.fromEntries(formData.entries()),
    );
    if (!result.success) {
      return {
        status: 400,
        message: "Invalid experience details",
      };
    }
    const {
      id,
      jobTitle,
      company,
      location,
      achievements,
      responsibilities,
      startDate,
      endDate,
      recommendationLetterUrls,
    } = result.data;

    for (const url of recommendationLetterUrls.split(",")) {
      if (!db.media.findFirst({ where: { url } })) {
        return {
          status: 404,
          message: "Url not found",
        };
      }
    }

    await db.experience.update({
      where: {
        id,
      },
      data: {
        jobTitle: jobTitle.trim(),
        company: company.trim(),
        location: location.trim(),
        achievements:
          achievements
            ?.split(",")
            .map((a) => a.trim())
            .filter((a) => a !== "") || [],
        responsibilities:
          responsibilities
            ?.split(",")
            .map((r) => r.trim())
            .filter((r) => r !== "") || [],
        startDate: new Date(startDate),
        endDate: endDate === "" ? null : new Date(endDate),
        recommendationLetterUrls: recommendationLetterUrls?.split(",") || [],
      },
    });
    return {
      status: 200,
      message: "Experience details successfully updated",
    };
  } catch (error) {
    console.log("🚀 ~ updateExperience ~ error:", error);
    return { status: 500, message: "Failed to update experience details" };
  }
}
