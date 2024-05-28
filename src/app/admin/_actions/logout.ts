"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function logout() {
  const cookiesObj = cookies();

  const token = cookiesObj.get("token")?.value || null;

  if (token) {
    cookiesObj.set("token", "", {
      path: "/",
      expires: new Date(0),
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
  }

  redirect("/login");
}
