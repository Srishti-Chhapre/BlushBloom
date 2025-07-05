import { Link } from 'react-router-dom';
import { XCircle } from 'lucide-react';

const PaymentFailure = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-50">
      <XCircle size={100} className="text-red-600 mb-6" />
      <h1 className="text-4xl font-bold text-red-700 mb-4">Payment Failed!</h1>
      <p className="text-gray-700 mb-6">Oops! Something went wrong. Please try again later.</p>
      <Link
        to="/cart"
        className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
      >
        Back to Cart
      </Link>
    </div>
  );
};

export default PaymentFailure;
