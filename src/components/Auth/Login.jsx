// Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('All fields are required!');
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!storedUser || storedUser.email !== email) {
      setError('User not found!');
      return;
    }

    const isPasswordValid = bcrypt.compareSync(password, storedUser.password);

    if (!isPasswordValid) {
      setError('Invalid password!');
      return;
    }

    localStorage.setItem('isLoggedIn', true);
    toast.success('Login Successful!');
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border border-pink-600 bg-pink-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border border-pink-600 bg-pink-50 rounded" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border border-pink-600 bg-pink-50 rounded" />
        <button type="submit" className="w-full bg-pink-500 text-white p-2 rounded hover:bg-pink-600">Login</button>
      </form>
    </div>
  );
};

export default Login;
