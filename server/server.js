// server/server.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();


const { ensureDb } = require('./db');


const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


// serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api', require('./routes/user')); // /me, /purchases, /checkout


ensureDb();


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));