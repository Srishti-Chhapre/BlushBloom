import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },

    // 🧍 Common for customers
    phone: {
      type: String,
    },
    address: {
      type: String,
    },

    // 🔐 Roles
    userType: {
      type: String,
      enum: ["customer", "seller", "admin"],
      default: "customer",
    },

    // 🧾 Seller-specific
    businessName: {
      type: String,
    },
    gstNumber: {
      type: String,
    },
    document: {
      type: String,
    },
    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
