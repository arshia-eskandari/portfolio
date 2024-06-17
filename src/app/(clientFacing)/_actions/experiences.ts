import db from "@/db/db";
import { cache } from "@/lib/cache";

const getClientExperiences = cache(
  async () => {
    try {
      const experiences = await db.experience.findMany();

      return experiences;
    } catch (error) {
      console.log("🚀 ~ getClientExperiences ~ error:", error);
      return [];
    }
  },
  ["/", "getClientExperiences"],
  { revalidate: 60 * 60 * 6 },
);

export { getClientExperiences };
