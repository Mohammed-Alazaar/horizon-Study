import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Horizon Group",
  description:
    "Horizon Group Terms of Service — the agreement governing our university admissions, certified translation, and document-processing services under Turkish law.",
};

const sections = [
  {
    title: "1. Parties",
    body: `These Terms of Service ("Terms") constitute a legally binding agreement between Horizon Group Study Services ("Company", "we", "us"), with registered address at Meşrutiyet Cad. 10/59, Çankaya – Ankara, Turkey, and the individual or entity ("Client", "you") who engages our services or uses our website at horizonstudy.org.`,
  },
  {
    title: "2. Services",
    body: `The Company provides the following services:\n\n• University admissions consulting: guidance on Turkish university applications, document preparation, and enrolment procedures.\n• Certified (sworn) translation: preparation of official translations by authorised translators in accordance with Turkish Notary Law No. 1512.\n• Document legalisation and apostille: coordination of apostille stamps and Ministry attestations required for use of foreign documents in Turkey.\n• Academic and language exam support: preparation assistance and registration guidance.\n\nThe scope of services for each engagement is defined in a separate service agreement or quotation accepted by the Client.`,
  },
  {
    title: "3. Client Obligations",
    body: `By engaging our services, you agree to:\n\na) Provide complete, accurate, and truthful information and documents. Submission of forged or misleading documents is a criminal offence under Turkish Penal Code Articles 204–212 and will result in immediate termination of services without refund.\nb) Respond to our requests for additional documents or information within the timeframes specified; delays caused by the Client do not affect our right to collect fees.\nc) Comply with the admission requirements, deadlines, and academic regulations of the universities to which you apply.\nd) Be at least 18 years of age, or have the written consent of your legal guardian if under 18.`,
  },
  {
    title: "4. Fees and Payment",
    body: `Service fees are communicated to the Client prior to engagement and are due as follows:\n\n• 50% of the agreed fee is payable upon signing the service agreement or upon written acceptance of the quotation.\n• The remaining 50% is payable upon completion of the service or delivery of the final documents, unless otherwise agreed in writing.\n\nAll fees are stated in Turkish Lira (TRY) or, where agreed, in a foreign currency at the exchange rate quoted at the time of invoicing. Fees do not include university application fees, government stamp duties, notary charges, or courier costs, which are payable separately by the Client.\n\nInvoices are issued in accordance with Turkish Tax Procedure Law No. 213 and Value Added Tax Law No. 3065.`,
  },
  {
    title: "5. Refund and Cancellation Policy",
    body: `Cancellation by the Client:\n\n• Cancellation before any work has commenced: full refund of any advance payment.\n• Cancellation after work has commenced but before completion: refund of the advance payment less the value of work completed, as reasonably assessed by the Company.\n• Cancellation after delivery of the completed service: no refund.\n\nThe Company reserves the right to cancel a service if the Client provides fraudulent documents or fails to cooperate, in which case no refund will be issued. Refund requests must be submitted in writing to info@horizonstudy.org within 14 days of the cancellation event.`,
  },
  {
    title: "6. Intellectual Property",
    body: `All content on the horizonstudy.org website — including texts, graphics, logos, and software — is the exclusive property of Horizon Group Study Services or its licensors and is protected under Turkish Law No. 5846 on Intellectual and Artistic Works. You may not reproduce, distribute, or create derivative works from any website content without our prior written consent.`,
  },
  {
    title: "7. Limitation of Liability",
    body: `The Company acts as a consulting and facilitation service. We do not guarantee university admission, visa approval, or any particular academic outcome, as final decisions rest solely with the relevant institutions and authorities.\n\nTo the maximum extent permitted by applicable Turkish law, our aggregate liability to you for any claim arising under or in connection with these Terms shall not exceed the total fees paid by you for the specific service giving rise to the claim.\n\nWe are not liable for delays or failures caused by force majeure events, including natural disasters, strikes, government actions, or pandemics, as defined under Turkish Code of Obligations Article 136.`,
  },
  {
    title: "8. Data Protection",
    body: `The Company processes your personal data in accordance with Turkish Law No. 6698 on the Protection of Personal Data (KVKK). Details of how we collect, use, and protect your data, and how you can exercise your data-subject rights, are set out in our Privacy Policy available at horizonstudy.org/privacy.`,
  },
  {
    title: "9. Complaints and Dispute Resolution",
    body: `If you have a complaint about our services, please contact us first at info@horizonstudy.org or +90 534 215 46 51. We will endeavour to resolve complaints within 15 business days.\n\nIf a dispute cannot be resolved amicably, the parties agree to submit to the exclusive jurisdiction of the Courts and Enforcement Offices of Ankara, Turkey. Turkish law governs these Terms in all respects.`,
  },
  {
    title: "10. Governing Law",
    body: `These Terms are governed by and construed in accordance with the laws of the Republic of Turkey, including without limitation the Turkish Code of Obligations No. 6098, the Turkish Commercial Code No. 6102, and the Turkish Consumer Protection Law No. 6502 where applicable.`,
  },
  {
    title: "11. Changes to These Terms",
    body: `We reserve the right to update these Terms at any time. Material changes will be published on this page with a revised effective date. Continued use of our website or services after the effective date of any change constitutes your acceptance of the new Terms. If you do not agree, please discontinue use of our services and notify us in writing.`,
  },
  {
    title: "12. Contact",
    body: `Horizon Group Study Services\nMeşrutiyet Cad. 10/59, Çankaya – Ankara, Turkey\nEmail: info@horizonstudy.org\nPhone: +90 534 215 46 51 / +90 539 887 08 30`,
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-off-white dark:bg-[#0b1422]">
      {/* Hero */}
      <section className="py-20 px-[5%] bg-gradient-to-br from-navy-dark to-navy text-white text-center">
        <p className="text-[13px] font-medium text-gold uppercase tracking-[0.15em] mb-3">
          Legal
        </p>
        <h1 className="font-display text-[clamp(28px,4vw,48px)] font-bold leading-tight mb-4">
          Terms of Service
        </h1>
        <p className="text-white/60 text-sm max-w-xl mx-auto">
          The agreement governing our services under the laws of the Republic of Turkey
        </p>
        <p className="text-white/40 text-xs mt-4">Effective date: 18 April 2025</p>
      </section>

      {/* Content */}
      <section className="py-16 px-[5%] max-w-3xl mx-auto">
        <div className="bg-white dark:bg-[#111d2e] rounded-2xl shadow-[0_12px_40px_rgba(13,27,46,0.08)] p-8 md:p-12 flex flex-col gap-10">
          <p className="text-gray-horizon-500 dark:text-white/60 text-sm leading-relaxed">
            Please read these Terms of Service carefully before engaging with Horizon Group Study
            Services. By contacting us, submitting an application form, or making a payment you
            confirm that you have read, understood, and agreed to be bound by these Terms.
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
              href="/privacy"
              className="inline-flex items-center justify-center border border-navy/20 dark:border-white/10 text-navy dark:text-white/80 font-semibold text-sm px-6 py-3 rounded-lg hover:bg-navy/5 dark:hover:bg-white/5 transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
