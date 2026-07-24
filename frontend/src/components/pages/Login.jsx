import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Lock, User, AlertCircle, ShieldCheck } from 'lucide-react';
import useAuthStore from '../../store/authStore';

export default function Login() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (window.api && window.api.login) {
        const user = await window.api.login({ username, password });
        
        if (user) {
          login(user);
          navigate('/');
        } else {
          setError(t('login.error'));
        }
      } else {
        if(username === 'admin' && password === 'admin123') {
           login({ username: 'admin', role: 'superadmin' });
           navigate('/');
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

  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith('en') ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans relative" dir={i18n.language.startsWith('ar') ? 'rtl' : 'ltr'}>
      
      <button 
        onClick={toggleLanguage}
        className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors text-sm font-medium"
      >
        {i18n.language.startsWith('en') ? 'العربية' : 'English'}
      </button>

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8">
        
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mb-4">
            <ShieldCheck size={32} className="text-blue-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">{t('login.title')}</h1>
          <p className="text-slate-500 text-sm">{t('login.subtitle')}</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-950/50 border border-red-900 rounded-lg flex items-center gap-3 text-red-400 text-sm">
            <AlertCircle size={18} />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">{t('login.username')}</label>
            <div className="relative flex items-center">
              {/* تم استخدام start-3 بدلاً من left/right ليتبدل مكان الأيقونة تلقائياً */}
              <User size={18} className="absolute start-4 text-slate-500" />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                /* تم استخدام ps-10 (Padding Start) لدفع النص بعيداً عن الأيقونة */
                className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 ps-11 pe-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="admin"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">{t('login.password')}</label>
            <div className="relative flex items-center">
              <Lock size={18} className="absolute start-4 text-slate-500" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 ps-11 pe-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="••••••••"
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

        <p className="text-center text-xs text-slate-600 mt-8">
          POSManager v1.0.0 &copy; 2026
        </p>
      </div>
    </div>
  );
}