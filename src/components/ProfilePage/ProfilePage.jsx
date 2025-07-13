import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useUser } from "../../ContextAPI/UserContext";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const { login, logout, loading } = useUser(); // Use context login and logout

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && !loading) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
        setForm(res.data);
        login(res.data); // 🆕 Sync updated user with context
      } catch (err) {
        toast.error("Unauthorized. Please login again.");
        logout(); // context logout
        navigate("/login");
      }
    };

    if (!loading) fetchProfile(); // Wait for context to finish loading
  }, [navigate, loading, login, logout]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await axios.put(
        "http://localhost:5000/api/auth/profile",
        {
          name: form.name,
          phone: form.phone,
          address: form.address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Profile updated successfully!");
      setUser(res.data);
      setForm(res.data);
      setEditing(false);
      login(res.data); // 🆕 Update context and localStorage
    } catch (err) {
      toast.error(err.response?.data?.message || "Profile update failed!");
    }
  };

  if (!user || loading) {
    return <div className="text-center mt-10 text-lg">Loading Profile...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border border-pink-600 bg-pink-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-pink-600">My Profile</h2>

      {editing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            disabled
            className="w-full p-2 border rounded bg-gray-100"
          />
          <input
            type="text"
            name="phone"
            value={form.phone || ""}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="address"
            value={form.address || ""}
            onChange={handleChange}
            placeholder="Address"
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-pink-500 text-white p-2 rounded hover:bg-pink-600"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="w-full mt-2 bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <div className="space-y-3">
            <div><strong>Name:</strong> {user.name}</div>
            <div><strong>Email:</strong> {user.email}</div>
            <div><strong>Phone:</strong> {user.phone || "N/A"}</div>
            <div><strong>Address:</strong> {user.address || "N/A"}</div>
          </div>

          <div className="flex space-x-4 mt-4">
            <button
              onClick={() => setEditing(true)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Edit Profile
            </button>
            <button
              onClick={() => navigate("/change-password")}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Change Password
            </button>
          </div>
        </>
      )}

      <button
        onClick={() => {
          logout(); // context logout
          navigate("/login");
        }}
        className="mt-6 w-full bg-pink-500 text-white p-2 rounded hover:bg-pink-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
