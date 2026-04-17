"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getUniversityById } from "@/lib/universities";
import { University } from "@/lib/types";

export default function UniversityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [university, setUniversity] = useState<University | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    if (!id) {
      router.push("/");
      return;
    }
    const found = getUniversityById(id);
    if (!found) {
      router.push("/");
      return;
    }
    setUniversity(found);
    setLoading(false);
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-gray-400">
        Loading...
      </div>
    );
  }

  if (!university) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/" className="text-sm text-blue-600 hover:underline">
        ← Back to Universities
      </Link>

      {/* Header */}
      <div className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 text-white">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-extrabold">{university.name}</h1>
            <p className="mt-1 text-blue-100 text-lg">
              {university.city}, {university.country}
            </p>
          </div>
          {university.ranking && (
            <div className="bg-white bg-opacity-20 rounded-xl px-5 py-3 text-center">
              <p className="text-xs uppercase tracking-wider text-blue-100">Global Rank</p>
              <p className="text-3xl font-extrabold">#{university.ranking}</p>
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <span className="bg-white bg-opacity-20 text-white text-sm font-medium px-3 py-1 rounded-full">
            {university.type}
          </span>
          <span className="bg-white bg-opacity-20 text-white text-sm font-medium px-3 py-1 rounded-full">
            {university.accreditation}
          </span>
          <span className="bg-white bg-opacity-20 text-white text-sm font-medium px-3 py-1 rounded-full">
            Est. {university.foundedYear}
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">About</h2>
            <p className="text-gray-600 leading-relaxed">{university.description}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Programs Offered</h2>
            <div className="flex flex-wrap gap-2">
              {university.programs.map((program) => (
                <span
                  key={program}
                  className="bg-blue-50 text-blue-700 text-sm font-medium px-3 py-1.5 rounded-full"
                >
                  {program}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Tuition Fee
            </h3>
            <p className="text-2xl font-bold text-gray-900">
              {university.tuitionFee.toLocaleString()}{" "}
              <span className="text-lg text-gray-500">{university.currency}</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">per academic year</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Quick Info
            </h3>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">Country</dt>
                <dd className="font-medium text-gray-800">{university.country}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">City</dt>
                <dd className="font-medium text-gray-800">{university.city}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Type</dt>
                <dd className="font-medium text-gray-800">{university.type}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Founded</dt>
                <dd className="font-medium text-gray-800">{university.foundedYear}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Accreditation</dt>
                <dd className="font-medium text-gray-800">{university.accreditation}</dd>
              </div>
            </dl>
          </div>

          <a
            href={university.website}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-blue-600 text-white font-semibold px-4 py-3 rounded-xl hover:bg-blue-700 transition-colors text-sm"
          >
            Visit Website →
          </a>
        </div>
      </div>
    </div>
  );
}
