import { useEffect, useState } from "react";
import { Users, ShoppingCart, Store, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [totalSellers, setTotalSellers] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) {
      toast.error("Unauthorized. Please login again.");
      navigate("/admin-login");
      return;
    }

    const fetchCounts = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const resSellers = await axios.get("http://localhost:5000/api/auth/admin/sellers", config);
        setTotalSellers(resSellers.data.length || 0);

        const resUsers = await axios.get("http://localhost:5000/api/auth/users", config);
        setTotalUsers(resUsers.data.length || 0);

        const resOrders = await axios.get("http://localhost:5000/api/auth/orders", config);
        setTotalOrders(resOrders.data.length || 0);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
        if (error.response?.status === 401) {
          toast.error("Session expired. Please login again.");
          handleLogout();
        } else {
          toast.error("Failed to fetch dashboard data.");
        }
      }
    };

    fetchCounts();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminInfo");
    navigate("/admin-login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-pink-600 text-white p-6 flex flex-col">
        <h2 className="text-3xl font-bold mb-8 text-center">Admin</h2>
        <nav className="flex flex-col space-y-4">
          <button onClick={() => navigate("/admin-dashboard")} className="text-left hover:bg-pink-700 p-2 rounded">
            Dashboard
          </button>
          <button onClick={() => navigate("/admin-dashboard/manage-sellers")} className="text-left hover:bg-pink-700 p-2 rounded">
            Manage Sellers
          </button>
          <button onClick={() => navigate("/admin-dashboard/view-users")} className="text-left hover:bg-pink-700 p-2 rounded">
            View Users
          </button>
          <button onClick={() => navigate("/admin-dashboard/view-orders")} className="text-left hover:bg-pink-700 p-2 rounded">
            View Orders
          </button>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-2 bg-white text-pink-600 p-2 rounded hover:bg-gray-200"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h1 className="text-4xl font-bold text-gray-700 mb-10">Admin Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition">
            <Store size={40} className="text-pink-600 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Total Sellers</h2>
            <p className="text-3xl font-bold text-gray-700">{totalSellers}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition">
            <Users size={40} className="text-pink-600 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Total Users</h2>
            <p className="text-3xl font-bold text-gray-700">{totalUsers}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition">
            <ShoppingCart size={40} className="text-pink-600 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Total Orders</h2>
            <p className="text-3xl font-bold text-gray-700">{totalOrders}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
