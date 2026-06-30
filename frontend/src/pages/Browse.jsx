import { useState, useEffect } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import PropertyCard from "../components/PropertyCard";

function Browse() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: "",
    listingType: "",
    bhk: "",
    minPrice: "",
    maxPrice: "",
  });

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const params = {};
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params[key] = value;
      });
      const res = await api.get("/properties", { params });
      setProperties(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProperties();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProperties();
  };

  return (
    <div>
      <Navbar />

      <div className="bg-[#1a1530] py-8 px-8">
        <form
          onSubmit={handleSearch}
          className="max-w-6xl mx-auto bg-white rounded-xl p-4 flex flex-wrap gap-3"
        >
          <input
            type="text"
            name="city"
            placeholder="City"
            value={filters.city}
            onChange={handleChange}
            className="flex-1 min-w-[140px] px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-[#5b2a8c]"
          />
          <select
            name="listingType"
            value={filters.listingType}
            onChange={handleChange}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none"
          >
            <option value="">Buy or Rent</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
          <select
            name="bhk"
            value={filters.bhk}
            onChange={handleChange}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none"
          >
            <option value="">Any BHK</option>
            <option value="1">1 BHK</option>
            <option value="2">2 BHK</option>
            <option value="3">3 BHK</option>
            <option value="4">4+ BHK</option>
          </select>
          <input
            type="number"
            name="minPrice"
            placeholder="Min price"
            value={filters.minPrice}
            onChange={handleChange}
            className="w-28 px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-[#5b2a8c]"
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max price"
            value={filters.maxPrice}
            onChange={handleChange}
            className="w-28 px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-[#5b2a8c]"
          />
          <button
            type="submit"
            className="bg-[#5b2a8c] text-white font-semibold px-6 py-2 rounded-lg text-sm hover:bg-[#4a2274] transition"
          >
            Search
          </button>
        </form>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-10">
        <h1 className="text-xl font-bold text-slate-900 mb-6">
          {loading ? "Searching..." : `${properties.length} properties found`}
        </h1>

        {!loading && properties.length === 0 && (
          <p className="text-slate-500">No properties match your search.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Browse;