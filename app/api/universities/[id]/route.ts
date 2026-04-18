import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import University from "@/models/University";
import { slugify } from "@/lib/slugify";
import { requireAdmin } from "@/lib/auth";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDB();
    const uni = await University.findById(id).lean();
    if (!uni) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(uni);
  } catch (err: unknown) {
    console.error("[GET /api/universities/[id]]", err);
    return NextResponse.json({ error: "Failed to fetch university" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const { id } = await params;
    await connectDB();
    const { _id, __v, createdAt, updatedAt, ...body } = await req.json();
    void _id; void __v; void createdAt; void updatedAt;
    if (body.name && !body.slug) body.slug = slugify(body.name);
    if (!body.shortName?.trim()) body.shortName = body.name;
    body.establishedYear = body.establishedYear ? Number(body.establishedYear) : null;
    body.localRank = body.localRank ? Number(body.localRank) : null;
    body.order = Number(body.order) || 0;
    const uni = await University.findByIdAndUpdate(id, body, { new: true, runValidators: true }).lean();
    if (!uni) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(uni);
  } catch (err: any) {
    console.error("[PUT /api/universities/[id]]", err);
    const message = err?.message ?? "Failed to update university";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const { id } = await params;
    await connectDB();
    const uni = await University.findByIdAndDelete(id);
    if (!uni) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error("[DELETE /api/universities/[id]]", err);
    return NextResponse.json({ error: "Failed to delete university" }, { status: 500 });
  }
}
