import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import University from "@/models/University";
import { slugify } from "@/lib/slugify";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const universities = await University.find({}).sort({ order: 1 }).lean();
    return NextResponse.json(universities);
  } catch (err: unknown) {
    console.error("[GET /api/universities]", err);
    return NextResponse.json({ error: "Failed to fetch universities" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    await connectDB();
    const body = await req.json();
    // Remove _id so MongoDB generates a fresh ObjectId
    const { _id, ...data } = body;
    void _id;
    const slug = data.slug || slugify(data.name);
    const shortName = data.shortName?.trim() || data.name;
    // Coerce number fields — form inputs arrive as strings
    data.establishedYear = data.establishedYear ? Number(data.establishedYear) : null;
    data.localRank = data.localRank ? Number(data.localRank) : null;
    data.order = Number(data.order) || 0;
    const university = await University.create({ ...data, shortName, slug });
    return NextResponse.json(university, { status: 201 });
  } catch (err: any) {
    console.error("[POST /api/universities]", err);
    if (err.code === 11000) {
      return NextResponse.json({ error: "A university with this name already exists." }, { status: 409 });
    }
    // Return the real Mongoose validation message
    const message = err?.message ?? "Failed to create university";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
