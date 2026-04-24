import express from "express";
import db from "../db/database.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

/**
 * GET all orders (admin only)
 */
router.get("/", adminAuth, (req, res) => {
  const orders = db.prepare(`
    SELECT * FROM orders ORDER BY createdAt DESC
  `).all();

  res.json(orders);
});

/**
 * UPDATE order status / tracking (admin only)
 */
router.put("/:id", adminAuth, (req, res) => {
  const { status, trackingId, deliveryCompany } = req.body;
  const { id } = req.params;

  db.prepare(`
    UPDATE orders
    SET status = ?, trackingId = ?, deliveryCompany = ?
    WHERE id = ?
  `).run(status, trackingId, deliveryCompany, id);

  res.json({ message: "Order updated successfully" });
});

export default router;
