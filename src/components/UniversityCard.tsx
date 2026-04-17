"use client";

import Link from "next/link";
import { University } from "@/lib/types";

interface UniversityCardProps {
  university: University;
}

export default function UniversityCard({ university }: UniversityCardProps) {
  return (
    <Link href={`/universities/${university.id}`}>
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 h-full flex flex-col">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
          <div className="flex items-start justify-between">
            <h3 className="text-white font-bold text-lg leading-tight">{university.name}</h3>
            {university.ranking && (
              <span className="ml-2 flex-shrink-0 bg-white bg-opacity-20 text-white text-xs font-semibold px-2 py-1 rounded-full">
                #{university.ranking}
              </span>
            )}
          </div>
          <p className="text-blue-100 text-sm mt-1">
            {university.city}, {university.country}
          </p>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <p className="text-gray-600 text-sm line-clamp-2 flex-1">{university.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            <span
              className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                university.type === "Public"
                  ? "bg-green-100 text-green-800"
                  : university.type === "Private"
                  ? "bg-purple-100 text-purple-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {university.type}
            </span>
            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
              {university.accreditation}
            </span>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-800">
              {university.tuitionFee.toLocaleString()} {university.currency}
              <span className="text-gray-400 font-normal text-xs">/yr</span>
            </span>
            <span className="text-xs text-gray-400">Est. {university.foundedYear}</span>
          </div>

          <div className="mt-3 flex flex-wrap gap-1">
            {university.programs.slice(0, 3).map((program) => (
              <span
                key={program}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
              >
                {program}
              </span>
            ))}
            {university.programs.length > 3 && (
              <span className="text-xs text-gray-400">+{university.programs.length - 3} more</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
