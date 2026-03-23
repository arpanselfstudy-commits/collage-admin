import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

import './Index.css';

import DashboardLayout from './layout/DashboardLayout';
import ProtectedRoute from './components/Common/ProtectedRoute/ProtectedRoute';
import { logout } from './store/auth.store';
import { onLogout } from './service/authEvents';

// auth
import Login from './Page/Auth/Login';
import ForgotPassword from './Page/Auth/ForgotPassword';
import ResetPassword from './Page/Auth/ResetPassword';
// dashboard
import Dashboard from './Page/Dashboard/Dashboard';
import ShopManagement from './Page/Shop';
import JobManagement from './Page/Job';
import CMS from './Page/CMS';

// Handles auth:logout events emitted by the axios interceptor
const AuthLogoutListener = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onLogout(() => {
      dispatch(logout());
      toast.error("Session expired. Please log in again.");
      navigate("/login", { replace: true });
    });
    return unsubscribe;
  }, [dispatch, navigate]);

  return null;
};

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      <AuthLogoutListener />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="shop-management" element={<ShopManagement />} />
            <Route path="job-management" element={<JobManagement />} />
            <Route path="cms" element={<CMS />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
