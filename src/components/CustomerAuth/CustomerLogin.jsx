// src/components/Auth/CustomerLogin.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginCustomer } from "../../api/authApi";
import { useUser } from "../../ContextAPI/UserContext";
import axios from "axios";

const CustomerLogin = () => {
  const { user, login } = useUser();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.userType === "customer") {
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
      const res = await loginCustomer({ email, password });
      const { token } = res.data;

      const profileRes = await axios.get(
        "http://localhost:5000/api/auth/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const fullUser = { ...profileRes.data, token };
      if (fullUser.userType !== "customer") {
        setError("Not a customer account");
        return;
      }

      login(fullUser);
      toast.success("Customer login successful!");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border border-green-600 bg-green-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Customer Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-green-600 bg-green-50 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-green-600 bg-green-50 rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Login
        </button>
        <p className="text-center mt-4">
          Are you a seller?{" "}
          <Link
            to="/seller-login"
            className="text-pink-600 underline hover:text-pink-800"
          >
            Login as Seller
          </Link>
        </p>
      </form>
    </div>
  );
};

export default CustomerLogin;
