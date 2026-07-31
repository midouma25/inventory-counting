import React from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, Search, UserCircle, Globe, LogOut, ShoppingCart, Receipt, Lock, Clock } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import { useNavigate, NavLink } from 'react-router-dom';

export default function Topbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const isCashier = user?.role === 'cashier' || user?.role === 'scale' || user?.role === 'stock';

const toggleLanguage = () => {
    const langs = ['ar', 'en', 'fr'];
    const currentLang = i18n.language.split('-')[0];
    const currentIndex = langs.indexOf(currentLang) !== -1 ? langs.indexOf(currentLang) : 0;
    const nextLang = langs[(currentIndex + 1) % langs.length];
    i18n.changeLanguage(nextLang);
  };

  const getLangLabel = () => {
    if(i18n.language.startsWith('en')) return 'English';
    if(i18n.language.startsWith('fr')) return 'Français';
    return 'العربية';
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // تصميم الزر الخاص بالكاشير
  const CashierNavLink = ({ to, icon, label }) => (
    <NavLink to={to} className={({ isActive }) => `flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
      {icon} <span className="hidden md:inline">{label}</span>
    </NavLink>
  );

  return (
    <header className="h-16 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 z-10">
      
      {/* القسم الأيسر: البحث للمدير، وروابط سريعة للكاشير */}
      <div className="flex items-center gap-2">
        {!isCashier ? (
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 w-64">
            <Search size={18} className="text-slate-500 mx-2" />
            <input type="text" placeholder={t('common.search')} className="bg-transparent border-none outline-none text-sm text-slate-300 w-full placeholder-slate-600" />
          </div>
        ) : (
          <div className="flex items-center gap-2 bg-slate-900/50 p-1 rounded-xl border border-slate-800">
            <CashierNavLink to="/pos" icon={<ShoppingCart size={18}/>} label={t('pos.title', 'نقطة البيع')} />
            <CashierNavLink to="/expenses" icon={<Receipt size={18}/>} label={t('sidebar.expenses')} />
            <CashierNavLink to="/end-of-day" icon={<Lock size={18}/>} label={t('eod.title', 'الصندوق')} />
            <CashierNavLink to="/attendance" icon={<Clock size={18}/>} label={t('hr.tabs.attendance')} />
          </div>
        )}
      </div>

      {/* القسم الأيمن: البيانات الشخصية واللغة */}
      <div className="flex items-center gap-4 text-slate-400">
        <button onClick={toggleLanguage} className="flex items-center gap-2 hover:text-white transition-colors bg-slate-900 px-3 py-2 rounded-lg border border-slate-800">
          <Globe size={18} />
          <span className="text-xs font-bold">{getLangLabel()}</span>
        </button>

        {!isCashier && (
          <button className="relative hover:text-white transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 w-2.5 h-2.5 rounded-full border-2 border-slate-950"></span>
          </button>
        )}
        
        <div className="h-6 w-px bg-slate-800"></div>
        
        <div className="flex items-center gap-2">
          <UserCircle size={24} className={isCashier ? "text-blue-400" : "text-emerald-400"} />
          <div className="text-sm">
            <p className="font-medium text-white leading-none">
               {isCashier ? user?.username : t('common.superAdmin')}
            </p>
          </div>
        </div>

        <button onClick={handleLogout} className="ml-2 p-2 hover:bg-red-950/50 hover:text-red-400 rounded-lg transition-colors border border-transparent hover:border-red-900/50" title="Logout">
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}