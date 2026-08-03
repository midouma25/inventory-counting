import React from 'react';
import { useTranslation } from 'react-i18next';

export default function PrintableTicket({ data }) {
  const { t, i18n } = useTranslation();
  
  const currentStoreName = localStorage.getItem('storeName') || 'GHERBI.AI';
  
  if (!data) return null;

  const { type, item, supplierName } = data;
  const isReceipt = type === 'receipt';

  return (
    <div className="w-full bg-white text-black font-sans print:p-0" dir={i18n.dir()}>
      <div className="receipt-ticket-forced mx-auto shadow-2xl">
        
        <div className="header-title">GHERBI.AI</div>
        <div className="header-subtitle">CODE &bull; MULTIMEDIA &bull; ALGO &bull; AI</div>
        <div className="header-title" style={{ marginTop: '1mm' }}><bdi>{currentStoreName}</bdi></div>
        
        <div className="badge-action">
          {isReceipt ? 'إضافة فاتورة (سلعة)' : 'إضافة تسديد (دفع)'}
        </div>
        
        <div className="receipt-divider"></div>

        <div className="flex flex-col w-full my-2">
          <div className="info-row">
            <span className="label-field">{t('print.date', 'التاريخ:')}</span>
            <span className="value-field" dir="ltr">{item.date}</span>
          </div>
          <div className="info-row">
            <span className="label-field">{t('suppliers.modal.nameLabel', 'المورد:')}</span>
            <span className="value-field">{supplierName}</span>
          </div>
          {!isReceipt && item.caisse_source && (
            <div className="info-row">
              <span className="label-field">{t('payroll.caisse', 'الصندوق:')}</span>
              <span className="value-field">{item.caisse_source}</span>
            </div>
          )}
        </div>

        <div className="amount-box">
          <span className="box-title">{t('print.amount', 'المبلغ:')}</span>
          <span className="box-value" dir="ltr">
            <bdi>{item.amount.toLocaleString()} {t('currency', 'د.ج')}</bdi>
          </span>
        </div>

        {item.note && (
          <div className="note-box">
            <span className="note-title">{t('print.description', 'ملاحظة:')}</span>
            <span>{item.note}</span>
          </div>
        )}

        <div className="signatures-area">
          <span>{t('print.managerSignature', 'توقيع المستلم')}</span>
          <span>{t('receipt.stamp', 'ختم المحل')}</span>
        </div>

        <div className="receipt-divider"></div>

        <div className="footer-area">
          <div className="dev-brand">DEV: GHERBI.AI</div>
          <div style={{ marginTop: '0.5mm' }}>{t('print.thankYou', 'شكراً لتعاملكم معنا')}</div>
        </div>

      </div>
    </div>
  );
}