// src/components/Admin/AdminRegister.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerAdmin } from "../../api/api";

const AdminRegister = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    setLoading(true);
    try {
      const res = await registerAdmin({ email, password });
      if (res.success) {
        alert("Admin registered successfully!");
        navigate("/admin/login");
      } else {
        alert(res.message || "Registration failed");
      }
    } catch (error) {
      console.error("Admin registration error:", error);
      alert("Network error during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg"
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 py-2 rounded-lg font-semibold hover:bg-yellow-500"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;
