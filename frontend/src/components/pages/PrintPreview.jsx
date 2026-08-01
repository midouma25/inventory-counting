import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Printer, ArrowLeft, AlertCircle } from 'lucide-react';

export default function PrintPreview() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [type, setType] = useState('receipt');
  const [supplierName, setSupplierName] = useState('غير محدد');

  const isRTL = i18n.dir() === 'rtl';
  const getStoreName = () => {
    const keys = ['storeName', 'store_name', 'shopName', 'shop_name'];

    for (const key of keys) {
      const value = localStorage.getItem(key);
      if (value) return value;
    }

    for (const key of ['settings', 'appSettings', 'app_settings']) {
      try {
        const settings = JSON.parse(localStorage.getItem(key) || '{}');
        for (const nameKey of keys) {
          if (settings[nameKey]) return settings[nameKey];
        }
      } catch {
        // Ignore invalid local storage values.
      }
    }

    return 'GHERBI.AI';
  };
  const storeNameLabel = getStoreName();

  useEffect(() => {
    // 🔴 البحث التلقائي عن البيانات أياً كان اسمها (data, item, receipt...)
    const state = location.state || {};
    const extractedData = state.data || state.item || state.receipt || state.payment || state;
    
    // إذا لم تكن هناك بيانات صالحة
    if (!extractedData || Object.keys(extractedData).length === 0) {
      setData(null);
      return;
    }

    setData(extractedData);
    setType(state.type || (extractedData.amount < 0 ? 'payment' : 'receipt'));
    setSupplierName(state.supplierName || extractedData.supplier_name || extractedData.name || 'غير محدد');
  }, [location]);

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-300 gap-4" dir={isRTL ? "rtl" : "ltr"}>
        <AlertCircle size={48} className="text-red-500" />
        <h2 className="text-2xl font-bold text-white">{t('common.error', 'حدث خطأ غير متوقع.')}</h2>
        <p className="text-slate-500">لم يتم العثور على بيانات الوصل لطباعتها.</p>
        <button onClick={() => navigate(-1)} className="mt-4 bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 rounded-lg transition-colors">
          {t('common.cancel', 'رجوع')}
        </button>
      </div>
    );
  }

  const isPayment = type === 'payment';

  return (
    <div className="min-h-screen bg-slate-950 p-6 flex flex-col items-center justify-start font-sans" dir={i18n.dir()}>
      
      {/* الأزرار العلوية (لن تظهر في الطباعة) */}
      <div className="w-full max-w-sm flex justify-between items-center mb-6 no-print">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors bg-slate-900 px-4 py-2 rounded-lg border border-slate-800">
          <ArrowLeft size={18} className={isRTL ? "rotate-180" : ""} /> {t('common.cancel', 'رجوع')}
        </button>
        <button onClick={() => window.print()} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-lg">
          <Printer size={18} /> {t('receipt.print', 'طباعة الوصل')}
        </button>
      </div>

      {/* 🔴 ورقة A7 الفعلية (74 مم × 105 مم) */}
      <div className="printable-area print-a7 bg-white text-black mx-auto flex flex-col" dir={isRTL ? "rtl" : "ltr"}>
        
        {/* الترويسة */}
        <div className="text-center border-b-2 border-dashed border-gray-400 pb-2 mb-2">
          <h2 className="text-xl font-black mb-1 uppercase tracking-wider">{t('receipt.storeName', 'GHERBI.AI')}</h2>
          <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-2">Code • Multimedia • Algo • AI</p>
          <h2 className="text-lg font-bold border-t border-dashed border-black pt-1 mt-1">
            {storeNameLabel}
          </h2>
          <div className="inline-block border-2 border-black px-3 py-1 text-sm font-bold uppercase rounded-sm">
            {isPayment ? t('suppliers.details.addPayment', 'وصل تسديد') : t('suppliers.details.addReceipt', 'وصل استلام')}
          </div>
        </div>

        {/* تفاصيل المورد والوقت */}
        <div className="space-y-1 mb-2 text-[10px] border-b-2 border-dashed border-gray-400 pb-2 text-start">
          <div className="flex justify-between items-center">
            <span className="font-bold">{t('receipt.date', 'التاريخ:')}</span>
            <span dir="ltr">{data.date || new Date().toISOString().split('T')[0]}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold">{t('receipt.supplier', 'المورد:')}</span>
            <span className="truncate max-w-[120px]">{supplierName}</span>
          </div>
          {data.caisse_source && (
            <div className="flex justify-between items-center">
              <span className="font-bold">{t('payroll.fundSource', 'الصندوق:')}</span>
              <span>{data.caisse_source === 'admin' ? t('common.superAdmin', 'المدير') : data.caisse_source}</span>
            </div>
          )}
        </div>

        {/* المبلغ المالي */}
        <div className="text-center mb-2 bg-gray-100 p-2 rounded-md">
          <p className="text-[10px] font-bold mb-1">{t('receipt.amount', 'المبلغ')}</p>
          <h2 className="text-xl font-black tracking-tight" dir="ltr">
            {Math.abs(Number(data.amount)).toLocaleString()} {t('currency', 'DA')}
          </h2>
        </div>

        {/* الملاحظة (إن وجدت) */}
        {data.note && (
          <div className="mb-2 text-[10px] text-start bg-gray-50 p-2 rounded-md border border-gray-200">
            <span className="font-bold block mb-1">{t('receipt.note', 'البيان:')}</span>
            <p className="break-words leading-tight">{data.note}</p>
          </div>
        )}

        {/* التوقيع والختم - يدفع لأسفل الورقة */}
        <div className="mt-auto pt-2 text-center text-[9px]">
          <p className="font-bold mb-6">{t('receipt.signature', 'توقيع المستلم')}</p>
          <div className="border-t border-black pt-1 mx-4">
            <p className="font-bold">DEV: GHERBI.AI</p>
          </div>
        </div>

        {/* تذييل الورقة */}
        <div className="text-center mt-2">
          <p className="text-[8px] border-t border-dashed border-gray-400 pt-1 text-gray-500">
            {t('receipt.footer', 'شكراً لتعاملكم معنا')}
          </p>
        </div>

      </div>
    </div>
  );
}