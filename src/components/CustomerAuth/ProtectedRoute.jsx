// src/components/Auth/ProtectedRoute.jsx
import { useUser } from "../../ContextAPI/UserContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUser();

  if (loading) {
    return <div className="text-center mt-10 text-lg">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const path = window.location.pathname;

  // If seller is unapproved and trying to access seller routes
  if (
    path.startsWith("/seller") &&
    user.userType === "seller" &&
    user.approvalStatus !== "approved"
  ) {
    return <Navigate to="/seller-approval-status" replace />;
  }

  // If admin logs in, let them access admin dashboard
  if (path.startsWith("/admin-dashboard") && user.userType !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
