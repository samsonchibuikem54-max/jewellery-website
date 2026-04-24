// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ======================
// MIDDLEWARE
// ======================
app.use(cors());
app.use(express.json());

// ======================
// ENV CHECK
// ======================
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing in .env file");
  process.exit(1);
}

// ======================
// MONGODB CONNECTION
// ======================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

// ======================
// SCHEMAS & MODELS
// ======================

// USER
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, lowercase: true },
    password: String, // demo only
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);

// ADMIN
const adminSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, lowercase: true, required: true },
    password: { type: String, required: true }, // demo only
  },
  { timestamps: true }
);
const Admin = mongoose.model("Admin", adminSchema);

// ORDER
const orderSchema = new mongoose.Schema(
  {
    items: Array,
    total: Number,
    paymentMethod: String,
    paymentInfo: Object,
    status: { type: String, default: "Paid" },
  },
  { timestamps: true }
);
const Order = mongoose.model("Order", orderSchema);

// ======================
// TEST ROUTE
// ======================
app.get("/", (req, res) => {
  res.json({ success: true, message: "Backend is running 🚀" });
});

// ======================
// USER ROUTES
// ======================

// REGISTER USER
app.post("/api/users/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password)
      return res.json({ success: false, message: "Email and password required" });

    const exists = await User.findOne({ email });
    if (exists)
      return res.json({ success: false, message: "User already exists" });

    const user = await User.create({ name, email, password });

    res.json({
      success: true,
      message: "User registered successfully",
      user,
      token: "demo-token",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Registration failed" });
  }
});

// LOGIN USER
app.post("/api/users/login", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user)
      return res.json({ success: false, message: "Invalid credentials" });

    res.json({
      success: true,
      message: "Login successful",
      user,
      token: "demo-token",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Login failed" });
  }
});

// ======================
// ORDER ROUTES
// ======================

// CREATE ORDER
app.post("/api/orders", async (req, res) => {
  try {
    const order = await Order.create({ ...req.body, status: "Paid" });
    res.json({ success: true, message: "Order placed", order });
  } catch (err) {
    res.status(500).json({ success: false, message: "Order failed" });
  }
});

// USER GET ORDERS
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, orders: [] });
  }
});

// ======================
// ADMIN ROUTES
// ======================

// ADMIN REGISTER
app.post("/api/admin/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.json({ success: false, message: "Email and password required" });

    const exists = await Admin.findOne({ email });
    if (exists)
      return res.json({ success: false, message: "Admin already exists" });

    await Admin.create({ email, password });

    res.json({ success: true, message: "Admin registered successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Admin registration failed" });
  }
});

// ADMIN LOGIN
app.post("/api/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin || admin.password !== password)
      return res.json({ success: false, message: "Invalid admin credentials" });

    res.json({
      success: true,
      message: "Admin login successful",
      token: "demo-admin-token",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Admin login failed" });
  }
});

// ADMIN GET ALL ORDERS
app.get("/api/admin/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, orders: [] });
  }
});

// ADMIN VERIFY ORDER
app.put("/api/admin/orders/:id", async (req, res) => {
  try {
    const { status } = req.body;

    await Order.findByIdAndUpdate(req.params.id, { status });

    res.json({ success: true, message: "Order updated" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Update failed" });
  }
});

// ======================
// START SERVER
// ======================
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
