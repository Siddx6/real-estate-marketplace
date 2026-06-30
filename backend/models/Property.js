const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    listingType: { type: String, enum: ["buy", "rent"], required: true },
    propertyType: {
      type: String,
      enum: ["apartment", "villa", "plot"],
      required: true,
    },
    bhk: { type: Number },
    area: { type: Number },
    city: { type: String, required: true },
    locality: { type: String, required: true },
    address: { type: String },
    images: [{ type: String }],
    amenities: [{ type: String }],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["active", "removed"], default: "active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);