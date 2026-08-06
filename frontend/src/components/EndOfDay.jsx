import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Play, Lock, Calculator, Banknote, AlertCircle, Clock, CheckCircle2, RotateCcw, User, LineChart, Printer, X } from 'lucide-react';
import useAuthStore from '../store/authStore';
import Modal from './ui/Modal'; 

export default function EndOfDay() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  
  const user = useAuthStore(state => state.user);
  const isSuperAdmin = user?.role === 'superadmin';
  const cashierName = isSuperAdmin ? t('common.superAdmin') : (user?.username || 'Cashier');

  // قراءة اسم المحل
  const currentStoreName = localStorage.getItem('storeName') || 'GHERBI.AI';

  const [activeShift, setActiveShift] = useState(null);
  const [openingBalanceInput, setOpeningBalanceInput] = useState('');
  const [actualAmount, setActualAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [summary, setSummary] = useState({ expenses: 0, supplierPayments: 0, advances: 0, totalOut: 0 });
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  
  // حالات خاصة بالكاشير (وصل 80mm)
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  
  // حالات خاصة بالمدير (تقرير A4)
  const [isCloseDayModalOpen, setIsCloseDayModalOpen] = useState(false);
  const [showZReport, setShowZReport] = useState(false); 
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
  
  const executeCloseDay = async () => {
    try {
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
        setShowZReport(true); 
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
  // واجهة المراقبة للمدير (SuperAdmin)
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

            <div className="printable-area bg-white text-black shadow-2xl relative font-sans w-full max-w-[210mm] min-h-[297mm] p-10 mx-auto">
              <div className="text-center mb-8 border-b-2 border-black pb-4">
                <h2 className="text-3xl font-bold mb-2">{currentStoreName}</h2>
                <h3 className="text-xl font-bold text-gray-700 mb-2">{t('zreport.title', 'التقرير الختامي (Z-REPORT)')}</h3>
                <div className="flex justify-between text-sm text-gray-600 mt-4 font-bold">
                  <span>{t('zreport.date', 'التاريخ:')} <span dir="ltr">{new Date(zReportData.date).toLocaleString(i18n.language)}</span></span>
                  <span>{t('zreport.closed_by', 'تم الإغلاق بواسطة:')} <span>{zReportData.adminName}</span></span>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-lg font-bold bg-gray-200 p-2 mb-4 border border-black">{t('zreport.summary', 'الملخص المالي لليوم')}</h4>
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div className="border-2 border-black rounded-lg p-4">
                    <p className="text-sm font-bold text-gray-600 mb-1">{t('zreport.opening', 'إجمالي الافتتاح')}</p>
                    <p className="font-black text-xl" dir="ltr">{zReportData.totals.opening.toLocaleString()} {t('currency')}</p>
                  </div>
                  <div className="border-2 border-black rounded-lg p-4 bg-gray-50">
                    <p className="text-sm font-bold text-gray-600 mb-1">{t('zreport.net_sales', 'صافي المبيعات')}</p>
                    <p className="font-black text-xl" dir="ltr">{zReportData.totals.sales.toLocaleString()} {t('currency')}</p>
                  </div>
                  <div className="border-2 border-black rounded-lg p-4 bg-gray-100">
                    <p className="text-sm font-bold text-gray-800 mb-1">{t('zreport.actual_cash', 'إجمالي الصندوق الفعلي')}</p>
                    <p className="font-black text-2xl" dir="ltr">{zReportData.totals.actual.toLocaleString()} {t('currency')}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold bg-gray-200 p-2 mb-4 border border-black">{t('zreport.shifts_details', 'تفاصيل الورديات')}</h4>
                <table className="w-full border-collapse text-sm text-center border-2 border-black">
                  <thead>
                    <tr className="border-b-2 border-black bg-gray-100">
                      <th className="p-3 border border-black">{t('zreport.cashier', 'الكاشير')}</th>
                      <th className="p-3 border border-black">{t('zreport.time_in', 'الدخول')}</th>
                      <th className="p-3 border border-black">{t('zreport.time_out', 'الخروج')}</th>
                      <th className="p-3 border border-black">{t('zreport.opening', 'الافتتاح')}</th>
                      <th className="p-3 border border-black">{t('zreport.deductions', 'مسحوبات')}</th>
                      <th className="p-3 border border-black">{t('zreport.sales', 'المبيعات')}</th>
                      <th className="p-3 border border-black">{t('zreport.actual_drawer', 'الدرج الفعلي')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {zReportData.shifts.map((s, idx) => (
                      <tr key={idx} className="border-b border-black font-bold">
                        <td className="p-3 border border-black">{s.cashier_name}</td>
                        <td className="p-3 border border-black" dir="ltr">{new Date(s.start_time).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' })}</td>
                        <td className="p-3 border border-black" dir="ltr">{s.end_time ? new Date(s.end_time).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' }) : t('zreport.not_closed')}</td>
                        <td className="p-3 border border-black" dir="ltr">{Number(s.opening_balance).toLocaleString()}</td>
                        <td className="p-3 border border-black" dir="ltr">{s.totalOut?.toLocaleString()}</td>
                        <td className="p-3 border border-black" dir="ltr">{s.calculatedSales?.toLocaleString()}</td>
                        <td className="p-3 border border-black bg-gray-50" dir="ltr">{Number(s.actual_cash || 0).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-16 pt-8 border-t-2 border-black flex justify-between font-bold text-lg px-8">
                <div className="text-center w-48">
                  <p className="border-b-2 border-black pb-2 mb-2">{t('zreport.manager_sig', 'توقيع الإدارة')}</p>
                </div>
                <div className="text-center w-48">
                  <p className="border-b-2 border-black pb-2 mb-2">{t('zreport.company_seal', 'ختم المحل')}</p>
                </div>
              </div>

              <div className="absolute bottom-6 left-0 right-0 text-center text-sm font-bold text-gray-500">
                 POWERED BY GHERBI.AI
              </div>
            </div>
          </div>
        )}

        {/* لوحة تحكم المدير العادية */}
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
                <button onClick={() => setIsCloseDayModalOpen(true)} disabled={allShifts.length === 0} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-700 transition-colors disabled:opacity-50 shadow-lg shadow-red-900/20">
                  <Lock size={18} />
                  <span>{t('eod.close_day_btn', 'إغلاق اليومية (Z-Report)')}</span>
                </button>
                <button onClick={fetchData} className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-md font-medium hover:bg-slate-700 transition-colors border border-slate-700">
                  <RotateCcw size={18} className={isLoading ? 'animate-spin' : ''} />
                  <span>{t('common.refresh', 'تحديث')}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl shadow-lg border-t-4 border-t-blue-500">
                <h3 className="text-slate-400 text-sm mb-1">{t('eod.grandTotalOpening', 'إجمالي الافتتاح')}</h3>
                <p className="text-3xl font-bold text-white mt-2">{grandTotals.opening.toLocaleString()} {t('currency')}</p>
              </div>
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl shadow-lg border-t-4 border-t-emerald-500">
                <h3 className="text-slate-400 text-sm mb-1">{t('eod.grandTotalActual', 'إجمالي الدرج الفعلي')}</h3>
                <p className="text-3xl font-bold text-emerald-400 mt-2">{grandTotals.actual.toLocaleString()} {t('currency')}</p>
              </div>
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl shadow-lg border-t-4 border-t-amber-500">
                <h3 className="text-slate-400 text-sm mb-1">{t('eod.grandTotalSales', 'إجمالي المبيعات')}</h3>
                <p className="text-3xl font-bold text-amber-400 mt-2">{grandTotals.sales.toLocaleString()} {t('currency')}</p>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
              <div className="p-4 border-b border-slate-800 bg-slate-950/30">
                <h3 className="font-bold text-white">{t('eod.allShifts', 'جميع الورديات')}</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-start border-collapse" dir={i18n.dir()}>
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-950/80">
                      <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('eod.cashierName', 'الكاشير')}</th>
                      <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('hr.table.status', 'الحالة')}</th>
                      <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('eod.timing', 'التوقيت')}</th>
                      <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('eod.opening_balance', 'صندوق الافتتاح')}</th>
                      <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('eod.today_sales', 'المبيعات')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allShifts.length === 0 ? (
                      <tr><td colSpan="5" className="text-center py-12 text-slate-500">{t('common.noResults', 'لا توجد بيانات')}</td></tr>
                    ) : (
                      allShifts.map(s => (
                        <tr key={s.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                          <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                            <div className="bg-slate-800 p-2 rounded-full"><User size={14} className="text-blue-400"/></div>
                            {s.cashier_name}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${s.status === 'open' ? 'bg-emerald-950 text-emerald-400 border-emerald-900' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                              {s.status === 'open' ? t('eod.statusOpen', 'مفتوح') : t('eod.statusClosed', 'مغلق')}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center text-sm text-slate-400">
                            <div className="flex flex-col gap-1">
                              <span className="text-emerald-400/80" dir="ltr">{new Date(s.start_time).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' })}</span>
                              {s.end_time ? <span className="text-red-400/80" dir="ltr">{new Date(s.end_time).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' })}</span> : <span className="text-slate-600">---</span>}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center font-bold text-slate-300" dir="ltr">{Number(s.opening_balance).toLocaleString()} {t('currency')}</td>
                          <td className="px-6 py-4 text-center font-bold text-amber-400" dir="ltr">{s.status === 'open' ? '---' : `+${s.calculatedSales.toLocaleString()} ${t('currency')}`}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <Modal isOpen={isCloseDayModalOpen} onClose={() => setIsCloseDayModalOpen(false)} title={t('eod.close_day_btn', 'إغلاق اليومية')}>
              <div className="p-4 text-start">
                <p className="text-white mb-6 text-lg">{t('eod.close_day_confirm', 'هل أنت متأكد من إغلاق اليومية؟')}</p>
                <div className="bg-slate-950 p-4 rounded-lg mb-6 border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                      <span className="text-slate-400">{t('eod.grandTotalActual', 'إجمالي الدرج الفعلي')}</span>
                      <span className="text-emerald-400 font-bold text-xl" dir="ltr">{grandTotals.actual.toLocaleString()} {t('currency')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                      <span className="text-slate-400">{t('eod.grandTotalSales', 'إجمالي المبيعات')}</span>
                      <span className="text-amber-400 font-bold text-xl" dir="ltr">{grandTotals.sales.toLocaleString()} {t('currency')}</span>
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
  if (isLoading) return <div className="p-6 text-center text-slate-500">{t('hr.table.loading', 'جاري التحميل...')}</div>;

  if (!activeShift && !showReceipt) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans flex items-center justify-center relative">
        {renderToast()}
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mb-4">
              <Play size={32} className="text-blue-500 ms-1" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">{t('eod.open_shift_title', 'فتح وردية جديدة')}</h1>
            <p className="text-slate-500 text-sm">{t('eod.open_shift_desc', 'جاري فتح الصندوق للموظف')} <span className="font-bold text-white">{cashierName}</span></p>
          </div>
          <form onSubmit={handleOpenShift} className="space-y-6 text-start" dir={isRTL ? "rtl" : "ltr"}>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">{t('eod.opening_balance', 'مبلغ الافتتاح (فوندوكاس)')}</label>
              <div className="relative">
                <Banknote size={18} className="absolute start-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type="number" min="0" required value={openingBalanceInput} onChange={(e) => setOpeningBalanceInput(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 ps-11 pe-4 text-white focus:outline-none focus:border-blue-500 text-lg font-bold" placeholder="0.00" />
              </div>
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors flex justify-center items-center gap-2 shadow-lg">
              <Play size={18} /> {t('eod.open_shift_btn', 'بدء الوردية')}
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
      
      {/* 🔴 شاشة طباعة الوصل (X-Report) بحجم 80mm - متوافقة مع الكلاسات الصارمة */}
      {showReceipt && receiptData && (
        <div className="fixed inset-0 z-[9999] bg-slate-950/90 flex flex-col items-center p-4 backdrop-blur-sm overflow-y-auto" dir={isRTL ? "rtl" : "ltr"}>
          
          <div className="flex gap-4 mb-4 no-print mt-4">
            {/* تم تصحيح الخطأ القاتل هنا باستدعاء window.print() بدلاً من الدالة الوهمية */}
            <button onClick={() => window.print()} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2 shadow-lg">
              <Printer size={20} /> {t('eod.print_receipt', 'طباعة الوصل')}
            </button>
            <button onClick={handleCloseReceipt} className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2 border border-slate-700">
              <X size={20} /> {t('common.close', 'إغلاق')}
            </button>
          </div>

          <div className="receipt-ticket-forced mx-auto shadow-2xl bg-white text-black print:shadow-none" dir={isRTL ? "rtl" : "ltr"}>
            
            <div className="header-title">GHERBI.AI</div>
            <div className="header-subtitle">CODE &bull; MULTIMEDIA &bull; ALGO &bull; AI</div>
            <div className="header-title" style={{ marginTop: '1mm' }}><bdi>{currentStoreName}</bdi></div>
            
            <div className="badge-action">
              {t('eod.x_report', 'تقرير الوردية (X-REPORT)')}
              <div style={{ fontSize: '10px', marginTop: '2px', fontWeight: 'normal' }} dir="ltr">
                {new Date().toLocaleDateString(i18n.language)}
              </div>
            </div>
            
            <div className="receipt-divider"></div>

            <div className="flex flex-col w-full my-2">
              <div className="info-row">
                <span className="label-field">{t('eod.cashierName', 'الكاشير:')}</span>
                <span className="value-field">{receiptData.cashier}</span>
              </div>
              <div className="info-row">
                <span className="label-field">{t('hr.table.timeIn', 'الدخول:')}</span>
                <span className="value-field" dir="ltr">{new Date(receiptData.startTime).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div className="info-row">
                <span className="label-field">{t('eod.time_out', 'الخروج:')}</span>
                <span className="value-field" dir="ltr">{new Date(receiptData.endTime).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>

            <div className="receipt-divider"></div>

            <div className="flex flex-col w-full my-2">
              <div className="info-row">
                <span className="label-field">{t('eod.opening_balance', 'الافتتاح:')}</span>
                <span className="value-field" dir="ltr"><bdi>{receiptData.opening.toLocaleString()} {t('currency')}</bdi></span>
              </div>
              <div className="info-row">
                <span className="label-field">{t('eod.total_deducted', 'المسحوبات:')}</span>
                <span className="value-field" dir="ltr"><bdi>{(receiptData.out || 0).toLocaleString()} {t('currency')}</bdi></span>
              </div>
            </div>

            <div className="amount-box">
              <span className="box-title">{t('eod.actual_cash', 'الدرج الفعلي:')}</span>
              <span className="box-value" dir="ltr">
                <bdi>{(receiptData.actual || 0).toLocaleString()} {t('currency')}</bdi>
              </span>
            </div>

            <div className="amount-box">
              <span className="box-title">{t('eod.today_sales', 'المبيعات:')}</span>
              <span className="box-value" dir="ltr">
                <bdi>{(receiptData.sales || 0).toLocaleString()} {t('currency')}</bdi>
              </span>
            </div>

            <div className="signatures-area" style={{ justifyContent: 'center', marginTop: '8mm' }}>
              <span>{t('eod.receipt_footer', 'احتفظ بالوصل للمراجعة')}</span>
            </div>

            <div className="receipt-divider"></div>

            <div className="footer-area">
              <div className="dev-brand">POWERED BY GHERBI.AI</div>
            </div>
          </div>
        </div>
      )}

      {/* لوحة تحكم إغلاق الكاشير (إغلاق الوردية) */}
      {!showReceipt && (
        <>
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3"><Lock className="text-red-500" /> {t('eod.title', 'نهاية الوردية')}</h1>
              <p className="text-slate-500 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>{t('eod.active_shift', 'الوردية النشطة')}: <strong className="text-white">{cashierName}</strong></p>
            </div>
            <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg flex items-center gap-3 shadow-lg">
              <Clock className="text-blue-400" size={18} />
              <span className="text-sm font-medium" dir="ltr">{t('hr.table.timeIn')}: {shiftStartTime}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl shadow-lg border-t-4 border-t-emerald-500">
              <h3 className="text-slate-400 text-sm mb-1">{t('eod.opening_balance', 'فوندوكاس')}</h3>
              <p className="text-2xl font-bold text-white" dir="ltr">{currentOpeningBalance.toLocaleString()} {t('currency')}</p>
            </div>
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl shadow-lg border-t-4 border-t-red-500">
              <h3 className="text-slate-400 text-sm mb-1">{t('eod.total_deducted', 'إجمالي المسحوبات')}</h3>
              <p className="text-2xl font-bold text-red-400" dir="ltr">{totalOut.toLocaleString()} {t('currency')}</p>
            </div>
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl shadow-lg border-t-4 border-t-blue-500">
              <h3 className="text-slate-400 text-sm mb-1">{t('eod.advances', 'التسبيقات والدفع')}</h3>
              <p className="text-2xl font-bold text-blue-400" dir="ltr">{(summary.advances + summary.supplierPayments).toLocaleString()} {t('currency')}</p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
            <form onSubmit={(e) => { e.preventDefault(); if (actualAmount !== '') setIsConfirmModalOpen(true); }} className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-start" dir={isRTL ? "rtl" : "ltr"}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-emerald-400 mb-2">{t('eod.actual_cash', 'المبلغ الفعلي في الدرج')}</label>
                  <div className="relative">
                    <Calculator size={20} className="absolute start-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input type="number" min="0" required value={actualAmount} onChange={(e) => setActualAmount(e.target.value)} className="w-full bg-slate-950 border-2 border-emerald-900/50 rounded-lg py-4 ps-12 pe-4 text-white focus:outline-none focus:border-emerald-500 text-2xl font-bold transition-colors shadow-inner" placeholder="0.00" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">{t('eod.notes', 'ملاحظات (اختياري)')}</label>
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-4 text-white focus:outline-none focus:border-blue-500 shadow-inner" rows="3" placeholder={t('eod.notesPlaceholder')}></textarea>
                </div>
              </div>

              <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 flex flex-col justify-center shadow-inner">
                <div className="text-center mb-8">
                  <h3 className="text-slate-400 mb-2">{t('eod.today_sales', 'المبيعات المحسوبة')}</h3>
                  <p className={`text-5xl font-bold ${todaySales > 0 ? 'text-emerald-400' : todaySales < 0 ? 'text-red-500' : 'text-slate-300'}`} dir="ltr">{todaySales > 0 ? '+' : ''}{todaySales.toLocaleString()} <span className="text-2xl text-slate-500">{t('currency')}</span></p>
                </div>
                <button type="submit" disabled={actualAmount === ''} className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition flex justify-center items-center gap-2 text-lg shadow-lg shadow-red-900/20">
                  <Lock size={24} /> {t('eod.save_btn', 'إغلاق الوردية')}
                </button>
              </div>
            </form>
          </div>

          <Modal isOpen={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)} title={t('eod.title', 'تأكيد الإغلاق')}>
            <div className="p-4 text-start">
              <p className="text-white mb-6 text-lg">{t('eod.confirmClose', 'هل أنت متأكد من إغلاق ورديتك؟')}</p>
              <div className="bg-slate-950 p-4 rounded-lg mb-6 text-center border border-slate-800">
                <p className="text-sm text-slate-400 mb-1">{t('eod.today_sales', 'المبيعات')}</p>
                <p className={`text-2xl font-bold ${todaySales > 0 ? 'text-emerald-400' : 'text-red-400'}`} dir="ltr">{todaySales.toLocaleString()} {t('currency')}</p>
              </div>
              <div className="flex items-center justify-end gap-3 mt-4">
                <button onClick={() => setIsConfirmModalOpen(false)} className="px-4 py-2 text-white bg-slate-700 rounded-lg hover:bg-slate-600">{t('common.cancel', 'إلغاء')}</button>
                <button onClick={executeCloseShift} className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 flex items-center gap-2"><Lock size={18} /> {t('eod.save_btn', 'تأكيد الإغلاق')}</button>
              </div>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
}