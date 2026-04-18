"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getUniversities } from "@/lib/universities";
import { University } from "@/lib/types";

export default function Footer() {
  const [recentUniversities, setRecentUniversities] = useState<University[]>([]);

  useEffect(() => {
    const all = getUniversities();
    // Sort by createdAt descending, take last 5
    const sorted = [...all].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setRecentUniversities(sorted.slice(0, 5));
  }, []);

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="text-white font-bold text-lg">Horizon Study</span>
            </Link>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              Discover and compare top universities worldwide. Your journey to higher education
              starts here.
            </p>
          </div>

          {/* Recently Added Universities */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Recently Added
            </h3>
            {recentUniversities.length > 0 ? (
              <ul className="space-y-2">
                {recentUniversities.map((u) => (
                  <li key={u.id}>
                    <Link
                      href={`/universities/${u.id}`}
                      className="text-sm text-gray-400 hover:text-white transition-colors truncate block"
                      title={u.name}
                    >
                      {u.name}
                    </Link>
                    <span className="text-xs text-gray-600">
                      {u.city}, {u.country}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No universities yet.</p>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Browse Universities
                </Link>
              </li>
              <li>
                <Link
                  href="/universities/add"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Add University
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-gray-400 hover:text-white transition-colors">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Horizon Study. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-gray-500">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
