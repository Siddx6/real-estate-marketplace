import { useState } from "react";

function Hero() {
  const [tab, setTab] = useState("buy");
  const [query, setQuery] = useState("");

  const tabs = [
    { id: "buy", label: "Buy" },
    { id: "rent", label: "Rent" },
  ];

  return (
    <section className="relative bg-gradient-to-br from-[#3a1f6e] via-[#5b2a8c] to-[#7c3fa8] overflow-hidden">
      <div className="max-w-6xl mx-auto px-8 py-24 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
          Find your next home, faster
        </h1>
        <p className="text-purple-200 mb-10">
          Verified listings, direct owner contact, zero brokerage hassle
        </p>

        <div className="max-w-2xl mx-auto bg-[#241449] rounded-t-xl flex text-sm font-semibold">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-6 py-3 transition ${
                tab === t.id
                  ? "bg-white text-[#241449] rounded-t-xl"
                  : "text-purple-300 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-b-xl rounded-tr-xl p-2 flex gap-2 shadow-xl">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by city or locality"
            className="flex-1 px-4 py-3 text-slate-800 outline-none text-sm"
          />
          <button className="bg-[#5b2a8c] text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#4a2274] transition">
            Search
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;