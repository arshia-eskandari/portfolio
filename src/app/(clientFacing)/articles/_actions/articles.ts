"use server";
import db from "@/db/db";

export async function getArticles() {
  try {
    const articles = await db.article.findMany();
    return articles;
  } catch (error) {
    console.log("🚀 ~ getArticles ~ error:", error);
    return [];
  }
}