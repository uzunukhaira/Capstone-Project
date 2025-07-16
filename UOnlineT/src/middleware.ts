import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  const { pathname } = req.nextUrl;

  // Halaman yang hanya bisa diakses setelah login
  const protectedPaths = ["/profile", "/users", "/riwayat", "/bantuan"];
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/users", "/riwayat", "/bantuan", "/nlp"],
};
