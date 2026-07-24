import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Search, Plus, MoreHorizontal, UserCheck, AlertCircle, ScanLine, Users, X, Clock } from "lucide-react";

import useEmployeeStore from "../../store/employeeStore";
import useAttendanceStore from "../../store/attendanceStore";

const HR = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const [activeTab, setActiveTab] = useState('attendance');

  // --- حالة الموظفين ---
  const { employees, fetchEmployees, addEmployee, isLoading: empLoading } = useEmployeeStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", role: "", pinCode: "" });

  // --- حالة الحضور ---
  const { todayRecords, fetchTodayRecords, submitPin, isLoading: attLoading } = useAttendanceStore();
  const [pinInput, setPinInput] = useState("");
  const [feedback, setFeedback] = useState(null);
  const inputRef = useRef(null);
  
  const today = new Date().toISOString().split('T')[0];
  const [attendanceDate, setAttendanceDate] = useState(today);
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  // دالة لجلب الحضور حسب التاريخ المختار لجدول العرض
  const fetchAttendanceForDate = async (date) => {
    try {
      const data = await window.api.getTodayAttendance(date);
      setAttendanceRecords(data || []);
    } catch (error) {
      console.error("Error fetching attendance for date:", error);
    }
  };

  useEffect(() => {
    fetchAttendanceForDate(attendanceDate);
  }, [attendanceDate]);

  useEffect(() => {
    fetchEmployees();
    fetchTodayRecords(); // من أجل إحصائيات اليوم (KPIs)
  }, [fetchEmployees, fetchTodayRecords]);

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.pinCode) return;
    const success = await addEmployee(formData);
    if (success) {
      setIsDialogOpen(false);
      setFormData({ name: "", role: "", pinCode: "" });
      fetchEmployees();
    } else {
      alert(t('hr.messages.error'));
    }
  };

  const handleAttendanceSubmit = async (e) => {
    e.preventDefault();
    if (!pinInput.trim()) return;
    
    const result = await submitPin(pinInput.trim());
    
    if (result && result.success) {
       const actionText = result.action === 'check_in' ? t('hr.messages.checkIn') : t('hr.messages.checkOut');
       setFeedback({ type: 'success', message: `${actionText}: ${result.employeeName}` });
       fetchTodayRecords(); // تحديث إحصائيات اليوم
       fetchAttendanceForDate(attendanceDate); // تحديث الجدول فوراً
    } else if (result) {
       setFeedback({ type: 'error', message: result.message });
    }
    
    setPinInput("");
    if(inputRef.current) inputRef.current.focus();
    setTimeout(() => setFeedback(null), 4000);
  };

  const presentCount = todayRecords.filter(r => !r.time_out).length;
  const absentCount = employees.length - presentCount > 0 ? employees.length - presentCount : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans flex flex-col gap-6">
      
      {/* الترويسة العلوية */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{t('hr.title')}</h1>
          <p className="text-slate-400">{t('hr.subtitle')}</p>
        </div>
      </div>

      {/* التبويبات */}
      <div className="flex bg-slate-900 border border-slate-800 rounded-lg w-fit p-1">
        <button 
          onClick={() => setActiveTab('attendance')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-md font-medium transition-colors ${activeTab === 'attendance' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
        >
          <ScanLine size={18} />
          {t('hr.tabs.attendance')}
        </button>
        <button 
          onClick={() => setActiveTab('employees')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-md font-medium transition-colors ${activeTab === 'employees' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
        >
          <Users size={18} />
          {t('hr.tabs.employees')}
        </button>
      </div>

      {/* تبويب الحضور */}
      {activeTab === 'attendance' && (
        <div className="flex flex-col lg:flex-row gap-6 w-full lg:h-[calc(100vh-220px)]">
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <div className="bg-slate-900/80 rounded-xl border border-slate-800 p-6 relative overflow-hidden shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="bg-slate-800 p-2 rounded-lg text-blue-400"><ScanLine size={24} /></div>
                <h3 className="text-xl font-bold">{t('hr.scanner.title')}</h3>
              </div>
              <form onSubmit={handleAttendanceSubmit} className="flex flex-col gap-4">
                <input
                  ref={inputRef}
                  type="password"
                  placeholder={t('hr.scanner.placeholder')}
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="w-full text-center text-xl py-6 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 tracking-widest"
                  autoFocus
                />
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-4 rounded-lg font-medium transition-colors">
                  {t('hr.scanner.submit')}
                </button>
              </form>
              
              {feedback && (
                <div className={`mt-4 p-3 rounded-lg text-sm text-center border ${feedback.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                  {feedback.message}
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <div className="flex-1 bg-slate-900/80 rounded-xl border border-slate-800 p-6 flex flex-col items-center justify-center shadow-lg">
                <UserCheck className="text-emerald-500 mb-2" size={32} />
                <span className="text-3xl font-bold">{presentCount}</span>
                <span className="text-slate-400 text-sm mt-1">{t('hr.kpi.present')}</span>
              </div>
              <div className="flex-1 bg-slate-900/80 rounded-xl border border-slate-800 p-6 flex flex-col items-center justify-center shadow-lg">
                <AlertCircle className="text-red-500 mb-2" size={32} />
                <span className="text-3xl font-bold">{absentCount}</span>
                <span className="text-slate-400 text-sm mt-1">{t('hr.kpi.absent')}</span>
              </div>
            </div>
          </div>

          {/* سجل الحضور بالتواريخ */}
          <div className="w-full lg:w-2/3 bg-slate-900/50 rounded-xl border border-slate-800 flex flex-col overflow-hidden shadow-lg">
            <div className="p-4 border-b border-slate-800 bg-slate-900 flex justify-between items-center">
              <h3 className="font-bold flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" /> {t('hr.attendanceLog')}
              </h3>
              <input 
                type="date" 
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
                className="bg-slate-950 border border-slate-700 text-white px-4 py-2 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            
            <div className="flex-1 overflow-auto">
              <table className="w-full text-start border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 text-sm">
                    <th className="px-6 py-4 font-medium text-start">{t('hr.table.nameWithRole')}</th>
                    <th className="px-6 py-4 font-medium text-center">{t('hr.table.timeIn')}</th>
                    <th className="px-6 py-4 font-medium text-center">{t('hr.table.timeOut')}</th>
                    <th className="px-6 py-4 font-medium text-center">{t('hr.table.status')}</th>
                  </tr>
                </thead>
                <tbody>
                  {attLoading ? (
                    <tr><td colSpan={4} className="text-center py-12 text-slate-500">{t('hr.table.loading')}</td></tr>
                  ) : attendanceRecords.length === 0 ? (
                    <tr><td colSpan={4} className="text-center py-12 text-slate-500">{t('hr.table.emptyRecord')}</td></tr>
                  ) : (
                    attendanceRecords.map((record) => (
                      <tr key={record.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                        <td className="px-6 py-4 font-medium text-start text-white">
                          {record.employee_name || record.name} 
                          {record.role && <span className="text-xs text-slate-500 ml-2">({record.role})</span>}
                        </td>
                        <td className="px-6 py-4 text-center text-emerald-400 font-medium">{record.time_in || '--:--'}</td>
                        <td className="px-6 py-4 text-center text-orange-400 font-medium">{record.time_out || '--:--'}</td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${!record.time_out ? 'bg-emerald-950 text-emerald-400 border-emerald-900' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                            {!record.time_out ? t('hr.status.present') : t('hr.status.departed')}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* تبويب الموظفين */}
      {activeTab === 'employees' && (
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center bg-slate-900/50 p-4 rounded-xl border border-slate-800 shadow-lg">
            <button 
              onClick={() => setIsDialogOpen(true)}
              className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 px-4 py-2.5 rounded-lg font-medium transition-colors"
            >
              <Plus size={18} />
              {t('hr.employees.addBtn')}
            </button>
            
            <div className="relative w-1/3 text-start">
              <Search size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder={t('hr.employees.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg ps-10 pe-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-start"
                dir={isRTL ? "rtl" : "ltr"}
              />
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
            <table className="w-full text-start border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 text-sm">
                  <th className="px-6 py-4 font-medium text-start">{t('hr.employees.table.name')}</th>
                  <th className="px-6 py-4 font-medium text-start">{t('hr.employees.table.role')}</th>
                  <th className="px-6 py-4 font-medium text-center">{t('hr.employees.table.status')}</th>
                  <th className="px-6 py-4 font-medium text-start">{t('hr.employees.table.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {empLoading ? (
                  <tr><td colSpan={4} className="text-center py-8 text-slate-500">{t('hr.table.loading')}</td></tr>
                ) : filteredEmployees.length === 0 ? (
                  <tr><td colSpan={4} className="text-center py-8 text-slate-500">{t('hr.employees.empty')}</td></tr>
                ) : (
                  filteredEmployees.map((emp) => (
                    <tr key={emp.id} className="border-b border-slate-800/50 hover:bg-slate-800/20">
                      <td className="px-6 py-4 font-medium text-start text-white">{emp.name}</td>
                      <td className="px-6 py-4 text-slate-400 text-start">{emp.role}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{t('hr.employees.status.active')}</span>
                      </td>
                      <td className="px-6 py-4 text-start">
                        <button className="text-slate-400 hover:text-white transition-colors">
                          <MoreHorizontal size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* نافذة إضافة الموظف */}
          {isDialogOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
              <div className="bg-slate-950 border border-slate-800 rounded-xl w-full max-w-md p-6 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-white">{t('hr.dialog.title')}</h2>
                    <p className="text-sm text-slate-400 mt-1">{t('hr.dialog.desc')}</p>
                  </div>
                  <button onClick={() => setIsDialogOpen(false)} className="text-slate-500 hover:text-white"><X size={20}/></button>
                </div>
                
                <form onSubmit={handleAddEmployee} className="flex flex-col gap-4 text-start">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">{t('hr.dialog.name')}</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-start" placeholder={t('hr.dialog.namePlaceholder')} dir={isRTL ? "rtl" : "ltr"} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">{t('hr.dialog.role')}</label>
                    <input type="text" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-start" placeholder={t('hr.dialog.rolePlaceholder')} dir={isRTL ? "rtl" : "ltr"} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">{t('hr.dialog.pin')}</label>
                    <input type="password" value={formData.pinCode} onChange={(e) => setFormData({...formData, pinCode: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 tracking-widest text-start" placeholder="****" required />
                  </div>
                  
                  <div className="mt-6 flex justify-end gap-3">
                    <button type="button" onClick={() => setIsDialogOpen(false)} className="px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors">{t('hr.dialog.cancel')}</button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">{t('hr.dialog.save')}</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default HR;