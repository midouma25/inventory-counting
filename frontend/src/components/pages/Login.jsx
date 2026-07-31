import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Lock, User, AlertCircle, ShieldCheck, Globe } from 'lucide-react';
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
        const response = await window.api.login({ username, password });
        
        if (response && response.success) {
          login(response.user); 
          
          if (response.user.role === 'admin' || response.user.role === 'superadmin') {
            navigate('/'); 
          } else {
            navigate('/end-of-day'); 
          }
          
        } else {
          // 🔴 التعديل هنا لترجمة أخطاء الباك إند
          setError(response.message ? t(`backendErrors.${response.message}`, { defaultValue: response.message }) : t('login.error'));
        }
      } else {
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
      


      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8">

        <div className="text-center mb-8">

        <button onClick={toggleLanguage} className="flex items-center gap-2 hover:text-white transition-colors bg-slate-900 px-3 py-2 rounded-lg border border-slate-800">
          <Globe size={18} />
          <span className="text-xs font-bold text-white">{getLangLabel()}</span>
        </button>
        

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
              <User size={18} className="absolute start-4 text-slate-500" />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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