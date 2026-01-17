const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register new user
 * @access  Public
 */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ success: false, message: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ success: false, message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    console.error("❌ Register Error:", err.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post("/login", async (req, res) => {
  try {
    console.log("helooo");
    
    const { email, password } = req.body;
    console.log(email,":", password);
    
    if (!email || !password)  
      return res.status(400).json({ success: false, message: "All fields are required" });

    const user = await User.findOne({ email });
    console.log(user);
    
    if (!user)
      return res.status(400).json({ success: false, message: "User not found" });

    console.log("Entered password:", password);
    console.log("Stored hash:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ success: false, message: "Invalid credentials" });

    // JWT secret fallback in case .env missing
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "7d" }
    );

    return res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    console.error("❌ Login Error:", err.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;


// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// router.post("/signup", async (req, res) => {
//   const { name, email, password } = req.body;
//   const hashed = await bcrypt.hash(password, 10);
//   const user = new User({ name, email, password: hashed });
//   await user.save();
//   res.json({ message: "User created" });
// });

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) return res.status(400).json({ message: "User not found" });

//   const valid = await bcrypt.compare(password, user.password);
//   if (!valid) return res.status(400).json({ message: "Invalid password" });

//   const token = jwt.sign({ id: user._id }, "secret123");
//   res.json({ token });
// });

// module.exports = router;
