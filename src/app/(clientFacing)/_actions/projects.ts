import db from "@/db/db";
import { cache } from "@/lib/cache";

const getClientProjects = cache(
  async () => {
    try {
      const projects = await db.project.findMany();

      return projects;
    } catch (error) {
      console.log("🚀 ~ getClientProjects ~ error:", error);
      return [];
    }
  },
  ["/", "getClientProjects"],
  { revalidate: 60 * 60 * 6 },
);

export { getClientProjects };
