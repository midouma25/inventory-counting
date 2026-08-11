import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ScanLine, CheckCircle2, AlertCircle } from 'lucide-react';
import useAttendanceStore from '../../store/attendanceStore';

export default function CashierAttendance() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  
  const { submitPin } = useAttendanceStore();
  const [pinInput, setPinInput] = useState("");
  const [feedback, setFeedback] = useState(null);
  const inputRef = useRef(null);

  // إبقاء التركيز دائماً على حقل الباركود ليكون جاهزاً للمسح
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const handleAttendanceSubmit = async (e) => {
    e.preventDefault();
    if (!pinInput.trim()) return;
    
    const result = await submitPin(pinInput.trim());
    
    if (result && result.success) {
       const actionText = result.action === 'check_in' ? t('hr.messages.checkIn', 'تم تسجيل الدخول') : t('hr.messages.checkOut', 'تم تسجيل الخروج');
       setFeedback({ type: 'success', message: `${actionText}: ${result.employeeName}` });
    } else if (result) {
       let errorMsg = result.message;
       if (errorMsg === 'alreadyCompletedShift') errorMsg = t('hr.messages.alreadyCompleted', 'لقد أكملت ورديتك اليوم');
       else if (errorMsg === 'invalidPinOrInactive') errorMsg = t('hr.messages.invalidPin', 'الرمز غير صحيح أو الحساب معطل');
       else errorMsg = t(`backendErrors.${result.message}`, { name: result.employeeName, defaultValue: result.message });
       
       setFeedback({ type: 'error', message: errorMsg });
    } else {
       setFeedback({ type: 'error', message: t('hr.messages.error', 'حدث خطأ غير متوقع') });
    }
    
    setPinInput("");
    if(inputRef.current) inputRef.current.focus();
    setTimeout(() => setFeedback(null), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 font-sans text-start" dir={isRTL ? "rtl" : "ltr"}>
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        
        {/* خط ديكور علوي */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

        <div className="text-center mb-8 mt-2">
          <div className="mx-auto w-20 h-20 bg-blue-500/10 border border-blue-500/20 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <ScanLine size={36} className="text-blue-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">{t('hr.scanner.title', 'تسجيل الحضور والانصراف')}</h1>
          <p className="text-slate-400 text-sm">{t('hr.scanner.desc', 'قم بمسح الباركود الخاص بك للبدء أو إنهاء الدوام')}</p>
        </div>

        <form onSubmit={handleAttendanceSubmit} className="space-y-6">
          <div>
            <input
              ref={inputRef}
              type="password" // إخفاء الرمز السري إذا تم إدخاله يدوياً
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder={t('hr.scanner.placeholder', 'أدخل الرمز أو امسح الباركود...')}
              className="w-full bg-slate-950 border-2 border-slate-700 focus:border-blue-500 rounded-xl px-4 py-5 text-center text-2xl text-white tracking-widest transition-colors outline-none shadow-inner"
              autoComplete="off"
            />
            <p className="text-xs text-slate-500 text-center mt-3">
              {t('hr.scannerHint', 'القارئ يعمل كلوحة مفاتيح. ضع المؤشر في الحقل وقم بالمسح.')}
            </p>
          </div>
          
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-blue-900/20 flex justify-center items-center gap-2 text-lg">
            {t('hr.scanner.submit', 'تسجيل الحركة')}
          </button>
        </form>

        {feedback && (
          <div className={`mt-6 p-4 rounded-xl text-sm text-center border font-bold flex flex-col items-center justify-center gap-2 animate-in zoom-in-95 ${
            feedback.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}>
            {feedback.type === 'success' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
            <span className="text-base">{feedback.message}</span>
          </div>
        )}
      </div>
    </div>
  );
}