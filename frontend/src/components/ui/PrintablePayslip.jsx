import React from 'react';
import { useTranslation } from 'react-i18next';

export default function PrintablePayslip({ data }) {
  const { t, i18n } = useTranslation();
  if (!data) return null;

  // استخراج بيانات الراتب من الـ data
  const { employeeName, period, date, hours, rate, grossSalary, deductions, netSalary } = data;

  return (
    // مقاس A4 قياسي (عرض 210mm وطول 297mm)
    <div className="w-[210mm] min-h-[297mm] mx-auto bg-white text-black p-12 font-sans text-sm shadow-2xl border border-gray-300 print:shadow-none print:border-none print:m-0 print:p-0" dir={i18n.dir()}>
      
      {/* الترويسة العليا */}
      <div className="flex justify-between items-start border-b-4 border-black pb-6 mb-8">
        <div>
          <h1 className="text-4xl font-extrabold tracking-widest text-black">GHERBI.AI</h1>
          <p className="text-[11px] mt-2 tracking-widest font-bold text-gray-700">CODE • MULTIMEDIA • ALGO TRADING • AI SOLUTIONS</p>
        </div>
        <div className="text-end text-sm font-bold space-y-1">
          <p>{t('print.date', 'التاريخ')}: {date}</p>
          <p>{t('print.period', 'فترة العمل')}: {period}</p>
        </div>
      </div>

      {/* العنوان */}
      <h2 className="text-3xl font-bold text-center mb-8 uppercase border-2 border-black inline-block px-8 py-2 mx-auto flex w-max">
        {t('print.payslipTitle', 'كشف راتب')}
      </h2>

      {/* اسم الموظف */}
      <div className="mb-8 text-lg">
        <span className="font-bold">{t('print.employeeName', 'اسم الموظف')}:</span> 
        <span className="font-bold border-b-2 border-black pb-1 px-4 ms-2">{employeeName}</span>
      </div>

      {/* جدول الحسابات */}
      <table className="w-full mb-8 border-collapse border-2 border-black text-base">
        <thead>
          <tr className="bg-gray-100">
            <th className="border-2 border-black p-3 text-start">{t('print.description', 'البيان / ملاحظة')}</th>
            <th className="border-2 border-black p-3 text-center">{t('print.hours', 'الساعات')}</th>
            <th className="border-2 border-black p-3 text-center">{t('print.rate', 'الأجر / ساعة')}</th>
            <th className="border-2 border-black p-3 text-end">{t('print.amount', 'المبلغ الإجمالي')}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-2 border-black p-3 font-bold">{t('print.grossSalary', 'الراتب الأساسي')}</td>
            <td className="border-2 border-black p-3 text-center">{hours}</td>
            <td className="border-2 border-black p-3 text-center">{rate} {t('currency', 'د.ج')}</td>
            <td className="border-2 border-black p-3 text-end font-bold">{grossSalary} {t('currency', 'د.ج')}</td>
          </tr>
          <tr>
            <td className="border-2 border-black p-3 font-bold">{t('print.deductions', 'الخصومات (سلفيات)')}</td>
            <td className="border-2 border-black p-3 text-center">-</td>
            <td className="border-2 border-black p-3 text-center">-</td>
            <td className="border-2 border-black p-3 text-end font-bold">{deductions > 0 ? `-${deductions}` : '0'} {t('currency', 'د.ج')}</td>
          </tr>
        </tbody>
      </table>

      {/* الصافي للدفع */}
      <div className="flex justify-end mb-16">
        <div className="border-4 border-black p-4 w-1/2 flex justify-between items-center text-xl bg-gray-50">
          <span className="font-bold">{t('print.netSalary', 'الصافي للدفع')}:</span>
          <span className="font-extrabold">{netSalary} {t('currency', 'د.ج')}</span>
        </div>
      </div>

      {/* التوقيعات */}
      <div className="flex justify-between items-end mt-20 px-10">
        <div className="text-center">
          <p className="font-bold mb-12 text-lg">{t('print.employeeSignature', 'توقيع الموظف')}</p>
          <p>_______________________</p>
        </div>
        <div className="text-center">
          <p className="font-bold mb-10 text-lg">{t('print.managerSignature', 'توقيع الإدارة')}</p>
          <p className="text-sm font-bold uppercase mb-2">Gherbi Mohamed Cherif</p>
          <p>_______________________</p>
        </div>
      </div>
      
    </div>
  );
}