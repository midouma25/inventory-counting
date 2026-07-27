import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Printer, Download, ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PrintableTicket from '../ui/PrintableTicket';
import PrintablePayslip from '../ui/PrintablePayslip'; // استيراد كشف الراتب

export default function PrintPreview() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const isRTL = i18n.dir() === 'rtl';

  const printData = location.state;

  useEffect(() => {
    if (!printData) {
      navigate(-1);
    }
  }, [printData, navigate]);

  if (!printData) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 print:bg-white flex flex-col items-center py-10 print:py-0">
      
      {/* شريط الأزرار والتحكم */}
      <div className="w-full max-w-3xl flex justify-between items-center mb-10 print:hidden bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-lg">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors"
        >
          {isRTL ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
          <span className="font-bold">{t('common.back', 'رجوع')}</span>
        </button>
        
        <div className="flex gap-3">
          <button 
            onClick={handlePrint} 
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold transition-colors shadow-md"
          >
            <Printer size={20} />
            <span>{t('print.printBtn', 'طباعة')}</span>
          </button>
          <button 
            onClick={handlePrint} 
            className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg font-bold transition-colors border border-slate-600 shadow-md"
          >
            <Download size={20} />
            <span>{t('print.savePdfBtn', 'تحميل PDF')}</span>
          </button>
        </div>
      </div>

      {/* منطقة المعاينة الذكية: تعرض A4 للرواتب، والتذكرة الحرارية للموردين */}
      <div className="w-full flex justify-center overflow-x-auto pb-10 print:pb-0">
        {printData.type === 'payslip' ? (
          <PrintablePayslip data={printData} />
        ) : (
          <PrintableTicket data={printData} />
        )}
      </div>

    </div>
  );
}