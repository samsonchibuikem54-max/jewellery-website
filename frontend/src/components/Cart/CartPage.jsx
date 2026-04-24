import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

// simple demo suggestions
const suggestions = [
  {
    img: "/images/rings/2.jpg",
    name: "Classic Watch",
    price: 79999,
    category: "watches",
    index: 1,
  },
  {
    img: "/images/watchs/9.jpg",
    name: "Pearl Necklace",
    price: 89499,
    category: "necklaces",
    index: 1,
  },
  {
    img: "/images/Earrings/1.jpg",
    name: "Diamond Ring",
    price: 14999,
    category: "rings",
    index: 0,
  },
  {
    img: "/images/necks/9.jpg",
    name: "Diamond Ring",
    price: 14999,
    category: "rings",
    index: 0,
  },
  {
    img: "/images/Bracelets/10.jpg",
    name: "Diamond Ring",
    price: 14999,
    category: "rings",
    index: 0,
  },
  {
    img: "/images/watchs/1.jpg",
    name: "Diamond Ring",
    price: 14999,
    category: "rings",
    index: 0,
  },
];

const CartPage = () => {
  const { cartItems, totalPrice, increaseQty, decreaseQty, removeFromCart } =
    useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if not logged in
  if (!user) {
    alert("Please login or register to access your cart");
    navigate("/login");
    return null;
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-24">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/products" className="text-yellow-400 underline">
          Continue shopping
        </Link>
      </div>
    );
  }

  const handleSuggestionClick = (item) => {
    if (!user) {
      alert("Please login to view products");
      navigate("/login");
    } else {
      navigate(`/product/${item.category}/${item.index}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-8">Order Summary</h1>

      {/* CART ITEMS */}
      <div className="space-y-6">
        {cartItems.map((item, index) => (
          <div key={index} className="flex gap-6 items-center border-b pb-6">
            {/* IMAGE */}
            <img
              src={item.img}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-lg"
            />

            {/* INFO */}
            <div className="flex-1">
              <h2 className="font-semibold text-lg">{item.name}</h2>

              <p className="text-yellow-500 font-semibold">
                ₦{(item.price * item.quantity).toLocaleString()}
              </p>

              {/* QUANTITY */}
              <div className="flex items-center gap-4 mt-3">
                <button
                  onClick={() => decreaseQty(index)}
                  className="w-8 h-8 border rounded"
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => increaseQty(index)}
                  className="w-8 h-8 border rounded"
                >
                  +
                </button>

                <button
                  onClick={() => removeFromCart(index)}
                  className="text-red-500 text-sm ml-4"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div className="text-right mt-10">
        <h2 className="text-2xl font-bold">
          Total: ₦{totalPrice.toLocaleString()}
        </h2>

        <button
          onClick={() => navigate("/payment")}
          className="inline-block mt-6 bg-yellow-400 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-500"
        >
          Proceed to Payment
        </button>
      </div>

      {/* YOU MAY ALSO LIKE */}
      <div className="mt-20">
        <h3 className="text-2xl font-bold mb-6">You may also like</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {suggestions.map((item, i) => (
            <div
              key={i}
              onClick={() => handleSuggestionClick(item)}
              className="cursor-pointer border rounded-xl overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={item.img}
                alt={item.name}
                className="h-48 w-full object-cover"
              />

              <div className="p-4">
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-yellow-500">
                  ₦{item.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
