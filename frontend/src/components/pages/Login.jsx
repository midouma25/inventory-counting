import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Lock, User, AlertCircle, ShieldCheck, Globe, AlertTriangle, Clock } from 'lucide-react'; // 🔴 تمت إضافة أيقونات النافذة المنبثقة
import useAuthStore from '../../store/authStore';

export default function Login() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 🔴 متغيرات التحكم في نافذة تصحيح الوقت
  const [showTimeFixModal, setShowTimeFixModal] = useState(false);
  const [manualTime, setManualTime] = useState('');
  const [lastRecordedTime, setLastRecordedTime] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (window.api && window.api.login) {
        const response = await window.api.login({ username, password });
        
        if (response && response.success) {
          login(response.user); 
          
          if (response.user.role === 'admin' || response.user.role === 'superadmin') {
            navigate('/'); 
          } else {
            navigate('/end-of-day'); 
          }
          
        } else {
          // 🔴 التعديل هنا: اصطياد خطأ الوقت المتأخر
          if (response.message === 'timeError') {
            setLastRecordedTime(response.lastDate); // نأخذ تاريخ آخر حركة من الباك إند
            setShowTimeFixModal(true); // نظهر نافذة الإنقاذ
          } else {
            // الأخطاء العادية (كلمة سر خاطئة الخ...)
            setError(response.message ? t(`backendErrors.${response.message}`, { defaultValue: response.message }) : t('login.error'));
          }
        }
      } else {
        // Fallback for development
        alert("تنبيه للمبرمج: نافذة Electron غير متصلة! (window.api مفقود)");
        setIsLoading(false);
        return;
        if(username === 'admin' && password === 'admin123') {
           login({ username: 'admin', role: 'superadmin' });
           navigate('/');
        } else if (username === 'cashier' && password === '123') { 
           login({ username: 'cashier', role: 'cashier' });
           navigate('/end-of-day');
        } else {
           setError(t('login.error'));
        }
      }
    } catch (err) {
      setError(t('login.serverError'));
    } finally {
      setIsLoading(false);
    }
  };

  // 🔴 دالة إصلاح وقت الويندوز
  const handleFixTime = async () => {
    if (!manualTime) return;
    
    // تحويل الوقت المدخل إلى صيغة يفهمها الويندوز
    const d = new Date(manualTime);
    const pad = (n) => n.toString().padStart(2, '0');
    const formattedTime = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    
    try {
      const result = await window.api.setWindowsTime(formattedTime);
      
      if (result.success) {
        setShowTimeFixModal(false);
        // نستخدم Alert بسيط قبل عمل Reload لتنبيه المستخدم بالنجاح
        alert(t('login.timeFixed', 'تم تحديث وقت الحاسوب بنجاح! سيتم إعادة تشغيل النظام.'));
        window.location.reload(); 
      } else {
        setError(t('login.timeFixError', 'فشلت العملية. يجب الموافقة (Yes) على شاشة الصلاحيات الزرقاء.'));
        setShowTimeFixModal(false);
      }
    } catch (error) {
      setError(t('login.serverError'));
      setShowTimeFixModal(false);
    }
  };

  const toggleLanguage = () => {
    const langs = ['ar', 'en', 'fr'];
    const currentLang = i18n.language.split('-')[0];
    const currentIndex = langs.indexOf(currentLang) !== -1 ? langs.indexOf(currentLang) : 0;
    const nextLang = langs[(currentIndex + 1) % langs.length];
    i18n.changeLanguage(nextLang);
    document.documentElement.dir = nextLang === 'ar' ? 'rtl' : 'ltr';
  };

  const getLangLabel = () => {
    if(i18n.language.startsWith('en')) return 'English';
    if(i18n.language.startsWith('fr')) return 'Français';
    return 'العربية';
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans relative" dir={i18n.language.startsWith('ar') ? 'rtl' : 'ltr'}>
      
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8 z-10">

        <div className="text-center mb-8 relative">
          <button onClick={toggleLanguage} className="absolute start-0 top-0 flex items-center gap-2 hover:bg-slate-800 transition-colors bg-slate-900 px-3 py-2 rounded-lg border border-slate-800">
            <Globe size={18} className="text-slate-400" />
            <span className="text-xs font-bold text-slate-300">{getLangLabel()}</span>
          </button>
          
          <div className="mx-auto w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mb-4 mt-8">
            <ShieldCheck size={32} className="text-blue-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">{t('login.title')}</h1>
          <p className="text-slate-500 text-sm">{t('login.subtitle')}</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-950/50 border border-red-900 rounded-lg flex items-center gap-3 text-red-400 text-sm">
            <AlertCircle size={18} className="shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2 text-start">{t('login.username')}</label>
            <div className="relative flex items-center">
              <User size={18} className="absolute start-4 text-slate-500" />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 ps-11 pe-4 text-white focus:outline-none focus:border-blue-500 transition-colors text-start"
                placeholder="admin"
                dir="ltr"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2 text-start">{t('login.password')}</label>
            <div className="relative flex items-center">
              <Lock size={18} className="absolute start-4 text-slate-500" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 ps-11 pe-4 text-white focus:outline-none focus:border-blue-500 transition-colors text-start"
                placeholder="••••••••"
                dir="ltr"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? t('login.loading') : t('login.submit')}
          </button>
        </form>

        <p className="text-center text-xs text-slate-600 mt-8 font-bold tracking-wider uppercase">
          Mohamed Cherif Gherbi &copy; 2026
        </p>
      </div>

      {/* 🛡️ نافذة الإنقاذ المنبثقة (Modal) لإصلاح الوقت - تظهر فقط عند الحاجة */}
      {showTimeFixModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-red-500/50 p-6 rounded-2xl w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-4 border border-red-500/20">
                <AlertTriangle size={32} />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">{t('login.timeModalTitle', 'تنبيه: وقت الحاسوب غير صحيح ⚠️')}</h2>
              
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 mb-6 w-full text-start">
                 <p className="text-slate-400 text-sm leading-relaxed">
                   اكتشف النظام أن وقت الحاسوب متأخر عن آخر عملية مسجلة. لحماية البيانات من التلف، يرجى تحديث الوقت للزمن الحالي:
                 </p>
                 <div className="mt-3 text-xs text-slate-500 flex items-center gap-2">
                    <Clock size={14} className="text-emerald-500"/>
                    <span>آخر عملية مسجلة: <strong className="text-emerald-400" dir="ltr">{lastRecordedTime}</strong></span>
                 </div>
              </div>
              
              <div className="w-full text-start mb-6">
                <label className="block text-sm font-medium text-slate-300 mb-2">الوقت والتاريخ الصحيحين (الآن):</label>
                <div className="relative">
                  <Clock size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input 
                    type="datetime-local" 
                    value={manualTime}
                    onChange={(e) => setManualTime(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 ps-10 pe-4 text-white focus:outline-none focus:border-red-500" 
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="flex gap-3 w-full">
                <button onClick={() => setShowTimeFixModal(false)} className="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white py-3 rounded-lg font-medium transition-colors">
                  {t('common.cancel', 'إلغاء')}
                </button>
                <button onClick={handleFixTime} className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold transition-colors">
                  {t('login.fixTimeBtn', 'تحديث وقت الحاسوب')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}