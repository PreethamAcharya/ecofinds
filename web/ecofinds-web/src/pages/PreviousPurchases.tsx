import { useEffect, useState } from "react";
import api from "../utils/api";

interface Purchase {
  _id: string;
  title: string;
  price: number;
  purchasedAt: string;
}

const PreviousPurchases: React.FC = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const res = await api.get("/purchases", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setPurchases(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPurchases();
  }, []);

  if (loading) return <p className="p-6">Loading purchases...</p>;

  if (purchases.length === 0) return <p className="p-6">You have not purchased anything yet.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Previous Purchases</h1>
      <ul className="space-y-4">
        {purchases.map((purchase) => (
          <li
            key={purchase._id}
            className="flex justify-between items-center border p-4 rounded"
          >
            <div>
              <h2 className="font-semibold">{purchase.title}</h2>
              <p className="text-gray-500 text-sm">
                Purchased on: {new Date(purchase.purchasedAt).toLocaleString()}
              </p>
            </div>
            <span className="text-green-700 font-bold">₹{purchase.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PreviousPurchases;
