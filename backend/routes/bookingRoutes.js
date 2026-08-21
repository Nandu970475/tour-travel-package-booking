const express = require("express");
const router = express.Router();

const {
  createBooking,
  getMyBookings,
} = require("../controllers/bookingController");

// Create a booking
router.post("/", createBooking);

// Get all bookings of a user
router.get("/", async (req, res) => {
  const Booking = require("../models/Booking");

  const bookings = await Booking.find().sort({
    createdAt: -1,
  });

  res.json(bookings);
});
// Cancel Booking
router.put("/cancel/:id", async (req, res) => {
  try {
    const Booking = require("../models/Booking");

    const { reason } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        bookingStatus: "Cancelled",
        cancelReason: reason,
        cancelledAt: new Date(),
      },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.json({
      message: "Booking cancelled successfully",
      booking,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});
module.exports = router;