import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/axiosApi";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await api.post("/auth/login", form);

      toast.success("Login successful!");

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <div className="space-y-4">
          <input
            className="w-full border p-2 rounded"
            type="email"
            name="identifier"
            placeholder="Email or Username"
            onChange={handleChange}
          />
          <input
            className="w-full border p-2 rounded"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm">
            Don't have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
