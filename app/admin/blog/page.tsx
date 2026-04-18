import BlogManager from "@/components/admin/BlogManager";

export default function AdminBlogPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-navy-dark mb-1">Blog Posts</h1>
        <p className="text-gray-horizon-500 text-sm">Create and manage blog articles.</p>
      </div>
      <BlogManager />
    </div>
  );
}
