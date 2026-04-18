import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import { slugify } from "@/lib/slugify";
import { requireAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const all = searchParams.get("all") === "true";
    const posts = await BlogPost.find(all ? {} : { published: true }).sort({ createdAt: -1 }).lean();
    return NextResponse.json(posts);
  } catch (err: unknown) {
    console.error("[GET /api/blog]", err);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    await connectDB();
    const body = await req.json();
    const { _id, createdAt, updatedAt, ...data } = body;
    void _id; void createdAt; void updatedAt;
    const slug = data.slug || slugify(data.title);
    const post = await BlogPost.create({ ...data, slug });
    return NextResponse.json(post, { status: 201 });
  } catch (err: any) {
    console.error("[POST /api/blog]", err);
    if (err.code === 11000) {
      return NextResponse.json({ error: "A post with this title already exists." }, { status: 409 });
    }
    return NextResponse.json({ error: err?.message ?? "Failed to create post" }, { status: 500 });
  }
}
