// server/routes/products.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth'); // ✅ Correct import

// Controller functions
const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    getProductsByCategory
} = require('../controllers/productController');

// =============================
// Multer Configuration for Image Uploads
// =============================
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Images saved to 'uploads' folder
    },
    filename: (req, file, cb) => {
        // Unique filename: timestamp + extension
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// =============================
// Routes
// =============================

// Extra features must come **before `/:id`** to avoid route conflicts
router.get('/search/:keyword', searchProducts);
router.get('/category/:category', getProductsByCategory);

// Get all products
router.get('/', getAllProducts);

// Get a single product by ID
router.get('/:id', getProductById);

// Create a new product (Protected + image upload)
router.post('/', auth, upload.single('image'), createProduct);

// Update a product (Protected + image upload)
router.put('/:id', auth, upload.single('image'), updateProduct);

// Delete a product (Protected)
router.delete('/:id', auth, deleteProduct);

module.exports = router;
