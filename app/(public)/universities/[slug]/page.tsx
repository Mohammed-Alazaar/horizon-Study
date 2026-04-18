import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import University from "@/models/University";
import type { IDepartment } from "@/models/University";
import CTASection from "@/components/home/CTASection";

async function getUniversity(slug: string) {
  try {
    await connectDB();
    return await University.findOne({ slug }).lean();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const uni: any = await getUniversity(slug);
  if (!uni) return {};
  return {
    title: uni.name,
    description: uni.about || `Study at ${uni.name} in ${uni.city}, Turkey.`,
  };
}

export default async function UniversityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const uni: any = await getUniversity(slug);
  if (!uni) notFound();

  const hasBachelor = uni.bachelorDepartments?.length > 0;
  const hasMaster   = uni.masterDepartments?.length > 0;
  const hasPhd      = uni.phdDepartments?.length > 0;
  const hasAnyTable = hasBachelor || hasMaster || hasPhd;

  return (
    <>
      {/* Hero */}
      <section className="py-16 px-[5%] bg-gray-50 dark:bg-[#0d1929]">
        <div className="max-w-3xl mx-auto text-center">
          {uni.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={uni.logoUrl} alt={uni.name} className="w-28 h-28 object-contain mx-auto mb-6 rounded-2xl bg-white dark:bg-[#111d2e] p-2 shadow-sm border border-gray-horizon-100 dark:border-[#1e2d42]" />
          ) : (
            <div className="w-28 h-28 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-sm" style={{ background: uni.coverColor }}>
              {uni.shortName?.slice(0, 2)}
            </div>
          )}

          <h1 className="font-display text-[clamp(26px,4vw,42px)] font-bold text-navy-dark dark:text-gray-100 mb-2">{uni.name}</h1>
          {uni.shortName && uni.shortName !== uni.name && (
            <p className="text-gray-horizon-500 dark:text-gray-400 text-base mb-5">{uni.shortName}</p>
          )}

          <div className="flex flex-wrap justify-center gap-2 mb-2">
            {uni.city && (
              <span className="inline-flex items-center gap-1 border border-gray-horizon-300 dark:border-[#1e2d42] rounded-full px-4 py-1.5 text-sm text-gray-horizon-700 dark:text-gray-300">
                <span className="text-gray-horizon-400 dark:text-gray-500 text-xs">City</span>
                <span className="font-medium">{uni.city}</span>
              </span>
            )}
            {uni.establishedYear && (
              <span className="inline-flex items-center gap-1 border border-gray-horizon-300 dark:border-[#1e2d42] rounded-full px-4 py-1.5 text-sm text-gray-horizon-700 dark:text-gray-300">
                <span className="text-gray-horizon-400 dark:text-gray-500 text-xs">Est.</span>
                <span className="font-medium">{uni.establishedYear}</span>
              </span>
            )}
            {uni.localRank && (
              <span className="inline-flex items-center gap-1 border border-gray-horizon-300 dark:border-[#1e2d42] rounded-full px-4 py-1.5 text-sm text-gray-horizon-700 dark:text-gray-300">
                <span className="text-gray-horizon-400 dark:text-gray-500 text-xs">Rank</span>
                <span className="font-medium">{uni.localRank}</span>
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-10 px-[5%] bg-white dark:bg-[#111d2e] border-b border-gray-horizon-100 dark:border-[#1e2d42]">
        <div className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-4">
          {uni.localRank && <InfoCard label="Local Rank" value={String(uni.localRank)} />}
          {uni.establishedYear && <InfoCard label="Established Year" value={String(uni.establishedYear)} />}
          {uni.city && <InfoCard label="City" value={uni.city} />}
          {uni.teachingLanguages?.length > 0 && <InfoCard label="Teaching Languages" value={uni.teachingLanguages.join(" · ")} />}
          {uni.website && <InfoCard label="Website" value={uni.website} href={uni.website.startsWith("http") ? uni.website : `https://${uni.website}`} />}
          {uni.tags?.length > 0 && <InfoCard label="Fields" value={uni.tags.join(", ")} />}
        </div>
      </section>

      {/* About */}
      {uni.about && (
        <section className="py-12 px-[5%] bg-white dark:bg-[#111d2e]">
          <div className="max-w-3xl mx-auto">
            <details open className="group">
              <summary className="flex items-center justify-between cursor-pointer list-none mb-4">
                <h2 className="font-display text-xl font-bold text-navy-dark dark:text-gray-100">About the University</h2>
                <span className="text-gray-horizon-500 dark:text-gray-400 group-open:rotate-180 transition-transform">▲</span>
              </summary>
              <p className="text-gray-horizon-500 dark:text-gray-400 leading-relaxed text-base">{uni.about}</p>
            </details>
          </div>
        </section>
      )}

      {/* Department Tables */}
      {hasAnyTable && (
        <section className="py-12 px-[5%] bg-gray-50 dark:bg-[#0d1929]">
          <div className="max-w-4xl mx-auto flex flex-col gap-10">
            {hasBachelor && <DeptTable title="🎓 Bachelor Degree Programs" rows={uni.bachelorDepartments} />}
            {hasMaster   && <DeptTable title="📚 Master Degree Programs"   rows={uni.masterDepartments} />}
            {hasPhd      && <DeptTable title="🔬 PhD Programs"             rows={uni.phdDepartments} />}
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-12 px-[5%] bg-white dark:bg-[#111d2e] border-t border-gray-horizon-100 dark:border-[#1e2d42]">
        <div className="max-w-3xl mx-auto flex flex-wrap gap-4">
          <Link href="/contact" className="bg-gold text-navy-dark px-6 py-3 rounded-lg text-sm font-medium hover:bg-gold-light transition-colors">
            Apply Now — Free Consultation
          </Link>
          <Link href="/universities" className="border border-gray-horizon-300 dark:border-[#1e2d42] text-gray-horizon-700 dark:text-gray-300 px-6 py-3 rounded-lg text-sm hover:border-navy dark:hover:border-gray-400 transition-colors">
            ← All Universities
          </Link>
        </div>
      </section>

      <CTASection />
    </>
  );
}

function InfoCard({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="border border-gray-horizon-100 dark:border-[#1e2d42] rounded-xl p-4 text-center bg-white dark:bg-[#0d1929]">
      <div className="text-[11px] text-gray-horizon-400 dark:text-gray-500 uppercase tracking-wide mb-1">{label}</div>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-base font-semibold text-blue hover:underline break-all">
          {value}
        </a>
      ) : (
        <div className="text-base font-semibold text-navy-dark dark:text-gray-100">{value}</div>
      )}
    </div>
  );
}

function DeptTable({ title, rows }: { title: string; rows: IDepartment[] }) {
  return (
    <div>
      <h3 className="font-display text-lg font-bold text-navy-dark dark:text-gray-100 mb-4">{title}</h3>
      <div className="overflow-x-auto rounded-xl border border-gray-horizon-100 dark:border-[#1e2d42] bg-white dark:bg-[#111d2e]">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-[#0d1929] border-b border-gray-horizon-100 dark:border-[#1e2d42]">
            <tr>
              {["Department", "Language", "Tuition Fee", "Description"].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-horizon-700 dark:text-gray-300 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-white dark:bg-[#111d2e]" : "bg-gray-50/60 dark:bg-[#0d1929]/60"}>
                <td className="px-4 py-3 font-medium text-navy-dark dark:text-gray-100">{row.department}</td>
                <td className="px-4 py-3 text-gray-horizon-700 dark:text-gray-300">{row.language}</td>
                <td className="px-4 py-3 text-gray-horizon-700 dark:text-gray-300 whitespace-nowrap">{row.tuitionFee}</td>
                <td className="px-4 py-3 text-gray-horizon-500 dark:text-gray-400 text-xs leading-relaxed">{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
