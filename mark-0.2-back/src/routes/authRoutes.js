const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/User'); // 1. Import the User model

const router = express.Router();

// 2. Get the JWT secret from the .env file
const SECRET = process.env.JWT_SECRET;

// ✅ Register route (now using MongoDB)
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 3. Check if user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create and save the new user in the database
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Login route (now using MongoDB)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 5. Find the user in the database
    const user = await User.findOne({ email });

    // 6. Check if user exists and if the password is correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
      // Use a generic error message for security
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 7. Create JWT token with user's ID in the payload
    const token = jwt.sign({ userId: user._id }, SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
