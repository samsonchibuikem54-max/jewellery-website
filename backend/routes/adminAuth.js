import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db/database.js";

const router = express.Router();

/**
 * Admin Login
 */
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const admin = db
    .prepare("SELECT * FROM admins WHERE email = ?")
    .get(email);

  if (!admin) return res.status(401).json({ message: "Invalid credentials" });

  const isValid = bcrypt.compareSync(password, admin.password);
  if (!isValid)
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: admin.id, email: admin.email, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  res.json({ token, email: admin.email });
});

export default router;
