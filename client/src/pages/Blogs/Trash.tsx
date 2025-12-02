/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import DashboardSidebar from "../../components/SideBar";
import { api } from "../../lib/axiosApi";
import { toast } from "sonner";

export default function Trash() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null); // prevents double clicks

  useEffect(() => {
    void (async () => {
      try {
        const res = await api.get("/profile/trash");

        const list = res.data.blogs.map((b: any) => ({
          id: b.id,
          title: b.blogTitle,
          synopsis: b.blogSynopsis,
        }));

        setBlogs(list || []);
      } catch {
        toast.error("Failed to load trash");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const restore = async (id: string) => {
    try {
      setProcessingId(id);

      const res = await api.patch(`/blogs/restore/${id}`);

      if (res.status === 200) {
        setBlogs((prev) => prev.filter((b) => b.id !== id));
        toast.success("Restored successfully");
      }
    } catch (err) {
      console.error(err);
      toast.error("Restore failed");
    } finally {
      setProcessingId(null);
    }
  };

  const erase = async (id: string) => {
    try {
      setProcessingId(id);

      const res = await api.delete(`/blogs/${id}`);

      if (res.status === 200) {
        setBlogs((prev) => prev.filter((b) => b.id !== id));
        toast.success("Deleted permanently");
      }
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <DashboardSidebar />
      <main className="flex-1 p-8">

        <h2 className="text-xl font-semibold mb-4">Trash</h2>

        {loading ? (
          <p>Loading...</p>
        ) : blogs.length === 0 ? (
          <p>No deleted blogs</p>
        ) : (
          <div className="space-y-3">
            {blogs.map((b) => (
              <div
                key={b.id}
                className="bg-white p-4 rounded shadow flex justify-between"
              >
                <div>
                  <h3 className="font-bold">{b.title}</h3>
                  <p className="text-gray-500 text-sm">{b.synopsis}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    disabled={processingId === b.id}
                    onClick={() => restore(b.id)}
                    className="text-green-600 disabled:opacity-50"
                  >
                    {processingId === b.id ? "Processing..." : "Restore"}
                  </button>

                  <button
                    disabled={processingId === b.id}
                    onClick={() => erase(b.id)}
                    className="text-red-600 disabled:opacity-50"
                  >
                    {processingId === b.id ? "Processing..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}
