import { useAuth } from "@/middleware/authContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const {isAuthenticated} = useAuth()

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;
