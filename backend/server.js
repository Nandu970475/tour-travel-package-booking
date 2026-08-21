const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/database");

const UserRoutes = require("./routes/UserRoutes");
const tourRoutes = require("./routes/tourRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const ticketRoutes = require("./routes/ticketRoutes");

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/users", UserRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/ticket", ticketRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Tour Travel Backend Running");
});

// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});