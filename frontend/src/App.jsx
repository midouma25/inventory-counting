import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import useAuthStore from "./store/authStore";
import payrollStore from "./store/payrollStore";

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

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
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
          {/* ✅ تم تصحيح مسار الإعدادات لتجنب التكرار */}
          <Route path="settings" element={<Settings />} /> 
          <Route path="end-of-day" element={<EndOfDay />} />
          <Route index element={<Dashboard />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="hr" element={<HR />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="payroll" element={<Payroll />} />
          <Route path="agenda" element={<Agenda />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;