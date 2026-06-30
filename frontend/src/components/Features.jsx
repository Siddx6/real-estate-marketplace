const features = [
  {
    title: "Verified listings",
    desc: "Every property is reviewed before it goes live, so you're never browsing dead listings.",
  },
  {
    title: "Talk to owners directly",
    desc: "No middlemen. Send an inquiry and the owner gets it straight to their dashboard.",
  },
  {
    title: "Built for buyers and tenants",
    desc: "Filter by city, budget, and BHK to find exactly what fits, whether you're buying or renting.",
  },
  {
    title: "Save and compare",
    desc: "Wishlist properties you like and come back to them anytime.",
  },
];

function Features() {
  return (
    <section className="max-w-6xl mx-auto px-8 py-20">
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Why EstateHub</h2>
      <p className="text-slate-500 mb-12">
        A simpler way to buy, rent, and list property
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f) => (
          <div
            key={f.title}
            className="border border-slate-200 rounded-xl p-6 hover:border-[#5b2a8c] hover:shadow-md transition"
          >
            <h3 className="font-semibold text-slate-900 mb-2">{f.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;