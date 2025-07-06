import { useState } from "react";
import { useCart } from "../../ContextAPI/CartContext"; // adjust the path as per your project
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const [shippingDetails, setShippingDetails] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
  };

  const handlePayment = () => {
    const { fullName, address, city, postalCode, phone } = shippingDetails;

    if (!fullName || !address || !city || !postalCode || !phone) {
      setError("Please fill all the fields.");
      return;
    }
    if (paymentSuccess) {
      navigate("/payment-success");
    } else {
      navigate("/payment-failure");
    }
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">
        Checkout
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Shipping Details */}
        <div className="bg-pink-50 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="space-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={shippingDetails.fullName}
              onChange={handleChange}
              className="w-full p-3 border-2 border-pink-600 rounded-lg"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={shippingDetails.address}
              onChange={handleChange}
              className="w-full p-3 border-2 border-pink-600 rounded-lg"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={shippingDetails.city}
              onChange={handleChange}
              className="w-full p-3 border-2 border-pink-600 rounded-lg"
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={shippingDetails.postalCode}
              onChange={handleChange}
              className="w-full p-3 border-2 border-pink-600 rounded-lg"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={shippingDetails.phone}
              onChange={handleChange}
              className="w-full p-3 border-2 border-pink-600 rounded-lg"
            />
            <button
              onClick={handlePayment}
              className="w-full bg-pink-600 text-white p-3 rounded-lg hover:bg-pink-700"
            >
              Proceed to Payment
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {cart.length > 0 ? (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="text-pink-600 font-semibold">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
              <div className="flex justify-between font-bold text-lg mt-4">
                <span>Total</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
