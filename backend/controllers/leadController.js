const Lead = require("../models/Lead");
const Property = require("../models/Property");

const createLead = async (req, res) => {
  try {
    const { propertyId, name, phone, message } = req.body;

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    const lead = await Lead.create({
      property: propertyId,
      owner: property.owner,
      name,
      phone,
      message,
    });

    res.status(201).json(lead);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMyLeads = async (req, res) => {
  try {
    const leads = await Lead.find({ owner: req.user.userId })
      .populate("property", "title city locality")
      .sort({ createdAt: -1 });

    res.status(200).json(leads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createLead, getMyLeads };