// src/pages/Register.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../../api/authApi";
import { useUser } from "../../ContextAPI/UserContext";
import axios from "axios";

const Register = () => {
  const [userType, setUserType] = useState("customer");
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    gstNumber: "",
    document: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user: currentUser } = useUser();

  // 🔐 Redirect if user is already logged in
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.name || !user.email || !user.password || !user.confirmPassword) {
      setError("All fields are required!");
      return;
    }

    if (!validateEmail(user.email)) {
      setError("Invalid email format!");
      return;
    }

    if (user.password.length < 6) {
      setError("Password must be at least 6 characters!");
      return;
    }

    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const userData = { ...user, userType };

    try {
      const res = await registerUser(userData);

      if (userType === "seller") {
        toast.success("Seller registered! Awaiting approval...");
        localStorage.setItem("pendingSellerEmail", user.email);
        navigate("/seller-approval-status");
      } else {
        toast.success("Registered successfully! Please login.");
        navigate("/login");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border border-pink-600 bg-pink-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 mr-2 rounded ${
            userType === "customer"
              ? "bg-pink-500 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
          onClick={() => setUserType("customer")}
        >
          Customer
        </button>
        <button
          className={`px-4 py-2 rounded ${
            userType === "seller"
              ? "bg-pink-500 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
          onClick={() => setUserType("seller")}
        >
          Seller
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Name"
          value={user.name}
          onChange={handleChange}
          className="w-full p-2 border border-pink-600 bg-pink-50 rounded"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          className="w-full p-2 border border-pink-600 bg-pink-50 rounded"
        />

        {userType === "customer" && (
          <>
            <input
              name="phone"
              placeholder="Phone"
              value={user.phone}
              onChange={handleChange}
              className="w-full p-2 border border-pink-600 bg-pink-50 rounded"
            />
            <input
              name="address"
              placeholder="Address"
              value={user.address}
              onChange={handleChange}
              className="w-full p-2 border border-pink-600 bg-pink-50 rounded"
            />
          </>
        )}

        {userType === "seller" && (
          <>
            <input
              name="businessName"
              placeholder="Business Name"
              value={user.businessName}
              onChange={handleChange}
              className="w-full p-2 border border-pink-600 bg-pink-50 rounded"
            />
            <input
              name="gstNumber"
              placeholder="GST Number"
              value={user.gstNumber}
              onChange={handleChange}
              className="w-full p-2 border border-pink-600 bg-pink-50 rounded"
            />
            <input
              name="document"
              placeholder="Document Link (Optional)"
              value={user.document}
              onChange={handleChange}
              className="w-full p-2 border border-pink-600 bg-pink-50 rounded"
            />
          </>
        )}

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          className="w-full p-2 border border-pink-600 bg-pink-50 rounded"
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={user.confirmPassword}
          onChange={handleChange}
          className="w-full p-2 border border-pink-600 bg-pink-50 rounded"
        />

        <button
          type="submit"
          className="w-full bg-pink-500 text-white p-2 rounded hover:bg-pink-600"
        >
          Register as {userType}
        </button>
      </form>
    </div>
  );
};

export default Register;
