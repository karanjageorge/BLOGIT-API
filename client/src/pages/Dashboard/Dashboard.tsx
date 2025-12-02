/* eslint-disable @typescript-eslint/no-explicit-any */

import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../lib/axiosApi";
import { toast } from "sonner";
import Sidebar from "../../components/SideBar";

export default function Dashboard() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [loadingUser, setLoadingUser] = useState(true);

  const [blogs, setBlogs] = useState<any[]>([]);
  const [trashBlogs, setTrashBlogs] = useState<any[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    if (!token) {
      navigate("/login");
      return;
    }
    if (storedUsername) setUsername(storedUsername);

    const fetchBlogs = async () => {
      try {
        const res = await api.get("/profile/blogs");
        setBlogs(res.data.slice(0, 3));

        const trashRes = await api.get("/profile/trash");
        setTrashBlogs(trashRes.data.slice(0, 3));
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingUser(false);
        setLoadingBlogs(false);
      }
    };

    fetchBlogs();
  }, [navigate]);

  const deleteBlog = async (id: string) => {
    try {
      await api.patch(`/blogs/trash/${id}`);
      setBlogs(blogs.filter((b) => b.id !== id));
      toast.success("Blog moved to trash!");
    } catch {
      toast.error("Could not delete blog");
    }
  };

  if (loadingUser || loadingBlogs) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-2">Welcome, {username} 👋</h1>
        <p className="text-gray-600 mb-6">
          Manage your blogs, profile, and settings from your dashboard.
        </p>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            title="Create a Blog"
            description="Write a new blog post"
            link="/blogs/create"
          />
          <DashboardCard
            title="My Blogs"
            description="Latest blogs"
            link="/blogs/myblogs"
            blogs={blogs}
            showActions
            onDelete={deleteBlog}
          />
          <DashboardCard
            title="Trash"
            description="Recently deleted blogs"
             link="/profile/trash"
            blogs={trashBlogs}
            showRestore
          />
        </div>
      </main>
    </div>
  );
}

function DashboardCard({
  title,
  description,
  link,
  blogs,
  showActions,
  onDelete,
  showRestore,
}: {
  title: string;
  description: string;
  link?: string;
  blogs?: any[];
  showActions?: boolean;
  onDelete?: (id: string) => void;
  showRestore?: boolean;
}) {
  return (
    <div className="bg-white p-6 shadow-sm rounded-xl hover:shadow-md transition cursor-pointer border flex flex-col">
      {link ? (
        <Link to={link}>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-gray-600 mt-2">{description}</p>
        </Link>
      ) : (
        <>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-gray-600 mt-2">{description}</p>

          <div className="mt-4 space-y-3">
            {blogs?.length === 0 && (
              <p className="text-gray-500">No blogs to display.</p>
            )}

            {blogs?.map((b) => (
              <div
                key={b.id}
                className="border p-3 rounded flex justify-between items-center"
              >
                <span className="line-clamp-1">{b.title}</span>
                <div className="flex gap-2">
                  {showActions && (
                    <>
                      <Link
                        to={`/blogs/edit/${b.id}`}
                        className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => onDelete && onDelete(b.id)}
                        className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </>
                  )}

                  {showRestore && (
                    <Link
                      to="/trash"
                      className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                    >
                      View Trash
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
