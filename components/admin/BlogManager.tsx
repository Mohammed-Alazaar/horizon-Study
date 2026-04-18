"use client";

import { useState, useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import ImageUpload from "./ImageUpload";

interface BlogPost {
  _id: string;
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
  createdAt: string;
}

const empty: Omit<BlogPost, "_id" | "createdAt"> = {
  title: "", slug: "", excerpt: "", content: "", category: "General",
  coverUrl: "", coverColor: "linear-gradient(135deg,#1A3D6E,#2A6DB5)",
  author: "Horizon Group", readTime: 5, published: false,
};

const categories = ["General", "University Admissions", "Document Legalization", "Translation Tips", "Student Life", "News"];

export default function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [isNew, setIsNew] = useState(false);
  const editorRef = useRef<any>(null);

  useEffect(() => { fetchPosts(); }, []);

  async function fetchPosts() {
    setLoading(true);
    try {
      const res = await fetch("/api/blog?all=true");
      setPosts(await res.json());
    } catch {
      setError("Failed to load posts");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    setError("");
    try {
      const content = editorRef.current ? editorRef.current.getContent() : editing.content;
      const url = isNew ? "/api/blog" : `/api/blog/${editing._id}`;
      const method = isNew ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...editing, content }),
      });
      if (!res.ok) {
        const d = await res.json();
        setError(d.error ?? "Save failed");
        return;
      }
      await fetchPosts();
      setEditing(null);
    } catch {
      setError("Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this post?")) return;
    setDeleting(id);
    try {
      await fetch(`/api/blog/${id}`, { method: "DELETE" });
      setPosts((p) => p.filter((post) => post._id !== id));
    } catch {
      setError("Delete failed");
    } finally {
      setDeleting(null);
    }
  }

  async function togglePublish(post: BlogPost) {
    try {
      await fetch(`/api/blog/${post._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !post.published }),
      });
      await fetchPosts();
    } catch {
      setError("Failed to update publish status");
    }
  }

  return (
    <div>
      <div className="flex justify-end mb-6">
        <button
          onClick={() => { setEditing({ ...empty, _id: "", createdAt: "" }); setIsNew(true); }}
          className="bg-gold text-navy-dark px-4 py-2 rounded-lg text-sm font-medium hover:bg-gold-light transition-colors"
        >
          + New Post
        </button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">{error}</div>}

      {loading ? (
        <div className="text-center py-16 text-gray-horizon-500">Loading...</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-16 text-gray-horizon-500">No posts yet. Create your first article.</div>
      ) : (
        <div className="flex flex-col gap-3">
          {posts.map((post) => (
            <div key={post._id} className="bg-white rounded-xl border border-gray-horizon-100 p-5 flex items-center gap-4">
              <div className="w-12 h-10 rounded-lg shrink-0" style={{ background: post.coverColor }} />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-navy-dark text-sm truncate">{post.title}</div>
                <div className="text-xs text-gray-horizon-500">
                  {post.category} · {post.readTime} min read ·{" "}
                  {new Date(post.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                </div>
              </div>
              <div className="flex gap-2 items-center shrink-0">
                <button
                  onClick={() => togglePublish(post)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${post.published ? "border-green-200 text-green-700 hover:border-red-200 hover:text-red-600" : "border-gray-horizon-100 text-gray-horizon-500 hover:border-green-200 hover:text-green-700"}`}
                >
                  {post.published ? "Published" : "Draft"}
                </button>
                <button onClick={() => { setEditing(post); setIsNew(false); }}
                  className="text-xs border border-gray-horizon-100 px-3 py-1.5 rounded-lg hover:border-blue transition-colors">
                  Edit
                </button>
                <button onClick={() => handleDelete(post._id)} disabled={deleting === post._id}
                  className="text-xs border border-red-100 text-red-600 px-3 py-1.5 rounded-lg hover:border-red-300 transition-colors disabled:opacity-50">
                  {deleting === post._id ? "..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Editor modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-auto py-6 px-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-4xl">
            <h2 className="font-display text-xl font-bold text-navy-dark mb-6">{isNew ? "New Post" : "Edit Post"}</h2>

            <div className="flex flex-col gap-4">
              <Field label="Title *" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-horizon-700 mb-1">Category</label>
                  <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                    className="w-full border border-gray-horizon-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue">
                    {categories.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <Field label="Read Time (minutes)" value={String(editing.readTime)} type="number"
                  onChange={(v) => setEditing({ ...editing, readTime: Number(v) })} />
              </div>
              <Field label="Author" value={editing.author} onChange={(v) => setEditing({ ...editing, author: v })} />
              <div>
                <label className="block text-xs font-medium text-gray-horizon-700 mb-1">Excerpt</label>
                <textarea rows={2} value={editing.excerpt} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
                  className="w-full border border-gray-horizon-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue resize-none" />
              </div>

              {/* TinyMCE rich text editor */}
              <div>
                <label className="block text-xs font-medium text-gray-horizon-700 mb-1">Content</label>
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                  onInit={(_evt: any, editor: any) => { editorRef.current = editor; }}
                  initialValue={editing.content}
                  init={{
                    height: 420,
                    menubar: false,
                    plugins: [
                      "advlist", "autolink", "lists", "link", "image", "charmap",
                      "preview", "anchor", "searchreplace", "visualblocks", "code",
                      "fullscreen", "insertdatetime", "media", "table", "help", "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | bold italic underline | " +
                      "alignleft aligncenter alignright alignjustify | " +
                      "bullist numlist outdent indent | link image | " +
                      "removeformat code | help",
                    content_style: "body { font-family: DM Sans, sans-serif; font-size: 15px; color: #1a1a2e; }",
                    branding: false,
                    resize: true,
                  }}
                />
              </div>

              <Field label="Cover Color (CSS gradient)" value={editing.coverColor} onChange={(v) => setEditing({ ...editing, coverColor: v })} />
              <div>
                <label className="block text-xs font-medium text-gray-horizon-700 mb-1">Cover Image</label>
                <ImageUpload value={editing.coverUrl} folder="horizon-study/blog"
                  onUpload={(url) => setEditing({ ...editing, coverUrl: url })} />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="published" checked={editing.published}
                  onChange={(e) => setEditing({ ...editing, published: e.target.checked })} className="w-4 h-4" />
                <label htmlFor="published" className="text-sm text-gray-horizon-700">Publish immediately</label>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={handleSave} disabled={saving}
                className="bg-gold text-navy-dark px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gold-light transition-colors disabled:opacity-60 flex items-center gap-2">
                {saving ? <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>Saving...</> : "Save Post"}
              </button>
              <button onClick={() => setEditing(null)}
                className="border border-gray-horizon-100 text-gray-horizon-700 px-6 py-2.5 rounded-lg text-sm hover:border-navy transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-horizon-700 mb-1">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-horizon-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue transition-colors" />
    </div>
  );
}
