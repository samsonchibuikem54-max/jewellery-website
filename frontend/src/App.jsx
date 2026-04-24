// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// User Pages
import Home from "./components/Home/Home";
import ProductsPage from "./components/Products/ProductsPage";
import ProductDetails from "./components/Products/ProductDetails";
import CartPage from "./components/Cart/CartPage";
import PaymentPage from "./components/Payment/PaymentPage";
import ContactPage from "./components/Contact/ContactPage";
import LoginPage from "./components/Auth/LoginPage";
import RegisterPage from "./components/Auth/RegisterPage";
import OrdersPage from "./components/Orders/OrdersPage";
import OrderSuccessPage from "./components/Orders/OrderSuccessPage";
import ReceiptPage from "./components/Orders/ReceiptPage";
import DashboardPage from "./components/Dashboard/DashboardPage";

// Admin Page (NESTED ROUTES)
import AdminPage from "./pages/AdminPage";
import AdminRegister from "./components/Admin/AdminRegister";
import AdminLogin from "./components/Admin/AdminLogin";

function App() {
  return (
    <>
      <Navbar />

      <div className="pt-24">
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route
            path="/product/:category/:index"
            element={<ProductDetails />}
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/contacts" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/orders/:orderId" element={<ReceiptPage />} />

          {/* Admin Routes */}
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* 404 */}
          <Route
            path="*"
            element={
              <div className="text-center py-20">
                <h2 className="text-2xl font-bold">Page Not Found</h2>
              </div>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
