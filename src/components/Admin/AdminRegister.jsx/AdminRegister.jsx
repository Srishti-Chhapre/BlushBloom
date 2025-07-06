import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminRegister = () => {
  const [admin, setAdmin] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!admin.name || !admin.email || !admin.password || !admin.confirmPassword) {
      setError('All fields are required!');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(admin.email)) {
      setError('Invalid email format!');
      return;
    }

    if (admin.password.length < 6) {
      setError('Password must be at least 6 characters!');
      return;
    }

    if (admin.password !== admin.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    const adminData = {
      name: admin.name,
      email: admin.email,
      password: admin.password
    };

    localStorage.setItem('adminCredentials', JSON.stringify(adminData));
    toast.success('Admin Registered Successfully!');
    navigate('/admin-login');
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border border-pink-600 bg-pink-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-pink-600">Admin Registration</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={admin.name}
          onChange={handleChange}
          className="w-full p-2 border border-pink-600 bg-pink-50 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={admin.confirmPassword}
          onChange={handleChange}
          className="w-full p-2 border border-pink-600 bg-pink-50 rounded"
        />
        <button type="submit" className="w-full bg-pink-500 text-white p-2 rounded hover:bg-pink-600">
          Register
        </button>
      </form>
    </div>
  );
};

export default AdminRegister;
