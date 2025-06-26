import { useEffect, useState } from "react";

const SellerCard = () => {
  const [sellers, setSellers] = useState([]);

  const getSellers = () => {
    fetch(`${import.meta.env.BASE_URL}api/sellers.json`)
      .then((response) => response.json())
      .then((data) => setSellers(data.sellers));
  };

  useEffect(() => {
    getSellers();
  }, []);

  return (
    <>
      <div className="bg-pink-100 py-6 bg-gradient-to-r from-pink-200 to-pink-400">
        <h1 className="text-center text-2xl font-bold mb-6 text-gray-800 uppercase">
          Meet Our Trusted Sellers
        </h1>
        <div className="flex flex-wrap gap-4 justify-center">
          {sellers.map((seller) => (
            <div key={seller.id} className="bg-white rounded-lg shadow-lg overflow-hidden w-72">
              <img src={seller.image} alt={seller.name} className="w-full h-48 object-cover" />
              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold mb-2 text-pink-600">{seller.name}</h2>
                <p className="text-gray-600 text-sm mb-2">{seller.description}</p>
                <p className="text-gray-500 text-sm">📍 {seller.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SellerCard;
