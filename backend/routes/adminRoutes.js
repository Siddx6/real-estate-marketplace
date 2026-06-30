const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getAllProperties,
  removeProperty,
} = require("../controllers/adminController");
const protect = require("../middleware/auth");
const allowRoles = require("../middleware/role");

router.get("/users", protect, allowRoles("admin"), getAllUsers);
router.get("/properties", protect, allowRoles("admin"), getAllProperties);
router.delete("/properties/:id", protect, allowRoles("admin"), removeProperty);

module.exports = router;