// backend/middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');


// Simplified auth middleware
const auth = async (req, res, next) => {
  try {
    // 1. Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) throw new Error('Please log in to access this');

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Attach user to request
    req.user = await User.findById(decoded.userId);
    if (!req.user) throw new Error('User not found');

    next();
  } catch (err) {
    res.status(401).json({ 
      success: false,
      error: err.message || 'Invalid authentication' 
    });
  }
};

module.exports = auth;