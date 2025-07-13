import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useUser } from "../../ContextAPI/UserContext";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { logout } = useUser();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in");
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required!");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters!");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        "http://localhost:5000/api/auth/change-password",
        {
          currentPassword: oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message || "Password changed successfully!");

      // ✅ Clear session after password change
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      logout();
      navigate("/login");

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border border-pink-600 bg-pink-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-pink-600">
        Change Password
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="Current Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full p-2 border border-pink-600 rounded bg-pink-50"
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 border border-pink-600 rounded bg-pink-50"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 border border-pink-600 rounded bg-pink-50"
        />
        <button
          type="submit"
          className="w-full bg-pink-500 text-white p-2 rounded hover:bg-pink-600"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
