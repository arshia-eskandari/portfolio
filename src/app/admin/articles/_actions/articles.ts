"use server";
import db from "@/db/db";
import { z } from "zod";

export async function getArticles() {
  try {
    const articles = await db.article.findMany();
    return articles;
  } catch (error) {
    console.log("🚀 ~ getArticles ~ error:", error);
    return [];
  }
}

export async function addDefaultArticle() {
  try {
    await db.article.create({
      data: {
        title: "Title",
        content: "Content",
      },
    });
    return {
      status: 201,
      message: "Default article successfully created",
    };
  } catch (error) {
    console.log("🚀 ~ addDefaultArticle ~ error:", error);
    return { status: 500, message: "Failed to generate article" };
  }
}

const updateSchema = z.object({
  id: z.string().max(1000),
  title: z.string().min(1).max(300),
  // very large max to allow super long content
  content: z.string().min(0).max(10_000_000),
  banner: z.string().optional(),
});

export async function updateArticle(formData: FormData) {
  try {
    const result = updateSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!result.success) {
      return {
        status: 400,
        message: "Invalid article details",
      };
    }

    const { id, title, content, banner } = result.data;

    if (!(await db.article.findFirst({ where: { id } }))) {
      return {
        status: 404,
        message: "Article not found",
      };
    }

    await db.article.update({
      where: { id },
      data: {
        title: title.trim(),
        content,
      },
    });

    return {
      status: 200,
      message: "Article successfully updated",
    };
  } catch (error) {
    console.log("🚀 ~ updateArticle ~ error:", error);
    return { status: 500, message: "Failed to update article" };
  }
}

export async function deleteArticle(id: string) {
  try {
    await db.article.delete({ where: { id } });
    return {
      status: 200,
      message: "Article successfully deleted",
    };
  } catch (error) {
    console.log("🚀 ~ deleteArticle ~ error:", error);
    return { status: 500, message: "Failed to delete article" };
  }
}
