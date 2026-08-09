import React, { useState, useEffect } from 'react';
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
import POS from './components/pages/POS'; 
import DailyClosuresArchive from './components/DailyClosuresArchive';
import AuditLogs from './components/pages/AuditLogs';
import StoreMap from './components/pages/StoreMap'; 
import PdfImporter from './components/pages/PdfImporter'; 
import SystemClock from './components/ui/SystemClock'; 
import ActivationScreen from './components/ActivationScreen';
import Inventory from './components/pages/Inventory';
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};


const SuperAdminRoute = ({ children }) => {
  const user = useAuthStore(state => state.user);
  // السوبر أدمين فقط من يملك الصلاحية الآن
  const hasSuperAccess = user?.role === 'superadmin';
  if (!hasSuperAccess) return <Navigate to="/pos" replace />;
  return children;
};

const IndexRedirect = () => {
  const user = useAuthStore(state => state.user);
  const isSuperAdmin = user?.role === 'superadmin';
  return isSuperAdmin ? <Dashboard /> : <Navigate to="/pos" replace />; 
};

function App() {
  // --- حالة التفعيل ---
  const [isActivated, setIsActivated] = useState(null); // null = جاري التحقق

  useEffect(() => {
    const checkLicense = async () => {
      try {
        if (window.api && window.api.checkActivation) {
          const activated = await window.api.checkActivation();
          setIsActivated(activated);
        } else {
          // جعلناها false لتظهر الشاشة دائماً إذا لم يتم الاتصال بالباك اند بنجاح
          setIsActivated(false); 
        }
      } catch (err) {
        setIsActivated(false);
      }
    };
    
    checkLicense();
  }, []);

  // 1. شاشة التحميل (أثناء قراءة حالة التفعيل من النظام)
  if (isActivated === null) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-300 font-sans" dir="rtl">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-medium tracking-wide">جاري فحص تراخيص النظام...</p>
      </div>
    );
  }

  // 2. إذا كان غير مفعل، نعرض شاشة التفعيل فقط (لن يتم تحميل باقي التطبيق نهائياً)
  if (isActivated === false) {
    return <ActivationScreen onActivate={() => setIsActivated(true)} />;
  }

  // 3. إذا كان مفعلاً بنجاح، يتم تحميل التطبيق الكامل
  return (
    <HashRouter>
      {/* 🔴 الساعة موضوعة هنا: خارج الـ Routes لكي تطفو فوق كل شاشات النظام ولا تعطل التوجيه */}
      <SystemClock />

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
          <Route path="suppliers" element={<SuperAdminRoute><Suppliers /></SuperAdminRoute>} />
          <Route path="hr" element={<SuperAdminRoute><HR /></SuperAdminRoute>} />
          <Route path="payroll" element={<SuperAdminRoute><Payroll /></SuperAdminRoute>} />
          <Route path="agenda" element={<SuperAdminRoute><Agenda /></SuperAdminRoute>} />
          
          {/* 👑 مسارات السوبر أدمين فقط */}
          <Route path="settings" element={<SuperAdminRoute><Settings /></SuperAdminRoute>} /> 
          <Route path="/archive" element={<DailyClosuresArchive />} />
          <Route path="audit-logs" element={<SuperAdminRoute><AuditLogs /></SuperAdminRoute>} />
          <Route path="inventory" element={<SuperAdminRoute><Inventory /></SuperAdminRoute>} />
          <Route path="store-map" element={<SuperAdminRoute><StoreMap /></SuperAdminRoute>} />
          <Route path="pdf-importer" element={<SuperAdminRoute><PdfImporter /></SuperAdminRoute>} />
          
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;