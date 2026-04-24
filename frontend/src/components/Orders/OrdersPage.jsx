// src/components/Orders/OrdersPage.jsx
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getOrders } from "../../api/api"; // API function to fetch orders

const OrdersPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      alert("Please login to view your orders");
      navigate("/login");
      return;
    }

    const loadOrders = async () => {
      try {
        const token = localStorage.getItem("userToken") || "demo-token";
        const res = await getOrders(token);

        if (res?.success && Array.isArray(res.orders)) {
          // Map MongoDB _id to id for consistency
          const mappedOrders = res.orders.map((order) => ({
            ...order,
            id: order._id || order.id,
          }));
          setOrders(mappedOrders);
        } else {
          // fallback to localStorage demo mode
          const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
          setOrders(savedOrders);
          if (!res?.success)
            alert(res?.message || "Failed to fetch orders, showing demo data");
        }
      } catch (error) {
        console.error("Fetch orders error:", error);
        // fallback to localStorage demo mode
        const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
        setOrders(savedOrders);
        alert("Error fetching orders from server, showing demo data");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg font-medium">Loading orders...</p>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-20">
        <h2 className="text-2xl font-bold mb-4">No orders yet</h2>
        <Link
          to="/products"
          className="text-yellow-400 underline hover:text-yellow-500"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
              {/* ORDER HEADER */}
              <div className="flex justify-between flex-wrap gap-4 mb-4">
                <div>
                  <p className="font-semibold">
                    Order ID: <span className="text-gray-600">{order.id}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Date:{" "}
                    {new Date(order.createdAt || order.date).toLocaleString()}
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold text-sm">
                  {order.status || "Paid"}
                </span>
              </div>

              {/* ITEMS */}
              <div className="divide-y">
                {(order.items || []).map((item, index) => (
                  <div key={index} className="flex items-center gap-4 py-4">
                    {item.img && (
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}

                    <div className="flex-1">
                      <p className="font-medium">
                        {item.name || "Unnamed Product"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity || 1}
                      </p>
                    </div>

                    <p className="font-semibold">
                      ₦
                      {(
                        (item.price || 0) * (item.quantity || 1)
                      ).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              {/* ORDER FOOTER */}
              <div className="flex justify-between items-center mt-6">
                <p className="font-bold text-lg">
                  Total: ₦{(order.total || 0).toLocaleString()}
                </p>

                <Link
                  to={`/orders/${order.id}`}
                  className="text-yellow-400 hover:underline text-sm font-medium"
                >
                  View Receipt
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
