// src/components/Payment/PaymentPage.jsx
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { placeOrder } from "../../api/api";

const PaymentPage = () => {
  const { cartItems, totalPrice = 0, clearCart } = useCart();
  const navigate = useNavigate();

  const [selectedMethod, setSelectedMethod] = useState("bank");
  const [bankRef, setBankRef] = useState("");
  const [loading, setLoading] = useState(false);

  const bankDetails = {
    name: "OSJ Jewelry",
    bank: "Zenith Bank",
    accountNumber: "1234567890",
  };

  const paypalDetails = {
    email: "samsonchibuikem3@gmail.com",
    // OPTION B: dynamic amount PayPal link
    link: `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=samsonchibuikem3@gmail.com&currency_code=NGN&amount=${totalPrice}`,
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard");
  };

  const handlePlaceOrder = async () => {
    if (!cartItems.length) {
      alert("Your cart is empty");
      return;
    }

    if (selectedMethod === "bank" && !bankRef.trim()) {
      alert("Please enter bank payment reference");
      return;
    }

    setLoading(true);

    const orderData = {
      items: cartItems,
      total: totalPrice,
      paymentMethod: selectedMethod,
      paymentInfo:
        selectedMethod === "bank"
          ? { reference: bankRef }
          : { paypalEmail: paypalDetails.email },
      status: "Pending Verification",
    };

    try {
      const token = localStorage.getItem("userToken") || "demo-token";
      const res = await placeOrder(orderData, token);

      if (!res?.success) {
        throw new Error("Server failed");
      }

      clearCart();
      navigate("/order-success");
    } catch (error) {
      console.error("Order error:", error);

      // fallback local save
      const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
      const newOrder = {
        id: `OSJ-${Date.now()}`,
        date: new Date().toLocaleString(),
        ...orderData,
      };
      localStorage.setItem(
        "orders",
        JSON.stringify([...existingOrders, newOrder])
      );

      clearCart();
      navigate("/order-success");
    } finally {
      setLoading(false);
    }
  };

  const handlePayPalRedirect = async () => {
    await handlePlaceOrder();
    window.open(paypalDetails.link, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Complete Your Payment
        </h1>

        <div className="border rounded-lg p-6 space-y-6">
          <p className="text-lg">
            <strong>Total Amount:</strong>{" "}
            <span className="text-yellow-500 font-semibold">
              ₦{totalPrice.toLocaleString()}
            </span>
          </p>

          <p className="text-sm text-gray-500">
            After payment, your order will be verified by admin.
          </p>

          {/* Payment Method Selector */}
          <div>
            <h2 className="text-lg font-semibold mb-3">
              Select Payment Method
            </h2>

            <div className="flex gap-3 mb-4">
              {["bank", "paypal"].map((method) => (
                <button
                  key={method}
                  onClick={() => setSelectedMethod(method)}
                  className={`flex-1 px-4 py-3 rounded-lg border font-semibold ${
                    selectedMethod === method
                      ? "bg-yellow-400 border-yellow-400"
                      : "border-gray-300"
                  }`}
                >
                  {method === "bank" && "🏦 Bank Transfer"}
                  {method === "paypal" && "💸 PayPal"}
                </button>
              ))}
            </div>

            {/* Bank Transfer */}
            {selectedMethod === "bank" && (
              <div className="bg-gray-100 p-4 rounded-lg space-y-3">
                <p>
                  <strong>Bank:</strong> {bankDetails.bank}
                </p>
                <p>
                  <strong>Name:</strong> {bankDetails.name}
                </p>
                <div className="flex items-center gap-2">
                  <p>
                    <strong>Account:</strong> {bankDetails.accountNumber}
                  </p>
                  <button
                    onClick={() => copyToClipboard(bankDetails.accountNumber)}
                    className="text-xs bg-yellow-400 px-2 py-1 rounded"
                  >
                    Copy
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="Payment reference / sender name"
                  value={bankRef}
                  onChange={(e) => setBankRef(e.target.value)}
                  className="w-full border px-3 py-2 rounded-lg"
                />

                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className={`w-full py-3 rounded-lg font-semibold ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-yellow-400 hover:bg-yellow-500"
                  }`}
                >
                  {loading ? "Saving Order..." : "I Have Paid"}
                </button>
              </div>
            )}

            {/* PayPal */}
            {selectedMethod === "paypal" && (
              <div className="bg-gray-100 p-4 rounded-lg space-y-3">
                <p>
                  <strong>PayPal Email:</strong> {paypalDetails.email}
                </p>
                <p className="text-sm text-gray-600">
                  You will be redirected to PayPal to complete payment.
                </p>

                <button
                  onClick={handlePayPalRedirect}
                  disabled={loading}
                  className={`w-full py-3 rounded-lg font-semibold ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-yellow-400 hover:bg-yellow-500"
                  }`}
                >
                  {loading ? "Redirecting..." : "Pay with PayPal"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
