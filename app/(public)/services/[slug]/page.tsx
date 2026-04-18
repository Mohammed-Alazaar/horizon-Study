import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import CTASection from "@/components/home/CTASection";

const serviceData: Record<string, { title: string; icon: string; desc: string; content: string }> = {
  "certified-translation": {
    title: "Certified Translation",
    icon: "📝",
    desc: "Sworn and certified translation services accepted by all official institutions in Turkey.",
    content: `<h2>What is a Certified Translation?</h2>
<p>A certified translation is a translation accompanied by a signed statement from the translator attesting to the accuracy and completeness of the translation. In Turkey, this is known as a <strong>sworn translation</strong> (yeminli tercüme).</p>
<h2>What Documents Can We Translate?</h2>
<ul>
<li>Academic diplomas, transcripts, and certificates</li>
<li>Birth, death, and marriage certificates</li>
<li>National identity documents and passports</li>
<li>Legal contracts and agreements</li>
<li>Court orders and legal judgments</li>
<li>Medical records and reports</li>
</ul>
<h2>Why Choose Horizon Group?</h2>
<p>Our translators are certified by Turkish notaries and officially registered as sworn translators. Every translation we deliver is accepted by universities, government offices, notaries, and courts across Turkey.</p>`,
  },
  "university-admissions": {
    title: "University Admissions",
    icon: "🎓",
    desc: "Full application support to Ankara's leading private universities.",
    content: `<h2>How We Help</h2>
<p>Navigating university admissions in Turkey as an international student can be complex. Our team handles the entire process — from choosing the right program to receiving your acceptance letter.</p>
<h2>Our Process</h2>
<ul>
<li><strong>Free Consultation:</strong> We assess your documents and recommend the best universities for your profile.</li>
<li><strong>Application Preparation:</strong> We complete and review your application forms.</li>
<li><strong>Document Submission:</strong> We submit certified copies of all required documents.</li>
<li><strong>Follow-Up:</strong> We liaise with university admissions offices on your behalf.</li>
<li><strong>Acceptance:</strong> We guide you through enrollment and registration.</li>
</ul>
<h2>Partner Universities</h2>
<p>We have official partnerships with OSTİM Technical University, Lokman Hekim University, Ankara Medipol University, TED University, and Atılım University.</p>`,
  },
  "document-legalization": {
    title: "Document Legalization",
    icon: "📋",
    desc: "Ministry of Foreign Affairs and embassy legalization for all official documents.",
    content: `<h2>What is Document Legalization?</h2>
<p>Document legalization is the process of authenticating official documents so they are recognized as valid in Turkey or abroad. This includes apostille certification and embassy/consulate attestation.</p>
<h2>Services We Provide</h2>
<ul>
<li>Turkish Ministry of Foreign Affairs legalization</li>
<li>Embassy and consulate attestation for all countries</li>
<li>Apostille certification (Hague Convention)</li>
<li>Notarial authentication</li>
<li>End-to-end document tracking and delivery</li>
</ul>
<h2>Processing Time</h2>
<p>Standard processing takes 3–5 business days. Express service is available for urgent cases. Contact us for more details.</p>`,
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceData[slug];
  if (!service) return {};
  return { title: service.title, description: service.desc };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = serviceData[slug];
  if (!service) notFound();

  return (
    <>
      <section className="py-20 px-[5%] bg-gradient-to-br from-navy-dark to-navy text-white text-center">
        <div className="text-4xl mb-4">{service.icon}</div>
        <h1 className="font-display text-[clamp(28px,4vw,48px)] font-bold mb-4">{service.title}</h1>
        <p className="text-white/65 text-lg max-w-xl mx-auto">{service.desc}</p>
      </section>

      <section className="py-16 px-[5%]">
        <div className="max-w-3xl mx-auto">
          <article
            className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-navy-dark prose-p:text-gray-horizon-500 prose-li:text-gray-horizon-500"
            dangerouslySetInnerHTML={{ __html: service.content }}
          />
          <div className="mt-10 flex gap-4 flex-wrap">
            <Link href="/contact" className="bg-gold text-navy-dark px-6 py-3 rounded-lg text-sm font-medium hover:bg-gold-light transition-colors">
              Get Free Consultation
            </Link>
            <Link href="/services" className="border border-gray-horizon-300 text-gray-horizon-700 px-6 py-3 rounded-lg text-sm hover:border-navy transition-colors">
              All Services
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

export function generateStaticParams() {
  return Object.keys(serviceData).map((slug) => ({ slug }));
}
