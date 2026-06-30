import { useState, useEffect } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import PropertyCard from "../components/PropertyCard";

function Wishlist() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/wishlist")
      .then((res) => setProperties(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Navbar />

      <div className="max-w-6xl mx-auto px-8 py-10">
        <h1 className="text-xl font-bold text-slate-900 mb-6">My Wishlist</h1>

        {loading ? (
          <p className="text-slate-500">Loading...</p>
        ) : properties.length === 0 ? (
          <p className="text-slate-500">No saved properties yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;