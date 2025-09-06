import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (id: string) => {
    if (!token) {
      alert("Please login to add items to cart");
      return;
    }
    try {
      await api.post(
        "/cart",
        { productId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Added to cart!");
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart");
    }
  };

  if (loading) return <p className="p-6">Loading products...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Available Eco-Friendly Products</h1>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg p-4 hover:shadow-lg transition flex flex-col"
            >
              {product.imageUrl && (
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="h-40 w-full object-cover mb-3 rounded"
                  />
                </Link>
              )}
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="text-gray-600">{product.category}</p>
              <p className="text-green-700 font-bold mt-2">₹{product.price}</p>
              {token && (
                <button
                  onClick={() => handleAddToCart(product._id)}
                  className="mt-auto bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
                >
                  Add to Cart
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
