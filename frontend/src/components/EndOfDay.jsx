import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Play, Lock, Calculator, Banknote, AlertCircle, Clock, CheckCircle2, RotateCcw, User, LineChart, Printer, X, FileText } from 'lucide-react';
import useAuthStore from '../store/authStore';
import Modal from './ui/Modal'; 

export default function EndOfDay() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  
  const user = useAuthStore(state => state.user);
  const isSuperAdmin = user?.role === 'superadmin' || user?.role === 'admin';
  const cashierName = isSuperAdmin ? t('common.superAdmin') : (user?.username || 'Cashier');

  // حالات خاصة بالكاشير
  const [activeShift, setActiveShift] = useState(null);
  const [openingBalanceInput, setOpeningBalanceInput] = useState('');
  const [actualAmount, setActualAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [summary, setSummary] = useState({ expenses: 0, supplierPayments: 0, advances: 0, totalOut: 0 });
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  
  // حالات خاصة بالمدير
  const [isCloseDayModalOpen, setIsCloseDayModalOpen] = useState(false);
  const [showZReport, setShowZReport] = useState(false); // 🔴 حالة التقرير الكبير A4
  const [zReportData, setZReportData] = useState(null);
  const [allShifts, setAllShifts] = useState([]);
  const [grandTotals, setGrandTotals] = useState({ opening: 0, actual: 0, sales: 0 });
  
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (isSuperAdmin && window.api && window.api.getAllShiftsSummary) {
        const res = await window.api.getAllShiftsSummary();
        if (res.success) {
          setAllShifts(res.data.shifts);
          setGrandTotals(res.data.grandTotals);
        }
      } else if (window.api && window.api.getActiveShift) {
        const shift = await window.api.getActiveShift(cashierName);
        if (shift) {
          setActiveShift(shift);
          const summaryRes = await window.api.getShiftSummary(cashierName, shift.start_time);
          if (summaryRes.success) setSummary(summaryRes.data);
        } else {
          setActiveShift(null);
          setSummary({ expenses: 0, supplierPayments: 0, advances: 0, totalOut: 0 });
        }
      }
    } catch (error) {
      console.error("Error fetching shift data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [cashierName, isSuperAdmin]);

  const handleOpenShift = async (e) => {
    e.preventDefault();
    if (!openingBalanceInput) return;
    try {
      const res = await window.api.openShift({ cashierName, openingBalance: Number(openingBalanceInput) });
      if (res.success) {
        setOpeningBalanceInput('');
        fetchData();
      } else {
        const errorMsg = res.message ? t(`backendErrors.${res.message}`, { defaultValue: res.message }) : t('common.error');
        showToast('error', errorMsg);
      }
    } catch (err) { console.error(err); }
  };

  const totalOut = summary.totalOut || 0;
  const currentOpeningBalance = activeShift ? activeShift.opening_balance : 0;
  const todaySales = (actualAmount === '' || actualAmount === 0) ? 0 : (Number(actualAmount) + totalOut) - Number(currentOpeningBalance);

  const executeCloseShift = async () => {
    try {
      const res = await window.api.closeShift({
        shiftId: activeShift.id, actualCash: Number(actualAmount), difference: todaySales, note: notes
      });
      if (res.success) {
        setReceiptData({
          cashier: cashierName,
          startTime: activeShift.start_time,
          endTime: new Date().toISOString(),
          opening: currentOpeningBalance,
          out: totalOut,
          actual: Number(actualAmount),
          sales: todaySales
        });
        
        setIsConfirmModalOpen(false);
        setShowReceipt(true);
        showToast('success', t('common.success'));
      }
    } catch (err) { console.error(err); }
  };

  const handleCloseReceipt = () => {
    setShowReceipt(false);
    setActiveShift(null);
    setActualAmount('');
    setNotes('');
  };
  
  // 🔴 إغلاق اليومية وعرض تقرير الـ A4
  const executeCloseDay = async () => {
    try {
      // حفظ بيانات التقرير قبل تصفير الشاشة
      const reportSnapshot = {
        date: new Date().toISOString(),
        adminName: cashierName,
        totals: { ...grandTotals },
        shifts: [...allShifts]
      };

      const res = await window.api.closeBusinessDay(cashierName);
      if (res.success) {
        setZReportData(reportSnapshot);
        setIsCloseDayModalOpen(false);
        setShowZReport(true); // إظهار النافذة الكبيرة للطباعة
        showToast('success', t('common.success'));
        fetchData(); 
      } else {
        setIsCloseDayModalOpen(false);
        const errorMsg = res.message ? t(`backendErrors.${res.message}`, { defaultValue: res.message }) : t('common.error');
        showToast('error', errorMsg);
      }
    } catch (err) { console.error(err); }
  };

  const renderToast = () => toast && (
    <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[9999] px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 ${
      toast.type === 'success' ? 'bg-emerald-600 text-white' : toast.type === 'warning' ? 'bg-amber-600 text-white' : 'bg-red-600 text-white'
    }`}>
      {toast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
      <span className="font-bold">{toast.message}</span>
    </div>
  );

  // ==========================================
  // واجهة المراقبة للمدير
  // ==========================================
  if (isSuperAdmin) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans relative text-start">
        {renderToast()}
        
        {/* 🔵 شاشة تقرير المدير (Z-Report) بحجم A4 */}
        {showZReport && zReportData && (
          <div className="fixed inset-0 z-[9999] bg-slate-950/90 flex flex-col items-center p-4 backdrop-blur-sm overflow-y-auto" dir={isRTL ? "rtl" : "ltr"}>
            
            <div className="flex gap-4 mb-4 no-print mt-4">
              <button onClick={() => window.print()} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2 shadow-lg">
                <Printer size={20} /> طباعة التقرير (A4)
              </button>
              <button onClick={() => setShowZReport(false)} className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2 border border-slate-700">
                <X size={20} /> {t('common.close', 'إغلاق')}
              </button>
            </div>

            {/* ورقة التقرير A4 */}
{/* ورقة التقرير A4 */}
            <div className="printable-area print-a4 bg-white text-black shadow-2xl relative font-sans w-full max-w-[210mm] min-h-[297mm] p-10 mx-auto">
              
              <div className="text-center mb-8 border-b-2 border-black pb-4">
                <h2 className="text-3xl font-bold mb-2">{t('eod.store_name')}</h2>
                <h3 className="text-xl font-bold text-gray-700 mb-2">{t('zreport.title')}</h3>
                <div className="flex justify-between text-sm text-gray-600 mt-4">
                  <span>{t('zreport.date')} <strong dir="ltr">{new Date(zReportData.date).toLocaleString(i18n.language)}</strong></span>
                  <span>{t('zreport.closed_by')} <strong>{zReportData.adminName}</strong></span>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-lg font-bold bg-gray-200 p-2 mb-4">{t('zreport.summary')}</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="border p-4 rounded">
                    <p className="text-sm text-gray-500 mb-1">{t('zreport.opening')}</p>
                    <p className="font-bold text-xl">{zReportData.totals.opening.toLocaleString()} {t('currency')}</p>
                  </div>
                  <div className="border p-4 rounded bg-gray-50">
                    <p className="text-sm text-gray-500 mb-1">{t('zreport.net_sales')}</p>
                    <p className="font-bold text-xl">{zReportData.totals.sales.toLocaleString()} {t('currency')}</p>
                  </div>
                  <div className="border p-4 rounded border-black bg-black text-white">
                    <p className="text-sm text-gray-400 mb-1">{t('zreport.actual_cash')}</p>
                    <p className="font-bold text-2xl">{zReportData.totals.actual.toLocaleString()} {t('currency')}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold bg-gray-200 p-2 mb-4">{t('zreport.shifts_details')}</h4>
                <table className="w-full border-collapse text-sm text-start">
                  <thead>
                    <tr className="border-b-2 border-black">
                      <th className="p-2 text-start">{t('zreport.cashier')}</th>
                      <th className="p-2 text-start">{t('zreport.time_in')}</th>
                      <th className="p-2 text-start">{t('zreport.time_out')}</th>
                      <th className="p-2 text-center">{t('zreport.opening')}</th>
                      <th className="p-2 text-center">{t('zreport.deductions')}</th>
                      <th className="p-2 text-center">{t('zreport.sales')}</th>
                      <th className="p-2 text-center">{t('zreport.actual_drawer')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {zReportData.shifts.map((s, idx) => (
                      <tr key={idx} className="border-b border-gray-300">
                        <td className="p-2 font-bold">{s.cashier_name}</td>
                        <td className="p-2" dir="ltr">{new Date(s.start_time).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' })}</td>
                        <td className="p-2" dir="ltr">{s.end_time ? new Date(s.end_time).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' }) : t('zreport.not_closed')}</td>
                        <td className="p-2 text-center">{Number(s.opening_balance).toLocaleString()}</td>
                        <td className="p-2 text-center">{s.totalOut?.toLocaleString()}</td>
                        <td className="p-2 text-center font-bold">{s.calculatedSales?.toLocaleString()}</td>
                        <td className="p-2 text-center font-bold bg-gray-100">{Number(s.actual_cash || 0).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-16 pt-8 border-t border-gray-300 flex justify-between">
                <div className="text-center w-48">
                  <p className="border-b border-black pb-1 mb-2">{t('zreport.manager_sig')}</p>
                </div>
                <div className="text-center w-48">
                  <p className="border-b border-black pb-1 mb-2">{t('zreport.company_seal')}</p>
                </div>
              </div>

              <div className="absolute bottom-10 left-0 right-0 text-center text-xs font-bold text-gray-400 font-mono">
                 POWERED BY GHERBI.AI
              </div>
            </div>
          </div>
        )}

        {!showZReport && (
          <>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-3 mb-2">
                  <LineChart className="text-blue-500" /> {t('eod.masterDashboardTitle', 'لوحة المراقبة الشاملة')}
                </h1>
                <p className="text-sm text-slate-500">{t('eod.masterDashboardDesc', 'مراقبة وإغلاق الورديات اليومية')}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setIsCloseDayModalOpen(true)} disabled={allShifts.length === 0} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-700 transition-colors disabled:opacity-50">
                  <Lock size={18} />
                  <span>{t('eod.close_day_btn')}</span>
                </button>
                <button onClick={fetchData} className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-md font-medium hover:bg-slate-700 transition-colors">
                  <RotateCcw size={18} className={isLoading ? 'animate-spin' : ''} />
                  <span>{t('common.refresh')}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl shadow-lg border-t-4 border-t-blue-500">
                <h3 className="text-slate-400 text-sm mb-1">{t('eod.grandTotalOpening')}</h3>
                <p className="text-3xl font-bold text-white mt-2">{grandTotals.opening.toLocaleString()} {t('currency')}</p>
              </div>
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl shadow-lg border-t-4 border-t-emerald-500">
                <h3 className="text-slate-400 text-sm mb-1">{t('eod.grandTotalActual')}</h3>
                <p className="text-3xl font-bold text-emerald-400 mt-2">{grandTotals.actual.toLocaleString()} {t('currency')}</p>
              </div>
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl shadow-lg border-t-4 border-t-amber-500">
                <h3 className="text-slate-400 text-sm mb-1">{t('eod.grandTotalSales')}</h3>
                <p className="text-3xl font-bold text-amber-400 mt-2">{grandTotals.sales.toLocaleString()} {t('currency')}</p>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
              <div className="p-4 border-b border-slate-800 bg-slate-950/30">
                <h3 className="font-bold text-white">{t('eod.allShifts')}</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-start border-collapse" dir={i18n.dir()}>
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-950/80">
                      <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('eod.cashierName')}</th>
                      <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('hr.table.status')}</th>
                      <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('eod.timing')}</th>
                      <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('eod.opening_balance')}</th>
                      <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('eod.today_sales')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allShifts.length === 0 ? (
                      <tr><td colSpan="5" className="text-center py-12 text-slate-500">{t('common.noResults')}</td></tr>
                    ) : (
                      allShifts.map(s => (
                        <tr key={s.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                          <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                            <div className="bg-slate-800 p-2 rounded-full"><User size={14} className="text-blue-400"/></div>
                            {s.cashier_name}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${s.status === 'open' ? 'bg-emerald-950 text-emerald-400 border-emerald-900' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                              {s.status === 'open' ? t('eod.statusOpen') : t('eod.statusClosed')}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center text-sm text-slate-400">
                            <div className="flex flex-col gap-1">
                              <span className="text-emerald-400/80">{new Date(s.start_time).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' })}</span>
                              {s.end_time ? <span className="text-red-400/80">{new Date(s.end_time).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' })}</span> : <span className="text-slate-600">---</span>}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center font-bold text-slate-300">{Number(s.opening_balance).toLocaleString()} {t('currency')}</td>
                          <td className="px-6 py-4 text-center font-bold text-amber-400">{s.status === 'open' ? '---' : `+${s.calculatedSales.toLocaleString()} ${t('currency')}`}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <Modal isOpen={isCloseDayModalOpen} onClose={() => setIsCloseDayModalOpen(false)} title={t('eod.close_day_btn')}>
              <div className="p-4 text-start">
                <p className="text-white mb-6 text-lg">{t('eod.close_day_confirm')}</p>
                <div className="bg-slate-950 p-4 rounded-lg mb-6 border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                     <span className="text-slate-400">{t('eod.grandTotalActual')}</span>
                     <span className="text-emerald-400 font-bold text-xl">{grandTotals.actual.toLocaleString()} {t('currency')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-slate-400">{t('eod.grandTotalSales')}</span>
                     <span className="text-amber-400 font-bold text-xl">{grandTotals.sales.toLocaleString()} {t('currency')}</span>
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <button onClick={() => setIsCloseDayModalOpen(false)} className="px-4 py-2 text-white bg-slate-700 rounded-lg hover:bg-slate-600">{t('common.cancel', 'إلغاء')}</button>
                  <button onClick={executeCloseDay} className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 flex items-center gap-2"><Lock size={18}/> {t('common.confirm', 'تأكيد')}</button>
                </div>
              </div>
            </Modal>
          </>
        )}
      </div>
    );
  }

  // ==========================================
  // واجهة الكاشير العادي
  // ==========================================
  if (isLoading) return <div className="p-6 text-center text-slate-500">{t('hr.table.loading')}</div>;

  if (!activeShift && !showReceipt) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans flex items-center justify-center relative">
        {renderToast()}
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mb-4">
              <Play size={32} className="text-blue-500 ms-1" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">{t('eod.open_shift_title')}</h1>
            <p className="text-slate-500 text-sm">{t('eod.open_shift_desc')} <span className="font-bold text-white">{cashierName}</span></p>
          </div>
          <form onSubmit={handleOpenShift} className="space-y-6 text-start" dir={isRTL ? "rtl" : "ltr"}>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">{t('eod.opening_balance')} ({t('currency')})</label>
              <div className="relative">
                <Banknote size={18} className="absolute start-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type="number" min="0" required value={openingBalanceInput} onChange={(e) => setOpeningBalanceInput(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 ps-11 pe-4 text-white focus:outline-none focus:border-blue-500 text-lg font-bold" placeholder="0.00" />
              </div>
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors flex justify-center items-center gap-2">
              <Play size={18} /> {t('eod.open_shift_btn')}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const shiftStartTime = activeShift ? new Date(activeShift.start_time).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' }) : '';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans relative">
      {renderToast()}
      
      {/* 🔴 شاشة طباعة الوصل (X-Report) بحجم A7 */}
      {showReceipt && receiptData && (
        <div className="fixed inset-0 z-[9999] bg-slate-950/90 flex items-center justify-center p-4 backdrop-blur-sm" dir="ltr">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            
            <div className="flex md:flex-col gap-3 no-print order-2 md:order-1">
              <button onClick={() => window.print()} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all">
                <Printer size={20} /> {t('eod.print_receipt')}
              </button>
              <button onClick={handleCloseReceipt} className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 border border-slate-700 transition-all">
                <X size={20} /> {t('common.close', 'إغلاق')}
              </button>
            </div>

{/* 🔴 شاشة طباعة الوصل (X-Report) بحجم A7 */}
            <div className="printable-area print-a7 bg-white text-black p-3 w-[80mm] relative font-mono text-sm order-1 md:order-2" dir={isRTL ? "rtl" : "ltr"}>
              
              <div className="text-center mb-6">
                {/* تم حل مشكلة الأقواس بإضافة bdi */}
                <h2 className="text-2xl font-bold mb-1"><bdi>{t('eod.store_name')}</bdi></h2>
                <div className="border-b-2 border-dashed border-black pb-2 mt-2">
                  <p className="font-bold text-lg">{t('eod.x_report')}</p>
                  <p className="text-xs mt-1">{new Date().toLocaleDateString(i18n.language)}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6 border-b-2 border-dashed border-black pb-6 text-start">
                <div className="flex justify-between items-center gap-2">
                  <span className="font-bold whitespace-nowrap">{t('eod.cashierName')}:</span>
                  <span className="text-end">{receiptData.cashier}</span>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <span className="font-bold whitespace-nowrap">{t('hr.table.timeIn')}:</span>
                  <span dir="ltr" className="text-end">{new Date(receiptData.startTime).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <span className="font-bold whitespace-nowrap">{t('eod.time_out')}:</span>
                  <span dir="ltr" className="text-end">{new Date(receiptData.endTime).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>

              <div className="space-y-3 mb-6 border-b-2 border-dashed border-black pb-6 text-start">
                <div className="flex justify-between items-center gap-2">
                  <span className="whitespace-nowrap">{t('eod.opening_balance')}:</span>
                  {/* أضفنا bdi لحماية الأرقام والعملة */}
                  <span className="font-bold text-end"><bdi>{receiptData.opening.toLocaleString()} {t('currency')}</bdi></span>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <span className="whitespace-nowrap">{t('eod.total_deducted')}:</span>
                  {/* إجبار إظهار الرقم حتى لو كان 0 */}
                  <span className="font-bold text-end"><bdi>{(receiptData.out || 0).toLocaleString()} {t('currency')}</bdi></span>
                </div>
                <div className="flex justify-between items-center gap-2 bg-gray-100 p-1 -mx-1 px-1">
                  <span className="font-bold whitespace-nowrap">{t('eod.actual_cash')}:</span>
                  <span className="font-bold text-lg text-end"><bdi>{(receiptData.actual || 0).toLocaleString()} {t('currency')}</bdi></span>
                </div>
              </div>

              <div className="flex justify-between items-center text-lg font-bold mb-8 bg-black text-white p-2 rounded-sm text-start">
                 <span className="whitespace-nowrap">{t('eod.today_sales')}:</span>
                 <span className="text-end"><bdi>{(receiptData.sales || 0).toLocaleString()} {t('currency')}</bdi></span>
              </div>

              <div className="text-center text-xs space-y-2 mt-8">
                 <p className="border-t-2 border-dashed border-black pt-4">{t('eod.receipt_footer')}</p>
                 <p className="font-bold text-gray-500">POWERED BY GHERBI.AI</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {!showReceipt && (
        <>
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3"><Lock className="text-red-500" /> {t('eod.title')}</h1>
              <p className="text-slate-500 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>{t('eod.active_shift')}: <strong className="text-white">{cashierName}</strong></p>
            </div>
            <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg flex items-center gap-3">
              <Clock className="text-blue-400" size={18} />
              <span className="text-sm font-medium">{t('hr.table.timeIn')}: {shiftStartTime}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl shadow-lg border-t-4 border-t-emerald-500">
              <h3 className="text-slate-400 text-sm mb-1">{t('eod.opening_balance')}</h3>
              <p className="text-2xl font-bold text-white">{currentOpeningBalance.toLocaleString()} {t('currency')}</p>
            </div>
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl shadow-lg border-t-4 border-t-red-500">
              <h3 className="text-slate-400 text-sm mb-1">{t('eod.total_deducted')}</h3>
              <p className="text-2xl font-bold text-red-400">{totalOut.toLocaleString()} {t('currency')}</p>
            </div>
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl shadow-lg border-t-4 border-t-blue-500">
              <h3 className="text-slate-400 text-sm mb-1">{t('eod.advances')} & {t('eod.supplier_payments')}</h3>
              <p className="text-2xl font-bold text-blue-400">{(summary.advances + summary.supplierPayments).toLocaleString()} {t('currency')}</p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
            <form onSubmit={(e) => { e.preventDefault(); if (actualAmount !== '') setIsConfirmModalOpen(true); }} className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-start" dir={isRTL ? "rtl" : "ltr"}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-emerald-400 mb-2">{t('eod.actual_cash')}</label>
                  <div className="relative">
                    <Calculator size={20} className="absolute start-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input type="number" min="0" required value={actualAmount} onChange={(e) => setActualAmount(e.target.value)} className="w-full bg-slate-950 border-2 border-emerald-900/50 rounded-lg py-4 ps-12 pe-4 text-white focus:outline-none focus:border-emerald-500 text-2xl font-bold transition-colors" placeholder="0.00" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">{t('eod.notes')}</label>
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-4 text-white focus:outline-none focus:border-blue-500" rows="3" placeholder={t('eod.notesPlaceholder')}></textarea>
                </div>
              </div>

              <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 flex flex-col justify-center">
                <div className="text-center mb-8">
                  <h3 className="text-slate-400 mb-2">{t('eod.today_sales')}</h3>
                  <p className={`text-5xl font-bold ${todaySales > 0 ? 'text-emerald-400' : todaySales < 0 ? 'text-red-500' : 'text-slate-300'}`}>{todaySales > 0 ? '+' : ''}{todaySales.toLocaleString()} <span className="text-2xl text-slate-500">{t('currency')}</span></p>
                </div>
                <button type="submit" disabled={actualAmount === ''} className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition flex justify-center items-center gap-2 text-lg shadow-lg">
                  <Lock size={24} /> {t('eod.save_btn')}
                </button>
              </div>
            </form>
          </div>

          <Modal isOpen={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)} title={t('eod.title')}>
            <div className="p-4 text-start">
              <p className="text-white mb-6 text-lg">{t('eod.confirmClose')}</p>
              <div className="bg-slate-950 p-4 rounded-lg mb-6 text-center border border-slate-800">
                <p className="text-sm text-slate-400 mb-1">{t('eod.today_sales')}</p>
                <p className={`text-2xl font-bold ${todaySales > 0 ? 'text-emerald-400' : 'text-red-400'}`}>{todaySales.toLocaleString()} {t('currency')}</p>
              </div>
              <div className="flex items-center justify-end gap-3 mt-4">
                <button onClick={() => setIsConfirmModalOpen(false)} className="px-4 py-2 text-white bg-slate-700 rounded-lg hover:bg-slate-600">{t('common.cancel', 'إلغاء')}</button>
                <button onClick={executeCloseShift} className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 flex items-center gap-2"><Lock size={18} /> {t('eod.save_btn')}</button>
              </div>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
}