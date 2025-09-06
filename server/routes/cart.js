const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/auth");
const CartItem = require("../models/CartItem");
const Purchase = require("../models/Purchase");
const Product = require("../models/Product");

// Get current user's cart items
router.get("/", authenticateUser, async (req, res) => {
  try {
    const cartItems = await CartItem.find({ user: req.user._id });
    res.json(cartItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching cart items" });
  }
});

// Add product to cart
router.post("/", authenticateUser, async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const newCartItem = new CartItem({
      user: req.user._id,
      product: product._id,
      title: product.title,
      price: product.price,
    });

    await newCartItem.save();
    res.status(201).json(newCartItem);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error adding to cart" });
  }
});

// Remove item from cart
router.delete("/:id", authenticateUser, async (req, res) => {
  try {
    const item = await CartItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    res.json({ message: "Item removed from cart" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error removing item" });
  }
});

// Checkout: move all cart items to purchases
router.post("/checkout", authenticateUser, async (req, res) => {
  try {
    const cartItems = await CartItem.find({ user: req.user._id });
    if (!cartItems.length) return res.status(400).json({ message: "Cart is empty" });

    const purchases = cartItems.map(item => ({
      user: item.user,
      product: item.product,
      title: item.title,
      price: item.price,
    }));

    await Purchase.insertMany(purchases);
    await CartItem.deleteMany({ user: req.user._id });

    res.json({ message: "Checkout successful", purchases });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error during checkout" });
  }
});

// Get previous purchases
router.get("/purchases", authenticateUser, async (req, res) => {
  try {
    const purchases = await Purchase.find({ user: req.user._id });
    res.json(purchases);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching purchases" });
  }
});

module.exports = router;
