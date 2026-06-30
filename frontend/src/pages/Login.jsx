import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", form);
      login(res.data.token, res.data.user);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
        <Link to="/" className="flex items-center gap-2 mb-6">
          <div className="w-7 h-7 bg-gradient-to-br from-orange-400 to-pink-500 rounded flex items-center justify-center font-bold text-xs text-white">
            E
          </div>
          <span className="font-bold text-slate-900">EstateHub</span>
        </Link>

        <h1 className="text-xl font-bold text-slate-900 mb-1">Welcome back</h1>
        <p className="text-sm text-slate-500 mb-6">Log in to your account</p>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-[#5b2a8c]"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-[#5b2a8c]"
          />

          <button
            type="submit"
            className="w-full bg-[#5b2a8c] text-white font-semibold py-2.5 rounded-lg hover:bg-[#4a2274] transition"
          >
            Log In
          </button>
        </form>

        <p className="text-sm text-slate-500 mt-6 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#5b2a8c] font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;