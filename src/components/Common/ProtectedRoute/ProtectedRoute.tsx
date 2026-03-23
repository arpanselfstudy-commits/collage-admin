import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const ProtectedRoute = () => {
  const isLoggedIn = useSelector((state: RootState) => state.authSlice.isLoggedIn);
  const token = localStorage.getItem("accessToken");

  

  if (!isLoggedIn && !token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
