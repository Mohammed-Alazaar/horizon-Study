import { SessionOptions, getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export interface AdminSession {
  isAdmin: boolean;
}

export const sessionOptions: SessionOptions = {
  cookieName: "horizon_admin",
  password: process.env.SESSION_SECRET!,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 8,
  },
};

export async function getSession() {
  // Next.js 14: cookies() is synchronous but typing varies — cast to any to satisfy iron-session
  const cookieStore = cookies() as any;
  return getIronSession<AdminSession>(cookieStore, sessionOptions);
}

export async function requireAdmin(): Promise<NextResponse | null> {
  try {
    const session = await getSession();
    if (!session.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return null;
  } catch (err) {
    console.error("[requireAdmin] session error:", err);
    return NextResponse.json({ error: "Session error" }, { status: 500 });
  }
}
