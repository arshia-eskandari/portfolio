import db from "@/db/db";
import { cache } from "@/lib/cache";

const getClientSkills = cache(
  async () => {
    try {
      const skills = await db.skills.findFirst();

      return skills || { id: null, skills: null };
    } catch (error) {
      console.log("🚀 ~ getClientSkills ~ error:", error);
      return { id: null, skills: null };
    }
  },
  ["/", "getClientSkills"],
  { revalidate: 60 * 60 * 6 },
);

export { getClientSkills };
