import { useAuth } from "@/middleware/authContext";
import { Navigate, Outlet } from "react-router-dom";

const NotProtectedRoute = () => {
  const {isAuthenticated} = useAuth()

  return !isAuthenticated ? <Outlet /> : <Navigate to="/admin" />;
};

export default NotProtectedRoute;
