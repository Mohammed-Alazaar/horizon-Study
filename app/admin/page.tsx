import { connectDB } from "@/lib/mongodb";
import University from "@/models/University";
import BlogPost from "@/models/BlogPost";

async function getStats() {
  try {
    await connectDB();
    const [uniCount, postCount, publishedCount] = await Promise.all([
      University.countDocuments(),
      BlogPost.countDocuments(),
      BlogPost.countDocuments({ published: true }),
    ]);
    return { uniCount, postCount, publishedCount };
  } catch {
    return { uniCount: 0, postCount: 0, publishedCount: 0 };
  }
}

export default async function AdminDashboard() {
  const { uniCount, postCount, publishedCount } = await getStats();

  return (
    <div className="p-8">
      <h1 className="font-display text-2xl font-bold text-navy-dark mb-2">Dashboard</h1>
      <p className="text-gray-horizon-500 text-sm mb-8">Welcome back, Admin.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {[
          { label: "Universities", value: uniCount, icon: "🎓", color: "bg-blue/[0.08]" },
          { label: "Blog Posts", value: postCount, icon: "📝", color: "bg-gold/[0.08]" },
          { label: "Published Posts", value: publishedCount, icon: "✅", color: "bg-green-50" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-6 border border-gray-horizon-100">
            <div className={`w-12 h-12 ${s.color} rounded-xl flex items-center justify-center text-2xl mb-4`}>{s.icon}</div>
            <div className="font-display text-3xl font-bold text-navy-dark mb-1">{s.value}</div>
            <div className="text-sm text-gray-horizon-500">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <QuickAction href="/admin/universities" title="Manage Universities" desc="Add, edit, or remove partner universities. Import via Excel." icon="🎓" />
        <QuickAction href="/admin/blog" title="Manage Blog Posts" desc="Create and publish articles about study life in Turkey." icon="📝" />
      </div>
    </div>
  );
}

function QuickAction({ href, title, desc, icon }: { href: string; title: string; desc: string; icon: string }) {
  return (
    <a href={href} className="bg-white rounded-2xl p-6 border border-gray-horizon-100 hover:border-blue hover:shadow-md transition-all block no-underline group">
      <div className="text-3xl mb-3">{icon}</div>
      <div className="font-medium text-navy-dark mb-1 group-hover:text-blue transition-colors">{title}</div>
      <div className="text-sm text-gray-horizon-500">{desc}</div>
    </a>
  );
}
