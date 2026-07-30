import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import useAuthStore from "./store/authStore";

import MainLayout from './components/layout/MainLayout';
import Dashboard from './components/pages/Dashboard';
import Suppliers from './components/pages/Suppliers';
import HR from './components/pages/HR';
import Expenses from './components/pages/Expenses';
import Agenda from './components/pages/Agenda';
import Login from './components/pages/Login'; 
import Payroll from './components/pages/Payroll';
import EndOfDay from './components/EndOfDay';
import Settings from './components/UsersManagement';
import PrintPreview from './components/pages/PrintPreview';
import Attendance from './components/pages/Attendance';
import POS from './components/pages/POS'; // 🔴 شاشة البيع الجديدة

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

const AdminRoute = ({ children }) => {
  const user = useAuthStore(state => state.user);
  const hasAccess = user?.role === 'admin' || user?.role === 'superadmin';
  if (!hasAccess) return <Navigate to="/pos" replace />; // 🔴 توجيه الكاشير للـ POS
  return children;
};

const SuperAdminRoute = ({ children }) => {
  const user = useAuthStore(state => state.user);
  const hasSuperAccess = user?.role === 'superadmin' || user?.username === 'admin' || user?.role === 'admin';
  if (!hasSuperAccess) return <Navigate to="/" replace />;
  return children;
};

const IndexRedirect = () => {
  const user = useAuthStore(state => state.user);
  const isAdmin = user?.role === 'admin' || user?.role === 'superadmin';
  return isAdmin ? <Dashboard /> : <Navigate to="/pos" replace />; // 🔴 توجيه افتراضي للكاشير
};

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route index element={<IndexRedirect />} />
          
          {/* 🛒 مسارات مسموحة للجميع (الكاشير والمدير) */}
          <Route path="pos" element={<POS />} />
          <Route path="end-of-day" element={<EndOfDay />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="/preview" element={<PrintPreview />} />
          
          {/* 🛡️ مسارات الإدارة (المسير وصاحب المحل) */}
          <Route path="suppliers" element={<AdminRoute><Suppliers /></AdminRoute>} />
          <Route path="hr" element={<AdminRoute><HR /></AdminRoute>} />
          <Route path="payroll" element={<AdminRoute><Payroll /></AdminRoute>} />
          <Route path="agenda" element={<AdminRoute><Agenda /></AdminRoute>} />

          {/* 👑 مسارات السوبر أدمين فقط */}
          <Route path="settings" element={<SuperAdminRoute><Settings /></SuperAdminRoute>} /> 
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;