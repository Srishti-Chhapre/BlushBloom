// src/pages/SellerRegister.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerCustomer } from "../../../api/authApi";
import { useUser } from "../../../ContextAPI/UserContext";

const SellerRegister = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    gstNumber: "",
    document: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user: currentUser } = useUser();

  useEffect(() => {
    if (currentUser) navigate("/");
  }, [currentUser, navigate]);

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

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

    const userData = { ...user, userType: "seller" };

    try {
      await registerCustomer(userData);
      toast.success("Seller registered! Awaiting admin approval.");
      localStorage.setItem("pendingSellerEmail", user.email);
      navigate("/seller/seller-status");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border border-purple-600 bg-purple-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Seller Register</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Name" onChange={handleChange} className="w-full p-2 border border-purple-600 bg-purple-50 rounded" />
        <input name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border border-purple-600 bg-purple-50 rounded" />
        <input name="businessName" placeholder="Business Name" onChange={handleChange} className="w-full p-2 border border-purple-600 bg-purple-50 rounded" />
        <input name="gstNumber" placeholder="GST Number" onChange={handleChange} className="w-full p-2 border border-purple-600 bg-purple-50 rounded" />
        <input name="document" placeholder="Document Link (optional)" onChange={handleChange} className="w-full p-2 border border-purple-600 bg-purple-50 rounded" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border border-purple-600 bg-purple-50 rounded" />
        <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} className="w-full p-2 border border-purple-600 bg-purple-50 rounded" />
        
        <button type="submit" className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600">Register</button>
      </form>

      <div className="text-center mt-4">
        <p>Are you a customer?</p>
        <button onClick={() => navigate("/register")} className="text-purple-600 underline hover:text-purple-800">
          Register as Customer
        </button>
      </div>
    </div>
  );
};

export default SellerRegister;
