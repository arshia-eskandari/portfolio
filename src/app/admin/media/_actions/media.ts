"use server";
import db from "@/db/db";
import { z } from "zod";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/aws/s3";
import { MediaType } from "@prisma/client";
import { removeItem } from "@/lib/array";

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
const AWS_REGION = process.env.AWS_REGION;

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

export async function addMedia(formData: FormData) {
  try {
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
    if (result.success === false) {
      return { status: 400, message: "No file was uploaded" };
    }
    const data = result.data;

    const fileKey = `media/${crypto.randomUUID()}-${data.file.name.replace(
      / /g,
      "",
    )}`;

    const extension = data?.file?.name?.split(".")?.pop()?.toLowerCase();
    let mediaType: MediaType;

    switch (extension) {
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
      case "bmp":
      case "svg":
        mediaType = "IMAGE";
        break;
      case "mp4":
      case "mov":
      case "avi":
      case "wmv":
      case "flv":
      case "webm":
      case "mkv":
        mediaType = "VIDEO";
        break;
      case "pdf":
        mediaType = "PDF";
        break;
      default:
        return { status: 415, message: "Unsupported file type" };
    }

    const command = new PutObjectCommand({
      Bucket: S3_BUCKET_NAME,
      Key: fileKey,
      Body: Buffer.from(await data.file.arrayBuffer()),
    });

    await s3Client.send(command);

    const url = `https://${S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${fileKey}`;

    await db.media.create({
      data: {
        name: data.file.name,
        url,
        fileKey,
        mediaType,
      },
    });

    return { status: 201, message: "Media successfully uploaded to S3" };
  } catch (error) {
    console.log("🚀 ~ addMedia ~ error:", error);
    return { status: 500, message: "Failed to upload media" };
  }
}

export async function deleteUsedMedia(url: string) {
  const experiences = await db.experience.findMany({
    where: {
      recommendationLetterUrls: {
        has: url,
      },
    },
  });

  const experienceUpdatePromises = experiences.map((res) => {
    const newRecommendationLetterUrls = removeItem(
      res.recommendationLetterUrls,
      url,
    ).result;
    return db.experience.update({
      where: { id: res.id },
      data: { recommendationLetterUrls: newRecommendationLetterUrls },
    });
  });

  await Promise.all(experienceUpdatePromises);

  const projects = await db.project.findMany({
    where: {
      urls: {
        has: url,
      },
    },
  });

  const projectsUpdatePromises = projects.map((res) => {
    const { result: newUrls, index } = removeItem(res.urls, url);
    const newUrlTitles =
      index === -1
        ? res.urlTitles
        : removeItem(res.urlTitles, res.urlTitles[index]).result;
    return db.project.update({
      where: { id: res.id },
      data: { urls: newUrls, urlTitles: newUrlTitles },
    });
  });

  await Promise.all(projectsUpdatePromises);

  const about = await db.about.findMany({
    where: {
      resumeUrl: url,
    },
  });

  const aboutUpdatePromises = about.map((res) => {
    return db.about.update({
      where: { id: res.id },
      data: { resumeUrl: null },
    });
  });

  await Promise.all(aboutUpdatePromises);
}

export async function deleteMedia(formData: FormData) {
  try {
    let deleteCount = 0;
    let totalAttempted = 0;

    for (const [id] of formData.entries()) {
      try {
        totalAttempted++;
        const medium = await db.media.findUnique({
          where: {
            id,
          },
        });

        if (medium) {
          await deleteUsedMedia(medium.url);
          const { fileKey } = medium;

          const command = new DeleteObjectCommand({
            Bucket: S3_BUCKET_NAME,
            Key: fileKey,
          });

          await s3Client.send(command);

          await db.media.delete({
            where: { id },
          });
          deleteCount++;
        }
      } catch (error) {
        console.log(
          `🚀 ~ deleteMultipleMedia ~ error for medium with id ${id}:`,
          error,
        );
      }
    }

    const failedDeletes = totalAttempted - deleteCount;

    if (failedDeletes === 0) {
      return { status: 204, message: "Media successfully deleted from S3" };
    }

    if (failedDeletes === totalAttempted) {
      throw new Error("Failed to delete media");
    }

    return {
      status: 207,
      message: `${deleteCount} out of ${totalAttempted} file(s) were successfully deleted, failed to delete ${failedDeletes} file(s).`,
    };
  } catch (error) {
    console.log("🚀 ~ deleteMedia ~ error:", error);
    return { status: 500, message: "Failed to delete media" };
  }
}
