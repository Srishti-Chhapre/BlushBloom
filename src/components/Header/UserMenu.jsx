import { Link } from 'react-router-dom';
import { User } from 'lucide-react';

const UserMenu = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  return (
    <div className="text-gray-700">
      {isLoggedIn ? (
        <Link to="/profile" className="flex items-center hover:text-pink-600">
          <User size={24} />
        </Link>
      ) : (
        <div className="flex gap-1.5">
          <Link to="/login" className="font-medium bg-pink-500 p-1 py-1.5 text-white rounded-sm">
            Login
          </Link>
          <Link to="/register" className="font-medium bg-pink-500 p-1 py-1.5 text-white rounded-sm">
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
