import { Search, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef();

  // Fetch products
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}api/flowers.json`)
      .then((res) => res.json())
      .then((data) => setAllProducts(data.products));
  }, []);

  // Load recent searches from localStorage
  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    setRecentSearches(storedSearches);
  }, []);

  // Filter suggestions in real time
  useEffect(() => {
    if (query.trim() !== '') {
      const matches = allProducts
        .filter((product) =>
          product.title.toLowerCase().includes(query.trim().toLowerCase())
        )
        .slice(0, 5);
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  }, [query, allProducts]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() === '') return;

    const filteredProducts = allProducts.filter((product) =>
      product.title.toLowerCase().includes(query.trim().toLowerCase())
    );

    const updatedSearches = [query, ...recentSearches.filter((item) => item !== query)].slice(0, 5);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    setRecentSearches(updatedSearches);

    navigate(`/search?q=${encodeURIComponent(query.trim())}`, {
      state: { products: filteredProducts },
    });

    setQuery('');
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);

    const filteredProducts = allProducts.filter((product) =>
      product.title.toLowerCase().includes(suggestion.toLowerCase())
    );

    navigate(`/search?q=${encodeURIComponent(suggestion)}`, {
      state: { products: filteredProducts },
    });

    setShowSuggestions(false);
  };

  const handleClearRecent = () => {
    localStorage.removeItem('recentSearches');
    setRecentSearches([]);
  };

  // Hide suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={inputRef} className="relative w-80">
      <form
        onSubmit={handleSearch}
        className="flex items-center border border-gray-300 rounded-full px-4 py-2 w-full"
      >
        <input
          type="text"
          placeholder="Search for products..."
          className="flex-grow outline-none bg-transparent text-gray-700"
          value={query}
          onFocus={() => setShowSuggestions(true)}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="text-pink-600 hover:text-pink-800">
          <Search size={20} />
        </button>
      </form>

      {/* Suggestions Box */}
      {showSuggestions && (
        <div className="absolute bg-white border border-gray-300 rounded-lg mt-2 w-full shadow z-10 max-h-60 overflow-y-auto">
          {query.trim() === '' && recentSearches.length > 0 && (
            <>
              <div className="flex justify-between items-center p-2">
                <span className="font-medium text-gray-700">Recent Searches</span>
                <button onClick={handleClearRecent} className="text-xs text-gray-500 hover:text-red-500">
                  Clear All
                </button>
              </div>
              {recentSearches.map((item, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-pink-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(item)}
                >
                  {item}
                </div>
              ))}
            </>
          )}

          {query.trim() !== '' && suggestions.length > 0 && (
            <>
              <div className="flex justify-between items-center p-2">
                <span className="font-medium text-gray-700">Suggestions</span>
              </div>
              {suggestions.map((product) => (
                <div
                  key={product.id}
                  className="px-4 py-2 hover:bg-pink-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(product.title)}
                >
                  {product.title}
                </div>
              ))}
            </>
          )}

          {query.trim() !== '' && suggestions.length === 0 && (
            <div className="px-4 py-2 text-gray-500">No matches found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
