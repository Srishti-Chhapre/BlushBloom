// src/ContextAPI/SellerContext.jsx
import { createContext, useContext, useState } from "react";

const SellerContext = createContext();

export const SellerProvider = ({ children }) => {
  const [seller, setSeller] = useState(JSON.parse(localStorage.getItem('loggedInSeller')) || null);

  const loginSeller = (sellerData) => {
    setSeller(sellerData);
    localStorage.setItem('loggedInSeller', JSON.stringify(sellerData));
  };

  const logoutSeller = () => {
    setSeller(null);
    localStorage.removeItem('loggedInSeller');
  };

  return (
    <SellerContext.Provider value={{ seller, loginSeller, logoutSeller }}>
      {children}
    </SellerContext.Provider>
  );
};

export const useSeller = () => useContext(SellerContext);
