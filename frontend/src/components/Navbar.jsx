// src/components/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const links = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/cart", label: "Cart" },
    { path: "/payment", label: "Payment" },
    { path: "/contacts", label: "Contacts" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 md:px-10 py-4 md:py-6">
        {/* Logo */}
        <Link to="/" className="flex flex-col leading-tight">
          <h1 className="text-xl sm:text-2xl md:text-2xl font-bold tracking-wide">
            OSJ
          </h1>
          <span className="text-xs sm:text-sm tracking-[0.3em] text-yellow-400">
            JEWELRY
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex gap-6 text-sm uppercase tracking-wider relative">
          {links.map((link, idx) => (
            <li key={idx} className="relative">
              <Link to={link.path} className="hover:text-yellow-400">
                {link.label}
              </Link>

              {/* Cart Badge */}
              {link.path === "/cart" && cartItems.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-yellow-400 text-black text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </li>
          ))}
        </ul>

        {/* User Menu */}
        <div className="relative ml-4" ref={userMenuRef}>
          <span
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="cursor-pointer text-lg"
          >
            👤
          </span>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-md w-44 text-sm overflow-hidden">
              {!user && (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Register
                  </Link>
                </>
              )}
              {user && (
                <>
                  <div className="block px-4 py-2 font-medium truncate">
                    Welcome, {user.email}
                  </div>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden ml-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white text-2xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black text-white px-4 pb-4">
          <ul className="flex flex-col gap-4 text-sm uppercase tracking-wider">
            {links.map((link, idx) => (
              <li key={idx} className="relative">
                <Link
                  to={link.path}
                  className="block hover:text-yellow-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
                {/* Cart Badge */}
                {link.path === "/cart" && cartItems.length > 0 && (
                  <span className="absolute top-0 right-0 bg-yellow-400 text-black text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
