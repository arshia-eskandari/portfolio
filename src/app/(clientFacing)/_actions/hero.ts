import db from "@/db/db";

export async function getHero() {
  try {
    const hero = await db.hero.findFirst();

    return hero || { id: null, text: null, title: null };
  } catch (error) {
    console.log("🚀 ~ getHero ~ error:", error);
    return { id: null, text: null, title: null };
  }
}
