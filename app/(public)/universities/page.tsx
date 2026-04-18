import type { Metadata } from "next";
import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import University from "@/models/University";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Partner Universities",
  description: "Apply to leading private universities across Turkey with Horizon Group's expert admission guidance.",
};

const fallback = [
  { name: "OSTİM Technical University", shortName: "OSTİM Teknik", slug: "ostim-teknik", coverColor: "linear-gradient(135deg,#0D2B55,#1A5FB4)", tags: ["Engineering", "Technology", "Bachelor's"], city: "Ankara", about: "A technology-focused university in the heart of Ankara's industrial district." },
  { name: "Lokman Hekim University", shortName: "Lokman Hekim", slug: "lokman-hekim", coverColor: "linear-gradient(135deg,#0F4C2A,#1A7A45)", tags: ["Medicine", "Health Sciences", "Bachelor's"], city: "Ankara", about: "A leading health sciences university offering medical and pharmacy programs." },
  { name: "Ankara Medipol University", shortName: "Ankara Medipol", slug: "ankara-medipol", coverColor: "linear-gradient(135deg,#5C0B1A,#A01830)", tags: ["Medicine", "Dentistry", "Bachelor's"], city: "Ankara", about: "Part of the prestigious Medipol Group offering medical and health programs." },
  { name: "TED University", shortName: "TED University", slug: "ted", coverColor: "linear-gradient(135deg,#1A3D6E,#2A6DB5)", tags: ["Business", "Architecture", "Law"], city: "Ankara", about: "A research university backed by the Turkish Education Association." },
  { name: "Atılım University", shortName: "Atılım University", slug: "atilim", coverColor: "linear-gradient(135deg,#2A1A5E,#4A30A0)", tags: ["Engineering", "Business", "Bachelor's"], city: "Ankara", about: "A comprehensive private university with strong engineering and business faculties." },
];

async function getUniversities() {
  try {
    await connectDB();
    const unis = await University.find({}).sort({ order: 1 }).lean();
    return unis.length ? unis : fallback;
  } catch {
    return fallback;
  }
}

export default async function UniversitiesPage({
  searchParams,
}: {
  searchParams: { city?: string };
}) {
  const universities = await getUniversities();

  const cities = Array.from(
    new Set(universities.map((u: any) => u.city).filter(Boolean))
  ).sort() as string[];

  const activeCity = searchParams.city ?? "All";
  const filtered =
    activeCity === "All"
      ? universities
      : universities.filter((u: any) => u.city === activeCity);

  return (
    <>
      <section className="py-20 px-[5%] bg-gradient-to-br from-navy-dark to-navy text-white text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-xs font-medium tracking-[2px] uppercase text-gold-light mb-3">Partner Universities</div>
          <h1 className="font-display text-[clamp(32px,4vw,52px)] font-bold mb-4">Universities Across Turkey</h1>
          <p className="text-white/65 text-lg leading-relaxed">
            We work directly with leading private universities across Turkey to help you secure admission with special offers.
          </p>
        </div>
      </section>

      <section className="py-20 px-[5%]">
        <div className="max-w-6xl mx-auto">

          {/* City filter */}
          {cities.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {["All", ...cities].map((city) => (
                <Link
                  key={city}
                  href={city === "All" ? "/universities" : `/universities?city=${encodeURIComponent(city)}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                    activeCity === city
                      ? "bg-navy-dark text-white border-navy-dark"
                      : "bg-white text-gray-horizon-600 border-gray-horizon-200 hover:border-navy-dark hover:text-navy-dark"
                  }`}
                >
                  {city}
                </Link>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((uni: any) => (
              <Link
                key={uni.slug}
                href={`/universities/${uni.slug}`}
                className="border border-gray-horizon-100 rounded-2xl overflow-hidden hover:shadow-[0_12px_40px_rgba(13,27,46,0.1)] hover:-translate-y-[3px] hover:border-blue-light transition-all block no-underline bg-white"
              >
                <div className="h-40 flex items-center justify-center relative overflow-hidden" style={{ background: uni.coverColor }}>
                  {uni.logoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={uni.logoUrl} alt={uni.name} className="h-16 object-contain" />
                  ) : (
                    <span className="text-[13px] font-medium text-white/90 tracking-widest uppercase z-10 relative">{uni.shortName}</span>
                  )}
                  <div className="absolute -bottom-8 -right-8 w-[120px] h-[120px] bg-white/[0.04] rounded-full" />
                </div>
                <div className="p-5 px-6">
                  <div className="text-base font-medium text-navy-dark mb-1.5">{uni.name}</div>
                  {uni.city && (
                    <div className="text-[13px] text-gray-horizon-500 mb-2">📍 {uni.city}</div>
                  )}
                  {uni.about && (
                    <p className="text-[13px] text-gray-horizon-500 leading-relaxed mb-3 line-clamp-2">{uni.about}</p>
                  )}
                  <div className="flex gap-1.5 flex-wrap">
                    {(uni.tags ?? []).slice(0, 3).map((tag: string) => (
                      <span key={tag} className="text-[11px] font-medium bg-blue/[0.08] text-blue px-2.5 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-horizon-400">No universities found in {activeCity}.</div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
