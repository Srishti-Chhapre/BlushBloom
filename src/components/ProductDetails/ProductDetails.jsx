import { useState, useEffect } from "react";
import { Star, ShoppingCart, Truck } from "lucide-react";

const ProductDetails = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [sellerInfo, setSellerInfo] = useState(null);

  // Fetch seller information
  useEffect(() => {
    if (product?.sellerId) {
      fetch(`${import.meta.env.BASE_URL}api/sellers.json`)
        .then((res) => res.json())
        .then((data) => {
          const foundSeller = data.sellers.find((s) => s.id === product.sellerId);
          setSellerInfo(foundSeller);
        });
    }
  }, [product]);

  const handleAddToCart = () => {
    console.log("Added to cart", { product, quantity });
  };

  const handleBuyNow = () => {
    console.log("Buy now", { product, quantity });
  };

  if (!product) {
    return <div className="text-center mt-10 text-lg">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Product Image */}
      <div>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-96 object-cover rounded-3xl shadow-xl transition-transform hover:scale-105 duration-300"
        />
      </div>

      {/* Product Details */}
      <div className="space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
        <p className="text-2xl text-pink-600 font-semibold">₹{product.price}</p>
        <p className="text-sm text-gray-500">In Stock: {product.stock}</p>

        {/* Seller Info */}
        <div className="flex items-center space-x-2">
          <span className="font-medium text-gray-700">
            Sold by: {sellerInfo ? sellerInfo.name : "Loading Seller..."}
          </span>
          <span className="flex items-center text-yellow-500">
            <Star size={20} className="fill-yellow-500" /> {product.rating}
          </span>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            className="px-4 py-2 bg-gray-200 rounded-full text-lg hover:bg-gray-300 transition"
          >
            -
          </button>
          <span className="text-xl font-semibold">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-2 bg-gray-200 rounded-full text-lg hover:bg-gray-300 transition"
          >
            +
          </button>
        </div>

        {/* Delivery Date Picker */}
        <div className="flex items-center space-x-3">
          <Truck className="text-pink-500" />
          <input
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-6 mt-4">
          <button
            onClick={handleAddToCart}
            className="flex items-center px-8 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-transform hover:scale-105"
          >
            <ShoppingCart className="mr-2" /> Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="px-8 py-3 border border-pink-500 text-pink-500 rounded-full hover:bg-pink-50 transition-transform hover:scale-105"
          >
            Buy Now
          </button>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-2xl font-semibold mt-6 mb-2">Product Description</h2>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
        </div>

        {/* Customer Reviews */}
        {product.reviews?.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
            <div className="space-y-6">
              {product.reviews.map((r, i) => (
                <div
                  key={i}
                  className="border border-gray-200 p-4 rounded-2xl shadow flex space-x-4 bg-white hover:shadow-lg transition"
                >
                  <img
                    src={r.avatar}
                    alt={r.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-800">{r.name}</p>
                    <div className="flex items-center mb-1">
                      <span className="text-yellow-500 mr-1">★</span> {r.rating}
                    </div>
                    <p className="text-gray-600">{r.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
