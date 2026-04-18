"use client";

import { useState, useEffect } from "react";
import ImageUpload from "./ImageUpload";
import ExcelImport from "./ExcelImport";
import DepartmentsTable, { Department } from "./DepartmentsTable";

interface University {
  _id: string;
  name: string;
  shortName: string;
  city: string;
  establishedYear: number | null;
  localRank: number | null;
  about: string;
  website: string;
  teachingLanguages: string[];
  logoUrl: string;
  coverColor: string;
  tags: string[];
  bachelorDepartments: Department[];
  masterDepartments: Department[];
  phdDepartments: Department[];
  featured: boolean;
  order: number;
}

const empty: Omit<University, "_id"> = {
  name: "", shortName: "", city: "Ankara", establishedYear: null, localRank: null,
  about: "", website: "", teachingLanguages: [], logoUrl: "",
  coverColor: "linear-gradient(135deg,#0D2B55,#1A5FB4)", tags: [],
  bachelorDepartments: [], masterDepartments: [], phdDepartments: [],
  featured: true, order: 0,
};

export default function UniversitiesManager() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<University | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [tab, setTab] = useState<"list" | "excel">("list");

  useEffect(() => { fetchUniversities(); }, []);

  async function fetchUniversities() {
    setLoading(true);
    try {
      const res = await fetch("/api/universities");
      const data = await res.json();
      // Ensure every university has the department arrays (old docs may lack them)
      const safe = (Array.isArray(data) ? data : []).map((u: any) => ({
        ...u,
        bachelorDepartments: u.bachelorDepartments ?? [],
        masterDepartments: u.masterDepartments ?? [],
        phdDepartments: u.phdDepartments ?? [],
        teachingLanguages: u.teachingLanguages ?? [],
        tags: u.tags ?? [],
      }));
      setUniversities(safe);
    } catch {
      setError("Failed to load universities");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    setError("");
    try {
      const url = isNew ? "/api/universities" : `/api/universities/${editing._id}`;
      const res = await fetch(url, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
      if (!res.ok) { setError((await res.json()).error ?? "Save failed"); return; }
      await fetchUniversities();
      setEditing(null);
    } catch {
      setError("Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this university?")) return;
    setDeleting(id);
    try {
      await fetch(`/api/universities/${id}`, { method: "DELETE" });
      setUniversities((prev) => prev.filter((u) => u._id !== id));
    } catch {
      setError("Delete failed");
    } finally {
      setDeleting(null);
    }
  }

  function openNew() {
    setEditing({ ...empty, _id: "" });
    setIsNew(true);
    setTab("list");
  }

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(["list", "excel"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === t ? "bg-navy-dark text-white" : "bg-white border border-gray-horizon-100 text-gray-horizon-700 hover:border-navy"}`}
          >
            {t === "list" ? "🎓 List" : "📊 Excel Import"}
          </button>
        ))}
        <button onClick={openNew}
          className="ml-auto bg-gold text-navy-dark px-4 py-2 rounded-lg text-sm font-medium hover:bg-gold-light transition-colors">
          + Add University
        </button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">{error}</div>}

      {tab === "excel" && <ExcelImport onImportDone={fetchUniversities} />}

      {tab === "list" && (
        loading ? (
          <div className="text-center py-16 text-gray-horizon-500">Loading…</div>
        ) : universities.length === 0 ? (
          <div className="text-center py-16 text-gray-horizon-500">No universities yet.</div>
        ) : (
          <div className="flex flex-col gap-3">
            {universities.map((uni) => (
              <div key={uni._id} className="bg-white rounded-xl border border-gray-horizon-100 p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xs font-medium shrink-0 overflow-hidden" style={{ background: uni.coverColor }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {uni.logoUrl ? <img src={uni.logoUrl} alt="" className="w-10 h-10 object-contain" /> : uni.shortName?.slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-navy-dark text-sm">{uni.name}</div>
                  <div className="text-xs text-gray-horizon-500">
                    {uni.city}{uni.establishedYear ? ` · Est. ${uni.establishedYear}` : ""}{uni.localRank ? ` · Rank #${uni.localRank}` : ""}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => { setEditing(uni); setIsNew(false); }}
                    className="text-xs border border-gray-horizon-100 px-3 py-1.5 rounded-lg hover:border-blue transition-colors">Edit</button>
                  <button onClick={() => handleDelete(uni._id)} disabled={deleting === uni._id}
                    className="text-xs border border-red-100 text-red-600 px-3 py-1.5 rounded-lg hover:border-red-300 transition-colors disabled:opacity-50">
                    {deleting === uni._id ? "…" : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {/* ── Edit / Create Modal ── */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-auto py-8 px-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-3xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold text-navy-dark">
                {isNew ? "Add University" : `Edit — ${editing.name}`}
              </h2>
              <button onClick={() => setEditing(null)} className="text-gray-horizon-500 hover:text-navy text-xl leading-none">×</button>
            </div>

            {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">{error}</div>}

            <div className="flex flex-col gap-5">

              {/* Basic info */}
              <fieldset className="border border-gray-horizon-100 rounded-xl p-4">
                <legend className="text-xs font-semibold text-gray-horizon-700 px-1 uppercase tracking-wide">Basic Information</legend>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <Field label="University Name *" value={editing.name} onChange={(v) => setEditing({ ...editing, name: v })} />
                  <Field label="Short Name *" value={editing.shortName} onChange={(v) => setEditing({ ...editing, shortName: v })} />
                  <Field label="City" value={editing.city} onChange={(v) => setEditing({ ...editing, city: v })} />
                  <Field label="Website" value={editing.website} placeholder="https://..." onChange={(v) => setEditing({ ...editing, website: v })} />
                  <Field label="Established Year" type="number" value={editing.establishedYear?.toString() ?? ""}
                    onChange={(v) => setEditing({ ...editing, establishedYear: v ? Number(v) : null })} />
                  <Field label="Local Rank" type="number" value={editing.localRank?.toString() ?? ""}
                    onChange={(v) => setEditing({ ...editing, localRank: v ? Number(v) : null })} />
                  <div className="col-span-2">
                    <Field label="Teaching Languages (comma-separated)" value={editing.teachingLanguages.join(", ")}
                      placeholder="Turkish, English"
                      onChange={(v) => setEditing({ ...editing, teachingLanguages: v.split(",").map((l) => l.trim()).filter(Boolean) })} />
                  </div>
                  <div className="col-span-2">
                    <Field label="Tags (comma-separated)" value={editing.tags.join(", ")} placeholder="Engineering, Medicine…"
                      onChange={(v) => setEditing({ ...editing, tags: v.split(",").map((t) => t.trim()).filter(Boolean) })} />
                  </div>
                </div>
              </fieldset>

              {/* About */}
              <fieldset className="border border-gray-horizon-100 rounded-xl p-4">
                <legend className="text-xs font-semibold text-gray-horizon-700 px-1 uppercase tracking-wide">About</legend>
                <textarea rows={4} value={editing.about} onChange={(e) => setEditing({ ...editing, about: e.target.value })}
                  placeholder="Write a description of the university…"
                  className="w-full mt-2 border border-gray-horizon-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue resize-none" />
              </fieldset>

              {/* Appearance */}
              <fieldset className="border border-gray-horizon-100 rounded-xl p-4">
                <legend className="text-xs font-semibold text-gray-horizon-700 px-1 uppercase tracking-wide">Appearance</legend>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <Field label="Cover Color (CSS gradient)" value={editing.coverColor}
                    onChange={(v) => setEditing({ ...editing, coverColor: v })} />
                  <div className="flex items-center gap-2 self-end">
                    <div className="w-10 h-10 rounded-lg border border-gray-horizon-100 shrink-0" style={{ background: editing.coverColor }} />
                    <span className="text-xs text-gray-horizon-500">Preview</span>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-gray-horizon-700 mb-1.5">Logo Image</label>
                    <ImageUpload value={editing.logoUrl} folder="horizon-study/universities"
                      onUpload={(url) => setEditing({ ...editing, logoUrl: url })} />
                  </div>
                </div>
              </fieldset>

              {/* Department tables */}
              <fieldset className="border border-gray-horizon-100 rounded-xl p-4">
                <legend className="text-xs font-semibold text-gray-horizon-700 px-1 uppercase tracking-wide">Departments</legend>
                <div className="flex flex-col gap-4 mt-2">
                  <DepartmentsTable level="bachelor" label="🎓 Bachelor Degree Programs"
                    rows={editing.bachelorDepartments}
                    onChange={(rows) => setEditing({ ...editing, bachelorDepartments: rows })} />
                  <DepartmentsTable level="master" label="📚 Master Degree Programs"
                    rows={editing.masterDepartments}
                    onChange={(rows) => setEditing({ ...editing, masterDepartments: rows })} />
                  <DepartmentsTable level="phd" label="🔬 PhD Programs"
                    rows={editing.phdDepartments}
                    onChange={(rows) => setEditing({ ...editing, phdDepartments: rows })} />
                </div>
              </fieldset>

              {/* Options */}
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm text-gray-horizon-700 cursor-pointer">
                  <input type="checkbox" checked={editing.featured}
                    onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} className="w-4 h-4" />
                  Featured on home page
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-horizon-500">Order:</span>
                  <input type="number" value={editing.order}
                    onChange={(e) => setEditing({ ...editing, order: Number(e.target.value) })}
                    className="w-16 border border-gray-horizon-100 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-blue" />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-6 border-t border-gray-horizon-100">
              <button onClick={handleSave} disabled={saving}
                className="bg-gold text-navy-dark px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gold-light transition-colors disabled:opacity-60 flex items-center gap-2">
                {saving ? <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>Saving…</> : "Save University"}
              </button>
              <button onClick={() => setEditing(null)}
                className="border border-gray-horizon-100 text-gray-horizon-700 px-6 py-2.5 rounded-lg text-sm hover:border-navy transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({
  label, value, onChange, type = "text", placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-horizon-700 mb-1">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full border border-gray-horizon-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue transition-colors" />
    </div>
  );
}
