import db from "@/db/db";
import { verifyPassword } from "@/lib/password";

export async function login(formData: FormData) {
  "use server";
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    throw new Error("Email and password are required");
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

    if (user.role !== "admin") {
      return { status: 401, message: "Unauthorized." };
    }

    console.log("success");

    // TODO: Create and set cookie for JWT or session handling here
  } catch (error) {
    console.error("Error finding user:", error);
    throw error;
  }
}
