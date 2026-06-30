import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/properties/${id}`)
      .then((res) => setProperty(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const formatPrice = (price) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`;
    return `₹${price}`;
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <p className="text-center py-20 text-slate-500">Loading...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div>
        <Navbar />
        <p className="text-center py-20 text-slate-500">Property not found.</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="max-w-6xl mx-auto px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="h-96 bg-slate-100 rounded-xl overflow-hidden">
              {property.images?.[0] ? (
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  No image
                </div>
              )}
            </div>

            <h1 className="text-2xl font-bold text-slate-900 mt-6">{property.title}</h1>
            <p className="text-slate-500 mt-1">
              {property.locality}, {property.city}
            </p>

            <div className="flex gap-6 mt-4 text-sm text-slate-700">
              {property.bhk && <span>{property.bhk} BHK</span>}
              {property.area && <span>{property.area} sq.ft</span>}
              <span className="capitalize">{property.propertyType}</span>
              <span className="capitalize">For {property.listingType}</span>
            </div>

            <h2 className="text-lg font-bold text-slate-900 mt-8 mb-2">Description</h2>
            <p className="text-slate-600 leading-relaxed">{property.description}</p>

            {property.amenities?.length > 0 && (
              <>
                <h2 className="text-lg font-bold text-slate-900 mt-8 mb-2">Amenities</h2>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((a) => (
                    <span
                      key={a}
                      className="text-xs bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          <div>
            <div className="border border-slate-200 rounded-xl p-6 sticky top-6">
              <p className="text-2xl font-bold text-slate-900">{formatPrice(property.price)}</p>
              <p className="text-sm text-slate-500 mt-1">
                Listed by {property.owner?.name || "Owner"}
              </p>
              <button className="w-full mt-6 bg-[#5b2a8c] text-white font-semibold py-3 rounded-lg hover:bg-[#4a2274] transition">
                Contact Owner
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetail;