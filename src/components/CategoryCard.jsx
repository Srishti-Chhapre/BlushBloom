import { useEffect, useState } from "react";

const CategoryCard = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    fetch("./api/flowers.json")
      .then((response) => response.json())
      .then((data) => setCategories(data.products));
  };

  useEffect(() => {
    getCategories();
  }, []);

  // Get unique categories with first product image per category
  const uniqueCategories = [];
  const categoryMap = new Map();

  categories.forEach((product) => {
    if (!categoryMap.has(product.category)) {
      categoryMap.set(product.category, product);
      uniqueCategories.push(product);
    }
  });

  return (
    <>
      <div className="bg-pink-100 py-6">
        <h1 className="text-center text-2xl font-bold mb-6 text-gray-800">Shop by Category</h1>
        <div className="flex flex-wrap gap-4 justify-center">
          {uniqueCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-lg overflow-hidden w-72">
              <img src={category.image} alt={category.category} className="w-full h-48 object-cover" />
              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold mb-2 text-pink-600 uppercase">{category.category}</h2>
                <p className="text-gray-600 text-sm">Explore our fresh {category.category} flowers.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryCard;
