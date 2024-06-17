"use server";
import db from "@/db/db";
import { cache } from "@/lib/cache";

const getClientSocials = cache(
  async () => {
    try {
      const socials = await db.social.findMany();

      return socials;
    } catch (error) {
      console.log("🚀 ~ getClientSocials ~ error:", error);
      return [];
    }
  },
  ["/", "getClientSocials"],
  { revalidate: 60 * 60 * 6 }, // Revalidate data every 6 hours
);

export { getClientSocials };
