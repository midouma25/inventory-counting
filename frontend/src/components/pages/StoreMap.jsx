import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  LayoutGrid, Snowflake, Monitor, PackageOpen, 
  RotateCw, Trash2, Save, XCircle, AlertCircle, CheckCircle2, 
  MousePointerSquareDashed, Map as MapIcon, Grid3X3, Loader2,
  Settings2, Box, Tags, Plus, X
} from 'lucide-react';
import Modal from '../ui/Modal'; // استدعاء النافذة المنبثقة

export default function StoreMap() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  // 🔴 التحكم بمساحة المحل ديناميكياً
  const [gridSize, setGridSize] = useState({ rows: 10, cols: 14 });

  const [placedItems, setPlacedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // تم تغييرها لـ false مؤقتاً لتجربة الواجهة

  // 🔴 حالات صفحة المحتويات (البلانوجرام)
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [customCategory, setCustomCategory] = useState('');

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const tools = [
    { type: 'shelf', icon: LayoutGrid, label: t('storeMap.tools.shelf', 'رف جندول'), color: 'bg-blue-600', border: 'border-blue-500' },
    { type: 'fridge', icon: Snowflake, label: t('storeMap.tools.fridge', 'ثلاجة ألبان'), color: 'bg-cyan-500', border: 'border-cyan-400' },
    { type: 'freezer', icon: PackageOpen, label: t('storeMap.tools.freezer', 'مُجمّد لحوم'), color: 'bg-indigo-500', border: 'border-indigo-400' },
    { type: 'cashier', icon: Monitor, label: t('storeMap.tools.cashier', 'نقطة بيع'), color: 'bg-emerald-600', border: 'border-emerald-500' },
    { type: 'wall', icon: Grid3X3, label: t('storeMap.tools.wall', 'فاصل / جدار'), color: 'bg-slate-700', border: 'border-slate-500' }
  ];

  // قائمة التصنيفات الجاهزة للسوبر ماركت
  const predefinedCategories = [
    'عجائن (معكرونة، كسكس)', 'زيوت نباتية', 'سكر ودقيق', 'قهوة وشاي', 
    'توابل وبهارات', 'معلبات (طماطم، تونة)', 'مشروبات وعصائر', 
    'بسكويت وحلويات', 'ألبان وأجبان', 'لحوم مجمدة', 'عناية شخصية', 'مواد تنظيف'
  ];

  // ==========================================
  // منطق السحب والإفلات (المحدث لدعم تحريك ما تم وضعه)
  // ==========================================
  const handleDragStartTool = (e, toolType) => {
    e.dataTransfer.setData('toolType', toolType);
  };

  const handleDragStartPlacedItem = (e, itemId) => {
    e.dataTransfer.setData('sourceItemId', itemId);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e, row, col) => {
    e.preventDefault();
    const toolType = e.dataTransfer.getData('toolType');
    const sourceItemId = e.dataTransfer.getData('sourceItemId');

    const isOccupied = placedItems.find(item => item.row === row && item.col === col);

    // 1. إذا كان يسحب عنصراً موجوداً مسبقاً (نقل)
    if (sourceItemId) {
      if (isOccupied && isOccupied.id !== sourceItemId) {
        showToast('warning', t('storeMap.occupiedError', 'المكان مشغول بعنصر آخر!'));
        return;
      }
      setPlacedItems(prev => prev.map(item => item.id === sourceItemId ? { ...item, row, col } : item));
      setSelectedItem(placedItems.find(item => item.id === sourceItemId));
      return;
    }

    // 2. إذا كان يسحب أداة جديدة من الصندوق
    if (!toolType) return;
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
      capacity: toolType === 'wall' ? 0 : 100,
      categories: [] // 🔴 إضافة مصفوفة السلع فارغة افتراضياً
    };

    setPlacedItems([...placedItems, newItem]);
    setSelectedItem(newItem);
  };

  const handleRotate = () => {
    if (!selectedItem) return;
    const updated = placedItems.map(item => item.id === selectedItem.id ? { ...item, rotation: (item.rotation + 90) % 360 } : item);
    setPlacedItems(updated);
    setSelectedItem({ ...selectedItem, rotation: (selectedItem.rotation + 90) % 360 });
  };

  const handleDelete = () => {
    if (!selectedItem) return;
    setPlacedItems(placedItems.filter(item => item.id !== selectedItem.id));
    setSelectedItem(null);
  };

  const handleClearAll = () => {
    if(window.confirm(t('storeMap.confirmClear', 'هل أنت متأكد من مسح المخطط؟'))) {
      setPlacedItems([]);
      setSelectedItem(null);
    }
  };

  // ==========================================
  // منطق إضافة وحذف السلع في النافذة المنبثقة
  // ==========================================
  const addCategory = (category) => {
    if (!category.trim() || !selectedItem) return;
    if (selectedItem.categories.includes(category)) return; // منع التكرار
    
    const updatedCategories = [...selectedItem.categories, category];
    
    setPlacedItems(prev => prev.map(item => item.id === selectedItem.id ? { ...item, categories: updatedCategories } : item));
    setSelectedItem({ ...selectedItem, categories: updatedCategories });
    setCustomCategory('');
  };

  const removeCategory = (categoryToRemove) => {
    const updatedCategories = selectedItem.categories.filter(c => c !== categoryToRemove);
    setPlacedItems(prev => prev.map(item => item.id === selectedItem.id ? { ...item, categories: updatedCategories } : item));
    setSelectedItem({ ...selectedItem, categories: updatedCategories });
  };


  if (isLoading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-blue-500"><Loader2 className="animate-spin" size={48} /></div>;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-950 text-slate-300 p-6 font-sans text-start relative" dir={i18n.dir()}>
      
      {toast && (
        <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[9999] px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 ${
          toast.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span className="font-bold">{toast.message}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <MapIcon className="text-blue-500" /> {t('storeMap.title', 'مخطط المحل التفاعلي')}
          </h1>
          <p className="text-sm text-slate-500 mt-2">{t('storeMap.subtitle', 'اسحب الأدوات، صمم الأروقة، وجهز الرفوف')}</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleClearAll} className="bg-slate-800 hover:bg-red-900/50 text-slate-300 hover:text-red-400 px-4 py-2 rounded-lg font-medium transition-colors border border-slate-700">
            <XCircle size={18} /> <span className="hidden sm:inline">{t('storeMap.clearBtn', 'مسح الكل')}</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold transition-colors flex items-center gap-2">
            <Save size={18} /> {t('storeMap.saveBtn', 'حفظ المخطط')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* 1. صندوق الأدوات */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-800 pb-3">
              <MousePointerSquareDashed size={18} className="text-blue-400"/>
              {t('storeMap.toolbox', 'الأدوات')}
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
              {tools.map(tool => (
                <div 
                  key={tool.type} draggable onDragStart={(e) => handleDragStartTool(e, tool.type)}
                  className="bg-slate-950 border border-slate-800 hover:border-slate-600 rounded-lg p-3 flex flex-col items-center justify-center gap-2 cursor-grab active:cursor-grabbing transition-all group"
                >
                  <div className={`p-2 rounded-md text-white shadow-inner transition-transform group-hover:scale-110 ${tool.color}`}>
                    <tool.icon size={24} />
                  </div>
                  <span className="text-xs font-medium text-slate-400 group-hover:text-slate-200 text-center">{tool.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. لوحة الرسم (ديناميكية وتقبل تحريك العناصر) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 shadow-2xl flex flex-col items-center justify-center overflow-x-auto" onClick={() => setSelectedItem(null)}>
          <div className="w-full aspect-[14/10] min-w-[600px] bg-slate-950 border-2 border-slate-800 rounded-lg p-1"
               style={{ display: 'grid', gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`, gridTemplateRows: `repeat(${gridSize.rows}, 1fr)`, gap: '2px' }}>
            {Array.from({ length: gridSize.rows * gridSize.cols }).map((_, index) => {
              const r = Math.floor(index / gridSize.cols);
              const c = index % gridSize.cols;
              const item = placedItems.find(i => i.row === r && i.col === c);
              const isSelected = selectedItem && selectedItem.id === item?.id;
              const toolInfo = item ? tools.find(t => t.type === item.type) : null;

              return (
                <div 
                  key={`${r}-${c}`}
                  draggable={!!item}
                  onDragStart={(e) => {
                    if(item) {
                      e.stopPropagation(); // منع التداخل مع الشبكة
                      handleDragStartPlacedItem(e, item.id);
                    }
                  }}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, r, c)}
                  onClick={(e) => { e.stopPropagation(); if(item) setSelectedItem(item); }}
                  className={`
                    w-full h-full rounded-sm flex items-center justify-center transition-all relative
                    ${item ? 'cursor-grab active:cursor-grabbing shadow-md z-10' : 'border border-dashed border-slate-800/60 hover:bg-slate-800/50'}
                    ${isSelected ? 'ring-2 ring-white ring-offset-1 ring-offset-slate-950 scale-110 z-20' : ''}
                    ${item ? toolInfo?.color : ''}
                  `}
                >
                  {item && toolInfo && (
                    <div className="text-white drop-shadow-md transition-transform duration-300" style={{ transform: `rotate(${item.rotation}deg)` }}>
                      <toolInfo.icon size={18} />
                    </div>
                  )}
                  {/* عرض عدد السلع في الرف كمؤشر صغير */}
                  {item && item.categories?.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-bold w-3 h-3 flex items-center justify-center rounded-full border border-slate-950">
                      {item.categories.length}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-xs text-slate-500 mt-4 text-center bg-slate-800/50 px-4 py-1 rounded-full">{t('storeMap.canvasHint', 'الواجهة الأمامية للمحل (المدخل)')}</p>
        </div>

        {/* 3. نافذة الخصائص والإعدادات */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl min-h-[300px]">
            {selectedItem ? (
              <div className="space-y-5 animate-in fade-in">
                <h3 className="font-bold text-white mb-4 border-b border-slate-800 pb-3">{t('storeMap.properties', 'خصائص العنصر')}</h3>
                
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
                  <label className="block text-xs font-medium text-slate-400 mb-1">{t('storeMap.propName', 'تسمية الرف')}</label>
                  <input type="text" value={selectedItem.name}
                    onChange={(e) => {
                      const updated = placedItems.map(item => item.id === selectedItem.id ? { ...item, name: e.target.value } : item);
                      setPlacedItems(updated);
                      setSelectedItem({ ...selectedItem, name: e.target.value });
                    }}
                    className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none" 
                  />
                </div>

                {selectedItem.type !== 'wall' && (
                  <button onClick={() => setIsInventoryOpen(true)} className="w-full bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-900/50 hover:border-emerald-500 py-3 rounded-lg font-bold transition-all flex justify-center items-center gap-2">
                    <Box size={18} /> {t('storeMap.manageInventoryBtn', 'إدارة السلع والأقسام')}
                  </button>
                )}

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                  <button onClick={handleRotate} className="bg-slate-800 hover:bg-blue-900/40 text-slate-300 hover:text-blue-400 border border-slate-700 rounded-lg py-2 flex flex-col items-center justify-center gap-1 transition-colors">
                    <RotateCw size={18} /> <span className="text-[10px]">{t('storeMap.rotateBtn', 'تدوير')}</span>
                  </button>
                  <button onClick={handleDelete} className="bg-slate-800 hover:bg-red-900/40 text-slate-300 hover:text-red-400 border border-slate-700 rounded-lg py-2 flex flex-col items-center justify-center gap-1 transition-colors">
                    <Trash2 size={18} /> <span className="text-[10px]">{t('common.delete', 'إزالة')}</span>
                  </button>
                </div>
              </div>
            ) : (
              // 🔴 إعدادات مساحة المحل (تظهر عندما لا يكون هناك عنصر محدد)
              <div className="space-y-5 animate-in fade-in">
                <h3 className="font-bold text-white mb-4 border-b border-slate-800 pb-3 flex items-center gap-2">
                  <Settings2 size={18} className="text-amber-400"/> {t('storeMap.gridSettings', 'إعدادات مساحة المحل')}
                </h3>
                
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">{t('storeMap.gridCols', 'العرض (الأعمدة)')}</label>
                  <input type="number" min="5" max="30" value={gridSize.cols} onChange={(e) => setGridSize({...gridSize, cols: Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-sm text-white focus:border-amber-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">{t('storeMap.gridRows', 'العمق (الصفوف)')}</label>
                  <input type="number" min="5" max="30" value={gridSize.rows} onChange={(e) => setGridSize({...gridSize, rows: Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-sm text-white focus:border-amber-500 focus:outline-none" />
                </div>
                <p className="text-xs text-slate-500 text-center mt-4">انقر على أي أداة في الخريطة لتعديل خصائصها.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ==========================================
          صفحة المحتويات (البلانوجرام) المنبثقة
         ========================================== */}
      <Modal isOpen={isInventoryOpen} onClose={() => setIsInventoryOpen(false)} title={`${t('storeMap.inventoryModalTitle', 'محتويات العنصر:')} ${selectedItem?.name}`}>
        <div className="space-y-6 text-start p-2" dir={isRTL ? "rtl" : "ltr"}>
          
          {/* عرض السلع المضافة للرف */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 min-h-[100px]">
            <h4 className="text-sm font-medium text-slate-400 mb-3 flex items-center gap-2"><Tags size={16}/> الأقسام المربوطة بهذا الرف:</h4>
            <div className="flex flex-wrap gap-2">
              {selectedItem?.categories?.length > 0 ? (
                selectedItem.categories.map((cat, index) => (
                  <span key={index} className="bg-blue-900/50 text-blue-300 border border-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2 shadow-sm">
                    {cat}
                    <button onClick={() => removeCategory(cat)} className="hover:text-red-400 hover:bg-slate-950 rounded-full p-0.5 transition-colors">
                      <X size={14} />
                    </button>
                  </span>
                ))
              ) : (
                <p className="text-sm text-slate-600 w-full text-center py-4">{t('storeMap.emptyInventory', 'هذا الرف فارغ حالياً.')}</p>
              )}
            </div>
          </div>

          {/* إضافة من القائمة الجاهزة */}
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">{t('storeMap.categorySelect', 'اختر من التصنيفات الجاهزة')}</label>
            <select onChange={(e) => addCategory(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500">
              <option value="">-- اضغط للاختيار --</option>
              {predefinedCategories.map((cat, i) => (
                <option key={i} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* إضافة صنف يدوي جديد */}
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">{t('storeMap.customCategoryPlaceholder', 'أو اكتب صنفاً جديداً...')}</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={customCategory} 
                onChange={(e) => setCustomCategory(e.target.value)}
                onKeyDown={(e) => { if(e.key === 'Enter') { e.preventDefault(); addCategory(customCategory); }}}
                className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" 
                placeholder="مثال: شامبو قطط مستورد" 
              />
              <button onClick={() => addCategory(customCategory)} className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg font-medium transition-colors border border-slate-700 flex items-center gap-1">
                <Plus size={18} /> {t('storeMap.addCategoryBtn', 'إضافة')}
              </button>
            </div>
          </div>
          
        </div>
      </Modal>

    </div>
  );
}