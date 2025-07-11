import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SellerApprovalStatus = () => {
  const [seller, setSeller] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const sellerEmail = localStorage.getItem("pendingSellerEmail");

    if (sellerEmail) {
      const sellers = JSON.parse(localStorage.getItem("sellers")) || [];
      const foundSeller = sellers.find((s) => s.email === sellerEmail);
      setSeller(foundSeller);
    } else {
      // No email found, redirect to home
      navigate("/");
    }
  }, [navigate]);

  if (!seller) {
    return <div className="text-center mt-20 text-lg">Loading seller details...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border border-pink-600 bg-pink-50 rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold mb-4">Seller Approval Status</h2>

      {seller.status === "approved" ? (
        <div className="flex flex-col items-center text-green-600 text-lg font-semibold mb-4">
          <p className="mb-4">✅ Your request has been approved by the admin!</p>
          <img
            src="https://media.giphy.com/media/111ebonMs90YLu/giphy.gif"
            alt="Approved"
            className="w-32 h-32"
          />
          <button
            onClick={() => navigate("/login")}
            className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600"
          >
            Login Now
          </button>
        </div>
      ) : seller.status === "rejected" ? (
        <div className="flex flex-col items-center text-red-600 text-lg font-semibold mb-4">
          <p className="mb-4">❌ Your request has been rejected by the admin.</p>
          <img
            src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
            alt="Rejected"
            className="w-32 h-32"
          />
          <button
            onClick={() => navigate("/")}
            className="mt-6 bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600"
          >
            Go to Home
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center text-yellow-600 text-lg font-semibold mb-4">
          <p className="mb-4">⏳ Your request is still pending. Please wait for admin approval.</p>
          <img
            src="https://media.giphy.com/media/y1ZBcOGOOtlpC/giphy.gif"
            alt="Pending Approval"
            className="w-32 h-32"
          />
          <button
            onClick={() => navigate("/")}
            className="mt-6 bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600"
          >
            Go to Home
          </button>
        </div>
      )}

      <div className="mt-6">
        <p className="text-gray-600">Business Name: {seller.businessName}</p>
        <p className="text-gray-600">Email: {seller.email}</p>
      </div>
    </div>
  );
};

export default SellerApprovalStatus;
