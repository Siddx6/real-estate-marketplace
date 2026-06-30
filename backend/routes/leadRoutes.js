const express = require("express");
const router = express.Router();
const { createLead, getMyLeads } = require("../controllers/leadController");
const protect = require("../middleware/auth");

router.post("/", createLead);
router.get("/owner", protect, getMyLeads);

module.exports = router;