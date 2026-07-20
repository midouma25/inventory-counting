import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ScanBarcode, UserCheck, Users, Clock, AlertCircle } from 'lucide-react';

export default function HR() {
  const { t } = useTranslation();
  const [pinInput, setPinInput] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [lastAction, setLastAction] = useState(null); 
  const inputRef = useRef(null);

  // دالة جلب بيانات حضور اليوم من قاعدة البيانات
  const fetchAttendance = useCallback(async () => {
    try {
      const todayString = new Date().toISOString().split('T')[0];
      if (window.api && window.api.getTodayAttendance) {
        const data = await window.api.getTodayAttendance(todayString);
        setAttendanceData(data);
      }
    } catch (error) {
      console.error("Failed to fetch attendance:", error);
    }
  }, []);

  useEffect(() => {
    fetchAttendance();
    if (inputRef.current) inputRef.current.focus();
  }, [fetchAttendance]);

  // دالة معالجة إدخال الباركود
  const handleCheckIn = async (e) => {
    e.preventDefault();
    if (!pinInput.trim()) return;

    try {
      const todayString = new Date().toISOString().split('T')[0];
      // صيغة الوقت (AM/PM)
      const timeString = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      
      if (window.api && window.api.processAttendance) {
        const result = await window.api.processAttendance({
          pin: pinInput.trim(),
          date: todayString,
          time: timeString
        });

        setLastAction({ type: result.success ? 'success' : 'error', msg: result.message });
        if (result.success) {
          fetchAttendance(); // إعادة تحديث الجدول بعد التسجيل بنجاح
        }
      }
    } catch (error) {
      console.error("Error processing attendance:", error);
    }

    setPinInput('');
    if (inputRef.current) inputRef.current.focus();
    setTimeout(() => setLastAction(null), 4000);
  };

  // حساب الإحصائيات (KPIs) ديناميكياً
  const presentCount = attendanceData.filter(emp => emp.status === 'present').length;
  const absentCount = attendanceData.filter(emp => emp.status === 'absent').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">{t('hr.title')}</h1>
        <p className="text-sm text-slate-500 mt-1">{t('hr.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg">
                <ScanBarcode size={24} />
              </div>
              <h2 className="text-xl font-bold text-white">{t('hr.scanner.title')}</h2>
            </div>

            <form onSubmit={handleCheckIn} className="space-y-4">
              <div>
                <input
                  ref={inputRef}
                  type="text"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder={t('hr.scanner.placeholder')}
                  className="w-full bg-slate-950 border-2 border-slate-800 focus:border-blue-500 rounded-lg px-4 py-4 text-center text-xl text-white tracking-widest placeholder-slate-600 transition-colors outline-none"
                  autoComplete="off"
                />
                <p className="text-xs text-slate-500 text-center mt-2">
                  {t('hr.scanner.hint')}
                </p>
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
              >
                {t('hr.scanner.submit')}
              </button>
            </form>

            {lastAction && (
              <div className={`mt-4 p-3 rounded-lg text-sm text-center border font-medium ${
                lastAction.type === 'success' 
                  ? 'bg-emerald-950/50 border-emerald-900 text-emerald-400' 
                  : 'bg-red-950/50 border-red-900 text-red-400'
              }`}>
                {lastAction.msg}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center shadow-lg">
              <UserCheck size={24} className="text-emerald-400 mx-auto mb-2" />
              <p className="text-3xl font-bold text-white">{presentCount}</p>
              <p className="text-xs text-slate-500 uppercase mt-1">{t('hr.kpi.present')}</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center shadow-lg">
              <AlertCircle size={24} className="text-red-400 mx-auto mb-2" />
              <p className="text-3xl font-bold text-white">{absentCount}</p>
              <p className="text-xs text-slate-500 uppercase mt-1">{t('hr.kpi.absent')}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg flex flex-col">
          <div className="p-4 border-b border-slate-800 bg-slate-950 flex justify-between items-center">
            <h3 className="font-medium text-white flex items-center gap-2">
              <Users size={18} className="text-slate-400" />
              {t('hr.todayAttendance')}
            </h3>
            <span className="text-xs text-slate-500 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
              {new Date().toLocaleDateString()}
            </span>
          </div>
          
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/50">
                  <th className="px-6 py-4 text-sm font-medium text-slate-400">{t('hr.table.name')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400">{t('hr.table.timeIn')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400">{t('hr.table.timeOut')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400">{t('hr.table.status')}</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((emp) => (
                  <tr key={emp.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-white">{emp.name}</p>
                      <p className="text-xs text-slate-500">{emp.role} ({t('hr.pin')} {emp.pin})</p>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {emp.timeIn ? (
                        <span className="flex items-center gap-1.5 text-slate-300">
                          <Clock size={14} className="text-emerald-400"/> {emp.timeIn}
                        </span>
                      ) : <span className="text-slate-600">-</span>}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {emp.timeOut ? (
                        <span className="flex items-center gap-1.5 text-slate-300">
                          <Clock size={14} className="text-slate-400"/> {emp.timeOut}
                        </span>
                      ) : <span className="text-slate-600">-</span>}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                        emp.status === 'present' 
                          ? 'bg-emerald-950/50 text-emerald-400 border-emerald-900/50' 
                          : 'bg-red-950/50 text-red-400 border-red-900/50'
                      }`}>
                        {t(`hr.status.${emp.status}`)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}