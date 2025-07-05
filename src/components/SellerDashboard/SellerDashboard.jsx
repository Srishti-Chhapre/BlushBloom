import { useEffect, useState } from 'react';
import { useSeller } from '../../ContextAPI/SellerContext';
import { useNavigate } from 'react-router-dom';

const SellerDashboard = () => {
  const { seller } = useSeller();
  const navigate = useNavigate();
  const [totalSales, setTotalSales] = useState(0);
  const [products, setProducts] = useState([]);

  // Dummy fetch for seller products (replace with seller-specific API later)
  useEffect(() => {
    if (!seller) {
      navigate('/seller-login');
      return;
    }

    fetch(`${import.meta.env.BASE_URL}api/flowers.json`)
      .then((res) => res.json())
      .then((data) => {
        const sellerProducts = data.products.filter(product => product.sellerId === seller.id);
        setProducts(sellerProducts);
        // Assuming each product has a salesCount field for total sales calculation
        const total = sellerProducts.reduce((acc, product) => acc + (product.salesCount || 0), 0);
        setTotalSales(total);
      });
  }, [seller, navigate]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-pink-500 text-white p-6 rounded-lg mb-8">
        <h1 className="text-3xl font-bold">Welcome, {seller?.businessName || 'Seller'}!</h1>
        <p className="text-lg mt-2">You have a total of {totalSales} sales 🚀</p>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Your Listed Products</h2>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow p-4">
              <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-4 rounded" />
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-pink-600 font-bold mb-2">₹{product.price}</p>
              <div className="flex justify-between mt-4">
                <button
                  className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500"
                  onClick={() => navigate(`/seller/edit-product/${product.id}`)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => navigate(`/seller/delete-product/${product.id}`)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No products listed yet.</p>
      )}
    </div>
  );
};

export default SellerDashboard;
