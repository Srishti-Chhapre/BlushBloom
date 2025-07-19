// src/api/authApi.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Register new user (customer or seller)
export const registerUser = (userData) => API.post("/auth/register", userData);

// Login user
export const loginUser = (userData) => API.post("/auth/login", userData);

// Get logged-in user's profile
export const getUserProfile = (token) =>
  API.get("/auth/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
