// src/index.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import { CartProvider } from "./ContextAPI/CartContext";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./ContextAPI/UserContext";
import { SellerProvider } from "./ContextAPI/SellerContext";

import ProtectedRoute from "./components/Auth/ProtectedRoute";

// Pages
import Home from "./components/Home/Home";
import CategoryPage from "./components/CategoryPage/CategoryPage";
import SearchResultsPage from "./components/SearchResultPage/SearchResultsPage";
import AboutUs from "./components/AboutUs/AboutUs";
import ContactUs from "./components/ContactUs/ContactUs";
import ProductPage from "./components/ProductPage/ProductPage";
import CartPage from "./components/CartPage/CartPage";
import BuyNowPage from "./components/BuyNowPage/BuyNowPage";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Profile from "./components/ProfilePage/ProfilePage";
import EditProfile from "./components/EditProfile/EditProfile";
import ChangePassword from "./components/Auth/ChangePassword";
import PaymentPage from "./components/PaymentPage/PaymentPage";
import PaymentSuccess from "./components/PaymentPage/PaymentSuccess";
import PaymentFailure from "./components/PaymentPage/PaymentFailure";
import AdminLogin from "./components/Admin/AdminLogin/AdminLogin";
import AdminRegister from "./components/Admin/AdminRegister.jsx/AdminRegister";
import AdminDashboard from "./components/Admin/AdminDashboard/AdminDashboard";
import ManageSellers from "./components/Admin/ManageSellers/ManageSellers";
import ViewUsers from "./components/Admin/ViewUsers/ViewUsers";
import ViewAllOrders from "./components/Admin/ViewAllOrders/ViewAllOrders";
import SellerApprovalStatus from "./components/Seller/SellerApprovalStatus/SellerApprovalStatus";
import SellerDashboard from "./components/Seller/SellerDashboard/SellerDashboard";
import AddProductPage from "./components/Seller/AddProductPage/AddProductPage";
import EditProductPage from "./components/Seller/EditProductPage/EditProductPage";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <CartProvider>
        <SellerProvider>
          <HashRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<CategoryPage />} />
              <Route path="/search" element={<SearchResultsPage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/payment-failure" element={<PaymentFailure />} />

              {/* Seller Status (before approval) */}
              <Route path="/seller/seller-status" element={<SellerApprovalStatus />} />

              {/* Admin Routes */}
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin-register" element={<AdminRegister />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/admin-dashboard/manage-sellers" element={<ManageSellers />} />
              <Route path="/admin-dashboard/view-users" element={<ViewUsers />} />
              <Route path="/admin-dashboard/view-orders" element={<ViewAllOrders />} />

              {/* Protected User Routes */}
              <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
              <Route path="/buy-now/:id" element={<ProtectedRoute><BuyNowPage /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
              <Route path="/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />

              {/* Seller Routes */}
              <Route path="/seller-dashboard" element={<SellerDashboard />} />
              <Route path="/seller/add-product" element={<AddProductPage />} />
              <Route path="/seller/edit-product/:id" element={<ProtectedRoute><EditProductPage /></ProtectedRoute>} />
            </Routes>
          </HashRouter>
        </SellerProvider>
      </CartProvider>
    </UserProvider>
    <ToastContainer />
  </React.StrictMode>
);
