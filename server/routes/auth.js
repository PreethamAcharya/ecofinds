// server/routes/auth.js
const express = require('express');
const router = express.Router();
const { registerSchema, loginSchema } = require('../validation');
const { signToken, hashPassword, comparePassword, getUserByEmail, createUser } = require('../utils/auth');


router.post('/register', async (req, res) => {
try {
const data = registerSchema.parse(req.body);
const existing = getUserByEmail(data.email);
if (existing) return res.status(400).json({ error: 'Email already in use' });
const password_hash = await hashPassword(data.password);
const user = createUser({ username: data.username, email: data.email, password_hash });
const token = signToken(user);
res.json({ token, user });
} catch (e) {
res.status(400).json({ error: e.errors?.[0]?.message || 'Invalid input' });
}
});


router.post('/login', async (req, res) => {
try {
const data = loginSchema.parse(req.body);
const u = getUserByEmail(data.email);
if (!u) return res.status(401).json({ error: 'Invalid credentials' });
const ok = await comparePassword(data.password, u.password_hash);
if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
const user = { id: u.id, username: u.username, email: u.email, address: u.address, created_at: u.created_at };
const token = signToken(user);
res.json({ token, user });
} catch (e) {
res.status(400).json({ error: e.errors?.[0]?.message || 'Invalid input' });
}
});


module.exports = router;