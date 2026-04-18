import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import { slugify } from "@/lib/slugify";
import { requireAdmin } from "@/lib/auth";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDB();
    const post = await BlogPost.findById(id).lean();
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(post);
  } catch (err: unknown) {
    console.error("[GET /api/blog/[id]]", err);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const { id } = await params;
    await connectDB();
    const body = await req.json();
    if (body.title && !body.slug) body.slug = slugify(body.title);
    const post = await BlogPost.findByIdAndUpdate(id, body, { new: true, runValidators: true }).lean();
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(post);
  } catch (err: any) {
    console.error("[PUT /api/blog/[id]]", err);
    return NextResponse.json({ error: err?.message ?? "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const { id } = await params;
    await connectDB();
    const post = await BlogPost.findByIdAndDelete(id);
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error("[DELETE /api/blog/[id]]", err);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
