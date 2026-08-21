const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/database");
const tourRoutes = require("./routes/tourRoutes");
const UserRoutes = require("./routes/UserRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", UserRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/ticket", ticketRoutes);
app.get("/", (req, res) => {
  res.send("Tour Travel Backend Running");
});

app.use("/api/tours", tourRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});