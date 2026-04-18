import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Horizon Group",
  description:
    "Horizon Group Privacy Policy — how we collect, process, and protect your personal data in accordance with Turkish Law No. 6698 (KVKK).",
};

const sections = [
  {
    title: "1. Data Controller",
    body: `Horizon Group Study Services ("Company", "we", "us") acts as the data controller within the meaning of Article 3 of Turkish Law No. 6698 on the Protection of Personal Data ("KVKK"). Our registered address is Meşrutiyet Cad. 10/59, Çankaya – Ankara, Turkey. You may contact us at info@horizonstudy.org or by phone at +90 534 215 46 51.`,
  },
  {
    title: "2. Personal Data We Collect",
    body: `We collect and process the following categories of personal data:\n\n• Identity data: full name, date of birth, nationality, passport or ID number.\n• Contact data: email address, phone number, residential address.\n• Education data: academic records, transcripts, diplomas, and language certificates.\n• Financial data: payment receipts and bank transfer confirmations (processed only to confirm service fees; card details are never stored by us).\n• Communication data: messages and correspondence submitted through our website forms or via email/WhatsApp.\n• Technical data: IP address, browser type, and anonymised usage statistics collected via cookies.`,
  },
  {
    title: "3. Purposes and Legal Basis for Processing",
    body: `We process your personal data for the following purposes and on the following legal bases under KVKK Article 5:\n\n• Providing university admissions and document services: performance of the service agreement (Art. 5/2-c).\n• Sending appointment reminders and service updates: legitimate interest and, where applicable, your explicit consent (Art. 5/1).\n• Complying with legal obligations (e.g. notary or apostille requirements): legal obligation (Art. 5/2-ç).\n• Improving our website and services: legitimate interest in operating our business efficiently (Art. 5/2-f).\n• Direct marketing communications: exclusively based on your freely given, specific, and informed consent (Art. 5/1); you may withdraw consent at any time.`,
  },
  {
    title: "4. Transfer of Personal Data",
    body: `Your personal data may be shared with the following parties in accordance with KVKK Articles 8 and 9:\n\n• Turkish universities and higher-education institutions to which you apply, solely for admissions purposes.\n• Notary offices, sworn translation bureaus, and apostille authorities as required to complete your documentation.\n• Cloud infrastructure and hosting service providers (data processing agreements are in place with all processors).\n• Public authorities and courts when required by law.\n\nWe do not sell your personal data to third parties. Where data is transferred abroad, we apply safeguards required by KVKK Article 9.`,
  },
  {
    title: "5. Retention Period",
    body: `We retain your personal data only for as long as necessary to fulfil the purposes described above or as required by Turkish law. In practice:\n\n• Client files are retained for a minimum of 10 years following completion of services, in line with the Turkish Code of Obligations statute of limitations.\n• Marketing consent records are retained until consent is withdrawn plus 3 years.\n• Website technical logs are retained for no longer than 2 years.\n\nAt the end of each retention period, data is securely deleted, destroyed, or anonymised.`,
  },
  {
    title: "6. Cookies and Tracking Technologies",
    body: `Our website uses strictly necessary cookies to ensure correct operation, and optional analytics cookies (with your consent) to understand how visitors use the site. You may manage or withdraw cookie consent at any time via your browser settings. Refusing optional cookies will not affect your access to our services.`,
  },
  {
    title: "7. Data Security",
    body: `We implement administrative and technical measures commensurate with the risk of processing to protect your personal data against unauthorised access, loss, alteration, or disclosure. Access to personal data is restricted to authorised personnel on a need-to-know basis. In the event of a data breach, we will notify the Personal Data Protection Authority (Kişisel Verileri Koruma Kurumu – KVKK) and affected individuals as required by law.`,
  },
  {
    title: "8. Rights of Data Subjects (KVKK Article 11)",
    body: `Pursuant to KVKK Article 11, you have the right to:\n\na) Learn whether your personal data is being processed;\nb) Request information about the processing if applicable;\nc) Learn the purpose of the processing and whether it is used in accordance with its purpose;\nd) Know the third parties to whom data is transferred domestically or abroad;\ne) Request rectification where data is incomplete or inaccurate;\nf) Request erasure or destruction of data under the conditions in KVKK Article 7;\ng) Request notification of operations in (e) and (f) to third parties to whom data has been transferred;\nh) Object to the occurrence of a result against you by analysis of processed data exclusively through automated means;\ni) Claim compensation for damages arising from unlawful processing.\n\nTo exercise your rights, please submit a written application to our address above or send a signed request to info@horizonstudy.org. We will respond within 30 days as required by KVKK Article 13.`,
  },
  {
    title: "9. Supervisory Authority",
    body: `If you believe your rights under KVKK have been violated, you have the right to lodge a complaint with the Personal Data Protection Authority (KVKK Kurumu) at www.kvkk.gov.tr.`,
  },
  {
    title: "10. Changes to This Policy",
    body: `We may update this Privacy Policy from time to time. The current version is always available on this page with the effective date shown below. Continued use of our services following a material change constitutes acceptance of the updated policy.`,
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-off-white dark:bg-[#0b1422]">
      {/* Hero */}
      <section className="py-20 px-[5%] bg-gradient-to-br from-navy-dark to-navy text-white text-center">
        <p className="text-[13px] font-medium text-gold uppercase tracking-[0.15em] mb-3">
          Legal
        </p>
        <h1 className="font-display text-[clamp(28px,4vw,48px)] font-bold leading-tight mb-4">
          Privacy Policy
        </h1>
        <p className="text-white/60 text-sm max-w-xl mx-auto">
          In accordance with Turkish Law No. 6698 on the Protection of Personal Data (KVKK)
        </p>
        <p className="text-white/40 text-xs mt-4">Effective date: 18 April 2025</p>
      </section>

      {/* Content */}
      <section className="py-16 px-[5%] max-w-3xl mx-auto">
        <div className="bg-white dark:bg-[#111d2e] rounded-2xl shadow-[0_12px_40px_rgba(13,27,46,0.08)] p-8 md:p-12 flex flex-col gap-10">
          <p className="text-gray-horizon-500 dark:text-white/60 text-sm leading-relaxed">
            Horizon Group Study Services values your privacy. This Privacy Policy explains what
            personal data we collect, why we collect it, how we use and protect it, and the rights
            you hold as a data subject under Turkish law. Please read it carefully before using our
            website or engaging our services.
          </p>

          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="font-display text-[18px] font-semibold text-navy dark:text-white mb-3">
                {s.title}
              </h2>
              <p className="text-gray-horizon-500 dark:text-white/60 text-sm leading-relaxed whitespace-pre-line">
                {s.body}
              </p>
            </div>
          ))}

          <div className="border-t border-gray-horizon-100 dark:border-white/10 pt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-gold hover:bg-gold-light text-navy-dark font-semibold text-sm px-6 py-3 rounded-lg transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/terms"
              className="inline-flex items-center justify-center border border-navy/20 dark:border-white/10 text-navy dark:text-white/80 font-semibold text-sm px-6 py-3 rounded-lg hover:bg-navy/5 dark:hover:bg-white/5 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
