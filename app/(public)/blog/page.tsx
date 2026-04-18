import type { Metadata } from "next";
import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";

export const metadata: Metadata = {
  title: "Blog",
  description: "Tips, guides, and news about studying and living in Turkey from Horizon Group.",
};

async function getPosts() {
  try {
    await connectDB();
    return await BlogPost.find({ published: true }).sort({ createdAt: -1 }).lean();
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <section className="py-20 px-[5%] bg-gradient-to-br from-navy-dark to-navy text-white text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-xs font-medium tracking-[2px] uppercase text-gold-light mb-3">Our Blog</div>
          <h1 className="font-display text-[clamp(32px,4vw,52px)] font-bold mb-4">Latest Articles</h1>
          <p className="text-white/65 text-lg">Tips, guides, and news about studying and living in Turkey.</p>
        </div>
      </section>

      <section className="py-20 px-[5%]">
        {posts.length === 0 ? (
          <div className="text-center text-gray-horizon-500 py-20">
            <div className="text-5xl mb-4">📝</div>
            <p className="text-lg">No articles yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {posts.map((post: any) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-white rounded-2xl overflow-hidden border border-gray-horizon-100 hover:shadow-[0_12px_40px_rgba(13,27,46,0.08)] hover:-translate-y-[3px] transition-all block no-underline"
              >
                <div className="h-[180px] flex items-end p-4 relative" style={{ background: post.coverColor ?? "linear-gradient(135deg,#1A3D6E,#2A6DB5)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {post.coverUrl && <img src={post.coverUrl} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />}
                  <span className="text-[11px] font-medium tracking-[0.8px] uppercase text-gold-light bg-black/30 px-2.5 py-1 rounded z-10 relative">{post.category}</span>
                </div>
                <div className="p-[22px]">
                  <div className="text-base font-medium text-navy-dark mb-2.5 leading-snug">{post.title}</div>
                  <div className="text-[13px] text-gray-horizon-500 leading-[1.65] mb-[18px]">{post.excerpt}</div>
                  <div className="text-xs text-gray-horizon-300 flex items-center gap-2.5">
                    <span>{post.author}</span>
                    <span>·</span>
                    <span>{post.readTime} min read</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
