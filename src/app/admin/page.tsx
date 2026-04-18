"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import * as XLSX from "xlsx";
import { getUniversities, addUniversity } from "@/lib/universities";
import { University, UniversityFormData } from "@/lib/types";

interface ImportRow {
  Name: string;
  Country: string;
  City: string;
  Type: string;
  Ranking?: string | number;
  Website: string;
  Description: string;
  Programs: string;
  TuitionFee: string | number;
  Currency: string;
  Accreditation: string;
  FoundedYear: string | number;
}

interface ImportResult {
  row: number;
  name: string;
  status: "success" | "error";
  message: string;
}

const TEMPLATE_HEADERS = [
  "Name",
  "Country",
  "City",
  "Type",
  "Ranking",
  "Website",
  "Description",
  "Programs",
  "TuitionFee",
  "Currency",
  "Accreditation",
  "FoundedYear",
];

const SAMPLE_ROWS: ImportRow[] = [
  {
    Name: "Stanford University",
    Country: "United States",
    City: "Stanford",
    Type: "Private",
    Ranking: 3,
    Website: "https://www.stanford.edu",
    Description:
      "A leading research university known for entrepreneurship and proximity to Silicon Valley.",
    Programs: "Computer Science, Engineering, Business, Medicine",
    TuitionFee: 56169,
    Currency: "USD",
    Accreditation: "Accredited",
    FoundedYear: 1885,
  },
  {
    Name: "University of Cambridge",
    Country: "United Kingdom",
    City: "Cambridge",
    Type: "Public",
    Ranking: 4,
    Website: "https://www.cam.ac.uk",
    Description:
      "One of the world's oldest universities with a tradition of academic excellence.",
    Programs: "Mathematics, Science, Law, Arts, Engineering",
    TuitionFee: 9250,
    Currency: "GBP",
    Accreditation: "Accredited",
    FoundedYear: 1209,
  },
];

function downloadTemplate() {
  const ws = XLSX.utils.json_to_sheet(SAMPLE_ROWS, { header: TEMPLATE_HEADERS });

  // Column widths
  ws["!cols"] = TEMPLATE_HEADERS.map((h) => ({
    wch: h === "Description" || h === "Programs" ? 50 : h === "Website" ? 35 : 20,
  }));

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Universities");
  XLSX.writeFile(wb, "horizon_study_template.xlsx");
}

function rowToFormData(row: ImportRow): UniversityFormData {
  return {
    name: String(row.Name ?? "").trim(),
    country: String(row.Country ?? "").trim(),
    city: String(row.City ?? "").trim(),
    type: (String(row.Type ?? "").trim() as UniversityFormData["type"]) || "",
    ranking: row.Ranking != null ? String(row.Ranking) : "",
    website: String(row.Website ?? "").trim(),
    description: String(row.Description ?? "").trim(),
    programs: String(row.Programs ?? "").trim(),
    tuitionFee: row.TuitionFee != null ? String(row.TuitionFee) : "",
    currency: String(row.Currency ?? "USD").trim(),
    accreditation:
      (String(row.Accreditation ?? "").trim() as UniversityFormData["accreditation"]) || "",
    foundedYear: row.FoundedYear != null ? String(row.FoundedYear) : "",
  };
}

