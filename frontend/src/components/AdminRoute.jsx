import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Allow both Admin and Sub Admin
  if (
    user.role !== "admin" &&
    user.role !== "subadmin"
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default AdminRoute;