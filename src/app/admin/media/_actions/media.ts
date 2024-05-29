"use server";
import db from "@/db/db";
import { z } from "zod";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/aws/s3";

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

    const fileKey = `media/${crypto.randomUUID()}-${data.file.name.replace(
      / /g,
      "",
    )}`;

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileKey,
      Body: Buffer.from(await data.file.arrayBuffer()),
    });

    await s3Client.send(command);

    const url = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;

    await db.media.create({
      data: {
        name: data.file.name,
        url,
      },
    });

    return { status: 201, message: "Media successfully uploaded to S3" };
  } catch (error) {
    console.log("🚀 ~ addMedia ~ error:", error);
    return { status: 500, message: "Failed to upload media" };
  }
}
