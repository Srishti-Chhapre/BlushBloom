// Register.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [user, setUser] = useState({ name: '', email: '', phone: '', address: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user.name || !user.email || !user.phone || !user.address || !user.password || !user.confirmPassword) {
      setError('All fields are required!');
      return;
    }

    if (!validateEmail(user.email)) {
      setError('Invalid email format!');
      return;
    }

    if (user.password.length < 6) {
      setError('Password must be at least 6 characters!');
      return;
    }

    if (user.password !== user.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    const existingUser = JSON.parse(localStorage.getItem('user'));

    if (existingUser && existingUser.email === user.email) {
      setError('User already exists!');
      return;
    }

    const hashedPassword = bcrypt.hashSync(user.password, 10);

    const userData = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      password: hashedPassword,
    };

    localStorage.setItem('user', JSON.stringify(userData));
    toast.success('Registered Successfully!');
    navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border border-pink-600 bg-pink-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Name" value={user.name} onChange={handleChange} className="w-full p-2 border border-pink-600 bg-pink-50 rounded" />
        <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} className="w-full p-2 border border-pink-600 bg-pink-50 rounded" />
        <input type="text" name="phone" placeholder="Phone Number" value={user.phone} onChange={handleChange} className="w-full p-2 border border-pink-600 bg-pink-50 rounded" />
        <input type="text" name="address" placeholder="Address" value={user.address} onChange={handleChange} className="w-full p-2 border border-pink-600 bg-pink-50 rounded" />
        <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} className="w-full p-2 border border-pink-600 bg-pink-50 rounded" />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={user.confirmPassword} onChange={handleChange} className="w-full p-2 border border-pink-600 bg-pink-50 rounded" />
        <button type="submit" className="w-full bg-pink-500 text-white p-2 rounded hover:bg-pink-600">Register</button>
      </form>
    </div>
  );
};

export default Register;
