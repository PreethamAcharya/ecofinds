import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import AuthPage from "./pages/AuthPage";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Checkout from "./pages/Checkout";
import PreviousPurchases from "./pages/PreviousPurchases";
import Purchases from "./pages/Purchases";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/purchases" element={<PreviousPurchases />} />
        <Route path="/purchases" element={<Purchases />} />
      </Routes>
    </Router>
  );
};

export default App;
