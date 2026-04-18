import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Our Services",
  description: "Certified translation, university admissions, and document legalization services in Ankara, Turkey.",
};

const services = [
  {
    icon: "📝",
    title: "Certified Translation",
    slug: "certified-translation",
    desc: "We provide sworn and certified translation services to and from all languages, accepted by official authorities and institutions across Turkey and abroad.",
    details: [
      "Certified (sworn) translations for all official languages",
      "Academic transcripts, diplomas, and certificates",
      "Birth, marriage, and civil status documents",
      "Legal contracts and court documents",
      "Fast turnaround — same-day service available",
    ],
  },
  {
    icon: "🎓",
    title: "University Admissions",
    slug: "university-admissions",
    desc: "We assist students in securing admissions to private universities, including application preparation, document submission, and follow-up until acceptance.",
    details: [
      "Full admission guidance for 5 partner universities",
      "Application form preparation and submission",
      "Document collection and certification",
      "Scholarship and discount negotiation",
      "Follow-up with university admissions offices",
    ],
  },
  {
    icon: "📋",
    title: "Document Legalization",
    slug: "document-legalization",
    desc: "We manage the legalization of certificates and official documents through the Turkish Ministry of Foreign Affairs and relevant embassies.",
    details: [
      "Ministry of Foreign Affairs legalization",
      "Embassy and consulate attestation",
      "Apostille certification",
      "Notarial services",
      "End-to-end document handling",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="py-20 px-[5%] bg-gradient-to-br from-navy-dark to-navy text-white text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-xs font-medium tracking-[2px] uppercase text-gold-light mb-3">What We Do</div>
          <h1 className="font-display text-[clamp(32px,4vw,52px)] font-bold mb-4">Our Services</h1>
          <p className="text-white/65 text-lg leading-relaxed">
            Everything you need to study in Turkey or legalize your documents, handled by certified professionals in Ankara.
          </p>
        </div>
      </section>

      <section className="py-20 px-[5%]">
        <div className="max-w-5xl mx-auto flex flex-col gap-12">
          {services.map((s, i) => (
            <div
              key={s.slug}
              className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-10 items-center`}
            >
              <div className="flex-1">
                <div className="w-16 h-16 bg-blue/[0.08] rounded-2xl flex items-center justify-center text-[30px] mb-5">
                  {s.icon}
                </div>
                <h2 className="font-display text-[28px] font-bold text-navy-dark mb-4">{s.title}</h2>
                <p className="text-gray-horizon-500 text-base leading-[1.75] mb-6">{s.desc}</p>
                <Link href={`/services/${s.slug}`} className="inline-block bg-gold text-navy-dark px-6 py-3 rounded-lg text-sm font-medium hover:bg-gold-light transition-colors">
                  Learn More
                </Link>
              </div>
              <div className="flex-1 bg-off-white rounded-2xl p-8">
                <ul className="flex flex-col gap-3">
                  {s.details.map((d) => (
                    <li key={d} className="flex items-start gap-3 text-sm text-gray-horizon-700">
                      <span className="text-gold mt-0.5">✓</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
