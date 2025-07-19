// src/components/Auth/Login.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../api/authApi";
import { useUser } from "../../ContextAPI/UserContext";
import axios from "axios";

const Login = () => {
  const { user, login } = useUser();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // If already logged in, redirect
  useEffect(() => {
    if (user) {
      if (user.userType === "customer") {
        navigate("/");
      } else if (user.userType === "seller") {
        navigate("/seller/dashboard");
      } else if (user.userType === "admin") {
        navigate("/admin/dashboard");
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required!");
      return;
    }

    try {
      const res = await loginUser({ email, password });
      const { token } = res.data;

      const profileRes = await axios.get("http://localhost:5000/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const fullUser = { ...profileRes.data, token };
      login(fullUser); // Save in context/localStorage

      if (fullUser.userType === "seller") {
        if (fullUser.approvalStatus === "approved") {
          toast.success("Login successful!");
          navigate("/seller/dashboard");
        } else {
          toast.info("Your account is not approved yet.");
          localStorage.setItem("pendingSellerEmail", fullUser.email);
          navigate("/seller/approval-status");
        }
      } else if (fullUser.userType === "admin") {
        toast.success("Welcome Admin!");
        navigate("/admin/dashboard");
      } else {
        toast.success("Login successful!");
        navigate("/");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border border-pink-600 bg-pink-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-pink-600 bg-pink-50 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-pink-600 bg-pink-50 rounded"
        />
        <button
          type="submit"
          className="w-full bg-pink-500 text-white p-2 rounded hover:bg-pink-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
