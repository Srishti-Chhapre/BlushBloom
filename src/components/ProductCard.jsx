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
 <>
 <div>
  <div className="bg-gradient-to-r from-pink-200 to-pink-400 py-8">
    <h1 className="text-center text-3xl font-bold text-pink-600 mb-8">
      Our Freshest Picks for You
    </h1>
    <ol className="flex flex-wrap gap-6 justify-center">
      {data.map((product) => (
        <li key={product.id} className="bg-white rounded-lg shadow-lg w-72 p-4 flex flex-col items-center">
          <div className="w-full flex justify-center">
          <img
            src={product.image}
            alt={product.title}
            className=" h-48 object-cover rounded-md mb-4 w-full"
          />
          </div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2 text-center">{product.title}</h2>
          <p className="text-gray-600 text-center mb-4">{product.description}</p>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
            Buy Now - ₹{product.price}
          </button>
        </li>
      ))}
    </ol>
  </div>
  </div>
</>

  );
};

export default ProductCard;
