import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-navy-dark via-navy to-[#1A3D6E] flex items-center px-[5%] pt-[100px] pb-[60px] relative overflow-hidden">
      {/* decorative glows */}
      <div className="absolute -top-[200px] -right-[200px] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(240,165,0,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute -bottom-[100px] -left-[100px] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(26,95,180,0.15)_0%,transparent_70%)] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-center max-w-[1200px] mx-auto w-full">
        {/* Left */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 text-gold-light px-3.5 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
            Based in Ankara, Turkey
          </div>

          <h1 className="font-display text-[clamp(36px,4.5vw,58px)] font-bold text-white leading-[1.15] mb-5">
            Your Gateway to{" "}
            <span className="text-gold">Study & Documents</span> in Turkey
          </h1>

          <p className="text-[17px] text-white/65 leading-[1.75] mb-9 max-w-[480px]">
            Certified translation, university admissions, and document legalization — all handled by experts in Ankara.
          </p>

          <div className="flex gap-3.5 flex-wrap">
            <Link
              href="/contact"
              className="bg-gold text-navy-dark px-[30px] py-3.5 rounded-lg text-[15px] font-medium border-2 border-gold hover:bg-gold-light hover:border-gold-light hover:-translate-y-px transition-all"
            >
              Get Free Consultation
            </Link>
            <Link
              href="/services"
              className="bg-transparent text-white px-[30px] py-3.5 rounded-lg text-[15px] border border-white/30 hover:border-white/70 hover:bg-white/[0.06] transition-all"
            >
              Our Services
            </Link>
          </div>

          <div className="flex gap-9 mt-12 pt-9 border-t border-white/10">
            {[
              { num: "500+", label: "Students Helped" },
              { num: "10+", label: "Years Experience" },
              { num: "All", label: "Languages" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display text-[30px] font-bold text-gold leading-none mb-1">{s.num}</div>
                <div className="text-xs text-white/50 tracking-wide uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right cards */}
        <div className="hidden lg:flex flex-col gap-4 relative z-10">
          {[
            { icon: "📝", title: "Certified Translation", desc: "Sworn translations accepted by all official institutions" },
            { icon: "🎓", title: "University Admissions", desc: "Full application support to private universities" },
            { icon: "📋", title: "Document Legalization", desc: "Ministry of Foreign Affairs & embassy legalization" },
            { icon: "📍", title: "Meşrutiyet Cad. 10/59", desc: "Çankaya – Ankara · 0534 215 46 51" },
          ].map((card) => (
            <div
              key={card.title}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 px-6 flex items-center gap-[18px] backdrop-blur-sm hover:bg-white/[0.09] hover:border-gold/30 hover:translate-x-1.5 transition-all"
            >
              <div className="w-12 h-12 bg-gold/15 rounded-xl flex items-center justify-center text-[22px] shrink-0">
                {card.icon}
              </div>
              <div>
                <div className="text-[15px] font-medium text-white mb-1">{card.title}</div>
                <div className="text-[13px] text-white/50 leading-snug">{card.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
