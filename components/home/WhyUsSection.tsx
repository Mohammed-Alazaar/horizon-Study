const reasons = [
  { num: "500+", title: "Students Enrolled", desc: "Successfully enrolled students across all partner universities in Ankara." },
  { num: "All", title: "Languages Covered", desc: "Certified sworn translation in any language accepted by official institutions." },
  { num: "Fast", title: "Document Processing", desc: "Quick turnaround on legalization through MFA and all embassies in Ankara." },
  { num: "Free", title: "Initial Consultation", desc: "Book a free consultation in person or by phone — no commitment required." },
];

export default function WhyUsSection() {
  return (
    <section className="py-[90px] px-[5%] bg-navy-dark">
      <div className="text-xs font-medium tracking-[2px] uppercase text-gold-light mb-3">Why Choose Us</div>
      <h2 className="font-display text-[clamp(28px,3vw,40px)] font-bold text-white leading-tight mb-3.5">
        Trusted by Hundreds of Students
      </h2>
      <p className="text-base text-white/50 max-w-[560px] leading-[1.7]">
        We&apos;ve helped students from Palestine, Jordan, Sudan, Saudi Arabia, Lebanon and beyond navigate Turkey&apos;s academic and document landscape.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
        {reasons.map((r) => (
          <div
            key={r.title}
            className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-7 px-6 hover:bg-white/[0.07] hover:border-gold/20 transition-all"
          >
            <div className="font-display text-[42px] font-bold text-gold leading-none mb-2.5">{r.num}</div>
            <div className="text-[15px] font-medium text-white mb-2">{r.title}</div>
            <div className="text-[13px] text-white/45 leading-[1.65]">{r.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
