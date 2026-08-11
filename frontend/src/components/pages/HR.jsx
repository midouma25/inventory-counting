import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Search, Plus, UserCheck, AlertCircle, ScanLine, Users, X, Clock, Edit, Trash2, CheckCircle2, Printer, IdCard, Download } from "lucide-react";
import Barcode from 'react-barcode';
import html2canvas from 'html2canvas'; 
import { jsPDF } from 'jspdf';         

import useEmployeeStore from "../../store/employeeStore";
import useAttendanceStore from "../../store/attendanceStore";
import useAuthStore from '../../store/authStore';
import ConfirmAlert from '../ui/ConfirmAlert'; 
import Modal from '../ui/Modal'; 

const HR = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const [activeTab, setActiveTab] = useState('attendance');
  const [editingEmployee, setEditingEmployee] = useState(null);
  
  const user = useAuthStore(state => state.user);
  const isSuperAdmin = user?.role === 'superadmin'; 
  
  const { employees, fetchEmployees, addEmployee, isLoading: empLoading } = useEmployeeStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", role: "", pinCode: "" });
 
  const { submitPin, fetchTodayRecords, isLoading: attLoading } = useAttendanceStore();
  const [pinInput, setPinInput] = useState("");
  const [feedback, setFeedback] = useState(null);
  const inputRef = useRef(null);
  
  const today = new Date().toISOString().split('T')[0];
  const [attendanceDate, setAttendanceDate] = useState(today);
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  const [employeeToDelete, setEmployeeToDelete] = useState(null); 
  const [toast, setToast] = useState(null);
  
  const [isEditAttendanceOpen, setIsEditAttendanceOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [attTimeIn, setAttTimeIn] = useState('');
  const [attTimeOut, setAttTimeOut] = useState('');

  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);
  const [searchPin, setSearchPin] = useState('');
  const [badgeEmployee, setBadgeEmployee] = useState(null);
  const [searchError, setSearchError] = useState('');
  const currentStoreName = localStorage.getItem('storeName') || 'GHERBI.AI';

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchAttendanceForDate = async (date) => {
    try {
      const data = await window.api.getTodayAttendance(date);
      setAttendanceRecords(data || []);
    } catch (error) { console.error("Error fetching attendance for date:", error); }
  };

  useEffect(() => {
    fetchAttendanceForDate(attendanceDate);
  }, [attendanceDate]);

  useEffect(() => {
    fetchEmployees();
    fetchTodayRecords(); 
  }, []); 

  const filteredEmployees = employees.filter((emp) =>
    (emp?.name || "").toLowerCase().includes((searchQuery || "").toLowerCase())
  );

  const handleAttendanceSubmit = async (e) => {
    e.preventDefault();
    if (!pinInput.trim()) return;
    
    const result = await submitPin(pinInput.trim());
    
    if (result && result.success) {
       const actionText = result.action === 'check_in' ? t('hr.messages.checkIn', 'تم تسجيل الدخول') : t('hr.messages.checkOut', 'تم تسجيل الخروج');
       setFeedback({ type: 'success', message: `${actionText}: ${result.employeeName}` });
       fetchAttendanceForDate(attendanceDate); 
    } else if (result) {
       const errorMsg = result.message ? t(`backendErrors.${result.message}`, { name: result.employeeName, defaultValue: result.message }) : t('hr.messages.error', 'حدث خطأ');
       setFeedback({ type: 'error', message: errorMsg });
    }
    
    setPinInput("");
    if(inputRef.current) inputRef.current.focus();
    setTimeout(() => setFeedback(null), 4000);
  };

  const confirmDelete = async () => {
    if (!employeeToDelete) return;
    const store = useEmployeeStore.getState();
    const idToDelete = employeeToDelete.id;
    
    setEmployeeToDelete(null);
    
    try {
      const res = await window.api.deleteEmployee(idToDelete);
      if (res && res.success) {
        if (res.isSoftDeleted) {
          showToast('warning', t('hr.employees.softDeleted', 'تم تعطيل الحساب بنجاح')); 
        } else {
          showToast('success', t('common.success', 'تمت العملية بنجاح'));
        }
        store.fetchEmployees();
      } else {
        showToast('error', t('common.error', 'حدث خطأ'));
      }
    } catch(e) { 
      showToast('error', t('common.error', 'حدث خطأ'));
    }
  };

  const openEditAttendance = (record) => {
    setEditingRecord(record);
    setAttTimeIn(record.time_in || '');
    setAttTimeOut(record.time_out || '');
    setIsEditAttendanceOpen(true);
  };

  const saveAttendanceEdit = async (e) => {
    e.preventDefault();
    if(!editingRecord) return;
    try {
      if (window.api && window.api.updateAttendanceRecord) {
        const res = await window.api.updateAttendanceRecord(editingRecord.id, attTimeIn, attTimeOut);
        if (res.success) {
          showToast('success', t('common.success', 'تم التعديل بنجاح'));
          setIsEditAttendanceOpen(false);
          fetchAttendanceForDate(attendanceDate); 
        } else {
          showToast('error', t('common.error', 'فشل التعديل'));
        }
      }
    } catch (err) {
      showToast('error', t('common.error', 'فشل التعديل'));
    }
  };

  const handleSearchBadge = (e) => {
    e.preventDefault();
    setSearchError('');
    try {
      const emp = employees.find(e => e.pin_code === searchPin.trim());
      if (emp) {
        setBadgeEmployee(emp);
      } else {
        setSearchError(t('hr.badge.notFound', i18n.language === 'ar' ? 'لم يتم العثور على موظف بهذا الرمز!' : i18n.language === 'fr' ? 'Aucun employé trouvé avec ce code PIN !' : 'No employee found with this PIN!'));
        setBadgeEmployee(null);
      }
    } catch (error) {
      setSearchError(t('common.error', 'حدث خطأ في البحث'));
    }
  };

  const handleExecutePrint = () => {
    const printElement = document.getElementById('printable-badge');
    if (!printElement) return;

    let iframe = document.getElementById('silent-print-iframe');
    if (iframe) document.body.removeChild(iframe);

    iframe = document.createElement('iframe');
    iframe.id = 'silent-print-iframe';
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html lang="${i18n.language}" dir="${isRTL ? 'rtl' : 'ltr'}">
      <head>
        <title>Print Badge</title>
        <style>
          @page { margin: 0; }
          html, body { 
            margin: 0; 
            padding: 0;
            width: 100%;
            background: #fff; 
            color: #000; 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          }
          .print-wrapper {
            width: 100%;
            max-width: 72mm; 
            margin: 0 auto;
            padding: 4mm 6mm;
            box-sizing: border-box;
          }
          .receipt-ticket-forced { width: 100%; box-sizing: border-box; }
        </style>
      </head>
      <body>
        <div class="print-wrapper">
          ${printElement.outerHTML}
        </div>
      </body>
      </html>
    `);
    doc.close();

    iframe.contentWindow.focus();
    setTimeout(() => {
      iframe.contentWindow.print();
    }, 500);
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById('printable-badge');
    if (!element) return;

    try {
      element.classList.remove('shadow-2xl');
      const canvas = await html2canvas(element, { scale: 3, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      element.classList.add('shadow-2xl');

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [80, 105] 
      });

      pdf.addImage(imgData, 'PNG', 0, 0, 80, 105);
      pdf.save(`Badge_${badgeEmployee.name.replace(/\s+/g, '_')}.pdf`);
      showToast('success', t('common.success', 'تم تحميل البطاقة بنجاح'));
    } catch (error) {
      console.error("PDF Generation Error: ", error);
      showToast('error', t('common.error', 'حدث خطأ أثناء استخراج الملف'));
    }
  };

  const presentCount = attendanceRecords.filter(r => !r.time_out).length;
  const absentCount = Math.max(0, employees.length - attendanceRecords.length);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans flex flex-col gap-6 relative text-start">
      
      {toast && (
        <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[100] px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 ${
          toast.type === 'success' ? 'bg-emerald-600 text-white' :
          toast.type === 'warning' ? 'bg-amber-600 text-white' :
          'bg-red-600 text-white'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span className="font-bold">{toast.message}</span>
        </div>
      )}

      <div className="flex justify-between items-end flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{t('hr.title', 'الموارد البشرية')}</h1>
          <p className="text-slate-400">{t('hr.subtitle', 'إدارة الحضور، الانصراف وسجلات العمال')}</p>
        </div>
        
        {isSuperAdmin && (
          <button 
            onClick={() => { setIsBadgeModalOpen(true); setBadgeEmployee(null); setSearchPin(''); setSearchError(''); }} 
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors shadow-lg shrink-0"
          >
            <IdCard size={18} />
            <span>{t('hr.badge.printBtn', i18n.language === 'ar' ? 'بطاقة موظف' : i18n.language === 'fr' ? 'Badge Employé' : 'Employee Badge')}</span>
          </button>
        )}
      </div>

      <div className="flex bg-slate-900 border border-slate-800 rounded-lg w-fit p-1">
        <button onClick={() => setActiveTab('attendance')} className={`flex items-center gap-2 px-6 py-2.5 rounded-md font-medium transition-colors ${activeTab === 'attendance' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
          <ScanLine size={18} /> {t('hr.tabs.attendance', 'تسجيل الدخول')}
        </button>
        <button onClick={() => setActiveTab('employees')} className={`flex items-center gap-2 px-6 py-2.5 rounded-md font-medium transition-colors ${activeTab === 'employees' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
          <Users size={18} /> {t('hr.tabs.employees', 'قائمة العمال')}
        </button>
      </div>

      {activeTab === 'attendance' && (
        <div className="flex flex-col lg:flex-row gap-6 w-full lg:h-[calc(100vh-220px)]">
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <div className="bg-slate-900/80 rounded-xl border border-slate-800 p-6 relative overflow-hidden shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="bg-slate-800 p-2 rounded-lg text-blue-400"><ScanLine size={24} /></div>
                <h3 className="text-xl font-bold">{t('hr.scanner.title', 'تسجيل الدخول / الخروج')}</h3>
              </div>
              <form onSubmit={handleAttendanceSubmit} className="flex flex-col gap-4">
                <input ref={inputRef} type="password" placeholder={t('hr.scanner.placeholder', 'مسح الباركود أو أدخل الرمز...')} value={pinInput} onChange={(e) => setPinInput(e.target.value)} className="w-full text-center text-xl py-6 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 tracking-widest" autoFocus />
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-4 rounded-lg font-medium transition-colors">{t('hr.scanner.submit', 'تسجيل')}</button>
              </form>
              
              <p className="text-xs text-slate-500 text-center mt-3">
                {t('hr.scannerHint', 'القارئ يعمل كلوحة مفاتيح. ضع المؤشر في الحقل وقم بالمسح.')}
              </p>

              {feedback && <div className={`mt-4 p-3 rounded-lg text-sm text-center border ${feedback.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>{feedback.message}</div>}
            </div>

            <div className="flex gap-4">
              <div className="flex-1 bg-slate-900/80 rounded-xl border border-slate-800 p-6 flex flex-col items-center justify-center shadow-lg">
                <UserCheck className="text-emerald-500 mb-2" size={32} />
                <span className="text-3xl font-bold">{presentCount}</span>
                <span className="text-slate-400 text-sm mt-1">{t('hr.kpi.present', 'حاضر اليوم')}</span>
              </div>
              <div className="flex-1 bg-slate-900/80 rounded-xl border border-slate-800 p-6 flex flex-col items-center justify-center shadow-lg">
                <AlertCircle className="text-red-500 mb-2" size={32} />
                <span className="text-3xl font-bold">{absentCount}</span>
                <span className="text-slate-400 text-sm mt-1">{t('hr.kpi.absent', 'غائب')}</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-2/3 bg-slate-900/50 rounded-xl border border-slate-800 flex flex-col overflow-hidden shadow-lg">
            <div className="p-4 border-b border-slate-800 bg-slate-900 flex justify-between items-center">
              <h3 className="font-bold flex items-center gap-2"><Clock className="w-5 h-5 text-blue-400" /> {t('hr.attendanceLog', 'سجل حركة الموظفين لليوم')}</h3>
              <input type="date" value={attendanceDate} onChange={(e) => setAttendanceDate(e.target.value)} className="bg-slate-950 border border-slate-700 text-white px-4 py-2 rounded-lg text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex-1 overflow-auto">
              <table className="w-full text-start border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 text-sm">
                    <th className="px-6 py-4 font-medium text-start">{t('hr.table.nameWithRole', 'الموظف')}</th>
                    <th className="px-6 py-4 font-medium text-center">{t('hr.table.timeIn', 'وقت الدخول')}</th>
                    <th className="px-6 py-4 font-medium text-center">{t('hr.table.timeOut', 'وقت الخروج')}</th>
                    <th className="px-6 py-4 font-medium text-center">{t('hr.table.status', 'الحالة')}</th>
                    {isSuperAdmin && <th className="px-6 py-4 font-medium text-center">{t('suppliers.table.actions', 'إجراء')}</th>}
                  </tr>
                </thead>
                <tbody>
                  {attLoading ? (
                    <tr><td colSpan={isSuperAdmin ? 5 : 4} className="text-center py-12 text-slate-500">{t('hr.table.loading', 'جاري التحميل...')}</td></tr>
                  ) : attendanceRecords.length === 0 ? (
                    <tr><td colSpan={isSuperAdmin ? 5 : 4} className="text-center py-12 text-slate-500">{t('hr.table.emptyRecord', 'لا توجد سجلات')}</td></tr>
                  ) : (
                    attendanceRecords.map((record) => (
                      <tr key={record.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4 font-medium text-start text-white">
                          {record.employee_name || record.name} 
                          {record.role && <span className="text-xs text-slate-500 mx-2">({t(`hr.roles.${record.role}`, {defaultValue: record.role})})</span>}
                        </td>
                        <td className="px-6 py-4 text-center text-emerald-400 font-bold">{record.time_in || '--:--'}</td>
                        <td className="px-6 py-4 text-center text-orange-400 font-bold">{record.time_out || '--:--'}</td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${!record.time_out ? 'bg-emerald-950 text-emerald-400 border-emerald-900' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                            {!record.time_out ? t('hr.status.present', 'في الدوام') : t('hr.status.departed', 'أنهى الدوام')}
                          </span>
                        </td>
                        {isSuperAdmin && (
                          <td className="px-6 py-4 text-center">
                            <button onClick={() => openEditAttendance(record)} className="p-2 text-blue-400 hover:bg-blue-900/50 rounded-lg transition-colors" title={t('hr.employees.actions.edit', 'تعديل الوقت')}>
                              <Edit size={16} />
                            </button>
                          </td>
                        )}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'employees' && (
        <div className="flex flex-col gap-6">
          {empLoading ? (
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden shadow-lg p-12 text-center text-slate-500">
              {t('hr.table.loading', 'جاري التحميل...')}
            </div>
          ) : employees.length === 0 ? (
            /* 🌟 الشاشة التفاعلية الفارغة (Empty State) 🌟 */
            <div className="bg-slate-900 border border-dashed border-slate-700 rounded-2xl p-12 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-300 mt-4">
              <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 shadow-inner border border-blue-500/20">
                <Users size={48} className="text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">
                {t('hr.emptyState.title', i18n.language === 'ar' ? 'ليس لديك أي موظفين بعد..' : i18n.language === 'fr' ? "Vous n'avez pas encore d'employés.." : 'You have no employees yet..')}
              </h2>
              <p className="text-slate-400 max-w-md mx-auto mb-8 text-sm leading-relaxed">
                {t('hr.emptyState.desc', i18n.language === 'ar' ? 'ابدأ بإضافة موظفك الأول لتتمكن من تتبع الحضور، الانصراف، الرواتب، والسلفيات بكل سهولة!' : i18n.language === 'fr' ? 'Commencez par ajouter votre premier employé pour suivre facilement les présences, la paie et les avances !' : 'Start by adding your first employee to easily track attendance, payroll, and advances!')}
              </p>
              
              <button
                onClick={() => { setFormData({ name: "", role: "", pinCode: "" }); setEditingEmployee(null); setIsDialogOpen(true); }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                {t('hr.emptyState.addBtn', i18n.language === 'ar' ? 'إضافة أول موظف' : i18n.language === 'fr' ? 'Ajouter le premier employé' : 'Add First Employee')}
              </button>
            </div>
          ) : (
            /* الجدول المعتاد يظهر فقط إذا كان هناك موظفون */
            <>
              <div className="flex justify-between items-center bg-slate-900/50 p-4 rounded-xl border border-slate-800 shadow-lg">
                <button onClick={() => { setFormData({ name: "", role: "", pinCode: "" }); setEditingEmployee(null); setIsDialogOpen(true); }} className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 px-4 py-2.5 rounded-lg font-medium transition-colors">
                  <Plus size={18} /> {t('hr.employees.addBtn', 'إضافة موظف')}
                </button>
                <div className="relative w-1/3 text-start">
                  <Search size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input type="text" placeholder={t('hr.employees.search', 'بحث...')} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg ps-10 pe-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-start" dir={isRTL ? "rtl" : "ltr"} />
                </div>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden shadow-lg animate-in fade-in">
                <table className="w-full text-start border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 text-sm">
                      <th className="px-6 py-4 font-medium text-start">{t('hr.employees.table.name', 'الاسم')}</th>
                      <th className="px-6 py-4 font-medium text-start">{t('hr.employees.table.role', 'المنصب')}</th>
                      <th className="px-6 py-4 font-medium text-center">{t('hr.employees.table.status', 'الحالة')}</th>
                      <th className="px-6 py-4 font-medium text-center">{t('hr.employees.table.actions', 'إجراء')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="text-center py-12 text-slate-500">
                          <div className="flex flex-col items-center gap-3 justify-center">
                            <Search size={32} className="opacity-20"/>
                            <p>{t('common.noResults', 'لا توجد نتائج')}</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredEmployees.map((emp) => (
                        <tr key={emp.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                          <td className="px-6 py-4 font-medium text-start text-white">{emp.name}</td>
                          <td className="px-6 py-4 text-slate-400 text-start">{t(`hr.roles.${emp.role}`, { defaultValue: emp.role })}</td>
                          <td className="px-6 py-4 text-center">
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{t('hr.status.active', 'نشط')}</span>
                          </td>
                          <td className="px-6 py-4 text-center flex justify-center gap-2">
                            <button onClick={() => { setFormData({ name: emp.name, role: emp.role, pinCode: emp.pin_code }); setEditingEmployee(emp); setIsDialogOpen(true); }} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors" title={t('hr.employees.actions.edit', 'تعديل')}><Edit size={18} /></button>
                            <button onClick={() => setEmployeeToDelete(emp)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors" title={t('hr.employees.actions.delete', 'حذف')}><Trash2 size={18} /></button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}

          <Modal isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} title={editingEmployee ? t('hr.dialog.editTitle', 'تعديل') : t('hr.dialog.title', 'إضافة موظف')}>
              <div className="p-2 text-start">
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    if (!formData.name || !formData.pinCode) return;
                    const store = useEmployeeStore.getState();
                    let success;
                    if (editingEmployee) {
                       if (store.updateEmployee) success = await store.updateEmployee(editingEmployee.id, formData);
                    } else success = await store.addEmployee(formData);
                    
                    if (success) { 
                      setIsDialogOpen(false); 
                      store.fetchEmployees(); 
                      showToast('success', t('common.success', 'تمت العملية بنجاح'));
                    } else { showToast('error', t('common.error', 'حدث خطأ')); }
                  }} className="flex flex-col gap-4 text-start">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">{t('hr.dialog.name', 'الاسم')}</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-start" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">{t('hr.dialog.role', 'المنصب')}</label>
                    <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-start" required>
                      <option value="" disabled>{t('hr.dialog.rolePlaceholder', 'اختر...')}</option>
                      <option value="cashier">{t('hr.roles.cashier', 'كاشير')}</option>
                      <option value="scale">{t('hr.roles.scale', 'ميزان')}</option>
                      <option value="stock">{t('hr.roles.stock', 'ترتيبات')}</option>
                      <option value="superadmin">Super Admin (المدير العام)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">{t('hr.dialog.pin', 'رمز الدخول')}</label>
                    <input type="password" value={formData.pinCode} onChange={(e) => setFormData({...formData, pinCode: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white tracking-widest text-start" required />
                  </div>
                  <div className="mt-6 flex justify-end gap-3">
                    <button type="button" onClick={() => setIsDialogOpen(false)} className="px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors">{t('common.cancel', 'إلغاء')}</button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">{editingEmployee ? t('hr.dialog.saveChanges', 'حفظ التعديلات') : t('hr.dialog.save', 'إضافة')}</button>
                  </div>
                </form>
              </div>
          </Modal>
        </div>
      )}

      {/* شاشة طباعة البطاقة (A7 Thermal Hardware Print) */}
      <Modal isOpen={isBadgeModalOpen} onClose={() => setIsBadgeModalOpen(false)} title={t('hr.badge.modalTitle', i18n.language === 'ar' ? 'إصدار بطاقة الدخول (Barcode)' : i18n.language === 'fr' ? "Émettre un badge d'accès" : 'Issue Access Badge (Barcode)')}>
        <div className="p-4 text-start" dir={isRTL ? 'rtl' : 'ltr'}>
          <p className="text-slate-400 mb-4 text-sm">
            {t('hr.badge.modalDesc', i18n.language === 'ar' ? 'أدخل الرمز السري للموظف لتحويله إلى باركود قابل للطباعة والمسح الضوئي.' : i18n.language === 'fr' ? "Entrez le code PIN de l'employé pour générer un code-barres." : 'Enter the employee PIN to generate a printable barcode.')}
          </p>
          
          <form onSubmit={handleSearchBadge} className="flex gap-2 mb-6">
            <input 
              type="password" 
              placeholder={t('hr.badge.searchPlaceholder', i18n.language === 'ar' ? 'أدخل رمز PIN...' : i18n.language === 'fr' ? 'Entrez le code PIN...' : 'Enter PIN code...')}
              value={searchPin}
              onChange={(e) => setSearchPin(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 tracking-widest text-center"
            />
            <button type="submit" className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center">
              <Search size={18} />
            </button>
          </form>

          {searchError && <div className="text-red-400 text-sm mb-4 text-center">{searchError}</div>}

          {badgeEmployee && (
            <div className="flex flex-col items-center border-t border-slate-800 pt-6">
              
              <div 
                 id="printable-badge" 
                 className="receipt-ticket-forced bg-white text-black shadow-2xl p-4 rounded-md mb-6 flex flex-col justify-between" 
                 dir={isRTL ? "rtl" : "ltr"} 
                 style={{ width: '80mm', minHeight: '105mm', margin: '0 auto' }}
              >
                <div>
                    <div className="header-title" style={{ fontSize: '16px', marginBottom: '5px', textAlign: 'center', fontWeight: 'bold' }}>
                      {currentStoreName}
                    </div>
                    <div className="header-subtitle" style={{ borderBottom: '1px dashed #000', paddingBottom: '5px', textAlign: 'center', fontSize: '12px' }}>
                      {t('hr.badge.idCard', i18n.language === 'ar' ? 'بطاقة تعريف الموظف' : i18n.language === 'fr' ? "CARTE D'IDENTITÉ EMPLOYÉ" : 'EMPLOYEE ID CARD')}
                    </div>
                    
                    <div style={{ textAlign: 'center', marginTop: '15px' }}>
                       <h2 style={{ fontSize: '20px', fontWeight: '900', margin: '0 0 5px 0' }}>{badgeEmployee.name}</h2>
                       <p style={{ fontSize: '13px', margin: '0 0 15px 0', color: '#444' }}>
                          {t(`hr.roles.${badgeEmployee.role}`, {defaultValue: badgeEmployee.role})}
                       </p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                      <div dir="ltr"> 
                          <Barcode 
                            value={badgeEmployee.pin_code} 
                            width={2.5} 
                            height={70} 
                            fontSize={16}
                            margin={0}
                            background="#ffffff"
                            lineColor="#000000"
                          />
                      </div>
                    </div>
                </div>

                <div className="footer-area" style={{ marginTop: 'auto', paddingTop: '10px', fontSize: '11px', textAlign: 'center', borderTop: '1px dashed #000' }}>
                  {t('hr.badge.scanInstruction', i18n.language === 'ar' ? 'يرجى مسح هذا الباركود عند الدخول والخروج.' : i18n.language === 'fr' ? "Veuillez scanner ce code-barres à l'entrée et à la sortie." : 'Please scan this barcode upon entry and exit.')}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full mt-4 no-print">
                 <button onClick={handleExecutePrint} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-2 rounded-lg flex items-center justify-center gap-2 transition-colors">
                   <Printer size={18} /> {t('hr.badge.printExecute', i18n.language === 'ar' ? 'طباعة' : i18n.language === 'fr' ? 'Imprimer' : 'Print')}
                 </button>

                 <button onClick={handleDownloadPDF} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-2 rounded-lg flex items-center justify-center gap-2 transition-colors">
                   <Download size={18} /> {t('hr.badge.downloadPDF', i18n.language === 'ar' ? 'استخراج PDF' : i18n.language === 'fr' ? 'Télécharger PDF' : 'Download PDF')}
                 </button>

                 <button onClick={() => setIsBadgeModalOpen(false)} className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-2 rounded-lg transition-colors">
                   {t('common.cancel', i18n.language === 'ar' ? 'إلغاء' : i18n.language === 'fr' ? 'Annuler' : 'Cancel')}
                 </button>
              </div>
            </div>
          )}
        </div>
      </Modal>

      <Modal isOpen={isEditAttendanceOpen} onClose={() => setIsEditAttendanceOpen(false)} title={t('hr.employees.actions.edit', 'تعديل توقيت الدوام')}>
        <form onSubmit={saveAttendanceEdit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('hr.table.nameWithRole', 'الموظف')}</label>
            <input type="text" value={editingRecord?.employee_name || editingRecord?.name || ''} disabled className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-400 cursor-not-allowed" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-emerald-400 mb-1 text-start">{t('hr.table.timeIn', 'وقت الدخول')}</label>
              <input type="time" step="1" required value={attTimeIn} onChange={(e) => setAttTimeIn(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-center text-lg" />
            </div>
            <div>
              <label className="block text-sm font-bold text-orange-400 mb-1 text-start">{t('hr.table.timeOut', 'وقت الخروج')}</label>
              <input type="time" step="1" value={attTimeOut} onChange={(e) => setAttTimeOut(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-center text-lg" />
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2 text-start">اترك "وقت الخروج" فارغاً إذا كان الموظف لا يزال في الدوام.</p>
          <div className="pt-4 flex justify-end gap-3 mt-4">
            <button type="button" onClick={() => setIsEditAttendanceOpen(false)} className="px-4 py-2 rounded-lg font-medium text-slate-300 hover:bg-slate-800 transition-colors">{t('common.cancel', 'إلغاء')}</button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">{t('hr.dialog.saveChanges', 'حفظ التعديلات')}</button>
          </div>
        </form>
      </Modal>

      <ConfirmAlert 
        isOpen={!!employeeToDelete}
        onClose={() => setEmployeeToDelete(null)}
        onConfirm={confirmDelete}
        title={t('hr.employees.actions.delete', 'حذف')}
        message={t('hr.employees.deleteConfirmMsg', { name: employeeToDelete?.name, defaultValue: `تأكيد الحذف` })}
        cancelText={t('common.cancel', 'إلغاء')}
        confirmText={t('common.confirm', 'تأكيد')}
      />

    </div>
  );
};

export default HR;