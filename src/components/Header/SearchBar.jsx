import { Search } from 'lucide-react';

const SearchBar = () => {
  return (
    <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 w-80">
      <input
        type="text"
        placeholder="Search for products..."
        className="flex-grow outline-none bg-transparent text-gray-700"
      />
      <button className="text-pink-600 hover:text-pink-800">
        <Search size={20} />
      </button>
    </div>
  );
};

export default SearchBar;
