import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import useAuthStore from "./store/authStore";

// Layout & Pages
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


// 1. حماية المسارات الأساسية (يجب أن يكون المستخدم مسجلاً)
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// 2. حماية مسارات الإدارة (يمنع الكاشير من الوصول إليها تماماً)
const AdminRoute = ({ children }) => {
  const user = useAuthStore(state => state.user);
  const isAdmin = user?.role === 'admin' || user?.role === 'superadmin';
  
  if (!isAdmin) {
    // إذا كان كاشير يحاول الدخول لصفحة مدير (عبر كتابة الرابط يدوياً)، نوجهه لصفحته المسموحة
    return <Navigate to="/end-of-day" replace />;
  }
  return children;
};

// 3. التوجيه الذكي للصفحة الرئيسية (/)
const IndexRedirect = () => {
  const user = useAuthStore(state => state.user);
  const isAdmin = user?.role === 'admin' || user?.role === 'superadmin';
  
  // المدير يذهب للوحة القيادة، الكاشير يُوجه إجبارياً لصفحة إغلاق الوردية/الـ POS
  return isAdmin ? <Dashboard /> : <Navigate to="/end-of-day" replace />;
};

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* التوجيه التلقائي في الصفحة الرئيسية */}
          <Route index element={<IndexRedirect />} />
          
          {/* مسار مسموح للجميع (مدير + كاشير) */}
          <Route path="end-of-day" element={<EndOfDay />} />
          <Route path="/preview" element={<PrintPreview />} />
          {/* مسارات محمية للمديرين فقط */}
          <Route path="settings" element={<AdminRoute><Settings /></AdminRoute>} /> 
          <Route path="suppliers" element={<AdminRoute><Suppliers /></AdminRoute>} />
          <Route path="hr" element={<AdminRoute><HR /></AdminRoute>} />
          <Route path="expenses" element={<AdminRoute><Expenses /></AdminRoute>} />
          <Route path="payroll" element={<AdminRoute><Payroll /></AdminRoute>} />
          <Route path="agenda" element={<AdminRoute><Agenda /></AdminRoute>} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;