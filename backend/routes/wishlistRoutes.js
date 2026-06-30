const express = require("express");
const router = express.Router();
const {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} = require("../controllers/wishlistController");
const protect = require("../middleware/auth");

router.post("/:propertyId", protect, addToWishlist);
router.delete("/:propertyId", protect, removeFromWishlist);
router.get("/", protect, getWishlist);

module.exports = router;