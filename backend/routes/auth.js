// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


//------REGISTER------

router.post("/register", async (req, res) => {
  const { name, email, password, university } = req.body;
  try {
    console.log('Register attempt:', { name, email, password, university });
    const existingUser = await User.findOne({ email });
    // console.log('Existing user check:', existingUser);
    if (existingUser) return res.status(400).json({ message: "Email already in use" });
    const user = new User({ name, email, password, university }); 
    // console.log('User to save:', user);
    const savedUser = await user.save();
    // console.log('User saved successfully:', savedUser);

    // Generate JWT token
    const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        university: savedUser.university
      }
    });
  } catch (error) {
    // console.error("Register Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

//----------LOG IN-----------
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // console.log('Login attempt:', { email, password });
    const user = await User.findOne({ email }).select('+password'); // Include password field
    // console.log('User found:', user);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    // console.log('User password:', user.password);
    const isMatch = await user.correctPassword(password); // Use the schema method
    // console.log('Password match:', isMatch);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
    // console.log('JWT_SECRET:', process.env.JWT_SECRET);
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    // console.log('Token generated:', token);
    res.status(200).json({ message: "Login successful", token, user: { name: user.name, email: user.email } });
  } catch (error) {
    // console.error("Login Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