export default function AdminDashboardPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [universities, setUniversities] = useState<University[]>([]);
  const [preview, setPreview] = useState<ImportRow[]>([]);
  const [fileName, setFileName] = useState("");
  const [importing, setImporting] = useState(false);
  const [results, setResults] = useState<ImportResult[]>([]);
  const [importDone, setImportDone] = useState(false);

  useEffect(() => {
    setUniversities(getUniversities());
  }, []);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setResults([]);
    setImportDone(false);

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = new Uint8Array(evt.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json<ImportRow>(sheet);
        setPreview(rows);
      } catch {
        alert("Failed to read the file. Please use the provided template.");
      }
    };
    reader.readAsArrayBuffer(file);
  }

  function handleImport() {
    if (preview.length === 0) return;
    setImporting(true);
    const importResults: ImportResult[] = [];

    for (let i = 0; i < preview.length; i++) {
      const row = preview[i];
      const formData = rowToFormData(row);
      try {
        if (!formData.name) throw new Error("Name is required.");
        if (!formData.country) throw new Error("Country is required.");
        if (!formData.city) throw new Error("City is required.");
        if (!formData.type) throw new Error("Type is required.");
        if (!formData.website) throw new Error("Website is required.");
        if (!formData.description) throw new Error("Description is required.");
        if (!formData.programs) throw new Error("Programs are required.");
        if (!formData.tuitionFee) throw new Error("Tuition fee is required.");
        if (!formData.currency) throw new Error("Currency is required.");
        if (!formData.accreditation) throw new Error("Accreditation is required.");
        if (!formData.foundedYear) throw new Error("Founded year is required.");

        addUniversity(formData);
        importResults.push({
          row: i + 2,
          name: formData.name,
          status: "success",
          message: "Imported successfully.",
        });
      } catch (err: unknown) {
        importResults.push({
          row: i + 2,
          name: formData.name || `Row ${i + 2}`,
          status: "error",
          message: err instanceof Error ? err.message : "Unknown error.",
        });
      }
    }

    setResults(importResults);
    setImportDone(true);
    setImporting(false);
    // Refresh university list
    setUniversities(getUniversities());
    setPreview([]);
    setFileName("");
    if (fileRef.current) fileRef.current.value = "";
  }

  const successCount = results.filter((r) => r.status === "success").length;
  const errorCount = results.filter((r) => r.status === "error").length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          ← Back to Home
        </Link>
        <h1 className="mt-2 text-3xl font-extrabold text-gray-900">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage universities and bulk-import from Excel files.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Stats */}
        <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-5 text-center">
            <p className="text-3xl font-extrabold text-blue-600">{universities.length}</p>
            <p className="text-sm text-gray-500 mt-1">Total Universities</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 text-center">
            <p className="text-3xl font-extrabold text-green-600">
              {universities.filter((u) => u.type === "Public").length}
            </p>
            <p className="text-sm text-gray-500 mt-1">Public</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 text-center">
            <p className="text-3xl font-extrabold text-purple-600">
              {universities.filter((u) => u.type === "Private").length}
            </p>
            <p className="text-sm text-gray-500 mt-1">Private</p>
          </div>
        </div>

        {/* Excel Import Panel */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-800">Import from Excel</h2>
              <button
                onClick={downloadTemplate}
                className="flex items-center gap-1.5 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 transition-colors px-3 py-1.5 rounded-lg"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download Sample Template
              </button>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              Download the sample template, fill it in with university data, then upload it below.
              Supported format: <strong>.xlsx</strong> or <strong>.xls</strong>
            </p>

            {/* Template columns info */}
            <div className="mb-5 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs font-semibold text-blue-700 mb-1">Required columns:</p>
              <div className="flex flex-wrap gap-1">
                {TEMPLATE_HEADERS.map((h) => (
                  <span key={h} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                    {h}
                  </span>
                ))}
              </div>
              <p className="text-xs text-blue-600 mt-2">
                <strong>Ranking</strong> is optional. <strong>Type</strong> must be: Public,
                Private, or Community College. <strong>Accreditation</strong>: Accredited,
                Provisionally Accredited, or Pending.
              </p>
            </div>

            {/* File upload */}
            <label
              htmlFor="excel-upload"
              className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
                fileName
                  ? "border-blue-400 bg-blue-50"
                  : "border-gray-300 bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <svg
                className="w-8 h-8 text-gray-400 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              {fileName ? (
                <span className="text-sm font-medium text-blue-600">{fileName}</span>
              ) : (
                <span className="text-sm text-gray-500">
                  Click to upload <strong>.xlsx</strong> / <strong>.xls</strong> file
                </span>
              )}
              <input
                id="excel-upload"
                ref={fileRef}
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFile}
                className="hidden"
              />
            </label>

            {/* Preview */}
            {preview.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Preview — {preview.length} row{preview.length !== 1 ? "s" : ""} found:
                </p>
                <div className="overflow-x-auto rounded-lg border border-gray-200 max-h-52">
                  <table className="min-w-full text-xs">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="px-3 py-2 text-left font-semibold text-gray-600">#</th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-600">Name</th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-600">Country</th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-600">Type</th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-600">Tuition</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {preview.map((row, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className="px-3 py-2 text-gray-400">{i + 2}</td>
                          <td className="px-3 py-2 font-medium text-gray-800">{row.Name}</td>
                          <td className="px-3 py-2 text-gray-500">{row.Country}</td>
                          <td className="px-3 py-2 text-gray-500">{row.Type}</td>
                          <td className="px-3 py-2 text-gray-500">
                            {row.TuitionFee} {row.Currency}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <button
                  onClick={handleImport}
                  disabled={importing}
                  className="mt-4 w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60 text-sm"
                >
                  {importing ? "Importing..." : `Import ${preview.length} Universit${preview.length !== 1 ? "ies" : "y"}`}
                </button>
              </div>
            )}

            {/* Results */}
            {importDone && results.length > 0 && (
              <div className="mt-4">
                <div className="flex gap-3 mb-3">
                  {successCount > 0 && (
                    <span className="text-sm font-medium text-green-700 bg-green-50 px-3 py-1 rounded-full">
                      ✓ {successCount} imported
                    </span>
                  )}
                  {errorCount > 0 && (
                    <span className="text-sm font-medium text-red-700 bg-red-50 px-3 py-1 rounded-full">
                      ✗ {errorCount} failed
                    </span>
                  )}
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {results.map((r, i) => (
                    <div
                      key={i}
                      className={`text-xs flex items-start gap-2 p-2 rounded ${
                        r.status === "success"
                          ? "bg-green-50 text-green-800"
                          : "bg-red-50 text-red-800"
                      }`}
                    >
                      <span className="font-bold shrink-0">Row {r.row}:</span>
                      <span className="font-medium shrink-0">{r.name}</span>
                      <span className="text-gray-500">— {r.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick actions */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h3 className="text-sm font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Link
                href="/universities/add"
                className="flex items-center gap-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2.5 rounded-lg"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add University (Manual)
              </Link>
              <button
                onClick={downloadTemplate}
                className="flex items-center gap-2 w-full text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 transition-colors px-4 py-2.5 rounded-lg"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download Excel Template
              </button>
            </div>
          </div>

          {/* Recent Universities */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Recently Added</h3>
            <ul className="space-y-2">
              {[...universities]
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                )
                .slice(0, 5)
                .map((u) => (
                  <li key={u.id}>
                    <Link
                      href={`/universities/${u.id}`}
                      className="text-sm text-blue-600 hover:underline truncate block"
                      title={u.name}
                    >
                      {u.name}
                    </Link>
                    <span className="text-xs text-gray-400">
                      {u.city}, {u.country}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>

      {/* University table */}
      <div className="mt-8 bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">All Universities</h2>
          <span className="text-sm text-gray-400">{universities.length} total</span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Tuition
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {universities.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <Link
                      href={`/universities/${u.id}`}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      {u.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {u.city}, {u.country}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        u.type === "Public"
                          ? "bg-green-100 text-green-700"
                          : u.type === "Private"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {u.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {u.ranking ? `#${u.ranking}` : "—"}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {u.tuitionFee.toLocaleString()} {u.currency}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
