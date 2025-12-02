/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/axiosApi";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    emailAddress: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 Password Weakness Checker
  const isPasswordWeak = () => {
    const p = form.password;

    const hasUpper = /[A-Z]/.test(p);
    const hasLower = /[a-z]/.test(p);
    const hasNumber = /[0-9]/.test(p);
    const hasSymbol = /[!@#$%^&*]/.test(p);
    const longEnough = p.length >= 8;

    return !(hasUpper && hasLower && hasNumber && hasSymbol && longEnough);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await api.post("/auth/register", form);

      toast.success(res.data.message);
      navigate("/login");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        <div className="space-y-4">
          <input
            className="w-full border p-2 rounded"
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
          />
          <input
            className="w-full border p-2 rounded"
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
          />
          <input
            className="w-full border p-2 rounded"
            type="text"
            name="userName"
            placeholder="Username"
            onChange={handleChange}
          />
          <input
            className="w-full border p-2 rounded"
            type="email"
            name="emailAddress"
            placeholder="Email Address"
            onChange={handleChange}
          />

          {/* PASSWORD FIELD */}
          <input
            className="w-full border p-2 rounded"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          {/* 🔥 Weak Password Popup */}
          {form.password.length > 0 && isPasswordWeak() && (
            <div className="mt-2 text-xs bg-red-50 border border-red-300 p-3 rounded-lg 
                            text-red-700 transition-all duration-300 ease-in-out">
              <p className="font-semibold">Password must include:</p>
              <ul className="list-disc ml-4 space-y-1">
                <li>At least 8 characters</li>
                <li>Uppercase & lowercase letters</li>
                <li>At least one number</li>
                <li>At least one symbol (!@#$%^&*)</li>
              </ul>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
