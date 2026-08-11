import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import useAuthStore from '../../store/authStore'; 
import HelpGuide from './HelpGuide'; // 🌟 1. استيراد المكون الجديد

export default function MainLayout() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);
  const isCashier = user?.role === 'cashier' || user?.role === 'scale' || user?.role === 'stock';

  useEffect(() => {
    document.documentElement.dir = i18n.dir();
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  // 🌟 استماع لاختصار لوحة المفاتيح الذكي (Ctrl+Shift+A)
  useEffect(() => {
    if (window.api && window.api.onAttendanceShortcut) {
      window.api.onAttendanceShortcut(() => {
        if (isCashier) {
          navigate('/cashier-attendance'); // توجيه الكاشير لصفحته المستقلة
        } else {
          navigate('/hr'); // توجيه المدير لصفحة الموارد البشرية الكبرى
        }
      });
    }

    // تنظيف المستمع عند تدمير المكون
    return () => {
      if (window.api && window.api.offAttendanceShortcut) {
        window.api.offAttendanceShortcut();
      }
    };
  }, [navigate, isCashier]);

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden font-sans print:h-auto print:bg-white print:text-black" dir={i18n.dir()}>
      {!isCashier && (
        <div className="print:hidden">
          <Sidebar />
        </div>
      )}
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden print:h-auto print:overflow-visible">
        <div className="print:hidden">
          <Topbar />
        </div>
        <main className="flex-1 overflow-y-auto print:overflow-visible relative">
          <Outlet />

          <HelpGuide />
        </main>
      </div>
    </div>
  );
}