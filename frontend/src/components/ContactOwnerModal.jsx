import { useState } from "react";
import api from "../services/api";

function ContactOwnerModal({ propertyId, onClose }) {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/leads", { propertyId, ...form });
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
        >
          ✕
        </button>

        {submitted ? (
          <div className="py-6 text-center">
            <h2 className="text-lg font-bold text-slate-900 mb-2">Inquiry sent</h2>
            <p className="text-sm text-slate-500">
              The owner will get back to you shortly.
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-bold text-slate-900 mb-1">Contact Owner</h2>
            <p className="text-sm text-slate-500 mb-5">
              Share your details and the owner will reach out to you
            </p>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-[#5b2a8c]"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-[#5b2a8c]"
              />
              <textarea
                name="message"
                placeholder="Message (optional)"
                value={form.message}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-[#5b2a8c] resize-none"
              />
              <button
                type="submit"
                className="w-full bg-[#5b2a8c] text-white font-semibold py-2.5 rounded-lg hover:bg-[#4a2274] transition"
              >
                Send Inquiry
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default ContactOwnerModal;