const express = require('express');
require("dotenv").config();
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path'); 
const multer = require("multer");
const auth = require('./middleware/auth'); // Added import

// Debug line to verify environment variables are loading
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('PORT:', process.env.PORT);

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Multer to upload files
const storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true); // Accept file
        } else {
            cb(new Error("Only .jpg, .jpeg, .png, .webp files are allowed"), false); // Reject file
        }
    }
});

module.exports = { upload };

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/dorms', require('./routes/dorms')); 
app.use('/api/reviews', require('./routes/reviews')); // Added with auth middleware
app.use("/uploads", express.static("uploads")); // Allows public access to uploaded images
app.use('/api/users', require('./routes/users'));




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`));