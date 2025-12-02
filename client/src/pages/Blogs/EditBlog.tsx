/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import DashboardSidebar from "../../components/SideBar";
import { api } from "../../lib/axiosApi";
import { uploadToCloudinary } from "../../lib/uploadToCloudinary";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

export default function EditBlog() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    blogTitle: "",
    blogSynopsis: "",
    blogContent: "",
    featuredImageUrl: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;

    void (async () => {
      try {
        const res = await api.get(`/blogs/${id}`);
        const b = res.data;

        setForm({
          blogTitle: b.blogTitle,
          blogSynopsis: b.blogSynopsis,
          blogContent: b.blogContent,
          featuredImageUrl: b.featuredImageUrl,
        });
      } catch {
        toast.error("Failed to load blog");
        navigate("/blogs/myblogs");
      }
    })();
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setSaving(true);

      let imageUrl = form.featuredImageUrl;
      if (file) imageUrl = await uploadToCloudinary(file);

      await api.patch(`/blogs/${id}`, {
        blogTitle: form.blogTitle,
        blogSynopsis: form.blogSynopsis,
        blogContent: form.blogContent,
        featuredImageUrl: imageUrl,
      });

      toast.success("Blog updated!");
      navigate("/blogs/myblogs");

    } catch {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <DashboardSidebar />
      <main className="flex-1 p-8">

        <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
          <h2 className="text-xl mb-4 font-bold">Edit Blog</h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              className="w-full p-2 border rounded"
              value={form.blogTitle}
              onChange={(e) => setForm({ ...form, blogTitle: e.target.value })}
            />

            <input
              className="w-full p-2 border rounded"
              value={form.blogSynopsis}
              onChange={(e) => setForm({ ...form, blogSynopsis: e.target.value })}
            />

            <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />

            <textarea
              className="w-full h-56 p-2 border rounded"
              value={form.blogContent}
              onChange={(e) => setForm({ ...form, blogContent: e.target.value })}
            />

            <button
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </form>
        </div>

      </main>
    </div>
  );
}
