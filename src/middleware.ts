import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/app/admin/_actions/jwt";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token || !(await isAuthenticated(token)).isValid) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
