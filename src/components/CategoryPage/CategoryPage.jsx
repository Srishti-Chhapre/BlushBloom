import { useEffect, useState } from 'react';
import SidebarFilter from '../Filters/SidebarFilter';

const CategoryPage = () => {
  const [products, setProducts] = useState([]);

  // Fetching from mock API
  useEffect(() => {
    fetch('/api/flowers.json')
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  return (
    <div className="container mx-auto px-4  flex gap-8">
      {/* Sidebar Filters */}
      <SidebarFilter />

      {/* Main Product Section */}
      <main className="w-3/4 overflow-y-auto py-8">
        {/* Sorting Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">All Products</h2>
          <select className="border border-gray-300 rounded px-2 py-1">
            <option value="low-high">Price: Low to High</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow p-4">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
              <p className="text-pink-600 font-bold mb-2">₹{product.price}</p>
              <p className="text-sm text-gray-600 mb-4">Seller: {product.seller}</p>
              <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CategoryPage;
