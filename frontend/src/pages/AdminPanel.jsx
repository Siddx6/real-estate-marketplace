import { useState, useEffect } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [tab, setTab] = useState("properties");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, propRes] = await Promise.all([
          api.get("/admin/users"),
          api.get("/admin/properties"),
        ]);
        setUsers(userRes.data);
        setProperties(propRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleRemoveProperty = async (id) => {
    if (!window.confirm("Remove this listing?")) return;
    try {
      await api.delete(`/admin/properties/${id}`);
      setProperties(properties.map((p) =>
        p._id === id ? { ...p, status: "removed" } : p
      ));
    } catch (err) {
      console.error(err);
    }
  };

  const formatPrice = (price) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`;
    return `₹${price}`;
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-6xl mx-auto px-8 py-10">
        <h1 className="text-xl font-bold text-slate-900 mb-6">Admin Panel</h1>

        <div className="flex gap-4 mb-8 border-b border-slate-200">
          {["properties", "users"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-3 text-sm font-semibold capitalize transition border-b-2 -mb-px ${
                tab === t
                  ? "border-[#5b2a8c] text-[#5b2a8c]"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {t} {t === "properties" ? `(${properties.length})` : `(${users.length})`}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-slate-500">Loading...</p>
        ) : tab === "properties" ? (
          <div className="space-y-4">
            {properties.map((p) => (
              <div
                key={p._id}
                className="flex gap-4 bg-white border border-slate-200 rounded-xl p-4 items-center"
              >
                <div className="w-24 h-16 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                  {p.images?.[0] ? (
                    <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                      No img
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 text-sm">{p.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {p.locality}, {p.city} · {formatPrice(p.price)}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Owner: {p.owner?.name} ({p.owner?.email})
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    p.status === "active"
                      ? "bg-green-50 text-green-600"
                      : "bg-red-50 text-red-500"
                  }`}>
                    {p.status}
                  </span>
                  {p.status === "active" && (
                    <button
                      onClick={() => handleRemoveProperty(p._id)}
                      className="text-xs px-3 py-1.5 border border-red-200 rounded-lg text-red-500 hover:bg-red-50 transition"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {users.map((u) => (
              <div
                key={u._id}
                className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl p-4"
              >
                <div className="w-9 h-9 rounded-full bg-[#5b2a8c] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {u.name?.[0]?.toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 text-sm">{u.name}</p>
                  <p className="text-xs text-slate-500">{u.email}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${
                  u.role === "admin"
                    ? "bg-purple-50 text-[#5b2a8c]"
                    : u.role === "owner"
                    ? "bg-orange-50 text-orange-600"
                    : "bg-slate-100 text-slate-600"
                }`}>
                  {u.role}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;