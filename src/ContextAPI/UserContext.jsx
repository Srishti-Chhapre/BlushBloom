import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading flag

  // Load user from localStorage on first mount
useEffect(() => {
  try {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  } catch (err) {
    console.error('Error loading user from localStorage:', err);
    localStorage.removeItem('user');
  } finally {
    setLoading(false); // ✅ Let the rest of the app render
  }
}, []);

  // 🔐 Login and persist full user data
  const login = (userData) => {
    console.log("Logging in and saving user:", userData);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userData.token); // ⬅️ Save token separately
  };

  // 🚪 Logout and clear everything
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
