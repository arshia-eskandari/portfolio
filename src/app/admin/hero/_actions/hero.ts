"use server";
import db from "@/db/db";
import { z } from "zod";

const addSchema = z.object({
  id: z.string().optional(),
  text: z.string().min(5).max(1000),
  title: z.string().min(5).max(150),
});

export async function getHero() {
  try {
    const hero = await db.hero.findFirst();

    return hero || { id: null, text: null, title: null };
  } catch (error) {
    console.log("🚀 ~ getHero ~ error:", error);
    return { id: null, text: null, title: null };
  }
}

export async function addHero(formData: FormData) {
  try {
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
    if (result.success === false) {
      return {
        status: 400,
        message: "Invalid hero text",
      };
    }
    const { id, title, text } = result.data;
    if (!id || !(await db.hero.findUnique({ where: { id } }))) {
      await db.hero.create({
        data: {
          title,
          text,
        },
      });
      return {
        status: 201,
        message: "Hero text successfully created",
      };
    }
    await db.hero.update({
      where: {
        id,
      },
      data: {
        title,
        text,
      },
    });
    return {
      status: 200,
      message: "Hero text successfully updated",
    };
  } catch (error) {
    console.log("🚀 ~ getHero ~ error:", error);
    return { status: 500, message: "Failed to upload hero text" };
  }
}
