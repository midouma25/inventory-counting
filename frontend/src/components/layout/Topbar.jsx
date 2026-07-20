import React from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, Search, UserCircle } from 'lucide-react';

export default function Topbar() {
  const { t } = useTranslation();

  return (
    <header className="h-16 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 w-64">
        <Search size={18} className="text-slate-500 mr-2" />
        <input 
          type="text" 
          placeholder={t('common.search')} 
          className="bg-transparent border-none outline-none text-sm text-slate-300 w-full placeholder-slate-600"
        />
      </div>

      <div className="flex items-center gap-4 text-slate-400">
        <button className="relative hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 w-2.5 h-2.5 rounded-full border-2 border-slate-950"></span>
        </button>
        <div className="h-6 w-px bg-slate-800"></div>
        <div className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
          <UserCircle size={24} />
          <div className="text-sm">
            <p className="font-medium text-white leading-none">{t('common.superAdmin')}</p>
            <p className="text-xs text-slate-500 mt-1">{t('common.systemOwner')}</p>
          </div>
        </div>
      </div>
    </header>
  );
}