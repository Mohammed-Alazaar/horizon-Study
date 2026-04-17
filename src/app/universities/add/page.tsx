"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { addUniversity, validateUniversityForm } from "@/lib/universities";
import { UniversityFormData, FormErrors } from "@/lib/types";

const EMPTY_FORM: UniversityFormData = {
  name: "",
  country: "",
  city: "",
  type: "",
  ranking: "",
  website: "",
  description: "",
  programs: "",
  tuitionFee: "",
  currency: "USD",
  accreditation: "",
  foundedYear: "",
};

export default function AddUniversityPage() {
  const router = useRouter();
  const [form, setForm] = useState<UniversityFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear individual field error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validateUniversityForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Scroll to first error
      const firstErrorField = Object.keys(validationErrors)[0];
      const el = document.getElementById(firstErrorField);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSubmitting(true);
    try {
      const newUniversity = addUniversity(form);
      setSubmitted(true);
      setTimeout(() => {
        router.push(`/universities/${newUniversity.id}`);
      }, 1500);
    } catch (err) {
      console.error("Failed to add university:", err);
      setErrors({ name: "An unexpected error occurred. Please try again." });
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">University Added!</h2>
        <p className="mt-2 text-gray-500">Redirecting to the university page...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          ← Back to Universities
        </Link>
        <h1 className="mt-2 text-3xl font-extrabold text-gray-900">Add University</h1>
        <p className="mt-1 text-gray-500 text-sm">
          Fill in the details below to add a new university to Horizon Study.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="bg-white rounded-xl shadow-md p-6 sm:p-8 space-y-6">

        {/* Basic Info */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                University Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Harvard University"
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? "border-red-400 bg-red-50" : "border-gray-300"
                }`}
              />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                Country <span className="text-red-500">*</span>
              </label>
              <input
                id="country"
                name="country"
                type="text"
                value={form.country}
                onChange={handleChange}
                placeholder="e.g. United States"
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.country ? "border-red-400 bg-red-50" : "border-gray-300"
                }`}
              />
              {errors.country && <p className="mt-1 text-xs text-red-600">{errors.country}</p>}
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City <span className="text-red-500">*</span>
              </label>
              <input
                id="city"
                name="city"
                type="text"
                value={form.city}
                onChange={handleChange}
                placeholder="e.g. Cambridge"
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.city ? "border-red-400 bg-red-50" : "border-gray-300"
                }`}
              />
              {errors.city && <p className="mt-1 text-xs text-red-600">{errors.city}</p>}
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Type <span className="text-red-500">*</span>
              </label>
              <select
                id="type"
                name="type"
                value={form.type}
                onChange={handleChange}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
                  errors.type ? "border-red-400 bg-red-50" : "border-gray-300"
                }`}
              >
                <option value="">Select type...</option>
                <option value="Public">Public</option>
                <option value="Private">Private</option>
                <option value="Community College">Community College</option>
              </select>
              {errors.type && <p className="mt-1 text-xs text-red-600">{errors.type}</p>}
            </div>

            <div>
              <label htmlFor="foundedYear" className="block text-sm font-medium text-gray-700 mb-1">
                Founded Year <span className="text-red-500">*</span>
              </label>
              <input
                id="foundedYear"
                name="foundedYear"
                type="number"
                value={form.foundedYear}
                onChange={handleChange}
                placeholder="e.g. 1861"
                min={1000}
                max={new Date().getFullYear()}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.foundedYear ? "border-red-400 bg-red-50" : "border-gray-300"
                }`}
              />
              {errors.foundedYear && (
                <p className="mt-1 text-xs text-red-600">{errors.foundedYear}</p>
              )}
            </div>

            <div>
              <label htmlFor="ranking" className="block text-sm font-medium text-gray-700 mb-1">
                Global Ranking{" "}
                <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                id="ranking"
                name="ranking"
                type="number"
                value={form.ranking}
                onChange={handleChange}
                placeholder="e.g. 1"
                min={1}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.ranking ? "border-red-400 bg-red-50" : "border-gray-300"
                }`}
              />
              {errors.ranking && <p className="mt-1 text-xs text-red-600">{errors.ranking}</p>}
            </div>

            <div>
              <label htmlFor="accreditation" className="block text-sm font-medium text-gray-700 mb-1">
                Accreditation <span className="text-red-500">*</span>
              </label>
              <select
                id="accreditation"
                name="accreditation"
                value={form.accreditation}
                onChange={handleChange}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
                  errors.accreditation ? "border-red-400 bg-red-50" : "border-gray-300"
                }`}
              >
                <option value="">Select status...</option>
                <option value="Accredited">Accredited</option>
                <option value="Provisionally Accredited">Provisionally Accredited</option>
                <option value="Pending">Pending</option>
              </select>
              {errors.accreditation && (
                <p className="mt-1 text-xs text-red-600">{errors.accreditation}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                Website URL <span className="text-red-500">*</span>
              </label>
              <input
                id="website"
                name="website"
                type="url"
                value={form.website}
                onChange={handleChange}
                placeholder="https://example.edu"
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.website ? "border-red-400 bg-red-50" : "border-gray-300"
                }`}
              />
              {errors.website && <p className="mt-1 text-xs text-red-600">{errors.website}</p>}
            </div>
          </div>
        </section>

        {/* Description */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
            Description
          </h2>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              About the University <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={form.description}
              onChange={handleChange}
              placeholder="Provide a brief overview of the university..."
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                errors.description ? "border-red-400 bg-red-50" : "border-gray-300"
              }`}
            />
            <div className="flex justify-between mt-1">
              {errors.description ? (
                <p className="text-xs text-red-600">{errors.description}</p>
              ) : (
                <span />
              )}
              <span className="text-xs text-gray-400">{form.description.length} chars</span>
            </div>
          </div>
        </section>

        {/* Programs & Fees */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
            Programs & Fees
          </h2>
          <div className="space-y-5">
            <div>
              <label htmlFor="programs" className="block text-sm font-medium text-gray-700 mb-1">
                Programs Offered <span className="text-red-500">*</span>
              </label>
              <input
                id="programs"
                name="programs"
                type="text"
                value={form.programs}
                onChange={handleChange}
                placeholder="Computer Science, Engineering, Medicine (comma separated)"
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.programs ? "border-red-400 bg-red-50" : "border-gray-300"
                }`}
              />
              <p className="mt-1 text-xs text-gray-400">Separate programs with commas.</p>
              {errors.programs && <p className="mt-1 text-xs text-red-600">{errors.programs}</p>}
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label htmlFor="tuitionFee" className="block text-sm font-medium text-gray-700 mb-1">
                  Annual Tuition Fee <span className="text-red-500">*</span>
                </label>
                <input
                  id="tuitionFee"
                  name="tuitionFee"
                  type="number"
                  value={form.tuitionFee}
                  onChange={handleChange}
                  placeholder="e.g. 50000"
                  min={0}
                  step="0.01"
                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.tuitionFee ? "border-red-400 bg-red-50" : "border-gray-300"
                  }`}
                />
                {errors.tuitionFee && (
                  <p className="mt-1 text-xs text-red-600">{errors.tuitionFee}</p>
                )}
              </div>

              <div>
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                  Currency <span className="text-red-500">*</span>
                </label>
                <input
                  id="currency"
                  name="currency"
                  type="text"
                  value={form.currency}
                  onChange={handleChange}
                  placeholder="USD"
                  maxLength={3}
                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase ${
                    errors.currency ? "border-red-400 bg-red-50" : "border-gray-300"
                  }`}
                />
                {errors.currency && (
                  <p className="mt-1 text-xs text-red-600">{errors.currency}</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Submit */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm"
          >
            {submitting ? "Adding..." : "Add University"}
          </button>
        </div>
      </form>
    </div>
  );
}
