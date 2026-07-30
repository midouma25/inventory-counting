import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, ShoppingCart, Trash2, Plus, Minus, CreditCard, ScanBarcode } from 'lucide-react';

export default function POS() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  // 🔴 بيانات وهمية مبدئية حتى نربطها بقاعدة البيانات
  const [products] = useState([
    { id: 1, name: 'حليب جرجرة 1 لتر', price: 100, barcode: '123456789' },
    { id: 2, name: 'قهوة أروما 250غ', price: 250, barcode: '987654321' },
    { id: 3, name: 'سكر سيفيتال 1 كغ', price: 90, barcode: '112233445' },
    { id: 4, name: 'زيت عافية 2 لتر', price: 280, barcode: '554433221' },
    { id: 5, name: 'عصير رامي برتقال', price: 120, barcode: '998877665' },
  ]);

  const [cart, setCart] = useState([]);
  const [barcodeInput, setBarcodeInput] = useState('');

  // دالة الإضافة للسلة
  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  // دالة البحث بالباركود
  const handleBarcodeSubmit = (e) => {
    e.preventDefault();
    if (!barcodeInput) return;
    const product = products.find(p => p.barcode === barcodeInput);
    if (product) addToCart(product);
    setBarcodeInput('');
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <div className="h-full bg-slate-950 text-slate-300 flex overflow-hidden font-sans text-start">
      
      {/* 📦 القسم الأيسر/الأيمن: قائمة المنتجات والبحث */}
      <div className="flex-1 flex flex-col p-4 overflow-hidden">
        {/* شريط البحث (القارئ) */}
        <div className="mb-4 flex gap-2">
          <form onSubmit={handleBarcodeSubmit} className="flex-1 relative">
            <ScanBarcode className="absolute top-1/2 -translate-y-1/2 start-4 text-slate-500" size={24} />
            <input 
              type="text" 
              autoFocus
              value={barcodeInput}
              onChange={(e) => setBarcodeInput(e.target.value)}
              placeholder={t('pos.scanPlaceholder', 'قم بمسح الباركود أو ابحث عن منتج...')}
              className="w-full bg-slate-900 border-2 border-slate-800 rounded-xl py-4 ps-12 pe-4 text-white text-lg focus:outline-none focus:border-blue-500 transition-colors shadow-lg"
            />
          </form>
        </div>

        {/* شبكة المنتجات (سريعة الوصول) */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map(product => (
              <div 
                key={product.id} 
                onClick={() => addToCart(product)}
                className="bg-slate-900 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800 rounded-xl p-4 cursor-pointer transition-all active:scale-95 shadow-lg flex flex-col justify-between h-32"
              >
                <h3 className="font-bold text-white leading-tight">{product.name}</h3>
                <p className="text-xl font-bold text-emerald-400 mt-2">{product.price} <span className="text-xs text-slate-500">{t('currency', 'DA')}</span></p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🛒 القسم الجانبي: سلة المشتريات (الفاتورة) */}
      <div className={`w-96 bg-slate-900 border-${isRTL ? 'r' : 'l'} border-slate-800 flex flex-col shadow-2xl z-10`}>
        {/* عنوان السلة */}
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/50">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ShoppingCart size={20} className="text-blue-400" /> {t('pos.cart', 'سلة المشتريات')}
          </h2>
          <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-md">{cart.length}</span>
        </div>

        {/* عناصر السلة */}
        <div className="flex-1 overflow-y-auto p-2">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-50">
              <ShoppingCart size={64} className="mb-4" />
              <p>{t('pos.emptyCart', 'السلة فارغة')}</p>
            </div>
          ) : (
            <div className="space-y-2">
              {cart.map((item, index) => (
                <div key={index} className="bg-slate-950 border border-slate-800 rounded-lg p-3 flex flex-col gap-2 relative">
                   <div className="flex justify-between items-start pe-6">
                      <h4 className="text-white font-medium text-sm leading-tight">{item.name}</h4>
                      <p className="font-bold text-emerald-400 whitespace-nowrap">{(item.price * item.qty).toLocaleString()} {t('currency', 'DA')}</p>
                   </div>
                   
                   <div className="flex justify-between items-center">
                     <p className="text-xs text-slate-500">{item.price} {t('currency')} للوحدة</p>
                     <div className="flex items-center gap-2 bg-slate-900 rounded-lg border border-slate-700">
                        <button onClick={() => setCart(cart.map(i => i.id === item.id ? { ...i, qty: Math.max(1, i.qty - 1) } : i))} className="p-1 hover:text-white"><Minus size={14}/></button>
                        <span className="text-sm font-bold text-white w-6 text-center">{item.qty}</span>
                        <button onClick={() => setCart(cart.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i))} className="p-1 hover:text-white"><Plus size={14}/></button>
                     </div>
                   </div>

                   {/* زر الحذف */}
                   <button onClick={() => setCart(cart.filter(i => i.id !== item.id))} className="absolute top-3 end-3 text-slate-600 hover:text-red-500">
                     <Trash2 size={16} />
                   </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* إجمالي الفاتورة والدفع */}
        <div className="p-4 bg-slate-950 border-t border-slate-800">
          <div className="flex justify-between items-center mb-4">
            <span className="text-slate-400 font-medium">{t('pos.total', 'المجموع الكلي')}</span>
            <span className="text-4xl font-black text-white">{total.toLocaleString()} <span className="text-lg text-emerald-500">{t('currency', 'DA')}</span></span>
          </div>
          
          <div className="flex gap-2">
            <button onClick={() => setCart([])} disabled={cart.length === 0} className="p-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl disabled:opacity-50 transition-colors">
              <Trash2 size={24} />
            </button>
            <button disabled={cart.length === 0} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl py-4 rounded-xl flex justify-center items-center gap-2 disabled:opacity-50 transition-colors shadow-lg shadow-blue-900/20">
              <CreditCard size={24} /> {t('pos.pay', 'دفع وطباعة')}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}