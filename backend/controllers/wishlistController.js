const User = require("../models/User");

const addToWishlist = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const user = await User.findById(req.user.userId);

    if (user.wishlist.includes(propertyId)) {
      return res.status(400).json({ message: "Already in wishlist" });
    }

    user.wishlist.push(propertyId);
    await user.save();

    res.status(200).json({ message: "Added to wishlist", wishlist: user.wishlist });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const user = await User.findById(req.user.userId);

    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== propertyId
    );
    await user.save();

    res.status(200).json({ message: "Removed from wishlist", wishlist: user.wishlist });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate("wishlist");
    res.status(200).json(user.wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addToWishlist, removeFromWishlist, getWishlist };