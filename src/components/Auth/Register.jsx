import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [userType, setUserType] = useState('customer');
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    gstNumber: '',
    document: ''
  });

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

    if (!user.name || !user.email || !user.password || !user.confirmPassword) {
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

    if (userType === 'customer') {
      if (!user.phone || !user.address) {
        setError('Phone number and address are required for customers!');
        return;
      }

      const existingUser = JSON.parse(localStorage.getItem('user'));
      if (existingUser && existingUser.email === user.email) {
        setError('User already exists!');
        return;
      }

      const hashedPassword = bcrypt.hashSync(user.password, 10);
      const userData = {
        userType: 'customer',
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        password: hashedPassword
      };

      localStorage.setItem('user', JSON.stringify(userData));
      toast.success('Customer Registered Successfully!');
      navigate('/login');

    } else if (userType === 'seller') {
      if (!user.businessName || !user.gstNumber) {
        setError('Business Name and GST Number are required for sellers!');
        return;
      }

      const sellers = JSON.parse(localStorage.getItem('sellers')) || [];
      if (sellers.find(seller => seller.email === user.email)) {
        setError('Seller already exists!');
        return;
      }

      const hashedPassword = bcrypt.hashSync(user.password, 10);
      const sellerData = {
        userType: 'seller',
        name: user.name,
        email: user.email,
        password: hashedPassword,
        businessName: user.businessName,
        gstNumber: user.gstNumber,
        document: user.document,
        status: 'Pending' 
      };

      sellers.push(sellerData);
      localStorage.setItem('sellers', JSON.stringify(sellers));
      toast.success('Seller Registered Successfully! Await Admin Approval.');
      navigate('/login');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border border-pink-600 bg-pink-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 mr-2 rounded ${userType === 'customer' ? 'bg-pink-500 text-white' : 'bg-gray-300 text-gray-700 border-none'}`}
          onClick={() => setUserType('customer')}
        >
          Customer
        </button>
        <button
          className={`px-4 py-2 rounded ${userType === 'seller' ? 'bg-pink-500 text-white' : 'bg-gray-300 text-gray-700 border-none'}`}
          onClick={() => setUserType('seller')}
        >
          Seller
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Name" value={user.name} onChange={handleChange} className="w-full p-2 border border-pink-600 bg-pink-50 rounded" />
        <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} className="w-full p-2 border border-pink-600 bg-pink-50 rounded" />

        {/* Customer Fields */}
        {userType === 'customer' && (
          <>
            <input type="text" name="phone" placeholder="Phone Number" value={user.phone} onChange={handleChange} className="w-full p-2 border border-pink-600 bg-pink-50 rounded" />
            <input type="text" name="address" placeholder="Address" value={user.address} onChange={handleChange} className="w-full p-2 border border-pink-600 bg-pink-50 rounded" />
          </>
        )}

        {/* Seller Fields */}
        {userType === 'seller' && (
          <>
            <input type="text" name="businessName" placeholder="Business Name" value={user.businessName} onChange={handleChange} className="w-full p-2 border border-pink-600 bg-pink-50 rounded" />
            <input type="text" name="gstNumber" placeholder="GST Number" value={user.gstNumber} onChange={handleChange} className="w-full p-2 border border-pink-600 bg-pink-50 rounded" />
            <input type="text" name="document" placeholder="Document Link (Optional)" value={user.document} onChange={handleChange} className="w-full p-2 border border-pink-600 bg-pink-50 rounded" />
          </>
        )}

        <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} className="w-full p-2 border border-pink-600 bg-pink-50 rounded" />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={user.confirmPassword} onChange={handleChange} className="w-full p-2 border border-pink-600 bg-pink-50 rounded" />

        <button type="submit" className="w-full bg-pink-500 text-white p-2 rounded hover:bg-pink-600">
          Register as {userType === 'customer' ? 'Customer' : 'Seller'}
        </button>
      </form>
    </div>
  );
};

export default Register;
