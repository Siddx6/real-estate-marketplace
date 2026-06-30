import { Link } from "react-router-dom";

function PropertyCard({ property }) {
  const formatPrice = (price) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`;
    return `₹${price}`;
  };

  return (
    <Link
      to={`/properties/${property._id}`}
      className="block bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition"
    >
      <div className="h-44 bg-slate-100">
        {property.images?.[0] ? (
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
            No image
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="text-lg font-bold text-slate-900">{formatPrice(property.price)}</p>
        <p className="text-sm font-medium text-slate-700 mt-1 line-clamp-1">
          {property.title}
        </p>
        <p className="text-xs text-slate-500 mt-1">
          {property.locality}, {property.city}
        </p>
        <div className="flex gap-3 mt-3 text-xs text-slate-500">
          {property.bhk && <span>{property.bhk} BHK</span>}
          {property.area && <span>{property.area} sq.ft</span>}
          <span className="capitalize">{property.propertyType}</span>
        </div>
      </div>
    </Link>
  );
}

export default PropertyCard;