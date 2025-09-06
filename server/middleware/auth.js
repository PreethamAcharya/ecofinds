// server/middleware/auth.js
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'your_jwt_secret_key'; // 🔹 Use .env in production

/**
 * Authentication Middleware
 * - Verifies JWT token from request headers
 * - Attaches user info to req.user
 */
function auth(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), SECRET_KEY);
        req.user = decoded; // attach decoded user data
        next();
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token.' });
    }
}

module.exports = auth;
