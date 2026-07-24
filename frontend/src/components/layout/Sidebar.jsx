import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, Users, Briefcase, Receipt, Calendar, Banknote, Settings } from 'lucide-react';
import useAuthStore from "../../store/authStore"; // استيراد حالة المستخدم

export default function Sidebar() {
  const { t } = useTranslation();
  
  // معرفة هل المستخدم الحالي يمتلك صلاحيات مدير
  const user = useAuthStore(state => state.user);
  const isAdmin = user?.role === 'admin' || user?.role === 'superadmin';

  // إضافة خاصية adminOnly للتحكم في ظهور الرابط
  const menuItems = [
    { path: '/', name: t('sidebar.dashboard'), icon: <LayoutDashboard size={20} />, adminOnly: true },
    { path: '/suppliers', name: t('sidebar.suppliers'), icon: <Users size={20} />, adminOnly: true },
    { path: '/hr', name: t('sidebar.hr'), icon: <Briefcase size={20} />, adminOnly: true },
    { path: '/expenses', name: t('sidebar.expenses'), icon: <Receipt size={20} />, adminOnly: true },
    { path: '/payroll', name: t('sidebar.payroll'), icon: <Banknote size={20} />, adminOnly: true },
    { path: '/agenda', name: t('sidebar.agenda'), icon: <Calendar size={20} />, adminOnly: true },
    { path: '/end-of-day', name: t('sidebar.end_of_day'), icon: <Calendar size={20} />, adminOnly: false }, // الكاشير يمكنه رؤية هذا
    { path: '/settings', name: t('sidebar.settings'), icon: <Settings size={20} />, adminOnly: true }, // صفحة الإعدادات للمدير فقط
  ];

  // فلترة القائمة بناءً على صلاحيات المستخدم
  const visibleItems = menuItems.filter(item => !item.adminOnly || isAdmin);

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col h-screen sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <h2 className="text-xl font-bold text-white tracking-wider">
          POS<span className="text-blue-500">Manager</span>
        </h2>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
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