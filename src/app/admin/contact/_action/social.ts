"use server";
import db from "@/db/db";
import { SocialNames } from "@prisma/client";
import { z } from "zod";

export async function getSocials() {
  try {
    const socials = await db.social.findMany();

    return socials;
  } catch (error) {
    console.log("🚀 ~ getSocials ~ error:", error);
    return [];
  }
}

const addSchema = z.object({
  linkedinUrl: z.string().max(100).optional(),
  githubUrl: z.string().max(100).optional(),
  telegramUrl: z.string().max(100).optional(),
  emailAddress: z.string().max(100).optional(),
});

export async function updateSocials(formData: FormData) {
  try {
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
    if (result.success === false) {
      return { status: 400, message: "No social was uploaded" };
    }

    let addCount = 0;
    let totalAttempted = 0;

    for (const [key, value] of formData.entries()) {
      try {
        totalAttempted++;
        let id = null;
        let type = null;
        switch (key) {
          case "linkedinUrl":
            const linkedin = await db.social.findFirst({
              where: { name: SocialNames.LINKEDIN },
            });
            type = SocialNames.LINKEDIN;
            if (linkedin) id = linkedin.id;
            break;
          case "githubUrl":
            const github = await db.social.findFirst({
              where: { name: SocialNames.GITHUB },
            });
            type = SocialNames.GITHUB;
            if (github) id = github.id;
            break;
          case "telegramUrl":
            const telegram = await db.social.findFirst({
              where: { name: SocialNames.TELEGRAM },
            });
            type = SocialNames.TELEGRAM;
            if (telegram) id = telegram.id;
            break;
          case "emailAddress":
            const email = await db.social.findFirst({
              where: { name: SocialNames.EMAIL },
            });
            type = SocialNames.EMAIL;
            if (email) id = email.id;
            break;
        }

        if (id) {
          await db.social.update({
            where: { id },
            data: { url: value.toString() },
          });
          addCount++;
          continue;
        }

        if (type) {
          await db.social.create({
            data: {
              name: type,
              url: value.toString(),
            },
          });
          addCount++;
        }
      } catch (error) {
        console.log("🚀 ~ addSocials ~ error:", error);
      }
    }

    const failedAdds = totalAttempted - addCount;

    if (failedAdds === 0) {
      return { status: 200, message: "Socials updated successfully" };
    }

    if (failedAdds === totalAttempted) {
      throw new Error("Failed to add socials");
    }

    return {
      status: 207,
      message: `${addCount} out of ${totalAttempted} social(s) were successfully added, failed to add ${failedAdds} social(s).`,
    };
  } catch (error) {
    console.log("🚀 ~ addSocials ~ error:", error);
    return { status: 500, message: "Failed to upload social details" };
  }
}
