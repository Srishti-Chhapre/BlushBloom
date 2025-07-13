import { useUser } from "../../ContextAPI/UserContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUser();

  if (loading) return <div className="text-center mt-10 text-lg">Loading...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
