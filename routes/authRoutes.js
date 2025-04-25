const express = require('express');
const router = express.Router();
const User = require('../models/user.models.js');
const bcrypt = require('bcryptjs'); // Changed from 'bcrypt' to 'bcryptjs'
const jwt = require('jsonwebtoken');

// Register User
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      address,
      phone
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully", user: newUser });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login User
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    res.status(200).json({ message: "Login successful", token, user });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
