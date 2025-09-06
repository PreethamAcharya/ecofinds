const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');


const app = express();
const PORT = 5000;


app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));