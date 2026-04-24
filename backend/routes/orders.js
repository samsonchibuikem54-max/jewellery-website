const express = require("express");
const router = express.Router();

// TEMP in-memory storage (Mongo later)
let orders = [];

// ======================
// CREATE ORDER
// POST /api/orders
// ======================
router.post("/", (req, res) => {
  try {
    const { items, total, paymentMethod, paymentInfo } = req.body;

    if (!items || !items.length) {
      return res.json({ success: false, message: "No items in order" });
    }

    const newOrder = {
      id: `OSJ-${Date.now()}`,
      date: new Date().toLocaleString(),
      items,
      total,
      paymentMethod,
      paymentInfo,
      status: "Paid",
    };

    orders.push(newOrder);

    res.json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Order error:", error);
    res.status(500).json({
      success: false,
      message: "Server error placing order",
    });
  }
});

// ======================
// GET USER ORDERS
// GET /api/orders
// ======================
router.get("/", (req, res) => {
  try {
    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Fetch orders error:", error);
    res.status(500).json({
      success: false,
      orders: [],
    });
  }
});

module.exports = router;
