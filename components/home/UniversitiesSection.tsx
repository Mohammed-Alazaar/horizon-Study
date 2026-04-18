import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import University from "@/models/University";

const fallbackUniversities = [
  { name: "OSTİM Technical University", shortName: "OSTİM Teknik", slug: "ostim-teknik", coverColor: "linear-gradient(135deg,#0D2B55,#1A5FB4)", tags: ["Engineering", "Technology", "Bachelor's"], location: "Ankara, Turkey" },
  { name: "Lokman Hekim University", shortName: "Lokman Hekim", slug: "lokman-hekim", coverColor: "linear-gradient(135deg,#0F4C2A,#1A7A45)", tags: ["Medicine", "Health Sciences", "Bachelor's"], location: "Ankara, Turkey" },
  { name: "Ankara Medipol University", shortName: "Ankara Medipol", slug: "ankara-medipol", coverColor: "linear-gradient(135deg,#5C0B1A,#A01830)", tags: ["Medicine", "Dentistry", "Bachelor's"], location: "Ankara, Turkey" },
  { name: "TED University", shortName: "TED University", slug: "ted", coverColor: "linear-gradient(135deg,#1A3D6E,#2A6DB5)", tags: ["Business", "Architecture", "Law"], location: "Ankara, Turkey" },
  { name: "Atılım University", shortName: "Atılım University", slug: "atilim", coverColor: "linear-gradient(135deg,#2A1A5E,#4A30A0)", tags: ["Engineering", "Business", "Bachelor's"], location: "Ankara, Turkey" },
];

async function getUniversities() {
  try {
    await connectDB();
    const unis = await University.find({ featured: true }).sort({ order: 1 }).limit(5).lean();
    return unis.length ? unis : fallbackUniversities;
  } catch {
    return fallbackUniversities;
  }
}

export default async function UniversitiesSection() {
  const universities = await getUniversities();

  return (
    <section className="py-[90px] px-[5%] bg-white">
      <div className="flex flex-wrap items-end justify-between gap-5 mb-14">
        <div>
          <div className="text-xs font-medium tracking-[2px] uppercase text-blue mb-3">Partner Universities</div>
          <h2 className="font-display text-[clamp(28px,3vw,40px)] font-bold text-navy-dark leading-tight mb-3.5">
            Universities Across Turkey
          </h2>
          <p className="text-base text-gray-horizon-500 max-w-[560px] leading-[1.7]">
            We help you apply to leading private universities across Turkey with special offers and discounts.
          </p>
        </div>
        <Link href="/universities" className="bg-gold text-navy-dark px-[30px] py-3.5 rounded-lg text-[15px] font-medium whitespace-nowrap border-2 border-gold hover:bg-gold-light transition-colors">
          View All Universities
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {universities.map((uni: any) => (
          <Link
            key={uni.slug}
            href={`/universities/${uni.slug}`}
            className="border border-gray-horizon-100 rounded-2xl overflow-hidden hover:shadow-[0_12px_40px_rgba(13,27,46,0.1)] hover:-translate-y-[3px] hover:border-blue-light transition-all block no-underline bg-white"
          >
            <div
              className="h-40 flex items-center justify-center relative overflow-hidden"
              style={{ background: uni.coverColor }}
            >
              {uni.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={uni.logoUrl} alt={uni.name} className="h-16 object-contain" />
              ) : (
                <span className="text-[13px] font-medium text-white/90 tracking-widest uppercase z-10 relative">
                  {uni.shortName}
                </span>
              )}
              <div className="absolute -bottom-8 -right-8 w-[120px] h-[120px] bg-white/[0.04] rounded-full" />
            </div>
            <div className="p-5 px-[22px]">
              <div className="text-base font-medium text-navy-dark mb-1.5">{uni.name}</div>
              <div className="text-[13px] text-gray-horizon-500 flex items-center gap-1 mb-3.5">📍 {uni.location}</div>
              <div className="flex gap-1.5 flex-wrap">
                {(uni.tags ?? []).slice(0, 3).map((tag: string) => (
                  <span key={tag} className="text-[11px] font-medium bg-blue/[0.08] text-blue px-2.5 py-0.5 rounded-full tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}

      </div>
    </section>
  );
}
