import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions, AdminSession } from "@/lib/auth";

export async function POST() {
  try {
    const cookieStore = cookies() as any;
    const session = await getIronSession<AdminSession>(cookieStore, sessionOptions);
    session.destroy();
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error("[POST /api/auth/logout]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
