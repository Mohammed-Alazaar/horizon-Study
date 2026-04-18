import Link from "next/link";

const services = [
  {
    icon: "📝",
    title: "Certified Translation",
    desc: "We provide sworn and certified translation services to and from all languages, accepted by official authorities and institutions across Turkey and abroad.",
    href: "/services/certified-translation",
  },
  {
    icon: "🎓",
    title: "University Admissions",
    desc: "We assist students in securing admissions to private universities, including application preparation, document submission, and follow-up until acceptance.",
    href: "/services/university-admissions",
  },
  {
    icon: "📋",
    title: "Document Legalization",
    desc: "We manage the legalization of certificates and official documents through the Turkish Ministry of Foreign Affairs and relevant embassies.",
    href: "/services/document-legalization",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-[90px] px-[5%] bg-off-white">
      <div className="mb-14">
        <div className="text-xs font-medium tracking-[2px] uppercase text-blue mb-3">What We Do</div>
        <h2 className="font-display text-[clamp(28px,3vw,40px)] font-bold text-navy-dark leading-tight mb-3.5">
          Our Core Services
        </h2>
        <p className="text-base text-gray-horizon-500 max-w-[560px] leading-[1.7]">
          Everything you need to study in Turkey or legalize your documents — under one roof.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((s) => (
          <div
            key={s.title}
            className="bg-white rounded-2xl p-9 px-[30px] border border-gray-horizon-100 hover:shadow-[0_20px_60px_rgba(13,27,46,0.1)] hover:-translate-y-1 transition-all relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            <div className="w-14 h-14 bg-blue/[0.08] rounded-xl flex items-center justify-center text-[26px] mb-[22px]">
              {s.icon}
            </div>
            <h3 className="font-display text-xl font-semibold text-navy-dark mb-3">{s.title}</h3>
            <p className="text-sm text-gray-horizon-500 leading-[1.75] mb-6">{s.desc}</p>
            <Link href={s.href} className="text-sm font-medium text-blue no-underline flex items-center gap-1.5 hover:gap-2.5 transition-all">
              Learn more →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
