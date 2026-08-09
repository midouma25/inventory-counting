import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuthStore from "../../store/authStore";

// 🔴 تم تنظيف هذا السطر من التكرار بشكل كامل
import { 
  LayoutDashboard, Users, Briefcase, Receipt, Calendar, 
  Banknote, Settings, Archive, Activity, Map, Database, LayoutList 
} from 'lucide-react'; 

export default function Sidebar() {
  // 🔴 أضفنا استخراج i18n لكي لا يحدث خطأ عند فحص اللغة
  const { t, i18n } = useTranslation();
  
  // معرفة هل المستخدم الحالي يمتلك صلاحيات مدير
  const user = useAuthStore(state => state.user);
  const isAdmin = user?.role === 'superadmin';

  // إضافة خاصية adminOnly للتحكم في ظهور الرابط
  const menuItems = [
    { path: '/', name: t('sidebar.dashboard', 'لوحة القيادة'), icon: <LayoutDashboard size={20} />, adminOnly: true },
    { path: '/suppliers', name: t('sidebar.suppliers', 'الموردين'), icon: <Users size={20} />, adminOnly: true },
    { path: '/hr', name: t('sidebar.hr', 'الموارد البشرية'), icon: <Briefcase size={20} />, adminOnly: true },
    { path: '/expenses', name: t('sidebar.expenses', 'المصاريف'), icon: <Receipt size={20} />, adminOnly: true },
    { path: '/payroll', name: t('sidebar.payroll', 'الرواتب'), icon: <Banknote size={20} />, adminOnly: true },
    { path: '/agenda', name: t('sidebar.agenda', 'الأجندة'), icon: <Calendar size={20} />, adminOnly: true },
    { path: '/audit-logs', name: t('sidebar.auditLogs', 'سجل النشاطات'), icon: <Activity size={20} />, adminOnly: true },
    { path: '/end-of-day', name: t('sidebar.end_of_day', 'نهاية الوردية'), icon: <Calendar size={20} />, adminOnly: false }, // الكاشير يمكنه رؤية هذا
    { path: '/store-map', name: t('sidebar.storeMap', 'مخطط المحل'), icon: <Map size={20} />, adminOnly: true },
    { path: '/pdf-importer', name: t('sidebar.pdfImporter', 'استيراد الفواتير (PDF)'), icon: <Database size={20} />, adminOnly: true },
    
    // 🔴 صفحة الجرد مدعومة بـ 3 لغات
    { 
      path: '/inventory', 
      name: t('sidebar.inventory', i18n.language === 'ar' ? 'الجرد والمخزون' : i18n.language === 'fr' ? 'Inventaire' : 'Inventory'), 
      icon: <LayoutList size={20} />, 
      adminOnly: true 
    },
    
    { path: '/archive', name: t('zreport.archive_title', 'أرشيف اليوميات'), icon: <Archive size={20} />, adminOnly: true }, 
    { path: '/settings', name: t('sidebar.settings', 'الإعدادات'), icon: <Settings size={20} />, adminOnly: true }, 
  ];

  // فلترة القائمة بناءً على صلاحيات المستخدم
  const visibleItems = menuItems.filter(item => !item.adminOnly || isAdmin);

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col h-screen sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <h2 className="text-xl font-bold text-white tracking-wider">
          GHERBI.AI <span className="text-blue-500">POS</span>
        </h2>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {visibleItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? 'bg-slate-800 text-white font-medium'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
      
    </aside>
  );
}