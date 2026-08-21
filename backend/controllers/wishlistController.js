const User = require("../models/User");
const Tour = require("../models/tour");

// Add Tour to Wishlist
const addToWishlist = async (req, res) => {
  try {
    const { userId, tourId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if already exists
    if (user.wishlist.includes(tourId)) {
      return res.json({ message: "Tour already in wishlist" });
    }

    user.wishlist.push(tourId);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Added to wishlist",
      wishlist: user.wishlist,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get Wishlist
const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate("wishlist");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.wishlist);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Remove from Wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const { userId, tourId } = req.body;

    const user = await User.findById(userId);

    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== tourId
    );

    await user.save();

    res.status(200).json({
      success: true,
      message: "Removed from wishlist",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
};