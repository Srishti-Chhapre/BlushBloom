import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import Home from './components/Home/Home';
import CategoryPage from './components/CategoryPage/CategoryPage';

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/categories", element: <CategoryPage /> }
  
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
