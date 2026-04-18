import Link from "next/link";
import LogoutButton from "@/components/admin/LogoutButton";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-60 bg-navy-dark flex flex-col shrink-0">
        <div className="p-6 border-b border-white/[0.07]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center font-display text-base font-bold text-navy-dark">H</div>
            <div>
              <div className="font-display text-[15px] font-semibold text-white leading-tight">Horizon Admin</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1">
          {[
            { href: "/admin", label: "Dashboard", icon: "📊" },
            { href: "/admin/universities", label: "Universities", icon: "🎓" },
            { href: "/admin/blog", label: "Blog Posts", icon: "📝" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/60 text-sm hover:text-white hover:bg-white/[0.06] transition-all no-underline"
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/[0.07]">
          <Link href="/" className="flex items-center gap-2 text-white/40 text-xs hover:text-white/70 transition-colors mb-3">
            ← View Site
          </Link>
          <LogoutButton />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
