import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = `/`;
    return NextResponse.redirect(url);
  }

  if (req.nextUrl.pathname.startsWith("/admin") && session.role !== "ADMIN") {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    "/admin/:path*",
    "/vender/:path*",
    "/usuario/:path*",
    "/publicar/:path*",
    "/listings/:path*",
  ],
};
