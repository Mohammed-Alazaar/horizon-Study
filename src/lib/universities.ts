import { University, UniversityFormData, FormErrors } from "./types";

const STORAGE_KEY = "horizon_study_universities";

export const INITIAL_UNIVERSITIES: University[] = [
  {
    id: "1",
    name: "Massachusetts Institute of Technology",
    country: "United States",
    city: "Cambridge",
    type: "Private",
    ranking: 1,
    website: "https://www.mit.edu",
    description:
      "A world-renowned research university known for its programs in science, engineering, and technology.",
    programs: ["Computer Science", "Engineering", "Physics", "Mathematics", "Economics"],
    tuitionFee: 57590,
    currency: "USD",
    accreditation: "Accredited",
    foundedYear: 1861,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "University of Oxford",
    country: "United Kingdom",
    city: "Oxford",
    type: "Public",
    ranking: 2,
    website: "https://www.ox.ac.uk",
    description:
      "One of the oldest and most prestigious universities in the world, with a rich history of academic excellence.",
    programs: ["Law", "Medicine", "Philosophy", "History", "Literature"],
    tuitionFee: 9250,
    currency: "GBP",
    accreditation: "Accredited",
    foundedYear: 1096,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "University of Tokyo",
    country: "Japan",
    city: "Tokyo",
    type: "Public",
    ranking: 28,
    website: "https://www.u-tokyo.ac.jp",
    description:
      "Japan's most prestigious university, offering a wide range of programs across all disciplines.",
    programs: ["Engineering", "Science", "Medicine", "Humanities", "Social Sciences"],
    tuitionFee: 535800,
    currency: "JPY",
    accreditation: "Accredited",
    foundedYear: 1877,
    createdAt: new Date().toISOString(),
  },
];

export function getUniversities(): University[] {
  if (typeof window === "undefined") return INITIAL_UNIVERSITIES;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_UNIVERSITIES));
      return INITIAL_UNIVERSITIES;
    }
    return JSON.parse(stored) as University[];
  } catch {
    return INITIAL_UNIVERSITIES;
  }
}

export function getUniversityById(id: string): University | undefined {
  return getUniversities().find((u) => u.id === id);
}

export function addUniversity(data: UniversityFormData): University {
  const universities = getUniversities();
  const newUniversity: University = {
    id: Date.now().toString(),
    name: data.name.trim(),
    country: data.country.trim(),
    city: data.city.trim(),
    type: data.type as University["type"],
    ranking: data.ranking ? parseInt(data.ranking, 10) : undefined,
    website: data.website.trim(),
    description: data.description.trim(),
    programs: data.programs
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean),
    tuitionFee: parseFloat(data.tuitionFee),
    currency: data.currency.trim().toUpperCase(),
    accreditation: data.accreditation as University["accreditation"],
    foundedYear: parseInt(data.foundedYear, 10),
    createdAt: new Date().toISOString(),
  };
  const updated = [...universities, newUniversity];
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
  return newUniversity;
}

export function validateUniversityForm(data: UniversityFormData): FormErrors {
  const errors: FormErrors = {};
  const currentYear = new Date().getFullYear();

  if (!data.name.trim()) {
    errors.name = "University name is required.";
  } else if (data.name.trim().length < 3) {
    errors.name = "Name must be at least 3 characters.";
  }

  if (!data.country.trim()) {
    errors.country = "Country is required.";
  }

  if (!data.city.trim()) {
    errors.city = "City is required.";
  }

  if (!data.type) {
    errors.type = "University type is required.";
  }

  if (data.ranking) {
    const rank = parseInt(data.ranking, 10);
    if (isNaN(rank) || rank < 1 || rank > 10000) {
      errors.ranking = "Ranking must be a positive number between 1 and 10000.";
    }
  }

  if (!data.website.trim()) {
    errors.website = "Website URL is required.";
  } else {
    try {
      new URL(data.website.trim());
    } catch {
      errors.website = "Please enter a valid URL (e.g. https://example.com).";
    }
  }

  if (!data.description.trim()) {
    errors.description = "Description is required.";
  } else if (data.description.trim().length < 20) {
    errors.description = "Description must be at least 20 characters.";
  }

  if (!data.programs.trim()) {
    errors.programs = "At least one program is required.";
  }

  if (!data.tuitionFee) {
    errors.tuitionFee = "Tuition fee is required.";
  } else {
    const fee = parseFloat(data.tuitionFee);
    if (isNaN(fee) || fee < 0) {
      errors.tuitionFee = "Tuition fee must be a non-negative number.";
    }
  }

  if (!data.currency.trim()) {
    errors.currency = "Currency is required.";
  } else if (!/^[A-Za-z]{3}$/.test(data.currency.trim())) {
    errors.currency = "Currency must be a 3-letter code (e.g. USD, GBP).";
  }

  if (!data.accreditation) {
    errors.accreditation = "Accreditation status is required.";
  }

  if (!data.foundedYear) {
    errors.foundedYear = "Founded year is required.";
  } else {
    const year = parseInt(data.foundedYear, 10);
    if (isNaN(year) || year < 1000 || year > currentYear) {
      errors.foundedYear = `Founded year must be between 1000 and ${currentYear}.`;
    }
  }

  return errors;
}
