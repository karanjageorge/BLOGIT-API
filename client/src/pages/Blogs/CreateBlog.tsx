/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/blogs/CreateBlog.tsx
import { useState } from "react";
import DashboardSidebar from "../../components/SideBar";
import { api } from "../../lib/axiosApi";
import { uploadToCloudinary } from "../../lib/uploadToCloudinary";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function CreateBlog() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: any) => {
  e.preventDefault();
  setLoading(true);

  try {
    let imageUrl = "";
    if (file) {
      imageUrl = await uploadToCloudinary(file);
    }

    const payload = {
      blogTitle: title,
      blogSynopsis: synopsis,
      featuredImageUrl: imageUrl,
      blogContent: content,
    };

    await api.post("/blogs", payload);

    toast.success("Blog published");
    navigate("/blogs/myblogs");
  } catch (err: any) {
    toast.error(err.response?.data?.message || "Failed to publish");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex min-h-screen bg-gray-100">
      <DashboardSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Create New Blog</h2>

          <form onSubmit={handleCreate} className="space-y-3">
            <input className="w-full p-2 border rounded" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} required />
            <input className="w-full p-2 border rounded" placeholder="Synopsis" value={synopsis} onChange={(e)=>setSynopsis(e.target.value)} required />
            <input className="w-full p-2 border rounded" placeholder="Featured image (optional)" type="file" onChange={(e)=>setFile(e.target.files?.[0] ?? null)} />
            <textarea className="w-full p-2 border rounded h-56" placeholder="Content" value={content} onChange={(e)=>setContent(e.target.value)} required />

            <div className="flex gap-2">
              <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
                {loading ? "Publishing..." : "Publish"}
              </button>
              <button type="button" onClick={()=>navigate("/blogs/myblogs")} className="px-4 py-2 border rounded">Cancel</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
