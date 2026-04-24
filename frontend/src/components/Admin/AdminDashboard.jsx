// src/components/Admin/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { fetchAllOrders, updateOrderStatus } from "../../api/api";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [verifyingId, setVerifyingId] = useState(null);

  const token = localStorage.getItem("adminToken");

  // AUTH GUARD
  useEffect(() => {
    if (!token) {
      alert("Admin access only. Please login.");
      navigate("/admin/login");
    }
  }, [token, navigate]);

  // FETCH ORDERS
  useEffect(() => {
    if (!token) return;

    const loadOrders = async () => {
      setLoading(true);
      try {
        const res = await fetchAllOrders(token);
        if (res?.success && Array.isArray(res.orders)) {
          const normalizedOrders = res.orders.map((order) => ({
            ...order,
            id: order._id || order.id,
          }));
          setOrders(normalizedOrders);
        } else {
          setOrders([]);
          alert(res?.message || "Failed to load orders");
        }
      } catch (error) {
        console.error("Fetch orders error:", error);
        alert("Server error while fetching orders");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [token]);

  // VERIFY PAYMENT
  const handleVerify = async (orderId) => {
    if (!window.confirm("Confirm payment verification?")) return;
    setVerifyingId(orderId);

    try {
      const res = await updateOrderStatus(orderId, "Verified", token);
      if (res?.success) {
        setOrders((prev) =>
          prev.map((order) =>
            order.id === orderId ? { ...order, status: "Verified" } : order
          )
        );
        alert("Payment verified successfully");
      } else {
        alert(res?.message || "Failed to verify payment");
      }
    } catch (error) {
      console.error("Verify error:", error);
      alert("Server error while verifying payment");
    } finally {
      setVerifyingId(null);
    }
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg font-medium">Loading orders…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full sm:w-auto"
          >
            Logout
          </button>
        </div>

        {/* Orders */}
        {orders.length === 0 ? (
          <p className="text-gray-600 text-center">No orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
              >
                <div className="flex-1 space-y-1">
                  <p>
                    <strong>Order ID:</strong>{" "}
                    <span className="text-gray-600 break-words">
                      {order.id}
                    </span>
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`font-semibold ${
                        order.status === "Verified"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {order.status || "Paid (Pending Verification)"}
                    </span>
                  </p>

                  <p className="text-sm text-gray-500">
                    Total: ₦{(order.total || 0).toLocaleString()}
                  </p>

                  <p className="text-sm text-gray-500">
                    Payment Method: {order.paymentMethod?.toUpperCase()}
                  </p>

                  {/* Bank Reference / PayPal Email */}
                  {order.paymentMethod === "bank" &&
                    order.paymentInfo?.reference && (
                      <p className="mt-2 inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-medium text-sm break-words">
                        Sender/Reference: {order.paymentInfo.reference}
                      </p>
                    )}
                  {order.paymentMethod === "paypal" &&
                    order.paymentInfo?.email && (
                      <p className="mt-2 inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded font-medium text-sm break-words">
                        PayPal Email: {order.paymentInfo.email}
                      </p>
                    )}
                </div>

                {order.status !== "Verified" && (
                  <button
                    onClick={() => handleVerify(order.id)}
                    disabled={verifyingId === order.id}
                    className={`px-4 py-2 rounded font-semibold transition w-full sm:w-auto ${
                      verifyingId === order.id
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-yellow-400 hover:bg-yellow-500"
                    }`}
                  >
                    {verifyingId === order.id
                      ? "Verifying..."
                      : "Verify Payment"}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
