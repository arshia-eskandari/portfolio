import db from "@/db/db";
import { cache } from "@/lib/cache";

const getClientAbout = cache(
  async () => {
    try {
      const about = await db.about.findFirst();

      return (
        about || {
          id: null,
          title: null,
          text: null,
          resumeUrl: null,
          imageUrl: null,
        }
      );
    } catch (error) {
      console.log("🚀 ~ getAbout ~ error:", error);
      return {
        id: null,
        title: null,
        text: null,
        resumeUrl: null,
        imageUrl: null,
      };
    }
  },
  ["/", "getClientAbout"],
  { revalidate: 60 * 60 * 6 },
);

export { getClientAbout };
