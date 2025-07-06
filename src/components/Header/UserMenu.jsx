
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../ContextAPI/UserContext';
import { User } from 'lucide-react';

const UserMenu = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="text-gray-700">
      {user ? (
        <div className="flex items-center gap-3">
          <User className="text-pink-600" />
          <Link to="/profile" className="font-medium hover:text-pink-600">
            {user.name}
          </Link>
          <button
            onClick={handleLogout}
            className="font-medium bg-pink-500 text-white p-1 py-1.5 rounded hover:bg-pink-600"
          >
            Logout
          </button>
        </div>
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
