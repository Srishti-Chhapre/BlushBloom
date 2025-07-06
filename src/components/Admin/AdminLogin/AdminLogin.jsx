import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLogin = () => {
  const [admin, setAdmin] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedAdmin = JSON.parse(localStorage.getItem('adminCredentials'));

    if (!storedAdmin) {
      setError('No admin found. Please register first.');
      return;
    }

    if (admin.email !== storedAdmin.email || admin.password !== storedAdmin.password) {
      setError('Invalid email or password.');
      return;
    }

    localStorage.setItem('isAdminLoggedIn', 'true');
    toast.success('Admin Logged In Successfully!');
    navigate('/admin-dashboard');
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
      </form>
    </div>
  );
};

export default AdminLogin;
