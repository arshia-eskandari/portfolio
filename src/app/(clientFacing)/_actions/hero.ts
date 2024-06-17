import db from "@/db/db";
import { cache } from "@/lib/cache";

const getClientHero = cache(
  async () => {
    try {
      const hero = await db.hero.findFirst();

      return hero || { id: null, text: null, title: null };
    } catch (error) {
      console.log("🚀 ~ getClientHero ~ error:", error);
      return { id: null, text: null, title: null };
    }
  },
  ["/", "getClientHero"],
  { revalidate: 60 * 60 * 6 },
);

export { getClientHero };
