const express = require("express");
const router = express.Router();

const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");

// Add to Wishlist
router.post("/add", addToWishlist);

// Get Wishlist
router.get("/:userId", getWishlist);

// Remove from Wishlist
router.delete("/remove", removeFromWishlist);

module.exports = router;