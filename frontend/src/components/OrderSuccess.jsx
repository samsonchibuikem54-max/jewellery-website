import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
      <p className="mb-6">Thank you for your purchase. 🎉</p>
      <Link
        to="/products"
        className="bg-yellow-400 text-black px-6 py-3 rounded font-semibold hover:bg-yellow-500"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSuccess;
