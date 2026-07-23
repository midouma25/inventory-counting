import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, Users, Briefcase, Receipt, Calendar, Banknote } from 'lucide-react';

export default function Sidebar() {
  const { t } = useTranslation();

  const menuItems = [
    { path: '/', name: t('sidebar.dashboard'), icon: <LayoutDashboard size={20} /> },
    { path: '/suppliers', name: t('sidebar.suppliers'), icon: <Users size={20} /> },
    { path: '/hr', name: t('sidebar.hr'), icon: <Briefcase size={20} /> },
    { path: '/expenses', name: t('sidebar.expenses'), icon: <Receipt size={20} /> },
    { path: '/payroll', name: t('sidebar.payroll', 'الرواتب'), icon: <Banknote size={20} /> },
    { path: '/agenda', name: t('sidebar.agenda'), icon: <Calendar size={20} /> },
  ];

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col h-screen sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <h2 className="text-xl font-bold text-white tracking-wider">
          POS<span className="text-blue-500">Manager</span>
        </h2>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
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