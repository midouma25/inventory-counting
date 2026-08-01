import React, { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

const PrintablePayrollReport = forwardRef(({ data, dateRange }, ref) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  // قراءة اسم المحل (نفس المصدر المستخدم في بقية المستندات المطبوعة)
  const currentStoreName = localStorage.getItem('storeName') || 'GHERBI.AI';

  const formatMoney = (amount) => {
    return Number(amount || 0).toLocaleString(i18n.language, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const formatHours = (hours) => Number(hours || 0).toFixed(2);

  if (!data) return null;

  // 🔴 استخراج البيانات بذكاء (سواء جاءت كمصفوفة مباشرة، أو مغلفة داخل object)
  let recordsArray = [];
  if (Array.isArray(data)) {
    recordsArray = data;
  } else if (data && Array.isArray(data.data)) {
    recordsArray = data.data; // عندما نضغط زر "طباعة التقرير" الشامل
  } else if (data && Array.isArray(data.salaries)) {
    recordsArray = data.salaries;
  } else if (data) {
    recordsArray = [data]; // في حال طباعة موظف واحد
  }

  if (recordsArray.length === 0) return null;

  return (
    <div ref={ref} className="printable-area print-a4 bg-white text-black p-8 font-sans w-full max-w-[210mm] mx-auto text-start" dir={isRTL ? "rtl" : "ltr"}>
      
      <div className="text-center mb-8 border-b-2 border-black pb-4">
        <h2 className="text-2xl font-bold mb-2 uppercase tracking-wider">{t('payroll.reportTitle', 'تقرير الرواتب الشامل وحركة الحضور')}</h2>
        <div className="flex justify-between text-sm font-bold text-gray-600 mt-4 px-4">
          <span>{currentStoreName}</span>
          <span>{t('zreport.date', 'تاريخ الإصدار:')} <bdi dir="ltr">{new Date().toLocaleDateString(i18n.language)}</bdi></span>
        </div>
      </div>

      <div className="space-y-8">
        {recordsArray.map((record, index) => {
          // 🔴 توحيد أسماء المتغيرات لحل مشكلة الـ 0.00
          const empName = record.employee_name || record.name || record.employeeName || '---';
          const tHours = Number(record.total_hours || record.hours || 0);
          const hRate = Number(record.hourly_rate || record.rate || 0);
          const tAdvances = Number(record.total_advances || record.deductions || 0);
          
          // 🔴 حساب الراتب الإجمالي برمجياً لأن قاعدة البيانات لا تخزنه (ساعات * سعر الساعة)
          const gSalary = Number(record.gross_salary || record.grossSalary || (tHours * hRate));
          const nSalary = Number(record.net_salary || record.netSalary || 0);
          
          const sDate = record.start_date || dateRange?.start || record.period?.split(' - ')[0] || '';
          const eDate = record.end_date || dateRange?.end || record.period?.split(' - ')[1] || '';

          return (
            <div key={index} className="border-2 border-gray-800 rounded-lg overflow-hidden break-inside-avoid">
              
              <div className="bg-gray-100 p-3 border-b-2 border-gray-800 flex justify-between items-center">
                <h3 className="font-bold text-lg flex gap-2">
                  <span>{t('hr.table.nameWithRole', 'الموظف:')}</span> <span className="text-blue-700">{empName}</span>
                </h3>
                <div className="text-sm font-bold text-gray-700 flex gap-2">
                  {t('payroll.period', 'الفترة:')} <bdi dir="ltr">{sDate}</bdi> <span>{t('common.to', 'إلى')}</span> <bdi dir="ltr">{eDate}</bdi>
                </div>
              </div>

              <div className="grid grid-cols-4 divide-x divide-gray-300 rtl:divide-x-reverse text-center bg-white border-b-2 border-gray-800">
                <div className="p-3">
                  <p className="text-xs text-gray-500 font-bold mb-1">{t('payroll.totalHours', 'إجمالي الساعات')}</p>
                  <p className="font-bold text-lg"><bdi>{formatHours(tHours)}</bdi></p>
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-500 font-bold mb-1">{t('payroll.hourlyRate', 'سعر الساعة')}</p>
                  <p className="font-bold text-lg"><bdi>{formatMoney(hRate)}</bdi> <span className="text-xs">{t('currency')}</span></p>
                </div>
                <div className="p-3 bg-red-50">
                  <p className="text-xs text-red-700 font-bold mb-1">{t('payroll.deductions', 'الخصومات / السلف')}</p>
                  <p className="font-bold text-lg text-red-600"><bdi dir="ltr">- {formatMoney(tAdvances)}</bdi> <span className="text-xs">{t('currency')}</span></p>
                </div>
                <div className="p-3 bg-blue-50">
                  <p className="text-xs text-blue-700 font-bold mb-1">{t('payroll.grossSalary', 'الراتب الإجمالي')}</p>
                  <p className="font-bold text-lg text-blue-700"><bdi>{formatMoney(gSalary)}</bdi> <span className="text-xs">{t('currency')}</span></p>
                </div>
              </div>

              <div className="bg-black text-white p-3 flex justify-between items-center text-lg">
                <span className="font-bold">{t('payroll.netSalary', 'الصافي للدفع:')}</span>
                <span className="font-black text-2xl tracking-wider"><bdi>{formatMoney(nSalary)}</bdi> <span className="text-sm text-gray-300">{t('currency')}</span></span>
              </div>

              {record.daily_logs && record.daily_logs.length > 0 && (
                <div className="p-4 bg-gray-50 text-sm">
                  <p className="font-bold text-gray-600 mb-2 border-b border-gray-300 pb-1">{t('hr.attendanceLog', 'تفاصيل الحضور والانصراف اليومي')}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
                    {record.daily_logs.map((log, i) => (
                      <div key={i} className="flex justify-between border-b border-gray-200 py-1 border-dashed">
                         <span className="font-medium"><bdi dir="ltr">{log.date}</bdi></span>
                         <span className="font-mono"><bdi dir="ltr">{log.time_in || '--:--'} <span className="text-gray-400">→</span> {log.time_out || '--:--'}</bdi></span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-16 pt-8 border-t-2 border-black flex justify-between break-inside-avoid">
        <div className="text-center w-48">
          <p className="border-b border-black pb-1 mb-2 font-bold">{t('zreport.manager_sig', 'توقيع الإدارة / الختم')}</p>
        </div>
        <div className="text-center w-48">
          <p className="border-b border-black pb-1 mb-2 font-bold">{t('payroll.accountantSig', 'توقيع المستلم')}</p>
        </div>
      </div>

      <div className="text-center text-xs font-bold text-gray-400 font-mono mt-12 break-inside-avoid">
        {t('eod.receipt_footer', 'مزود النظام')}
        <br />POWERED BY GHERBI.AI
      </div>
    </div>
  );
});

export default PrintablePayrollReport;