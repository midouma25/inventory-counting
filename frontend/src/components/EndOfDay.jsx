import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Play, Lock, Calculator, Banknote, AlertCircle, Clock, CheckCircle2, RotateCcw, User, LineChart, Printer, X, Download, Globe, FileText, Archive } from 'lucide-react';
import useAuthStore from '../store/authStore';
import Modal from './ui/Modal'; 
import html2canvas from 'html2canvas'; 
import { jsPDF } from 'jspdf';

export default function EndOfDay() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const alignStart = isRTL ? 'right' : 'left';
  const alignEnd = isRTL ? 'left' : 'right';
  
  const user = useAuthStore(state => state.user);
  const isSuperAdmin = user?.role === 'superadmin';
  const cashierName = isSuperAdmin ? t('common.superAdmin', 'المدير العام') : (user?.username || 'Cashier');

  const currentStoreName = localStorage.getItem('storeName') || 'GHERBI.AI';

  const [adminTab, setAdminTab] = useState('live');

  const [activeShift, setActiveShift] = useState(null);
  const [openingBalanceInput, setOpeningBalanceInput] = useState('');
  const [actualAmount, setActualAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [summary, setSummary] = useState({ expenses: 0, supplierPayments: 0, advances: 0, totalOut: 0, deductionsList: [] });
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  
  const [autoPrintEnabled, setAutoPrintEnabled] = useState(true);

  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  
  const [isCloseDayModalOpen, setIsCloseDayModalOpen] = useState(false);
  const [showZReportPrintModal, setShowZReportPrintModal] = useState(false); 
  const [zReportData, setZReportData] = useState(null);
  const [allShifts, setAllShifts] = useState([]);
  const [grandTotals, setGrandTotals] = useState({ opening: 0, actual: 0, sales: 0 });

  const [archivedShifts, setArchivedShifts] = useState([]);
  const [selectedArchivedShift, setSelectedArchivedShift] = useState(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  // 🌟 دالة مساعدة لترجمة أنواع السحب القادمة من قاعدة البيانات
  const getTranslatedType = (type) => {
    if(type === 'مصروف') return t('eod.expenseType', 'مصروف');
    if(type === 'مورد') return t('eod.supplierType', 'مورد');
    if(type === 'سلفة') return t('eod.advanceType', 'سلفة');
    return type;
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (isSuperAdmin && window.api) {
        if (window.api.getAllShiftsSummary) {
          const res = await window.api.getAllShiftsSummary();
          if (res.success) {
            setAllShifts(res.data.shifts);
            setGrandTotals(res.data.grandTotals);
          }
        }
        if (window.api.getArchivedShiftsArchive) {
          const archiveRes = await window.api.getArchivedShiftsArchive();
          if (archiveRes.success) {
            setArchivedShifts(archiveRes.data);
          }
        }
      } else if (window.api && window.api.getActiveShift) {
        const shift = await window.api.getActiveShift(cashierName);
        if (shift) {
          setActiveShift(shift);
          const summaryRes = await window.api.getShiftSummary(cashierName, shift.start_time);
          if (summaryRes.success) setSummary(summaryRes.data);
        } else {
          setActiveShift(null);
          setSummary({ expenses: 0, supplierPayments: 0, advances: 0, totalOut: 0, deductionsList: [] });
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
  
  const toggleLanguage = () => {
    const langs = ['ar', 'fr', 'en'];
    const nextLang = langs[(langs.indexOf(i18n.language) + 1) % langs.length];
    i18n.changeLanguage(nextLang);
  };

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
          sales: todaySales,
          deductionsList: summary.deductionsList || [] 
        });
        setIsConfirmModalOpen(false);
        setShowReceipt(true);
      }
    } catch (err) { console.error(err); }
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
        setShowZReportPrintModal(true); 
        showToast('success', t('common.success'));
        fetchData(); 
      } else {
        setIsCloseDayModalOpen(false);
        const errorMsg = res.message ? t(`backendErrors.${res.message}`, { defaultValue: res.message }) : t('common.error');
        showToast('error', errorMsg);
      }
    } catch (err) { console.error(err); }
  };

  const handlePrint = () => {
    const printElement = document.getElementById('printable-receipt');
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
        <title>Print</title>
        <style>
          @page { margin: 0; }
          html, body { margin: 0; padding: 0; width: 100%; background: #fff; color: #000; font-family: 'Segoe UI', Tahoma, sans-serif; }
          .print-wrapper { width: 100%; max-width: 80mm; margin: 0 auto; padding: 4mm 6mm; box-sizing: border-box; }
          .receipt-ticket-forced { width: 100%; box-sizing: border-box; color: #000; }
          
          .text-center { text-align: center; }
          .font-bold { font-weight: bold; }
          .font-black { font-weight: 900; }
          
          .header-title { font-size: 18px; margin: 0 0 2px 0; }
          .header-sub { font-size: 11px; margin: 0 0 6px 0; }
          .badge { text-align: center; border: 2px solid #000; padding: 6px; margin: 8px 0; border-radius: 4px; font-size: 14px; font-weight: bold; }
          
          .data-table { width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 6px; }
          .data-table td { padding: 4px 0; border-bottom: 1px dashed #eee; vertical-align: middle; }
          .label-col { width: 50%; font-weight: bold; text-align: ${alignStart}; }
          .value-col { width: 50%; text-align: ${alignEnd}; }
          
          .amount-box { border: 2px solid #000; border-radius: 4px; padding: 6px; margin: 8px 0; width: 100%; box-sizing: border-box; }
          .amount-table { width: 100%; }
          .amount-title { font-size: 14px; font-weight: bold; text-align: ${alignStart}; }
          .amount-val { font-size: 16px; font-weight: 900; text-align: ${alignEnd}; direction: ltr; }
          
          .deduct-table { width: 100%; border-collapse: collapse; font-size: 10px; margin-top: 5px; }
          .deduct-table th { border-top: 1px dashed #000; border-bottom: 1px solid #000; padding: 4px 0; text-align: ${alignStart}; }
          .deduct-table td { padding: 3px 0; }
          
          .footer { text-align: center; font-size: 11px; margin-top: 15px; border-top: 1px dashed #000; padding-top: 10px; font-weight: bold;}
        </style>
      </head>
      <body>
        <div class="print-wrapper">
          ${printElement.innerHTML}
        </div>
      </body>
      </html>
    `);
    doc.close();
    iframe.contentWindow.focus();
    setTimeout(() => { iframe.contentWindow.print(); }, 500);
  };

  // 🌟 الحل الجذري لمشكلة حفظ الـ PDF: إيقاف التصغير مؤقتاً قبل أخذ الصورة
  const handleSavePDF = async () => {
    const element = document.getElementById('printable-receipt');
    if (!element) return;
    try {
      // إزالة أي فلاتر ظل أو تصغير قد تكسر الصورة
      element.classList.remove('shadow-2xl');
      const parentNode = element.parentElement;
      const originalTransform = parentNode.style.transform;
      parentNode.style.transform = 'none'; // إلغاء التصغير مؤقتاً
      
      const canvas = await html2canvas(element, { 
        scale: 3, 
        useCORS: true, 
        backgroundColor: '#ffffff',
        logging: false
      });
      
      // إعادة التصغير والظل كما كان
      parentNode.style.transform = originalTransform;
      element.classList.add('shadow-2xl');

      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = 80;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: [pdfWidth, pdfHeight] });
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Shift_Receipt_${cashierName}_${new Date().toISOString().split('T')[0]}.pdf`);
      
      showToast('success', t('common.success', 'تم الحفظ بنجاح'));
    } catch (error) {
      console.error(error);
      showToast('error', t('common.error'));
    }
  };

  useEffect(() => {
    if (showReceipt && receiptData && autoPrintEnabled && !isSuperAdmin) {
      const timer = setTimeout(() => {
        handlePrint();
        handleSavePDF();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [showReceipt, receiptData, autoPrintEnabled, isSuperAdmin]);

  const handleCloseReceipt = () => {
    setShowReceipt(false);
    setActiveShift(null);
    setActualAmount('');
    setNotes('');
  };

  // =========================================================
  // 🌟 دوال طباعة الوردية الفردية من الأرشيف (مع الترجمة الديناميكية)
  // =========================================================
  const exportShiftToWordA4 = (shift) => {
    const dir = isRTL ? 'rtl' : 'ltr';
    const curr = t('currency', 'د.ج');
    const timeIn = new Date(shift.start_time).toLocaleString(i18n.language);
    const timeOut = shift.end_time ? new Date(shift.end_time).toLocaleString(i18n.language) : '-';

    let html = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8">
      <title>${t('eod.shiftReportTitle', 'تقرير وردية كاشير')}</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Arial, sans-serif; direction: ${dir}; color: #000; padding: 20px;}
        h2 { text-align: center; color: #1e293b; margin-bottom: 5px; font-size: 22px; text-transform: uppercase; }
        h3 { text-align: center; color: #475569; margin-top: 0; font-size: 13px; margin-bottom: 20px; border-bottom: 2px solid #000; padding-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th, td { border: 1px solid #334155; padding: 10px; text-align: center; font-size: 12px; }
        th { background-color: #e2e8f0; font-weight: bold; color: #0f172a; }
        .footer-note { text-align: center; font-size: 10px; color: #64748b; margin-top: 40px; font-weight: bold; }
        .details-table th { background-color: #f8fafc; font-size: 11px; }
        .details-table td { font-size: 11px; }
      </style>
    </head>
    <body>
      <h2>${currentStoreName}</h2>
      <h3>${t('eod.shiftReportDetail', { name: shift.cashier_name, defaultValue: `تقرير تفصيلي لوردية الكاشير (${shift.cashier_name})` })}</h3>
      
      <p style="text-align: ${alignStart}; font-size: 13px; font-weight: bold;">
        <b>${t('eod.cashierName', 'الكاشير:')}</b> ${shift.cashier_name} <br/>
        <b>${t('hr.table.timeIn', 'وقت الفتح:')}</b> <span dir="ltr">${timeIn}</span> <br/>
        <b>${t('eod.time_out', 'وقت الإغلاق:')}</b> <span dir="ltr">${timeOut}</span>
      </p>

      <table>
        <tr>
          <th>${t('eod.opening_balance', 'صندوق الافتتاح')}</th>
          <th>${t('eod.total_deducted', 'إجمالي المسحوبات (صرف/سلف)')}</th>
          <th>${t('eod.today_sales', 'المبيعات المحسوبة')}</th>
          <th>${t('eod.actual_cash', 'الدرج الفعلي')}</th>
        </tr>
        <tr>
          <td dir="ltr"><b>${Number(shift.opening_balance).toLocaleString()} ${curr}</b></td>
          <td dir="ltr" style="color: red; font-weight: bold;">- ${Number(shift.totalOut || 0).toLocaleString()} ${curr}</td>
          <td dir="ltr" style="font-weight: bold;">${Number(shift.calculatedSales || 0).toLocaleString()} ${curr}</td>
          <td dir="ltr" style="font-weight: bold; background-color: #f1f5f9; font-size: 14px;">${Number(shift.actual_cash || 0).toLocaleString()} ${curr}</td>
        </tr>
      </table>
    `;

    if (shift.deductionsList && shift.deductionsList.length > 0) {
      html += `
        <h4 style="margin-top: 20px; margin-bottom: 5px; text-decoration: underline;">${t('eod.deductionsDetails', 'تفاصيل المسحوبات من الصندوق:')}</h4>
        <table class="details-table">
          <tr>
            <th>${t('eod.description', 'البيان / الوصف')}</th>
            <th>${t('eod.type', 'نوع السحب')}</th>
            <th>${t('eod.amount', 'المبلغ המخصوم')}</th>
          </tr>
      `;
      shift.deductionsList.forEach(d => {
        html += `
          <tr>
            <td style="text-align: right; font-weight: bold;">${d.description}</td>
            <td>${getTranslatedType(d.type)}</td>
            <td dir="ltr" style="font-weight: bold;">${Number(d.amount).toLocaleString()} ${curr}</td>
          </tr>
        `;
      });
      html += `</table>`;
    }

    html += `
      <table style="border: none; margin-top: 60px;">
        <tr>
          <td style="border: none; border-top: 2px solid #000; width: 40%; font-weight: bold;">${t('zreport.manager_sig', 'توقيع الإدارة')}</td>
          <td style="border: none; width: 20%;"></td>
          <td style="border: none; border-top: 2px solid #000; width: 40%; font-weight: bold;">${t('zreport.cashier_sig', 'توقيع الكاشير')}</td>
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
    link.download = `Shift_${shift.cashier_name}_${new Date(shift.start_time).toISOString().split('T')[0]}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsPrintModalOpen(false);
  };

  const printShiftA7Thermal = (shift) => {
    const curr = t('currency', 'د.ج');
    const timeIn = new Date(shift.start_time).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' });
    const timeOut = shift.end_time ? new Date(shift.end_time).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' }) : '-';

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

    let deductionsHtml = '';
    if (shift.deductionsList && shift.deductionsList.length > 0) {
      deductionsHtml += `
        <table style="width: 100%; border-collapse: collapse; font-size: 10px; margin-top: 5px;">
          <tr>
            <th style="border-top: 1px dashed #000; border-bottom: 1px solid #000; padding: 4px 0; text-align: ${alignStart};">${t('eod.deductionsDetails', 'تفاصيل المسحوبات:')}</th>
            <th style="border-top: 1px dashed #000; border-bottom: 1px solid #000; padding: 4px 0; text-align: ${alignEnd};">${t('eod.amount', 'المبلغ')}</th>
          </tr>
      `;
      shift.deductionsList.forEach(d => {
        deductionsHtml += `
          <tr>
            <td style="padding: 3px 0; font-weight: bold; width: 70%; text-align: ${alignStart};">- ${d.description} <span style="font-size: 9px; font-weight: normal;">(${getTranslatedType(d.type)})</span></td>
            <td style="padding: 3px 0; font-weight: bold; width: 30%; text-align: ${alignEnd};" dir="ltr">${Number(d.amount).toLocaleString()}</td>
          </tr>
        `;
      });
      deductionsHtml += `</table>`;
    }

    doc.write(`
      <!DOCTYPE html>
      <html lang="${i18n.language}" dir="${isRTL ? 'rtl' : 'ltr'}">
      <head>
        <title>Shift Thermal Print</title>
        <style>
          @page { margin: 0; }
          html, body { margin: 0; padding: 0; width: 72mm; background: #fff; color: #000; font-family: sans-serif; }
          .print-wrapper { width: 100%; padding: 2mm 5mm; box-sizing: border-box; }
          .text-center { text-align: center; }
          .font-bold { font-weight: bold; }
          .font-black { font-weight: 900; }
          .header-title { font-size: 18px; margin: 0 0 2px 0; }
          .subtitle { font-size: 13px; margin-bottom: 12px; border-bottom: 2px dashed #000; padding-bottom: 6px; }
          .data-table { width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 6px; }
          .data-table td { padding: 4px 0; border-bottom: 1px dashed #eee; vertical-align: middle; }
          .label-col { width: 50%; font-weight: bold; text-align: ${alignStart}; }
          .value-col { width: 50%; text-align: ${alignEnd}; }
          .amount-box { border: 2px solid #000; border-radius: 4px; padding: 6px; margin: 8px 0; width: 100%; box-sizing: border-box; }
          .amount-table { width: 100%; }
          .amount-title { font-size: 14px; font-weight: bold; text-align: ${alignStart}; }
          .amount-val { font-size: 16px; font-weight: 900; text-align: ${alignEnd}; direction: ltr; }
          .footer { font-size: 11px; margin-top: 15px; border-top: 1px dashed #000; padding-top: 10px; }
        </style>
      </head>
      <body>
        <div class="print-wrapper">
          <div class="text-center font-black header-title">${currentStoreName}</div>
          <div class="text-center font-bold subtitle">${t('eod.shiftArchiveSubtitle', 'أرشيف وردية كاشير')}</div>
          
          <table class="data-table">
            <tr><td class="label-col">${t('eod.cashierName', 'الكاشير:')}</td><td class="value-col font-bold">${shift.cashier_name}</td></tr>
            <tr><td class="label-col">${t('hr.table.timeIn', 'وقت الدخول:')}</td><td class="value-col" dir="ltr">${timeIn}</td></tr>
            <tr><td class="label-col">${t('eod.time_out', 'وقت الخروج:')}</td><td class="value-col" dir="ltr">${timeOut}</td></tr>
            
            <tr><td class="label-col">${t('eod.opening_balance', 'الافتتاح:')}</td><td class="value-col" dir="ltr">${Number(shift.opening_balance).toLocaleString()} ${curr}</td></tr>
            <tr><td class="label-col">${t('eod.total_deducted', 'المسحوبات:')}</td><td class="value-col" dir="ltr">-${Number(shift.totalOut || 0).toLocaleString()} ${curr}</td></tr>
            <tr><td class="label-col">${t('eod.today_sales', 'المبيعات:')}</td><td class="value-col" dir="ltr">${Number(shift.calculatedSales || 0).toLocaleString()} ${curr}</td></tr>
          </table>

          <div class="amount-box">
            <table class="amount-table">
              <tr>
                <td class="amount-title">${t('eod.actual_cash', 'الدرج الفعلي:')}</td>
                <td class="amount-val">${Number(shift.actual_cash || 0).toLocaleString()} ${curr}</td>
              </tr>
            </table>
          </div>

          ${deductionsHtml}

          <div class="text-center font-black footer">POWERED BY GHERBI.AI</div>
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


  const handleDownloadZReportWordA4 = () => {
    if (!zReportData) return;
    const dir = isRTL ? 'rtl' : 'ltr';
    const curr = t('currency', 'د.ج');
    const dateStr = new Date(zReportData.date).toLocaleString(i18n.language);

    let html = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8">
      <title>${t('zreport.title', 'التقرير الختامي (Z-REPORT)')}</title>
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
      <h3>${t('zreport.title', 'التقرير الختامي (Z-REPORT)')}</h3>
      
      <p style="text-align: ${alignStart}; font-size: 12px; font-weight: bold;">
        ${t('zreport.date', 'التاريخ:')} <span dir="ltr">${dateStr}</span> <br/>
        ${t('zreport.closed_by', 'تم الإغلاق بواسطة:')} ${zReportData.adminName}
      </p>

      <table class="summary-box">
        <tr>
          <td><span class="summary-title">${t('zreport.opening', 'إجمالي الافتتاح')}</span><span class="summary-val" dir="ltr">${Number(zReportData.totals.opening).toLocaleString()} ${curr}</span></td>
          <td style="background-color: #f8fafc;"><span class="summary-title">${t('zreport.net_sales', 'صافي المبيعات')}</span><span class="summary-val" dir="ltr">${Number(zReportData.totals.sales).toLocaleString()} ${curr}</span></td>
          <td style="background-color: #000; color: #fff;"><span class="summary-title" style="color:#cbd5e1;">${t('zreport.actual_cash', 'إجمالي الصندوق الفعلي')}</span><span class="summary-val" dir="ltr">${Number(zReportData.totals.actual).toLocaleString()} ${curr}</span></td>
        </tr>
      </table>

      <h4 style="margin-bottom: 5px;">${t('zreport.shifts_details', 'تفاصيل الورديات')}</h4>
    `;

    if (zReportData.shifts.length === 0) {
      html += `<p style="text-align: center; color: #64748b;">${t('common.noResults', 'لا توجد بيانات')}</p>`;
    } else {
      html += `
        <table class="main-table">
          <thead>
            <tr>
              <th>${t('zreport.cashier', 'الكاشير')}</th>
              <th>${t('zreport.time_in', 'الدخول')}</th>
              <th>${t('zreport.time_out', 'الخروج')}</th>
              <th>${t('zreport.opening', 'الافتتاح')}</th>
              <th>${t('zreport.deductions', 'المسحوبات')}</th>
              <th>${t('zreport.sales', 'المبيعات')}</th>
              <th>${t('zreport.actual_drawer', 'الدرج الفعلي')}</th>
            </tr>
          </thead>
          <tbody>
      `;
      zReportData.shifts.forEach(s => {
        const timeIn = new Date(s.start_time).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' });
        const timeOut = s.end_time ? new Date(s.end_time).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' }) : t('zreport.not_closed', 'لم تُغلق');
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
    link.download = `ZReport_${new Date(zReportData.date).toISOString().split('T')[0]}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowZReportPrintModal(false);
  };

  const handlePrintZReportA7Thermal = () => {
    if (!zReportData) return;
    const curr = t('currency', 'د.ج');
    const dateStr = new Date(zReportData.date).toLocaleString(i18n.language);

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
    zReportData.shifts.forEach(s => {
      shiftsHtml += `
        <div style="border-bottom: 1px dashed #000; padding: 6px 0; margin-bottom: 4px;">
          <div style="display:flex; justify-content:space-between; font-weight:bold; font-size:14px;">
            <span>${s.cashier_name}</span>
            <span dir="ltr">${Number(s.actual_cash || 0).toLocaleString()} ${curr}</span>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:11px; margin-top:2px;">
            <span>${t('eod.salesLabel', 'المبيعات:')} <span dir="ltr">${Number(s.calculatedSales || 0).toLocaleString()}</span></span>
            <span>${t('eod.drawLabel', 'السحب:')} <span dir="ltr">${Number(s.totalOut || 0).toLocaleString()}</span></span>
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
          .text-center { text-align: center; }
          .text-right { text-align: right; }
          .text-left { text-align: left; }
          .font-bold { font-weight: bold; }
          .font-black { font-weight: 900; }
          .header-title { font-size: 18px; margin: 0 0 2px 0; }
          .subtitle { font-size: 13px; margin-bottom: 12px; border-bottom: 2px dashed #000; padding-bottom: 6px; }
          .amount-box { display: flex; justify-content: space-between; align-items: center; border-top: 2px solid #000; border-bottom: 2px solid #000; padding: 8px 0; margin-top: 15px; }
          .amount-box .box-title { font-size: 15px; font-weight: bold; padding: 0 5px; }
          .amount-box .box-value { font-size: 18px; font-weight: 900; padding: 0 5px; }
          .footer { font-size: 11px; margin-top: 15px; border-top: 1px dashed #000; padding-top: 10px; }
        </style>
      </head>
      <body>
        <div class="print-wrapper">
          <div class="text-center font-black header-title">${currentStoreName}</div>
          <div class="text-center font-bold subtitle">${t('zreport.title', 'التقرير الختامي (Z-REPORT)')}</div>
          
          <div style="font-size: 11px; font-weight: bold; margin-bottom: 10px; text-align: center;">
             ${dateStr} <br>
             ${t('zreport.closed_by', 'إغلاق:')} ${zReportData.adminName}
          </div>

          <div style="font-size: 12px; font-weight: bold; border-bottom: 1px solid #000; padding-bottom: 4px; margin-bottom: 6px;">
            ${t('zreport.shifts_details', 'الورديات')}
          </div>
          
          ${zReportData.shifts.length > 0 ? shiftsHtml : `<div style="text-align:center; font-size:12px;">${t('common.noResults', 'لا توجد بيانات')}</div>`}

          <div class="amount-box" style="border-top: none; margin-top: 10px;">
            <span class="box-title">${t('zreport.opening', 'الافتتاح')}:</span>
            <span class="box-value" style="font-size:14px;" dir="ltr">${Number(zReportData.totals.opening).toLocaleString()}</span>
          </div>
          <div class="amount-box" style="border-top: none; border-bottom: none; padding-top: 0;">
            <span class="box-title">${t('zreport.net_sales', 'المبيعات')}:</span>
            <span class="box-value" style="font-size:14px;" dir="ltr">${Number(zReportData.totals.sales).toLocaleString()}</span>
          </div>
          <div class="amount-box">
            <span class="box-title">${t('zreport.actual_cash', 'النقد الفعلي')}:</span>
            <span class="box-value" dir="ltr">${Number(zReportData.totals.actual).toLocaleString()} ${curr}</span>
          </div>

          <div class="text-center font-black footer">POWERED BY GHERBI.AI</div>
        </div>
      </body>
      </html>
    `);
    doc.close();

    iframe.contentWindow.focus();
    setTimeout(() => { 
      iframe.contentWindow.print(); 
      setShowZReportPrintModal(false); 
    }, 500);
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
        
        <Modal isOpen={isPrintModalOpen} onClose={() => setIsPrintModalOpen(false)} title={t('eod.printShiftOptionsTitle', 'خيارات طباعة وردية الكاشير')}>
          <div className="p-6 flex flex-col gap-4 text-start" dir={isRTL ? 'rtl' : 'ltr'}>
            <p className="text-slate-400 mb-4 text-center">{t('eod.printShiftDesc', 'اختر مقاس الورق المناسب لطباعة تفاصيل هذه الوردية.')}</p>
            
            <button onClick={() => exportShiftToWordA4(selectedArchivedShift)} className="w-full flex items-center justify-between p-4 bg-indigo-600/10 hover:bg-indigo-600 border border-indigo-500/50 hover:border-indigo-500 rounded-xl transition-all text-indigo-400 hover:text-white font-bold group">
              <div className="flex items-center gap-4">
                <Download size={24} className="text-indigo-400 group-hover:text-white" />
                <div className="text-start">
                  <div className="text-lg">{t('eod.printWordA4', 'تحميل تقرير مفصل Word (A4)')}</div>
                  <div className="text-xs font-normal opacity-80 mt-1">{t('eod.printShiftWordA4Desc', 'مستند وورد شامل يحتوي على حركة الوردية لحفظه في أرشيف الشركة.')}</div>
                </div>
              </div>
              <FileText size={20} />
            </button>

            <button onClick={() => printShiftA7Thermal(selectedArchivedShift)} className="w-full flex items-center justify-between p-4 bg-emerald-600/10 hover:bg-emerald-600 border border-emerald-500/50 hover:border-emerald-500 rounded-xl transition-all text-emerald-500 hover:text-white font-bold group">
              <div className="flex items-center gap-4">
                <Printer size={24} className="text-emerald-400 group-hover:text-white" />
                <div className="text-start">
                  <div className="text-lg">{t('eod.printThermalA7', 'وصل طباعة حرارية (80mm)')}</div>
                  <div className="text-xs font-normal opacity-80 mt-1">{t('eod.printThermalA7Desc', 'وصل ورقي سريع ومقروء يُطبع فوراً من طابعة الكاشير.')}</div>
                </div>
              </div>
              <Printer size={20} />
            </button>
          </div>
        </Modal>

        <Modal isOpen={showZReportPrintModal} onClose={() => setShowZReportPrintModal(false)} title={t('eod.printZReportOptionsTitle', 'خيارات طباعة التقرير الختامي')}>
          <div className="p-6 flex flex-col gap-4 text-start" dir={isRTL ? 'rtl' : 'ltr'}>
            <p className="text-slate-400 mb-4 text-center">{t('eod.printZReportDesc', 'تم ترحيل اليومية بنجاح! اختر كيفية طباعة التقرير.')}</p>
            
            <button onClick={handleDownloadZReportWordA4} className="w-full flex items-center justify-between p-4 bg-indigo-600/10 hover:bg-indigo-600 border border-indigo-500/50 hover:border-indigo-500 rounded-xl transition-all text-indigo-400 hover:text-white font-bold group">
              <div className="flex items-center gap-4">
                <Download size={24} className="text-indigo-400 group-hover:text-white" />
                <div className="text-start">
                  <div className="text-lg">{t('eod.printWordA4', 'تحميل تقرير مفصل Word (A4)')}</div>
                  <div className="text-xs font-normal opacity-80 mt-1">{t('eod.printWordA4Desc', 'مستند وورد شامل يحتوي على تفاصيل اليومية لحفظه في أرشيف الشركة.')}</div>
                </div>
              </div>
              <FileText size={20} />
            </button>

            <button onClick={handlePrintZReportA7Thermal} className="w-full flex items-center justify-between p-4 bg-emerald-600/10 hover:bg-emerald-600 border border-emerald-500/50 hover:border-emerald-500 rounded-xl transition-all text-emerald-500 hover:text-white font-bold group">
              <div className="flex items-center gap-4">
                <Printer size={24} className="text-emerald-400 group-hover:text-white" />
                <div className="text-start">
                  <div className="text-lg">{t('eod.printThermalA7', 'وصل طباعة حرارية (80mm)')}</div>
                  <div className="text-xs font-normal opacity-80 mt-1">{t('eod.printThermalA7Desc', 'وصل ورقي سريع ومقروء يُطبع فوراً.')}</div>
                </div>
              </div>
              <Printer size={20} />
            </button>
          </div>
        </Modal>

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

          <div className="flex bg-slate-900 border border-slate-800 rounded-lg w-fit p-1 mb-6">
            <button onClick={() => setAdminTab('live')} className={`flex items-center gap-2 px-6 py-2.5 rounded-md font-medium transition-colors ${adminTab === 'live' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>
              <Clock size={18} /> {t('eod.liveShifts', 'الورديات الحالية')}
            </button>
            <button onClick={() => setAdminTab('archive')} className={`flex items-center gap-2 px-6 py-2.5 rounded-md font-medium transition-colors ${adminTab === 'archive' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>
              <Archive size={18} /> {t('eod.shiftArchiveSubtitle', 'أرشيف وردية كاشير')}
            </button>
          </div>

          {adminTab === 'live' && (
            <>
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
                            <td className="px-6 py-4 text-center font-bold text-slate-300" dir="ltr">{Number(s.opening_balance).toLocaleString()} {t('currency', 'د.ج')}</td>
                            <td className="px-6 py-4 text-center font-bold text-amber-400" dir="ltr">{s.status === 'open' ? '---' : `+${s.calculatedSales.toLocaleString()} ${t('currency', 'د.ج')}`}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {adminTab === 'archive' && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
              <div className="p-4 border-b border-slate-800 bg-slate-950/30">
                <h3 className="font-bold text-white">{t('eod.archivedShiftsTitle', 'سجل الورديات المغلقة السابقة')}</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-start border-collapse" dir={i18n.dir()}>
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-950/80">
                      <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('eod.cashierName', 'الكاشير')}</th>
                      <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('eod.dateAndTime', 'التاريخ ووقت العمل')}</th>
                      <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('eod.opening_balance', 'الافتتاح')}</th>
                      <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('eod.today_sales', 'المبيعات')}</th>
                      <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('eod.actual_cash', 'الدرج الفعلي')}</th>
                      <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('suppliers.table.actions', 'الإجراءات')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {archivedShifts.length === 0 ? (
                      <tr><td colSpan="6" className="text-center py-12 text-slate-500">{t('eod.noArchivedShifts', 'لا توجد ورديات أرشيفية')}</td></tr>
                    ) : (
                      archivedShifts.map(s => (
                        <tr key={s.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                          <td className="px-6 py-4 font-bold text-white">{s.cashier_name}</td>
                          <td className="px-6 py-4 text-sm text-slate-300">
                            <div className="flex flex-col items-start">
                              <span className="font-mono tracking-widest text-white" dir="ltr">
                                {(() => {
                                  const d = new Date(s.start_time);
                                  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
                                })()}
                              </span>
                              <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                                <span className="text-emerald-400/80 whitespace-nowrap" dir="ltr">
                                  {new Date(s.start_time).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' })}
                                </span>
                                {s.end_time && (
                                  <>
                                    <span>{isRTL ? '←' : '→'}</span>
                                    <span className="text-red-400/80 whitespace-nowrap" dir="ltr">
                                      {new Date(s.end_time).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center font-bold text-slate-400" dir="ltr">{Number(s.opening_balance).toLocaleString()} {t('currency', 'د.ج')}</td>
                          <td className="px-6 py-4 text-center font-bold text-amber-400" dir="ltr">+{Number(s.calculatedSales).toLocaleString()} {t('currency', 'د.ج')}</td>
                          <td className="px-6 py-4 text-center font-bold text-emerald-400 bg-slate-950/50" dir="ltr">{Number(s.actual_cash).toLocaleString()} {t('currency', 'د.ج')}</td>
                          <td className="px-6 py-4 text-center">
                            <button 
                              onClick={() => { setSelectedArchivedShift(s); setIsPrintModalOpen(true); }}
                              className="bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white px-3 py-1.5 rounded-lg flex items-center gap-2 mx-auto transition-colors"
                            >
                              <Printer size={16} /> {t('common.print', 'طباعة')}
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <Modal isOpen={isCloseDayModalOpen} onClose={() => setIsCloseDayModalOpen(false)} title={t('eod.close_day_btn', 'إغلاق اليومية')}>
            <div className="p-4 text-start">
              <p className="text-white mb-6 text-lg">{t('eod.close_day_confirm', 'هل أنت متأكد من إغلاق اليومية؟')}</p>
              <div className="bg-slate-950 p-4 rounded-lg mb-6 border border-slate-800 space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                    <span className="text-slate-400">{t('eod.grandTotalActual', 'إجمالي الدرج الفعلي')}</span>
                    <span className="text-emerald-400 font-bold text-xl" dir="ltr">{grandTotals.actual.toLocaleString()} {t('currency', 'د.ج')}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-400">{t('eod.grandTotalSales', 'إجمالي المبيعات')}</span>
                    <span className="text-amber-400 font-bold text-xl" dir="ltr">{grandTotals.sales.toLocaleString()} {t('currency', 'د.ج')}</span>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button onClick={() => setIsCloseDayModalOpen(false)} className="px-4 py-2 text-white bg-slate-700 rounded-lg hover:bg-slate-600">{t('common.cancel', 'إلغاء')}</button>
                <button onClick={executeCloseDay} className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 flex items-center gap-2"><Lock size={18}/> {t('common.confirm', 'تأكيد')}</button>
              </div>
            </div>
          </Modal>
        </>
      </div>
    );
  }

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

      {showReceipt && receiptData && !isSuperAdmin && (
        <div className="fixed inset-0 z-[9999] bg-slate-950/95 flex items-center justify-center p-4 backdrop-blur-md" dir={isRTL ? "rtl" : "ltr"}>
          <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden">
            
            {/* عرض الوصل للكاشير قبل الطباعة */}
            <div className="bg-slate-800 p-8 flex justify-center items-center w-full md:w-1/2 border-b md:border-b-0 md:border-l border-slate-700 relative overflow-y-auto max-h-[85vh] custom-scrollbar">
              <div className="absolute top-4 left-4 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-bold tracking-widest text-slate-300 uppercase">Live Preview</span>
              </div>
              
              <div style={{ transform: 'scale(0.95)', transformOrigin: 'top center', marginTop: '2rem' }}>
                <div id="printable-receipt" className="receipt-ticket-forced mx-auto shadow-2xl bg-white text-black print:shadow-none" dir={isRTL ? "rtl" : "ltr"}>
                  
                  <div className="text-center font-black" style={{ fontSize: '18px', marginBottom: '2px' }}>{currentStoreName}</div>
                  <div className="text-center font-bold" style={{ fontSize: '11px', marginBottom: '6px', paddingBottom:'6px', borderBottom: '2px dashed #000' }}>
                    {t('eod.x_report', 'تقرير الوردية (X-REPORT)')}
                  </div>
                  
                  <table style={{ width: '100%', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px' }}>
                    <tr><td style={{ padding: '3px 0', borderBottom: '1px dashed #eee', textAlign: alignStart }}>{t('eod.cashierName', 'الكاشير:')}</td><td style={{ padding: '3px 0', borderBottom: '1px dashed #eee', textAlign: alignEnd }}>{receiptData.cashier}</td></tr>
                    <tr><td style={{ padding: '3px 0', borderBottom: '1px dashed #eee', textAlign: alignStart }}>{t('hr.table.timeIn', 'الدخول:')}</td><td style={{ padding: '3px 0', borderBottom: '1px dashed #eee', textAlign: alignEnd }} dir="ltr">{new Date(receiptData.startTime).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' })}</td></tr>
                    <tr><td style={{ padding: '3px 0', borderBottom: '1px dashed #eee', textAlign: alignStart }}>{t('eod.time_out', 'الخروج:')}</td><td style={{ padding: '3px 0', borderBottom: '1px dashed #eee', textAlign: alignEnd }} dir="ltr">{new Date(receiptData.endTime).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' })}</td></tr>
                    
                    <tr><td style={{ padding: '3px 0', borderBottom: '1px dashed #eee', paddingTop:'10px', textAlign: alignStart }}>{t('eod.opening_balance', 'الافتتاح:')}</td><td style={{ padding: '3px 0', borderBottom: '1px dashed #eee', textAlign: alignEnd, paddingTop:'10px' }} dir="ltr">{receiptData.opening.toLocaleString()} {t('currency', 'DA')}</td></tr>
                    <tr><td style={{ padding: '3px 0', borderBottom: '1px dashed #eee', textAlign: alignStart }}>{t('eod.total_deducted', 'المسحوبات:')}</td><td style={{ padding: '3px 0', borderBottom: '1px dashed #eee', textAlign: alignEnd }} dir="ltr">{(receiptData.out || 0).toLocaleString()} {t('currency', 'DA')}</td></tr>
                  </table>

                  {receiptData.deductionsList && receiptData.deductionsList.length > 0 && (
                    <table style={{ width: '100%', fontSize: '10px', marginTop: '5px' }}>
                      <tr>
                        <th style={{ borderTop: '1px dashed #000', borderBottom: '1px solid #000', padding: '4px 0', textAlign: alignStart }}>{t('eod.deductionsDetails', 'تفاصيل المسحوبات:')}</th>
                        <th style={{ borderTop: '1px dashed #000', borderBottom: '1px solid #000', padding: '4px 0', textAlign: alignEnd }}>{t('eod.amount', 'المبلغ')}</th>
                      </tr>
                      {receiptData.deductionsList.map((d, i) => (
                        <tr key={i}>
                          <td style={{ padding: '3px 0', fontWeight: 'bold', width: '70%', textAlign: alignStart }}>- {d.description} <span style={{ fontSize: '9px', fontWeight: 'normal' }}>({getTranslatedType(d.type)})</span></td>
                          <td style={{ padding: '3px 0', fontWeight: 'bold', width: '30%', textAlign: alignEnd }} dir="ltr">{Number(d.amount).toLocaleString()}</td>
                        </tr>
                      ))}
                    </table>
                  )}

                  <div style={{ border: '2px solid #000', borderRadius: '4px', padding: '6px', margin: '15px 0' }}>
                    <table style={{ width: '100%' }}>
                      <tr>
                        <td style={{ fontSize: '14px', fontWeight: 'bold', textAlign: alignStart }}>{t('eod.actual_cash', 'الدرج الفعلي:')}</td>
                        <td style={{ fontSize: '16px', fontWeight: '900', textAlign: alignEnd }} dir="ltr">{(receiptData.actual || 0).toLocaleString()} {t('currency', 'DA')}</td>
                      </tr>
                    </table>
                  </div>

                  <div style={{ textAlign: 'center', fontSize: '12px', fontWeight: 'bold', marginTop: '15px' }}>
                    {t('eod.receipt_footer', 'احتفظ بالوصل للمراجعة')}
                  </div>
                  <div style={{ textAlign: 'center', fontSize: '11px', marginTop: '15px', borderTop: '1px dashed #000', paddingTop: '10px', fontWeight: '900' }}>
                    POWERED BY GHERBI.AI
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 w-full md:w-1/2 flex flex-col justify-center space-y-8 bg-slate-900">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{t('common.printSettings', 'إعدادات الطباعة')}</h2>
                <p className="text-slate-400 text-sm">{t('eod.printDesc', 'النافذة الاحترافية الخاصة بالطباعة')}</p>
              </div>

              <div className="space-y-4 mt-6">
                <button onClick={toggleLanguage} className="w-full flex items-center justify-between p-4 bg-slate-950 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all text-white font-bold group">
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-800 p-2 rounded-lg group-hover:bg-blue-600 transition-colors">
                      <Globe size={22} className="text-blue-400 group-hover:text-white" />
                    </div>
                    <span className="text-lg">{t('common.language', 'تغيير لغة الوصل')}</span>
                  </div>
                  <span className="text-sm bg-blue-900/30 border border-blue-800 text-blue-300 px-3 py-1 rounded-md uppercase tracking-wider">{i18n.language}</span>
                </button>

                <button onClick={handlePrint} className="w-full flex items-center justify-between p-4 bg-emerald-600/10 hover:bg-emerald-600 border border-emerald-500/50 hover:border-emerald-500 rounded-xl transition-all text-emerald-500 hover:text-white font-bold group">
                  <div className="flex items-center gap-4">
                    <div className="bg-emerald-500/20 group-hover:bg-emerald-500 p-2 rounded-lg transition-colors">
                      <Printer size={22} className="text-emerald-400 group-hover:text-white" />
                    </div>
                    <span className="text-lg">{t('common.print', 'طباعة مباشرة')}</span>
                  </div>
                  <span className="text-xs bg-emerald-950 border border-emerald-800 text-emerald-400 px-3 py-1 rounded-md">XPrinter 80mm</span>
                </button>

                <button onClick={handleSavePDF} className="w-full flex items-center justify-between p-4 bg-indigo-600/10 hover:bg-indigo-600 border border-indigo-500/50 hover:border-indigo-500 rounded-xl transition-all text-indigo-400 hover:text-white font-bold group">
                  <div className="flex items-center gap-4">
                    <div className="bg-indigo-500/20 group-hover:bg-indigo-500 p-2 rounded-lg transition-colors">
                      <Download size={22} className="text-indigo-400 group-hover:text-white" />
                    </div>
                    <span className="text-lg">{t('common.save', 'حفظ PDF')}</span>
                  </div>
                  <span className="text-xs bg-indigo-950 border border-indigo-800 text-indigo-400 px-3 py-1 rounded-md">Digital Copy</span>
                </button>
              </div>

              <div className="pt-8 mt-auto">
                <button onClick={handleCloseReceipt} className="w-full flex items-center justify-center gap-2 p-4 bg-red-950/30 hover:bg-red-600 text-red-500 hover:text-white border border-red-900/50 hover:border-red-500 rounded-xl transition-all font-bold text-lg">
                  <X size={24} /> <span>{t('common.close', 'إغلاق')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                  
                  <div className="flex items-center gap-3 bg-slate-950 p-4 rounded-lg border border-slate-800 shadow-inner mt-4 cursor-pointer hover:bg-slate-900 transition-colors" onClick={() => setAutoPrintEnabled(!autoPrintEnabled)}>
                    <button
                      type="button"
                      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none ${autoPrintEnabled ? 'bg-blue-600' : 'bg-slate-700'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${autoPrintEnabled ? (isRTL ? '-translate-x-6' : 'translate-x-6') : (isRTL ? '-translate-x-1' : 'translate-x-1')}`} />
                    </button>
                    <span className="text-sm font-bold text-slate-300 flex items-center gap-2">
                      <Printer size={16} className={autoPrintEnabled ? "text-blue-400" : "text-slate-500"} />
                      {t('eod.auto_print', 'الطباعة والحفظ التلقائي')}
                    </span>
                  </div>
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