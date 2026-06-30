function Footer() {
  return (
    <footer className="bg-[#1a1530] text-slate-400 py-12">
      <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 bg-gradient-to-br from-orange-400 to-pink-500 rounded flex items-center justify-center font-bold text-xs text-white">
              E
            </div>
            <span className="font-bold text-white">EstateHub</span>
          </div>
          <p className="text-sm max-w-xs leading-relaxed">
            A simpler way to buy, rent, and list property — built for buyers,
            tenants, and owners alike.
          </p>
        </div>

        <div className="flex gap-16 text-sm">
          <div>
            <h4 className="text-white font-semibold mb-3">Company</h4>
            <ul className="space-y-2">
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">For Owners</h4>
            <ul className="space-y-2">
              <li>Post a property</li>
              <li>Manage listings</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 mt-10 pt-6 border-t border-slate-700 text-xs">
        © {new Date().getFullYear()} EstateHub. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;