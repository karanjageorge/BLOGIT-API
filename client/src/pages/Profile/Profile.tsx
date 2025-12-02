/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Sidebar from "../../components/SideBar";
import { api } from "../../lib/axiosApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile/me");
        setForm(res.data);
      } catch {
        toast.error("Could not load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const saveProfile = async (e: any) => {
    e.preventDefault();

    try {
      await api.patch("/profile/update", form);
      localStorage.setItem("username", form.username);
      toast.success("Profile updated!");
    } catch {
      toast.error("Failed to update");
    }
  };

  const deleteAccount = async () => {
    try {
      await api.delete("/profile/delete");
      toast.success("Account deleted");

      localStorage.clear();
      navigate("/register");
    } catch {
      toast.error("Could not delete account");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-lg">
        Loading...
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8 max-w-xl">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>

        <form
          onSubmit={saveProfile}
          className="bg-white p-6 rounded shadow space-y-4"
        >
          <label className="block">
            <span className="font-semibold">First Name</span>
            <input
              type="text"
              className="w-full p-2 border rounded mt-1"
              value={form.firstName}
              onChange={(e) =>
                setForm({ ...form, firstName: e.target.value })
              }
            />
          </label>

          <label className="block">
            <span className="font-semibold">Last Name</span>
            <input
              type="text"
              className="w-full p-2 border rounded mt-1"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            />
          </label>

          <label className="block">
            <span className="font-semibold">Username</span>
            <input
              type="text"
              className="w-full p-2 border rounded mt-1"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </label>

          <label className="block">
            <span className="font-semibold">Email</span>
            <input
              type="email"
              className="w-full p-2 border rounded mt-1"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>

          <button className="px-4 py-2 bg-blue-600 text-white rounded">
            Save
          </button>
        </form>

        <button
          className="mt-6 px-4 py-2 bg-red-600 text-white rounded"
          onClick={deleteAccount}
        >
          Delete Account
        </button>
      </main>
    </div>
  );
}
