import { Link } from "react-router-dom";

function AudienceSplit() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-8">
          <span className="text-xs font-semibold text-[#5b2a8c] uppercase tracking-wide">
            For Buyers &amp; Tenants
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-2 mb-3">
            Browse properties without the noise
          </h3>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">
            Filter by city, price, and BHK, save the ones you like, and reach
            out to owners directly when you're ready.
          </p>
          <Link
            to="/signup"
            className="inline-block bg-[#5b2a8c] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#4a2274] transition"
          >
            Start browsing
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-8">
          <span className="text-xs font-semibold text-orange-500 uppercase tracking-wide">
            For Owners
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-2 mb-3">
            List your property for free
          </h3>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">
            Post your listing in minutes, manage inquiries from one dashboard,
            and update or remove it anytime.
          </p>
          <Link
            to="/post-property"
            className="inline-block bg-slate-900 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-slate-800 transition"
          >
            Post a property
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AudienceSplit;