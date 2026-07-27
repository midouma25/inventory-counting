import React from 'react';
import { useTranslation } from 'react-i18next';

export default function PrintableTicket({ data }) {
  const { t, i18n } = useTranslation();
  
  if (!data) return null;

  const { type, item, supplierName } = data;
  const isReceipt = type === 'receipt';

  return (
    // أضفنا print:shadow-none و print:border-none لتنظيفها وقت الطباعة
    <div className="w-[80mm] mx-auto bg-white text-black p-4 font-sans text-sm shadow-2xl border border-gray-300 print:shadow-none print:border-none print:m-0" dir={i18n.dir()}>
      
      <div className="text-center border-b-2 border-black pb-4 mb-4 border-dashed">
        <h1 className="text-3xl font-extrabold tracking-widest text-black">
          GHERBI.AI
        </h1>
        <p className="text-[10px] mt-1 tracking-widest uppercase font-bold">
          Code • Multimedia • Algo
        </p>
      </div>

      <div className="text-center mb-4">
        <h2 className="text-lg font-bold uppercase border border-black inline-block px-3 py-1">
          {isReceipt ? t('print.receiptTicket', 'وصل استلام') : t('print.paymentTicket', 'وصل تسديد')}
        </h2>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold">{t('print.date', 'التاريخ')}:</span>
          <span>{item.date}</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold">{t('suppliers.modal.nameLabel', 'الاسم')}:</span>
          <span className="font-bold">{supplierName}</span>
        </div>
        {!isReceipt && item.caisse_source && (
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold">{t('payroll.caisse', 'الصندوق')}:</span>
            <span>{item.caisse_source}</span>
          </div>
        )}
      </div>

      <div className="border-t-2 border-b-2 border-black border-dashed py-4 my-4 text-center">
        <p className="text-sm font-bold uppercase mb-1">{t('print.amount', 'المبلغ')}</p>
        <p className="text-3xl font-extrabold">
          {item.amount.toLocaleString()} {t('currency', 'DA')}
        </p>
      </div>

      {item.note && (
        <div className="mb-6 text-center text-xs">
          <span className="font-bold">{t('print.description', 'ملاحظة')}: </span>
          {item.note}
        </div>
      )}

      <div className="mt-8 text-center">
        <p className="font-bold mb-6 text-xs">{t('print.managerSignature', 'توقيع الإدارة')}</p>
        <p>_______________________</p>
        <p className="text-xs font-bold mt-2 uppercase">Gherbi Mohamed Cherif</p>
        <p className="text-[10px] mt-4 border-t border-black pt-2 border-dashed">
          {t('print.thankYou', 'شكراً لتعاملكم معنا')}
        </p>
      </div>
      
    </div>
  );
}