import { useEffect, useState } from "react";
import api from "../utils/api";

interface PurchaseItem {
  _id: string;
  title: string;
  price: number;
}

const Checkout: React.FC = () => {
  const [cartItems, setCartItems] = useState<PurchaseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await api.get("/cart", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setCartItems(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const handleCheckout = async () => {
    try {
      await api.post(
        "/cart/checkout",
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setCartItems([]);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      alert("Checkout failed");
    }
  };

  if (loading) return <p className="p-6">Loading cart...</p>;

  if (success) return <p className="p-6 text-green-700 font-bold">Checkout successful!</p>;

  if (cartItems.length === 0) return <p className="p-6">Your cart is empty.</p>;

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <ul className="space-y-4">
        {cartItems.map((item) => (
          <li key={item._id} className="flex justify-between items-center border p-4 rounded">
            <span>{item.title}</span>
            <span className="text-green-700 font-bold">₹{item.price}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 text-right font-bold text-xl">
        Total: ₹{total}
      </div>
      <button
        onClick={handleCheckout}
        className="mt-4 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
      >
        Confirm Purchase
      </button>
    </div>
  );
};

export default Checkout;
