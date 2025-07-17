const express = require("express");
const router = express.Router();
const Dorm = require("../models/dorm");
const { upload } = require("../server");
const Review = require("../models/review");
const auth = require("../middleware/auth");


router.post("/", async (req, res) => {
  try {
    console.log("Review Body:", req.body);
    console.log("Authenticated User:", req.user);

    const { rating, comment, createdAt, dormId } = req.body;

    if (!rating || !comment || !createdAt || !dormId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const dorm = await Dorm.findById(dormId);
    if (!dorm) {
      return res.status(404).json({ error: "Dorm not found" });
    }

    const review = new Review({
      rating,
      comment,
      createdAt,
      dorm: dormId,
      user: req.user._id
    });

    await review.save();

    // Try skipping this temporarily
    // await Review.calcAverageRating(dormId);

    res.status(201).json({ message: "Review added successfully", review });

  } catch (error) {
    console.error("POST /reviews error:", error);
    res.status(500).json({ error: "Error adding review" });
  }
});


// GET reviews for a specific dorm
router.get('/dorm/:dormId', async (req, res) => {
    try {
        const reviews = await Review.find({ dorm: req.params.dormId })
            .populate('user', 'name email');
        
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a review (owner or admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    // Check if review exists
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    // Check ownership
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await review.deleteOne();

    // The post-remove hook will automatically update the dorm's rating
    res.json({ success: true });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// get all reviews by userID
router.get('/user/:userId', async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.params.userId }).populate('dorm');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;