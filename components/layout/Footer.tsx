import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import University from "@/models/University";

const services = [
  { href: "/services/certified-translation", label: "Certified Translation" },
  { href: "/services/university-admissions", label: "University Admissions" },
  { href: "/services/document-legalization", label: "Document Legalization" },
];

const company = [
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
];

async function getFooterUniversities(): Promise<{ href: string; label: string }[]> {
  try {
    await connectDB();
    const unis = await University.find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name slug")
      .lean<{ name: string; slug: string }[]>();
    return unis.map((u) => ({ href: `/universities/${u.slug}`, label: u.name }));
  } catch {
    return [];
  }
}

export default async function Footer() {
  const universities = await getFooterUniversities();

  return (
    <footer className="bg-navy-dark py-16 px-[5%] pb-8">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 bg-gold rounded-lg flex items-center justify-center font-display text-lg font-bold text-navy-dark">
              H
            </div>
            <div>
              <div className="font-display text-[17px] font-semibold text-white leading-tight">
                Horizon Group
              </div>
              <div className="text-[10px] font-light text-gray-horizon-300 tracking-widest uppercase">
                Study Services
              </div>
            </div>
          </div>
          <p className="text-sm text-white/45 leading-relaxed max-w-[280px] mt-3">
            Your trusted partner for certified translation, university admissions, and document legalization in Ankara, Turkey.
          </p>
          <div className="mt-5 flex flex-col gap-1.5">
            <a href="tel:+905342154651" className="text-[13px] text-white/55 hover:text-gold-light transition-colors">📞 0534 215 46 51</a>
            <a href="tel:+905398870830" className="text-[13px] text-white/55 hover:text-gold-light transition-colors">📞 0539 887 08 30</a>
            <span className="text-[13px] text-white/55">📍 Meşrutiyet Cad. 10/59, Çankaya – Ankara</span>
            <a href="https://www.horizonstudy.org" className="text-[13px] text-white/55 hover:text-gold-light transition-colors">🌐 www.horizonstudy.org</a>
          </div>
        </div>

        <FooterCol title="Services" links={services} />
        {universities.length > 0 && <FooterCol title="Universities" links={universities} />}
        <FooterCol title="Company" links={company} />
      </div>

      <div className="border-t border-white/[0.07] pt-7 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/30">
        <span>© {new Date().getFullYear()} Horizon Group. All rights reserved.</span>
        <span>Meşrutiyet Mah, Çankaya – Ankara, Turkey</span>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h4 className="text-[13px] font-medium text-white tracking-wide uppercase mb-[18px]">{title}</h4>
      <ul className="flex flex-col gap-2.5 list-none">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[13px] text-white/45 hover:text-white/90 transition-colors no-underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
