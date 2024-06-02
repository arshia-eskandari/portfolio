"use server";
import db from "@/db/db";
import { Status } from "@prisma/client";

export async function getPendingContacts() {
  try {
    const contacts = await db.contact.findMany({
      where: { status: Status.PENDING },
    });

    return contacts;
  } catch (error) {
    console.log("🚀 ~ getContacts ~ error:", error);
    return [];
  }
}
