import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: String, // later we’ll hash this
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
