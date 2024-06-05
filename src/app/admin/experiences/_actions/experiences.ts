"use server";
import db from "@/db/db";
import { addDays } from "date-fns";

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
