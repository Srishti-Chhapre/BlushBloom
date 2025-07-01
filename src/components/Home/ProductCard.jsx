import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductCard = () => {
  const [data, setData] = useState([]);

  const getData = () => {
    fetch(`${import.meta.env.BASE_URL}api/flowers.json`)
      .then((response) => response.json())
      .then((data) => setData(data.products));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-gradient-to-r from-pink-200 to-pink-400 py-8">
      <h1 className="text-center text-3xl font-bold text-pink-600 mb-8">
        Our Freshest Picks for You
      </h1>
      <div className="flex flex-wrap gap-6 justify-center">
        {data.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`} className="w-72">
            <div className="bg-white rounded-lg shadow-lg w-72 p-4 flex flex-col items-center cursor-pointer">
              <div className="w-full flex justify-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-48 object-cover rounded-md mb-4 w-full"
                />
              </div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2 text-center">{product.title}</h2>
              <p className="text-gray-600 text-center mb-4">{product.description}</p>
              <div className="flex gap-1">
                <button className="bg-pink-500 hover:bg-pink-600 text-white px-2 py-1 rounded cursor-pointer">
                  Buy Now - ₹{product.price}
                </button>
                <button className="bg-pink-500 hover:bg-pink-600 text-white px-2 py-1 rounded cursor-pointer">
                  Add to Cart
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
