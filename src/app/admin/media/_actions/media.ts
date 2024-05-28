"use server";
import db from "@/db/db";
import { z } from "zod";
import fs from "fs/promises";
import s3 from "aws-sdk/clients/s3";

const fileSchema = z.instanceof(File, { message: "Required" });

const addSchema = z.object({
  file: fileSchema.refine((file) => file.size > 0, "Required"),
});

export async function getMedia() {
  try {
    const media = await db.media.findMany();

    return media;
  } catch (error) {
    console.log("🚀 ~ getMedia ~ error:", error);
    return [];
  }
}

// export async function addMedia(formData: FormData) {
//   try {
//     const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
//     if (result.success === false) {
//       return result.error.formErrors.fieldErrors;
//     }
//     const data = result.data;
//     await fs.mkdir("public/media", { recursive: true });
//     const filePath = `/media/${crypto.randomUUID()}-${data.file.name}`;
//     await fs.writeFile(
//       `public${filePath}`,
//       Buffer.from(await data.file.arrayBuffer()),
//     );

//     await db.media.create({
//       data: {
//         name: data.file.name,
//         filePath,
//       },
//     });
//     return { status: 201, message: "Media successfully created" };
//   } catch (error) {
//     console.log("🚀 ~ addMedia ~ error:", error);
//   }
// }

export async function addMedia(formData: FormData) {
  try {
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
    if (result.success === false) {
      return result.error.formErrors.fieldErrors;
    }
    const data = result.data;

    const fileKey = `media/${crypto.randomUUID()}-${data.file.name}`;
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileKey,
      Body: data.file.stream(), // Use the file stream for upload
      ACL: "public-read", // Optional: set file access permissions
    };

    // TODO: fix the following
    const uploadResult = await s3.upload(params).promise();

    await db.media.create({
      data: {
        name: data.file.name,
        filePath: uploadResult.Location, // Save the URL returned from S3
      },
    });

    return { status: 201, message: "Media successfully uploaded to S3" };
  } catch (error) {
    console.log("🚀 ~ addMedia ~ error:", error);
    return { status: 500, message: "Failed to upload media" };
  }
}
