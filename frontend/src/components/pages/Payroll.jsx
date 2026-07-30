import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Calculator, Banknote, Clock, Users, Calendar, MinusCircle, CheckCircle, Plus, AlertCircle, FileText, Printer, Eye, CheckCircle2, Edit, Trash2, ShieldAlert } from 'lucide-react';

import useEmployeeStore from '../../store/employeeStore';
import usePayrollStore from '../../store/payrollStore';
import useAuthStore from '../../store/authStore'; // 🔴 إضافة التحقق من الصلاحيات
import ConfirmAlert from '../ui/ConfirmAlert'; 
import Modal from '../ui/Modal'; 

export default function Payroll() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('calculator');

  const { employees, fetchEmployees } = useEmployeeStore();
  const { advances, salaries, fetchAdvances, fetchSalaries, addAdvance, calculatePayroll, payrollResult, paySalary, clearPayrollResult } = usePayrollStore();
  
  // 🔴 جلب المستخدم الحالي للتحقق من صلاحياته (السوبر أدمن فقط من يعدل/يحذف السلفيات)
  const user = useAuthStore(state => state.user);
  const isSuperAdmin = user?.role === 'superadmin' || user?.role === 'admin';

  const today = new Date();
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7);
  
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [startDate, setStartDate] = useState(lastWeek.toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(today.toISOString().split('T')[0]);
  const [hourlyRate, setHourlyRate] = useState('');
  
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [advanceData, setAdvanceData] = useState({ employeeId: '', amount: '', date: today.toISOString().split('T')[0], caisseSource: '', note: '' });

  // 🔴 حالات جديدة للتعديل والحذف
  const [editingAdvance, setEditingAdvance] = useState(null);
  const [advanceToDelete, setAdvanceToDelete] = useState(null);

  const [confirmModalData, setConfirmModalData] = useState(null);

  // نظام الإشعارات الذكي (Toast)
  const [toast, setToast] = useState(null);
  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    fetchEmployees();
    fetchAdvances();
    fetchSalaries();
  }, []);

  useEffect(() => {
    if(selectedEmployee) {
       clearPayrollResult();
    }
  }, [selectedEmployee]);

  const handleCalculate = async (e) => {
    if (e) e.preventDefault();
    if (!selectedEmployee || !hourlyRate || !startDate || !endDate) return;
    await calculatePayroll({ employeeId: selectedEmployee, startDate, endDate, hourlyRate: Number(hourlyRate) });
  };

  // 🔴 دالة لفتح نافذة التعديل مع تعبئة البيانات
  const openEditAdvanceModal = (adv) => {
    setEditingAdvance(adv);
    setAdvanceData({
      employeeId: adv.employee_id,
      amount: adv.amount,
      date: adv.date,
      caisseSource: adv.caisse_source || '',
      note: adv.note || ''
    });
    setIsAdvanceModalOpen(true);
  };

  // 🔴 تعديل دالة الحفظ لتدعم الإضافة والتحديث
  const handleSaveAdvance = async (e) => {
    e.preventDefault();
    if (!advanceData.employeeId || !advanceData.caisseSource) return;
    
    let success = false;

    if (editingAdvance) {
      // تحديث سلفة موجودة
      if (window.api && window.api.updateAdvance) {
        const res = await window.api.updateAdvance(editingAdvance.id, {
          amount: Number(advanceData.amount),
          date: advanceData.date,
          caisseSource: advanceData.caisseSource,
          note: advanceData.note
        });
        success = res?.success;
      }
    } else {
      // إضافة سلفة جديدة
      success = await addAdvance({ employeeId: advanceData.employeeId, amount: Number(advanceData.amount), date: advanceData.date, caisseSource: advanceData.caisseSource, note: advanceData.note });
    }

    if (success) {
      setIsAdvanceModalOpen(false);
      setEditingAdvance(null);
      setAdvanceData({ employeeId: '', amount: '', date: today.toISOString().split('T')[0], caisseSource: '', note: '' });
      if (payrollResult) handleCalculate(); 
      fetchAdvances();
      showToast('success', editingAdvance ? t('common.success', 'تم التعديل بنجاح') : t('common.success', 'تمت إضافة السلفة بنجاح'));
    } else {
      showToast('error', t('common.error', 'حدث خطأ غير متوقع'));
    }
  };

  // 🔴 دالة لتنفيذ حذف السلفة
  const executeDeleteAdvance = async () => {
    if (!advanceToDelete) return;
    if (window.api && window.api.deleteAdvance) {
      const res = await window.api.deleteAdvance(advanceToDelete);
      if (res?.success) {
        fetchAdvances();
        showToast('success', t('common.success', 'تم حذف السلفة واسترجاع الأموال للصندوق بنجاح'));
      } else {
        // 🔴 ترجمة الخطأ القادم من السيرفر، وإذا لم يكن مسجلاً يعرض الخطأ كما هو
        const translatedError = res.error ? t(`payroll.errors.${res.error}`, res.error) : t('common.error', 'حدث خطأ أثناء الحذف');
        showToast('error', translatedError);
      }
    }
    setAdvanceToDelete(null);
  };
  const handlePaySalaryClick = () => {
    if (!payrollResult) return;
    const employeeName = employees.find(e => e.id === Number(selectedEmployee))?.name || '';
    const payload = { 
      ...payrollResult, 
      date: today.toISOString().split('T')[0],
      rolloverNote: t('payroll.rolloverNote', { start: payrollResult.startDate, end: payrollResult.endDate }),
      expenseNote: t('payroll.expenseNote', { name: employeeName, start: payrollResult.startDate, end: payrollResult.endDate })
    };

    if (payrollResult.netSalary < 0) {
       setConfirmModalData({ type: 'rollover', payload });
    } else {
       setConfirmModalData({ type: 'standard', payload });
    }
  };

  const executePayment = async () => {
    if (!confirmModalData) return;
    const res = await paySalary(confirmModalData.payload);
    if (res.success) {
      setActiveTab('salaries');
      fetchSalaries();
      fetchAdvances();
      clearPayrollResult();
      showToast('success', t('common.success'));
    } else {
      showToast('error', t('common.error') + ' \n' + res.error);
    }
    setConfirmModalData(null);
  };

  const handlePrintPayslip = () => {
    if (!payrollResult) return;
    const employeeData = employees.find(e => e.id === Number(selectedEmployee));
    navigate('/preview', {
      state: { type: 'payslip', employeeName: employeeData?.name || '', period: `${startDate} - ${endDate}`, date: today.toISOString().split('T')[0], hours: payrollResult.totalHours, rate: hourlyRate, grossSalary: payrollResult.grossSalary, deductions: payrollResult.totalAdvances, netSalary: payrollResult.netSalary }
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans flex flex-col gap-6 text-start relative">
      
      {/* مكون الـ Toast */}
      {toast && (
        <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[9999] px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 ${
          toast.type === 'success' ? 'bg-emerald-600 text-white' :
          toast.type === 'warning' ? 'bg-amber-600 text-white' :
          'bg-red-600 text-white'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span className="font-bold">{toast.message}</span>
        </div>
      )}

      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3 mb-2"><Banknote className="text-emerald-500" />{t('payroll.title')}</h1>
          <p className="text-sm text-slate-500">{t('payroll.subtitle')}</p>
        </div>
      </div>

      <div className="flex bg-slate-900 border border-slate-800 rounded-lg w-fit p-1 overflow-x-auto">
        <button onClick={() => setActiveTab('calculator')} className={`flex items-center gap-2 px-6 py-2.5 rounded-md font-medium transition-colors whitespace-nowrap ${activeTab === 'calculator' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}><Calculator size={18} /> {t('payroll.tabs.calculator')}</button>
        <button onClick={() => setActiveTab('advances')} className={`flex items-center gap-2 px-6 py-2.5 rounded-md font-medium transition-colors whitespace-nowrap ${activeTab === 'advances' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}><MinusCircle size={18} /> {t('payroll.tabs.advances')}</button>
        <button onClick={() => setActiveTab('salaries')} className={`flex items-center gap-2 px-6 py-2.5 rounded-md font-medium transition-colors whitespace-nowrap ${activeTab === 'salaries' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}><FileText size={18} /> {t('payroll.tabs.salaries')}</button>
      </div>

      {activeTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg h-fit">
            <h2 className="text-xl font-bold text-white mb-6">{t('payroll.calculator')}</h2>
            <form onSubmit={handleCalculate} className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-400 mb-2">{t('payroll.selectEmployee')}</label>
                <select required value={selectedEmployee} onChange={e => setSelectedEmployee(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500" dir={isRTL ? "rtl" : "ltr"}>
                  <option value="" disabled>{t('payroll.selectEmployee')}</option>
                  {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name} ({t(`hr.roles.${emp.role}`, emp.role)})</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">{t('payroll.startDate')}</label>
                <input type="date" required value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">{t('payroll.endDate')}</label>
                <input type="date" required value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-400 mb-2">{t('payroll.hourlyRate')}</label>
                <input type="number" step="0.01" min="1" required value={hourlyRate} onChange={e => setHourlyRate(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white" />
              </div>
              <div className="col-span-2 mt-4">
                <button type="submit" disabled={!selectedEmployee} className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2">
                  <Calculator size={20} /> {t('payroll.calculateBtn')}
                </button>
              </div>
            </form>
          </div>

          {payrollResult && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg border-t-4 border-t-emerald-500 animate-in fade-in h-fit">
              <h2 className="text-xl font-bold text-white mb-6">{t('payroll.results')}</h2>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-center">
                  <Clock className="mx-auto text-blue-400 mb-2" size={24} />
                  <p className="text-sm text-slate-400 mb-1">{t('payroll.totalHours')}</p>
                  <p className="text-xl font-bold text-white">{payrollResult.totalHours}</p>
                </div>
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-center">
                  <Banknote className="mx-auto text-slate-400 mb-2" size={24} />
                  <p className="text-sm text-slate-400 mb-1">{t('payroll.grossSalary')}</p>
                  <p className="text-xl font-bold text-white">{payrollResult.grossSalary.toLocaleString()}</p>
                </div>
                <div className="bg-slate-950 p-4 rounded-lg border border-red-900/30 text-center col-span-2 flex justify-between items-center">
                  <div className="flex items-center gap-3"><MinusCircle className="text-red-400" size={24} /><p className="text-slate-400 font-medium">{t('payroll.deductions')}</p></div>
                  <p className="text-xl font-bold text-red-400">-{payrollResult.totalAdvances.toLocaleString()}</p>
                </div>
                <div className={`p-5 rounded-lg border text-center col-span-2 ${payrollResult.netSalary < 0 ? 'bg-red-950/30 border-red-900/50 ring-1 ring-red-500/50' : 'bg-emerald-950/30 border-emerald-900/50 ring-1 ring-emerald-500/50'}`}>
                  <p className="text-sm text-slate-300 mb-2">{t('payroll.netSalary')}</p>
                  <p className={`text-4xl font-bold ${payrollResult.netSalary < 0 ? 'text-red-500' : 'text-emerald-400'}`}>
                    {payrollResult.netSalary.toLocaleString()} {t('currency')}
                  </p>
                  {payrollResult.netSalary < 0 && <p className="text-xs text-red-400 mt-2">{t('payroll.negativeSalaryError')}</p>}
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={handlePaySalaryClick} className={`flex-1 text-white py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-colors ${payrollResult.netSalary < 0 ? 'bg-orange-600 hover:bg-orange-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}>
                  <CheckCircle size={24} /> {payrollResult.netSalary < 0 ? t('payroll.rolloverBtn') : t('payroll.payBtn')}
                </button>
                <button onClick={handlePrintPayslip} title={t('payroll.previewPayslip')} className="bg-slate-800 hover:bg-slate-700 text-white py-4 px-6 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"><Eye size={24} /></button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'advances' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/30">
            <h3 className="font-bold text-white flex items-center gap-2"><MinusCircle size={18} className="text-red-400" /> {t('payroll.advancesTitle')}</h3>
            <button onClick={() => { setEditingAdvance(null); setIsAdvanceModalOpen(true); }} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-md transition-colors">
              <Plus size={18} /> {t('payroll.addAdvance')}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-start border-collapse min-w-[800px]" dir={isRTL ? "rtl" : "ltr"}>
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80">
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('hr.table.name')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('payroll.date')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('payroll.caisse')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('payroll.amount')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('payroll.note')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('hr.table.status')}</th>
                  {/* 🔴 عمود الإجراءات يظهر دائما، ولكن الكاشير سيرى داخله فراغاً */}
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('common.actions', 'الإجراءات')}</th>
                </tr>
              </thead>
              <tbody>
                {advances.length === 0 ? (
                  <tr><td colSpan="7" className="text-center py-12 text-slate-500">{t('common.noResults')}</td></tr>
                ) : (
                  advances.map(adv => (
                    <tr key={adv.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                      <td className="px-6 py-4 font-medium text-white">{adv.employee_name}</td>
                      <td className="px-6 py-4 text-slate-400 text-sm">{adv.date}</td>
                      <td className="px-6 py-4 text-slate-300 text-sm">{adv.caisse_source || '-'}</td>
                      <td className="px-6 py-4 font-bold text-red-400">{adv.amount.toLocaleString()} {t('currency')}</td>
                      <td className="px-6 py-4 text-slate-400 text-sm">{adv.note || '-'}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${adv.status === 'pending' ? 'bg-orange-950 text-orange-400 border-orange-900' : 'bg-emerald-950 text-emerald-400 border-emerald-900'}`}>
                          {adv.status === 'pending' ? t('payroll.statusPending') : t('payroll.statusPaid')}
                        </span>
                      </td>
                      {/* 🔴 خلية الإجراءات الديناميكية */}
                      <td className="px-6 py-4 text-center">
                        {adv.status === 'pending' ? (
                          <div className="flex items-center justify-center gap-2">
                            {isSuperAdmin ? (
                              <>
                                <button onClick={() => openEditAdvanceModal(adv)} className="p-2 text-blue-400 hover:bg-blue-900/50 rounded-lg transition-colors" title={t('common.edit', 'تعديل')}>
                                  <Edit size={18} />
                                </button>
                                <button onClick={() => setAdvanceToDelete(adv.id)} className="p-2 text-red-400 hover:bg-red-900/50 rounded-lg transition-colors" title={t('common.delete', 'حذف')}>
                                  <Trash2 size={18} />
                                </button>
                              </>
                            ) : (
                              <span className="text-slate-500">-</span>
                            )}
                          </div>
                        ) : (
                          <div className="flex items-center justify-center text-xs text-slate-500 gap-1" title={t('payroll.lockedAdvance', 'لا يمكن التعديل: تم خصمها من راتب مدفوع')}>
                            <ShieldAlert size={14} /> {t('common.locked', 'مقفلة')}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'salaries' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
          <div className="p-4 border-b border-slate-800 bg-slate-950/30 flex justify-between items-center">
            <h3 className="font-bold text-white flex items-center gap-2">
              <FileText size={18} className="text-blue-400" /> {t('payroll.tabs.salaries')}
            </h3>
            <button onClick={() => {
                if(salaries.length === 0) return showToast('warning', t('payroll.noSalariesToPrint')); 
                navigate('/preview', { state: { type: 'all-salaries', salaries: salaries }});
              }}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-md"
            >
              <Printer size={16} /> {t('payroll.printReport')}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-start border-collapse min-w-[800px]" dir={isRTL ? "rtl" : "ltr"}>
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80">
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('hr.table.name')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('payroll.period')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('payroll.totalHours')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('payroll.grossSalary')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('payroll.deductions')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('payroll.netSalary')}</th>
                </tr>
              </thead>
              <tbody>
                {salaries.length === 0 ? (
                  <tr><td colSpan="6" className="text-center py-12 text-slate-500">{t('common.noResults')}</td></tr>
                ) : (
                  salaries.map(sal => (
                    <tr key={sal.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                      <td className="px-6 py-4 font-medium text-white">{sal.employee_name}<div className="text-xs text-slate-500 mt-1">{t('payroll.date')}: {sal.payment_date}</div></td>
                      <td className="px-6 py-4 text-slate-400 text-sm text-center">{sal.start_date} <br/> {sal.end_date}</td>
                      <td className="px-6 py-4 text-blue-400 font-medium text-center">{sal.total_hours}</td>
                      <td className="px-6 py-4 text-slate-300 text-center">{sal.total_hours * sal.hourly_rate}</td>
                      <td className="px-6 py-4 text-red-400 font-medium text-center">-{sal.total_advances}</td>
                      <td className="px-6 py-4 font-bold text-emerald-400 text-center bg-slate-950/50">{sal.net_salary.toLocaleString()} {t('currency')}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 🔴 النافذة المنبثقة لإضافة/تعديل السلفة */}
      <Modal isOpen={isAdvanceModalOpen} onClose={() => { setIsAdvanceModalOpen(false); setEditingAdvance(null); }} title={editingAdvance ? t('payroll.editAdvance', 'تعديل السلفة') : t('payroll.addAdvance')}>
        <form onSubmit={handleSaveAdvance} className="space-y-4 text-start">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">{t('payroll.selectEmployee')}</label>
            <select required disabled={!!editingAdvance} value={advanceData.employeeId} onChange={e => setAdvanceData({...advanceData, employeeId: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white disabled:opacity-60" dir={isRTL ? "rtl" : "ltr"}>
              <option value="" disabled>{t('payroll.selectEmployee')}</option>
              {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
            </select>
            {editingAdvance && <p className="text-xs text-slate-500 mt-1">{t('payroll.employeeEditNotice', 'لا يمكن تغيير اسم الموظف عند التعديل، لسلامة الحسابات.')}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">{t('payroll.caisse')}</label>
            <select required value={advanceData.caisseSource} onChange={e => setAdvanceData({...advanceData, caisseSource: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white" dir={isRTL ? "rtl" : "ltr"}>
              <option value="" disabled>{t('payroll.selectCaisse', '-- اختر المصدر --')}</option>
              {employees.map(emp => <option key={emp.id} value={emp.name}>{emp.name} ({t(`hr.roles.${emp.role}`, emp.role)})</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">{t('payroll.amount')} ({t('currency')})</label>
            <input type="number" min="1" required value={advanceData.amount} onChange={e => setAdvanceData({...advanceData, amount: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">{t('payroll.date')}</label>
            <input type="date" required value={advanceData.date} onChange={e => setAdvanceData({...advanceData, date: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">{t('payroll.note')}</label>
            <input type="text" value={advanceData.note} onChange={e => setAdvanceData({...advanceData, note: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white" />
          </div>
          <div className="pt-4 flex justify-end gap-3 mt-6">
            <button type="button" onClick={() => { setIsAdvanceModalOpen(false); setEditingAdvance(null); }} className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg">{t('common.cancel')}</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium">{editingAdvance ? t('common.saveChanges', 'حفظ التعديلات') : t('payroll.addAdvance')}</button>
          </div>
        </form>
      </Modal>

      {/* 🔴 النافذة المخصصة لتأكيد دفع الراتب */}
      <ConfirmAlert 
        isOpen={!!confirmModalData}
        onClose={() => setConfirmModalData(null)}
        onConfirm={executePayment}
        title={t('payroll.payBtn')}
        message={confirmModalData?.type === 'rollover' ? t('payroll.rolloverConfirm') : t('payroll.standardConfirm')}
        confirmText={t('common.success')}
        confirmColor={confirmModalData?.type === 'rollover' ? 'bg-orange-600 hover:bg-orange-700' : 'bg-emerald-600 hover:bg-emerald-700'}
      />

      {/* 🔴 النافذة المخصصة لتأكيد حذف السلفة */}
      <ConfirmAlert 
        isOpen={!!advanceToDelete}
        onClose={() => setAdvanceToDelete(null)}
        onConfirm={executeDeleteAdvance}
        title={t('payroll.deleteAdvanceTitle', 'حذف السلفة')}
        message={t('payroll.deleteAdvanceMsg', 'هل أنت متأكد من إلغاء هذه السلفة؟ سيتم استرجاع قيمتها مباشرة إلى صندوق المصاريف.')}
        confirmText={t('common.delete', 'حذف')}
        confirmColor="bg-red-600 hover:bg-red-700"
      />
    </div>
  );
}