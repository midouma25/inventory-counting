import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Clock, LogIn, LogOut, AlertCircle, CheckCircle2, ChevronRight, ChevronLeft, Calendar as CalendarIcon } from "lucide-react";

const Attendance = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  
  const [pinInput, setPinInput] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const inputRef = useRef(null);

  // 🔴 التحكم بالتاريخ عبر أسهم التنقل
  const [selectedDate, setSelectedDate] = useState(new Date());

  const dbDate = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD
  const displayDate = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;

  const handlePrevDay = () => {
    const prev = new Date(selectedDate);
    prev.setDate(selectedDate.getDate() - 1);
    setSelectedDate(prev);
  };

  const handleNextDay = () => {
    const next = new Date(selectedDate);
    next.setDate(selectedDate.getDate() + 1);
    setSelectedDate(next);
  };

  const handleToday = () => {
    setSelectedDate(new Date());
  };

  const fetchRecords = async () => {
    setIsLoading(true);
    try {
      if (window.api && window.api.getTodayAttendance) {
        const data = await window.api.getTodayAttendance(dbDate);
        setRecords(data || []);
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
    const interval = setInterval(fetchRecords, 60000);
    return () => clearInterval(interval);
  }, [dbDate]); // 🔴 جلب البيانات مجدداً عند تغير التاريخ

  const handlePinSubmit = async (e) => {
    e.preventDefault();
    if (!pinInput.trim()) return;
    try {
      if (window.api && window.api.handlePinEntry) {
        const result = await window.api.handlePinEntry(pinInput.trim());
        if (result && result.success) {
          const actionText = result.action === 'check_in' ? t('hr.messages.checkIn', 'تم تسجيل الدخول') : t('hr.messages.checkOut', 'تم تسجيل الخروج');
          setFeedback({ type: 'success', message: `${actionText}: ${result.employeeName} (${result.time})` });
          // العودة لتاريخ اليوم إذا سجل حضوره لكي يرى اسمه فوراً
          if(dbDate !== new Date().toISOString().split('T')[0]) {
             handleToday();
          } else {
             fetchRecords(); 
          }
        } else {
          setFeedback({ type: 'error', message: result?.message || t('common.error') });
        }
      }
    } catch (err) { setFeedback({ type: 'error', message: t('common.error') }); }

    setPinInput("");
    if(inputRef.current) inputRef.current.focus();
    setTimeout(() => setFeedback(null), 4000);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 w-full text-slate-100 min-h-[calc(100vh-100px)]" dir={i18n.dir()}>
      <div className="w-full lg:w-1/3 bg-slate-900/80 rounded-xl border border-slate-800 p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-lg h-fit">
        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
        <div className="bg-slate-800/50 p-4 rounded-full mb-6"><Clock size={48} className="text-blue-400" /></div>
        <h2 className="text-2xl font-bold mb-2 text-center">{t('hr.scanner.title', 'تسجيل الدخول / الخروج')}</h2>
        <p className="text-slate-400 mb-8 text-center text-sm">{t('hr.scanner.placeholder', 'أدخل رمز PIN الخاص بك لتسجيل حضورك أو انصرافك')}</p>
        <form onSubmit={handlePinSubmit} className="w-full flex flex-col gap-4">
          <input ref={inputRef} type="password" value={pinInput} onChange={(e) => setPinInput(e.target.value)} placeholder="****" className="w-full text-center text-4xl py-6 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 tracking-[1em] shadow-inner" autoFocus />
          <button type="submit" className="w-full text-lg bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition-colors shadow-md">{t('hr.scanner.submit', 'تأكيد الرمز')}</button>
        </form>
        {feedback && (
          <div className={`mt-6 w-full p-4 rounded-lg flex items-center justify-center gap-3 text-sm font-medium animate-in fade-in slide-in-from-bottom-4 ${feedback.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
            {feedback.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}<span>{feedback.message}</span>
          </div>
        )}
      </div>

      <div className="w-full lg:w-2/3 bg-slate-900/50 rounded-xl border border-slate-800 flex flex-col overflow-hidden shadow-lg h-fit">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/30">
          <h3 className="font-bold text-lg flex items-center gap-2"><Clock size={18} className="text-blue-400"/> {t('hr.attendanceLog', 'سجل حركة الموظفين')}</h3>
          
          {/* 🔴 أزرار التنقل بين الأيام المضافة حديثاً */}
          <div className="flex items-center gap-2 bg-slate-900 rounded-lg border border-slate-700 p-1">
             <button onClick={isRTL ? handleNextDay : handlePrevDay} className="p-1.5 hover:bg-slate-800 rounded-md text-slate-400 hover:text-white transition-colors" title={t('common.previous', 'السابق')}><ChevronLeft size={16}/></button>
             <button onClick={handleToday} className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-md text-sm font-bold text-white transition-colors" title={t('common.today', 'اليوم')}>
               <CalendarIcon size={14} className="text-blue-400" /> <bdi dir="ltr">{displayDate}</bdi>
             </button>
             <button onClick={isRTL ? handlePrevDay : handleNextDay} className="p-1.5 hover:bg-slate-800 rounded-md text-slate-400 hover:text-white transition-colors" title={t('common.next', 'التالي')}><ChevronRight size={16}/></button>
          </div>
        </div>

        <div className="flex-1 overflow-x-auto p-0">
          <table className="w-full text-start border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 text-sm">
                <th className="py-4 px-6 font-medium text-start">{t('hr.table.nameWithRole', 'الموظف')}</th>
                <th className="py-4 px-6 font-medium text-center">{t('hr.table.timeIn', 'وقت الدخول')}</th>
                <th className="py-4 px-6 font-medium text-center">{t('hr.table.timeOut', 'وقت الخروج')}</th>
                <th className="py-4 px-6 font-medium text-center">{t('hr.table.status', 'الحالة')}</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={4} className="text-center py-12 text-slate-500">{t('hr.table.loading', 'جاري التحميل...')}</td></tr>
              ) : records.length === 0 ? (
                <tr><td colSpan={4} className="text-center py-16 text-slate-500">{t('hr.table.emptyRecord', 'لا توجد حركات تسجيل دخول في هذا اليوم.')}</td></tr>
              ) : (
                records.map((record) => (
                  <tr key={record.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-6 text-start"><div className="font-medium text-white">{record.employee_name || record.name}</div><div className="text-xs text-slate-500 mt-1">{t(`hr.roles.${record.role}`, record.role)}</div></td>
                    <td className="py-4 px-6 text-center text-emerald-400 font-medium"><div className="flex items-center justify-center gap-2"><LogIn size={14} /> {record.time_in || '--:--'}</div></td>
                    <td className="py-4 px-6 text-center text-orange-400 font-medium">{record.time_out ? (<div className="flex items-center justify-center gap-2"><LogOut size={14} /> {record.time_out}</div>) : (<span className="text-slate-600">--:--</span>)}</td>
                    <td className="py-4 px-6 text-center"><span className={`px-3 py-1.5 rounded-full text-xs font-medium border inline-block ${!record.time_out ? 'bg-blue-950 text-blue-400 border-blue-900' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>{!record.time_out ? t('hr.status.present', 'متواجد حالياً') : t('hr.status.departed', 'أنهى الدوام')}</span></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;