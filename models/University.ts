import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDepartment {
  department: string;
  language: string;
  tuitionFee: string;
  description: string;
}

export interface IUniversity extends Document {
  name: string;
  slug: string;
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
  bachelorDepartments: IDepartment[];
  masterDepartments: IDepartment[];
  phdDepartments: IDepartment[];
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const DepartmentSchema = new Schema<IDepartment>(
  {
    department: { type: String, default: "" },
    language: { type: String, default: "" },
    tuitionFee: { type: String, default: "" },
    description: { type: String, default: "" },
  },
  { _id: false }
);

const UniversitySchema = new Schema<IUniversity>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    shortName: { type: String, required: true, trim: true },
    city: { type: String, default: "Ankara" },
    establishedYear: { type: Number, default: null },
    localRank: { type: Number, default: null },
    about: { type: String, default: "" },
    website: { type: String, default: "" },
    teachingLanguages: [{ type: String }],
    logoUrl: { type: String, default: "" },
    coverColor: { type: String, default: "linear-gradient(135deg, #0D2B55, #1A5FB4)" },
    tags: [{ type: String }],
    bachelorDepartments: { type: [DepartmentSchema], default: [] },
    masterDepartments: { type: [DepartmentSchema], default: [] },
    phdDepartments: { type: [DepartmentSchema], default: [] },
    featured: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const University: Model<IUniversity> =
  mongoose.models.University ??
  mongoose.model<IUniversity>("University", UniversitySchema);

export default University;
