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
      
      {/* 🖨️ حقن استايل حراري محلي صارم يجبر المتصفح على تدمير الخلفية وضغط الحجم فوراً عند الطباعة */}
      <style>{`
        @media print {
          /* إخفاء الأزرار وأي عناصر خارجية في تطبيق React تماماً */
          .no-print, nav, sidebar, header, footer, button { display: none !important; }
          
          /* إجبار الهيكل الرئيسي وتطبيقات React على التحول لبيئة بيضاء ضيقة بقطر 80مم */
          html, body, #root, body > div, .min-h-screen {
            background: #ffffff !important;
            color: #000000 !important;
            width: 80mm !important;
            min-width: 80mm !important;
            margin: 0 !important;
            padding: 0 !important;
            display: block !important;
            height: auto !important;
            min-height: auto !important;
          }

          @page {
            size: 80mm auto;
            margin: 0mm !important;
          }

          /* حصر أبعاد حاوية التذكرة بقوة داخل الـ 72mm الفعلية للرأس الحراري */
          .receipt-ticket-forced {
            width: 72mm !important;
            max-width: 72mm !important;
            min-width: 72mm !important;
            margin: 0 auto !important;
            padding: 4mm 3mm !important;
            box-shadow: none !important;
            background: #ffffff !important;
            color: #000000 !important;
            display: block !important;
            position: static !important;
          }
          
          /* تثبيت مقاسات نصوص الطباعة لمنع تأثرها بإعدادات المتصفح الوهمية */
          .header-title { font-size: 15px !important; font-weight: bold; text-align: center; }
          .header-subtitle { font-size: 9px !important; text-align: center; color: #333; margin-bottom: 2mm; }
          .badge-action { font-size: 12px !important; padding: 1mm 0 !important; border: 2px solid #000000; text-align: center; font-weight: bold; margin: 2mm auto; width: 85%; display: block; }
          .receipt-divider { border-top: 1px dashed #000000; margin: 3mm 0; width: 100%; }
          
          /* التنسيق البديل للجداول لمنع انفصال النقطتين التام */
          .info-row { display: flex !important; justify-content: space-between !important; width: 100% !important; font-size: 11px !important; margin-bottom: 2mm !important; }
          .info-row .label-field { font-weight: bold !important; white-space: nowrap !important; }
          .info-row .value-field { font-weight: 600 !important; text-align: ${isRTL ? 'left' : 'right'} !important; }

          .amount-box { border: 1.5px solid #000; border-radius: 4px; text-align: center; padding: 2.5mm 0; margin: 3mm 0; }
          .amount-box .box-title { font-size: 10px !important; display: block; font-weight: bold; }
          .amount-box .box-value { font-size: 18px !important; font-weight: bold; }
          
          .note-box { border: 1px solid #000; border-radius: 4px; padding: 2mm; font-size: 11px; margin: 3mm 0; text-align: start; }
          .note-box .note-title { font-weight: bold; display: block; }

          .signatures-area { display: flex !important; justify-content: space-between !important; font-size: 9px !important; font-weight: bold; margin-top: 5mm; }
          .footer-area { text-align: center !important; font-size: 9px !important; margin-top: 4mm; }
          .dev-brand { font-weight: bold !important; font-size: 10px !important; }
        }

        /* تنسيقات العرض المتناسق على الشاشة (ويب) */
        .receipt-ticket-forced {
          width: 72mm;
          background: #ffffff;
          color: #000000;
          padding: 5mm;
          box-sizing: border-box;
          border-radius: 4px;
        }
        .header-title { text-align: center; font-size: 16px; font-weight: bold; }
        .header-subtitle { text-align: center; font-size: 9px; color: #333; margin-bottom: 2mm; }
        .badge-action { border: 2px solid #000; text-align: center; font-weight: bold; padding: 1.5mm 0; margin: 2mm auto; width: 85%; display: block; border-radius: 4px; }
        .receipt-divider { border-top: 1px dashed #000; margin: 3mm 0; }
        .info-row { display: flex; justify-content: space-between; width: 100%; font-size: 11px; margin-bottom: 2mm; }
        .info-row .label-field { font-weight: bold; white-space: nowrap; }
        .info-row .value-field { font-weight: 600; text-align: ${isRTL ? 'left' : 'right'}; }
        .amount-box { border: 1.5px solid #000; border-radius: 4px; text-align: center; padding: 2.5mm 0; margin: 3mm 0; background: #f8f9fa; }
        .amount-box .box-title { font-size: 10px; display: block; font-weight: bold; }
        .amount-box .box-value { font-size: 18px; font-weight: 900; }
        .note-box { border: 1px solid #000; border-radius: 4px; padding: 2mm; font-size: 11px; margin: 3mm 0; text-align: start; }
        .note-box .note-title { font-weight: bold; display: block; margin-bottom: 1mm; border-bottom: 1px solid #eee; padding-bottom: 1mm; }
        .signatures-area { display: flex; justify-content: space-between; font-size: 10px; font-weight: bold; margin-top: 6mm; padding: 0 1mm; }
        .footer-area { text-align: center; font-size: 10px; margin-top: 5mm; }
        .dev-brand { font-weight: 900; font-size: 11px; }
      `}</style>

      {/* الأزرار العلوية (مخفية تلقائياً أثناء الطباعة) */}
      <div className="w-full max-w-sm flex justify-between items-center mb-6 no-print">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors bg-slate-900 px-4 py-2 rounded-lg border border-slate-800">
          <ArrowLeft size={18} className={isRTL ? "rotate-180" : ""} /> {t('common.cancel', 'رجوع')}
        </button>
        <button onClick={() => window.print()} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-lg">
          <Printer size={18} /> {t('receipt.print', 'طباعة الوصل')}
        </button>
      </div>

      {/* حاوية الإيصال الحراري المحمية بخصائص انكماش العرض الثابت */}
      <div className="receipt-ticket-forced mx-auto shadow-2xl" dir={isRTL ? "rtl" : "ltr"}>
        
        {/* الترويسة */}
        <div className="header-title">GHERBI.AI</div>
        <div className="header-subtitle">CODE &bull; MULTIMEDIA &bull; ALGO &bull; AI</div>
        <div className="header-title" style={{ marginTop: '1mm' }}>{storeNameLabel}</div>
        
        <div className="badge-action">
          {isPayment ? t('suppliers.details.addPayment', 'إضافة تسديد (دفع)') : t('suppliers.details.addReceipt', 'إضافة فاتورة (سلعة)')}
        </div>
        
        <div className="receipt-divider"></div>

        {/* الهيكل المرن الجديد: يقفل موضع النقطتين بالكامل ويمنع التمدد */}
