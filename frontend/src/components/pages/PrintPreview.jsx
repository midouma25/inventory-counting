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

  // 🔴 استخدام useMemo لمعالجة البيانات فوراً ومنع ظهور شاشة الخطأ الوهمية
  const { data, type, supplierName } = useMemo(() => {
    const state = location.state || {};
    const extractedData = state.data || state.item || state.receipt || state.payment || state;
    
    // التحقق من صحة البيانات
    if (!extractedData || Object.keys(extractedData).length === 0 || extractedData.amount === undefined) {
      return { data: null, type: 'receipt', supplierName: 'غير محدد' };
    }

    const resolvedType = state.type || (extractedData.amount < 0 ? 'payment' : 'receipt');
    const resolvedSupplier = state.supplierName || extractedData.supplier_name || extractedData.name || 'غير محدد';
    
    return { data: extractedData, type: resolvedType, supplierName: resolvedSupplier };
  }, [location.state]);

  // 🔴 شاشة الخطأ الحقيقية (تظهر فقط إذا كانت البيانات فارغة فعلاً)
  if (!data) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-slate-300 gap-4" dir={isRTL ? "rtl" : "ltr"}>
        <AlertCircle size={48} className="text-red-500" />
        <h2 className="text-2xl font-bold text-white">{t('common.error', 'حدث خطأ غير متوقع.')}</h2>
        <p className="text-slate-500">البيانات مفقودة أو تم الوصول لهذه الصفحة بطريقة خاطئة.</p>
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

      {/* 🔴 الحاوية القابلة للطباعة (تعتمد على كلاسات الطابعة الحرارية القياسية) */}
      <div className="printable-area receipt-ticket mx-auto shadow-2xl" dir={isRTL ? "rtl" : "ltr"}>
        
        {/* الترويسة */}
        <div className="header-title">GHERBI.AI</div>
        <div className="header-subtitle"> CODE &bull; MULTIMEDIA &bull; ALGO &bull; AI</div>
        <div className="header-title">{storeNameLabel}</div>
        
        <div className="badge-action">
          {isPayment ? t('suppliers.details.addPayment', 'إضافة تسديد (دفع)') : t('suppliers.details.addReceipt', 'إضافة فاتورة (سلعة)')}
        </div>
        
        <div className="receipt-divider"></div>

        {/* التفاصيل (موضوعة في جدول لمنع الانقسام والقص) */}
        <table className="info-table">
          <tbody>
            <tr>
              <td className="label">{t('receipt.date', 'التاريخ:')}</td>
              <td className="value" dir="ltr" style={{ textAlign: isRTL ? 'right' : 'left' }}>
                {data.date || new Date().toISOString().split('T')[0]}
              </td>
            </tr>
            <tr>
              <td className="label">{t('receipt.supplier', 'المورد:')}</td>
              <td className="value">{supplierName}</td>
            </tr>
            {data.caisse_source && (
              <tr>
                <td className="label">{t('payroll.fundSource', 'الصندوق:')}</td>
                <td className="value">
                  {data.caisse_source === 'admin' ? t('common.superAdmin', 'المدير العام') : data.caisse_source}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* المبلغ المالي */}
        <div className="amount-box">
          <span className="box-title">{t('receipt.amount', 'المبلغ:')}</span>
          <span className="box-value" dir="ltr">
            {Math.abs(Number(data.amount)).toLocaleString()} {t('currency', 'د.ج')}
          </span>
        </div>

        {/* الملاحظة (إن وجدت) */}
        {data.note && (
          <div className="note-box">
            <span className="note-title">{t('receipt.note', 'البيان:')}</span>
            <span>{data.note}</span>
          </div>
        )}

        {/* التوقيع والختم متوازيان أسفل الإيصال */}
        <div className="signatures-area">
          <span>{t('receipt.signature', 'توقيع المستلم')}</span>
          <span>{t('receipt.stamp', 'توقيع الإدارة')}</span>
        </div>

        <div className="receipt-divider"></div>
        
        {/* تذييل الفاتورة */}
        <div className="footer-area">
          <div className="dev-brand">DEV: GHERBI.AI</div>
          <div>{t('receipt.footer', 'شكراً لتعاملكم معنا')}</div>
        </div>

      </div>
    </div>
  );
}