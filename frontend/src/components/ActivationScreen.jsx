import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Copy, Check, AlertTriangle, Key } from 'lucide-react';

export default function ActivationScreen({ onActivate }) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  const [hardwareId, setHardwareId] = useState('...');
  const [licenseKey, setLicenseKey] = useState('');
  const [error, setError] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchHwid = async () => {
      try {
        if (window.api && window.api.getHardwareId) {
          const id = await window.api.getHardwareId();
          setHardwareId(id);
        }
      } catch (err) {
        setHardwareId('ERROR_READING_HWID');
      }
    };
    fetchHwid();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(hardwareId);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleActivate = async (e) => {
    e.preventDefault();
    if (!licenseKey.trim()) {
      setError(t('activation.emptyKey', 'الرجاء إدخال مفتاح التفعيل!'));
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      if (window.api && window.api.activateApp) {
        const result = await window.api.activateApp(licenseKey);
        if (result.success) {
          onActivate(); 
        } else {
          setError(t('activation.invalidKey', 'مفتاح التفعيل غير صحيح، تأكد من نسخه بشكل كامل.'));
        }
      }
    } catch (err) {
      setError(t('activation.error', 'حدث خطأ أثناء الاتصال بالنظام.'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 font-sans text-start" dir={i18n.dir()}>
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8 relative overflow-hidden">
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-500/10 p-4 rounded-full mb-4 border border-blue-500/20">
            <ShieldCheck size={48} className="text-blue-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            {t('activation.title', 'تفعيل النظام')}
          </h1>
          <p className="text-slate-400 text-center text-sm leading-relaxed">
            {t('activation.subtitle', 'هذه النسخة غير مفعلة. يرجى إرسال رقم الجهاز للمطور للحصول على مفتاح التفعيل الخاص بك.')}
          </p>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 mb-6">
          <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider text-start">
            {t('activation.machineId', 'رقم الجهاز (Machine ID)')}
          </label>
          <div className="flex items-center justify-between bg-slate-900 border border-slate-700 rounded-md p-2">
            <span className="text-slate-300 font-mono text-sm tracking-wider select-all" dir="ltr">
              {hardwareId}
            </span>
            <button 
              type="button"
              onClick={handleCopy}
              className="p-2 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 transition-colors shrink-0"
              title={t('common.copy', 'نسخ')}
            >
              {isCopied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
            </button>
          </div>
        </div>

        <form onSubmit={handleActivate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2 text-start">
              {t('activation.licenseKey', 'مفتاح التفعيل (License Key)')}
            </label>
            <div className="relative">
              <Key size={18} className={`absolute top-1/2 -translate-y-1/2 text-slate-500 ${isRTL ? 'right-3' : 'left-3'}`} />
              <input
                type="text"
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value)}
                placeholder="XXXX-XXXX-XXXX-XXXX"
                className={`w-full bg-slate-950 border border-slate-700 rounded-lg py-3 text-white font-mono text-center tracking-widest focus:outline-none focus:border-blue-500 transition-colors uppercase placeholder-slate-700 ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'}`}
                dir="ltr"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg flex items-center gap-2 text-sm">
              <AlertTriangle size={18} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 disabled:opacity-50"
          >
            {isLoading ? t('common.loading', 'جاري التحقق...') : t('activation.btn', 'تفعيل البرنامج')}
          </button>
        </form>
      </div>
    </div>
  );
}