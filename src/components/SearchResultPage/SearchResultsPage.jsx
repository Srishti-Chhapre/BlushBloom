import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SearchResultsPage = () => {
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  // Get query from URL
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';

  // Fetch all products
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}api/flowers.json`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);

        // Filter products based on search query
        const filtered = data.products.filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filtered);
      });
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8 ">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Search Results for: <span className="text-pink-500">"{query}"</span>
      </h1>

      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((product) => (
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
      ) : (
        <p className="text-center text-gray-500">No results found.</p>
      )}
    </div>
  );
};

export default SearchResultsPage;
