# EcoFinds - Sustainable Second-Hand Marketplace

EcoFinds is a web and mobile-friendly platform designed to encourage sustainable consumption by making it easy to **buy and sell pre-owned goods**.  
This project was built during a **ODOO X NMIT hackathon** with the goal of promoting a **circular economy** and reducing waste.

---

## 🌱 **Project Vision**
EcoFinds aims to:
- Extend the lifecycle of products by connecting buyers and sellers.
- Provide a clean, user-friendly platform for sustainable shopping.
- Build trust and foster a community around conscious consumption.
- Reduce environmental impact by lowering waste and carbon emissions through reuse.

---

## 🚀 **Features**
### **MVP Implemented**
- **User Authentication**
  - Register and log in with email & password.
  - JWT-based secure authentication.

- **Product Management**
  - Add new products with title, description, price, category, and image upload.
  - View all products in a clean, responsive feed.
  - Edit and delete owned product listings.

- **Product Browsing**
  - Filter by category.
  - Search products by keyword.
  - Product detail view page.

- **Cart & Purchases**
  - Add to cart and view previous purchases.
  - Checkout functionality to move cart items to purchases.

---

## 🛠 **Tech Stack**

### **Frontend**
- **React + TypeScript**  
- **Vite** for fast development
- **Axios** for API calls
- **React Router** for navigation
- **Tailwind CSS** for styling

### **Backend**
- **Node.js + Express**
- **MongoDB** for database
- **Mongoose** for object modeling
- **Multer** for file uploads
- **JWT** for authentication

---

## 📂 **Folder Structure**
```
ecofinds/
│
├── server/               # Backend
│   ├── models/           # Mongoose models (User, Product, CartItem, Purchase)
│   ├── routes/           # Express routes (auth.js, products.js, cart.js, purchases.js)
│   ├── controllers/      # Logic for routes
│   ├── middleware/       # Authentication middleware
│   ├── uploads/          # Product images
│   └── index.js          # Express server entry point
│
└── web/                  # Frontend
    └── ecofinds-web/
        ├── src/
        │   ├── pages/    # React pages (Home, AddProduct, AuthPage, ProductDetail, Cart)
        │   ├── components/ # Navbar, Footer, etc.
        │   ├── utils/    # API helper (api.ts)
        │   └── App.tsx
        └── public/
```

---

## ⚙️ **Setup Instructions**

### **1. Clone the Repository**
```bash
git clone https://github.com/PreethamAcharya/ecofinds.git
cd ecofinds
```

---

### **2. Backend Setup**
```bash
cd server
npm install
```

**Start the backend server:**
```bash
node index.js
```
> Backend will run at **http://localhost:5000**

Make sure MongoDB is running locally or update `index.js` with your MongoDB Atlas URI.

---

### **3. Frontend Setup**
```bash
cd ../web/ecofinds-web
npm install
```

**Start the frontend development server:**
```bash
npm run dev
```
> Frontend will run at **http://localhost:5173**

---

## 🔗 **API Endpoints**

| Method | Endpoint              | Description            |
|--------|----------------------|------------------------|
| POST   | `/auth/register`      | Register a new user    |
| POST   | `/auth/login`         | Login user & get token |
| GET    | `/products`           | Get all products       |
| POST   | `/products`           | Create new product     |
| PUT    | `/products/:id`       | Update product         |
| DELETE | `/products/:id`       | Delete product         |
| GET    | `/cart`               | Get current user's cart|
| POST   | `/cart`               | Add product to cart    |
| DELETE | `/cart/:id`           | Remove item from cart  |
| POST   | `/cart/checkout`      | Checkout cart items    |
| GET    | `/cart/purchases`     | Get previous purchases |

---

## 🌟 **Future Enhancements**
- Payment integration.
- User reviews and ratings.
- AI-powered product recommendations.
- Offline-first capabilities for better accessibility.

---

## 🤝 **Team**
- **Preetham R**
- Hackathon team members:
  - Amith R
  - D Akshitha
  - CH Prajwal

---

## 📜 License
This project is open-source and available under the MIT License.

