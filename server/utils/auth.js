// server/utils/auth.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuid } = require('uuid');
const { getDb } = require('../db');


const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';


function signToken(user) {
return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
}


function authMiddleware(req, res, next) {
const auth = req.headers.authorization || '';
const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
if (!token) return res.status(401).json({ error: 'Missing token' });
try {
const payload = jwt.verify(token, JWT_SECRET);
req.user = payload;
next();
} catch (e) {
return res.status(401).json({ error: 'Invalid token' });
}
}


async function hashPassword(plain) {
const salt = await bcrypt.genSalt(10);
return bcrypt.hash(plain, salt);
}


async function comparePassword(plain, hash) {
return bcrypt.compare(plain, hash);
}


function getUserByEmail(email) {
const db = getDb();
return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
}


function getUserById(id) {
const db = getDb();
return db.prepare('SELECT id, username, email, address, created_at FROM users WHERE id = ?').get(id);
}


function createUser({ username, email, password_hash }) {
const db = getDb();
const id = uuid();
db.prepare('INSERT INTO users (id, username, email, password_hash) VALUES (?, ?, ?, ?)').run(id, username, email, password_hash);
return getUserById(id);
}


module.exports = { authMiddleware, signToken, hashPassword, comparePassword, getUserByEmail, getUserById, createUser };