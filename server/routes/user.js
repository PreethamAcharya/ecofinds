// server/routes/user.js
const express = require('express');
const router = express.Router();
const { authMiddleware, getUserById } = require('../utils/auth');
const { profileUpdateSchema } = require('../validation');
const { getDb } = require('../db');
const { v4: uuid } = require('uuid');


router.get('/me', authMiddleware, (req, res) => {
const user = getUserById(req.user.id);
res.json({ user });
});


router.put('/me', authMiddleware, (req, res) => {
try {
const data = profileUpdateSchema.parse(req.body);
const db = getDb();
db.prepare('UPDATE users SET username = ?, address = ? WHERE id = ?')
.run(data.username, data.address || '', req.user.id);
const user = getUserById(req.user.id);
res.json({ user });
} catch (e) {
res.status(400).json({ error: e.errors?.[0]?.message || 'Invalid input' });
}
});


router.get('/purchases', authMiddleware, (req, res) => {
const db = getDb();
const rows = db.prepare('SELECT * FROM purchases WHERE user_id = ? ORDER BY purchased_at DESC').all(req.user.id);
res.json({ purchases: rows });
});


router.post('/checkout', authMiddleware, (req, res) => {
const db = getDb();
const items = db.prepare('SELECT * FROM cart_items WHERE user_id = ?').all(req.user.id);
const insert = db.prepare('INSERT INTO purchases (id, user_id, product_id, title, price) VALUES (?, ?, ?, ?, ?)');
const del = db.prepare('DELETE FROM cart_items WHERE user_id = ?');
const tx = db.transaction(() => {
for (const it of items) insert.run(uuid(), req.user.id, it.product_id, it.title, it.price);
del.run(req.user.id);
});
tx();
res.json({ ok: true });
});


module.exports = router;