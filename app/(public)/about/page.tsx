import type { Metadata } from "next";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Horizon Group — Ankara's trusted partner for study services and document legalization.",
};

export default function AboutPage() {
  return (
    <>
      <section className="py-20 px-[5%] bg-gradient-to-br from-navy-dark to-navy text-white text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-xs font-medium tracking-[2px] uppercase text-gold-light mb-3">About Us</div>
          <h1 className="font-display text-[clamp(32px,4vw,52px)] font-bold mb-4">Who We Are</h1>
          <p className="text-white/65 text-lg leading-relaxed">
            Horizon Group is Ankara&apos;s leading provider of certified translation, university admissions guidance, and document legalization services.
          </p>
        </div>
      </section>

      <section className="py-20 px-[5%]">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-display text-3xl font-bold text-navy-dark mb-5">Our Story</h2>
            <p className="text-gray-horizon-500 leading-relaxed mb-4">
              Founded in Ankara with a mission to bridge the gap between international students and Turkish higher education, Horizon Group has grown into a trusted name for students from across the Arab world and beyond.
            </p>
            <p className="text-gray-horizon-500 leading-relaxed mb-4">
              We understand the challenges of studying abroad — the paperwork, the language barriers, the unfamiliar systems. Our team of certified translators, admissions specialists, and document experts handles all of it, so you can focus on your studies.
            </p>
            <p className="text-gray-horizon-500 leading-relaxed">
              With over 10 years of experience and 500+ students successfully enrolled, we&apos;ve built direct partnerships with 5 of Ankara&apos;s leading private universities.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { num: "500+", label: "Students Enrolled" },
              { num: "10+", label: "Years Experience" },
              { num: "5", label: "Partner Universities" },
              { num: "All", label: "Languages" },
            ].map((s) => (
              <div key={s.label} className="bg-off-white rounded-2xl p-6 text-center">
                <div className="font-display text-[36px] font-bold text-gold leading-none mb-2">{s.num}</div>
                <div className="text-sm text-gray-horizon-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-[5%] bg-off-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-navy-dark mb-3">Our Location</h2>
          <p className="text-gray-horizon-500 mb-6">Visit us at our office in central Ankara.</p>
          <div className="bg-white rounded-2xl p-8 border border-gray-horizon-100 inline-block text-left">
            <div className="flex flex-col gap-2 text-sm text-gray-horizon-700">
              <span>📍 Meşrutiyet Cad. 10/59, Çankaya – Ankara, Turkey</span>
              <span><a href="tel:+905342154651" className="text-blue hover:underline">📞 0534 215 46 51</a></span>
              <span><a href="tel:+905398870830" className="text-blue hover:underline">📞 0539 887 08 30</a></span>
              <span><a href="https://www.horizonstudy.org" className="text-blue hover:underline">🌐 www.horizonstudy.org</a></span>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
