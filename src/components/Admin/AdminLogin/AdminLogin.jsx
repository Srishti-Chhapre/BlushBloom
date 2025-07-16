import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLogin = () => {
  const [admin, setAdmin] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  try {
    // ✅ Make API request to admin login endpoint
    const response = await axios.post('http://localhost:5000/api/auth/admin/login', admin);

    // ✅ Extract token, admin info, and message from response
    const { token, admin: adminData, message } = response.data;

    // ✅ Store session data in localStorage
    localStorage.setItem('isAdminLoggedIn', 'true');
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminInfo', JSON.stringify(adminData));

    // ✅ Show success notification
    toast.success(message || 'Admin Logged In Successfully!');
console.log("✅ Redirecting to dashboard...");
    // ✅ Redirect to dashboard
    navigate('/admin-dashboard');

  } catch (error) {
    // ❌ Handle login errors
    const errorMsg = error.response?.data?.message || 'Login failed. Please try again.';
    setError(errorMsg);
    toast.error(errorMsg);
    console.error('Admin Login Error:', error);
  }
};


  return (
    <div className="max-w-md mx-auto mt-20 p-6 border border-pink-600 bg-pink-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-pink-600">Admin Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Admin Email"
          value={admin.email}
          onChange={handleChange}
          className="w-full p-2 border border-pink-600 bg-pink-50 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={admin.password}
          onChange={handleChange}
          className="w-full p-2 border border-pink-600 bg-pink-50 rounded"
        />
        <button type="submit" className="w-full bg-pink-500 text-white p-2 rounded hover:bg-pink-600">
          Login
        </button>
        {/* <button onClick={() => navigate('/admin-dashboard')} className="text-blue-500 mt-4">Test Redirect</button> */}

      </form>
    </div>
  );
};

export default AdminLogin;
