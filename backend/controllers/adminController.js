import Order from "../models/Order.js";
import User from "../models/User.js";

// ✅ Get all sellers
// export const getAllSellers = async (req, res) => {
//   try {
//     const sellers = await User.find({ userType: "seller" }).select("-password");
//     res.status(200).json(sellers);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch sellers" });
//   }
// };

// ✅ Update seller approval status
export const updateSellerStatus = async (req, res) => {
  const { id } = req.params;
  const { approvalStatus, reason } = req.body;

  if (!["approved", "rejected", "pending"].includes(approvalStatus)) {
    return res.status(400).json({ message: "Invalid approvalStatus value" });
  }

  try {
    const updatedSeller = await User.findByIdAndUpdate(
      id,
      { approvalStatus, rejectionReason: reason || "" },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedSeller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    res.status(200).json({ message: `Seller ${approvalStatus} successfully`, seller: updatedSeller });
  } catch (error) {
    res.status(500).json({ message: "Failed to update seller approval status" });
  }
};

// ✅ Block/unblock seller
export const toggleSellerBlock = async (req, res) => {
  const { id } = req.params;

  try {
    const seller = await User.findById(id);
    if (!seller || seller.userType !== "seller") {
      return res.status(404).json({ message: "Seller not found" });
    }

    seller.isBlocked = !seller.isBlocked;
    await seller.save();

    res.status(200).json({
      message: `Seller ${seller.isBlocked ? "blocked" : "unblocked"} successfully`,
      seller,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update block status" });
  }
};
// ✅ Get all non-admin users (customers only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ userType: "customer" }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};
export const getAllSellers = async (req, res) => {
  try {
    const sellers = await User.find({ userType: "seller" });
    res.json(sellers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sellers" });
  }
};

// ✅ Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name email");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};
