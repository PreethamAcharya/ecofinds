const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/auth");
const Purchase = require("../models/Purchase");

// Get all purchases for the logged-in user
router.get("/", authenticateUser, async (req, res) => {
  try {
    // req.user.id should be set by authenticateUser middleware
    const userId = req.user.id;
    const purchases = await Purchase.find({ userId }).sort({ purchasedAt: -1 });
    res.json(purchases);
  } catch (err) {
    console.error("Error fetching purchases:", err);
    res.status(500).json({ message: "Failed to fetch purchases" });
  }
});

module.exports = router;
