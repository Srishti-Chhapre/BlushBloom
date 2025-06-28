import { Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center border border-gray-300 rounded-full px-4 py-2 w-80"
    >
      <input
        type="text"
        placeholder="Search for products..."
        className="flex-grow outline-none bg-transparent text-gray-700"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="text-pink-600 hover:text-pink-800">
        <Search size={20} />
      </button>
    </form>
  );
};

export default SearchBar;
