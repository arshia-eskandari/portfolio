"use server";
import db from "@/db/db";
import { z } from "zod";

const addSchema = z.object({
  id: z.string().optional(),
  skills: z.string().min(10).max(1000),
});

export async function getSkills() {
  try {
    const skills = await db.skills.findFirst();

    return skills || { id: null, skills: null };
  } catch (error) {
    console.log("🚀 ~ getSkills ~ error:", error);
    return { id: null, skills: null };
  }
}

export async function addSkills(formData: FormData) {
  try {
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
    console.log(formData, result.error)
    if (result.success === false) {
      return {
        status: 400,
        message: "Invalid skills",
      };
    }
    const { id, skills } = result.data;
    if (!id || !(await db.skills.findUnique({ where: { id } }))) {
      await db.skills.create({
        data: {
          skills: skills.trim().split(","),
        },
      });
      return {
        status: 201,
        message: "Skills successfully created",
      };
    }
    await db.skills.update({
      where: {
        id,
      },
      data: {
        skills: skills.trim().split(","),
      },
    });
    return {
      status: 200,
      message: "Skills successfully updated",
    };
  } catch (error) {
    console.log("🚀 ~ addSkills ~ error:", error);
    return { status: 500, message: "Failed to upload skills" };
  }
}
