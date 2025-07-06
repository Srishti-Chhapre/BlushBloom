import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSeller } from '../../../ContextAPI/SellerContext';
import { toast } from 'react-toastify';

const AddProductPage = () => {
  const { seller } = useSeller();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const handleAddProduct = (e) => {
    e.preventDefault();

    if (!title || !price || !image) {
      toast.error('All fields are required!');
      return;
    }

    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];

    const newProduct = {
      id: Date.now(), // Unique ID
      title,
      price: parseFloat(price),
      image,
      sellerId: seller.id,
      salesCount: 0,
      isActive: true,
    };

    const updatedProducts = [...storedProducts, newProduct];
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    toast.success('Product added successfully!');
    navigate('/seller-dashboard');
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border border-pink-600 bg-pink-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>

      <form onSubmit={handleAddProduct} className="space-y-4">
        <input
          type="text"
          placeholder="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-pink-600 bg-white rounded"
        />
        <input
          type="number"
          placeholder="Product Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border border-pink-600 bg-white rounded"
        />
        <input
          type="text"
          placeholder="Product Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full p-2 border border-pink-600 bg-white rounded"
        />

        <button type="submit" className="w-full bg-pink-500 text-white p-2 rounded hover:bg-pink-600">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
