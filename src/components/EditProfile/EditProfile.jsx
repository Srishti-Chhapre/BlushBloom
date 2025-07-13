import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../ContextAPI/UserContext";
import { toast } from "react-toastify";
import axios from "axios";

const EditProfile = () => {
  const { user, login } = useUser();
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const navigate = useNavigate();

  // Load from context/localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You must be logged in");
      navigate("/login");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setForm({
        name: storedUser.name || "",
        phone: storedUser.phone || "",
        address: storedUser.address || "",
      });
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.address) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const token = localStorage.getItem("token");

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

      login(res.data); // ✅ update context and localStorage
      toast.success("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Profile update failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border border-pink-600 bg-pink-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-pink-600">
        Edit Profile
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border border-pink-600 rounded bg-pink-50"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-2 border border-pink-600 rounded bg-pink-50"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="w-full p-2 border border-pink-600 rounded bg-pink-50"
        />
        <button
          type="submit"
          className="w-full bg-pink-500 text-white p-2 rounded hover:bg-pink-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
