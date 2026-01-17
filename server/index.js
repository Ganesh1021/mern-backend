// // Load environment variables from .env file
// require('dotenv').config();

// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./config/db'); // MongoDB connection function

// // Initialize app
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// connectDB(process.env.MONGO_URI);

// // Routes
// app.use('/api/auth', require('./routes/auth'));         // for login/signup
// app.use('/api/bookings', require('./routes/bookings')); // for slot booking

// // Test route
// app.get('/', (req, res) => {
//   res.send('Canara Gym API running');
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));



// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const authRoutes = require("./routes/auth");
// const slotRoutes = require("./routes/slot");

// const app = express();
// app.use(cors());
// app.use(express.json());

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.log(err));

// app.use("/api/auth", authRoutes);
// app.use("/api", slotRoutes);

// app.listen(5000, () => console.log("🚀 Server running on port 5000"));


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
