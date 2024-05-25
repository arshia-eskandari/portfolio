import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {

  if ((await isAuthenticated(req)) === false) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

async function isAuthenticated(req: NextRequest) {
  const token = req.cookies.get("jwt");
  return token != null;
}

export const config = {
  matcher: "/admin/:path*",
};
