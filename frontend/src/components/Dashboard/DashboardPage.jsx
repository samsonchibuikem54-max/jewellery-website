import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-4">
          Welcome{user?.name ? `, ${user.name}` : ""}
        </h1>

        <p className="text-gray-600 mb-8">Manage your account and orders</p>

        <div className="grid sm:grid-cols-2 gap-6">
          <Link
            to="/orders"
            className="border rounded-lg p-6 hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-2">My Orders</h2>
            <p className="text-gray-500">View your order history</p>
          </Link>

          <Link
            to="/products"
            className="border rounded-lg p-6 hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-2">Shop</h2>
            <p className="text-gray-500">Continue shopping</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
