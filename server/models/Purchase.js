// server/models/Purchase.js
const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  purchasedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Purchase", purchaseSchema);
