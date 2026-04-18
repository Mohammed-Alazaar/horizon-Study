import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";

const fallbackPosts = [
  { title: "How to Legalize Your Documents Through the Turkish Ministry of Foreign Affairs", slug: "how-to-legalize-documents-turkey", excerpt: "A step-by-step guide to getting your certificates officially legalized in Ankara, including apostille certification.", category: "Document Legalization", coverColor: "linear-gradient(135deg,#0D2B55,#1A5FB4)", readTime: 5 },
  { title: "Top Private Universities in Ankara for International Students in 2025", slug: "private-universities-ankara-guide", excerpt: "Compare programs, tuition fees, and language options at Ankara's leading private universities.", category: "University Admissions", coverColor: "linear-gradient(135deg,#0F4C2A,#1A7A45)", readTime: 7 },
  { title: "What Is a Certified Translation and Why Do You Need One in Turkey?", slug: "certified-translation-turkey", excerpt: "Everything you need to know about sworn and certified translations accepted by Turkish authorities.", category: "Translation Tips", coverColor: "linear-gradient(135deg,#2A1A5E,#4A30A0)", readTime: 4 },
];

async function getPosts() {
  try {
    await connectDB();
    const posts = await BlogPost.find({ published: true }).sort({ createdAt: -1 }).limit(3).lean();
    return posts.length ? posts : fallbackPosts;
  } catch {
    return fallbackPosts;
  }
}

export default async function BlogSection() {
  const posts = await getPosts();

  return (
    <section className="py-[90px] px-[5%] bg-off-white">
      <div className="flex flex-wrap items-end justify-between gap-5 mb-14">
        <div>
          <div className="text-xs font-medium tracking-[2px] uppercase text-blue mb-3">Latest Articles</div>
          <h2 className="font-display text-[clamp(28px,3vw,40px)] font-bold text-navy-dark leading-tight mb-3.5">
            From Our Blog
          </h2>
          <p className="text-base text-gray-horizon-500 max-w-[560px] leading-[1.7]">
            Tips, guides, and news about studying and living in Turkey.
          </p>
        </div>
        <Link href="/blog" className="bg-gold text-navy-dark px-[30px] py-3.5 rounded-lg text-[15px] font-medium border-2 border-gold hover:bg-gold-light transition-colors">
          View All Posts
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post: any) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="bg-white rounded-2xl overflow-hidden border border-gray-horizon-100 hover:shadow-[0_12px_40px_rgba(13,27,46,0.08)] hover:-translate-y-[3px] transition-all block no-underline"
          >
            <div
              className="h-[180px] flex items-end p-4"
              style={{ background: post.coverColor ?? post.coverUrl ? undefined : "linear-gradient(135deg,#1A3D6E,#2A6DB5)" }}
            >
              {post.coverUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={post.coverUrl} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
              )}
              <span className="text-[11px] font-medium tracking-[0.8px] uppercase text-gold-light bg-black/30 px-2.5 py-1 rounded">
                {post.category}
              </span>
            </div>
            <div className="p-[22px]">
              <div className="text-base font-medium text-navy-dark mb-2.5 leading-snug">{post.title}</div>
              <div className="text-[13px] text-gray-horizon-500 leading-[1.65] mb-[18px]">{post.excerpt}</div>
              <div className="text-xs text-gray-horizon-300 flex items-center gap-2.5">
                <span>{post.author ?? "Horizon Group"}</span>
                <span>·</span>
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
