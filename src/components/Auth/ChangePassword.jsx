import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [storedUser, setStoredUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
    } else {
      setStoredUser(user);
    }
  }, [navigate]);

  const handleChangePassword = (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error('All fields are required!');
      return;
    }

    if (oldPassword !== storedUser.password) {
      toast.error('Old password is incorrect!');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters!');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    const updatedUser = { ...storedUser, password: newPassword };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    toast.success('Password changed successfully!');
    navigate('/profile');
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border border-pink-600 bg-pink-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-pink-600">Change Password</h2>
      <form onSubmit={handleChangePassword} className="space-y-4">
        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full p-2 border border-pink-600 rounded bg-pink-50"
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 border border-pink-600 rounded bg-pink-50"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 border border-pink-600 rounded bg-pink-50"
        />
        <button type="submit" className="w-full bg-pink-500 text-white p-2 rounded hover:bg-pink-600">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
