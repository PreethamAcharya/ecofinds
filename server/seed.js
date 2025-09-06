const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const products = [
  {
    title: "Eco-Friendly Water Bottle",
    description: "A reusable stainless steel bottle to reduce plastic waste.",
    category: "Sustainability",
    price: 500,
    imageUrl: "/uploads/bottle.jpg",
  },
  {
    title: "Bamboo Toothbrush",
    description: "Made from biodegradable bamboo, better for the planet.",
    category: "Personal Care",
    price: 150,
    imageUrl: "/uploads/toothbrush.jpg",
  },
  {
    title: "Organic Cotton Tote Bag",
    description: "Durable and stylish, perfect for groceries or daily use.",
    category: "Lifestyle",
    price: 300,
    imageUrl: "/uploads/tote.jpg",
  },
];

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected...");

    await Product.deleteMany(); // clear old products
    console.log("Old products cleared");

    await Product.insertMany(products);
    console.log("Sample products added");

    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedDB();
