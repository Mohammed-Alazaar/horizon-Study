import type { Metadata } from "next";
import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import University from "@/models/University";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Partner Universities",
  description: "Apply to leading private universities across Turkey with Horizon Group's expert admission guidance.",
};

const PER_PAGE = 20;

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

function buildHref(page: number, city: string) {
  const params = new URLSearchParams();
  if (city !== "All") params.set("city", city);
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return `/universities${qs ? `?${qs}` : ""}`;
}

export default async function UniversitiesPage({
  searchParams,
}: {
  searchParams: { city?: string; page?: string };
}) {
  const universities = await getUniversities();

  const cities = Array.from(
    new Set(universities.map((u: any) => u.city).filter(Boolean))
  ).sort() as string[];

  const activeCity = searchParams.city ?? "All";
  const currentPage = Math.max(1, parseInt(searchParams.page ?? "1", 10));

  const filtered =
    activeCity === "All"
      ? universities
      : universities.filter((u: any) => u.city === activeCity);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const safePage = Math.min(currentPage, Math.max(totalPages, 1));
  const paginated = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  // Build a compact page number list: always show first, last, current ±1, with ellipsis
  function pageNumbers(): (number | "…")[] {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const set = new Set([1, totalPages, safePage - 1, safePage, safePage + 1].filter((n) => n >= 1 && n <= totalPages));
    const sorted = Array.from(set).sort((a, b) => a - b);
    const result: (number | "…")[] = [];
    for (let i = 0; i < sorted.length; i++) {
      if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push("…");
      result.push(sorted[i]);
    }
    return result;
  }

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
                  href={buildHref(1, city)}
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

          {/* Results count */}
          {filtered.length > 0 && (
            <p className="text-sm text-gray-horizon-500 mb-6">
              Showing {(safePage - 1) * PER_PAGE + 1}–{Math.min(safePage * PER_PAGE, filtered.length)} of {filtered.length} universities
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((uni: any) => (
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1.5 mt-14 flex-wrap">
              {/* Prev */}
              <Link
                href={buildHref(safePage - 1, activeCity)}
                aria-disabled={safePage === 1}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  safePage === 1
                    ? "pointer-events-none opacity-30 border-gray-horizon-100 text-gray-horizon-400"
                    : "border-gray-horizon-200 text-gray-horizon-700 hover:border-navy-dark hover:text-navy-dark bg-white"
                }`}
              >
                ← Prev
              </Link>

              {pageNumbers().map((item, i) =>
                item === "…" ? (
                  <span key={`ellipsis-${i}`} className="px-2 text-gray-horizon-400 text-sm select-none">…</span>
                ) : (
                  <Link
                    key={item}
                    href={buildHref(item, activeCity)}
                    className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium border transition-colors ${
                      item === safePage
                        ? "bg-navy-dark text-white border-navy-dark"
                        : "bg-white text-gray-horizon-700 border-gray-horizon-200 hover:border-navy-dark hover:text-navy-dark"
                    }`}
                  >
                    {item}
                  </Link>
                )
              )}

              {/* Next */}
              <Link
                href={buildHref(safePage + 1, activeCity)}
                aria-disabled={safePage === totalPages}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  safePage === totalPages
                    ? "pointer-events-none opacity-30 border-gray-horizon-100 text-gray-horizon-400"
                    : "border-gray-horizon-200 text-gray-horizon-700 hover:border-navy-dark hover:text-navy-dark bg-white"
                }`}
              >
                Next →
              </Link>
            </div>
          )}

        </div>
      </section>

      <CTASection />
    </>
  );
}
