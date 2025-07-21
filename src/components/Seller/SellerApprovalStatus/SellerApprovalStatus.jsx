// src/pages/SellerApprovalStatus.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../../api/authApi";

const SellerApprovalStatus = () => {
  const [approvalStatus, setApprovalStatus] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  console.log("SellerApprovalStatus mounted");
  useEffect(() => {
    const pendingEmail = localStorage.getItem("pendingSellerEmail");
    setEmail(pendingEmail);

    const fetchStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await getUserProfile(token);
        const user = res.data;

        if (user?.userType === "seller") {
          setApprovalStatus(user.approvalStatus);
        }
      } catch (error) {
        console.error("Failed to fetch approval status", error);
      }
    };

    fetchStatus();
  }, []);

  const handleLoginRedirect = () => {
    localStorage.removeItem("pendingSellerEmail");
    navigate("/seller-dashboard");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-50">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-md w-full text-center border-2 border-pink-400">
        <img
          src="https://i.gifer.com/ZZ5H.gif"
          alt="Loading"
          className="mx-auto mb-4 w-24"
        />

        {approvalStatus === "approved" ? (
          <>
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              🎉 Your account has been approved!
            </h2>
            <p className="text-gray-700 mb-4">
              Please click below to login and access your seller dashboard.
            </p>
            <button
              onClick={handleLoginRedirect}
              className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded"
            >
              Login Now
            </button>
          </>
        ) : approvalStatus === "rejected" ? (
          <>
            <h2 className="text-xl font-semibold text-red-600 mb-2">
              ❌ Your seller account was rejected.
            </h2>
            <p className="text-gray-700">
              Please contact support or register again with different details.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-yellow-600 mb-2">
              ⏳ Approval Pending
            </h2>
            <p className="text-gray-700">
              Hello <span className="font-medium">{email}</span>, your seller
              account is under review. Please wait while the admin approves your
              account.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default SellerApprovalStatus;
