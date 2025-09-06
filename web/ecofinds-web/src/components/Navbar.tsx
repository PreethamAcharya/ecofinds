import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/auth"; // redirect to login page
  };

  return (
    <nav className="bg-green-700 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        EcoFinds
      </Link>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>

        {token && (
          <>
            <Link to="/add-product" className="hover:underline">
              Add Product
            </Link>
            <Link to="/cart" className="hover:underline">
              Cart
            </Link>
            <Link to="/purchases" className="hover:underline">
              Purchases
            </Link>
          </>
        )}

        {!token ? (
          <Link to="/auth" className="hover:underline">
            Login / Signup
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
