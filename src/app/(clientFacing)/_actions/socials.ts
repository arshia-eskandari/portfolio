"use server";
import db from "@/db/db";

export async function getSocials() {
  try {
    const socials = await db.social.findMany();

    return socials;
  } catch (error) {
    console.log("🚀 ~ getSocials ~ error:", error);
    return [];
  }
}
