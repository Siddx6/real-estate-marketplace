import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
  });
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
      const res = await api.post("/auth/register", form);
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

        <h1 className="text-xl font-bold text-slate-900 mb-1">Create your account</h1>
        <p className="text-sm text-slate-500 mb-6">
          Buy, rent, or list property in minutes
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-[#5b2a8c]"
          />
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

          <div className="flex gap-3">
            {["buyer", "owner"].map((r) => (
              <button
                type="button"
                key={r}
                onClick={() => setForm({ ...form, role: r })}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold border transition ${
                  form.role === r
                    ? "bg-[#5b2a8c] text-white border-[#5b2a8c]"
                    : "border-slate-300 text-slate-600"
                }`}
              >
                {r === "buyer" ? "I'm buying/renting" : "I'm an owner"}
              </button>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-[#5b2a8c] text-white font-semibold py-2.5 rounded-lg hover:bg-[#4a2274] transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-slate-500 mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-[#5b2a8c] font-semibold">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;