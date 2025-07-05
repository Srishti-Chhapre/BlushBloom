import { Link, useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';

const UserMenu = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    alert('Logged out!');
    navigate('/login');
  };

  return (
    <div className="text-gray-700">
      {isLoggedIn ? (
        <div className="flex items-center gap-4">
          <Link to="/profile" className="hover:text-pink-600">
            <User size={24} />
          </Link>
          <button
            onClick={handleLogout}
            className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Link
            to="/login"
            className="font-medium bg-pink-500 p-2 text-white rounded hover:bg-pink-600"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="font-medium bg-pink-500 p-2 text-white rounded hover:bg-pink-600"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
