import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";

interface Product {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  imageUrl?: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    setAdding(true);
    try {
      await api.post("/cart", { productId: product._id });
      alert("Product added to cart!");
    } catch (err: any) {
      console.error("Error adding to cart", err);
      alert(err.response?.data?.message || "Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <p className="p-6">Loading product...</p>;
  if (!product) return <p className="p-6">Product not found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}
      <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
      <p className="text-gray-600 mb-2">{product.category}</p>
      <p className="text-green-700 font-bold mb-4">₹{product.price}</p>
      <p className="mb-6">{product.description}</p>
      <button
        onClick={handleAddToCart}
        disabled={adding}
        className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
      >
        {adding ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductDetail;
