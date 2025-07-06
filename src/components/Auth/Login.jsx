import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../../ContextAPI/UserContext';
import { useSeller } from '../../ContextAPI/SellerContext'; // Import Seller Context

const Login = () => {
  const { login } = useUser();
  const { loginSeller } = useSeller(); // Get Seller Login Function
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

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const sellers = JSON.parse(localStorage.getItem('sellers')) || [];

    const existingCustomer = users.find(user => user.email === email);
    const existingSeller = sellers.find(seller => seller.email === email);

    if (existingCustomer) {
      const isPasswordValid = bcrypt.compareSync(password, existingCustomer.password);
      if (!isPasswordValid) {
        setError('Invalid password!');
        return;
      }

      login(existingCustomer);
      toast.success('Customer Login Successful!');
      navigate('/'); // Redirect customer to home page
    } 
    else if (existingSeller) {
      const isPasswordValid = bcrypt.compareSync(password, existingSeller.password);
      if (!isPasswordValid) {
        setError('Invalid password!');
        return;
      }

      // Save seller in localStorage to track status
      localStorage.setItem('loggedInSeller', JSON.stringify(existingSeller));

      if (existingSeller.status === 'pending' || existingSeller.status === 'rejected') {
        toast.info('Seller approval is pending or rejected.');
        navigate('/seller-approval-status'); // Go to seller status page
        return;
      }

      if (existingSeller.isBlocked) {
        setError('Your seller account is blocked. Contact admin.');
        return;
      }

      loginSeller(existingSeller); // Save seller in seller context
      toast.success('Seller Login Successful!');
      navigate('/seller-dashboard'); // Go to seller dashboard
    } 
    else {
      setError('User not found!');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border border-pink-600 bg-pink-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-pink-600 bg-pink-50 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-pink-600 bg-pink-50 rounded"
        />
        <button type="submit" className="w-full bg-pink-500 text-white p-2 rounded hover:bg-pink-600">
          Login
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="mb-2">Are you a registered user?</p>
        <button
          onClick={() => navigate('/register')}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          No, Register Here
        </button>
      </div>
    </div>
  );
};

export default Login;
