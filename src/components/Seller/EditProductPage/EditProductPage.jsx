import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const existingProduct = storedProducts.find((item) => item.id === parseInt(id));

    if (existingProduct) {
      setProduct(existingProduct);
    } else {
      toast.error('Product not found!');
      navigate('/seller-dashboard');
    }
  }, [id, navigate]);

  const handleUpdateProduct = (e) => {
    e.preventDefault();

    if (!product.title || !product.price || !product.image) {
      toast.error('All fields are required!');
      return;
    }

    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const updatedProducts = storedProducts.map((item) =>
      item.id === parseInt(id) ? product : item
    );

    localStorage.setItem('products', JSON.stringify(updatedProducts));
    toast.success('Product updated successfully!');
    navigate('/seller-dashboard');
  };

  if (!product) {
    return <div className="text-center mt-20 text-lg">Loading product...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border border-pink-600 bg-pink-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Product</h2>

      <form onSubmit={handleUpdateProduct} className="space-y-4">
        <input
          type="text"
          placeholder="Product Title"
          value={product.title}
          onChange={(e) => setProduct({ ...product, title: e.target.value })}
          className="w-full p-2 border border-pink-600 bg-white rounded"
        />
        <input
          type="number"
          placeholder="Product Price"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
          className="w-full p-2 border border-pink-600 bg-white rounded"
        />
        <input
          type="text"
          placeholder="Product Image URL"
          value={product.image}
          onChange={(e) => setProduct({ ...product, image: e.target.value })}
          className="w-full p-2 border border-pink-600 bg-white rounded"
        />

        <button type="submit" className="w-full bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
