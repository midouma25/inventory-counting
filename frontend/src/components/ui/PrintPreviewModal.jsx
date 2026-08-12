import React, { useEffect, useRef } from 'react';
import { X, Printer, Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function PrintPreviewModal({ isOpen, onClose, htmlContent, type, onConfirm }) {
  const { t } = useTranslation();
  const iframeRef = useRef(null);

  // حقن كود الـ HTML داخل الـ Iframe بمجرد فتح النافذة
  useEffect(() => {
    if (isOpen && iframeRef.current && htmlContent) {
      const doc = iframeRef.current.contentWindow.document;
      doc.open();
      doc.write(htmlContent);
      doc.close();
    }
  }, [isOpen, htmlContent]);

  if (!isOpen) return null;

  const isA4 = type === 'A4';

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/90 backdrop-blur-sm p-4">
      <div className={`bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all ${isA4 ? 'w-full max-w-4xl h-[95vh]' : 'w-full max-w-md h-[85vh]'}`}>
        
        {/* رأس النافذة */}
        <div className="flex justify-between items-center bg-slate-800 p-4 border-b border-slate-700">
          <h3 className="font-bold text-lg text-white">
            {t('common.preview', 'معاينة قبل الطباعة')} - {isA4 ? 'A4 (Word)' : '80mm (Thermal)'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors bg-slate-800 rounded-full p-1 hover:bg-slate-700">
            <X size={24} />
          </button>
        </div>

        {/* منطقة المعاينة (خلفية رمادية لتمييز الورقة البيضاء) */}
        <div className="flex-1 bg-slate-500 overflow-y-auto flex justify-center p-4 md:p-8">
            <div className={`bg-white shadow-2xl transition-all ${isA4 ? 'w-[210mm] min-h-[297mm]' : 'w-[80mm] min-h-[150mm] mx-auto'}`}>
                {/* نستخدم iframe لعزل ستايل الفاتورة عن ستايل البرنامج المظلم */}
                <iframe 
                    ref={iframeRef} 
                    className="w-full h-full border-none pointer-events-none select-none"
                    title="Print Preview"
                />
            </div>
        </div>

        {/* أزرار القرار (تأكيد أو إلغاء) */}
        <div className="p-4 border-t border-slate-800 flex justify-end gap-3 bg-slate-900">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 transition-colors"
          >
            {t('common.cancel', 'إلغاء المعاينة')}
          </button>
          <button 
            onClick={() => {
                onConfirm(); // تنفيذ دالة الطباعة النهائية
                onClose(); // إغلاق المعاينة
            }}
            className={`flex items-center gap-2 px-8 py-2.5 rounded-lg text-sm font-bold transition-colors shadow-lg ${
                isA4 ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/50' : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/50'
            }`}
          >
            {isA4 ? <Download size={18} /> : <Printer size={18} />}
            {isA4 ? t('common.confirmDownload', 'تأكيد وتحميل Word') : t('common.confirmPrint', 'تأكيد وطباعة الوصل')}
          </button>
        </div>
      </div>
    </div>
  );
}