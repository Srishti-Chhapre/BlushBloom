import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import { CartProvider } from "./ContextAPI/CartContext"; // ✅ Correct import

import Home from "./components/Home/Home";
import CategoryPage from "./components/CategoryPage/CategoryPage";
import SearchResultsPage from "./components/SearchResultPage/SearchResultsPage";
import AboutUs from "./components/AboutUs/AboutUs";
import ContactUs from "./components/ContactUs/ContactUs";
import ProductPage from "./components/ProductPage/ProductPage";
import CartPage from "./components/CartPage/CartPage"; // If you have a cart page
import BuyNowPage from "./components/BuyNowPage/BuyNowPage";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider> {/* ✅ Wrap your entire app inside CartProvider */}
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} /> {/* Example route */}
          <Route path="/buy-now/:id" element={<BuyNowPage />} />
        </Routes>
      </HashRouter>
    </CartProvider>
  </React.StrictMode>
);
