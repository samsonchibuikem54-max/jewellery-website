import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    items: { type: Array, required: true },
    total: { type: Number, required: true },
    paymentMethod: String,
    paymentInfo: Object,
    status: { type: String, default: "Paid" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
