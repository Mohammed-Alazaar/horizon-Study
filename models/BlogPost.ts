import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  coverUrl: string;
  coverColor: string;
  author: string;
  readTime: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    excerpt: { type: String, default: "" },
    content: { type: String, default: "" },
    category: { type: String, default: "General" },
    coverUrl: { type: String, default: "" },
    coverColor: { type: String, default: "linear-gradient(135deg, #1A3D6E, #2A6DB5)" },
    author: { type: String, default: "Horizon Group" },
    readTime: { type: Number, default: 5 },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const BlogPost: Model<IBlogPost> =
  mongoose.models.BlogPost ??
  mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);

export default BlogPost;
