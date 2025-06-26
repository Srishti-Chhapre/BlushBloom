import { Link } from 'react-router-dom';

const UserMenu = () => {
  const isLoggedIn = false; // Replace this with authentication check later

  return (
    <div className="text-gray-700">
      {isLoggedIn ? (
        <Link to="/profile" className="font-medium hover:text-pink-600">
          My Account
        </Link>
      ) : (
        <Link to="/login" className="font-medium hover:text-pink-600">
          Login / Register
        </Link>
      )}
    </div>
  );
};

export default UserMenu;
