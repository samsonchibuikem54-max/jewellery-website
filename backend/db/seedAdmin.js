import bcrypt from "bcryptjs";
import db from "./database.js";

// Change these values for your first admin
const adminEmail = "admin@osj.com";
const adminPassword = "Admin1234"; // strong password

// Hash password
const hashedPassword = bcrypt.hashSync(adminPassword, 10);

// Insert admin if not exists
const existing = db
  .prepare("SELECT * FROM admins WHERE email = ?")
  .get(adminEmail);

if (!existing) {
  db.prepare("INSERT INTO admins (email, password) VALUES (?, ?)")
    .run(adminEmail, hashedPassword);
  console.log("Admin seeded successfully ✅");
} else {
  console.log("Admin already exists ⚠️");
}
