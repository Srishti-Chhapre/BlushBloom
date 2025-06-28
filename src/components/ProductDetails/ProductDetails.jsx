import { useState } from "react";
import { Star, ShoppingCart, Truck } from "lucide-react";

const ProductDetails = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [deliveryDate, setDeliveryDate] = useState("");

  const handleAddToCart = () => {
    // Add your cart logic here
    console.log("Added to cart", { product, quantity });
  };

  const handleBuyNow = () => {
    // Buy now logic here
    console.log("Buy now", { product, quantity });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Image Carousel */}
      <div>
        <img
          src={selectedImage}
          alt={product.name}
          className="w-full h-96 object-cover rounded-2xl shadow-lg"
        />
        <div className="flex space-x-4 mt-4 overflow-x-auto">
          {product.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Thumbnail ${idx}`}
              className={`w-20 h-20 object-cover rounded-xl cursor-pointer border-2 ${
                selectedImage === img ? "border-pink-500" : "border-gray-300"
              }`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-xl text-pink-600 font-semibold">₹{product.price}</p>
        <p className="text-sm text-gray-600">Stock: {product.stock}</p>

        {/* Seller Info */}
        <div className="flex items-center space-x-2">
          <span className="font-medium">Sold by: {product.seller}</span>
          <span className="flex items-center text-yellow-500">
            <Star size={18} className="fill-yellow-500" /> {product.rating}
          </span>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            className="px-3 py-1 bg-gray-200 rounded-full text-lg"
          >
            -
          </button>
          <span className="text-lg">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 py-1 bg-gray-200 rounded-full text-lg"
          >
            +
          </button>
        </div>

        {/* Delivery Date Picker */}
        <div className="flex items-center space-x-2">
          <Truck className="text-pink-500" />
          <input
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            className="border p-2 rounded-lg"
          />
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={handleAddToCart}
            className="flex items-center px-6 py-3 bg-pink-500 text-white rounded-2xl hover:bg-pink-600 transition"
          >
            <ShoppingCart className="mr-2" /> Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="px-6 py-3 border border-pink-500 text-pink-500 rounded-2xl hover:bg-pink-50 transition"
          >
            Buy Now
          </button>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-xl font-semibold mt-6">Product Description</h2>
          <p className="text-gray-700 mt-2">{product.description}</p>
        </div>

        {/* Customer Reviews (Optional) */}
        {product.reviews?.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-2">Customer Reviews</h2>
            <div className="space-y-4">
              {product.reviews.map((r, i) => (
                <div
                  key={i}
                  className="border p-4 rounded-lg shadow-sm flex space-x-4"
                >
                  <img
                    src={r.avatar}
                    alt={r.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{r.name}</p>
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span> {r.rating}
                    </div>
                    <p className="text-gray-700 mt-1">{r.comment}</p>
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
