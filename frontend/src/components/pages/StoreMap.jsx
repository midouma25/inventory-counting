import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import * as Icons from 'lucide-react'; 
import { 
  LayoutGrid, Snowflake, Monitor, PackageOpen, 
  RotateCw, Trash2, Save, XCircle, AlertCircle, CheckCircle2, 
  MousePointerSquareDashed, Grid3X3, Loader2,
  Settings2, Box, Tags, Plus, X, FolderKanban, CheckCircle, Map as MapIcon,
  AlignLeft, Type
} from 'lucide-react';
import Modal from '../ui/Modal'; 

export default function StoreMap() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  const [layouts, setLayouts] = useState([]);
  const [activeLayoutId, setActiveLayoutId] = useState(null);

  const [gridSize, setGridSize] = useState({ rows: 10, cols: 14 });
  const [placedItems, setPlacedItems] = useState([]);
  
  const [selectedItem, setSelectedItem] = useState(null);
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [shelfInventory, setShelfInventory] = useState([]);
  const [isLoadingInventory, setIsLoadingInventory] = useState(false);

  // 🌟 حالات التصنيفات الهرمية ذات الوصف
  const [customCategory, setCustomCategory] = useState('');
  const [customCategoryDesc, setCustomCategoryDesc] = useState('');

  // 🌟 قائمة الأقسام الكبرى للهايبر ماركت (مقسمة ومنظمة)
  const hypermarketCategories = [
    {
      group: t('storeMap.catGroups.grocery', 'المواد الغذائية (البقالة الجافة)'),
      items: ['معلبات (تونة، طماطم)', 'عجائن ومعكرونة', 'بقوليات (عدس، حمص)', 'سكر وملح', 'دقيق وسميد', 'زيوت وسمن', 'توابل وبهارات']
    },
    {
      group: t('storeMap.catGroups.dairy', 'الألبان والأجبان (ثلاجات)'),
      items: ['حليب', 'أجبان بمختلف أنواعها', 'زبادي (ياغورت)', 'زبدة ومارغرين', 'كريمات الطبخ']
    },
    {
      group: t('storeMap.catGroups.drinks', 'المشروبات والعصائر'),
      items: ['مياه معدنية', 'عصائر طبيعية', 'مشروبات غازية', 'مشروبات طاقة', 'قهوة وشاي', 'مشروبات ساخنة سريعة التحضير']
    },
    {
      group: t('storeMap.catGroups.cleaning', 'مواد التنظيف (المنظفات)'),
      items: ['مساحيق غسيل الملابس', 'سائل الأواني', 'معطرات جو', 'منظفات أرضيات وزجاج', 'مبيدات حشرات']
    },
    {
      group: t('storeMap.catGroups.personalCare', 'العناية الشخصية ومستحضرات التجميل'),
      items: ['شامبو وبلسم', 'صابون وجل استحمام', 'معجون وفرش أسنان', 'كريمات وعناية بالبشرة', 'حفاضات ومناديل ورقية']
    },
    {
      group: t('storeMap.catGroups.snacks', 'الحلويات والبسكويت (Snacks)'),
      items: ['بسكويت وكيك', 'شوكولاتة', 'شيبس ومقرمشات', 'علكة وحلوى مضغ']
    },
    {
      group: t('storeMap.catGroups.pets', 'أغذية ومستلزمات الحيوانات'),
      items: ['طعام قطط', 'طعام كلاب', 'رمل قطط ومستلزمات النظافة']
    }
  ];

  // 🔴 حالات إنشاء أدوات مخصصة
  const [customTools, setCustomTools] = useState(() => {
    const saved = localStorage.getItem('pos_custom_tools');
    return saved ? JSON.parse(saved) : [];
  });
  const [isAddToolModalOpen, setIsAddToolModalOpen] = useState(false);
  const [newTool, setNewTool] = useState({ name: '', icon: 'ShoppingBasket', color: 'bg-purple-500' });

  const suggestedIcons = ['ShoppingBasket', 'Apple', 'Shirt', 'Coffee', 'Tag', 'Gift', 'Armchair', 'Scissors', 'PenTool', 'Speaker', 'Flame'];
  const suggestedColors = ['bg-purple-500', 'bg-pink-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-teal-500'];

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const baseTools = [
    { type: 'shelf', icon: LayoutGrid, label: t('storeMap.tools.shelf', 'رف جندول'), color: 'bg-blue-600' },
    { type: 'fridge', icon: Snowflake, label: t('storeMap.tools.fridge', 'ثلاجة ألبان'), color: 'bg-cyan-500' },
    { type: 'freezer', icon: PackageOpen, label: t('storeMap.tools.freezer', 'مُجمّد لحوم'), color: 'bg-indigo-500' },
    { type: 'cashier', icon: Monitor, label: t('storeMap.tools.cashier', 'نقطة بيع'), color: 'bg-emerald-600' },
    { type: 'wall', icon: Grid3X3, label: t('storeMap.tools.wall', 'فاصل / جدار'), color: 'bg-slate-700' }
  ];

  const allTools = [
    ...baseTools, 
    ...customTools.map(ct => ({
      type: ct.type,
      icon: Icons[ct.icon] || Icons.Box,
      label: ct.name,
      color: ct.color,
      isCustom: true
    }))
  ];

  const loadLayouts = async () => {
    setIsLoading(true);
    try {
      if (window.api && window.api.getStoreLayouts) {
        const res = await window.api.getStoreLayouts();
        if (res.success) {
          setLayouts(res.data);
          if (res.data.length > 0) {
            const activeOrFirst = res.data.find(l => l.is_active === 1) || res.data[0];
            switchTab(activeOrFirst);
          } else {
            handleCreateNewLayout();
          }
        }
      }
    } catch (error) { console.error("Error loading layouts:", error); }
    setIsLoading(false);
  };

  useEffect(() => { loadLayouts(); }, []);

  const switchTab = (layoutObj) => {
    setActiveLayoutId(layoutObj.id);
    setGridSize({ rows: layoutObj.grid_rows || 10, cols: layoutObj.grid_cols || 14 });
    try {
      setPlacedItems(layoutObj.items_json ? JSON.parse(layoutObj.items_json) : []);
    } catch (e) { setPlacedItems([]); }
    setSelectedItem(null);
  };

  const handleCreateNewLayout = () => {
    const newId = `temp_${Date.now()}`;
    const newName = t('storeMap.newLayout', { count: layouts.length + 1 });
    const newLayout = { id: newId, name: newName, is_active: 0, grid_rows: 10, grid_cols: 14, items_json: "[]" };
    setLayouts([...layouts, newLayout]);
    switchTab(newLayout);
  };

  const handleSaveMap = async () => {
    try {
      const layoutToSave = layouts.find(l => l.id === activeLayoutId);
      if(!layoutToSave) return;
      const payload = {
        id: String(activeLayoutId).startsWith('temp_') ? null : activeLayoutId,
        name: layoutToSave.name, gridRows: gridSize.rows, gridCols: gridSize.cols, items: placedItems
      };
      if (window.api && window.api.saveStoreLayout) {
        const res = await window.api.saveStoreLayout(payload);
        if (res.success) {
          showToast('success', t('storeMap.saveSuccess', 'تم حفظ المخطط بنجاح!'));
          loadLayouts(); 
        } else showToast('error', t('common.error'));
      }
    } catch (error) { showToast('error', t('common.error')); }
  };

  const handleActivateLayout = async () => {
    if (String(activeLayoutId).startsWith('temp_')) { showToast('warning', t('storeMap.saveBeforeActivate')); return; }
    try {
      if (window.api && window.api.activateStoreLayout) {
        const res = await window.api.activateStoreLayout(activeLayoutId);
        if (res.success) { showToast('success', t('storeMap.activateSuccess')); loadLayouts(); }
      }
    } catch (error) { console.error(error); }
  };

  const handleDeleteLayout = async (e, id) => {
    e.stopPropagation(); 
    if(!window.confirm(t('storeMap.confirmDeleteLayout'))) return;
    try {
      if (window.api && window.api.deleteStoreLayout) {
        if (!String(id).startsWith('temp_')) await window.api.deleteStoreLayout(id);
        showToast('success', t('common.deleteSuccess'));
        loadLayouts();
      }
    } catch (error) { console.error(error); }
  };

  const updateLayoutName = (newName) => {
    setLayouts(layouts.map(l => l.id === activeLayoutId ? { ...l, name: newName } : l));
  };

  const handleDragStartTool = (e, toolType) => e.dataTransfer.setData('toolType', toolType);
  const handleDragStartPlacedItem = (e, itemId) => e.dataTransfer.setData('sourceItemId', itemId);
  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e, row, col) => {
    e.preventDefault();
    const toolType = e.dataTransfer.getData('toolType');
    const sourceItemId = e.dataTransfer.getData('sourceItemId');
    const isOccupied = placedItems.find(item => item.row === row && item.col === col);

    if (sourceItemId) {
      if (isOccupied && isOccupied.id !== sourceItemId) { showToast('warning', t('storeMap.occupiedError')); return; }
      setPlacedItems(prev => prev.map(item => item.id === sourceItemId ? { ...item, row, col } : item));
      setSelectedItem(placedItems.find(item => item.id === sourceItemId));
      return;
    }

    if (!toolType) return;
    if (isOccupied) { setSelectedItem(isOccupied); return; }

    const toolObj = allTools.find(t => t.type === toolType);
    const newItem = {
      id: Date.now().toString(), type: toolType, row, col, rotation: 0, 
      name: `${toolObj?.label || 'أداة'} ${placedItems.length + 1}`,
      capacity: toolType === 'wall' ? 0 : 100, categories: [] 
    };

    setPlacedItems([...placedItems, newItem]);
    setSelectedItem(newItem);
  };

  const handleRotate = () => {
    if (!selectedItem) return;
    setPlacedItems(placedItems.map(item => item.id === selectedItem.id ? { ...item, rotation: (item.rotation + 90) % 360 } : item));
    setSelectedItem({ ...selectedItem, rotation: (selectedItem.rotation + 90) % 360 });
  };

  const handleDelete = () => {
    if (!selectedItem) return;
    setPlacedItems(placedItems.filter(item => item.id !== selectedItem.id));
    setSelectedItem(null);
  };

  const handleClearAll = () => {
    if(window.confirm(t('storeMap.confirmClear'))) { setPlacedItems([]); setSelectedItem(null); }
  };

  // 🌟 نظام إضافة التصنيفات الجديد (بنية الكائنات: Name + Description)
  const handleAddCategory = () => {
    const catName = customCategory.trim();
    if (!catName || !selectedItem) return;

    // حماية لتوافق البيانات القديمة (تحويل النصوص إلى كائنات)
    let currentCats = selectedItem.categories || [];
    currentCats = currentCats.map(c => typeof c === 'string' ? { name: c, desc: '' } : c);

    if (currentCats.some(c => c.name === catName)) {
       showToast('warning', t('storeMap.catExists', 'هذا التصنيف مربوط بالرف مسبقاً!'));
       return;
    }

    const updated = [...currentCats, { name: catName, desc: customCategoryDesc.trim() }];
    setPlacedItems(prev => prev.map(item => item.id === selectedItem.id ? { ...item, categories: updated } : item));
    setSelectedItem({ ...selectedItem, categories: updated });
    
    // تفريغ الحقول بعد الإضافة
    setCustomCategory('');
    setCustomCategoryDesc('');
    showToast('success', t('storeMap.catLabels.addSuccess', 'تمت إضافة التصنيف للرف بنجاح!'));
  };

  // 🌟 نظام إزالة التصنيفات
  const removeCategory = (catNameToRemove) => {
    let currentCats = selectedItem.categories || [];
    currentCats = currentCats.map(c => typeof c === 'string' ? { name: c, desc: '' } : c);

    const updated = currentCats.filter(c => c.name !== catNameToRemove);
    setPlacedItems(prev => prev.map(item => item.id === selectedItem.id ? { ...item, categories: updated } : item));
    setSelectedItem({ ...selectedItem, categories: updated });
  };

  // عندما يتم اختيار تصنيف جاهز من القائمة المنسدلة، نقوم بملء الحقل فقط ليتسنى للمستخدم كتابة الوصف ثم الضغط على إضافة
  const handleSelectPredefined = (e) => {
    const value = e.target.value;
    if (value) {
      setCustomCategory(value);
      // Optional: document.getElementById('descInput').focus();
    }
  };

  const handleCreateCustomTool = () => {
    if (!newTool.name.trim()) { showToast('warning', t('storeMap.toolNameRequired')); return; }
    const newToolObj = { type: `custom_${Date.now()}`, name: newTool.name, icon: newTool.icon, color: newTool.color };
    const updatedCustomTools = [...customTools, newToolObj];
    setCustomTools(updatedCustomTools);
    localStorage.setItem('pos_custom_tools', JSON.stringify(updatedCustomTools));
    setIsAddToolModalOpen(false);
    setNewTool({ name: '', icon: 'ShoppingBasket', color: 'bg-purple-500' });
  };

  useEffect(() => {
    if (selectedItem && selectedItem.id) {
      const fetchInventory = async () => {
        setIsLoadingInventory(true);
        try {
          if (window.api && window.api.getShelfProducts) {
            const res = await window.api.getShelfProducts(selectedItem.id);
            if (res.success) setShelfInventory(res.data);
          }
        } catch (error) { console.error("Error fetching shelf contents", error); } 
        finally { setIsLoadingInventory(false); }
      };
      fetchInventory();
    }
  }, [selectedItem]);

  if (isLoading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-blue-500"><Loader2 className="animate-spin" size={48} /></div>;

  const currentLayoutObj = layouts.find(l => l.id === activeLayoutId);

  // دالة مساعدة لتأمين عرض التصنيفات (للتوافق مع البيانات القديمة)
  const getSafeCategories = (cats) => {
    if (!cats) return [];
    return cats.map(c => typeof c === 'string' ? { name: c, desc: '' } : c);
  };

  const safeSelectedCategories = getSafeCategories(selectedItem?.categories);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-950 text-slate-300 p-6 font-sans text-start relative" dir={i18n.dir()}>
      
      {toast && (
        <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[9999] px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 ${toast.type === 'success' ? 'bg-emerald-600 text-white' : toast.type === 'warning' ? 'bg-amber-600 text-white' : 'bg-red-600 text-white'}`}>
          {toast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span className="font-bold">{toast.message}</span>
        </div>
      )}

      {/* 🔴 نظام التبويبات (Tabs Chrome-like) */}
      <div className="flex items-end gap-1 mb-6 border-b border-slate-800 overflow-x-auto no-scrollbar pb-px">
        {layouts.map(layout => (
          <div 
            key={layout.id} onClick={() => switchTab(layout)}
            className={`flex items-center gap-3 px-4 py-3 min-w-[180px] max-w-[250px] rounded-t-xl cursor-pointer border-t border-x transition-all group select-none ${activeLayoutId === layout.id ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-950 border-transparent text-slate-500 hover:bg-slate-900/50 hover:text-slate-300'}`}
          >
            {layout.is_active === 1 ? <CheckCircle size={16} className="text-emerald-500 shrink-0"/> : <FolderKanban size={16} className="shrink-0"/>}
            <span className="truncate font-medium flex-1">{layout.name}</span>
            <button onClick={(e) => handleDeleteLayout(e, layout.id)} className={`p-1 rounded hover:bg-slate-800 text-slate-500 hover:text-red-400 ${activeLayoutId === layout.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
              <X size={14} />
            </button>
          </div>
        ))}
        <button onClick={handleCreateNewLayout} className="px-4 py-3 rounded-t-xl hover:bg-slate-900 text-slate-400 hover:text-blue-400 transition-colors flex items-center justify-center">
          <Plus size={18} />
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
           <input type="text" value={currentLayoutObj?.name || ''} onChange={(e) => updateLayoutName(e.target.value)} className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-xl font-bold text-white focus:border-blue-500 focus:outline-none w-full md:w-64" placeholder={t('storeMap.layoutNamePlaceholder')} />
           {currentLayoutObj?.is_active === 1 && (
             <span className="bg-emerald-900/30 text-emerald-400 border border-emerald-800 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-1">
               <CheckCircle2 size={14}/> {t('storeMap.activeLayoutBadge')}
             </span>
           )}
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          {currentLayoutObj?.is_active !== 1 && (
             <button onClick={handleActivateLayout} className="justify-center bg-slate-800 hover:bg-emerald-900/50 text-slate-300 hover:text-emerald-400 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 border border-slate-700 hover:border-emerald-900/50">
               <CheckCircle size={18} /> <span className="hidden sm:inline">{t('storeMap.setAsActive')}</span>
             </button>
          )}
          <button onClick={handleClearAll} className="justify-center bg-slate-800 hover:bg-red-900/50 text-slate-300 hover:text-red-400 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 border border-slate-700 hover:border-red-900/50">
            <XCircle size={18} /> <span className="hidden sm:inline">{t('storeMap.clearBtn')}</span>
          </button>
          <button onClick={handleSaveMap} className="justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold transition-colors flex items-center gap-2 shadow-lg shadow-blue-900/20">
            <Save size={18} /> {t('common.save')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* 1. صندوق الأدوات */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-800 pb-3">
              <MousePointerSquareDashed size={18} className="text-blue-400"/> {t('storeMap.toolbox')}
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
              {allTools.map(tool => (
                <div key={tool.type} draggable onDragStart={(e) => handleDragStartTool(e, tool.type)} className="bg-slate-950 border border-slate-800 hover:border-slate-600 rounded-lg p-3 flex flex-col items-center justify-center gap-2 cursor-grab active:cursor-grabbing transition-all group relative">
                  {tool.isCustom && (
                    <button onClick={() => { const updated = customTools.filter(t => t.type !== tool.type); setCustomTools(updated); localStorage.setItem('pos_custom_tools', JSON.stringify(updated)); }} className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-all"><X size={14} /></button>
                  )}
                  <div className={`p-2 rounded-md text-white shadow-inner transition-transform group-hover:scale-110 ${tool.color}`}><tool.icon size={24} /></div>
                  <span className="text-xs font-medium text-slate-400 group-hover:text-slate-200 text-center">{tool.label}</span>
                </div>
              ))}
              <button onClick={() => setIsAddToolModalOpen(true)} className="bg-slate-950 border border-dashed border-slate-700 hover:border-blue-500 hover:bg-blue-900/20 rounded-lg p-3 flex flex-col items-center justify-center gap-2 transition-all group">
                <div className="p-2 rounded-md text-slate-500 group-hover:text-blue-400 transition-transform group-hover:scale-110"><Plus size={24} /></div>
                <span className="text-xs font-medium text-slate-500 group-hover:text-blue-400 text-center">{t('storeMap.addCustomTool')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. لوحة الرسم التفاعلية */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 shadow-2xl flex flex-col items-center justify-center overflow-x-auto" onClick={() => setSelectedItem(null)}>
          <div className="w-full aspect-[14/10] min-w-[600px] bg-slate-950 border-2 border-slate-800 rounded-lg p-1"
               style={{ display: 'grid', gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`, gridTemplateRows: `repeat(${gridSize.rows}, 1fr)`, gap: '2px' }}>
            {Array.from({ length: gridSize.rows * gridSize.cols }).map((_, index) => {
              const r = Math.floor(index / gridSize.cols);
              const c = index % gridSize.cols;
              const item = placedItems.find(i => i.row === r && i.col === c);
              const isSelected = selectedItem && selectedItem.id === item?.id;
              const toolInfo = item ? allTools.find(t => t.type === item.type) : null;

              return (
                <div 
                  key={`${r}-${c}`} draggable={!!item}
                  onDragStart={(e) => { if(item) { e.stopPropagation(); handleDragStartPlacedItem(e, item.id); } }}
                  onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, r, c)}
                  onClick={(e) => { e.stopPropagation(); if(item) setSelectedItem(item); }}
                  className={`w-full h-full rounded-sm flex items-center justify-center transition-all relative ${item ? 'cursor-grab active:cursor-grabbing shadow-md z-10' : 'border border-dashed border-slate-800/60 hover:bg-slate-800/50'} ${isSelected ? 'ring-2 ring-white ring-offset-1 ring-offset-slate-950 scale-110 z-20' : ''} ${item ? toolInfo?.color : ''}`}
                >
                  {item && toolInfo && <div className="text-white drop-shadow-md transition-transform duration-300" style={{ transform: `rotate(${item.rotation}deg)` }}><toolInfo.icon size={18} /></div>}
                  {item && item.categories?.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-bold w-3 h-3 flex items-center justify-center rounded-full border border-slate-950">{item.categories.length}</span>}
                </div>
              );
            })}
          </div>
          <p className="text-xs text-slate-500 mt-4 text-center bg-slate-800/50 px-4 py-1 rounded-full">{t('storeMap.canvasHint')}</p>
        </div>

        {/* 3. نافذة الخصائص والإعدادات */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl min-h-[300px]">
            {selectedItem ? (
              <div className="space-y-5 animate-in fade-in">
                <h3 className="font-bold text-white mb-4 border-b border-slate-800 pb-3">{t('storeMap.properties')}</h3>
                <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <div className={`p-2 rounded-md text-white ${allTools.find(t => t.type === selectedItem.type)?.color}`}>
                    {React.createElement(allTools.find(t => t.type === selectedItem.type).icon, { size: 20 })}
                  </div>
                  <div><p className="text-xs text-slate-500">{t('storeMap.propType')}</p><p className="font-bold text-white">{allTools.find(t => t.type === selectedItem.type)?.label}</p></div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">{t('storeMap.propName')}</label>
                  <input type="text" value={selectedItem.name} onChange={(e) => { const updated = placedItems.map(item => item.id === selectedItem.id ? { ...item, name: e.target.value } : item); setPlacedItems(updated); setSelectedItem({ ...selectedItem, name: e.target.value }); }} className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none" />
                </div>

                {selectedItem.type !== 'wall' && (
                  <>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">{t('storeMap.propCapacity')}</label>
                    <input type="number" value={selectedItem.capacity} onChange={(e) => { const updated = placedItems.map(item => item.id === selectedItem.id ? { ...item, capacity: Number(e.target.value) } : item); setPlacedItems(updated); setSelectedItem({ ...selectedItem, capacity: Number(e.target.value) }); }} className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none" />
                  </div>
                  <button onClick={() => setIsInventoryOpen(true)} className="w-full bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-900/50 hover:border-emerald-500 py-3 rounded-lg font-bold transition-all flex justify-center items-center gap-2"><Box size={18} /> {t('storeMap.manageInventoryBtn')}</button>
                  </>
                )}

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                  <button onClick={handleRotate} className="bg-slate-800 hover:bg-blue-900/40 text-slate-300 hover:text-blue-400 border border-slate-700 rounded-lg py-2 flex flex-col items-center justify-center gap-1 transition-colors"><RotateCw size={18} /> <span className="text-[10px]">{t('storeMap.rotateBtn')}</span></button>
                  <button onClick={handleDelete} className="bg-slate-800 hover:bg-red-900/40 text-slate-300 hover:text-red-400 border border-slate-700 rounded-lg py-2 flex flex-col items-center justify-center gap-1 transition-colors">
                    <Trash2 size={18} /> <span className="text-[10px]">{t('common.delete')}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-5 animate-in fade-in">
                <h3 className="font-bold text-white mb-4 border-b border-slate-800 pb-3 flex items-center gap-2">
                  <Settings2 size={18} className="text-amber-400"/> {t('storeMap.gridSettings')}
                </h3>
                <div><label className="block text-xs font-medium text-slate-400 mb-1">{t('storeMap.gridCols')}</label><input type="number" min="5" max="30" value={gridSize.cols} onChange={(e) => setGridSize({...gridSize, cols: Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-sm text-white focus:border-amber-500 focus:outline-none" /></div>
                <div><label className="block text-xs font-medium text-slate-400 mb-1">{t('storeMap.gridRows')}</label><input type="number" min="5" max="30" value={gridSize.rows} onChange={(e) => setGridSize({...gridSize, rows: Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-sm text-white focus:border-amber-500 focus:outline-none" /></div>
                <p className="text-xs text-slate-500 text-center mt-4 border-t border-slate-800 pt-4">{t('storeMap.emptyProps')}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ==========================================
          النافذة المنبثقة لإدارة سلع الرف وعرض المخزون (تحديث شامل)
         ========================================== */}
      <Modal isOpen={isInventoryOpen} onClose={() => setIsInventoryOpen(false)} title={`${t('storeMap.inventoryModalTitle')} ${selectedItem?.name}`}>
        <div className="space-y-6 text-start p-2" dir={isRTL ? "rtl" : "ltr"}>
          
          {/* 🌟 عرض التصنيفات الهرمية المربوطة بالرف */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 min-h-[120px]">
            <h4 className="text-sm font-medium text-slate-400 mb-4 flex items-center gap-2"><Tags size={16}/> {t('storeMap.linkedCategories')}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {safeSelectedCategories.length > 0 ? (
                safeSelectedCategories.map((cat, index) => (
                  <div key={index} className="bg-blue-900/20 border border-blue-900/50 p-3 rounded-lg flex justify-between items-start group shadow-sm transition-colors hover:border-blue-700">
                    <div className="flex-1 pr-2">
                      <h5 className="text-blue-400 font-bold text-sm mb-1">{cat.name}</h5>
                      {cat.desc && <p className="text-slate-400 text-xs leading-relaxed">{cat.desc}</p>}
                    </div>
                    <button onClick={() => removeCategory(cat.name)} className="text-slate-500 hover:text-red-400 hover:bg-slate-900 p-1.5 rounded-md transition-colors"><Trash2 size={14} /></button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-600 w-full col-span-2 text-center py-4">{t('storeMap.emptyInventory')}</p>
              )}
            </div>
          </div>

          <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
            <h4 className="text-white font-bold mb-4 flex items-center gap-2 border-b border-slate-800 pb-3">
              <Plus size={18} className="text-emerald-400" /> إضافة تصنيفات جديدة للرف
            </h4>
            
            <div className="space-y-4">
              {/* 🌟 القائمة المنسدلة المقسمة لمجموعات */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">{t('storeMap.catLabels.selectCategory', '-- اختر تصنيفاً من القائمة الكبرى --')}</label>
                <select onChange={handleSelectPredefined} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 font-medium">
                  <option value="">{t('common.selectOption', '-- اضغط للاختيار --')}</option>
                  {hypermarketCategories.map((group, gIndex) => (
                    <optgroup key={gIndex} label={group.group} className="bg-slate-900 text-blue-400 font-bold">
                      {group.items.map((item, iIndex) => (
                        <option key={iIndex} value={item} className="text-white bg-slate-950 font-normal">{item}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 gap-4 pt-2">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2 flex items-center gap-1"><Type size={14}/> {t('storeMap.catLabels.catName', 'اسم التصنيف')}</label>
                  <input type="text" value={customCategory} onChange={(e) => setCustomCategory(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 font-bold" placeholder="مثال: أجبان مبشورة..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2 flex items-center gap-1"><AlignLeft size={14}/> {t('storeMap.catLabels.catDesc', 'وصف الرف (اختياري)')}</label>
                  <textarea value={customCategoryDesc} onChange={(e) => setCustomCategoryDesc(e.target.value)} rows="2" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-sm" placeholder={t('storeMap.catLabels.catDescPlaceholder', 'مثال: جبن أحمر، جبن موزاريلا، شيدر...')} />
                </div>
                
                <button onClick={handleAddCategory} disabled={!customCategory.trim()} className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg font-bold transition-colors shadow-lg flex items-center justify-center gap-2 mt-2">
                  <Plus size={18} /> إضافة هذا التصنيف للرف
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-slate-700 pt-6">
            <h4 className="text-white font-bold mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              {t('storeMap.modal.storedProducts', 'السلع المخزنة في هذا الرف (المخزون):')}
            </h4>
            
            <div className="bg-slate-950 rounded-lg border border-slate-800 max-h-48 overflow-y-auto">
              {isLoadingInventory ? (
                <p className="text-slate-500 text-center py-6 text-sm">{t('storeMap.modal.loadingProducts', 'جاري جلب السلع...')}</p>
              ) : shelfInventory.length === 0 ? (
                <p className="text-slate-500 text-center py-6 text-sm">{t('storeMap.modal.noProducts', 'لا توجد سلع مخزنة في هذا الرف حالياً.')}</p>
              ) : (
                <table className="w-full text-sm text-start">
                  <thead className="bg-slate-900 text-slate-400 sticky top-0">
                    <tr>
                      <th className="py-2.5 px-4 text-start">{t('storeMap.modal.productName', 'السلعة')}</th>
                      <th className="py-2.5 px-4 text-center">{t('storeMap.modal.quantity', 'الكمية')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shelfInventory.map((product) => (
                      <tr key={product.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                        <td className="py-3 px-4 text-white font-medium">{product.clean_name}</td>
                        <td className="py-3 px-4 text-center font-bold text-emerald-400" dir="ltr">+{product.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

        </div>
      </Modal>

      <Modal isOpen={isAddToolModalOpen} onClose={() => setIsAddToolModalOpen(false)} title={t('storeMap.customToolModalTitle')}>
        <div className="space-y-6 text-start p-2" dir={isRTL ? "rtl" : "ltr"}>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">{t('storeMap.toolNameLabel')}</label>
            <input type="text" value={newTool.name} onChange={(e) => setNewTool({...newTool, name: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" placeholder={t('storeMap.toolNamePlaceholder')} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">{t('storeMap.chooseIcon')}</label>
            <div className="flex flex-wrap gap-3">
              {suggestedIcons.map(iconName => {
                const IconComp = Icons[iconName] || Icons.Box;
                return (
                  <button key={iconName} onClick={() => setNewTool({...newTool, icon: iconName})} className={`p-3 rounded-lg border transition-all flex items-center justify-center ${newTool.icon === iconName ? 'bg-slate-800 border-blue-500 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-600'}`}>
                    <IconComp size={24} />
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">{t('storeMap.chooseColor')}</label>
            <div className="flex flex-wrap gap-3">
              {suggestedColors.map(colorClass => (
                <button key={colorClass} onClick={() => setNewTool({...newTool, color: colorClass})} className={`w-10 h-10 rounded-full transition-all ${colorClass} ${newTool.color === colorClass ? 'ring-4 ring-offset-2 ring-offset-slate-900 ring-white scale-110' : 'opacity-70 hover:opacity-100'}`} />
              ))}
            </div>
          </div>
          <button onClick={handleCreateCustomTool} className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition-all flex justify-center items-center gap-2">
            <Plus size={18} /> {t('storeMap.confirmTool')}
          </button>
        </div>
      </Modal>

    </div>
  );
}