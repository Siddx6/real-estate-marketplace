const express = require("express");
const router = express.Router();
const {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getMyProperties,
} = require("../controllers/propertyController");
const protect = require("../middleware/auth");
const allowRoles = require("../middleware/role");

router.post("/", protect, allowRoles("owner", "admin"), createProperty);
router.get("/", getProperties);
router.get("/owner/mine", protect, allowRoles("owner", "admin"), getMyProperties);
router.get("/:id", getPropertyById);
router.patch("/:id", protect, allowRoles("owner", "admin"), updateProperty);
router.delete("/:id", protect, allowRoles("owner", "admin"), deleteProperty);

module.exports = router;