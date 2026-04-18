import Link from "next/link";

export default function CTASection() {
  return (
    <section className="bg-gradient-to-br from-blue to-navy py-[80px] px-[5%] text-center relative overflow-hidden">
      <div className="absolute -top-[100px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(240,165,0,0.1)_0%,transparent_70%)] pointer-events-none" />
      <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-bold text-white mb-3.5 relative">
        Ready to Start Your Journey?
      </h2>
      <p className="text-[17px] text-white/65 mb-9 relative">
        Visit our office in Çankaya, Ankara or reach us by phone — we&apos;re here to help.
      </p>
      <div className="flex gap-3.5 justify-center flex-wrap relative">
        <Link href="/contact" className="bg-gold text-navy-dark px-[30px] py-3.5 rounded-lg text-[15px] font-medium border-2 border-gold hover:bg-gold-light transition-colors">
          Book Free Consultation
        </Link>
        <a href="tel:+905342154651" className="bg-transparent text-white px-[30px] py-3.5 rounded-lg text-[15px] border border-white/40 hover:border-white/70 hover:bg-white/[0.06] transition-all">
          📞 0534 215 46 51
        </a>
      </div>
    </section>
  );
}
