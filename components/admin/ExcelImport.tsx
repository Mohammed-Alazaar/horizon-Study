"use client";

import { useState, useRef } from "react";

interface ParsedRow {
  name: string;
  shortName: string;
  description: string;
  location: string;
  tags: string[];
  programs: string[];
  coverColor: string;
  featured: boolean;
  order: number;
}

interface Props {
  onImportDone: () => void;
}

export default function ExcelImport({ onImportDone }: Props) {
  const [step, setStep] = useState<"idle" | "parsed" | "saving" | "done">("idle");
  const [parsed, setParsed] = useState<ParsedRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ saved: number; failed: number } | null>(null);
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
      if (!res.ok) {
        const d = await res.json();
        setError(d.error ?? "Parse failed");
        return;
      }
      const { parsed: rows } = await res.json();
      setParsed(rows);
      setStep("parsed");
    } catch {
      setError("Failed to parse file");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setStep("saving");
    setError("");

    try {
      const form = new FormData();
      form.append("action", "save");
      form.append("data", JSON.stringify(parsed));

      const res = await fetch("/api/excel", { method: "POST", body: form });
      if (!res.ok) {
        const d = await res.json();
        setError(d.error ?? "Save failed");
        setStep("parsed");
        return;
      }
      const data = await res.json();
      setResult(data);
      setStep("done");
      onImportDone();
    } catch {
      setError("Save failed");
      setStep("parsed");
    }
  }

  function reset() {
    setStep("idle");
    setParsed([]);
    setResult(null);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-horizon-100 p-6">
      <h3 className="font-medium text-navy-dark mb-2">Excel / CSV Import</h3>
      <p className="text-sm text-gray-horizon-500 mb-4">
        Upload an Excel (.xlsx) or CSV file. Required columns: <strong>Name</strong>, <strong>Short Name</strong>.
        Optional: Description, Location, Tags, Programs, Cover Color.
      </p>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">{error}</div>}

      {step === "idle" && (
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-horizon-300 rounded-xl py-12 text-center cursor-pointer hover:border-blue transition-colors" onClick={() => inputRef.current?.click()}>
          <div className="text-4xl mb-3">📊</div>
          <div className="text-sm font-medium text-navy-dark mb-1">Click to upload Excel or CSV</div>
          <div className="text-xs text-gray-horizon-500">Supports .xlsx, .xls, .csv</div>
          <input ref={inputRef} type="file" accept=".xlsx,.xls,.csv" onChange={handleFile} className="hidden" />
          {loading && <div className="mt-3 text-sm text-blue animate-pulse">Parsing file...</div>}
        </div>
      )}

      {step === "parsed" && (
        <>
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-gray-horizon-700 font-medium">{parsed.length} rows found — review before saving</span>
            <button onClick={reset} className="text-xs text-gray-horizon-500 hover:text-red-500 transition-colors">Reset</button>
          </div>
          <div className="overflow-auto max-h-72 border border-gray-horizon-100 rounded-xl mb-4">
            <table className="w-full text-xs">
              <thead className="bg-off-white sticky top-0">
                <tr>
                  {["Name", "Short Name", "Location", "Tags", "Programs"].map((h) => (
                    <th key={h} className="text-left px-4 py-2.5 text-gray-horizon-700 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {parsed.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-off-white"}>
                    <td className="px-4 py-2">{row.name}</td>
                    <td className="px-4 py-2">{row.shortName}</td>
                    <td className="px-4 py-2">{row.location}</td>
                    <td className="px-4 py-2">{row.tags.join(", ")}</td>
                    <td className="px-4 py-2">{row.programs.join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={handleSave}
            className="bg-gold text-navy-dark px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gold-light transition-colors"
          >
            Save {parsed.length} Universities to Database
          </button>
        </>
      )}

      {step === "saving" && (
        <div className="text-center py-8 text-blue text-sm animate-pulse">Saving to database...</div>
      )}

      {step === "done" && result && (
        <div className="text-center py-8">
          <div className="text-4xl mb-3">✅</div>
          <div className="font-medium text-navy-dark mb-1">{result.saved} universities saved</div>
          {result.failed > 0 && <div className="text-sm text-red-500">{result.failed} failed</div>}
          <button onClick={reset} className="mt-4 bg-gold text-navy-dark px-5 py-2 rounded-lg text-sm font-medium hover:bg-gold-light transition-colors">
            Import More
          </button>
        </div>
      )}
    </div>
  );
}
