import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  LayoutGrid, Snowflake, Monitor, PackageOpen, 
  RotateCw, Trash2, Save, XCircle, AlertCircle, CheckCircle2, 
  MousePointerSquareDashed, Map as MapIcon, Grid3X3
} from 'lucide-react';

export default function StoreMap() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  // إعدادات شبكة المحل (Grid)
  const ROWS = 10;
  const COLS = 14;

  const [placedItems, setPlacedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  // 🛠️ صندوق الأدوات (البازل)
  const tools = [
    { type: 'shelf', icon: LayoutGrid, label: t('storeMap.tools.shelf', 'رف جندول'), color: 'bg-blue-600', border: 'border-blue-500' },
    { type: 'fridge', icon: Snowflake, label: t('storeMap.tools.fridge', 'ثلاجة ألبان'), color: 'bg-cyan-500', border: 'border-cyan-400' },
    { type: 'freezer', icon: PackageOpen, label: t('storeMap.tools.freezer', 'مُجمّد لحوم'), color: 'bg-indigo-500', border: 'border-indigo-400' },
    { type: 'cashier', icon: Monitor, label: t('storeMap.tools.cashier', 'نقطة بيع'), color: 'bg-emerald-600', border: 'border-emerald-500' },
    { type: 'wall', icon: Grid3X3, label: t('storeMap.tools.wall', 'فاصل / جدار'), color: 'bg-slate-700', border: 'border-slate-500' }
  ];

  // ==========================================
  // منطق السحب والإفلات (Drag & Drop)
  // ==========================================
  const handleDragStart = (e, toolType) => {
    e.dataTransfer.setData('toolType', toolType);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // ضروري للسماح بالإفلات
  };

  const handleDrop = (e, row, col) => {
    e.preventDefault();
    const toolType = e.dataTransfer.getData('toolType');
    if (!toolType) return;

    // منع وضع عنصرين في نفس المربع
    const isOccupied = placedItems.find(item => item.row === row && item.col === col);
    if (isOccupied) {
      setSelectedItem(isOccupied);
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      type: toolType,
      row,
      col,
      rotation: 0, 
      name: `${t(`storeMap.tools.${toolType}`, toolType)} ${placedItems.length + 1}`,
      capacity: toolType === 'wall' ? 0 : 100 // الجدار ليس له سعة
    };

    setPlacedItems([...placedItems, newItem]);
    setSelectedItem(newItem);
  };

  // ==========================================
  // أدوات التعديل اليدوي
  // ==========================================
  const handleRotate = () => {
    if (!selectedItem) return;
    const updated = placedItems.map(item => 
      item.id === selectedItem.id ? { ...item, rotation: (item.rotation + 90) % 360 } : item
    );
    setPlacedItems(updated);
    setSelectedItem({ ...selectedItem, rotation: (selectedItem.rotation + 90) % 360 });
  };

  const handleDelete = () => {
    if (!selectedItem) return;
    setPlacedItems(placedItems.filter(item => item.id !== selectedItem.id));
    setSelectedItem(null);
  };

  const handleClearAll = () => {
    if(window.confirm(t('storeMap.confirmClear', 'هل أنت متأكد من مسح المخطط بالكامل؟'))) {
      setPlacedItems([]);
      setSelectedItem(null);
    }
  };

  const handleSaveMap = () => {
    // هنا سنقوم بربطها بقاعدة البيانات لاحقاً
    console.log("Map Data to Save:", placedItems);
    showToast('success', t('storeMap.saveSuccess', 'تم حفظ المخطط بنجاح! جاهز لاستقبال السلع من الـ PDF.'));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans text-start relative" dir={i18n.dir()}>
      
      {/* 🔴 نظام الإشعارات */}
      {toast && (
        <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[9999] px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 ${
          toast.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span className="font-bold">{toast.message}</span>
        </div>
      )}

      {/* 🔴 الترويسة الأنيقة */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <MapIcon className="text-blue-500" /> {t('storeMap.title', 'مخطط المحل التفاعلي')}
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            {t('storeMap.subtitle', 'اسحب الأدوات، صمم الأروقة، وجهز الرفوف لاستقبال سلع الفواتير آلياً')}
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleClearAll} className="bg-slate-800 hover:bg-red-900/50 text-slate-300 hover:text-red-400 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 border border-slate-700 hover:border-red-900/50">
            <XCircle size={18} /> {t('storeMap.clearBtn', 'مسح الكل')}
          </button>
          <button onClick={handleSaveMap} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold transition-colors flex items-center gap-2 shadow-lg shadow-blue-900/20">
            <Save size={18} /> {t('storeMap.saveBtn', 'حفظ واعتماد المخطط')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* 🔴 1. صندوق الأدوات (البازل) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-800 pb-3">
              <MousePointerSquareDashed size={18} className="text-blue-400"/>
              {t('storeMap.toolbox', 'الأدوات')}
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
              {tools.map(tool => (
                <div 
                  key={tool.type}
                  draggable
                  onDragStart={(e) => handleDragStart(e, tool.type)}
                  className="bg-slate-950 border border-slate-800 hover:border-slate-600 rounded-lg p-3 flex flex-col items-center justify-center gap-2 cursor-grab active:cursor-grabbing transition-all group"
                  title={t('storeMap.dragHint', 'اسحبني إلى الخريطة')}
                >
                  <div className={`p-2 rounded-md text-white shadow-inner transition-transform group-hover:scale-110 ${tool.color}`}>
                    <tool.icon size={24} />
                  </div>
                  <span className="text-xs font-medium text-slate-400 group-hover:text-slate-200 text-center">
                    {tool.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 🔴 2. لوحة الرسم (Grid Canvas) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl flex flex-col items-center justify-center overflow-x-auto">
          <div 
            className="bg-slate-950 border-2 border-slate-800 rounded-lg p-2"
            style={{ 
              display: 'grid', 
              gridTemplateColumns: `repeat(${COLS}, minmax(45px, 1fr))`,
              gap: '4px'
            }}
          >
            {/* توليد المربعات */}
            {Array.from({ length: ROWS * COLS }).map((_, index) => {
              const r = Math.floor(index / COLS);
              const c = index % COLS;
              const item = placedItems.find(i => i.row === r && i.col === c);
              const isSelected = selectedItem && selectedItem.id === item?.id;
              const toolInfo = item ? tools.find(t => t.type === item.type) : null;

              return (
                <div 
                  key={`${r}-${c}`}
                  className={`
                    w-12 h-12 rounded-md flex items-center justify-center transition-all relative
                    ${item ? 'cursor-pointer shadow-md' : 'border border-dashed border-slate-800 hover:bg-slate-800/50'}
                    ${isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-950 z-10 scale-105' : ''}
                    ${item ? toolInfo?.color : ''}
                  `}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, r, c)}
                  onClick={() => item && setSelectedItem(item)}
                >
                  {item && toolInfo && (
                    <div 
                      className="text-white drop-shadow-md transition-transform duration-300"
                      style={{ transform: `rotate(${item.rotation}deg)` }}
                    >
                      <toolInfo.icon size={24} />
                    </div>
                  )}
                  {/* إحداثيات خفيفة للمساعدة في البناء */}
                  {!item && <span className="text-[9px] text-slate-800 select-none opacity-50">{r},{c}</span>}
                </div>
              );
            })}
          </div>
          <p className="text-xs text-slate-500 mt-4 text-center">
            {t('storeMap.canvasHint', 'الواجهة الأمامية للمحل (المدخل)')}
          </p>
        </div>

        {/* 🔴 3. نافذة الخصائص (Properties Panel) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl min-h-[300px]">
            <h3 className="font-bold text-white mb-4 border-b border-slate-800 pb-3">
              {t('storeMap.properties', 'خصائص العنصر')}
            </h3>
            
            {selectedItem ? (
              <div className="space-y-5 animate-in fade-in">
                
                <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <div className={`p-2 rounded-md text-white ${tools.find(t => t.type === selectedItem.type)?.color}`}>
                    {React.createElement(tools.find(t => t.type === selectedItem.type).icon, { size: 20 })}
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">{t('storeMap.propType', 'النوع')}</p>
                    <p className="font-bold text-white">{tools.find(t => t.type === selectedItem.type)?.label}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">{t('storeMap.propName', 'تسمية الرف (للربط آلياً)')}</label>
                  <input 
                    type="text" 
                    value={selectedItem.name}
                    onChange={(e) => {
                      const updated = placedItems.map(item => item.id === selectedItem.id ? { ...item, name: e.target.value } : item);
                      setPlacedItems(updated);
                      setSelectedItem({ ...selectedItem, name: e.target.value });
                    }}
                    className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none" 
                  />
                </div>

                {selectedItem.type !== 'wall' && (
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">{t('storeMap.propCapacity', 'السعة القصوى (للتنبيه عند الامتلاء)')}</label>
                    <input 
                      type="number" 
                      value={selectedItem.capacity}
                      onChange={(e) => {
                        const updated = placedItems.map(item => item.id === selectedItem.id ? { ...item, capacity: Number(e.target.value) } : item);
                        setPlacedItems(updated);
                        setSelectedItem({ ...selectedItem, capacity: Number(e.target.value) });
                      }}
                      className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none" 
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                  <button onClick={handleRotate} className="bg-slate-800 hover:bg-blue-900/40 text-slate-300 hover:text-blue-400 border border-slate-700 hover:border-blue-500/50 rounded-lg py-2 flex flex-col items-center justify-center gap-1 transition-colors">
                    <RotateCw size={18} />
                    <span className="text-[10px]">{t('storeMap.rotateBtn', 'تدوير')}</span>
                  </button>
                  <button onClick={handleDelete} className="bg-slate-800 hover:bg-red-900/40 text-slate-300 hover:text-red-400 border border-slate-700 hover:border-red-500/50 rounded-lg py-2 flex flex-col items-center justify-center gap-1 transition-colors">
                    <Trash2 size={18} />
                    <span className="text-[10px]">{t('common.delete', 'إزالة')}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-slate-500 text-center gap-3">
                <LayoutGrid size={32} className="text-slate-700 opacity-50"/>
                <p className="text-sm px-4">
                  {t('storeMap.emptyProps', 'انقر على أي أداة في الخريطة لتعديل خصائصها وربطها.')}
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}