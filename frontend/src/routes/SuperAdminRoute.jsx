import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function SuperAdminRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/admin" replace />;
  }

  return children;
}

export default SuperAdminRoute;