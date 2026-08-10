import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Calculator, Banknote, Clock, MinusCircle, CheckCircle, Plus, AlertCircle, FileText, CheckCircle2, Edit, Trash2, Download, Printer } from 'lucide-react';

import useEmployeeStore from '../../store/employeeStore';
import usePayrollStore from '../../store/payrollStore';
import useAuthStore from '../../store/authStore';
import ConfirmAlert from '../ui/ConfirmAlert'; 
import Modal from '../ui/Modal'; 

export default function Payroll() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const navigate = useNavigate();

  const currentStoreName = localStorage.getItem('storeName') || 'GHERBI.AI';

  const [activeTab, setActiveTab] = useState('calculator');

  const { employees, fetchEmployees } = useEmployeeStore();
  const { advances, salaries, fetchAdvances, fetchSalaries, addAdvance, calculatePayroll, payrollResult, paySalary, clearPayrollResult } = usePayrollStore();
  
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

  const [editingAdvance, setEditingAdvance] = useState(null);
  const [advanceToDelete, setAdvanceToDelete] = useState(null);
  const [confirmModalData, setConfirmModalData] = useState(null);

  // 🌟 حالة نافذة الطباعة
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

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
    
    if (window.api && window.api.calculatePayroll) {
      const checkRes = await window.api.calculatePayroll({ employeeId: selectedEmployee, startDate, endDate, hourlyRate: Number(hourlyRate) });
      if (checkRes && checkRes.isAlreadyPaid) {
        showToast('error', t('payroll.errors.overlap', { 
          start: checkRes.overlapStart, 
          end: checkRes.overlapEnd, 
          defaultValue: `لا يمكن الحساب! لقد تم دفع راتب مسبقاً (${checkRes.overlapStart} إلى ${checkRes.overlapEnd})` 
        }));
        clearPayrollResult(); 
        return; 
      }
    }

    await calculatePayroll({ employeeId: selectedEmployee, startDate, endDate, hourlyRate: Number(hourlyRate) });
  };
  
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

  const handleSaveAdvance = async (e) => {
    e.preventDefault();
    if (!advanceData.employeeId || !advanceData.caisseSource) return;
    
    let success = false;
    if (editingAdvance) {
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
      success = await addAdvance({ employeeId: advanceData.employeeId, amount: Number(advanceData.amount), date: advanceData.date, caisseSource: advanceData.caisseSource, note: advanceData.note });
    }

    if (success) {
      setIsAdvanceModalOpen(false);
      setEditingAdvance(null);
      setAdvanceData({ employeeId: '', amount: '', date: today.toISOString().split('T')[0], caisseSource: '', note: '' });
      if (payrollResult) handleCalculate(); 
      fetchAdvances();
      showToast('success', t('common.success', 'تمت العملية بنجاح'));
    } else {
      showToast('error', t('common.error', 'حدث خطأ غير متوقع'));
    }
  };

  const executeDeleteAdvance = async () => {
    if (!advanceToDelete) return;
    if (window.api && window.api.deleteAdvance) {
      const res = await window.api.deleteAdvance(advanceToDelete);
      if (res?.success) {
        fetchAdvances();
        showToast('success', t('common.success', 'تمت العملية بنجاح'));
      } else {
        const translatedError = res.error ? t(`payroll.errors.${res.error}`, {defaultValue: res.error}) : t('common.error', 'حدث خطأ غير متوقع');
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
      rolloverNote: t('payroll.rolloverNote', { start: payrollResult.startDate, end: payrollResult.endDate, defaultValue: `ترحيل ديون سلفيات (${payrollResult.startDate} إلى ${payrollResult.endDate})` }),
      expenseNote: t('payroll.expenseNote', { name: employeeName, start: payrollResult.startDate, end: payrollResult.endDate, defaultValue: `راتب: ${employeeName} (${payrollResult.startDate} إلى ${payrollResult.endDate})` })
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
      showToast('success', t('common.success', 'تمت العملية بنجاح'));
    } else {
      showToast('error', t('common.error', 'حدث خطأ غير متوقع') + ' \n' + res.error);
    }
    setConfirmModalData(null);
  };

  const exportSalariesToWord = (salariesList, isSingle = false) => {
    if (!salariesList || salariesList.length === 0) return;

    const dir = isRTL ? 'rtl' : 'ltr';
    const alignStart = isRTL ? 'right' : 'left';
    const alignEnd = isRTL ? 'left' : 'right';
    const curr = t('currency', 'د.ج');
    const title = isSingle ? t('payroll.payslip', 'كشف راتب موظف') : t('payroll.comprehensiveReport', 'سجل الرواتب والحضور المفصل');
    
    const totalEmployeesText = t('payroll.totalEmployees', isRTL ? 'إجمالي الموظفين' : 'Total Employees');

    let html = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8">
      <title>${title}</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Arial, sans-serif; direction: ${dir}; color: #000; }
        h2 { text-align: center; color: #1e293b; margin-bottom: 5px; font-size: 22px; text-transform: uppercase; }
        h3 { text-align: center; color: #475569; margin-top: 0; font-size: 13px; margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th, td { border: 1px solid #334155; padding: 8px; text-align: center; font-size: 11px; vertical-align: middle; }
        th { background-color: #e2e8f0; font-weight: bold; font-size: 12px; color: #0f172a; }
        .net-salary { font-weight: bold; background-color: #f1f5f9; font-size: 13px; }
        .log-box { font-family: 'Courier New', Courier, monospace; font-size: 11px; text-align: left; line-height: 1.5; color: #1e293b; white-space: nowrap; direction: ltr; }
        .footer-note { text-align: center; font-size: 10px; color: #64748b; margin-top: 30px; }
      </style>
    </head>
    <body>
      <h2>${title}</h2>
      <h3>${currentStoreName} - ${t('zreport.date', 'تاريخ الإصدار:')} <span dir="ltr">${new Date().toLocaleDateString(i18n.language)}</span></h3>
    `;

    if (isSingle) {
      const s = salariesList[0];
      const gross = Number(s.total_hours || 0) * Number(s.hourly_rate || 0);
      
      let logsHtml = '';
      if (s.daily_logs && s.daily_logs.length > 0) {
        logsHtml = s.daily_logs.map(l => `<div style="border-bottom: 1px dashed #cbd5e1; padding: 3px 0;" dir="ltr"><span style="display:inline-block; width: 80px; font-weight:bold;">${l.date}</span> | <span style="display:inline-block; width: 60px; text-align:center;">${l.time_in || '--:--'}</span> &rarr; <span style="display:inline-block; width: 60px; text-align:center;">${l.time_out || '--:--'}</span></div>`).join('');
      } else {
        logsHtml = '<span style="color:#94a3b8;">--</span>';
      }

      html += `
        <table style="border: none; margin-bottom: 15px;">
          <tr>
            <td style="border: none; text-align: ${alignStart}; font-size: 15px;"><b>${t('hr.table.nameWithRole', 'الموظف:')}</b> <span style="color: #2563eb;">${s.employee_name || s.name || '---'}</span></td>
            <td style="border: none; text-align: ${alignEnd};" dir="ltr"><b>${t('payroll.period', 'الفترة:')}</b> ${s.start_date} / ${s.end_date}</td>
          </tr>
        </table>
        <table>
          <tr>
            <th>${t('payroll.totalHours', 'إجمالي الساعات')}</th>
            <th>${t('payroll.hourlyRate', 'سعر الساعة')}</th>
            <th>${t('payroll.grossSalary', 'الراتب الإجمالي')}</th>
            <th>${t('payroll.deductions', 'الخصومات / السلف')}</th>
            <th>${t('payroll.netSalary', 'الصافي للدفع')}</th>
          </tr>
          <tr>
            <td><b>${Number(s.total_hours).toFixed(2)}</b></td>
            <td dir="ltr">${Number(s.hourly_rate).toFixed(2)} ${curr}</td>
            <td dir="ltr">${gross.toFixed(2)} ${curr}</td>
            <td dir="ltr" style="color: #ef4444; font-weight: bold;">- ${Number(s.total_advances).toFixed(2)} ${curr}</td>
            <td dir="ltr" class="net-salary" style="font-size: 15px;">${Number(s.net_salary).toFixed(2)} ${curr}</td>
          </tr>
        </table>

        <div style="margin-top: 15px; font-weight: bold; font-size: 12px;">${t('hr.attendanceLog', 'تفاصيل الحضور والانصراف اليومي (دخول - خروج):')}</div>
        <div style="border: 1px solid #94a3b8; padding: 10px; margin-top: 5px; background-color: #f8fafc; font-family: monospace;">
          ${logsHtml}
        </div>

        <table style="border: none; margin-top: 50px;">
          <tr>
            <td style="border: none; border-top: 2px solid #000; width: 40%; font-weight: bold;">${t('zreport.manager_sig', 'توقيع الإدارة / الختم')}</td>
            <td style="border: none; width: 20%;"></td>
            <td style="border: none; border-top: 2px solid #000; width: 40%; font-weight: bold;">${t('payroll.accountantSig', 'توقيع المستلم')}</td>
          </tr>
        </table>
      `;
    } 
    else {
      // الكود الخاص بالطباعة الجماعية
      html += `
        <table>
          <thead>
            <tr>
              <th style="width: 15%;">${t('hr.table.nameWithRole', 'الموظف')}</th>
              <th style="width: 12%;">${t('payroll.period', 'الفترة')}</th>
              <th style="width: 8%;">${t('payroll.totalHours', 'الساعات')}</th>
              <th style="width: 10%;">${t('payroll.grossSalary', 'الإجمالي')}</th>
              <th style="width: 10%;">${t('payroll.deductions', 'الخصومات')}</th>
              <th style="width: 12%;">${t('payroll.netSalary', 'الصافي')}</th>
              <th style="width: 33%; text-align: left;">${t('hr.attendanceLog', "Today's Attendance Log")}</th> 
            </tr>
          </thead>
          <tbody>
      `;
      
      salariesList.forEach((s) => {
        const gross = Number(s.total_hours || 0) * Number(s.hourly_rate || 0);
        let logsText = '';
        if (s.daily_logs && s.daily_logs.length > 0) {
          logsText = s.daily_logs.map(l => {
              const timeIn = l.time_in ? l.time_in.padEnd(8, '&nbsp;') : '--:--&nbsp;&nbsp;&nbsp;';
              const timeOut = l.time_out ? l.time_out.padEnd(8, '&nbsp;') : '--:--&nbsp;&nbsp;&nbsp;';
              return `<div dir="ltr" style="margin-bottom:2px;">[<b>${l.date}</b>]&nbsp;${timeIn}&rarr;&nbsp;${timeOut}</div>`;
          }).join('');
        } else {
          logsText = `<div dir="ltr" style="color: #94a3b8; text-align: center;">--</div>`;
        }

        html += `
          <tr>
            <td style="text-align: ${alignStart}; font-weight: bold; font-size: 12px;">${s.employee_name || s.name || '---'}</td>
            <td dir="ltr" style="font-size: 10px;">${s.start_date}<br/>to<br/>${s.end_date}</td>
            <td style="font-weight: bold;">${Number(s.total_hours).toFixed(2)}</td>
            <td dir="ltr">${gross.toFixed(2)} ${curr}</td>
            <td dir="ltr" style="color: #ef4444; font-weight: bold;">- ${Number(s.total_advances).toFixed(2)} ${curr}</td>
            <td dir="ltr" class="net-salary" style="font-size: 12px;">${Number(s.net_salary).toFixed(2)} ${curr}</td>
            <td style="padding: 4px;">
              <div class="log-box">${logsText}</div>
            </td>
          </tr>
        `;
      });

      html += `
          </tbody>
        </table>
        <table style="border: none; margin-top: 40px;" width="100%">
          <tr>
            <td style="border: none; text-align: ${alignStart}; font-weight: bold; font-size: 13px;">
              ${t('zreport.manager_sig', 'توقيع الإدارة / الختم')}: ..............................................
            </td>
            <td style="border: none; text-align: ${alignEnd}; font-weight: bold; font-size: 13px;">
              ${totalEmployeesText}: ${salariesList.length}
            </td>
          </tr>
        </table>
      `;
    }

    html += `<div class="footer-note">POWERED BY GHERBI.AI</div></body></html>`;

    const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    
    const prefix = isSingle 
      ? (isRTL ? 'كشف_راتب' : 'Payslip') 
      : (isRTL ? 'سجل_الرواتب_المفصل' : 'Detailed_Payroll_Report');
      
    link.download = `${prefix}_${new Date().toISOString().split('T')[0]}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast('success', t('common.success', 'تم استخراج التقرير بنجاح!'));
  };

  const handleExportSingleToWord = () => {
    if (!payrollResult) return;
    const employeeData = employees.find(e => e.id === Number(selectedEmployee));
    const singleData = [{
       employee_name: employeeData?.name || '',
       start_date: startDate,
       end_date: endDate,
       total_hours: payrollResult.totalHours,
       hourly_rate: hourlyRate,
       total_advances: payrollResult.totalAdvances,
       gross_salary: payrollResult.grossSalary,
       net_salary: payrollResult.netSalary,
       daily_logs: payrollResult.dailyLogs || [] 
    }];
    exportSalariesToWord(singleData, true);
    setIsPrintModalOpen(false);
  };

  // 🌟 دالة طباعة كشف الراتب الحراري (80mm / A7) 🌟
  const handlePrintA7Payslip = () => {
    if (!payrollResult) return;
    
    const employeeData = employees.find(e => e.id === Number(selectedEmployee));
    const employeeName = employeeData?.name || '';
    const curr = t('currency', 'د.ج');
    const printDate = new Date().toISOString().split('T')[0];

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
        <title>Payslip Thermal Print</title>
        <style>
          @page { margin: 0; }
          html, body { margin: 0; padding: 0; width: 72mm; background: #fff; color: #000; font-family: sans-serif; }
          .print-wrapper { width: 100%; padding: 2mm 5mm; box-sizing: border-box; }
          h2 { text-align: center; font-size: 18px; margin: 0 0 5px 0; font-weight: 900; }
          .subtitle { text-align: center; font-size: 13px; margin-bottom: 12px; border-bottom: 2px dashed #000; padding-bottom: 6px; font-weight: bold;}
          .info-row { display: flex; justify-content: space-between; font-size: 12px; font-weight: bold; margin-bottom: 4px; border-bottom: 1px dashed #ccc; padding-bottom: 2px; }
          table { width: 100%; border-collapse: collapse; font-size: 12px; font-weight: bold; margin-bottom: 10px; margin-top: 10px; }
          td { padding: 4px 0; border-bottom: 1px dashed #eee; text-align: ${isRTL ? 'right' : 'left'}; }
          .amount-box { display: flex; justify-content: space-between; align-items: center; border-top: 2px solid #000; border-bottom: 2px solid #000; padding: 8px 0; margin-top: 15px; background: #f9f9f9; }
          .amount-box .box-title { font-size: 15px; font-weight: bold; padding: 0 5px; }
          .amount-box .box-value { font-size: 18px; font-weight: 900; padding: 0 5px; }
          .signatures { display: flex; justify-content: space-between; margin-top: 25px; font-size: 11px; font-weight: bold; }
          .footer-brand { text-align: center; margin-top: 20px; font-size: 11px; font-weight: 900; border-top: 1px dashed #000; padding-top: 8px; }
        </style>
      </head>
      <body>
        <div class="print-wrapper">
          <h2>${currentStoreName}</h2>
          <div class="subtitle">${t('print.payslipTitle', 'كشف راتب موظف')}</div>
          
          <div style="text-align: center; font-size: 10px; margin-bottom: 10px; color: #555;">
             ${t('zreport.date', 'التاريخ')}: ${printDate}
          </div>

          <div class="info-row">
            <span>${t('hr.table.nameWithRole', 'الموظف')}:</span>
            <span>${employeeName}</span>
          </div>
          <div class="info-row">
            <span>${t('payroll.period', 'الفترة')}:</span>
            <span dir="ltr">${startDate.substring(5)} / ${endDate.substring(5)}</span>
          </div>

          <table>
            <tr>
              <td>${t('payroll.totalHours', 'الساعات المنجزة')}:</td>
              <td style="text-align: ${isRTL ? 'left' : 'right'};">${formatHours(payrollResult.totalHours)}</td>
            </tr>
            <tr>
              <td>${t('payroll.hourlyRate', 'سعر الساعة')}:</td>
              <td style="text-align: ${isRTL ? 'left' : 'right'};" dir="ltr">${hourlyRate} ${curr}</td>
            </tr>
            <tr>
              <td>${t('payroll.grossSalary', 'الراتب الإجمالي')}:</td>
              <td style="text-align: ${isRTL ? 'left' : 'right'};" dir="ltr">${formatMoney(payrollResult.grossSalary)} ${curr}</td>
            </tr>
            <tr>
              <td style="color: #ef4444;">${t('payroll.deductions', 'الخصومات (السلف)')}:</td>
              <td style="text-align: ${isRTL ? 'left' : 'right'}; color: #ef4444;" dir="ltr">-${formatMoney(payrollResult.totalAdvances)} ${curr}</td>
            </tr>
          </table>

          <div class="amount-box">
            <span class="box-title">${t('payroll.netSalary', 'الصافي للدفع')}:</span>
            <span class="box-value" dir="ltr">${formatMoney(payrollResult.netSalary)} ${curr}</span>
          </div>

          <div class="signatures">
            <div style="text-align: ${isRTL ? 'right' : 'left'}">${t('print.employeeSignature', 'توقيع المستلم')}<br><br>................</div>
            <div style="text-align: ${isRTL ? 'left' : 'right'}">${t('zreport.manager_sig', 'الإدارة')}<br><br>................</div>
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

  const formatMoney = (val) => Number(val || 0).toLocaleString(i18n.language, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const formatHours = (val) => Number(val || 0).toFixed(2);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans flex flex-col gap-6 text-start relative">
      
      {toast && (
        <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[9999] px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 ${
          toast.type === 'success' ? 'bg-emerald-600 text-white' : toast.type === 'warning' ? 'bg-amber-600 text-white' : 'bg-red-600 text-white'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span className="font-bold">{toast.message}</span>
        </div>
      )}

      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3 mb-2"><Banknote className="text-emerald-500" />{t('payroll.title', 'رواتب العمال')}</h1>
          <p className="text-sm text-slate-500">{t('payroll.subtitle', 'إدارة وحساب الرواتب والخصومات')}</p>
        </div>
      </div>

      <div className="flex bg-slate-900 border border-slate-800 rounded-lg w-fit p-1 overflow-x-auto">
        <button onClick={() => setActiveTab('calculator')} className={`flex items-center gap-2 px-6 py-2.5 rounded-md font-medium transition-colors whitespace-nowrap ${activeTab === 'calculator' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}><Calculator size={18} /> {t('payroll.tabs.calculator', 'حاسبة الراتب')}</button>
        <button onClick={() => setActiveTab('advances')} className={`flex items-center gap-2 px-6 py-2.5 rounded-md font-medium transition-colors whitespace-nowrap ${activeTab === 'advances' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}><MinusCircle size={18} /> {t('payroll.tabs.advances', 'سجل السلفيات')}</button>
        <button onClick={() => setActiveTab('salaries')} className={`flex items-center gap-2 px-6 py-2.5 rounded-md font-medium transition-colors whitespace-nowrap ${activeTab === 'salaries' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}><FileText size={18} /> {t('payroll.tabs.salaries', 'أرشيف الرواتب')}</button>
      </div>

      {activeTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg h-fit">
            <h3 className="text-lg font-bold text-white mb-6 border-b border-slate-800 pb-4">{t('payroll.tabs.calculator', 'حاسبة الراتب')}</h3>
            <form onSubmit={handleCalculate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">{t('payroll.selectEmployee', 'اختر الموظف')}</label>
                <select required value={selectedEmployee} onChange={e => setSelectedEmployee(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-blue-500">
                  <option value="" disabled>-- {t('common.search', 'بحث...')} --</option>
                  {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">{t('agenda.modal.dateLabel', 'التاريخ')} (من)</label>
                  <input type="date" required value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">{t('agenda.modal.dateLabel', 'التاريخ')} (إلى)</label>
                  <input type="date" required value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">{t('payroll.hourlyRate', 'سعر الساعة')} ({t('currency', 'د.ج')})</label>
                <input type="number" required min="1" value={hourlyRate} onChange={e => setHourlyRate(e.target.value)} placeholder="e.g. 150" className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-blue-500" />
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg mt-4 transition-colors flex items-center justify-center gap-2">
                <Calculator size={18}/> {t('payroll.calcSalary', 'حساب الراتب')}
              </button>
            </form>
          </div>

          <div className="lg:col-span-2">
            {!payrollResult ? (
              <div className="h-full bg-slate-900/50 border border-slate-800 border-dashed rounded-xl flex flex-col items-center justify-center text-slate-500 p-12 min-h-[400px]">
                <Calculator size={64} className="mb-4 opacity-20" />
                <p>{t('payroll.emptyStateDesc', 'أدخل بيانات الموظف واضغط على "حساب الراتب" لظهور النتيجة')}</p>
              </div>
            ) : (
              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95">
                <div className="bg-slate-800 p-6 flex justify-between items-center border-b border-slate-700">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{employees.find(e => e.id === Number(selectedEmployee))?.name}</h2>
                    <p className="text-slate-400 text-sm mt-1">{t('payroll.period', 'الفترة')} <bdi dir="ltr">{startDate}</bdi> - <bdi dir="ltr">{endDate}</bdi></p>
                  </div>
                  {/* 🔴 تم تغيير زر الوورد ليصبح زر خيارات الطباعة العريض */}
                  <button onClick={() => setIsPrintModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-lg" title={t('inventory.printOptions', 'خيارات الطباعة')}>
                    <Printer size={18} /> {t('inventory.printOptions', 'خيارات الطباعة')}
                  </button>
                </div>
                
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-950 rounded-xl p-5 border border-slate-800 flex flex-col items-center text-center">
                    <Clock className="text-blue-400 mb-3" size={28} />
                    <p className="text-slate-400 text-sm mb-1">{t('payroll.totalHours', 'إجمالي الساعات')}</p>
                    <p className="text-3xl font-bold text-white"><bdi>{formatHours(payrollResult.totalHours)}</bdi></p>
                  </div>
                  <div className="bg-slate-950 rounded-xl p-5 border border-slate-800 flex flex-col items-center text-center">
                    <Banknote className="text-emerald-400 mb-3" size={28} />
                    <p className="text-slate-400 text-sm mb-1">{t('payroll.grossSalary', 'الراتب الإجمالي')}</p>
                    <p className="text-3xl font-bold text-emerald-400"><bdi>{formatMoney(payrollResult.grossSalary)}</bdi> <span className="text-sm">{t('currency', 'د.ج')}</span></p>
                  </div>
                  <div className="bg-red-950/30 rounded-xl p-5 border border-red-900/50 flex flex-col items-center text-center">
                    <MinusCircle className="text-red-400 mb-3" size={28} />
                    <p className="text-red-400/80 text-sm mb-1">{t('payroll.deductions', 'الخصومات / السلف')}</p>
                    <p className="text-3xl font-bold text-red-400"><bdi dir="ltr">-{formatMoney(payrollResult.totalAdvances)}</bdi> <span className="text-sm">{t('currency', 'د.ج')}</span></p>
                  </div>
                </div>

                <div className="bg-slate-950 p-6 border-t border-slate-800 flex justify-between items-center">
                  <div>
                    <p className="text-slate-400 mb-1">{t('payroll.netSalary', 'الصافي للدفع')}</p>
                    <p className={`text-4xl font-black ${payrollResult.netSalary >= 0 ? 'text-white' : 'text-red-500'}`}><bdi>{formatMoney(payrollResult.netSalary)}</bdi> <span className="text-xl text-slate-500">{t('currency', 'د.ج')}</span></p>
                  </div>
                  <button onClick={handlePaySalaryClick} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-xl flex items-center gap-2 transition-colors shadow-lg">
                    <CheckCircle size={20} /> {t('payroll.payAndSave', 'دفع الراتب وحفظ')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'advances' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
          <div className="p-4 border-b border-slate-800 bg-slate-950/30 flex justify-between items-center">
            <h3 className="font-bold text-white flex items-center gap-2"><MinusCircle size={18} className="text-red-400" /> {t('payroll.tabs.advances', 'سجل السلفيات')}</h3>
            <button onClick={() => { setEditingAdvance(null); setIsAdvanceModalOpen(true); }} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-700 transition-colors">
              <Plus size={18} /><span>{t('payroll.addAdvance', 'إضافة سلفة')}</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-start border-collapse" dir={i18n.dir()}>
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80">
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('payroll.date', 'التاريخ')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('hr.table.nameWithRole', 'الموظف')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('payroll.amount', 'المبلغ')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('payroll.fundSource', 'المصدر (الصندوق)')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('suppliers.table.status', 'الحالة')}</th>
                  {isSuperAdmin && <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('suppliers.table.actions', 'الإجراءات')}</th>}
                </tr>
              </thead>
              <tbody>
                {advances.map(adv => (
                  <tr key={adv.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                    <td className="px-6 py-4 text-sm text-slate-400 whitespace-nowrap"><bdi dir="ltr">{adv.date}</bdi></td>
                    <td className="px-6 py-4 font-medium text-white">{adv.employee_name} <span className="block text-xs text-slate-500 mt-1">{adv.note}</span></td>
                    <td className="px-6 py-4 font-bold text-red-400"><bdi>{formatMoney(adv.amount)}</bdi> {t('currency', 'د.ج')}</td>
                    <td className="px-6 py-4 text-center"><span className="px-2 py-1 rounded bg-slate-800 text-slate-300 text-xs border border-slate-700">{adv.caisse_source === 'admin' ? t('payroll.caisseAdmin', 'المدير') : adv.caisse_source}</span></td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${adv.status === 'pending' ? 'bg-amber-950 text-amber-400 border-amber-900' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                        {adv.status === 'pending' ? t('payroll.statusPending', 'غير مسددة') : t('payroll.statusPaid', 'تم الخصم')}
                      </span>
                    </td>
                    {isSuperAdmin && (
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => openEditAdvanceModal(adv)} className="p-2 text-blue-400 hover:bg-blue-900/50 rounded-lg transition-colors"><Edit size={18} /></button>
                          <button onClick={() => setAdvanceToDelete(adv.id)} className="p-2 text-red-400 hover:bg-red-900/50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
                {advances.length === 0 && <tr><td colSpan={isSuperAdmin ? "6" : "5"} className="px-6 py-12 text-center text-slate-500">{t('common.noResults', 'لا توجد نتائج')}</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'salaries' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
          <div className="p-4 border-b border-slate-800 bg-slate-950/30 flex justify-between items-center">
            <h3 className="font-bold text-white flex items-center gap-2"><FileText size={18} className="text-blue-400" /> {t('payroll.tabs.salaries', 'أرشيف الرواتب')}</h3>
            
            <button onClick={() => exportSalariesToWord(salaries)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              <Download size={18} /> {t('payroll.exportReportWord', 'استخراج سجل الرواتب (Word)')}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-start border-collapse" dir={i18n.dir()}>
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80">
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('hr.table.nameWithRole', 'الموظف')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('payroll.period', 'الفترة')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('payroll.totalHours', 'الساعات')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('payroll.grossSalary', 'الإجمالي')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('payroll.deductions', 'الخصومات')}</th>
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('payroll.netSalary', 'الصافي')}</th>
                </tr>
              </thead>
              <tbody>
                {salaries.map((s, idx) => {
                  const gross = Number(s.total_hours || 0) * Number(s.hourly_rate || 0);
                  
                  return (
                    <tr key={idx} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                      <td className="px-6 py-4 text-start">
                        <span className="font-medium text-white">{s.employee_name}</span>
                        <div className="text-xs text-slate-500 mt-1">{t('payroll.date', 'التاريخ')}: <bdi dir="ltr">{s.payment_date}</bdi></div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400 text-start">
                        <bdi dir="ltr">{s.start_date}</bdi><br/><bdi dir="ltr">{s.end_date}</bdi>
                      </td>
                      <td className="px-6 py-4 text-center font-bold text-blue-400"><bdi>{formatHours(s.total_hours)}</bdi></td>
                      <td className="px-6 py-4 text-center font-medium text-slate-300"><bdi>{formatMoney(gross)}</bdi></td>
                      <td className="px-6 py-4 text-center font-bold text-red-400"><bdi dir="ltr">-{formatMoney(s.total_advances)}</bdi></td>
                      <td className="px-6 py-4 text-start font-bold">
                        <span className={s.net_salary >= 0 ? 'text-emerald-400' : 'text-red-400'}><bdi>{formatMoney(s.net_salary)}</bdi> {t('currency', 'د.ج')}</span>
                      </td>
                    </tr>
                  )
                })}
                {salaries.length === 0 && <tr><td colSpan="6" className="px-6 py-12 text-center text-slate-500">{t('common.noResults', 'لا توجد نتائج')}</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal isOpen={isAdvanceModalOpen} onClose={() => { setIsAdvanceModalOpen(false); setEditingAdvance(null); }} title={editingAdvance ? t('payroll.editAdvance', 'تعديل السلفة') : t('payroll.newAdvance', 'تسجيل سلفة موظف')}>
        <form onSubmit={handleSaveAdvance} className="space-y-4 text-start" dir={isRTL ? "rtl" : "ltr"}>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">{t('payroll.selectEmployee', 'اختر الموظف')}</label>
            <select required disabled={!!editingAdvance} value={advanceData.employeeId} onChange={e => setAdvanceData({...advanceData, employeeId: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500">
              <option value="" disabled>-- {t('common.search', 'بحث...')} --</option>
              {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">{t('payroll.amount', 'المبلغ')} ({t('currency', 'د.ج')})</label>
            <input type="number" required min="1" value={advanceData.amount} onChange={e => setAdvanceData({...advanceData, amount: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">{t('payroll.fundSource', 'مصدر الأموال')}</label>
            <select required value={advanceData.caisseSource} onChange={e => setAdvanceData({...advanceData, caisseSource: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500">
              <option value="" disabled>-- {t('expenses.allCaisses', 'اختر الصندوق')} --</option>
              <option value="admin">{t('payroll.caisseAdmin', 'صندوق المدير (الرئيسي)')}</option>
              {employees.filter(e => e.role === 'cashier').map(emp => <option key={emp.id} value={emp.name}>{t('payroll.caisseCashier', {name: emp.name, defaultValue: `صندوق الكاشير: ${emp.name}`})}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t('payroll.date', 'التاريخ')}</label>
              <input type="date" required value={advanceData.date} onChange={e => setAdvanceData({...advanceData, date: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t('payroll.note', 'ملاحظة')} ({t('common.optional', 'اختياري')})</label>
              <input type="text" value={advanceData.note} onChange={e => setAdvanceData({...advanceData, note: e.target.value})} placeholder={t('payroll.advanceNotePlaceholder', 'سبب السلفة...')} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" />
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-3 mt-4">
            <button type="button" onClick={() => { setIsAdvanceModalOpen(false); setEditingAdvance(null); }} className="px-4 py-2 rounded-lg font-medium text-slate-300 hover:bg-slate-800 transition-colors">{t('common.cancel', 'إلغاء')}</button>
            <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">{t('payroll.saveAdvance', 'حفظ السلفة')}</button>
          </div>
        </form>
      </Modal>

      {/* 🔴 النافذة العريضة لخيارات الطباعة */}
      <Modal isOpen={isPrintModalOpen} onClose={() => setIsPrintModalOpen(false)} title={t('inventory.printOptions', 'خيارات الطباعة')}>
        <div className="p-6 flex flex-col gap-4 text-start" dir={isRTL ? 'rtl' : 'ltr'}>
          <p className="text-slate-400 mb-4 text-center">{t('inventory.printDesc', 'اختر مقاس الورق المناسب لطباعة كشف الراتب.')}</p>
          
          <button onClick={handleExportSingleToWord} className="w-full flex items-center justify-between p-4 bg-indigo-600/10 hover:bg-indigo-600 border border-indigo-500/50 hover:border-indigo-500 rounded-xl transition-all text-indigo-400 hover:text-white font-bold group">
            <div className="flex items-center gap-4">
              <Download size={24} className="text-indigo-400 group-hover:text-white" />
              <div className="text-start">
                <div className="text-lg">{t('payroll.printA4', 'تحميل كشف مفصل Word (A4)')}</div>
                <div className="text-xs font-normal opacity-80 mt-1">{t('payroll.printA4Desc', 'مستند وورد شامل يحتوي على تفاصيل الحضور اليومية لحفظه في أرشيف الشركة.')}</div>
              </div>
            </div>
            <FileText size={20} />
          </button>

          <button onClick={handlePrintA7Payslip} className="w-full flex items-center justify-between p-4 bg-emerald-600/10 hover:bg-emerald-600 border border-emerald-500/50 hover:border-emerald-500 rounded-xl transition-all text-emerald-500 hover:text-white font-bold group">
            <div className="flex items-center gap-4">
              <Printer size={24} className="text-emerald-400 group-hover:text-white" />
              <div className="text-start">
                <div className="text-lg">{t('payroll.printA7', 'وصل راتب حراري سريع (80mm)')}</div>
                <div className="text-xs font-normal opacity-80 mt-1">{t('payroll.printA7Desc', 'وصل راتب صغير وسريع للعامل يُطبع فوراً من طابعة الكاشير.')}</div>
              </div>
            </div>
            <Printer size={20} />
          </button>
        </div>
      </Modal>

      <ConfirmAlert 
        isOpen={!!confirmModalData}
        onClose={() => setConfirmModalData(null)}
        onConfirm={executePayment}
        title={t('payroll.confirmPayTitle', 'تأكيد دفع الراتب')}
        message={confirmModalData?.type === 'rollover' ? t('payroll.confirmPayMessage', 'الراتب الصافي بالسالب. سيتم ترحيل الديون المتبقية كسلفة جديدة للشهر القادم. هل تود الاستمرار؟') : t('payroll.confirmPayStandard', 'سيتم صرف مبلغ {{amount}} من الصندوق. هل تود تأكيد الدفع؟', { amount: payrollResult?.netSalary })}
        confirmText={t('payroll.confirmPayBtn', 'نعم، تأكيد الدفع')}
      />

      <ConfirmAlert 
        isOpen={!!advanceToDelete}
        onClose={() => setAdvanceToDelete(null)}
        onConfirm={executeDeleteAdvance}
        title={t('payroll.cancelAdvanceTitle', 'إلغاء السلفة')}
        message={t('payroll.cancelAdvanceMessage', 'هل أنت متأكد من إلغاء وحذف هذه السلفة؟ سيتم إرجاع المبلغ للصندوق الذي خُصمت منه.')}
        confirmText={t('payroll.cancelAdvanceBtn', 'نعم، حذف السلفة')}
        confirmColor="bg-red-600 hover:bg-red-700 text-white"
      />

    </div>
  );
}