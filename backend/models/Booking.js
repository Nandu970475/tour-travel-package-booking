const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: String,
    email: String,
    travelDate: String,
    persons: Number,
    pickup: String,
    time: String,
    totalAmount: Number,
    paymentMethod: String,
    paymentStatus: {
      type: String,
      default: "Paid",
    },
   bookingStatus: {
  type: String,
  default: "Confirmed",
},
travelCharge: {
  type: Number,
  default: 0,
},
cancelReason: {
  type: String,
  default: "",
},

cancelledAt: {
  type: Date,
},
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Booking ||
  mongoose.model("Booking", bookingSchema);