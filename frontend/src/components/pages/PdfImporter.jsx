import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { UploadCloud, CheckCircle2, AlertCircle, Save, Database, Map, FileText, DollarSign, Send, Truck } from 'lucide-react';

export default function PdfImporter() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  const [items, setItems] = useState([]);
  const [shelves, setShelves] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // 🌟 حالات (States) جديدة خاصة بنظام الموردين والفاتورة
  const [invoiceMeta, setInvoiceMeta] = useState(null); 
  const [suppliers, setSuppliers] = useState([]); // قائمة الموردين من قاعدة البيانات
  const [selectedSupplier, setSelectedSupplier] = useState(''); // المورد الذي اختاره المستخدم
  const [isInvoiceSaved, setIsInvoiceSaved] = useState(false); // حالة حفظ الفاتورة

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // جلب الرفوف
        if (window.api && window.api.getStoreMapData) {
          const res = await window.api.getStoreMapData();
          if (res.success) {
            setShelves(res.data.shelves);
          }
        }
        // 🌟 جلب الموردين من قاعدة البيانات (تأكد من إضافة هذا الـ API في main.js)
        if (window.api && window.api.getSuppliersList) {
          const res = await window.api.getSuppliersList();
          if (res.success) {
            setSuppliers(res.data);
          }
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };
    fetchInitialData();
  }, []);

   const handleImportPDF = async () => {
    setIsLoading(true);
    try {
      if (window.api && window.api.parsePdfInvoice) {
        const res = await window.api.parsePdfInvoice();
        if (res.success && res.data) {
          
          const processedItems = res.data.map(item => ({
            ...item,
            isSaved: false 
          }));
          
          setItems(processedItems);
          
          // 🌟 تخزين بيانات الفاتورة (المورد والمبلغ) إن وجدت
          if (res.meta) {
            setInvoiceMeta(res.meta);
            setIsInvoiceSaved(false); // إعادة تعيين الزر عند استيراد فاتورة جديدة
            setSelectedSupplier('');
          }
          
          showToast('success', t('pdfImporter.messages.extractSuccess', { count: processedItems.length }));
        } else if (!res.canceled) {
          showToast('error', t('pdfImporter.messages.extractError'));
        }
      }
    } catch (error) {
      showToast('error', t('pdfImporter.messages.systemError'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleSaveItem = async (index) => {
    const item = items[index];
    if (!item.selectedShelf) {
      showToast('warning', t('pdfImporter.messages.shelfWarning'));
      return;
    }

    try {
      if (window.api && window.api.processPdfInventory) {
        const res = await window.api.processPdfInventory({
          shelfId: item.selectedShelf,
          barcode: item.barcode,
          cleanName: item.cleanName,
          dirtyName: item.dirtyName,
          quantity: item.quantity
        });

        if (res.success) {
          handleItemChange(index, 'isSaved', true);
          showToast('success', t('pdfImporter.messages.saveSuccess', { name: item.cleanName }));
        } else {
          showToast('error', res.error || t('pdfImporter.messages.saveError'));
        }
      }
    } catch (error) {
      showToast('error', t('pdfImporter.messages.systemError'));
    }
  };

  // 🌟 دالة ترحيل الفاتورة إلى قسم الديون والموردين
  const handleSaveInvoiceMeta = async () => {
    if (!selectedSupplier) {
      showToast('warning', 'الرجاء ربط الفاتورة بمورد من النظام أولاً.');
      return;
    }
    
    try {
      if (window.api && window.api.saveInvoiceDebt) {
        // نرسل الـ ID الخاص بالمورد، اسم المورد في الـ PDF (كمرجع)، والمبلغ
        const res = await window.api.saveInvoiceDebt({
          supplierId: selectedSupplier,
          pdfSupplierName: invoiceMeta.supplierName,
          totalAmount: invoiceMeta.totalAmount,
          date: new Date().toISOString()
        });

        if (res.success) {
          setIsInvoiceSaved(true);
          showToast('success', 'تم ترحيل الفاتورة بنجاح وإضافتها لحساب المورد!');
        } else {
          showToast('error', res.error || 'حدث خطأ أثناء ترحيل الفاتورة.');
        }
      } else {
         showToast('warning', 'ميزة ترحيل الفواتير غير مفعلة بعد في الباك-إند (main.js).');
      }
    } catch (error) {
      showToast('error', 'خطأ في النظام أثناء حفظ الفاتورة.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans text-start relative" dir={i18n.dir()}>
      
      {toast && (
        <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[9999] px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 ${
          toast.type === 'success' ? 'bg-emerald-600 text-white' : toast.type === 'warning' ? 'bg-amber-600 text-white' : 'bg-red-600 text-white'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span className="font-bold">{toast.message}</span>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Database className="text-blue-500" /> {t('pdfImporter.title')}
          </h1>
          <p className="text-sm text-slate-500 mt-2">{t('pdfImporter.subtitle')}</p>
        </div>
        <button 
          onClick={handleImportPDF} 
          disabled={isLoading}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/20 disabled:opacity-50"
        >
          {isLoading ? <span className="animate-spin text-xl">↻</span> : <UploadCloud size={20} />}
          <span>{t('pdfImporter.btnUpload')}</span>
        </button>
      </div>

      {/* 🌟 البطاقة الذكية: بيانات الفاتورة والمورد */}
      {invoiceMeta && items.length > 0 && (
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 mb-6 shadow-2xl flex flex-col xl:flex-row items-center justify-between gap-6 relative overflow-hidden">
          {/* تأثير ضوئي للخلفية */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
          
          <div className="flex flex-wrap items-center gap-8 z-10 w-full xl:w-auto">
            <div className="flex items-center gap-3">
              <div className="bg-slate-800 p-3 rounded-xl"><Truck className="text-blue-400" size={24} /></div>
              <div>
                <p className="text-xs text-slate-400">{t('pdfImporter.invoiceSupplier')}</p>
                <p className="font-bold text-white text-lg">{invoiceMeta.supplierName || 'غير متوفر'}</p>
              </div>
            </div>

            <div className="h-10 w-px bg-slate-700 hidden sm:block"></div>

            <div className="flex items-center gap-3">
              <div className="bg-slate-800 p-3 rounded-xl"><DollarSign className="text-emerald-400" size={24} /></div>
              <div>
                <p className="text-xs text-slate-400">{t('pdfImporter.invoiceTotal')}</p>
                <p className="font-black text-emerald-400 text-xl" dir="ltr">
                  {invoiceMeta.totalAmount ? invoiceMeta.totalAmount.toLocaleString('fr-DZ') : '0.00'} DA
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto z-10">
            <select 
              value={selectedSupplier}
              onChange={(e) => setSelectedSupplier(e.target.value)}
              disabled={isInvoiceSaved}
              className="w-full sm:w-64 bg-slate-950 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 disabled:opacity-50"
            >
              <option value="" disabled>{t('pdfImporter.selectSupplier')}</option>
              {suppliers.map(sup => (
                <option key={sup.id} value={sup.id}>{sup.name}</option>
              ))}
              {/* خيار افتراضي للتجربة في حال لم تبرمج قائمة الموردين بعد */}
              {suppliers.length === 0 && <option value="test_id">{t('pdfImporter.selectSupplier')}</option>}
            </select>

            <button 
              onClick={handleSaveInvoiceMeta}
              disabled={isInvoiceSaved || !selectedSupplier}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-lg ${
                isInvoiceSaved 
                  ? 'bg-emerald-950/50 text-emerald-500 border border-emerald-900/50 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-900/20'
              }`}
            >
              {isInvoiceSaved ? (
                <><CheckCircle2 size={20} /> {t('pdfImporter.saveSuccess')}</>
              ) : (
                <><Send size={20} /> {t('pdfImporter.addDebtBtn')}  </>
              )}
            </button>
          </div>
        </div>
      )}

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-slate-800 bg-slate-950/50 flex items-center gap-2">
          <Map className="text-slate-400" size={20} />
          <h3 className="font-bold text-white">{t('pdfImporter.tableTitle')}</h3>
        </div>

        <div className="overflow-x-auto p-4">
          <table className="w-full text-start border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-700 text-slate-400 text-sm">
                <th className="pb-3 text-start px-2">{t('pdfImporter.cols.ref')}</th>
                <th className="pb-3 text-start px-2">{t('pdfImporter.cols.dirtyName')}</th>
                <th className="pb-3 text-center px-2">{t('pdfImporter.cols.qty')}</th>
                <th className="pb-3 text-start px-2">{t('pdfImporter.cols.cleanName')}</th>
                <th className="pb-3 text-start px-2">{t('pdfImporter.cols.shelf')}</th>
                <th className="pb-3 text-center px-2">{t('pdfImporter.cols.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-16 text-slate-500 border-b border-slate-800/50">
                    <div className="flex flex-col items-center gap-3">
                      <UploadCloud size={48} className="text-slate-700" />
                      <p>{t('pdfImporter.emptyState')}</p>
                    </div>
                  </td>
                </tr>
              ) : (
                items.map((item, index) => (
                  <tr key={index} className={`border-b border-slate-800/50 transition-colors ${item.isSaved ? 'bg-emerald-950/10' : 'hover:bg-slate-800/30'}`}>
                    
                    <td className="py-4 px-2 font-mono text-slate-400 text-sm" dir="ltr">{item.barcode}</td>
                    <td className="py-4 px-2 text-red-300 text-sm font-medium">{item.dirtyName}</td>
                    <td className="py-4 px-2 font-black text-white text-center" dir="ltr">+{item.quantity}</td>

                    <td className="py-4 px-2 relative">
                      {/* دمجت هنا علامة "معروف مسبقاً" لكي لا نستخدم عموداً إضافياً يشوه الجدول */}
                      {item.isKnown && (
                        <span className="absolute -top-1 right-2 text-[10px] bg-emerald-900/80 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-700">
                          {t('pdfImporter.autoRecognized')}
                        </span>
                      )}
                      <input 
                        type="text" 
                        value={item.cleanName} 
                        onChange={(e) => handleItemChange(index, 'cleanName', e.target.value)}
                        disabled={item.isSaved}
                        className={`w-full bg-slate-950 border ${item.isKnown ? 'border-emerald-700/50' : 'border-slate-700'} rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 disabled:opacity-50 mt-1`} 
                      />
                    </td>
                    
                    <td className="py-4 px-2">
                      <select 
                        value={item.selectedShelf} 
                        onChange={(e) => handleItemChange(index, 'selectedShelf', e.target.value)}
                        disabled={item.isSaved}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 disabled:opacity-50"
                      >
                        <option value="" disabled>{t('pdfImporter.selectShelf')}</option>
                        {shelves.map(shelf => (
                          <option key={shelf.id} value={shelf.id}>
                            {t('storeMap.shelfName', { num: shelf.num, aisle: shelf.aisle })} ({t('pdfImporter.capacity')}: {shelf.capacity})
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="py-4 px-2 text-center">
                      {item.isSaved ? (
                        <span className="flex items-center justify-center gap-1 text-emerald-400 font-bold bg-emerald-950/50 px-3 py-2 rounded-lg">
                          <CheckCircle2 size={18} /> {t('pdfImporter.saved')}
                        </span>
                      ) : (
                        <button 
                          onClick={() => handleSaveItem(index)}
                          className="bg-slate-800 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 w-full shadow-md"
                        >
                          <Save size={18} /> {t('pdfImporter.saveBtn')}
                        </button>
                      )}
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}