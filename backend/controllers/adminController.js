import db from "../db/database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER ADMIN (use once, then delete route)
export const adminRegister = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "All fields required" });

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    db.prepare(
      "INSERT INTO admins (email, password) VALUES (?, ?)"
    ).run(email, hashedPassword);

    res.json({ message: "Admin created successfully" });
  } catch (err) {
    res.status(400).json({ message: "Admin already exists" });
  }
};

// LOGIN ADMIN
export const adminLogin = async (req, res) => {
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
    admin: {
      id: admin.id,
      email: admin.email,
    },
  });
};
