import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";

import Home from "./components/Home/Home";
import CategoryPage from "./components/CategoryPage/CategoryPage";
import SearchResultsPage from "./components/SearchResultPage/SearchResultsPage";
import AboutUs from "./components/AboutUs/AboutUs";
import ContactUs from "./components/ContactUs/ContactUs";
import ProductPage from "./components/ProductPage/ProductPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/categories",
    element: <CategoryPage />,
  },
  {
    path: "/search",
    element: <SearchResultsPage />,
  },
  {
    path: "/about",
    element: <AboutUs />,
  },
  {
    path: "/contact",
    element: <ContactUs />,
  },
  {
    path: "/product/:id",
    element: <ProductPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
