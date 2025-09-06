import React from "react";
import { Link } from "react-router-dom";

interface Product {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string;
}

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
      <img
        src={`http://localhost:5000${product.imageUrl}`}
        alt={product.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold">{product.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">
          {product.description}
        </p>
        <p className="text-green-700 font-semibold mt-2">
          ₹{product.price}
        </p>
        <Link
          to={`/product/${product._id}`}
          className="mt-3 inline-block bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
