import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import './Index.css';

// ---------------------------------

import DashboardLayout from './layout/DashboardLayout';
import ProtectedRoute from './components/Common/ProtectedRoute/ProtectedRoute';
// auth
import Login from './Page/Auth/Login';
import ForgotPassword from './Page/Auth/ForgotPassword';
import ResetPassword from './Page/Auth/ResetPassword';
// dashboard
import Dashboard from './Page/Dashboard/Dashboard';
import ShopManagement from './Page/Shop';
import JobManagement from './Page/Job';
import CMS from './Page/CMS';
// ---------------------------------

// App Component
function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* ---------------------------------------------------------------- */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="shop-management" element={<ShopManagement />} />
            <Route path="job-management" element={<JobManagement />} />
            <Route path="cms" element={<CMS />} />
          </Route>
        </Route>
        {/* ------------------------------------------------------------------------- */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
