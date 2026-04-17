"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import UniversityCard from "@/components/UniversityCard";
import { getUniversities } from "@/lib/universities";
import { University } from "@/lib/types";

export default function HomePage() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterCountry, setFilterCountry] = useState("");

  useEffect(() => {
    setUniversities(getUniversities());
  }, []);

  const countries = [...new Set(universities.map((u) => u.country))].sort();

  const filtered = universities.filter((u) => {
    const matchesSearch =
      !search ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.city.toLowerCase().includes(search.toLowerCase()) ||
      u.country.toLowerCase().includes(search.toLowerCase());
    const matchesType = !filterType || u.type === filterType;
    const matchesCountry = !filterCountry || u.country === filterCountry;
    return matchesSearch && matchesType && matchesCountry;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Find Your Dream University
        </h1>
        <p className="mt-3 text-lg text-gray-500 max-w-2xl mx-auto">
          Browse top universities worldwide and discover the perfect program for your future.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          placeholder="Search by name, city, or country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="">All Types</option>
          <option value="Public">Public</option>
          <option value="Private">Private</option>
          <option value="Community College">Community College</option>
        </select>
        <select
          value={filterCountry}
          onChange={(e) => setFilterCountry(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="">All Countries</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        {filtered.length} {filtered.length === 1 ? "university" : "universities"} found
      </p>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((university) => (
            <UniversityCard key={university.id} university={university} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <p className="text-xl font-medium">No universities found</p>
          <p className="mt-2 text-sm">Try adjusting your search or filters.</p>
          <Link
            href="/universities/add"
            className="mt-4 inline-block text-sm font-medium bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add a University
          </Link>
        </div>
      )}
    </main>
  );
}
