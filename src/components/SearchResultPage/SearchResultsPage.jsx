import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const SearchResultsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q") || "";

  // Get passed products from state
  const products = location.state?.products || [];

  // Seller data
  const [sellers, setSellers] = useState([]);

  // Fetch seller info
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}api/sellers.json`)
      .then((res) => res.json())
      .then((data) => setSellers(data.sellers));
  }, []);

  // Find seller by sellerId
  const getSellerName = (sellerId) => {
    const seller = sellers.find((s) => s.id === sellerId);
    return seller ? seller.name : "Unknown Seller";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Search Results for: <span className="text-pink-500">"{query}"</span>
      </h1>

      {products.length > 0 ? (
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
              <p className="text-sm text-gray-600 mb-4">
                <span className="font-bold">Seller: </span> {getSellerName(product.sellerId)}
              </p>
              <div className="flex gap-1">
                <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 cursor-pointer">
                  Buy Now
                </button>
                <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 cursor-pointer">
                  Add to Cart
                </button>
              </div>
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
