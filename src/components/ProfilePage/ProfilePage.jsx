import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!storedUser || !isLoggedIn) {
      navigate("/login"); // Redirect if not logged in
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    return <div className="text-center mt-10 text-lg">Loading Profile...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border border-pink-600 bg-pink-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-pink-600">
        My Profile
      </h2>

      <div className="space-y-4">
        <div>
          <strong>Name:</strong> {user.name}
        </div>
        <div>
          <strong>Email:</strong> {user.email}
        </div>
        <div>
          <strong>Phone:</strong> {user.phone}
        </div>
        <div>
          <strong>Address:</strong> {user.address}
        </div>
      </div>
      <div className="flex space-x-4 mt-4">
        <button
          onClick={() => navigate("/edit-profile")}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Edit Profile
        </button>
        <button
          onClick={() => navigate("/change-password")}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Change Password
        </button>
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 w-full bg-pink-500 text-white p-2 rounded hover:bg-pink-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
