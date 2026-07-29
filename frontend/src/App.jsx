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

// 1. حارس المسارات الأساسية (يمنع الدخول بدون تسجيل)
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

// 2. حارس الإدارة العادية (للمسير والسوبر أدمين)
const AdminRoute = ({ children }) => {
  const user = useAuthStore(state => state.user);
  const hasAccess = user?.role === 'admin' || user?.role === 'superadmin';
  if (!hasAccess) return <Navigate to="/end-of-day" replace />;
  return children;
};

// 3. حارس السوبر أدمين (لصاحب المحل فقط - الإعدادات والحذف)
const SuperAdminRoute = ({ children }) => {
  const user = useAuthStore(state => state.user);
  
  // 🔴 الإصلاح: السماح لمالك النظام (الذي اسمه admin) أو من يملك رتبة superadmin
  const hasSuperAccess = user?.role === 'superadmin' || user?.username === 'admin' || user?.role === 'admin';
  
  if (!hasSuperAccess) {
    return <Navigate to="/" replace />; // يُعاد للوحة القيادة إذا لم يمتلك الصلاحية
  }
  return children;
};

// 4. الموجه الذكي للصفحة الرئيسية
const IndexRedirect = () => {
  const user = useAuthStore(state => state.user);
  const isAdmin = user?.role === 'admin' || user?.role === 'superadmin';
  return isAdmin ? <Dashboard /> : <Navigate to="/end-of-day" replace />;
};

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route index element={<IndexRedirect />} />
          
          {/* مسار الكاشير (مسموح للجميع) */}
          <Route path="end-of-day" element={<EndOfDay />} />
          <Route path="/preview" element={<PrintPreview />} />
          
          {/* مسارات الإدارة (المسير وصاحب المحل) */}
          <Route path="suppliers" element={<AdminRoute><Suppliers /></AdminRoute>} />
          <Route path="hr" element={<AdminRoute><HR /></AdminRoute>} />
          <Route path="expenses" element={<AdminRoute><Expenses /></AdminRoute>} />
          <Route path="payroll" element={<AdminRoute><Payroll /></AdminRoute>} />
          <Route path="agenda" element={<AdminRoute><Agenda /></AdminRoute>} />

          {/* 👑 مسارات السوبر أدمين فقط (الإعدادات، النسخ الاحتياطي، المستخدمين) */}
          <Route path="settings" element={<SuperAdminRoute><Settings /></SuperAdminRoute>} /> 
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;