// src/components/ProfilePage/ProfilePage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useUser } from "../../ContextAPI/UserContext";

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const { user, login, logout, loading } = useUser();

  useEffect(() => {
    if (!user || !user.token || loading) return;

    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        setUserDetails(res.data);
        setForm(res.data);
        login({ ...res.data, token: user.token }); // Sync context
      } catch (err) {
        toast.error("Unauthorized. Please login again.");
        logout();
        navigate("/login");
      }
    };

    fetchProfile();
  }, [user, login, logout, navigate, loading]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        "http://localhost:5000/api/auth/profile",
        {
          name: form.name,
          phone: form.phone,
          address: form.address,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      toast.success("Profile updated successfully!");
      setUserDetails(res.data);
      setForm(res.data);
      setEditing(false);
      login({ ...res.data, token: user.token });
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  if (!userDetails || loading) return <div className="text-center mt-10 text-lg">Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border border-pink-600 bg-pink-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-pink-600">My Profile</h2>
      {editing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" />
          <input type="email" name="email" value={form.email} disabled className="w-full p-2 border rounded bg-gray-100" />
          <input type="text" name="phone" value={form.phone || ""} onChange={handleChange} placeholder="Phone" className="w-full p-2 border rounded" />
          <input type="text" name="address" value={form.address || ""} onChange={handleChange} placeholder="Address" className="w-full p-2 border rounded" />
          <button type="submit" className="w-full bg-pink-500 text-white p-2 rounded hover:bg-pink-600">Save</button>
          <button onClick={() => setEditing(false)} className="w-full mt-2 bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400">Cancel</button>
        </form>
      ) : (
        <>
          <div className="space-y-3">
            <div><strong>Name:</strong> {userDetails.name}</div>
            <div><strong>Email:</strong> {userDetails.email}</div>
            <div><strong>Phone:</strong> {userDetails.phone || "N/A"}</div>
            <div><strong>Address:</strong> {userDetails.address || "N/A"}</div>
          </div>
          <div className="flex space-x-4 mt-4">
            <button onClick={() => setEditing(true)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">Edit</button>
            <button onClick={() => navigate("/change-password")} className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">Change Password</button>
          </div>
        </>
      )}
      <button onClick={() => { logout(); navigate("/login"); }} className="mt-6 w-full bg-pink-500 text-white p-2 rounded hover:bg-pink-600">Logout</button>
    </div>
  );
};

export default Profile;
