import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy – Horizon Study",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "April 18, 2026";

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          ← Back to Home
        </Link>
      </div>

      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: {lastUpdated}</p>

      <div className="bg-white rounded-xl shadow-sm p-8 space-y-8 text-gray-700 leading-relaxed">

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Introduction</h2>
          <p>
            Welcome to <strong>Horizon Study</strong>. We respect your privacy and are committed to
            protecting any personal information you share with us. This Privacy Policy explains what
            data we collect, how we use it, and the choices you have.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Information We Collect</h2>
          <p className="mb-3">We may collect the following types of information:</p>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>
              <strong>Usage Data:</strong> Pages you visit, features you use, and interactions with
              the platform (collected anonymously for analytics purposes).
            </li>
            <li>
              <strong>University Data You Submit:</strong> When you add a university through our
              forms or Excel import, the information you provide is stored locally in your browser
              and, if applicable, on our servers.
            </li>
            <li>
              <strong>Contact Information:</strong> If you reach out to us via email or a contact
              form, we store your name and email address to respond to your inquiry.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>To display and manage university information on the platform.</li>
            <li>To improve the functionality and user experience of Horizon Study.</li>
            <li>To respond to support requests or inquiries.</li>
            <li>To monitor and analyse usage patterns to fix issues and improve features.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Data Storage</h2>
          <p>
            University data entered through the platform is stored in your browser&apos;s
            <strong> localStorage</strong>. This data does not leave your device unless you
            explicitly submit it to our servers. We do not sell, rent, or share your data with
            third parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Cookies</h2>
          <p>
            Horizon Study may use essential cookies to maintain session state and improve
            performance. No advertising or tracking cookies are used. You can disable cookies in
            your browser settings, although some features may not work as expected.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Third-Party Services</h2>
          <p>
            We may use third-party tools for analytics or performance monitoring. These services
            have their own privacy policies and we encourage you to review them. We do not share
            personally identifiable information with these services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Your Rights</h2>
          <p className="mb-3">You have the right to:</p>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>Access the information we hold about you.</li>
            <li>Request correction or deletion of your data.</li>
            <li>Opt out of any communications from us.</li>
          </ul>
          <p className="mt-3">
            To exercise any of these rights, please contact us at{" "}
            <a href="mailto:privacy@horizonstudy.com" className="text-blue-600 hover:underline">
              privacy@horizonstudy.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at
            the top of this page reflects the most recent revision. Continued use of Horizon Study
            after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, you can contact us at{" "}
            <a href="mailto:privacy@horizonstudy.com" className="text-blue-600 hover:underline">
              privacy@horizonstudy.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
