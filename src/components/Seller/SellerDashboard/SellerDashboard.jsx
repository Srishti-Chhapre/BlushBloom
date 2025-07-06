import { useEffect, useState } from 'react';
import { useSeller } from '../../../ContextAPI/SellerContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SellerDashboard = () => {
  const { seller, logoutSeller } = useSeller();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    if (!seller) {
      navigate('/seller-login');
      return;
    }

    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const sellerProducts = storedProducts.filter(product => product.sellerId === seller.id);
    setProducts(sellerProducts);

    const total = sellerProducts.reduce((acc, product) => acc + (product.salesCount || 0), 0);
    setTotalSales(total);
  }, [seller, navigate]);

  // Delete Product Function
  const handleDelete = (productId) => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const updatedProducts = storedProducts.filter(product => product.id !== productId);
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    const sellerProducts = updatedProducts.filter(product => product.sellerId === seller.id);
    setProducts(sellerProducts);

    toast.success('Product deleted successfully!');
  };

  // Toggle Product Active/Inactive
  const handleToggleStatus = (productId) => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const updatedProducts = storedProducts.map(product => {
      if (product.id === productId) {
        return { ...product, isActive: !product.isActive };
      }
      return product;
    });

    localStorage.setItem('products', JSON.stringify(updatedProducts));

    const sellerProducts = updatedProducts.filter(product => product.sellerId === seller.id);
    setProducts(sellerProducts);

    toast.info('Product status updated!');
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center bg-pink-500 text-white p-6 rounded-lg mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {seller?.businessName || 'Seller'}!</h1>
          <p className="text-lg mt-2">Total Sales: {totalSales} 🚀</p>
        </div>
        <button
          onClick={() => {
            logoutSeller();
            navigate('/seller-login');
          }}
          className="bg-white text-pink-600 px-4 py-2 rounded hover:bg-gray-100"
        >
          Logout
        </button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Your Products</h2>
        <button
          onClick={() => navigate('/seller/add-product')}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          + Add Product
        </button>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow p-4 flex flex-col justify-between">
              <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-4 rounded" />
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-pink-600 font-bold mb-2">₹{product.price}</p>
              <p className="mb-2 text-gray-600">Sales: {product.salesCount || 0}</p>

              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                  onClick={() => navigate(`/seller/edit-product/${product.id}`)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
                <button
                  className={`${
                    product.isActive ? 'bg-gray-400 hover:bg-gray-500' : 'bg-green-400 hover:bg-green-500'
                  } text-white px-3 py-1 rounded`}
                  onClick={() => handleToggleStatus(product.id)}
                >
                  {product.isActive ? 'Deactivate' : 'Activate'}
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
