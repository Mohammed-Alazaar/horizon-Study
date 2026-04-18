import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, AdminSession } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow login page through
  if (pathname === "/admin/login") return NextResponse.next();

  // Protect all /admin routes
  if (pathname.startsWith("/admin")) {
    const res = NextResponse.next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const session = await getIronSession<AdminSession>(req.cookies as any, sessionOptions);

    if (!session.isAdmin) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
