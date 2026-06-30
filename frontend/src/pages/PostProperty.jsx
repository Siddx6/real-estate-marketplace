import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function PostProperty() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    listingType: "buy",
    propertyType: "apartment",
    bhk: "",
    area: "",
    city: "",
    locality: "",
    address: "",
    amenities: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      let images = [];

      if (imageFile) {
        const formData = new FormData();
        formData.append("images", imageFile);
        const uploadRes = await api.post("/properties/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        images = uploadRes.data.images;
      }

      const payload = {
        ...form,
        price: Number(form.price),
        bhk: Number(form.bhk),
        area: Number(form.area),
        amenities: form.amenities
          .split(",")
          .map((a) => a.trim())
          .filter(Boolean),
        images,
      };

      const res = await api.post("/properties", payload);
      navigate(`/properties/${res.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-2xl mx-auto px-8 py-10">
        <h1 className="text-xl font-bold text-slate-900 mb-1">Post a Property</h1>
        <p className="text-sm text-slate-500 mb-6">
          Fill in the details below to list your property
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title (e.g. 2BHK Apartment in Hinjawadi)"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-[#5b2a8c]"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-[#5b2a8c] resize-none"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="price"
              placeholder="Price (₹)"
              value={form.price}
              onChange={handleChange}
              required
              className="px-4 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-[#5b2a8c]"
            />
            <select
              name="listingType"
              value={form.listingType}
              onChange={handleChange}
              className="px-4 py-2.5 border border-slate-300 rounded-lg text-sm outline-none"
            >
              <option value="buy">Buy</option>
              <option value="rent">Rent</option>
            </select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <select
              name="propertyType"
              value={form.propertyType}
              onChange={handleChange}
              className="px-4 py-2.5 border border-slate-300 rounded-lg text-sm outline-none"
            >
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="plot">Plot</option>
            </select>
            <input
              type="number"
              name="bhk"
              placeholder="BHK"
              value={form.bhk}
              onChange={handleChange}
              className="px-4 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-[#5b2a8c]"
            />
            <input
              type="number"
              name="area"
              placeholder="Area (sq.ft)"
              value={form.area}
              onChange={handleChange}
              className="px-4 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-[#5b2a8c]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              required
              className="px-4 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-[#5b2a8c]"
            />
            <input
              type="text"
              name="locality"
              placeholder="Locality"
              value={form.locality}
              onChange={handleChange}
              required
              className="px-4 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-[#5b2a8c]"
            />
          </div>

          <input
            type="text"
            name="address"
            placeholder="Full address"
            value={form.address}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-[#5b2a8c]"
          />

          <input
            type="text"
            name="amenities"
            placeholder="Amenities (comma separated, e.g. Parking, Gym, Garden)"
            value={form.amenities}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-[#5b2a8c]"
          />

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Property Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#5b2a8c] text-white font-semibold py-3 rounded-lg hover:bg-[#4a2274] transition disabled:opacity-50"
          >
            {submitting ? "Posting..." : "Post Property"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostProperty;