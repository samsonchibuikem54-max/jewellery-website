const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();

/* -------------------------
   CREATE FIRST ADMIN (RUN ONCE)
-------------------------- */
router.post("/seed", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email & password required" });

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    db.prepare(
      "INSERT INTO admins (email, password) VALUES (?, ?)"
    ).run(email, hashedPassword);

    res.json({ message: "✅ Admin created successfully" });
  } catch (err) {
    res.status(400).json({ message: "Admin already exists" });
  }
});

/* -------------------------
   ADMIN LOGIN
-------------------------- */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const admin = db
    .prepare("SELECT * FROM admins WHERE email = ?")
    .get(email);

  if (!admin)
    return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch)
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: admin.id, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    message: "Login successful",
    token,
  });
});

module.exports = router;
