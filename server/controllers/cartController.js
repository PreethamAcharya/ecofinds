const db = require("../db").getDb();
const { v4: uuidv4 } = require("uuid");
const { addPurchase } = require("./purchaseController"); // import addPurchase helper

// Checkout all items in the cart
const checkoutCart = (req, res) => {
  const userId = req.user.id;

  // Get all cart items for user
  const query = `SELECT * FROM cart_items WHERE user_id = ?`;
  db.all(query, [userId], (err, rows) => {
    if (err) {
      console.error("Error fetching cart items:", err);
      return res.status(500).json({ message: "Error fetching cart items" });
    }

    if (rows.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Add each cart item to purchases
    rows.forEach((item) => {
      addPurchase(userId, {
        id: item.product_id,
        title: item.title,
        price: item.price,
      });
    });

    // Clear the cart
    const deleteQuery = `DELETE FROM cart_items WHERE user_id = ?`;
    db.run(deleteQuery, [userId], (err) => {
      if (err) {
        console.error("Error clearing cart:", err);
        return res.status(500).json({ message: "Error clearing cart" });
      }

      res.json({ message: "Checkout successful!" });
    });
  });
};

module.exports = { checkoutCart };
