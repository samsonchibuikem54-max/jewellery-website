// src/components/Orders/ReceiptPage.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getOrders } from "../../api/api";

const ReceiptPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("userToken") || "demo-token";
        const res = await getOrders(token);

        let foundOrder = null;

        if (res?.success && Array.isArray(res.orders)) {
          // Map _id to id for consistency
          const mappedOrders = res.orders.map((o) => ({
            ...o,
            id: o._id || o.id,
          }));
          foundOrder = mappedOrders.find((o) => o.id === orderId);
        }

        if (!foundOrder) {
          // fallback to localStorage demo orders
          const localOrders = JSON.parse(localStorage.getItem("orders")) || [];
          foundOrder = localOrders.find((o) => o.id === orderId);
        }

        setOrder(foundOrder || null);
      } catch (error) {
        console.error("Fetch order error:", error);
        const localOrders = JSON.parse(localStorage.getItem("orders")) || [];
        const foundOrder = localOrders.find((o) => o.id === orderId);
        setOrder(foundOrder || null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg font-medium">Loading receipt...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold mb-4">Order not found</h2>
        <Link
          to="/orders"
          className="text-yellow-400 underline hover:text-yellow-500"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Order Receipt</h1>

        <div className="mb-4">
          <p>
            <strong>Order ID:</strong> {order.id}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(order.createdAt || order.date).toLocaleString()}
          </p>
          <p>
            <strong>Payment Method:</strong>{" "}
            {order.paymentMethod?.toUpperCase() || "N/A"}
          </p>
          <p>
            <strong>Status:</strong> {order.status || "Paid"}
          </p>
        </div>

        <div className="divide-y">
          {(order.items || []).map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 py-4">
              {item.img && (
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              <div className="flex-1">
                <p className="font-medium">{item.name || "Unnamed Product"}</p>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity || 1}
                </p>
              </div>
              <p className="font-semibold">
                ₦{((item.price || 0) * (item.quantity || 1)).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between items-center">
          <p className="font-bold text-lg">
            Total: ₦{(order.total || 0).toLocaleString()}
          </p>
          <Link
            to="/orders"
            className="text-yellow-400 hover:underline text-sm font-medium"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPage;
