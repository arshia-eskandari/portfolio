"use server";
import db from "@/db/db";
import { verifyPassword } from "@/lib/password";
import { cookies } from "next/headers";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import { Role } from "@prisma/client";

export async function login(formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return { status: 400, message: "Email and password are required" };
  }

  try {
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      console.log("User not found");
      return { status: 404, message: "User not found." };
    }

    if (!verifyPassword(password, user.password)) {
      return { status: 400, message: "Incorrect email or password." };
    }

    if (user.role !== Role.ADMIN) {
      return { status: 401, message: "Unauthorized." };
    }

    console.log("success");

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    if (!secret) {
      return { status: 500, message: "Internal server error" };
    }

    // Create JWT token
    const token = await new SignJWT({ userId: user.id, email: user.email, role: user.role })
      .setProtectedHeader({ alg: 'HS256' })
      .setJti(nanoid())
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(secret);

    // Set cookie using next/headers
    cookies().set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600,
      path: "/",
    });

    return { status: 200, message: "Login successful" };
  } catch (error) {
    console.error("Error finding user:", error);
    return { status: 500, message: "Internal server error" };
  }
}
