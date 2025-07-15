import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { name, email, password, confirmPassword } = admin;

    if (!name || !email || !password || !confirmPassword) {
      return setError('All fields are required!');
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return setError('Invalid email format!');
    }

    if (password.length < 6) {
      return setError('Password must be at least 6 characters!');
    }

    if (password !== confirmPassword) {
      return setError('Passwords do not match!');
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/admin/register', {
        name,
        email,
        password
      });

      toast.success(res.data.message || 'Admin Registered Successfully!');
      navigate('/admin-login');
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed';
      setError(msg);
      toast.error(msg);
    }
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
