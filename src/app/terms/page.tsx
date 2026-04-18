import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service – Horizon Study",
};

export default function TermsPage() {
  const lastUpdated = "April 18, 2026";

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          ← Back to Home
        </Link>
      </div>

      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Terms of Service</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: {lastUpdated}</p>

      <div className="bg-white rounded-xl shadow-sm p-8 space-y-8 text-gray-700 leading-relaxed">

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing or using <strong>Horizon Study</strong> (&quot;the Platform&quot;), you agree to
            be bound by these Terms of Service and our{" "}
            <Link href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
            . If you do not agree, please do not use the Platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Description of Service</h2>
          <p>
            Horizon Study is an educational platform that allows users to browse, add, and manage
            information about universities worldwide. The Platform is intended for informational
            purposes only and does not constitute official academic advice or endorsement of any
            institution.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. User Responsibilities</h2>
          <p className="mb-3">By using Horizon Study, you agree to:</p>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>Provide accurate and truthful information when adding universities.</li>
            <li>Not submit misleading, fraudulent, or harmful content.</li>
            <li>Not attempt to disrupt, hack, or abuse the Platform or its infrastructure.</li>
            <li>Comply with all applicable local, national, and international laws.</li>
            <li>Not use the Platform for commercial gain without prior written consent.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Content Ownership</h2>
          <p>
            University data you submit remains your responsibility. By submitting content, you
            grant Horizon Study a non-exclusive, royalty-free licence to store, display, and use
            that content within the Platform. You warrant that you have the right to submit such
            information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Intellectual Property</h2>
          <p>
            All design elements, branding, code, and non-user-submitted content on Horizon Study
            are the intellectual property of Horizon Study and its licensors. You may not
            reproduce, distribute, or create derivative works without explicit written permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Disclaimer of Warranties</h2>
          <p>
            The Platform is provided &quot;as is&quot; without warranties of any kind, either express or
            implied. We do not warrant that the information on the Platform is accurate, complete,
            or up to date. University details (tuition fees, programs, rankings) may change and
            you should verify directly with the institution.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Horizon Study shall not be liable for any
            indirect, incidental, special, or consequential damages arising from your use of the
            Platform, including but not limited to loss of data, revenue, or academic
            opportunities.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Termination</h2>
          <p>
            We reserve the right to suspend or terminate access to the Platform at our discretion,
            without notice, if you violate these Terms or if we discontinue the service. Upon
            termination, your right to use the Platform ceases immediately.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Changes to Terms</h2>
          <p>
            We may revise these Terms at any time. The &quot;Last updated&quot; date at the top reflects
            the most recent version. Your continued use of the Platform after changes constitutes
            acceptance of the revised Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Governing Law</h2>
          <p>
            These Terms are governed by and construed in accordance with applicable law. Any
            disputes arising from these Terms shall be subject to the exclusive jurisdiction of
            the competent courts.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Contact Us</h2>
          <p>
            For questions about these Terms, please contact us at{" "}
            <a href="mailto:legal@horizonstudy.com" className="text-blue-600 hover:underline">
              legal@horizonstudy.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
