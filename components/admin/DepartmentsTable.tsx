"use client";

import { useState } from "react";

export interface Department {
  department: string;
  language: string;
  tuitionFee: string;
  description: string;
}

const emptyRow = (): Department => ({ department: "", language: "", tuitionFee: "", description: "" });

interface Props {
  level: "bachelor" | "master" | "phd";
  label: string;
  rows: Department[] | undefined;
  onChange: (rows: Department[]) => void;
}

export default function DepartmentsTable({ level, label, rows: rowsProp, onChange }: Props) {
  const rows: Department[] = rowsProp ?? [];
  const [importing, setImporting] = useState(false);
  const [importError, setImportError] = useState("");

  function addRow() {
    onChange([...rows, emptyRow()]);
  }

  function removeRow(i: number) {
    onChange(rows.filter((_, idx) => idx !== i));
  }

  function updateCell(i: number, field: keyof Department, value: string) {
    const updated = rows.map((r, idx) => (idx === i ? { ...r, [field]: value } : r));
    onChange(updated);
  }

  async function handleExcelImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    setImporting(true);
    setImportError("");

    try {
      const form = new FormData();
      form.append("file", file);
      form.append("action", "parse_departments");

      const res = await fetch("/api/excel", { method: "POST", body: form });
      if (!res.ok) {
        const d = await res.json();
        setImportError(d.error ?? "Parse failed");
        return;
      }
      const { parsed } = await res.json();
      onChange([...rows, ...parsed]);
    } catch {
      setImportError("Failed to import file");
    } finally {
      setImporting(false);
    }
  }

  const bgHeader: Record<string, string> = {
    bachelor: "bg-blue/[0.06]",
    master: "bg-gold/[0.08]",
    phd: "bg-navy/[0.06]",
  };

  return (
    <div className="border border-gray-horizon-100 rounded-xl overflow-hidden">
      {/* Table header bar */}
      <div className={`flex items-center justify-between px-4 py-3 ${bgHeader[level]}`}>
        <span className="text-sm font-semibold text-navy-dark">{label}</span>
        <div className="flex items-center gap-2">
          {/* Download template */}
          <a
            href={`/api/excel/template?type=departments&level=${level}`}
            download
            className="text-xs border border-gray-horizon-300 text-gray-horizon-700 px-3 py-1.5 rounded-lg hover:border-blue transition-colors flex items-center gap-1"
          >
            ⬇ Template
          </a>

          {/* Import Excel */}
          <label className={`text-xs border border-gray-horizon-300 text-gray-horizon-700 px-3 py-1.5 rounded-lg hover:border-blue transition-colors cursor-pointer flex items-center gap-1 ${importing ? "opacity-60 pointer-events-none" : ""}`}>
            {importing ? "Importing…" : "📊 Import Excel"}
            <input type="file" accept=".xlsx,.xls,.csv" onChange={handleExcelImport} className="hidden" />
          </label>

          {/* Add row */}
          <button
            type="button"
            onClick={addRow}
            className="text-xs bg-navy-dark text-white px-3 py-1.5 rounded-lg hover:bg-navy transition-colors"
          >
            + Add Row
          </button>
        </div>
      </div>

      {importError && (
        <div className="text-xs text-red-600 bg-red-50 px-4 py-2">{importError}</div>
      )}

      {rows.length === 0 ? (
        <div className="text-center text-xs text-gray-horizon-500 py-6">
          No departments yet. Add a row or import an Excel file.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-gray-50 border-b border-gray-horizon-100">
              <tr>
                {["Department", "Language", "Tuition Fee", "Description", ""].map((h) => (
                  <th key={h} className="text-left px-3 py-2.5 font-medium text-gray-horizon-700">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                  {(["department", "language", "tuitionFee", "description"] as const).map((field) => (
                    <td key={field} className="px-2 py-1.5">
                      <input
                        type="text"
                        value={row[field]}
                        onChange={(e) => updateCell(i, field, e.target.value)}
                        placeholder={field === "tuitionFee" ? "$0 / year" : field.charAt(0).toUpperCase() + field.slice(1)}
                        className="w-full border border-transparent hover:border-gray-horizon-100 focus:border-blue rounded px-2 py-1 text-xs focus:outline-none transition-colors bg-transparent focus:bg-white"
                      />
                    </td>
                  ))}
                  <td className="px-2 py-1.5">
                    <button
                      type="button"
                      onClick={() => removeRow(i)}
                      className="text-red-400 hover:text-red-600 transition-colors text-base leading-none"
                      aria-label="Remove row"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