<div className="flex flex-col w-full my-2">
  
  <div className="info-row">
    <span className="label-field">{t('receipt.date', 'Date')}</span>
    <span className="value-field" dir="ltr">
      {data.date || new Date().toISOString().split('T')[0]}
    </span>
  </div>

  <div className="info-row">
    <span className="label-field">{t('receipt.supplier', 'Fournisseur')}</span>
    <span className="value-field">{supplierName}</span>
  </div>

  {data.caisse_source && (
    <div className="info-row">
      <span className="label-field">{t('payroll.fundSource', 'الصندوق')}</span>
      <span className="value-field">
        {data.caisse_source === 'admin' ? t('common.superAdmin', 'المدير العام') : data.caisse_source}
      </span>
    </div>
  )}

</div>


        {/* المبلغ المالي */}
        <div className="amount-box">
          <span className="box-title">{t('receipt.amount', 'Montant :')}</span>
          <span className="box-value" dir="ltr">
            {Math.abs(Number(data.amount)).toLocaleString()} {t('currency', 'DA')}
          </span>
        </div>

        {/* الملاحظة (البيان) */}
        {data.note && (
          <div className="note-box">
            <span className="note-title">{t('receipt.note', 'Libellé :')}</span>
            <span>{data.note}</span>
          </div>
        )}

        {/* التوقيع والختم متوازيان كلياً في الأسفل */}
        <div className="signatures-area">
          <span>{t('receipt.signature', 'Signature du destinataire')}</span>
          <span>{t('receipt.stamp', 'Cachet du magasin')}</span>
        </div>

        <div className="receipt-divider"></div>

        {/* تذييل الفاتورة السفلي */}
        <div className="footer-area">
          <div className="dev-brand">DEV: GHERBI.AI</div>
          <div style={{ marginTop: '0.5mm' }}>{t('receipt.footer', 'Merci de votre confiance')}</div>
        </div>

      </div>
    </div>
  );
}
