"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Login failed");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-navy-dark flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-10 w-full max-w-sm shadow-2xl">
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-9 h-9 bg-gold rounded-lg flex items-center justify-center font-display text-lg font-bold text-navy-dark">H</div>
          <div>
            <div className="font-display text-[17px] font-semibold text-navy-dark leading-tight">Horizon Admin</div>
            <div className="text-[10px] text-gray-horizon-500 uppercase tracking-widest">Dashboard</div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            required
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="border border-gray-horizon-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue transition-colors"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="border border-gray-horizon-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue transition-colors"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-gold text-navy-dark py-3 rounded-xl text-sm font-medium hover:bg-gold-light transition-colors disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
                Signing in...
              </>
            ) : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
