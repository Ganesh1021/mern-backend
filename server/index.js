// Load environment variables from .env file
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const slotRoutes = require("./routes/slot"); // combined booking + slot logic

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// Routes
app.use("/api/auth", authRoutes); // login/signup
app.use("/api", slotRoutes); // slots + bookings

// Test route
app.get("/", (req, res) => {
  res.send("🏋️‍♂️ Canara College Gym API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
