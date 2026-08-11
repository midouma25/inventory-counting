import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Archive, Calendar, User, Printer, RotateCcw, AlertCircle, Download, FileText } from 'lucide-react';
import Modal from "./ui/Modal";

export default function DailyClosuresArchive() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  const currentStoreName = localStorage.getItem('storeName') || 'GHERBI.AI';
  
  const [closures, setClosures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [selectedReport, setSelectedReport] = useState(null);
  const [isPrinting, setIsPrinting] = useState(false);
  
  // 🌟 حالة نافذة الطباعة
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

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

  // 🌟 جلب التقرير ثم فتح نافذة الخيارات بدلاً من الشاشة الكاملة
  const handlePrintOldReport = async (closureId) => {
    setIsPrinting(true);
    try {
      const res = await window.api.getArchivedZReport(closureId);
      if (res && res.success) {
        setSelectedReport(res.data);
        setIsPrintModalOpen(true); // فتح النافذة
      } else {
        alert(t('common.error', 'حدث خطأ غير متوقع!'));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsPrinting(false);
    }
  };

  // 🌟 1. دالة استخراج التقرير في ملف Word (A4)
  const handleDownloadWordA4 = () => {
    if (!selectedReport) return;

    const dir = isRTL ? 'rtl' : 'ltr';
    const alignStart = isRTL ? 'right' : 'left';
    const curr = t('currency', 'د.ج');
    const closure = selectedReport.closure;
    const shifts = selectedReport.shifts;
    
    const dateStr = new Date(closure.closure_date).toLocaleString(i18n.language);

    let html = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8">
      <title>${t('zreport.title', 'تقرير نهاية اليوم (Z-Report)')}</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Arial, sans-serif; direction: ${dir}; color: #000; }
        h2 { text-align: center; color: #1e293b; margin-bottom: 5px; font-size: 24px; text-transform: uppercase; }
        h3 { text-align: center; color: #475569; margin-top: 0; font-size: 14px; margin-bottom: 20px; border-bottom: 2px solid #000; padding-bottom: 10px; }
        .summary-box { width: 100%; margin-bottom: 20px; border-collapse: collapse; }
        .summary-box td { border: 1px solid #000; padding: 10px; text-align: center; }
        .summary-title { font-size: 12px; color: #475569; display: block; margin-bottom: 4px; }
        .summary-val { font-size: 18px; font-weight: bold; }
        .main-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 12px; }
        .main-table th, .main-table td { border: 1px solid #000; padding: 6px; text-align: center; }
        .main-table th { background-color: #e2e8f0; font-weight: bold; }
        .footer-note { text-align: center; font-size: 10px; color: #64748b; margin-top: 40px; font-weight: bold; }
      </style>
    </head>
    <body>
      <h2>${currentStoreName}</h2>
      <h3>${t('zreport.title', 'تقرير نهاية اليوم (Z-Report)')} - ${t('zreport.archive_title', 'نسخة أرشيف')}</h3>
      
      <p style="text-align: ${alignStart}; font-size: 12px; font-weight: bold;">
        ${t('zreport.date', 'التاريخ:')} <span dir="ltr">${dateStr}</span> <br/>
        ${t('zreport.closed_by', 'أُغلق بواسطة:')} ${closure.closed_by}
      </p>

      <table class="summary-box">
        <tr>
          <td><span class="summary-title">${t('zreport.opening', 'افتتاح الصندوق')}</span><span class="summary-val" dir="ltr">${Number(closure.total_opening).toLocaleString()} ${curr}</span></td>
          <td style="background-color: #f8fafc;"><span class="summary-title">${t('zreport.net_sales', 'المبيعات الصافية')}</span><span class="summary-val" dir="ltr">${Number(closure.total_sales).toLocaleString()} ${curr}</span></td>
          <td style="background-color: #000; color: #fff;"><span class="summary-title" style="color:#cbd5e1;">${t('zreport.actual_cash', 'النقد الفعلي بالدرج')}</span><span class="summary-val" dir="ltr">${Number(closure.total_actual).toLocaleString()} ${curr}</span></td>
        </tr>
      </table>

      <h4 style="margin-bottom: 5px;">${t('zreport.shifts_details', 'تفاصيل الورديات')}</h4>
    `;

    if (shifts.length === 0) {
      html += `<p style="text-align: center; color: #64748b;">${t('common.noResults', 'لا توجد بيانات')}</p>`;
    } else {
      html += `
        <table class="main-table">
          <thead>
            <tr>
              <th>${t('zreport.cashier', 'الكاشير')}</th>
              <th>${t('zreport.time_in', 'وقت الفتح')}</th>
              <th>${t('zreport.time_out', 'وقت الإغلاق')}</th>
              <th>${t('zreport.opening', 'الافتتاح')}</th>
              <th>${t('zreport.deductions', 'المسحوبات')}</th>
              <th>${t('zreport.sales', 'المبيعات')}</th>
              <th>${t('zreport.actual_drawer', 'الدرج الفعلي')}</th>
            </tr>
          </thead>
          <tbody>
      `;
      shifts.forEach(s => {
        const timeIn = new Date(s.start_time).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' });
        const timeOut = s.end_time ? new Date(s.end_time).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' }) : '-';
        html += `
          <tr>
            <td style="font-weight: bold;">${s.cashier_name}</td>
            <td dir="ltr">${timeIn}</td>
            <td dir="ltr">${timeOut}</td>
            <td dir="ltr">${Number(s.opening_balance).toLocaleString()}</td>
            <td dir="ltr">${Number(s.totalOut || 0).toLocaleString()}</td>
            <td dir="ltr" style="font-weight: bold;">${Number(s.calculatedSales || 0).toLocaleString()}</td>
            <td dir="ltr" style="font-weight: bold; background-color: #f1f5f9;">${Number(s.actual_cash || 0).toLocaleString()}</td>
          </tr>
        `;
      });
      html += `</tbody></table>`;
    }

    html += `
      <table style="width: 100%; margin-top: 40px; border: none;">
        <tr>
          <td style="border: none; text-align: center; border-top: 1px solid #000; width: 40%;"><b>${t('zreport.manager_sig', 'توقيع الإدارة')}</b></td>
          <td style="border: none; width: 20%;"></td>
          <td style="border: none; text-align: center; border-top: 1px solid #000; width: 40%;"><b>${t('zreport.company_seal', 'ختم المحل')}</b></td>
        </tr>
      </table>
      <div class="footer-note">POWERED BY GHERBI.AI</div>
    </body>
    </html>
    `;

    const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ZReport_Archive_${new Date(closure.closure_date).toISOString().split('T')[0]}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsPrintModalOpen(false);
  };

  // 🌟 2. دالة الطباعة الحرارية (80mm / A7) بالأسود العريض
  const handlePrintA7Thermal = () => {
    if (!selectedReport) return;
    
    const curr = t('currency', 'د.ج');
    const closure = selectedReport.closure;
    const shifts = selectedReport.shifts;
    const dateStr = new Date(closure.closure_date).toLocaleString(i18n.language);

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

    let shiftsHtml = '';
    shifts.forEach(s => {
      shiftsHtml += `
        <div style="border-bottom: 1px dashed #000; padding: 6px 0; margin-bottom: 4px;">
          <div style="display:flex; justify-content:space-between; font-weight:bold; font-size:14px;">
            <span>${s.cashier_name}</span>
            <span dir="ltr">${Number(s.actual_cash || 0).toLocaleString()} ${curr}</span>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:11px; margin-top:2px;">
            <span>${t('zreport.sales', 'المبيعات')}: <span dir="ltr">${Number(s.calculatedSales || 0).toLocaleString()}</span></span>
            <span>${t('zreport.deductions', 'السحب')}: <span dir="ltr">${Number(s.totalOut || 0).toLocaleString()}</span></span>
          </div>
        </div>
      `;
    });

    doc.write(`
      <!DOCTYPE html>
      <html lang="${i18n.language}" dir="${isRTL ? 'rtl' : 'ltr'}">
      <head>
        <title>Z-Report Thermal</title>
        <style>
          @page { margin: 0; }
          html, body { margin: 0; padding: 0; width: 72mm; background: #fff; color: #000; font-family: sans-serif; }
          .print-wrapper { width: 100%; padding: 2mm 5mm; box-sizing: border-box; }
          h2 { text-align: center; font-size: 18px; margin: 0 0 5px 0; font-weight: 900; color: #000; }
          .subtitle { text-align: center; font-size: 13px; margin-bottom: 10px; border-bottom: 2px dashed #000; padding-bottom: 6px; font-weight: bold; color: #000; }
          .amount-box { display: flex; justify-content: space-between; align-items: center; border-top: 2px solid #000; border-bottom: 2px solid #000; padding: 6px 0; margin-top: 10px; margin-bottom: 5px; color: #000; }
          .amount-box .box-title { font-size: 14px; font-weight: bold; }
          .amount-box .box-value { font-size: 18px; font-weight: 900; }
          .footer-brand { text-align: center; margin-top: 20px; font-size: 11px; font-weight: 900; border-top: 1px dashed #000; padding-top: 8px; color: #000; }
        </style>
      </head>
      <body>
        <div class="print-wrapper">
          <h2>${currentStoreName}</h2>
          <div class="subtitle">${t('zreport.title', 'Z-Report')} - ${t('zreport.archive_title', 'أرشيف')}</div>
          
          <div style="font-size: 11px; font-weight: bold; margin-bottom: 10px; color: #000; text-align: center;">
             ${dateStr} <br>
             ${t('zreport.closed_by', 'إغلاق:')} ${closure.closed_by}
          </div>

          <div style="font-size: 12px; font-weight: bold; border-bottom: 1px solid #000; padding-bottom: 4px; margin-bottom: 6px;">
            ${t('zreport.shifts_details', 'الورديات')}
          </div>
          
          ${shifts.length > 0 ? shiftsHtml : `<div style="text-align:center; font-size:12px;">${t('common.noResults', 'لا توجد بيانات')}</div>`}

          <div class="amount-box" style="border-top: none; margin-top: 10px;">
            <span class="box-title">${t('zreport.opening', 'الافتتاح')}:</span>
            <span class="box-value" style="font-size:14px;" dir="ltr">${Number(closure.total_opening).toLocaleString()}</span>
          </div>
          <div class="amount-box" style="border-top: none; border-bottom: none; padding-top: 0;">
            <span class="box-title">${t('zreport.net_sales', 'المبيعات')}:</span>
            <span class="box-value" style="font-size:14px;" dir="ltr">${Number(closure.total_sales).toLocaleString()}</span>
          </div>
          <div class="amount-box">
            <span class="box-title">${t('zreport.actual_cash', 'النقد الفعلي')}:</span>
            <span class="box-value" dir="ltr">${Number(closure.total_actual).toLocaleString()} ${curr}</span>
          </div>

          <div class="footer-brand">POWERED BY GHERBI.AI</div>
        </div>
      </body>
      </html>
    `);
    doc.close();

    iframe.contentWindow.focus();
    setTimeout(() => { 
      iframe.contentWindow.print(); 
      setIsPrintModalOpen(false); 
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans relative text-start">
      
      {/* 🔴 النافذة العريضة لخيارات الطباعة (Modal) */}
      <Modal isOpen={isPrintModalOpen} onClose={() => setIsPrintModalOpen(false)} title={t('inventory.printOptions', 'خيارات الطباعة')}>
        <div className="p-6 flex flex-col gap-4 text-start" dir={isRTL ? 'rtl' : 'ltr'}>
          <p className="text-slate-400 mb-4 text-center">{t('inventory.printDesc', 'اختر مقاس الورق المناسب لطباعة الأرشيف.')}</p>
          
          <button 
            onClick={handleDownloadWordA4} 
            className="w-full flex items-center justify-between p-4 bg-indigo-600/10 hover:bg-indigo-600 border border-indigo-500/50 hover:border-indigo-500 rounded-xl transition-all text-indigo-400 hover:text-white font-bold group"
          >
            <div className="flex items-center gap-4">
              <Download size={24} className="text-indigo-400 group-hover:text-white" />
              <div className="text-start">
                <div className="text-lg">{t('payroll.printA4', 'تحميل تقرير مفصل Word (A4)')}</div>
                <div className="text-xs font-normal opacity-80 mt-1">{t('payroll.printA4Desc', 'مستند وورد شامل يحتوي على تفاصيل اليومية لحفظه في أرشيف الشركة.')}</div>
              </div>
            </div>
            <FileText size={20} />
          </button>

          <button 
            onClick={handlePrintA7Thermal} 
            className="w-full flex items-center justify-between p-4 bg-emerald-600/10 hover:bg-emerald-600 border border-emerald-500/50 hover:border-emerald-500 rounded-xl transition-all text-emerald-500 hover:text-white font-bold group"
          >
            <div className="flex items-center gap-4">
              <Printer size={24} className="text-emerald-400 group-hover:text-white" />
              <div className="text-start">
                <div className="text-lg">{t('payroll.printA7', 'وصل طباعة حرارية (80mm)')}</div>
                <div className="text-xs font-normal opacity-80 mt-1">{t('payroll.printA7Desc', 'وصل ورقي سريع ومقروء يُطبع فوراً من طابعة الكاشير.')}</div>
              </div>
            </div>
            <Printer size={20} />
          </button>
        </div>
      </Modal>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3 mb-2">
            <Archive className="text-purple-500" /> {t('zreport.archive_title', 'أرشيف اليوميات')}
          </h1>
          
          <p className="text-sm text-slate-500">{t('zreport.archive_desc', 'سجل الأيام المغلقة والترحيلات المالية السابقة')}</p>
        </div>
        <button onClick={fetchClosures} className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-md font-medium hover:bg-slate-700 transition-colors">
          <RotateCcw size={18} className={isLoading ? 'animate-spin' : ''} />
          <span>{t('common.refresh', 'تحديث')}</span>
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-start border-collapse" dir={i18n.dir()}>
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80">
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('zreport.date', 'التاريخ والوقت')}</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('zreport.closed_by', 'أغلق بواسطة')}</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('zreport.opening', 'الافتتاح')}</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('zreport.net_sales', 'المبيعات')}</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('zreport.actual_cash', 'الفعلي')}</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('suppliers.table.actions', 'الإجراءات')}</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan="6" className="text-center py-12 text-slate-500">{t('common.loading', 'جاري التحميل...')}</td></tr>
              ) : closures.length === 0 ? (
                <tr><td colSpan="6" className="text-center py-12 text-slate-500">{t('common.noResults', 'لا توجد بيانات')}</td></tr>
              ) : (
                closures.map(c => (
                  <tr key={c.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">
                      <div className="flex items-center gap-3">
                        <Calendar size={18} className="text-purple-400 shrink-0"/>
                        <div className="flex flex-col items-start">
                          <span className="text-sm tracking-widest font-mono" dir="ltr">
                            {(() => {
                              const d = new Date(c.closure_date);
                              return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
                            })()}
                          </span>
                          <span className="text-xs text-slate-400 mt-1 whitespace-nowrap">
                            {new Date(c.closure_date).toLocaleTimeString(i18n.language)}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-300 flex items-center gap-2">
                      <User size={14} className="text-slate-500"/> {c.closed_by}
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-slate-400">
                      {Number(c.total_opening).toLocaleString()} {t('currency', 'د.ج')}
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-amber-400">
                      +{Number(c.total_sales).toLocaleString()} {t('currency', 'د.ج')}
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-emerald-400 bg-slate-950/50">
                      {Number(c.total_actual).toLocaleString()} {t('currency', 'د.ج')}
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
    </div>
  );
}