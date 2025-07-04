import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [sellers, setSellers] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [selectedSeller, setSelectedSeller] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  // Fetch products and sellers
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}api/flowers.json`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products));

    fetch(`${import.meta.env.BASE_URL}api/sellers.json`)
      .then((res) => res.json())
      .then((data) => setSellers(data.sellers));
  }, []);

  // Extract unique categories from products
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  // Filtering Logic
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    const matchesPrice =
      priceRange === "All" ||
      (priceRange === "Low" && product.price <= 500) ||
      (priceRange === "Medium" &&
        product.price > 500 &&
        product.price <= 1500) ||
      (priceRange === "High" && product.price > 1500);

    const matchesSeller =
      selectedSeller === "All" || product.sellerId === selectedSeller;

    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesPrice && matchesSeller && matchesSearch;
  });

  // Reset Filters
  const resetFilters = () => {
    setSelectedCategory("All");
    setPriceRange("All");
    setSelectedSeller("All");
    setSearchTerm("");
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-pink-600 mb-8">
        Shop by Category
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap justify-between mb-6 gap-4">
        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded-lg"
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Price Filter */}
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="All">All Prices</option>
          <option value="Low">Below ₹500</option>
          <option value="Medium">₹500 - ₹1500</option>
          <option value="High">Above ₹1500</option>
        </select>

        {/* Seller Filter */}
        <select
          value={selectedSeller}
          onChange={(e) => setSelectedSeller(Number(e.target.value))}
          className="p-2 border rounded-lg"
        >
          <option value="All">All Sellers</option>
          {sellers.map((seller) => (
            <option key={seller.id} value={seller.id}>
              {seller.name}
            </option>
          ))}
        </select>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-lg flex-grow"
        />

        {/* Reset Button */}
        <button
          onClick={resetFilters}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Reset Filters
        </button>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow p-4 cursor-pointer hover:scale-105 transition"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
              <p className="text-pink-600 font-bold mb-2">₹{product.price}</p>
              <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">
                View Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products found.</p>
      )}
    </div>
  );
};

export default CategoryPage;
