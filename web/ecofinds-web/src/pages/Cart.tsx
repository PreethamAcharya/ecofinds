import { useEffect, useState } from "react";
import api from "../utils/api";

interface CartItem {
  _id: string;
  title: string;
  price: number;
  productId: string;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart items
  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");
      setCartItems(res.data);
    } catch (err) {
      console.error("Error fetching cart", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Remove a single cart item
  const handleRemove = async (id: string) => {
    try {
      await api.delete(`/cart/${id}`);
      setCartItems(cartItems.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error removing item from cart", err);
      alert("Failed to remove item from cart");
    }
  };

  // Checkout all items
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      await api.post("/cart/checkout");
      alert("Checkout successful!");
      setCartItems([]); // clear cart locally
    } catch (err) {
      console.error("Error during checkout", err);
      alert("Checkout failed!");
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  if (loading) return <p className="p-6">Loading cart...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-green-700 font-bold">₹{item.price}</p>
              </div>
              <button
                onClick={() => handleRemove(item._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total and Checkout */}
          <div className="flex justify-between items-center mt-4 font-bold text-lg">
            <span>Total: ₹{totalPrice}</span>
            <button
              onClick={handleCheckout}
              className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
