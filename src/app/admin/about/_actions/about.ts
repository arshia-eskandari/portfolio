"use server";
import db from "@/db/db";
import { z } from "zod";

const addSchema = z.object({
  id: z.string().optional(),
  text: z.string().min(10).max(1000),
  resumeUrl: z.string().optional(),
});

export async function getAbout() {
  try {
    const about = await db.about.findFirst();

    return about || { id: null, text: null, resumeUrl: null };
  } catch (error) {
    console.log("🚀 ~ getAbout ~ error:", error);
    return { id: null, text: null, resumeUrl: null };
  }
}

export async function addAbout(formData: FormData) {
  try {
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
    if (result.success === false) {
      return {
        status: 400,
        message: "Invalid about text or resume url",
      };
    }
    const { id, text, resumeUrl } = result.data;
    if (!(await db.media.findFirst({ where: { url: resumeUrl } }))) {
      return {
        status: 400,
        message: "Invalid resume url",
      };
    }
    if (!id || !(await db.about.findUnique({ where: { id } }))) {
      await db.about.create({
        data: {
          text,
          resumeUrl,
        },
      });
      return {
        status: 201,
        message: "About details successfully created",
      };
    }
    await db.about.update({
      where: {
        id,
      },
      data: {
        text,
        resumeUrl,
      },
    });
    return {
      status: 200,
      message: "About details successfully updated",
    };
  } catch (error) {
    console.log("🚀 ~ addAbout ~ error:", error);
    return { status: 500, message: "Failed to upload about details" };
  }
}
