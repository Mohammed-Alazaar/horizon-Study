import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import sanitizeHtml from "sanitize-html";
import { connectDB } from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";

async function getPost(slug: string) {
  try {
    await connectDB();
    return await BlogPost.findOne({ slug, published: true }).lean();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post: any = await getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post: any = await getPost(slug);
  if (!post) notFound();

  const safeContent = sanitizeHtml(post.content ?? "", {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["h1", "h2", "h3", "img"]),
    allowedAttributes: { ...sanitizeHtml.defaults.allowedAttributes, img: ["src", "alt", "class"] },
  });

  return (
    <>
      <section className="py-20 px-[5%] text-white relative" style={{ background: post.coverColor ?? "linear-gradient(135deg,#1A3D6E,#2A6DB5)" }}>
        {post.coverUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.coverUrl} alt={post.title} className="absolute inset-0 w-full h-full object-cover opacity-30" />
        )}
        <div className="max-w-3xl relative z-10">
          <span className="text-[11px] font-medium tracking-[0.8px] uppercase text-gold-light bg-black/30 px-2.5 py-1 rounded mb-4 inline-block">{post.category}</span>
          <h1 className="font-display text-[clamp(26px,3.5vw,42px)] font-bold mb-4 leading-tight">{post.title}</h1>
          <div className="flex items-center gap-3 text-white/60 text-sm">
            <span>{post.author}</span>
            <span>·</span>
            <span>{post.readTime} min read</span>
            <span>·</span>
            <span>{new Date(post.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
          </div>
        </div>
      </section>

      <section className="py-16 px-[5%]">
        <div className="max-w-3xl mx-auto">
          <article
            className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-navy-dark prose-p:text-gray-horizon-500 prose-li:text-gray-horizon-500 prose-a:text-blue"
            dangerouslySetInnerHTML={{ __html: safeContent }}
          />
          <div className="mt-10 pt-8 border-t border-gray-horizon-100 flex gap-4">
            <Link href="/blog" className="border border-gray-horizon-300 text-gray-horizon-700 px-5 py-2.5 rounded-lg text-sm hover:border-navy transition-colors">
              ← Back to Blog
            </Link>
            <Link href="/contact" className="bg-gold text-navy-dark px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gold-light transition-colors">
              Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
