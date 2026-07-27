import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function MainLayout() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.dir();
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    // أضفنا فئات الطباعة print:bg-white print:text-black print:h-auto
    <div className="flex h-screen bg-slate-950 overflow-hidden font-sans print:h-auto print:bg-white print:text-black" dir={i18n.dir()}>
      <div className="print:hidden">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col h-screen overflow-hidden print:h-auto print:overflow-visible">
        <div className="print:hidden">
          <Topbar />
        </div>
        {/* أضفنا print:overflow-visible لضمان عدم اقتصاص الورقة */}
        <main className="flex-1 overflow-y-auto print:overflow-visible">
          <Outlet />
        </main>
      </div>
    </div>
  );
}