import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ========== CUSTOMER AUTH ==========
export const registerCustomer = (userData) =>
  API.post("/auth/customer/register", userData);

export const loginCustomer = (userData) =>
  API.post("/auth/customer/login", userData);

export const getCustomerProfile = (token) =>
  API.get("/auth/customer/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });

// ========== SELLER AUTH ==========
export const registerSeller = (userData) =>
  API.post("/auth/seller/register", userData);

export const loginSeller = (userData) =>
  API.post("/auth/seller/login", userData);

export const getSellerProfile = (token) =>
  API.get("/auth/seller/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
