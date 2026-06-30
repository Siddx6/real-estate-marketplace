import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-[#1a1530] text-white px-8 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded flex items-center justify-center font-bold text-sm">
          E
        </div>
        <span className="font-bold text-lg tracking-tight">EstateHub</span>
      </Link>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
        <a href="#buyers" className="hover:text-white transition">For Buyers</a>
        <a href="#owners" className="hover:text-white transition">For Owners</a>
        <a href="#about" className="hover:text-white transition">About</a>
      </div>

      {user ? (
  <div className="flex items-center gap-4">
    <span className="text-sm text-slate-300">Hi, {user.name}</span>
    {user.role === "owner" && (
      <Link
        to="/dashboard"
        className="text-sm font-medium text-slate-300 hover:text-white transition"
      >
        Dashboard
      </Link>
    )}
    {user.role === "buyer" && (
      <Link
        to="/wishlist"
        className="text-sm font-medium text-slate-300 hover:text-white transition"
      >
        Wishlist
      </Link>
    )}
    {user.role === "admin" && (
      <Link to="/admin" className="text-sm font-medium text-slate-300 hover:text-white transition">
        Admin
      </Link>
    )}
    <button
      onClick={handleLogout}
      className="text-sm font-semibold px-4 py-2 bg-white text-[#1a1530] rounded-md hover:bg-slate-100 transition"
    >
      Log Out
    </button>
  </div>
) : (
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-medium px-4 py-2 hover:text-white text-slate-300 transition"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="text-sm font-semibold px-4 py-2 bg-white text-[#1a1530] rounded-md hover:bg-slate-100 transition"
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;