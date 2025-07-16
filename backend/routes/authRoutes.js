import express from 'express';
import protect from '../middleware/authMiddleware.js';
import adminProtect from "../middleware/adminProtect.js";
import {
  registerUser,
  loginUser,
  changePassword,
} from '../controllers/authController.js';

import {
  getUserProfile,
  updateUserProfile,
  getSellerStatus,
} from '../controllers/userController.js';

import {
 getAllSellers,
  updateSellerStatus,
  toggleSellerBlock,
  getAllUsers,
  getAllOrders,
} from '../controllers/adminController.js';

import {
  registerAdmin,
  loginAdmin
} from "../controllers/adminAuthController.js";

const router = express.Router();

// ✅ Public Routes
router.post('/register', registerUser);    // Register customer or seller
router.post('/login', loginUser);          // Login for all users

// 🔐 Protected Routes (Requires JWT)
router.get('/profile', protect, getUserProfile);       // Get logged-in user profile
router.put('/profile', protect, updateUserProfile);    // Update profile
router.put('/change-password', protect, changePassword); // Change password
router.get('/seller-status', getSellerStatus);          // Get status for seller (pending/approved/rejected)

// 🛡️ Admin Routes
router.get('/admin/sellers',adminProtect, getAllSellers);                     // View all sellers
router.put('/admin/sellers/:id/status',adminProtect, updateSellerStatus);     // Approve / Reject seller
router.put('/admin/sellers/:id/block',adminProtect, toggleSellerBlock); 
      // Block / Unblock seller

router.post("/admin/register", registerAdmin);
router.post('/admin/login', loginAdmin);

router.get('/admin/users', adminProtect, getAllUsers);
router.get('/admin/orders', adminProtect, getAllOrders);

export default router;
