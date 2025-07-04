import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const BuyNowPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}api/flowers.json`)
      .then((res) => res.json())
      .then((data) => {
        const foundProduct = data.products.find((item) => item.id === Number(id));
        setProduct(foundProduct);
      });
  }, [id]);

  const handleOrder = () => {
    if (!address || !phone) {
      alert('Please fill all details');
      return;
    }
    console.log('Order Placed:', { product, address, phone });
    alert('Order placed successfully!');
    // You can navigate to Thank You page here
  };

  if (!product) return <div className="text-center mt-10 text-lg">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Complete Your Purchase</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Product Preview */}
        <div className="md:w-1/2">
          <img src={product.image} alt={product.title} className="w-full h-64 object-cover rounded" />
          <h2 className="text-xl font-semibold mt-4">{product.title}</h2>
          <p className="text-pink-600 font-bold text-lg mt-2">₹{product.price}</p>
        </div>

        {/* Address Form */}
        <div className="md:w-1/2 space-y-4">
          <div>
            <label className="block mb-2 font-medium">Delivery Address:</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border rounded"
              rows="4"
              placeholder="Enter your shipping address"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Contact Number:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your contact number"
            />
          </div>

          <button
            onClick={handleOrder}
            className="bg-pink-500 text-white px-6 py-3 rounded hover:bg-pink-600"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyNowPage;
