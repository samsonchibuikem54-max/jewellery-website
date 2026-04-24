import Database from "better-sqlite3";

const db = new Database("database.sqlite");

// ADMIN TABLE
db.prepare(`
  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
  )
`).run();

// ORDERS TABLE
db.prepare(`
  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    userEmail TEXT,
    items TEXT,
    total INTEGER,
    paymentMethod TEXT,
    status TEXT,
    trackingId TEXT,
    deliveryCompany TEXT,
    createdAt TEXT
  )
`).run();

export default db;
