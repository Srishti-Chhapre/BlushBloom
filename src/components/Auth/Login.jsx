// src/pages/Login.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { loginUser } from "../../api/authApi";
import { useUser } from "../../ContextAPI/UserContext";

const Login = () => {
  const { user, login } = useUser();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required!");
      return;
    }

    try {
      // 1. Login
      const res = await loginUser({ email, password });
      const { token } = res.data;

      localStorage.setItem("token", token); // ✅ Save token

      // 2. Fetch full user profile
      const profileRes = await axios.get("http://localhost:5000/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // 3. Save to context + localStorage
      login(profileRes.data);
      toast.success("Login successful!");
      navigate("/profile");
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
