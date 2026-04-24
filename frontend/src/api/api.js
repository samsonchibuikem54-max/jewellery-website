// src/api/api.js

const API_BASE =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") ||
  "http://localhost:5000";

// ---------------- HELPER ----------------
const handleResponse = async (res) => {
  const contentType = res.headers.get("content-type");

  if (!contentType || !contentType.includes("application/json")) {
    const text = await res.text();
    throw new Error(text || "Invalid server response");
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Request failed");
  }

  return data;
};

// ---------------- USERS ----------------
export const registerUser = async (userData) => {
  try {
    const res = await fetch(`${API_BASE}/api/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    return await handleResponse(res);
  } catch (err) {
    console.error("Register user error:", err);
    return { success: false, message: err.message };
  }
};

export const loginUser = async (credentials) => {
  try {
    const res = await fetch(`${API_BASE}/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    return await handleResponse(res);
  } catch (err) {
    console.error("Login user error:", err);
    return { success: false, message: err.message };
  }
};

// ---------------- ORDERS (USER) ----------------
export const placeOrder = async (orderData, token) => {
  try {
    const res = await fetch(`${API_BASE}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(orderData),
    });

    return await handleResponse(res);
  } catch (err) {
    console.error("Place order error:", err);
    return { success: false, message: err.message };
  }
};

export const getOrders = async (token) => {
  try {
    const res = await fetch(`${API_BASE}/api/orders`, {
      headers: token
        ? { Authorization: `Bearer ${token}` }
        : undefined,
    });

    return await handleResponse(res);
  } catch (err) {
    console.error("Get orders error:", err);
    return { success: false, orders: [], message: err.message };
  }
};

// ---------------- ADMIN ----------------
export const registerAdmin = async (adminData) => {
  try {
    const res = await fetch(`${API_BASE}/api/admin/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(adminData),
    });

    return await handleResponse(res);
  } catch (err) {
    console.error("Admin register error:", err);
    return { success: false, message: err.message };
  }
};

export const loginAdmin = async (credentials) => {
  try {
    const res = await fetch(`${API_BASE}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    return await handleResponse(res);
  } catch (err) {
    console.error("Admin login error:", err);
    return { success: false, message: err.message };
  }
};

// ---------------- ADMIN ORDERS ----------------
export const fetchAllOrders = async (token) => {
  try {
    const res = await fetch(`${API_BASE}/api/admin/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return await handleResponse(res);
  } catch (err) {
    console.error("Fetch all orders error:", err);
    return { success: false, orders: [], message: err.message };
  }
};

export const updateOrderStatus = async (orderId, status, token) => {
  try {
    const res = await fetch(
      `${API_BASE}/api/admin/orders/${orderId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      }
    );

    return await handleResponse(res);
  } catch (err) {
    console.error("Update order status error:", err);
    return { success: false, message: err.message };
  }
};
