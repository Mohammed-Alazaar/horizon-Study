"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Simple WhatsApp redirect — replace with API call if you want email handling
      const text = encodeURIComponent(
        `Hello Horizon Group,\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nService: ${form.service}\n\nMessage: ${form.message}`
      );
      window.open(`https://wa.me/905342154651?text=${text}`, "_blank");
      setSuccess(true);
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="py-20 px-[5%] bg-gradient-to-br from-navy-dark to-navy text-white text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-xs font-medium tracking-[2px] uppercase text-gold-light mb-3">Get In Touch</div>
          <h1 className="font-display text-[clamp(32px,4vw,52px)] font-bold mb-4">Contact Us</h1>
          <p className="text-white/65 text-lg">Book a free consultation or ask us anything — we&apos;ll respond within hours.</p>
        </div>
      </section>

      <section className="py-20 px-[5%]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <h2 className="font-display text-2xl font-bold text-navy-dark mb-6">Our Office</h2>
            <div className="flex flex-col gap-5">
              {[
                { icon: "📍", label: "Address", value: "Meşrutiyet Cad. 10/59, Çankaya – Ankara, Turkey" },
                { icon: "📞", label: "Phone 1", value: "0534 215 46 51", href: "tel:+905342154651" },
                { icon: "📞", label: "Phone 2", value: "0539 887 08 30", href: "tel:+905398870830" },
                { icon: "🌐", label: "Website", value: "www.horizonstudy.org", href: "https://www.horizonstudy.org" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue/[0.08] rounded-xl flex items-center justify-center text-xl shrink-0">{item.icon}</div>
                  <div>
                    <div className="text-xs text-gray-horizon-500 uppercase tracking-wide mb-0.5">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-navy-dark hover:text-blue transition-colors">{item.value}</a>
                    ) : (
                      <span className="text-sm text-navy-dark">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-[#25D366]/10 border border-[#25D366]/30 rounded-2xl">
              <div className="text-sm font-medium text-navy-dark mb-1">Fastest Response</div>
              <p className="text-sm text-gray-horizon-500 mb-3">Message us directly on WhatsApp for the fastest reply.</p>
              <a
                href="https://wa.me/905342154651"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h2 className="font-display text-2xl font-bold text-navy-dark mb-2">Send a Message</h2>

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm">
                ✓ Message sent! We&apos;ll get back to you shortly.
              </div>
            )}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
            )}

            <input
              type="text"
              placeholder="Full Name *"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border border-gray-horizon-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue transition-colors"
            />
            <input
              type="email"
              placeholder="Email Address *"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="border border-gray-horizon-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue transition-colors"
            />
            <input
              type="tel"
              placeholder="Phone / WhatsApp"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="border border-gray-horizon-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue transition-colors"
            />
            <select
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
              className="border border-gray-horizon-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue transition-colors text-gray-horizon-700"
            >
              <option value="">Select Service (optional)</option>
              <option value="Certified Translation">Certified Translation</option>
              <option value="University Admissions">University Admissions</option>
              <option value="Document Legalization">Document Legalization</option>
              <option value="Other">Other</option>
            </select>
            <textarea
              placeholder="Your Message *"
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="border border-gray-horizon-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue transition-colors resize-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gold text-navy-dark py-3.5 rounded-xl text-sm font-medium hover:bg-gold-light transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
                  Sending...
                </>
              ) : "Send Message"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
