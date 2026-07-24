import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Calculator, Banknote, Clock, Users, Calendar, 
  MinusCircle, CheckCircle, Plus, AlertCircle, FileText
} from 'lucide-react';

import useEmployeeStore from '../../store/employeeStore';
import usePayrollStore from '../../store/payrollStore';
import Modal from '../ui/Modal';

export default function Payroll() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  const [activeTab, setActiveTab] = useState('calculator');

  const { employees, fetchEmployees } = useEmployeeStore();
  const { 
    advances, salaries, fetchAdvances, fetchSalaries, addAdvance, 
    calculatePayroll, payrollResult, paySalary, clearPayrollResult 
  } = usePayrollStore();

  const today = new Date();
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7);
  
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [startDate, setStartDate] = useState(lastWeek.toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(today.toISOString().split('T')[0]);
  const [hourlyRate, setHourlyRate] = useState('');
  
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [advanceData, setAdvanceData] = useState({ 
    employeeId: '', amount: '', date: today.toISOString().split('T')[0], caisseSource: '', note: '' 
  });

  useEffect(() => {
    fetchEmployees();
    fetchAdvances();
    fetchSalaries();
  }, [fetchEmployees, fetchAdvances, fetchSalaries]);

  useEffect(() => {
    clearPayrollResult();
  }, [selectedEmployee, clearPayrollResult]);

  const handleCalculate = async (e) => {
    if (e) e.preventDefault();
    if (!selectedEmployee || !hourlyRate || !startDate || !endDate) return;
    await calculatePayroll({
      employeeId: selectedEmployee,
      startDate,
      endDate,
      hourlyRate: Number(hourlyRate)
    });
  };

const handleSaveAdvance = async (e) => {
    e.preventDefault();
    if (!advanceData.employeeId || !advanceData.caisseSource) return;
    const success = await addAdvance({
      employeeId: advanceData.employeeId,
      amount: Number(advanceData.amount),
      date: advanceData.date,
      caisseSource: advanceData.caisseSource,
      note: advanceData.note
    });
    if (success) {
      setIsAdvanceModalOpen(false);
      setAdvanceData({ employeeId: '', amount: '', date: today.toISOString().split('T')[0], caisseSource: '', note: '' });
      if (payrollResult) handleCalculate(); // إعادة الحساب لتحديث القيمة
    }
  };

const handlePaySalary = async () => {
  if (!payrollResult) return;
  
  // استخدام الترجمة لرسائل التأكيد
  if (payrollResult.netSalary < 0) {
     if (!window.confirm(t('payroll.rolloverConfirm'))) return;
  } else {
     if (!window.confirm(t('payroll.standardConfirm'))) return;
  }

  // جلب اسم الموظف لطباعته في الملاحظة
  const employeeName = employees.find(e => e.id === Number(selectedEmployee))?.name || '';

  // تجهيز البيانات مع الملاحظات المترجمة
  const payload = { 
    ...payrollResult, 
    date: today.toISOString().split('T')[0],
    rolloverNote: t('payroll.rolloverNote', { start: payrollResult.startDate, end: payrollResult.endDate }),
    expenseNote: t('payroll.expenseNote', { name: employeeName, start: payrollResult.startDate, end: payrollResult.endDate })
  };
  
// التعديل هنا لطباعة الخطأ الحقيقي إن وجد
      const res = await paySalary(payload);
      if (res.success) {
        alert(t('common.success'));
        setActiveTab('salaries');
      } else {
        alert('فشلت العملية. السبب التقني: \n' + res.error);
      }
};


  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans flex flex-col gap-6">
      
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3 mb-2">
            <Banknote className="text-emerald-500" />
            {t('payroll.title')}
          </h1>
          <p className="text-sm text-slate-500">{t('payroll.subtitle')}</p>
        </div>
      </div>

      <div className="flex bg-slate-900 border border-slate-800 rounded-lg w-fit p-1 overflow-x-auto">
        <button onClick={() => setActiveTab('calculator')} className={`flex items-center gap-2 px-6 py-2.5 rounded-md font-medium transition-colors whitespace-nowrap ${activeTab === 'calculator' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
          <Calculator size={18} /> {t('payroll.tabs.calculator')}
        </button>
        <button onClick={() => setActiveTab('advances')} className={`flex items-center gap-2 px-6 py-2.5 rounded-md font-medium transition-colors whitespace-nowrap ${activeTab === 'advances' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
          <MinusCircle size={18} /> {t('payroll.tabs.advances')}
        </button>
        <button onClick={() => setActiveTab('salaries')} className={`flex items-center gap-2 px-6 py-2.5 rounded-md font-medium transition-colors whitespace-nowrap ${activeTab === 'salaries' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
          <FileText size={18} /> {t('payroll.tabs.salaries')}
        </button>
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
                  {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name} ({emp.role})</option>)}
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
                <input type="number" step="0.01" min="1" required value={hourlyRate} onChange={e => setHourlyRate(e.target.value)} placeholder="مثال: 130" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white" />
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
                  <div className="flex items-center gap-3">
                    <MinusCircle className="text-red-400" size={24} />
                    <p className="text-slate-400 font-medium">{t('payroll.deductions')}</p>
                  </div>
                  <p className="text-xl font-bold text-red-400">-{payrollResult.totalAdvances.toLocaleString()}</p>
                </div>
                <div className={`p-5 rounded-lg border text-center col-span-2 ${payrollResult.netSalary < 0 ? 'bg-red-950/30 border-red-900/50 ring-1 ring-red-500/50' : 'bg-emerald-950/30 border-emerald-900/50 ring-1 ring-emerald-500/50'}`}>
                  <p className="text-sm text-slate-300 mb-2">{t('payroll.netSalary')}</p>
                  <p className={`text-4xl font-bold ${payrollResult.netSalary < 0 ? 'text-red-500' : 'text-emerald-400'}`}>
                    {payrollResult.netSalary.toLocaleString()} DA
                  </p>
                  {payrollResult.netSalary < 0 && <p className="text-xs text-red-400 mt-2">{t('payroll.negativeSalaryError')}</p>}
                </div>
              </div>
            <button 
                onClick={handlePaySalary} 
                // الزر سيصبح برتقالياً إذا كان بالسالب ليدل على الترحيل، وأخضر إذا كان دفعاً عادياً
                className={`w-full text-white py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-colors ${payrollResult.netSalary < 0 ? 'bg-orange-600 hover:bg-orange-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}
              >
                <CheckCircle size={24} /> 
                {payrollResult.netSalary < 0 ? t('payroll.rolloverBtn') : t('payroll.payBtn')}
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'advances' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/30">
            <h3 className="font-bold text-white flex items-center gap-2"><MinusCircle size={18} className="text-red-400" /> {t('payroll.tabs.advances')}</h3>
            <button onClick={() => setIsAdvanceModalOpen(true)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-md transition-colors">
              <Plus size={18} /> {t('payroll.addAdvance')}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-start border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80">
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('hr.table.name')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('payroll.date')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('payroll.caisse')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('payroll.amount')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('payroll.note')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('hr.table.status')}</th>
                </tr>
              </thead>
              <tbody>
                {advances.length === 0 ? (
                  <tr><td colSpan="6" className="text-center py-12 text-slate-500">{t('common.noResults')}</td></tr>
                ) : (
                  advances.map(adv => (
                    <tr key={adv.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                      <td className="px-6 py-4 font-medium text-white">{adv.employee_name}</td>
                      <td className="px-6 py-4 text-slate-400 text-sm">{adv.date}</td>
                      <td className="px-6 py-4 text-slate-300 text-sm">{adv.caisse_source || '-'}</td>
                      <td className="px-6 py-4 font-bold text-red-400">{adv.amount.toLocaleString()} DA</td>
                      <td className="px-6 py-4 text-slate-400 text-sm">{adv.note || '-'}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${adv.status === 'pending' ? 'bg-orange-950 text-orange-400 border-orange-900' : 'bg-emerald-950 text-emerald-400 border-emerald-900'}`}>
                          {adv.status === 'pending' ? t('payroll.statusPending') : t('payroll.statusPaid')}
                        </span>
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
          <div className="p-4 border-b border-slate-800 bg-slate-950/30">
            <h3 className="font-bold text-white flex items-center gap-2"><FileText size={18} className="text-blue-400" /> {t('payroll.tabs.salaries')}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-start border-collapse min-w-[800px]">
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
                      <td className="px-6 py-4 font-medium text-white">
                        {sal.employee_name}
                        <div className="text-xs text-slate-500 mt-1">{t('payroll.date')}: {sal.payment_date}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-sm text-center">{sal.start_date} <br/> {sal.end_date}</td>
                      <td className="px-6 py-4 text-blue-400 font-medium text-center">{sal.total_hours}</td>
                      <td className="px-6 py-4 text-slate-300 text-center">{sal.total_hours * sal.hourly_rate}</td>
                      <td className="px-6 py-4 text-red-400 font-medium text-center">-{sal.total_advances}</td>
                      <td className="px-6 py-4 font-bold text-emerald-400 text-center bg-slate-950/50">{sal.net_salary.toLocaleString()} DA</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal isOpen={isAdvanceModalOpen} onClose={() => setIsAdvanceModalOpen(false)} title={t('payroll.addAdvance')}>
        <form onSubmit={handleSaveAdvance} className="space-y-4 text-start">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">{t('payroll.selectEmployee')}</label>
            <select required value={advanceData.employeeId} onChange={e => setAdvanceData({...advanceData, employeeId: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white" dir={isRTL ? "rtl" : "ltr"}>
              <option value="" disabled>{t('payroll.selectEmployee')}</option>
              {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">{t('payroll.caisse')}</label>
            <select required value={advanceData.caisseSource} onChange={e => setAdvanceData({...advanceData, caisseSource: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white" dir={isRTL ? "rtl" : "ltr"}>
              <option value="" disabled>{t('payroll.selectCaisse')}</option>
              {employees.map(emp => <option key={emp.id} value={emp.name}>{emp.name} ({emp.role})</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">{t('payroll.amount')} (DA)</label>
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
            <button type="button" onClick={() => setIsAdvanceModalOpen(false)} className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg">{t('common.cancel')}</button>
            <button type="submit" className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium">{t('payroll.addAdvance')}</button>
          </div>
        </form>
      </Modal>

    </div>
  );
}