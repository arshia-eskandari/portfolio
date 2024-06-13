"use server";
import { z } from "zod";
import axios from "axios";
import db from "@/db/db";

const addSchema = z.object({
  firstName: z.string().min(5).max(50),
  lastName: z.string().min(5).max(50),
  email: z.string().email().min(5).max(50),
  message: z.string().min(50).max(200),
  gRecaptchaToken: z.string(),
});

export async function createContact(formData: FormData) {
  try {
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!result.success) {
      return {
        status: 400,
        message: "Invalid contact details",
      };
    }
    const { firstName, lastName, email, message, gRecaptchaToken } =
      result.data;
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const gRes = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      `secret=${secretKey}&response=${gRecaptchaToken}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );
    console.log(JSON.stringify(gRes.data));
    if (!gRes?.data?.score || gRes?.data?.score < 0.5) {
      throw new Error("Recaptcha verification failed");
    }

    await db.contact.create({
      data: {
        firstName,
        lastName,
        email,
        message,
      },
    });
    return {
      status: 200,
      message: "Contact form successfully submitted",
    };
  } catch (error) {
    console.log("🚀 ~ createContact ~ error:", error);
    return { status: 500, message: "Failed to create contact" };
  }
}
