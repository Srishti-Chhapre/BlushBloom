// src/components/Auth/SellerLogin.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginCustomer } from "../../../api/authApi";
import { useUser } from "../../../ContextAPI/UserContext";
import axios from "axios";

const SellerLogin = () => {
  const { user, login } = useUser();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.userType === "seller") {
      navigate("/seller/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required!");
      return;
    }

    try {
      const res = await loginCustomer({ email, password });
      const { token } = res.data;

      const profileRes = await axios.get("http://localhost:5000/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const fullUser = { ...profileRes.data, token };

      if (fullUser.userType !== "seller") {
        setError("Not a seller account");
        return;
      }

      login(fullUser);

      if (fullUser.approvalStatus === "approved") {
        toast.success("Login successful!");
        navigate("/seller/dashboard");
      } else {
        toast.info("Your account is not approved yet.");
        localStorage.setItem("pendingSellerEmail", fullUser.email);
        navigate("/seller/approval-status");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border border-purple-600 bg-purple-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Seller Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border border-purple-600 bg-purple-50 rounded" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border border-purple-600 bg-purple-50 rounded" />
        <button type="submit" className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600">Login</button>
      </form>

      <div className="text-center mt-4">
        <p>Are you a customer?</p>
        <button onClick={() => navigate("/login")} className="text-purple-600 underline hover:text-purple-800">
          Login as Customer
        </button>
      </div>
    </div>
  );
};

export default SellerLogin;
