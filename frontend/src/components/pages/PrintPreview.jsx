import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Printer, ArrowLeft, AlertCircle } from 'lucide-react';

export default function PrintPreview() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const isRTL = i18n.dir() === 'rtl';
  
  const getStoreName = () => {
    const keys = ['storeName', 'store_name', 'shopName', 'shop_name'];
    for (const key of keys) {
      const value = localStorage.getItem(key);
      if (value) return value;
    }
    return 'GHERBI.AI';
  };
  const storeNameLabel = getStoreName();

  const { data, type, supplierName } = useMemo(() => {
    const state = location.state || {};
    const extractedData = state.data || state.item || state.receipt || state.payment || state;
    
    if (!extractedData || Object.keys(extractedData).length === 0 || extractedData.amount === undefined) {
      return { data: null, type: 'receipt', supplierName: 'غير محدد' };
    }

    const resolvedType = state.type || (extractedData.amount < 0 ? 'payment' : 'receipt');
    const resolvedSupplier = state.supplierName || extractedData.supplier_name || extractedData.name || 'غير محدد';
    
    return { data: extractedData, type: resolvedType, supplierName: resolvedSupplier };
  }, [location.state]);

  if (!data) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-slate-300 gap-4" dir={isRTL ? "rtl" : "ltr"}>
        <AlertCircle size={48} className="text-red-500" />
        <h2 className="text-2xl font-bold text-white">{t('common.error', 'حدث خطأ غير متوقع.')}</h2>
        <button onClick={() => navigate(-1)} className="mt-4 bg-slate-800 text-white px-6 py-2 rounded-lg">رجوع</button>
      </div>
    );
  }

  const isPayment = type === 'payment';
  
  return (
    <div className="min-h-screen bg-slate-950 p-6 flex flex-col items-center justify-start font-sans" dir={i18n.dir()}>
      
      {/* الأزرار العلوية (تم إعطاؤها كلاس no-print للاختفاء أثناء الطباعة) */}
      <div className="w-full max-w-sm flex justify-between items-center mb-6 no-print">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors bg-slate-900 px-4 py-2 rounded-lg border border-slate-800">
          <ArrowLeft size={18} className={isRTL ? "rotate-180" : ""} /> {t('common.cancel', 'إلغاء')}
        </button>
        <button onClick={() => window.print()} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-lg">
          <Printer size={18} /> {t('receipt.print', 'طباعة الوصل')}
        </button>
      </div>

      <div className="receipt-ticket-forced mx-auto shadow-2xl" dir={isRTL ? "rtl" : "ltr"}>
        
        <div className="header-title">GHERBI.AI</div>
        <div className="header-subtitle">CODE &bull; MULTIMEDIA &bull; ALGO &bull; AI</div>
        <div className="header-title" style={{ marginTop: '1mm' }}><bdi>{storeNameLabel}</bdi></div>
        
        <div className="badge-action">
          {isPayment ? 'إضافة تسديد (دفع)' : 'إضافة فاتورة (سلعة)'}
        </div>
        
        <div className="receipt-divider"></div>

        <div className="flex flex-col w-full my-2">
          
          <div className="info-row">
            <span className="label-field">{t('receipt.date', 'التاريخ:')}</span>
            <span className="value-field" dir="ltr">
              {data.date || new Date().toISOString().split('T')[0]}
            </span>
          </div>

          <div className="info-row">
            <span className="label-field">{t('receipt.supplier', 'المورد:')}</span>
            <span className="value-field">{supplierName}</span>
          </div>

          {data.caisse_source && (
            <div className="info-row">
              <span className="label-field">{t('payroll.fundSource', 'الصندوق:')}</span>
              <span className="value-field">
                {data.caisse_source === 'admin' ? t('common.superAdmin', 'المدير العام') : data.caisse_source}
              </span>
            </div>
          )}

        </div>

        <div className="amount-box">
          <span className="box-title">{t('receipt.amount', 'المبلغ:')}</span>
          <span className="box-value" dir="ltr">
            <bdi>{Math.abs(Number(data.amount)).toLocaleString()} {t('currency', 'د.ج')}</bdi>
          </span>
        </div>

        {data.note && (
          <div className="note-box">
            <span className="note-title">{t('receipt.note', 'ملاحظة:')}</span>
            <span>{data.note}</span>
          </div>
        )}

        <div className="signatures-area">
          <span>{t('receipt.signature', 'توقيع المستلم')}</span>
          <span>{t('receipt.stamp', 'ختم المحل')}</span>
        </div>

        <div className="receipt-divider"></div>

        <div className="footer-area">
          <div className="dev-brand">DEV: GHERBI.AI</div>
          <div style={{ marginTop: '0.5mm' }}>{t('receipt.footer', 'شكراً لتعاملكم معنا')}</div>
        </div>

      </div>
    </div>
  );
}