import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Search, ArrowDownCircle, Wallet, Edit, Trash2, ShieldAlert, Filter, Info, CheckCircle2, AlertCircle, Printer, Download, FileText, Calendar } from 'lucide-react';
import Modal from '../ui/Modal';
import ConfirmAlert from '../ui/ConfirmAlert'; 
import useEmployeeStore from '../../store/employeeStore';
import useSupplierStore from '../../store/supplierStore';
import useAuthStore from '../../store/authStore';

export default function Expenses() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  
  const currentStoreName = localStorage.getItem('storeName') || 'GHERBI.AI';

  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const [hasActiveShift, setHasActiveShift] = useState(true); 
  const [toast, setToast] = useState(null); 

  // 🌟 حالات الفلترة بالتواريخ والطباعة
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const { employees, fetchEmployees } = useEmployeeStore();
  const { suppliers, fetchSuppliers } = useSupplierStore();
  const user = useAuthStore(state => state.user);

  const isSuperAdmin = user?.role === 'superadmin' || user?.role === 'admin';
  const myCaisseName = isSuperAdmin ? 'admin' : (user?.username || 'Cashier');
  
  const [selectedCaisseFilter, setSelectedCaisseFilter] = useState(isSuperAdmin ? 'all' : myCaisseName);

  const [formData, setFormData] = useState({
    description: '', category: 'utilities', amount: '', employeeId: '', supplierId: '', caisseSource: myCaisseName, date: new Date().toISOString().split('T')[0]
  });
  
  const myEmployeeRecord = useMemo(() => {
    return employees.find(e => e.name === user?.username);
  }, [employees, user]);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchExpensesList = async () => {
    try {
      if (window.api && window.api.getExpenses) {
        const data = await window.api.getExpenses(selectedCaisseFilter);
        setExpenses(data || []);
      }
    } catch (error) { console.error("Failed to fetch expenses:", error); }
  };

  useEffect(() => {
    fetchExpensesList();
  }, [selectedCaisseFilter]);

  useEffect(() => {
    fetchEmployees();
    fetchSuppliers();
  }, []);

  useEffect(() => {
    const checkShift = async () => {
      if (isSuperAdmin) {
        setHasActiveShift(true);
        return;
      }
      try {
        if (window.api && window.api.getActiveShift) {
          const shift = await window.api.getActiveShift(myCaisseName);
          setHasActiveShift(!!shift); 
        }
      } catch (error) {
        console.error("Error checking shift:", error);
      }
    };
    checkShift();
  }, [isSuperAdmin, myCaisseName]);

  const openAddModal = () => {
    if (!hasActiveShift && !isSuperAdmin) {
       showToast('warning', t('expenses.shiftRequiredAlert', i18n.language === 'ar' ? 'الرجاء فتح ورديتك من شاشة الصندوق أولاً!' : i18n.language === 'fr' ? 'Veuillez ouvrir votre caisse en premier!' : 'Please open your shift first!'));
       return;
    }
    setEditingExpense(null);
    setFormData({ 
      description: '', category: 'utilities', amount: '', 
      employeeId: '', 
      supplierId: '', caisseSource: myCaisseName, 
      date: new Date().toISOString().split('T')[0] 
    });
    setIsModalOpen(true);
  };

  const openEditModal = (expense) => {
    setEditingExpense(expense);
    setFormData({
      description: expense.description,
      category: expense.category,
      amount: expense.amount,
      employeeId: expense.employee_id || expense.employeeId || '',
      supplierId: expense.supplier_id || expense.supplierId || '',
      caisseSource: expense.caisse_source || myCaisseName, 
      date: expense.date || new Date().toISOString().split('T')[0] 
    });
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!expenseToDelete) return;
    try {
      let result;
      if (expenseToDelete.category === 'advance' && window.api.deleteAdvance) {
        result = await window.api.deleteAdvance(expenseToDelete.id); 
      } else if (expenseToDelete.category === 'supplier_payment' && window.api.deletePayment) {
        result = await window.api.deletePayment(expenseToDelete.id); 
      } else if (window.api.deleteExpense) {
        result = await window.api.deleteExpense(expenseToDelete.id, user?.username || 'Unknown'); 
      }

      if (result && result.success) {
        fetchExpensesList();
        showToast('success', t('common.success', i18n.language === 'ar' ? 'تم الحذف بنجاح' : i18n.language === 'fr' ? 'Supprimé avec succès' : 'Deleted successfully'));
      } else {
        showToast('error', t('common.error', i18n.language === 'ar' ? 'حدث خطأ أثناء الحذف' : 'Error deleting'));
      }
    } catch (error) { console.error("Error deleting expense:", error); }
    setExpenseToDelete(null); 
  };

  const handleSubmitExpense = async (e) => {
    e.preventDefault();
    const amountNum = parseFloat(formData.amount) || 0;
    const dateStr = formData.date; 
    const finalCaisseSource = isSuperAdmin ? formData.caisseSource : myCaisseName;

    try {
      if (editingExpense) {
        if (formData.category === 'advance' && window.api.updateAdvance) {
          await window.api.updateAdvance(editingExpense.id, {
             employeeId: formData.employeeId, amount: amountNum, date: dateStr, caisseSource: finalCaisseSource, note: formData.description
          });
        } else if (formData.category === 'supplier_payment' && window.api.updatePayment) {
          await window.api.updatePayment(editingExpense.id, {
             supplierId: formData.supplierId, amount: amountNum, date: dateStr, caisseSource: finalCaisseSource, note: formData.description
          });
        } else if (window.api.updateExpense) {
          await window.api.updateExpense(editingExpense.id, { 
            description: formData.description, category: formData.category, amount: amountNum, date: dateStr, caisseSource: finalCaisseSource 
          });
        }
      } else {
        if (formData.category === 'advance' && window.api.addAdvance) {
          await window.api.addAdvance({
            employeeId: formData.employeeId, amount: amountNum, date: dateStr, caisseSource: finalCaisseSource, note: formData.description
          });
        } else if (formData.category === 'supplier_payment' && window.api.addPayment) {
          await window.api.addPayment({
            supplierId: formData.supplierId, amount: amountNum, date: dateStr, caisseSource: finalCaisseSource, note: formData.description
          });
        } else if (window.api.addExpense) {
          await window.api.addExpense({ 
            description: formData.description, category: formData.category, amount: amountNum, date: dateStr, caisseSource: finalCaisseSource 
          });
        }
      }

      setIsModalOpen(false);
      setEditingExpense(null);
      fetchExpensesList(); 
      showToast('success', t('common.success', i18n.language === 'ar' ? 'تم الحفظ بنجاح' : i18n.language === 'fr' ? 'Enregistré avec succès' : 'Saved successfully'));
    } catch (error) { console.error("Error saving transaction:", error); }
  };

  const getCategoryTranslation = (category) => {
    const translated = t(`expenses.categories.${category}`);
    return translated.includes('expenses.categories') ? category : translated;
  };

  // 🌟 دالة الفلترة الشاملة (للعرض والطباعة)
  const filteredExpenses = useMemo(() => {
    return expenses?.filter(exp => {
      const matchesSearch = (exp.description || "").toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDate = exp.date >= startDate && exp.date <= endDate;
      return matchesSearch && matchesDate;
    }) || [];
  }, [expenses, searchTerm, startDate, endDate]);

  const totalFilteredAmount = filteredExpenses.reduce((sum, exp) => sum + (exp.amount || 0), 0);

  const availableCaisses = useMemo(() => {
      const caisses = new Set(['admin']);
      employees.forEach(emp => {
         if(emp.role === 'cashier' || emp.role === 'scale') caisses.add(emp.name);
      });
      return Array.from(caisses);
  }, [employees]);

  // =========================================================================
  // 🌟 دوال الطباعة (A4 Word و A7 Thermal)
  // =========================================================================

  const getReportTitleInfo = () => {
    const period = startDate === endDate 
      ? t('expenses.print.singleDate', { date: startDate, defaultValue: i18n.language === 'ar' ? `ليوم: ${startDate}` : `Date: ${startDate}` })
      : t('expenses.print.period', { start: startDate, end: endDate, defaultValue: i18n.language === 'ar' ? `من ${startDate} إلى ${endDate}` : `From ${startDate} To ${endDate}` });
      
    let source = t('expenses.print.allSources', i18n.language === 'ar' ? 'جميع الصناديق' : 'All Caisses');
    if (!isSuperAdmin) source = t('expenses.print.caisseOf', { name: myCaisseName, defaultValue: i18n.language === 'ar' ? `صندوق الكاشير: ${myCaisseName}` : `Caisse: ${myCaisseName}` });
    else if (selectedCaisseFilter !== 'all') {
      source = selectedCaisseFilter === 'admin' 
        ? t('expenses.adminCaisse', i18n.language === 'ar' ? 'صندوق المدير' : 'Admin Caisse') 
        : t('expenses.print.caisseOf', { name: selectedCaisseFilter, defaultValue: i18n.language === 'ar' ? `صندوق: ${selectedCaisseFilter}` : `Caisse: ${selectedCaisseFilter}` });
    }

    return { period, source };
  };

  const handleDownloadWordA4 = () => {
    const dir = isRTL ? 'rtl' : 'ltr';
    const curr = t('currency', 'د.ج');
    const { period, source } = getReportTitleInfo();
    const showCaisseColumn = isSuperAdmin && selectedCaisseFilter === 'all';

    let html = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8">
      <title>${t('expenses.print.reportTitle', i18n.language === 'ar' ? 'تقرير المصاريف' : 'Expenses Report')}</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Arial, sans-serif; direction: ${dir}; color: #000; }
        h2 { text-align: center; color: #1e293b; margin-bottom: 5px; font-size: 24px; text-transform: uppercase; }
        h3 { text-align: center; color: #475569; margin-top: 0; font-size: 14px; margin-bottom: 20px; border-bottom: 2px solid #000; padding-bottom: 10px; }
        .info-box { text-align: center; margin-bottom: 20px; font-size: 13px; font-weight: bold; }
        .main-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 12px; }
        .main-table th, .main-table td { border: 1px solid #000; padding: 6px; text-align: center; }
        .main-table th { background-color: #e2e8f0; font-weight: bold; }
        .total-row { font-size: 16px; font-weight: bold; background-color: #f1f5f9; }
        .footer-note { text-align: center; font-size: 10px; color: #64748b; margin-top: 40px; font-weight: bold; }
      </style>
    </head>
    <body>
      <h2>${currentStoreName}</h2>
      <h3>${t('expenses.print.reportTitle', i18n.language === 'ar' ? 'التقرير المفصل للمصاريف' : 'Detailed Expenses Report')}</h3>
      
      <div class="info-box">
        <p>${period}</p>
        <p>${t('expenses.caisseSourceLabel', i18n.language === 'ar' ? 'المصدر:' : 'Source:')} ${source}</p>
      </div>
    `;

    if (filteredExpenses.length === 0) {
      html += `<p style="text-align: center; color: #64748b;">${t('common.noResults', 'لا توجد بيانات')}</p>`;
    } else {
      html += `
        <table class="main-table">
          <thead>
            <tr>
              <th>${t('expenses.table.date', i18n.language === 'ar' ? 'التاريخ' : 'Date')}</th>
              <th>${t('expenses.table.description', i18n.language === 'ar' ? 'البيان' : 'Description')}</th>
              <th>${t('expenses.table.category', i18n.language === 'ar' ? 'التصنيف' : 'Category')}</th>
              ${showCaisseColumn ? `<th>${t('expenses.caisseSourceLabel', i18n.language === 'ar' ? 'المصدر' : 'Source')}</th>` : ''}
              <th>${t('expenses.table.amount', i18n.language === 'ar' ? 'المبلغ' : 'Amount')}</th>
            </tr>
          </thead>
          <tbody>
      `;
      filteredExpenses.forEach(exp => {
        html += `
          <tr>
            <td dir="ltr">${exp.date}</td>
            <td style="font-weight: bold;">${exp.description}</td>
            <td>${getCategoryTranslation(exp.category)}</td>
            ${showCaisseColumn ? `<td>${exp.caisse_source === 'admin' ? t('common.superAdmin', 'المدير') : exp.caisse_source}</td>` : ''}
            <td dir="ltr" style="font-weight: bold; color: #b91c1c;">${Number(exp.amount).toLocaleString()} ${curr}</td>
          </tr>
        `;
      });
      html += `
            <tr class="total-row">
              <td colspan="${showCaisseColumn ? 4 : 3}" style="text-align: ${isRTL ? 'left' : 'right'};">${t('expenses.print.total', i18n.language === 'ar' ? 'المجموع الكلي:' : 'Grand Total:')}</td>
              <td dir="ltr">${totalFilteredAmount.toLocaleString()} ${curr}</td>
            </tr>
          </tbody>
        </table>
      `;
    }

    html += `<div class="footer-note">POWERED BY GHERBI.AI</div></body></html>`;

    const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Expenses_${source}_${startDate}_to_${endDate}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsPrintModalOpen(false);
  };

  const handlePrintA7Thermal = () => {
    const curr = t('currency', 'د.ج');
    const { period, source } = getReportTitleInfo();
    const showCaisseColumn = isSuperAdmin && selectedCaisseFilter === 'all';

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

    let itemsHtml = '';
    filteredExpenses.forEach(exp => {
      itemsHtml += `
        <div style="border-bottom: 1px dashed #000; padding: 6px 0; margin-bottom: 4px;">
          <div style="display:flex; justify-content:space-between; font-weight:bold; font-size:13px;">
            <span>${exp.description}</span>
            <span dir="ltr">${Number(exp.amount).toLocaleString()} ${curr}</span>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:11px; margin-top:2px;">
            <span dir="ltr">${exp.date}</span>
            <span>${showCaisseColumn ? `(${exp.caisse_source}) ` : ''}${getCategoryTranslation(exp.category)}</span>
          </div>
        </div>
      `;
    });

    doc.write(`
      <!DOCTYPE html>
      <html lang="${i18n.language}" dir="${isRTL ? 'rtl' : 'ltr'}">
      <head>
        <title>Expenses Thermal Print</title>
        <style>
          @page { margin: 0; }
          html, body { margin: 0; padding: 0; width: 72mm; background: #fff; color: #000; font-family: sans-serif; }
          .print-wrapper { width: 100%; padding: 2mm 6mm; box-sizing: border-box; }
          h2 { text-align: center; font-size: 18px; margin: 0 0 5px 0; font-weight: 900; color: #000; }
          .subtitle { text-align: center; font-size: 13px; margin-bottom: 10px; border-bottom: 2px dashed #000; padding-bottom: 6px; font-weight: bold; color: #000; }
          .amount-box { display: flex; justify-content: space-between; align-items: center; border-top: 2px solid #000; border-bottom: 2px solid #000; padding: 8px 0; margin-top: 15px; color: #000; }
          .amount-box .box-title { font-size: 15px; font-weight: bold; padding: 0 5px; color: #000; }
          .amount-box .box-value { font-size: 18px; font-weight: 900; padding: 0 5px; color: #000; }
          .footer-brand { text-align: center; margin-top: 20px; font-size: 11px; font-weight: 900; border-top: 1px dashed #000; padding-top: 8px; color: #000; }
        </style>
      </head>
      <body>
        <div class="print-wrapper">
          <h2>${currentStoreName}</h2>
          <div class="subtitle">${t('expenses.print.reportTitle', i18n.language === 'ar' ? 'تقرير المصاريف' : 'Expenses Report')}</div>
          
          <div style="font-size: 11px; font-weight: bold; margin-bottom: 10px; color: #000; text-align: center;">
             ${period} <br>
             ${source}
          </div>

          <div style="font-size: 12px; font-weight: bold; border-bottom: 1px solid #000; padding-bottom: 4px; margin-bottom: 6px;">
            ${t('expenses.print.details', i18n.language === 'ar' ? 'التفاصيل' : 'Details')}
          </div>
          
          ${filteredExpenses.length > 0 ? itemsHtml : `<div style="text-align:center; font-size:12px;">${t('common.noResults', 'لا توجد بيانات')}</div>`}

          <div class="amount-box">
            <span class="box-title">${t('expenses.print.total', i18n.language === 'ar' ? 'المجموع الكلي:' : 'Total:')}</span>
            <span class="box-value" dir="ltr">${totalFilteredAmount.toLocaleString()} ${curr}</span>
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
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans text-start relative">
      
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

      {/* 🔴 النافذة السحرية لخيارات الطباعة */}
      <Modal isOpen={isPrintModalOpen} onClose={() => setIsPrintModalOpen(false)} title={t('expenses.print.modalTitle', i18n.language === 'ar' ? 'خيارات طباعة التقرير' : 'Print Options')}>
        <div className="p-6 flex flex-col gap-4 text-start" dir={isRTL ? 'rtl' : 'ltr'}>
          <p className="text-slate-400 mb-4 text-center">{t('expenses.print.modalDesc', i18n.language === 'ar' ? 'اختر مقاس الورق المناسب لطباعة تقرير المصاريف المحدد.' : 'Select paper size to print the filtered expenses.')}</p>
          
          <button onClick={handleDownloadWordA4} className="w-full flex items-center justify-between p-4 bg-indigo-600/10 hover:bg-indigo-600 border border-indigo-500/50 hover:border-indigo-500 rounded-xl transition-all text-indigo-400 hover:text-white font-bold group">
            <div className="flex items-center gap-4">
              <Download size={24} className="text-indigo-400 group-hover:text-white" />
              <div className="text-start">
                <div className="text-lg">{t('payroll.printA4', i18n.language === 'ar' ? 'تحميل تقرير مفصل Word (A4)' : 'Download Word (A4)')}</div>
              </div>
            </div>
            <FileText size={20} />
          </button>

          <button onClick={handlePrintA7Thermal} className="w-full flex items-center justify-between p-4 bg-emerald-600/10 hover:bg-emerald-600 border border-emerald-500/50 hover:border-emerald-500 rounded-xl transition-all text-emerald-500 hover:text-white font-bold group">
            <div className="flex items-center gap-4">
              <Printer size={24} className="text-emerald-400 group-hover:text-white" />
              <div className="text-start">
                <div className="text-lg">{t('payroll.printA7', i18n.language === 'ar' ? 'وصل طباعة حرارية (80mm)' : 'Thermal Print (80mm)')}</div>
              </div>
            </div>
            <Printer size={20} />
          </button>
        </div>
      </Modal>

      {!hasActiveShift && !isSuperAdmin && (
        <div className="mb-6 bg-amber-500/10 border border-amber-500/50 p-4 rounded-xl flex items-center gap-3 animate-in fade-in">
          <ShieldAlert className="text-amber-400 shrink-0" size={24} />
          <div>
            <h3 className="text-amber-400 font-bold">{t('expenses.shiftRequired', i18n.language === 'ar' ? 'لا توجد وردية مفتوحة!' : i18n.language === 'fr' ? 'Aucune caisse ouverte!' : 'No open shift!')}</h3>
            <p className="text-amber-200/80 text-sm">
              {t('expenses.shiftRequiredHint', i18n.language === 'ar' ? 'لا يمكنك إضافة مصاريف أو سلفيات. الرجاء الذهاب إلى شاشة "الصندوق" وفتح ورديتك أولاً.' : i18n.language === 'fr' ? 'Vous devez ouvrir votre caisse avant d\'ajouter des dépenses.' : 'You must open your shift before adding expenses.')}
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Wallet className="text-blue-500" /> {t('expenses.title', i18n.language === 'ar' ? 'المصاريف والسلف' : i18n.language === 'fr' ? 'Dépenses et Avances' : 'Expenses & Advances')}
          </h1>
          <p className="text-slate-500">{t('expenses.subtitle', i18n.language === 'ar' ? 'تتبع كل الحركات المالية الخارجة' : i18n.language === 'fr' ? 'Suivre toutes les transactions sortantes' : 'Track all outgoing transactions')}</p>
        </div>
      
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* 🌟 فلاتر التاريخ الجديدة المدمجة مع زر الصناديق */}
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 shadow-sm w-full md:w-auto">
            <div className="flex items-center gap-2 px-2 border-e border-slate-700">
               <Calendar size={16} className="text-emerald-400" />
               <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="bg-transparent text-xs text-white outline-none cursor-pointer" title={t('common.from', 'من')} />
               <span className="text-slate-500">-</span>
               <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="bg-transparent text-xs text-white outline-none cursor-pointer" title={t('common.to', 'إلى')} />
            </div>

            {isSuperAdmin && (
               <div className="flex items-center gap-1 px-2">
                 <Filter size={16} className="text-blue-400" />
                 <select 
                   value={selectedCaisseFilter} 
                   onChange={(e) => setSelectedCaisseFilter(e.target.value)}
                   className="bg-transparent text-sm text-white font-medium focus:outline-none cursor-pointer w-28 md:w-auto"
                   dir={isRTL ? "rtl" : "ltr"}
                 >
                   <option value="all">{t('expenses.allCaisses', i18n.language === 'ar' ? 'كل الصناديق' : i18n.language === 'fr' ? 'Toutes les caisses' : 'All Caisses')}</option>
                   {availableCaisses.map(c => (
                     <option key={c} value={c}>
                       {c === 'admin' ? t('expenses.adminCaisse', i18n.language === 'ar' ? 'صندوق المدير' : 'Admin') : c}
                     </option>
                   ))}
                 </select>
               </div>
            )}
          </div>

          <button 
            onClick={() => setIsPrintModalOpen(true)} 
            disabled={filteredExpenses.length === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-50"
            title={t('common.print', 'طباعة')}
          >
            <Printer size={18} />
          </button>

          <button 
            onClick={openAddModal} 
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
              !hasActiveShift && !isSuperAdmin 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <Plus size={18} /><span className="hidden md:inline">{t('expenses.addExpense', i18n.language === 'ar' ? 'إضافة مصروف' : i18n.language === 'fr' ? 'Ajouter' : 'Add')}</span>
          </button>
        </div>
      </div>

      {!isSuperAdmin && (
        <div className="mb-6 bg-blue-900/20 border border-blue-800/50 rounded-lg p-3 flex items-center gap-3 text-blue-300 text-sm" dir={i18n.dir()}>
           <Info size={18} className="text-blue-400 shrink-0" />
           <p className="leading-relaxed">
             {t('expenses.cashierNotice', { name: myCaisseName, defaultValue: i18n.language === 'ar' ? `أنت تشاهد المصاريف والدفعات التي تمت من صندوقك الخاص فقط (${myCaisseName}).` : i18n.language === 'fr' ? `Vous consultez uniquement les dépenses de votre caisse (${myCaisseName}).` : `Viewing expenses for your caisse only (${myCaisseName}).` })}
           </p>
        </div>
      )}

      {/* 🌟 عرض المجموع المفلتر بدلاً من الثابت */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">{t('expenses.kpi.filteredTotal', i18n.language === 'ar' ? 'مجموع المصاريف (للفترة المحددة)' : 'Filtered Total')}</p>
            <h3 className="text-2xl font-bold text-white mt-1">{totalFilteredAmount.toLocaleString()} {t('currency', 'DA')}</h3>
          </div>
          <div className="p-3 bg-red-950/30 rounded-lg text-red-400"><ArrowDownCircle size={24} /></div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        <div className="p-4 border-b border-slate-800 bg-slate-950/30">
          <div className="relative w-full max-w-md">
            <Search size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder={t('common.search', i18n.language === 'ar' ? 'بحث في البيان...' : 'Search...')} className="w-full bg-slate-900 border border-slate-700 rounded-lg ps-10 pe-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors shadow-inner text-start" dir={isRTL ? "rtl" : "ltr"} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-start border-collapse" dir={i18n.dir()}>
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80">
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('expenses.table.date', i18n.language === 'ar' ? 'التاريخ' : i18n.language === 'fr' ? 'Date' : 'Date')}</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('expenses.table.description', i18n.language === 'ar' ? 'البيان / الوصف' : i18n.language === 'fr' ? 'Description' : 'Description')}</th>
                {isSuperAdmin && selectedCaisseFilter === 'all' && <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('expenses.caisseSourceLabel', i18n.language === 'ar' ? 'المصدر' : i18n.language === 'fr' ? 'Source' : 'Source')}</th>}
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('expenses.table.amount', i18n.language === 'ar' ? 'المبلغ' : i18n.language === 'fr' ? 'Montant' : 'Amount')}</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('suppliers.table.actions', i18n.language === 'ar' ? 'الإجراءات' : i18n.language === 'fr' ? 'Actions' : 'Actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((exp) => (
                <tr key={`${exp.source}-${exp.id}`} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-400 whitespace-nowrap text-start" dir="ltr">{exp.date}</td>
                  <td className="px-6 py-4 text-start">
                    <span className="font-medium text-white">{exp.description}</span>
                    <div className="text-xs text-slate-500 mt-1">{getCategoryTranslation(exp.category)}</div>
                  </td>
                  
                  {isSuperAdmin && selectedCaisseFilter === 'all' && (
                     <td className="px-6 py-4 text-center">
                       <span className={`px-2 py-1 rounded-md text-xs font-medium ${exp.caisse_source === 'admin' ? 'bg-blue-950 text-blue-400 border border-blue-900' : 'bg-slate-800 text-slate-300 border border-slate-700'}`}>
                         {exp.caisse_source === 'admin' ? t('common.superAdmin', i18n.language === 'ar' ? 'المدير' : i18n.language === 'fr' ? 'Admin' : 'Admin') : exp.caisse_source}
                       </span>
                     </td>
                  )}

                  <td className="px-6 py-4 text-start font-bold text-red-400" dir="ltr">{exp.amount.toLocaleString()} {t('currency', 'DA')}</td>
                  
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => openEditModal(exp)} className="p-2 text-blue-400 hover:bg-blue-900/50 rounded-lg transition-colors" title={t('expenses.editExpense', i18n.language === 'ar' ? 'تعديل' : i18n.language === 'fr' ? 'Modifier' : 'Edit')}>
                        <Edit size={18} />
                      </button>
                      <button onClick={() => setExpenseToDelete(exp)} className="p-2 text-red-400 hover:bg-red-900/50 rounded-lg transition-colors" title={t('suppliers.actions.delete', i18n.language === 'ar' ? 'حذف' : i18n.language === 'fr' ? 'Supprimer' : 'Delete')}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredExpenses.length === 0 && (
                <tr><td colSpan={isSuperAdmin && selectedCaisseFilter === 'all' ? "5" : "4"} className="px-6 py-12 text-center text-slate-500">{t('common.noResults', i18n.language === 'ar' ? 'لا توجد نتائج مطابقة للتاريخ والبحث' : 'No results found')}</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmAlert isOpen={!!expenseToDelete} onClose={() => setExpenseToDelete(null)} onConfirm={confirmDelete} title={t('suppliers.actions.delete', i18n.language === 'ar' ? 'حذف' : 'Delete')} message={t('expenses.deleteConfirm', i18n.language === 'ar' ? 'هل أنت متأكد من حذف هذا السجل؟' : 'Are you sure?')} confirmText={t('suppliers.actions.confirmDeleteBtn', i18n.language === 'ar' ? 'نعم، احذف' : 'Yes, Delete')} />

      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingExpense(null); }} title={editingExpense ? t('expenses.editExpense', i18n.language === 'ar' ? 'تعديل' : 'Edit') : t('expenses.addExpense', i18n.language === 'ar' ? 'إضافة مصروف' : 'Add Expense')}>
        <form className="space-y-4" onSubmit={handleSubmitExpense} dir={isRTL ? "rtl" : "ltr"}>
          
          {isSuperAdmin && (
             <div>
               <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('expenses.caisseSourceLabel', i18n.language === 'ar' ? 'مصدر الأموال' : i18n.language === 'fr' ? 'Source des fonds' : 'Fund Source')}</label>
               <select value={formData.caisseSource} onChange={e => setFormData({...formData, caisseSource: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-start">
                 <option value="admin">{t('expenses.adminCaisse', i18n.language === 'ar' ? 'صندوق المدير' : i18n.language === 'fr' ? 'Caisse Admin' : 'Admin Caisse')}</option>
                 {availableCaisses.filter(c => c !== 'admin').map(c => <option key={c} value={c}>{t('expenses.cashierCaisse', { name: c, defaultValue: i18n.language === 'ar' ? `صندوق الكاشير: ${c}` : `Caisse: ${c}` })}</option>)}
               </select>
             </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('expenses.table.category', i18n.language === 'ar' ? 'التصنيف' : i18n.language === 'fr' ? 'Catégorie' : 'Category')}</label>
            <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors text-start" disabled={!!editingExpense}>
              <option value="utilities">{t('expenses.categories.utilities', i18n.language === 'ar' ? 'فواتير وخدمات' : i18n.language === 'fr' ? 'Factures' : 'Utilities')}</option>
              <option value="maintenance">{t('expenses.categories.maintenance', i18n.language === 'ar' ? 'صيانة وإصلاح' : i18n.language === 'fr' ? 'Maintenance' : 'Maintenance')}</option>
              <option value="supplies">{t('expenses.categories.supplies', i18n.language === 'ar' ? 'مستلزمات المتجر' : i18n.language === 'fr' ? 'Fournitures' : 'Supplies')}</option>
              <option value="advance">{t('expenses.categories.advance', i18n.language === 'ar' ? 'سلفة عامل' : i18n.language === 'fr' ? 'Avance Employé' : 'Employee Advance')}</option>
              <option value="supplier_payment">{t('expenses.categories.supplier_payment', i18n.language === 'ar' ? 'تسديد مورد' : i18n.language === 'fr' ? 'Paiement Fournisseur' : 'Supplier Payment')}</option>
            </select>
          </div>

          {formData.category === 'advance' && (
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2 text-start">
                {t('expenses.selectEmployee', i18n.language === 'ar' ? 'اختر الموظف' : i18n.language === 'fr' ? 'Choisir un employé' : 'Select Employee')}
              </label>
              <select 
                value={formData.employeeId} 
                onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })} 
                className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-blue-500 text-start"
                required
              >
                <option value="" disabled>{t('expenses.selectEmployeePlaceholder', i18n.language === 'ar' ? '-- اختر الموظف لتقديم السلفة --' : '-- Choose employee --')}</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} {emp.name === user?.username ? t('expenses.myAdvance', i18n.language === 'ar' ? " - (سلفتي الشخصية)" : " - (My Advance)") : ""}
                  </option>
                ))}
              </select>
            </div>
          )}

          {formData.category === 'supplier_payment' && (
             <div>
               <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('suppliers.modal.nameLabel', i18n.language === 'ar' ? 'المورد' : i18n.language === 'fr' ? 'Fournisseur' : 'Supplier')}</label>
               <select required value={formData.supplierId} onChange={e => setFormData({...formData, supplierId: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-start">
                 <option value="" disabled>{t('suppliers.modal.selectSupplier', i18n.language === 'ar' ? '-- اختر مورداً --' : '-- Choose supplier --')}</option>
                 {suppliers.map(sup => <option key={sup.id} value={sup.id}>{sup.name}</option>)}
               </select>
             </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('expenses.dateLabel', i18n.language === 'ar' ? 'التاريخ' : i18n.language === 'fr' ? 'Date' : 'Date')}</label>
            <input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors text-start" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('expenses.table.amount', i18n.language === 'ar' ? 'المبلغ' : i18n.language === 'fr' ? 'Montant' : 'Amount')} ({t('currency', 'DA')})</label>
            <input type="number" min="1" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors text-start" required dir="ltr" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('expenses.table.description', i18n.language === 'ar' ? 'البيان / الوصف' : i18n.language === 'fr' ? 'Description' : 'Description')}</label>
            <input type="text" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors text-start" required />
          </div>

          <div className="pt-4 flex justify-end gap-3 mt-4">
            <button type="button" onClick={() => { setIsModalOpen(false); setEditingExpense(null); }} className="px-4 py-2 rounded-lg font-medium text-slate-300 hover:bg-slate-800 transition-colors">{t('common.cancel', i18n.language === 'ar' ? 'إلغاء' : i18n.language === 'fr' ? 'Annuler' : 'Cancel')}</button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">{editingExpense ? t('expenses.saveChanges', i18n.language === 'ar' ? 'حفظ التعديلات' : i18n.language === 'fr' ? 'Sauvegarder' : 'Save Changes') : t('expenses.addExpense', i18n.language === 'ar' ? 'إضافة مصروف' : i18n.language === 'fr' ? 'Ajouter' : 'Add Expense')}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}