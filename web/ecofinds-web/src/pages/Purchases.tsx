import { useEffect, useState } from "react";
import api from "../utils/api";

interface Purchase {
  _id: string;
  title: string;
  price: number;
  purchasedAt: string; // ISO string
}

const Purchases: React.FC = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPurchases = async () => {
    try {
      const res = await api.get("/purchases");
      setPurchases(res.data);
    } catch (err) {
      console.error("Error fetching purchases", err);
      alert("Failed to load purchases");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  if (loading) return <p className="p-6">Loading purchases...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Purchases</h1>

      {purchases.length === 0 ? (
        <p>You have not purchased any products yet.</p>
      ) : (
        <div className="space-y-4">
          {purchases.map((item) => (
            <div
              key={item._id}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-green-700 font-bold">₹{item.price}</p>
                <p className="text-gray-500 text-sm">
                  Purchased on: {new Date(item.purchasedAt).toLocaleDateString()}{" "}
                  {new Date(item.purchasedAt).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Purchases;
