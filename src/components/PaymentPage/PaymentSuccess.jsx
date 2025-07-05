import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const PaymentSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-50">
      <CheckCircle size={100} className="text-green-600 mb-6" />
      <h1 className="text-4xl font-bold text-green-700 mb-4">Payment Successful!</h1>
      <p className="text-gray-700 mb-6">Thank you for your purchase. Your order has been placed successfully.</p>
      <Link
        to="/"
        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default PaymentSuccess;
