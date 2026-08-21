const Tour = require("../models/tour");
const mongoose = require("mongoose");

// Get all tours (with search)
const getAllTours = async (req, res) => {
  try {
    const { search } = req.query;

    let query = {};

    // Search by title or city
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { city: { $regex: search, $options: "i" } },
        ],
      };
    }

    const tours = await Tour.find(query);

    res.status(200).json({
      success: true,
      count: tours.length,
      data: tours,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single tour by ID
const getTourById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if ID is valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid tour ID",
      });
    }

    const tour = await Tour.findById(id);

    // If tour not found
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found",
      });
    }

    res.status(200).json({
      success: true,
      data: tour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllTours,
  getTourById,
};