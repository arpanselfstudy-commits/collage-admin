import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const ProtectedRoute = () => {
  const isLoggedIn = useSelector((state: RootState) => state.authSlice.isLoggedIn);
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const isAuthenticated = isLoggedIn || !!token;

  // Push a history entry so the back button can't go back to protected pages
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
