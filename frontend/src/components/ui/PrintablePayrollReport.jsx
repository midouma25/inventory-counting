import React from 'react';
import { useTranslation } from 'react-i18next';

export default function PrintablePayrollReport({ data }) {
  const { t, i18n } = useTranslation();
  const storeName = localStorage.getItem('storeName') || 'GHERBI.AI';
  
  if (!data || !data.salaries) return null;

  return (
    <div 
      className="w-[210mm] mx-auto bg-white text-black p-10 font-sans text-sm shadow-2xl border border-gray-300 print:shadow-none print:border-none print:m-0 print:p-4" 
      dir={i18n.dir()}
    >
      
      {/* الترويسة المزدوجة - تتكيف تلقائياً مع الاتجاه RTL / LTR */}
      <div className="flex justify-between items-center border-b-4 border-black pb-6 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-widest text-black mb-1">GHERBI.AI</h1>
          <p className="text-[10px] tracking-widest font-bold text-gray-700 uppercase">
            {t('print.systemProvider', 'SYSTEM PROVIDER')}
          </p>
        </div>
        
        <div className="text-center">
          <h2 className="text-xl font-bold uppercase text-gray-700 bg-gray-200 inline-block px-4 py-1 rounded">
            {t('payroll.reportTitle', 'تقرير الرواتب الشامل وحركة الحضور')}
          </h2>
          <p className="mt-2 font-bold text-gray-600">
            {t('print.issueDate', 'تاريخ الإصدار')}: {new Date().toLocaleDateString(i18n.language)}
          </p>
        </div>

        <div className="text-end">
          <p className="text-sm text-gray-500 font-bold mb-1">{t('print.validFor', 'صالح لـ')}:</p>
          <h3 className="text-2xl font-bold text-black">{storeName}</h3>
        </div>
      </div>

      {/* حلقة التكرار لكل موظف */}
      {data.salaries.map((sal, index) => {
        const logs = sal.daily_logs || [];

        return (
          <div key={sal.id || index} className="mb-6 break-inside-avoid border-2 border-black p-3 rounded-lg">
            
            {/* ملخص الموظف */}
            <div className="flex justify-between items-center bg-gray-100 p-2 border-b-2 border-black mb-3">
              <div>
                <span className="font-bold text-base">{t('hr.table.employee', 'الموظف')}: </span>
                <span className="text-lg font-extrabold">{sal.employee_name}</span>
              </div>
              <div className="text-end">
                <p className="font-bold text-xs">
                  {t('payroll.period', 'الفترة')}: <span className="font-normal">{sal.start_date} {t('common.to', 'إلى')} {sal.end_date}</span>
                </p>
                <p className="font-bold text-xs text-emerald-700 mt-1">
                  {t('payroll.netPayable', 'الصافي للدفع')}: <span className="text-base bg-emerald-100 px-2 rounded border border-emerald-300">{sal.net_salary.toLocaleString()} {t('currency', 'DA')}</span>
                </p>
              </div>
            </div>

            {/* ملخص مالي للموظف */}
            <table className="w-full text-center border-collapse border border-gray-400 text-xs font-bold mb-3">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-400 p-1.5">{t('payroll.totalHours', 'إجمالي الساعات')}</th>
                  <th className="border border-gray-400 p-1.5">{t('payroll.hourlyRate', 'سعر الساعة')}</th>
                  <th className="border border-gray-400 p-1.5 text-red-700">{t('payroll.deductions', 'الخصومات والسلف')}</th>
                  <th className="border border-gray-400 p-1.5">{t('payroll.grossSalary', 'الراتب الأساسي')}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-400 p-1.5 text-blue-700">{sal.total_hours}</td>
                  <td className="border border-gray-400 p-1.5">{sal.hourly_rate} {t('currency', 'DA')}</td>
                  <td className="border border-gray-400 p-1.5 text-red-600">-{sal.total_advances} {t('currency', 'DA')}</td>
                  <td className="border border-gray-400 p-1.5">{sal.total_hours * sal.hourly_rate} {t('currency', 'DA')}</td>
                </tr>
              </tbody>
            </table>

            {/* سجل الحضور والانصراف (مدمج لتوفير المساحة) */}
            <div className="bg-gray-50 border border-dashed border-gray-400 p-2 rounded">
              <p className="text-[10px] font-extrabold text-gray-700 mb-1.5">
                {t('payroll.dailyAttendanceDetail', 'تفاصيل الحضور والانصراف اليومي (دخول - خروج)')}:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {logs.length > 0 ? logs.map((log, i) => (
                  <span key={i} className="text-[9px] border border-gray-300 bg-white px-1.5 py-0.5 rounded shadow-sm flex items-center gap-1">
                    <span className="font-bold text-blue-800">{log.date ? log.date.slice(-5) : ''}</span>
                    <span className="text-gray-500">|</span>
                    <span className="text-emerald-700">{log.in || '--:--'}</span>
                    <span className="text-gray-500">-</span>
                    <span className="text-orange-600">{log.out || '--:--'}</span>
                  </span>
                )) : (
                  <span className="text-[9px] text-gray-500">
                    {t('payroll.noAttendanceLogs', 'لا توجد سجلات حضور لهذه الفترة.')}
                  </span>
                )}
              </div>
            </div>

          </div>
        );
      })}

      {/* التذييل وحقوق المطور */}
      <div className="mt-12 text-center border-t-2 border-black pt-4">
        <div className="flex justify-around mb-8">
            <div>
                <p className="font-bold mb-4">{t('print.auditorSignature', 'توقيع المحاسب / المراجع')}</p>
                <p>_______________________</p>
            </div>
            <div>
                <p className="font-bold mb-4">{t('print.managerSignature', 'توقيع مدير المؤسسة / الختم')}</p>
                <p>_______________________</p>
            </div>
        </div>
        
        <p className="text-[10px] font-bold mt-8 uppercase text-gray-500 tracking-widest">
          Software Developed & Managed By: Gherbi Mohamed Cherif (GHERBI.AI)
        </p>
      </div>

    </div>
  );
}