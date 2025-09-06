const db = require('../db');


exports.getAllProducts = (req, res) => {
db.all('SELECT * FROM products', [], (err, rows) => {
if (err) return res.status(500).json({ error: err.message });
res.json(rows);
});
};


exports.getProductById = (req, res) => {
const { id } = req.params;
db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
if (err) return res.status(500).json({ error: err.message });
res.json(row);
});
};


exports.createProduct = (req, res) => {
const { title, description, category, price } = req.body;
const image = req.file ? req.file.filename : null;
const userId = req.user.id;


db.run(
'INSERT INTO products (title, description, category, price, image, user_id) VALUES (?, ?, ?, ?, ?, ?)',
[title, description, category, price, image, userId],
function (err) {
if (err) return res.status(500).json({ error: err.message });
res.status(201).json({ id: this.lastID });
}
);
};


exports.updateProduct = (req, res) => {
const { id } = req.params;
const { title, description, category, price } = req.body;
const image = req.file ? req.file.filename : null;


db.run(
'UPDATE products SET title = ?, description = ?, category = ?, price = ?, image = ? WHERE id = ?',
[title, description, category, price, image, id],
function (err) {
if (err) return res.status(500).json({ error: err.message });
res.json({ message: 'Product updated successfully' });
}
);
};


exports.deleteProduct = (req, res) => {
const { id } = req.params;
db.run('DELETE FROM products WHERE id = ?', [id], function (err) {
if (err) return res.status(500).json({ error: err.message });
res.json({ message: 'Product deleted successfully' });
});
};


exports.searchProducts = (req, res) => {
const { keyword } = req.params;
db.all('SELECT * FROM products WHERE title LIKE ?', [`%${keyword}%`], (err, rows) => {
if (err) return res.status(500).json({ error: err.message });
res.json(rows);
});
};


exports.getProductsByCategory = (req, res) => {
const { category } = req.params;
db.all('SELECT * FROM products WHERE category = ?', [category], (err, rows) => {
if (err) return res.status(500).json({ error: err.message });
res.json(rows);
});
};