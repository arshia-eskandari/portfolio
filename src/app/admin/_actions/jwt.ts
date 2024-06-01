"use server"
import db from "@/db/db";
import { Role } from "@prisma/client";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function isAuthenticated(token: string) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    if (payload.role !== Role.ADMIN) {
      return { isValid: false, userId: undefined };
    }

    const currentTime = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < currentTime) {
      return { isValid: false, userId: undefined };
    }

    return { isValid: true, userId: payload.userId as string };
  } catch (error) {
    console.log("🚀 ~ isAuthenticated ~ error:", error);
    return { isValid: false, userId: undefined };
  }
}

export async function getUser() {
  try {
    const cookiesObj = cookies();

    const token = cookiesObj.get("token")?.value || null;

    const { isValid, userId } = await isAuthenticated(token || "");
    if (!isValid || typeof userId !== "string") {
      redirect("/login");
    }

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  } catch (error) {
    console.log("🚀 ~ getUser ~ error:", error);
    redirect("/login");
  }
}
