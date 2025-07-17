const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // or 'your-secret-key'
    const user = await User.findById(decoded.id || decoded._id).select('-password');

    if (!user) {
      return res.status(401).json({ error: 'Invalid token. User not found.' });
    }

    req.user = user; // ✅ Attach full user object
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = auth;
