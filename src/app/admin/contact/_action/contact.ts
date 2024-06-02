"use server";
import db from "@/db/db";
import { Status } from "@prisma/client";

export async function getContacts() {
  try {
    const contacts = await db.contact.findMany();

    return contacts;
  } catch (error) {
    console.log("🚀 ~ getContacts ~ error:", error);
    return [];
  }
}

export async function updateContacts(formData: FormData) {
  try {
    let updateCount = 0;
    let totalAttempted = 0;

    for (const [id, status] of formData.entries()) {
      console.log({ id, status });
      try {
        totalAttempted++;
        if (status !== Status.PENDING && status !== Status.RESPONDED) {
          continue;
        }
        if (!(await db.contact.findUnique({ where: { id } }))) {
          continue;
        }

        await db.contact.update({ where: { id }, data: { status } });
        updateCount++;
      } catch (error) {
        console.log(
          `🚀 ~ updateContacts ~ error for contact with id ${id}:`,
          error,
        );
      }
    }

    const failedDeletes = totalAttempted - updateCount;

    if (failedDeletes === 0) {
      return { status: 200, message: "Contacts successfully updated" };
    }

    if (failedDeletes === totalAttempted) {
      throw new Error("Failed to delete media");
    }

    return {
      status: 207,
      message: `${updateCount} out of ${totalAttempted} contacts were successfully updated, failed to update ${failedDeletes} file(s).`,
    };
  } catch (error) {
    console.log("🚀 ~ updateContacts ~ error:", error);
    return { status: 500, message: "Failed to upload contacts" };
  }
}
