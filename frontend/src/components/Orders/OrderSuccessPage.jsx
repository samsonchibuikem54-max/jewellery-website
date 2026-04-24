// src/components/Orders/OrderSuccessPage.jsx
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useEffect } from "react";

const OrderSuccessPage = () => {
  const { clearCart } = useCart();
  const navigate = useNavigate();

  // Clear the cart when this page loads
  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 py-20 px-6">
      <h1 className="text-4xl font-bold text-green-600 mb-6">
        Payment Successful!
      </h1>
      <p className="text-lg mb-8 text-center">
        Thank you for your purchase. Your order has been placed successfully.
      </p>

      <div className="flex gap-4">
        <Link
          to="/products"
          className="bg-yellow-400 text-black px-6 py-3 rounded hover:bg-yellow-500 transition"
        >
          Continue Shopping
        </Link>

        <Link
          to="/orders"
          className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
        >
          View My Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
