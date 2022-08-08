// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("nextauth.token");
  const url = request.url;

  if (!token) {
    return NextResponse.redirect(new URL("/", url));
  }
}

export const config = {
  matcher: "/users/:path*",
};
