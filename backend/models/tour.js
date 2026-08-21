const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },

  // NEW FIELD
  category: {
    type: String,
    required: true,
  },

  // Total Package Price
  price: {
    type: Number,
    required: true,
  },

  roomPrice: {
    type: Number,
    default: 0,
  },

  foodPrice: {
    type: Number,
    default: 0,
  },

  guidePrice: {
    type: Number,
    default: 0,
  },

  localTransportPrice: {
    type: Number,
    default: 0,
  },

  ticketPrice: {
    type: Number,
    default: 0,
  },

  insurancePrice: {
    type: Number,
    default: 0,
  },

  description: {
    type: String,
  },

  image: {
    type: String,
  },

  rating: {
    type: String,
    default: "4.5/5",
  },

  duration: {
    type: String,
    default: "3 Days",
  },

  places: {
    type: String,
    default: "",
  },

  gallery: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("Tour", tourSchema);