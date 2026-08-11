import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, Search, UserCircle, Globe, LogOut, ShoppingCart, Receipt, Lock, Clock, Package, Users, Banknote, AlertTriangle, Info, CheckCircle2, Sun, Moon, Type, ScanBarcode } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import { useNavigate, NavLink } from 'react-router-dom';
import SystemClock from '../ui/SystemClock';

export default function Topbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const isCashier = user?.role === 'cashier' || user?.role === 'scale' || user?.role === 'stock';

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [notifications, setNotifications] = useState([]);
  const [readIds, setReadIds] = useState(() => new Set(JSON.parse(localStorage.getItem('read_notifs') || '[]')));

  // 🌟 حالات الوضع الفاتح وتكبير الشاشة
  const [isLightMode, setIsLightMode] = useState(localStorage.getItem('theme') === 'light');
  const [zoomLevel, setZoomLevel] = useState(Number(localStorage.getItem('zoom')) || 1);

  const notifRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) setIsNotifOpen(false);
      if (searchRef.current && !searchRef.current.contains(event.target)) setIsSearchOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 🌟 تفعيل الوضع الفاتح وتكبير الشاشة على مستوى المتصفح
  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    }
    
    // تطبيق التكبير (Zoom)
    document.documentElement.style.zoom = zoomLevel;
    localStorage.setItem('zoom', zoomLevel);
  }, [isLightMode, zoomLevel]);

  const toggleTheme = () => setIsLightMode(!isLightMode);
  
  // دالة تغيير التكبير بـ 3 مستويات: 100% -> 110% -> 125% -> 100%
  const cycleZoom = () => {
    if (zoomLevel === 1) setZoomLevel(1.1);
    else if (zoomLevel === 1.1) setZoomLevel(1.25);
    else setZoomLevel(1);
  };

  const fetchNotifications = async () => {
    if (window.api && window.api.getSystemNotifications && !isCashier) {
      const res = await window.api.getSystemNotifications();
      if (res.success) {
        const parsedNotifs = res.data.map(n => ({
          ...n,
          title: t(n.titleKey),
          desc: t(n.descKey, n.payload),
          read: readIds.has(n.id)
        }));
        setNotifications(parsedNotifs);
      }
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, [i18n.language, readIds, isCashier]);

  const markAllAsRead = () => {
    const newReadIds = new Set(readIds);
    notifications.forEach(n => newReadIds.add(n.id));
    setReadIds(newReadIds);
    localStorage.setItem('read_notifs', JSON.stringify(Array.from(newReadIds)));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const quickLinks = [
    { name: t('sidebar.suppliers', 'الموردين'), path: '/suppliers', icon: <Users size={16} />, keywords: ['مورد', 'ديون', 'supplier', 'fournisseur'] },
    { name: t('sidebar.inventory', 'إدارة المخزون'), path: '/inventory', icon: <Package size={16} />, keywords: ['مخزون', 'سلعة', 'جرد', 'inventory', 'stock'] },
    { name: t('sidebar.expenses', 'المصاريف'), path: '/expenses', icon: <Receipt size={16} />, keywords: ['مصروف', 'نفقات', 'expense', 'dépense'] },
    { name: t('sidebar.payroll', 'الرواتب'), path: '/payroll', icon: <Banknote size={16} />, keywords: ['راتب', 'أجرة', 'salary', 'salaire'] },
  ];

  const searchResults = quickLinks.filter(link => 
    link.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    link.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleLanguage = () => {
    const langs = ['ar', 'en', 'fr'];
    const currentLang = i18n.language.split('-')[0];
    const currentIndex = langs.indexOf(currentLang) !== -1 ? langs.indexOf(currentLang) : 0;
    const nextLang = langs[(currentIndex + 1) % langs.length];
    i18n.changeLanguage(nextLang);
  };

  const getLangLabel = () => {
    if(i18n.language.startsWith('en')) return 'EN';
    if(i18n.language.startsWith('fr')) return 'FR';
    return 'AR';
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const CashierNavLink = ({ to, icon, label }) => (
    <NavLink to={to} className={({ isActive }) => `flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
      {icon} <span className="hidden md:inline">{label}</span>
    </NavLink>
  );

  return (
    <header className="h-16 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-50">
      
      <div className="flex items-center gap-2 overflow-visible relative">
        {!isCashier ? (
          <div ref={searchRef} className="relative">
            <div className={`flex items-center bg-slate-900 border rounded-lg px-3 py-1.5 w-40 md:w-64 transition-colors ${isSearchOpen ? 'border-blue-500 ring-1 ring-blue-500/50' : 'border-slate-800'}`}>
              <Search size={18} className="text-slate-500 mx-1 md:mx-2 shrink-0" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchOpen(true)}
                placeholder={t('common.search', 'بحث سريع...')} 
                className="bg-transparent border-none outline-none text-sm text-slate-300 w-full placeholder-slate-600" 
              />
            </div>

            {isSearchOpen && searchQuery && (
              <div className="absolute top-12 start-0 w-full bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-top-2">
                <div className="p-2 text-xs font-bold text-slate-500 bg-slate-950/50 border-b border-slate-800">
                  {t('common.results', 'نتائج البحث السريع')}
                </div>
                {searchResults.length > 0 ? (
                  <div className="max-h-60 overflow-y-auto">
                    {searchResults.map((result, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => { navigate(result.path); setIsSearchOpen(false); setSearchQuery(''); }}
                        className="w-full flex items-center gap-3 p-3 text-start hover:bg-slate-800 transition-colors text-slate-300 hover:text-white border-b border-slate-800/50 last:border-0"
                      >
                        <span className="p-1.5 bg-slate-950 rounded-lg text-blue-400 no-invert">{result.icon}</span>
                        <span className="text-sm font-medium">{result.name}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-sm text-slate-500">
                    {t('common.noResults', 'لا توجد نتائج مطابقة')}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2 bg-slate-900/50 p-1 rounded-xl border border-slate-800">
            <CashierNavLink to="/pos" icon={<ShoppingCart size={18}/>} label={t('pos.title', 'نقطة البيع')} />
            <CashierNavLink to="/expenses" icon={<Receipt size={18}/>} label={t('sidebar.expenses')} />
            <CashierNavLink to="/end-of-day" icon={<Lock size={18}/>} label={t('eod.title', 'الصندوق')} />
            <CashierNavLink to="/cashier-attendance" icon={<ScanBarcode size={18}/>} label={t('hr.attendance', 'الحضور والانصراف')} />
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 md:gap-3 text-slate-400">
        
        <SystemClock />

        {/* 🌟 زر تكبير الخط (Zoom) */}
        <button onClick={cycleZoom} className="p-1.5 md:p-2 hover:text-white transition-colors bg-slate-900 rounded-lg border border-slate-800 relative group" title={t('common.textSize', 'حجم الخط')}>
          <Type size={18} />
          {zoomLevel > 1 && <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[9px] font-bold px-1 rounded border-2 border-slate-950 no-invert">{zoomLevel === 1.1 ? '+1' : '+2'}</span>}
        </button>

        {/* 🌟 زر تبديل الوضع (Light/Dark) */}
        <button onClick={toggleTheme} className="p-1.5 md:p-2 hover:text-white transition-colors bg-slate-900 rounded-lg border border-slate-800 no-invert" title={t('common.theme', 'تغيير المظهر')}>
          {isLightMode ? <Moon size={18} className="text-blue-400" /> : <Sun size={18} className="text-amber-400" />}
        </button>

        <button onClick={toggleLanguage} className="flex items-center gap-1 hover:text-white transition-colors bg-slate-900 px-2 py-1.5 md:py-2 rounded-lg border border-slate-800">
          <Globe size={18} />
          <span className="text-xs font-bold">{getLangLabel()}</span>
        </button>

        {!isCashier && (
          <div className="relative" ref={notifRef}>
            <button 
              onClick={() => setIsNotifOpen(!isNotifOpen)} 
              className={`relative p-1.5 md:p-2 rounded-lg transition-colors ${isNotifOpen ? 'bg-slate-800 text-white' : 'hover:text-white hover:bg-slate-900'}`}
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-slate-950 no-invert">
                  {unreadCount}
                </span>
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute top-12 end-0 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-top-2 z-50 text-start" dir={i18n.dir()}>
                <div className="flex justify-between items-center p-3 border-b border-slate-800 bg-slate-950/80">
                  <h3 className="font-bold text-white text-sm">{t('notif.title', 'الإشعارات')}</h3>
                  {unreadCount > 0 && (
                    <button onClick={markAllAsRead} className="text-[10px] text-blue-400 hover:text-blue-300 font-bold">
                      {t('notif.markAllRead', 'تحديد الكل كمقروء')}
                    </button>
                  )}
                </div>
                
                <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/50">
                  {notifications.length > 0 ? (
                    notifications.map(notif => (
                      <div key={notif.id} className={`p-3 hover:bg-slate-800/50 transition-colors cursor-pointer flex gap-3 ${!notif.read ? 'bg-blue-950/10' : ''}`}>
                        <div className="shrink-0 mt-1 no-invert">
                          {notif.type === 'warning' && <AlertTriangle size={18} className="text-amber-400" />}
                          {notif.type === 'info' && <Info size={18} className="text-blue-400" />}
                          {notif.type === 'success' && <CheckCircle2 size={18} className="text-emerald-400" />}
                        </div>
                        <div className="text-start">
                          <p className={`text-sm font-bold ${!notif.read ? 'text-white' : 'text-slate-300'}`}>{notif.title}</p>
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">{notif.desc}</p>
                          {notif.time && <p className="text-[10px] text-slate-500 mt-2 font-mono">{notif.time}</p>}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-slate-500 text-sm">
                      {t('notif.noNotifs', 'لا توجد إشعارات جديدة')}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        
        <div className="h-6 w-px bg-slate-800 hidden sm:block"></div>
        
        <div className="flex items-center gap-2">
          <UserCircle size={24} className={`${isCashier ? "text-blue-400" : "text-emerald-400"} no-invert`} />
          <div className="text-sm hidden sm:block">
            <p className="font-medium text-white leading-none">
               {isCashier ? user?.username : t('common.superAdmin')}
            </p>
          </div>
        </div>

        <button onClick={handleLogout} className="ms-1 p-2 hover:bg-red-950/50 hover:text-red-400 rounded-lg transition-colors border border-transparent hover:border-red-900/50 no-invert" title="Logout">
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}