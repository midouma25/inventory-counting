import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Printer, ArrowLeft, ArrowRight, AlertCircle, Download } from 'lucide-react';
import html2canvas from 'html2canvas'; 
import { jsPDF } from 'jspdf';

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
  const currentStoreName = getStoreName();

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
        <h2 className="text-2xl font-bold text-white">{t('common.error', i18n.language === 'ar' ? 'حدث خطأ غير متوقع.' : i18n.language === 'fr' ? 'Erreur inattendue.' : 'Unexpected error.')}</h2>
        <button onClick={() => navigate(-1)} className="mt-4 bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 rounded-lg transition-colors">
          {t('common.back', i18n.language === 'ar' ? 'رجوع' : i18n.language === 'fr' ? 'Retour' : 'Back')}
        </button>
      </div>
    );
  }

  const isPayment = type === 'payment';
  
  // ------------------------------------------------------------------
  // دالة الطباعة المباشرة
  // ------------------------------------------------------------------
  const handlePrint = () => {
    const printElement = document.getElementById('printable-receipt');
    if (!printElement) return;

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
        <title>Print Receipt</title>
        <style>
          @page { margin: 0; }
          html, body { 
            margin: 0; 
            padding: 0;
            width: 72mm; 
            background: #fff; 
            color: #000; 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          }
          .print-wrapper {
            width: 100%;
            padding: 2mm 5mm; 
            box-sizing: border-box;
          }
          #printable-receipt { 
            width: 100% !important; 
            min-width: 0 !important;
            max-width: 100% !important;
            margin: 0 !important; 
            padding: 0 !important;
            box-shadow: none !important;
          }
          /* 🔴 إجبار كل شيء على الظهور بالأسود الداكن أثناء الطباعة */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        </style>
      </head>
      <body>
        <div class="print-wrapper">
          ${printElement.outerHTML}
        </div>
      </body>
      </html>
    `);
    doc.close();

    iframe.contentWindow.focus();
    setTimeout(() => {
      iframe.contentWindow.print();
    }, 500);
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById('printable-receipt');
    if (!element) return;

    try {
      element.classList.remove('shadow-2xl');
      const canvas = await html2canvas(element, { scale: 3, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      element.classList.add('shadow-2xl');

      const pdfWidth = 80;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [pdfWidth, pdfHeight]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${isPayment ? 'Payment' : 'Receipt'}_${supplierName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error("PDF Generation Error: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 flex flex-col items-center justify-start font-sans" dir={isRTL ? "rtl" : "ltr"}>
      
      <div className="w-full max-w-[80mm] flex justify-between items-center mb-6 no-print gap-2">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors bg-slate-900 px-4 py-3 rounded-lg border border-slate-800 font-bold whitespace-nowrap">
          {isRTL ? <ArrowRight size={18} /> : <ArrowLeft size={18} />} 
          {t('common.cancel', i18n.language === 'ar' ? 'إلغاء' : i18n.language === 'fr' ? 'Annuler' : 'Cancel')}
        </button>
      </div>

      <div 
         id="printable-receipt" 
         className="receipt-ticket-forced bg-white text-black shadow-2xl p-4 rounded-md mb-6 flex flex-col justify-between" 
         dir={isRTL ? "rtl" : "ltr"} 
         style={{ width: '80mm', minHeight: '105mm', margin: '0 auto' }}
      >
        <div>
          <div style={{ textAlign: 'center', marginBottom: '12px', borderBottom: '2px dashed #000', paddingBottom: '12px' }}>
            <div style={{ fontSize: '20px', fontWeight: '900', marginBottom: '6px', color: '#000000' }}>
              {currentStoreName}
            </div>
            {/* 🔴 التعديل الأول هنا: استبدال الخلفية السوداء بإطار أسود ليطبع بقوة */}
            <div style={{ 
              display: 'inline-block', 
              backgroundColor: '#ffffff', 
              color: '#000000', 
              border: '2px solid #000000',
              padding: '4px 12px', 
              borderRadius: '6px', 
              fontSize: '14px', 
              fontWeight: '900' 
            }}>
              {isPayment
                ? t('receipt.payment_title', i18n.language === 'ar' ? 'إضافة تسديد (دفع)' : i18n.language === 'fr' ? 'Reçu de Paiement' : 'Payment Receipt')
                : t('receipt.receipt_title', i18n.language === 'ar' ? 'إضافة فاتورة (سلعة)' : i18n.language === 'fr' ? 'Facture (Entrée)' : 'Invoice Receipt')}
            </div>
          </div>
          
          <div style={{ marginTop: '15px', fontSize: '14px', fontWeight: 'bold', color: '#000000' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #000', padding: '6px 0' }}>
               <span>{t('receipt.date', i18n.language === 'ar' ? 'التاريخ:' : i18n.language === 'fr' ? 'Date:' : 'Date:')}</span>
               <span dir="ltr">{data.date || new Date().toISOString().split('T')[0].replace(/-/g, '/')}</span>
             </div>
             <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #000', padding: '6px 0' }}>
               <span>{t('receipt.supplier', i18n.language === 'ar' ? 'المورد:' : i18n.language === 'fr' ? 'Fournisseur:' : 'Supplier:')}</span>
               <span>{supplierName}</span>
             </div>

             {data.caisse_source && (
               <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #000', padding: '6px 0' }}>
                 <span>{t('payroll.fundSource', i18n.language === 'ar' ? 'الصندوق:' : i18n.language === 'fr' ? 'Caisse:' : 'Fund Source:')}</span>
                 <span>{data.caisse_source === 'admin' ? t('common.superAdmin', i18n.language === 'ar' ? 'المدير العام' : i18n.language === 'fr' ? 'Admin' : 'Admin') : data.caisse_source}</span>
               </div>
             )}

             <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #000', borderTop: '2px solid #000', padding: '10px 4px', marginTop: '15px', fontSize: '18px', backgroundColor: '#ffffff', borderRadius: '4px' }}>
               <span>{t('receipt.amount', i18n.language === 'ar' ? 'المبلغ:' : i18n.language === 'fr' ? 'Montant:' : 'Amount:')}</span>
               <span dir="ltr" style={{ fontWeight: '900' }}>{Math.abs(Number(data.amount)).toLocaleString()} {t('currency', 'DA')}</span>
             </div>

             {data.note && (
               <div style={{ marginTop: '15px', padding: '8px', backgroundColor: '#ffffff', borderRadius: '4px', border: '2px dashed #000' }}>
                 <div style={{ fontSize: '12px', color: '#000000', marginBottom: '4px' }}>{t('receipt.note', i18n.language === 'ar' ? 'ملاحظة:' : i18n.language === 'fr' ? 'Note:' : 'Note:')}</div>
                 <div style={{ fontSize: '13px' }}>{data.note}</div>
               </div>
             )}
          </div>
        </div>

        <div>
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 'bold', color: '#000000' }}>
            <div style={{ textAlign: 'center', width: '45%', borderTop: '1px dashed #000', paddingTop: '5px' }}>
              {t('receipt.signature', i18n.language === 'ar' ? 'توقيع المستلم' : i18n.language === 'fr' ? 'Signature' : 'Signature')}
            </div>
            <div style={{ textAlign: 'center', width: '45%', borderTop: '1px dashed #000', paddingTop: '5px' }}>
              {t('receipt.stamp', i18n.language === 'ar' ? 'ختم المحل' : i18n.language === 'fr' ? 'Cachet' : 'Stamp')}
            </div>
          </div>

          <div className="footer-area" style={{ marginTop: '25px', paddingTop: '15px', fontSize: '11px', textAlign: 'center', borderTop: '2px dashed #000', color: '#000000' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{t('receipt.footer', i18n.language === 'ar' ? 'شكراً لتعاملكم معنا' : i18n.language === 'fr' ? 'Merci pour votre confiance' : 'Thank you for your business')}</div>
            {/* 🔴 التعديل الثاني هنا: إجبار الخط على أن يكون أسود غامقاً جداً ليطبع بقوة */}
            <div style={{ fontSize: '11px', color: '#000000', fontWeight: '900', letterSpacing: '1px' }}>POWERED BY GHERBI.AI</div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 w-full max-w-[80mm] mt-4 no-print">
         <button onClick={handlePrint} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
           <Printer size={18} /> {t('common.print', i18n.language === 'ar' ? 'طباعة' : i18n.language === 'fr' ? 'Imprimer' : 'Print')}
         </button>

         <button onClick={handleDownloadPDF} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
           <Download size={18} /> {t('hr.badge.downloadPDF', i18n.language === 'ar' ? 'تحميل PDF' : i18n.language === 'fr' ? 'Télécharger PDF' : 'Download PDF')}
         </button>
      </div>

    </div>
  );
}