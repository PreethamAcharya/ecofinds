const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { authenticateUser } = require("../middleware/auth");
const Product = require("../models/Product");

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

// Get product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product" });
  }
});

// Create product
router.post("/", authenticateUser, upload.single("image"), async (req, res) => {
  try {
    const { title, description, category, price } = req.body;
    const newProduct = new Product({
      title,
      description,
      category,
      price,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: "Error creating product" });
  }
});

// Update product
router.put("/:id", authenticateUser, upload.single("image"), async (req, res) => {
  try {
    const { title, description, category, price } = req.body;
    const updatedData = {
      title,
      description,
      category,
      price,
    };
    if (req.file) updatedData.imageUrl = `/uploads/${req.file.filename}`;

    const product = await Product.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(400).json({ message: "Error updating product" });
  }
});

// Delete product
router.delete("/:id", authenticateUser, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product" });
  }
});

module.exports = router;
