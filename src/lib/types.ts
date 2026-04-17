export type UniversityType = "Public" | "Private" | "Community College";
export type AccreditationStatus = "Accredited" | "Provisionally Accredited" | "Pending";

export interface University {
  id: string;
  name: string;
  country: string;
  city: string;
  type: UniversityType;
  ranking?: number;
  website: string;
  description: string;
  programs: string[];
  tuitionFee: number;
  currency: string;
  accreditation: AccreditationStatus;
  foundedYear: number;
  imageUrl?: string;
  createdAt: string;
}

export interface UniversityFormData {
  name: string;
  country: string;
  city: string;
  type: UniversityType | "";
  ranking: string;
  website: string;
  description: string;
  programs: string;
  tuitionFee: string;
  currency: string;
  accreditation: AccreditationStatus | "";
  foundedYear: string;
}

export interface FormErrors {
  name?: string;
  country?: string;
  city?: string;
  type?: string;
  ranking?: string;
  website?: string;
  description?: string;
  programs?: string;
  tuitionFee?: string;
  currency?: string;
  accreditation?: string;
  foundedYear?: string;
}
