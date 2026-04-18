"use client";

import { useState, useRef, useCallback } from "react";

interface Props {
  value: string;
  folder?: string;
  onUpload: (url: string) => void;
}

export default function ImageUpload({ value, folder = "horizon-study", onUpload }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = useCallback(
    async (file: File) => {
      setUploading(true);
      setError("");

      const form = new FormData();
      form.append("file", file);
      form.append("folder", folder);

      try {
        const res = await fetch("/api/upload", { method: "POST", body: form });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? "Upload failed");
          return;
        }
        onUpload(data.url);
      } catch {
        setError("Network error — could not reach upload server.");
      } finally {
        setUploading(false);
      }
    },
    [folder, onUpload]
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) upload(file);
    // reset so same file can be re-selected
    e.target.value = "";
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) upload(file);
  }

  return (
    <div className="flex flex-col gap-2">
      <input ref={inputRef} type="file" accept="image/*" onChange={handleChange} className="hidden" />

      {/* Drop zone */}
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors ${
          dragOver ? "border-blue bg-blue/[0.04]" : "border-gray-horizon-300 hover:border-blue"
        } ${uploading ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        {uploading ? (
          <div className="flex items-center justify-center gap-2 text-sm text-blue">
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Uploading…
          </div>
        ) : value ? (
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="Preview" className="w-16 h-16 object-contain rounded-lg border border-gray-horizon-100 shrink-0" />
            <div className="text-left min-w-0">
              <div className="text-xs text-gray-horizon-500 truncate">{value.split("/").pop()}</div>
              <div className="text-xs text-blue mt-1">Click to replace</div>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-2xl mb-1">🖼️</div>
            <div className="text-sm text-gray-horizon-700 font-medium">Click or drag image here</div>
            <div className="text-xs text-gray-horizon-500 mt-0.5">JPEG, PNG, WebP · max 5 MB</div>
          </div>
        )}
      </div>

      {error && (
        <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          ⚠ {error}
        </div>
      )}
    </div>
  );
}
