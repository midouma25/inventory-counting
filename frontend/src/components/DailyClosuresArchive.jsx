import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Archive, Calendar, User, Printer, RotateCcw, X, AlertCircle } from 'lucide-react';

export default function DailyClosuresArchive() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  
  const [closures, setClosures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // حالات عرض الوصل القديم
  const [selectedReport, setSelectedReport] = useState(null);
  const [isPrinting, setIsPrinting] = useState(false);

  const fetchClosures = async () => {
    setIsLoading(true);
    try {
      const res = await window.api.getDailyClosures();
      if (res && res.success) {
        setClosures(res.data);
      }
    } catch (error) {
      console.error("Error fetching archives:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClosures();
  }, []);

  // دالة جلب تقرير قديم بالتفصيل
  const handlePrintOldReport = async (closureId) => {
    setIsPrinting(true);
    try {
      const res = await window.api.getArchivedZReport(closureId);
      if (res && res.success) {
        setSelectedReport(res.data);
      } else {
        alert("حدث خطأ أثناء جلب تفاصيل التقرير!");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsPrinting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans relative text-start">
      
      {/* 🔴 شاشة طباعة الأرشيف (Z-Report) بحجم A4 */}
      {selectedReport && (
        <div className="fixed inset-0 z-[9999] bg-slate-950/90 flex flex-col items-center p-4 backdrop-blur-sm overflow-y-auto" dir={isRTL ? "rtl" : "ltr"}>
          
          <div className="flex gap-4 mb-4 no-print mt-4">
            <button onClick={() => window.print()} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2 shadow-lg">
              <Printer size={20} /> طباعة التقرير (A4)
            </button>
            <button onClick={() => setSelectedReport(null)} className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2 border border-slate-700">
              <X size={20} /> {t('common.close', 'إغلاق')}
            </button>
          </div>

          {/* ورقة التقرير A4 */}
          <div className="printable-area print-a4 bg-white text-black shadow-2xl relative font-sans w-full max-w-[210mm] min-h-[297mm] p-10 mx-auto">
            
            <div className="text-center mb-8 border-b-2 border-black pb-4">
              <h2 className="text-3xl font-bold mb-2">{t('eod.store_name')}</h2>
              <h3 className="text-xl font-bold text-gray-700 mb-2">نسخة أرشيف: {t('zreport.title')}</h3>
              <div className="flex justify-between text-sm text-gray-600 mt-4">
                <span>{t('zreport.date')} <strong dir="ltr">{new Date(selectedReport.closure.closure_date).toLocaleString(i18n.language)}</strong></span>
                <span>{t('zreport.closed_by')} <strong>{selectedReport.closure.closed_by}</strong></span>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-lg font-bold bg-gray-200 p-2 mb-4">{t('zreport.summary')}</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="border p-4 rounded">
                  <p className="text-sm text-gray-500 mb-1">{t('zreport.opening')}</p>
                  <p className="font-bold text-xl">{selectedReport.closure.total_opening.toLocaleString()} {t('currency')}</p>
                </div>
                <div className="border p-4 rounded bg-gray-50">
                  <p className="text-sm text-gray-500 mb-1">{t('zreport.net_sales')}</p>
                  <p className="font-bold text-xl">{selectedReport.closure.total_sales.toLocaleString()} {t('currency')}</p>
                </div>
                <div className="border p-4 rounded border-black bg-black text-white">
                  <p className="text-sm text-gray-400 mb-1">{t('zreport.actual_cash')}</p>
                  <p className="font-bold text-2xl">{selectedReport.closure.total_actual.toLocaleString()} {t('currency')}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold bg-gray-200 p-2 mb-4">{t('zreport.shifts_details')}</h4>
              
              {selectedReport.shifts.length === 0 ? (
                <div className="text-center p-6 border-2 border-dashed border-gray-300 text-gray-500 flex flex-col items-center gap-2">
                   <AlertCircle size={32} />
                   <p>
                     {t('common.noResults')} <br />
                     ({({
                       ar: 'تم إغلاق هذا اليوم قبل تفعيل ميزة الربط المتقدمة',
                       fr: 'Cette journée a été clôturée avant l’activation de la fonctionnalité de liaison avancée',
                       en: 'This day was closed before the advanced linking feature was enabled',
                     }[i18n.language?.split('-')[0]] || 'This day was closed before the advanced linking feature was enabled')})
                   </p>
                </div>
              ) : (
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
                    {selectedReport.shifts.map((s, idx) => (
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
              )}
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

      {/* المحتوى الأساسي للشاشة */}
      {!selectedReport && (
        <>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3 mb-2">
                <Archive className="text-purple-500" /> {t('zreport.archive_title', 'أرشيف اليوميات')}
              </h1>
              
              <p className="text-sm text-slate-500">{t('zreport.archive_desc', 'سجل الأيام المغلقة والترحيلات المالية السابقة')}</p>
            </div>
            <button onClick={fetchClosures} className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-md font-medium hover:bg-slate-700 transition-colors">
              <RotateCcw size={18} className={isLoading ? 'animate-spin' : ''} />
              <span>{t('common.refresh')}</span>
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-start border-collapse" dir={i18n.dir()}>
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/80">
                    <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">التاريخ والوقت</th>
                    <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('zreport.closed_by')}</th>
                    <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('zreport.opening')}</th>
                    <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('zreport.net_sales')}</th>
                    <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('zreport.actual_cash')}</th>
                    <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('suppliers.table.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr><td colSpan="6" className="text-center py-12 text-slate-500">{t('common.loading')}</td></tr>
                  ) : closures.length === 0 ? (
                    <tr><td colSpan="6" className="text-center py-12 text-slate-500">{t('common.noResults')}</td></tr>
                  ) : (
                    closures.map(c => (
                      <tr key={c.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                          <Calendar size={16} className="text-purple-400"/>
                          <span dir="ltr">{new Date(c.closure_date).toLocaleString(i18n.language)}</span>
                        </td>
                        <td className="px-6 py-4 text-slate-300 flex items-center gap-2">
                          <User size={14} className="text-slate-500"/> {c.closed_by}
                        </td>
                        <td className="px-6 py-4 text-center font-bold text-slate-400">
                          {Number(c.total_opening).toLocaleString()} {t('currency')}
                        </td>
                        <td className="px-6 py-4 text-center font-bold text-amber-400">
                          +{Number(c.total_sales).toLocaleString()} {t('currency')}
                        </td>
                        <td className="px-6 py-4 text-center font-bold text-emerald-400 bg-slate-950/50">
                          {Number(c.total_actual).toLocaleString()} {t('currency')}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button 
                            onClick={() => handlePrintOldReport(c.id)}
                            disabled={isPrinting}
                            className="bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white px-3 py-1.5 rounded-lg flex items-center gap-2 mx-auto transition-colors disabled:opacity-50"
                          >
                            <Printer size={16} /> {t('eod.print_receipt', 'طباعة')}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}