import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { useAuthContext } from "../context/AuthContext";

const ProtectedRoute = () => {
  const {isLogin} = useAuthContext()

  if (!isLogin) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;