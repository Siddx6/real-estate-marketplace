import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function OwnerDashboard() {
  const [properties, setProperties] = useState([]);
  const [leads, setLeads] = useState([]);
  const [tab, setTab] = useState("listings");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [propRes, leadRes] = await Promise.all([
          api.get("/properties/owner/mine"),
          api.get("/leads/owner"),
        ]);
        setProperties(propRes.data);
        setLeads(leadRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this listing?")) return;
    try {
      await api.delete(`/properties/${id}`);
      setProperties(properties.filter((p) => p._id !== id));
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
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-slate-900">Owner Dashboard</h1>
          <Link
            to="/post-property"
            className="bg-[#5b2a8c] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#4a2274] transition"
          >
            + Post Property
          </Link>
        </div>

        <div className="flex gap-4 mb-8 border-b border-slate-200">
          {["listings", "leads"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-3 text-sm font-semibold capitalize transition border-b-2 -mb-px ${
                tab === t
                  ? "border-[#5b2a8c] text-[#5b2a8c]"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {t} {t === "listings" ? `(${properties.length})` : `(${leads.length})`}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-slate-500">Loading...</p>
        ) : tab === "listings" ? (
          <div>
            {properties.length === 0 ? (
              <p className="text-slate-500">No listings yet.</p>
            ) : (
              <div className="space-y-4">
                {properties.map((p) => (
                  <div
                    key={p._id}
                    className="flex gap-4 bg-white border border-slate-200 rounded-xl p-4 items-center"
                  >
                    <div className="w-24 h-16 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                      {p.images?.[0] ? (
                        <img
                          src={p.images[0]}
                          alt={p.title}
                          className="w-full h-full object-cover"
                        />
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
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to={`/properties/${p._id}`}
                        className="text-xs px-3 py-1.5 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 transition"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="text-xs px-3 py-1.5 border border-red-200 rounded-lg text-red-500 hover:bg-red-50 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            {leads.length === 0 ? (
              <p className="text-slate-500">No leads yet.</p>
            ) : (
              <div className="space-y-4">
                {leads.map((l) => (
                  <div
                    key={l._id}
                    className="bg-white border border-slate-200 rounded-xl p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{l.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{l.phone}</p>
                        {l.message && (
                          <p className="text-sm text-slate-600 mt-2">{l.message}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="text-xs bg-purple-50 text-[#5b2a8c] px-2 py-1 rounded-full font-medium">
                          {l.status}
                        </span>
                        <p className="text-xs text-slate-400 mt-1">
                          {l.property?.title}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default OwnerDashboard;