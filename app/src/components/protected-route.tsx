import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const [authenticated] = useState(localStorage.getItem('token'));

  return authenticated ? <Outlet /> : <Navigate to="/admin" />;
};

export default ProtectedRoute;
