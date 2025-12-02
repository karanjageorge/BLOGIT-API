/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import DashboardSidebar from "../../components/SideBar";
import { api } from "../../lib/axiosApi";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function MyBlogs() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      try {
        const res = await api.get("/profile/blogs");

        const list = res.data.blogs?.map((b: any) => ({
          id: b.id,                 // ✅ ID is guaranteed
          title: b.blogTitle,
          synopsis: b.blogSynopsis,
          createdAt: b.createdAt,
        }));

        setBlogs(list || []);
      } catch (err: any) {
        toast.error(err?.response?.data?.message || "Failed to load blogs");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const moveToTrash = async (id: string) => {
    try {
      await api.patch(`/blogs/trash/${id}`);
      setBlogs((blogs) => blogs.filter((b) => b.id !== id));
      toast.success("Moved to Trash");
    } catch {
      toast.error("Could not move to trash");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <DashboardSidebar />
      <main className="flex-1 p-8">

        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">My Blogs</h2>
            <Link to="/blogs/create" className="bg-blue-600 text-white px-3 py-1 rounded">
              New Blog
            </Link>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : blogs.length === 0 ? (
            <p>No blogs yet.</p>
          ) : (
            <div className="space-y-4">
              {blogs.map((b) => (
                <div key={b.id} className="bg-white p-4 rounded shadow flex justify-between">
                  <div>
                    <h3 className="font-bold">{b.title}</h3>
                    <p className="text-gray-500 text-sm">{b.synopsis}</p>
                  </div>

                  <div className="flex flex-col gap-1 text-right">
                    <Link to={`/blogs/view/${b.id}`} className="text-blue-600">View</Link>
                    <Link to={`/blogs/edit/${b.id}`} className="text-green-600">Edit</Link>
                    <button onClick={() => moveToTrash(b.id)} className="text-red-600">
                      Trash
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
