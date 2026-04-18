"use client";

import { useState, useRef } from "react";

interface Department {
  department: string;
  language: string;
  tuitionFee: string;
  description: string;
}

interface ParsedUniversity {
  name: string;
  shortName: string;
  city: string;
  establishedYear: number | null;
  localRank: number | null;
  about: string;
  website: string;
  teachingLanguages: string[];
  coverColor: string;
  tags: string[];
  featured: boolean;
  order: number;
  bachelorDepartments: Department[];
  masterDepartments: Department[];
  phdDepartments: Department[];
}

interface Props {
  onImportDone: () => void;
}

export default function ExcelImport({ onImportDone }: Props) {
  const [step, setStep] = useState<"idle" | "parsed" | "saving" | "done">("idle");
  const [parsed, setParsed] = useState<ParsedUniversity | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setError("");

    try {
      const form = new FormData();
      form.append("file", file);
      form.append("action", "parse");

      const res = await fetch("/api/excel", { method: "POST", body: form });
      const d = await res.json();
      if (!res.ok) { setError(d.error ?? "Parse failed"); return; }
      setParsed(d.parsed);
      setStep("parsed");
    } catch {
      setError("Failed to parse file");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!parsed) return;
    setStep("saving");
    setError("");

    try {
      const form = new FormData();
      form.append("action", "save");
      form.append("data", JSON.stringify(parsed));

      const res = await fetch("/api/excel", { method: "POST", body: form });
      const d = await res.json();
      if (!res.ok) { setError(d.error ?? "Save failed"); setStep("parsed"); return; }
      setStep("done");
      onImportDone();
    } catch {
      setError("Save failed");
      setStep("parsed");
    }
  }

  function reset() {
    setStep("idle");
    setParsed(null);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-horizon-100 p-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-navy-dark">Excel Import — Single University</h3>
        <a
          href="/api/excel/template"
          download
          className="flex items-center gap-1.5 text-xs text-blue hover:text-navy-dark border border-blue hover:border-navy-dark px-3 py-1.5 rounded-lg transition-colors"
        >
          ⬇ Download Template
        </a>
      </div>
      <p className="text-sm text-gray-horizon-500 mb-4">
        Fill in the downloaded template and upload it. The file contains 4 sheets: <strong>Info</strong>, <strong>Bachelor</strong>, <strong>Master</strong>, and <strong>PhD Departments</strong>. Logo can be added after import.
      </p>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">{error}</div>}

      {step === "idle" && (
        <div
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-horizon-300 rounded-xl py-12 text-center cursor-pointer hover:border-blue transition-colors"
          onClick={() => inputRef.current?.click()}
        >
          <div className="text-4xl mb-3">📊</div>
          <div className="text-sm font-medium text-navy-dark mb-1">Click to upload Excel file</div>
          <div className="text-xs text-gray-horizon-500">Supports .xlsx, .xls</div>
          <input ref={inputRef} type="file" accept=".xlsx,.xls" onChange={handleFile} className="hidden" />
          {loading && <div className="mt-3 text-sm text-blue animate-pulse">Parsing file...</div>}
        </div>
      )}

      {step === "parsed" && parsed && (
        <>
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-navy-dark">Preview — review before saving</span>
            <button onClick={reset} className="text-xs text-gray-horizon-500 hover:text-red-500 transition-colors">Reset</button>
          </div>

          {/* Info */}
          <div className="border border-gray-horizon-100 rounded-xl mb-4 overflow-hidden">
            <div className="bg-off-white px-4 py-2.5 text-xs font-medium text-gray-horizon-700">University Info</div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 px-4 py-3 text-sm">
              {[
                ["Name", parsed.name],
                ["Short Name", parsed.shortName],
                ["City", parsed.city],
                ["Established Year", parsed.establishedYear ?? "—"],
                ["Local Rank", parsed.localRank ?? "—"],
                ["Website", parsed.website || "—"],
                ["Teaching Languages", parsed.teachingLanguages.join(", ") || "—"],
                ["Tags", parsed.tags.join(", ") || "—"],
                ["Featured", parsed.featured ? "Yes" : "No"],
                ["Order", parsed.order],
              ].map(([label, value]) => (
                <div key={String(label)}>
                  <span className="text-gray-horizon-500 text-xs">{label}</span>
                  <div className="text-navy-dark truncate">{String(value)}</div>
                </div>
              ))}
            </div>
            {parsed.about && (
              <div className="px-4 pb-3">
                <span className="text-gray-horizon-500 text-xs">About</span>
                <div className="text-navy-dark text-sm line-clamp-2">{parsed.about}</div>
              </div>
            )}
          </div>

          {/* Departments per degree */}
          {([
            ["Bachelor", parsed.bachelorDepartments],
            ["Master",   parsed.masterDepartments],
            ["PhD",      parsed.phdDepartments],
          ] as [string, Department[]][]).map(([label, depts]) => (
            <div key={label} className="border border-gray-horizon-100 rounded-xl mb-3 overflow-hidden">
              <div className="bg-off-white px-4 py-2.5 flex items-center justify-between">
                <span className="text-xs font-medium text-gray-horizon-700">{label} Departments</span>
                <span className="text-xs text-gray-horizon-400">{depts.length} program{depts.length !== 1 ? "s" : ""}</span>
              </div>
              {depts.length === 0 ? (
                <div className="px-4 py-3 text-xs text-gray-horizon-400 italic">No programs added</div>
              ) : (
                <div className="overflow-auto max-h-48">
                  <table className="w-full text-xs">
                    <thead className="bg-white border-b border-gray-horizon-100">
                      <tr>
                        {["Department", "Language", "Tuition Fee", "Description"].map((h) => (
                          <th key={h} className="text-left px-4 py-2 text-gray-horizon-500 font-medium">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {depts.map((d, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-off-white"}>
                          <td className="px-4 py-2 text-navy-dark">{d.department}</td>
                          <td className="px-4 py-2 text-gray-horizon-600">{d.language || "—"}</td>
                          <td className="px-4 py-2 text-gray-horizon-600">{d.tuitionFee || "—"}</td>
                          <td className="px-4 py-2 text-gray-horizon-500 max-w-xs truncate">{d.description || "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
          <div className="mb-5" />

          <button
            onClick={handleSave}
            className="bg-gold text-navy-dark px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gold-light transition-colors"
          >
            Save University to Database
          </button>
        </>
      )}

      {step === "saving" && (
        <div className="text-center py-8 text-blue text-sm animate-pulse">Saving to database...</div>
      )}

      {step === "done" && (
        <div className="text-center py-8">
          <div className="text-4xl mb-3">✅</div>
          <div className="font-medium text-navy-dark mb-1">{parsed?.name} saved successfully</div>
          <div className="text-sm text-gray-horizon-500 mb-4">You can now add the logo from the university list.</div>
          <button onClick={reset} className="bg-gold text-navy-dark px-5 py-2 rounded-lg text-sm font-medium hover:bg-gold-light transition-colors">
            Import Another
          </button>
        </div>
      )}
    </div>
  );
}
