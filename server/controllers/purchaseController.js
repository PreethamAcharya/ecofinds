const db = require("../db").getDb();
const { v4: uuidv4 } = require("uuid");

// Get all purchases for the logged-in user
const getPurchases = (req, res) => {
  const userId = req.user.id;

  const query = `
    SELECT * FROM purchases
    WHERE user_id = ?
    ORDER BY purchased_at DESC
  `;

  db.all(query, [userId], (err, rows) => {
    if (err) {
      console.error("Error fetching purchases:", err);
      return res.status(500).json({ message: "Error fetching purchases" });
    }

    const purchases = rows.map((row) => ({
      _id: row.id,
      productId: row.product_id,
      title: row.title,
      price: row.price,
      purchasedAt: row.purchased_at,
    }));

    res.json(purchases);
  });
};

// Add a purchase (used after checkout)
const addPurchase = (userId, product) => {
  const id = uuidv4();
  const query = `
    INSERT INTO purchases (id, user_id, product_id, title, price)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.run(query, [id, userId, product.id, product.title, product.price], (err) => {
    if (err) console.error("Error adding purchase:", err);
  });
};

module.exports = { getPurchases, addPurchase };
