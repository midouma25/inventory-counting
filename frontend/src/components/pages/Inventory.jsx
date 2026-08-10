import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Plus, Printer, FileText, LayoutList, CheckCircle2, AlertCircle, Trash2, Tag, Layers, Package, ScanLine, Download, ArrowUpDown, ListPlus, Edit, Check, Eraser, Store, X } from 'lucide-react';
import Modal from '../ui/Modal';
import ConfirmAlert from '../ui/ConfirmAlert';

// 🌟 قاعدة بيانات السوق الجزائري (ديناميكية حسب اللغة)
const ALGERIAN_MARKET_DATA = {
  pasta: { ar: "عجائن وسميد", fr: "Pâtes & Semoule", en: "Pasta & Semolina", items: ["ماما Mama", "سيم Sim", "عمر بن عمر", "سفينة Safina", "أكسترا Extra", "الوردة البيضاء", "للا خديجة", "بانزاني Panzani"] },
  tomato: { ar: "طماطم مصبرة", fr: "Tomate Concentrée", en: "Tomato Paste", items: ["الحارة", "إيزيس Isis", "كاب CAB", "صبيا Sobia", "إيزم Izem", "التاج", "جودي Jouda", "سيكام Sicam"] },
  oil: { ar: "زيت الطهي", fr: "Huile de Table", en: "Cooking Oil", items: ["إيليو Elio", "سيفيتال Cevital", "عافية Afia", "فلوريال Fleurial", "لوسيور Lesieur", "بوجي Puget", "ينار"] },
  coffee: { ar: "قهوة", fr: "Café", en: "Coffee", items: ["بونال Bonal", "فاكتو Facto", "أروما Aroma", "1001", "طابا Taba", "نسكافيه Nescafé", "كارت نوار Carte Noire", "لافازا Lavazza"] },
  tea: { ar: "شاي", fr: "Thé", en: "Tea", items: ["الخنشلي", "الصحراء", "الخيمة", "ليبتون Lipton", "توينينغز Twinings", "سلطان Sultan", "القافلة"] },
  milk: { ar: "حليب", fr: "Lait", en: "Milk", items: ["كانديا Candia", "صومام Soummam", "الحضنة Hodna", "طاسيلي", "جيبلي", "لوشا Le Chat", "لحظة Loya", "نيدو Nestlé Nido"] },
  cheese: { ar: "أجبان", fr: "Fromage", en: "Cheese", items: ["البقرة الضاحكة La Vache Qui Rit", "كيري Kiri", "رئيس Président", "بربر Berbère", "تارتينو Tartino", "الفنك Le Fennec", "فريكو Frico", "شيدار Cheddar"] },
  yogurt: { ar: "ياغورت", fr: "Yaourt", en: "Yogurt", items: ["صومام Soummam", "دانون Danone", "أكتيفيا Activia", "دانيت Danette", "أكتيميل Actimel", "الحضنة", "ترافل Trèfle"] },
  tuna: { ar: "تونة ومعلبات", fr: "Thon & Conserves", en: "Tuna & Canned Food", items: ["المنار El Manar", "ماروكا Maruca", "ريغال Régal", "سيدي داود", "إيزابيل Isabel", "ريو ماري Rio Mare"] },
  juice: { ar: "عصائر", fr: "Jus", en: "Juice", items: ["رامي Ramy", "رويبة Rouiba", "نڨاوس Ngaous", "إفروي Ifruit", "توجة Toudja", "راني Rani", "تروبيكو Tropico", "جذور"] },
  soda: { ar: "مشروبات غازية", fr: "Boissons Gazeuses", en: "Soda & Soft Drinks", items: ["حمود بوعلام", "سيليكتو Selecto", "سليم Slim", "كوكا كولا Coca-Cola", "بيبسي Pepsi", "سبرايت Sprite", "فانتا Fanta", "ميريندا Mirinda"] },
  water: { ar: "مياه معدنية", fr: "Eau Minérale", en: "Mineral Water", items: ["إفري Ifri", "سعيدة Saida", "قديلة Guedila", "لالة خديجة", "موزاية Mouzaia", "توجة", "مسرغين"] },
  choco: { ar: "شوكولاتة", fr: "Chocolat", en: "Chocolate", items: ["المرجان El Mordjene", "نوتيلا Nutella", "ميلكا Milka", "فيريرو روشيه Ferrero", "كيندر Kinder", "تويكس Twix", "سنيكرز Snickers"] },
  biscuits: { ar: "بسكويت", fr: "Biscuits", en: "Biscuits", items: ["بيمو Bimo", "بالماري Palmary", "بيفا Bifa", "لو LU", "أوريو Oreo", "برانس Prince", "ماكسون Maxon", "كندر بوينو"] },
  laundry: { ar: "غسيل الملابس", fr: "Lessive", en: "Laundry Detergent", items: ["إيزيس Isis", "أومو Omo", "أريال Ariel", "تايد Tide", "لوشا Le Chat", "تاست Test", "أمير Amir", "ماكسيس Maxis"] },
  cleaners: { ar: "جافيل ومنظفات", fr: "Javel & Entretien", en: "Bleach & Cleaners", items: ["براف Bref", "فافو Favo", "عادي Adi", "لكروا La Croix", "بينغو Bingo", "أجاكس Ajax", "العملاق"] },
  dishwash: { ar: "غسيل الأواني", fr: "Liquide Vaisselle", en: "Dishwashing Liquid", items: ["إيزيس Isis", "بريل Pril", "ماكسيس Maxis", "فيري Fairy"] },
  shampoo: { ar: "شامبو", fr: "Shampooing", en: "Shampoo", items: ["فينوس Venus", "دوف Dove", "هيد آند شولدرز Head & Shoulders", "بانتين Pantene", "إلسيف Elseve", "كلير Clear"] },
  soap: { ar: "صابون", fr: "Savon", en: "Soap", items: ["الكف", "الدزاير", "دوف Dove", "بالموليف Palmolive", "لو بتي مارسيي Le Petit Marseillais", "لوكس Lux"] },
  toothpaste: { ar: "معجون أسنان", fr: "Dentifrice", en: "Toothpaste", items: ["سيجنال Signal", "كولجيت Colgate", "سنسوداين Sensodyne", "كرست Crest", "المسواك"] },
  diapers: { ar: "حفاضات وورق", fr: "Couches & Papier", en: "Diapers & Paper", items: ["مولفيكس Molfix", "بامبرز Pampers", "كانبيبي Canbebe", "بيبي لوك Baby Look", "لوتوس Lotus"] }
};

export default function Inventory() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const currentStoreName = localStorage.getItem('storeName') || 'GHERBI.AI';
  
  // 🌟 استخراج اللغة الحالية لتطبيقها على القاموس
  const currentLang = i18n.language.startsWith('ar') ? 'ar' : i18n.language.startsWith('fr') ? 'fr' : 'en';

  const [treeData, setTreeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [selectedFamily, setSelectedFamily] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortByCategory, setSortByCategory] = useState(false);

  const [selectedItems, setSelectedItems] = useState(new Set());

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('product'); 
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  
  const [isNameDictModalOpen, setIsNameDictModalOpen] = useState(false);
  const [dictSelection, setDictSelection] = useState({ familyId: '', typeId: '' });
  const [dictInput, setDictInput] = useState('');
  const [invNamesDict, setInvNamesDict] = useState({}); 

  const [isMarketModalOpen, setIsMarketModalOpen] = useState(false);
  const [marketMapping, setMarketMapping] = useState({}); 

  const [familyName, setFamilyName] = useState('');
  const [typeData, setTypeData] = useState({ familyId: '', name: '' });
  const [productForm, setProductForm] = useState({ familyId: '', typeId: '' });
  const [selectedProductDetails, setSelectedProductDetails] = useState({}); 

  const [editingProduct, setEditingProduct] = useState(null);
  const [editingCategoryId, setEditingCategoryId] = useState(null); 

  const [editingDictName, setEditingDictName] = useState(null); 
  const [newDictNameValue, setNewDictNameValue] = useState(''); 

  const [isDigitalMode, setIsDigitalMode] = useState(false);
  const [actualQuantities, setActualQuantities] = useState({});

  const [itemToDelete, setItemToDelete] = useState(null); 
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchTree = async () => {
    setIsLoading(true);
    try {
      if (window.api && window.api.getInventoryTree) {
        const res = await window.api.getInventoryTree();
        if (res.success) setTreeData(res.data);
      }
    } catch (error) { console.error(error); } 
    finally { setIsLoading(false); }
  };

  useEffect(() => {
    fetchTree();
    setInvNamesDict(JSON.parse(localStorage.getItem('inv_names_dict') || '{}'));
  }, []);

  const saveNamesToDict = (e) => {
    e.preventDefault();
    if (!dictSelection.typeId) {
      showToast('error', t('inventory.selectTypeFirst', 'يرجى اختيار النوع أولاً'));
      return;
    }
    
    const newNames = dictInput.split('\n').map(n => n.trim()).filter(n => n !== '');
    const currentList = invNamesDict[dictSelection.typeId] || [];
    const combined = Array.from(new Set([...currentList, ...newNames]));
    
    const newDict = { ...invNamesDict, [dictSelection.typeId]: combined };
    localStorage.setItem('inv_names_dict', JSON.stringify(newDict));
    setInvNamesDict(newDict);
    
    setDictInput('');
    setDictSelection({ familyId: '', typeId: '' });
    setIsNameDictModalOpen(false);
    showToast('success', t('common.success', 'تم الحفظ بنجاح'));
  };

  const handleDeleteDictName = (e, nameToDelete) => {
    e.preventDefault();
    e.stopPropagation();
    
    const currentList = invNamesDict[productForm.typeId] || [];
    const updatedList = currentList.filter(n => n !== nameToDelete);
    
    const newDict = { ...invNamesDict, [productForm.typeId]: updatedList };
    localStorage.setItem('inv_names_dict', JSON.stringify(newDict));
    setInvNamesDict(newDict);

    if (selectedProductDetails[nameToDelete]) {
      const copy = { ...selectedProductDetails };
      delete copy[nameToDelete];
      setSelectedProductDetails(copy);
    }
    showToast('success', t('inventory.nameDeleted', 'تم حذف الاسم من القائمة'));
  };

  const handleSaveEditDictName = (e, oldName) => {
    e.preventDefault();
    e.stopPropagation();
    
    const finalNewName = newDictNameValue.trim();
    if(!finalNewName) return;

    const currentList = invNamesDict[productForm.typeId] || [];
    const updatedList = currentList.map(n => n === oldName ? finalNewName : n);
    
    const newDict = { ...invNamesDict, [productForm.typeId]: updatedList };
    localStorage.setItem('inv_names_dict', JSON.stringify(newDict));
    setInvNamesDict(newDict);

    if (selectedProductDetails[oldName]) {
      const copy = { ...selectedProductDetails };
      copy[finalNewName] = copy[oldName];
      delete copy[oldName];
      setSelectedProductDetails(copy);
    }

    setEditingDictName(null);
    setNewDictNameValue('');
    showToast('success', t('inventory.nameUpdated', 'تم تعديل الاسم بنجاح'));
  };

  // 🌟 تعديل استيراد الداتا لتعتمد على اللغة المختارة
  const handleImportMarketData = async () => {
    let currentDict = JSON.parse(localStorage.getItem('inv_names_dict') || '{}');
    let successCount = 0;

    setIsLoading(true);
    try {
      for (const [typeKey, familyId] of Object.entries(marketMapping)) {
        if (familyId) { 
          // إنشاء الاسم بناءً على اللغة الحالية للمستخدم
          const localizedTypeName = ALGERIAN_MARKET_DATA[typeKey][currentLang];
          
          const typeRes = await window.api.addInvType(familyId, localizedTypeName);
          if (typeRes && typeRes.success && typeRes.id) {
             const items = ALGERIAN_MARKET_DATA[typeKey].items;
             const existingList = currentDict[typeRes.id] || [];
             currentDict[typeRes.id] = Array.from(new Set([...existingList, ...items]));
             successCount++;
          }
        }
      }

      if (successCount > 0) {
        localStorage.setItem('inv_names_dict', JSON.stringify(currentDict));
        setInvNamesDict(currentDict);
        await fetchTree();
        showToast('success', t('common.success', 'تم الاستيراد بنجاح'));
        setIsMarketModalOpen(false);
        setMarketMapping({});
      } else {
        showToast('error', t('inventory.selectOneFamilyAtLeast', 'الرجاء تعيين عائلة واحدة على الأقل'));
      }
    } catch (error) { console.error(error); }
    finally { setIsLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (editingProduct) {
        res = await window.api.updateInvItem(editingProduct.id, {
          name: editingProduct.name,
          piecesPerBox: Number(editingProduct.pieces_per_box),
          price: Number(editingProduct.price),
          systemQty: Number(editingProduct.system_qty)
        });
      } else if (modalMode === 'edit-family') {
        res = await window.api.updateInvFamily(editingCategoryId, familyName);
      } else if (modalMode === 'edit-type') {
        res = await window.api.updateInvType(editingCategoryId, typeData.name);
      } else if (modalMode === 'family') {
        res = await window.api.addInvFamily(familyName);
      } else if (modalMode === 'type') {
        res = await window.api.addInvType(typeData.familyId, typeData.name);
      } else if (modalMode === 'product') {
        const entries = Object.entries(selectedProductDetails);
        if (entries.length === 0) {
          showToast('error', t('inventory.selectOneName', 'الرجاء اختيار منتج وتحديد سعره'));
          return;
        }
        
        let allSuccess = true;
        for (const [name, details] of entries) {
          const currentRes = await window.api.addInvItem({
            typeId: productForm.typeId,
            name: name,
            piecesPerBox: Number(details.pieces) || 1,
            price: Number(details.price) || 0,
            systemQty: 0
          });
          if (!currentRes || !currentRes.success) allSuccess = false;
        }
        res = { success: allSuccess };
      }

      if (res && res.success) {
        showToast('success', t('common.success', 'تمت العملية بنجاح'));
        setIsModalOpen(false);
        setEditingProduct(null);
        setEditingCategoryId(null);
        setFamilyName('');
        setTypeData({ familyId: '', name: '' });
        setProductForm({ familyId: '', typeId: '' });
        setSelectedProductDetails({});
        fetchTree();
      } else {
        showToast('error', t('common.error', 'حدث خطأ'));
      }
    } catch (error) { console.error(error); }
  };

  const executeDelete = async () => {
    if (!itemToDelete) return;
    try {
      let res;
      if (itemToDelete.kind === 'family') res = await window.api.deleteInvFamily(itemToDelete.id);
      else if (itemToDelete.kind === 'type') res = await window.api.deleteInvType(itemToDelete.id);
      else if (itemToDelete.kind === 'product') res = await window.api.deleteInvItem(itemToDelete.id);

      if (res && res.success) {
        showToast('success', t('common.success', 'تم الحذف بنجاح'));
        if (itemToDelete.kind === 'family' && selectedFamily === String(itemToDelete.id)) setSelectedFamily('all');
        if (itemToDelete.kind === 'type' && selectedType === String(itemToDelete.id)) setSelectedType('all');
        fetchTree();
        const newSelected = new Set(selectedItems);
        newSelected.delete(itemToDelete.id);
        setSelectedItems(newSelected);
      } else showToast('error', t('common.error', 'خطأ في الحذف'));
    } catch (error) { console.error(error); } 
    finally { setItemToDelete(null); }
  };

  const handleSaveSingleDigitalQty = async (item) => {
    const qty = actualQuantities[item.id];
    if (qty === '' || qty === undefined) return;
    try {
      const res = await window.api.updateInvItem(item.id, {
        name: item.name,
        piecesPerBox: item.pieces_per_box,
        price: item.price,
        systemQty: Number(qty)
      });
      if (res && res.success) {
        showToast('success', t('common.success', 'تم الحفظ'));
        fetchTree();
      } else showToast('error', t('common.error', 'خطأ'));
    } catch (e) { console.error(e); }
  };

  const handleClearSingleDigitalQty = async (item) => {
    try {
      const res = await window.api.updateInvItem(item.id, {
        name: item.name,
        piecesPerBox: item.pieces_per_box,
        price: item.price,
        systemQty: 0
      });
      if (res && res.success) {
        setActualQuantities({ ...actualQuantities, [item.id]: '' });
        fetchTree();
        showToast('success', t('inventory.qtyCleared', 'تم التفريغ'));
      }
    } catch (e) { console.error(e); }
  };

  const getAllDisplayProducts = () => {
    let products = [];
    treeData.forEach(family => {
      if (selectedFamily !== 'all' && String(selectedFamily) !== String(family.id)) return;
      family.types.forEach(type => {
        if (selectedType !== 'all' && String(selectedType) !== String(type.id)) return;
        type.items.forEach(item => {
          if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return;
          products.push({ ...item, familyName: family.name, typeName: type.name });
        });
      });
    });

    if (sortByCategory) {
      products.sort((a, b) => {
        if (a.familyName !== b.familyName) return a.familyName.localeCompare(b.familyName);
        if (a.typeName !== b.typeName) return a.typeName.localeCompare(b.typeName);
        return a.name.localeCompare(b.name);
      });
    }
    return products;
  };

  const displayProducts = getAllDisplayProducts();
  const typesForFilter = selectedFamily === 'all' 
    ? Array.from(new Map(treeData.flatMap(f => f.types).map(t => [t.id, t])).values())
    : treeData.find(f => String(f.id) === String(selectedFamily))?.types || [];

  const handleSelectItem = (id) => {
    const newSet = new Set(selectedItems);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedItems(newSet);
  };

  const handleSelectAll = () => {
    if (selectedItems.size === displayProducts.length) setSelectedItems(new Set());
    else setSelectedItems(new Set(displayProducts.map(p => p.id)));
  };

  const getProductsToPrint = () => {
    if (selectedItems.size > 0) return displayProducts.filter(p => selectedItems.has(p.id));
    return displayProducts;
  };

  const handleDownloadWordA4 = () => {
    const productsToPrint = getProductsToPrint();
    if (productsToPrint.length === 0) {
      showToast('error', t('common.noResults', 'لا توجد بيانات للطباعة'));
      return;
    }

    const midpoint = Math.ceil(productsToPrint.length / 2);
    const leftCol = productsToPrint.slice(0, midpoint);
    const rightCol = productsToPrint.slice(midpoint);

    const renderTableRows = (items) => {
      return items.map(item => `
        <tr>
          <td style="width: 15%; height: 28px; text-align: center; font-weight: bold; font-size: 13pt;">
             ${item.system_qty > 0 ? item.system_qty : ''}
          </td>
          <td style="width: 15%; text-align: center;">${item.pieces_per_box}</td>
          <td style="width: 50%; font-weight: bold; text-align: ${isRTL ? 'right' : 'left'};">${item.typeName} - ${item.name}</td>
          <td style="width: 20%; text-align: center;">${item.price.toLocaleString()}</td>
        </tr>
      `).join('');
    };

    const dateStr = new Date().toISOString().split('T')[0].replace(/-/g, '/');
    const titleStr = t('inventory.wordTitle', 'ورقة جرد المخزون');
    const qtyLabel = t('inventory.qty', 'الكمية');
    const pieceLabel = t('inventory.pieces', 'حبة/علبة');
    const prodLabel = t('inventory.product', 'المنتج');
    const priceLabel = t('inventory.price', 'السعر');

    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <style>
          @page WordSection1 { size: 595.3pt 841.9pt; margin: 30pt; }
          div.WordSection1 { page: WordSection1; }
          body { font-family: 'Segoe UI', Tahoma, Arial, sans-serif; direction: ${isRTL ? 'rtl' : 'ltr'}; }
          .header-title { text-align: center; font-size: 18pt; font-weight: bold; margin-bottom: 5pt; }
          .header-sub { text-align: center; font-size: 11pt; margin-bottom: 20pt; color: #333; }
          .layout-table { width: 100%; border: none; }
          .layout-table td { border: none; vertical-align: top; padding: 0 5pt; }
          .data-table { border-collapse: collapse; width: 100%; font-size: 10.5pt; table-layout: fixed; }
          .data-table th, .data-table td { border: 1pt solid windowtext; padding: 3pt 4pt; vertical-align: middle; }
          .data-table th { background-color: #f1f5f9; font-weight: bold; text-align: center; }
        </style>
      </head>
      <body>
        <div class="WordSection1">
          <div class="header-title">${currentStoreName}</div>
          <div class="header-sub">${titleStr} (Stocktaking) - ${dateStr}</div>
          <table class="layout-table">
            <tr>
              <td style="width: 50%;">
                <table class="data-table">
                  <thead><tr><th style="width: 15%;">${qtyLabel}</th><th style="width: 15%;">${pieceLabel}</th><th style="width: 50%;">${prodLabel}</th><th style="width: 20%;">${priceLabel}</th></tr></thead>
                  <tbody>${renderTableRows(leftCol)}</tbody>
                </table>
              </td>
              <td style="width: 50%;">
                <table class="data-table">
                  <thead><tr><th style="width: 15%;">${qtyLabel}</th><th style="width: 15%;">${pieceLabel}</th><th style="width: 50%;">${prodLabel}</th><th style="width: 20%;">${priceLabel}</th></tr></thead>
                  <tbody>${renderTableRows(rightCol)}</tbody>
                </table>
              </td>
            </tr>
          </table>
          <div style="text-align: center; margin-top: 20pt; font-size: 9pt; color: #666;">POWERED BY GHERBI.AI</div>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', htmlContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Inventory_${dateStr.replace(/\//g, '-')}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setIsPrintModalOpen(false);
  };

  const handlePrintA7 = () => {
    const productsToPrint = getProductsToPrint();
    if (productsToPrint.length === 0) {
      showToast('error', t('common.noResults', 'لا توجد بيانات للطباعة'));
      return;
    }

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
        <title>Inventory Thermal Print</title>
        <style>
          @page { margin: 0; }
          html, body { margin: 0; padding: 0; width: 72mm; background: #fff; color: #000; font-family: sans-serif; }
          .print-wrapper { width: 100%; padding: 2mm 5mm; box-sizing: border-box; }
          h2 { text-align: center; font-size: 18px; margin: 0 0 5px 0; font-weight: 900; }
          .subtitle { text-align: center; font-size: 13px; margin-bottom: 12px; border-bottom: 2px dashed #000; padding-bottom: 6px; font-weight: bold;}
          table { width: 100%; border-collapse: collapse; font-size: 12px; font-weight: bold; }
          th { border-bottom: 2px solid #000; padding: 6px 2px; text-align: ${isRTL ? 'right' : 'left'}; }
          td { border-bottom: 1px dashed #777; padding: 8px 2px; text-align: ${isRTL ? 'right' : 'left'};}
          .qty-box { display: inline-block; width: 28px; height: 16px; border: 1.5px solid #000; border-radius: 2px; }
          .footer-brand { text-align: center; margin-top: 15px; font-size: 11px; font-weight: 900; border-top: 1px dashed #000; padding-top: 8px;}
        </style>
      </head>
      <body>
        <div class="print-wrapper">
          <h2>${currentStoreName}</h2>
          <div class="subtitle">${t('inventory.quickStock', 'جرد سريع')}<br><span style="font-size: 10px; font-weight: normal;">${new Date().toISOString().split('T')[0].replace(/-/g, '/')}</span></div>
          <table>
            <thead>
              <tr>
                <th style="width: 55%;">${t('inventory.product', 'المنتج')}</th>
                <th style="width: 25%; text-align: center;">${t('inventory.pieces', 'العلبة')}</th>
                <th style="width: 20%; text-align: center;">${t('inventory.qty', 'الكمية')}</th>
              </tr>
            </thead>
            <tbody>
              ${productsToPrint.map(item => `
                <tr>
                  <td>${item.typeName} - ${item.name}</td>
                  <td style="text-align: center; font-size: 10px;">${item.pieces_per_box} p/B</td>
                  <td style="text-align: center; font-size: 14px;">
                     ${item.system_qty > 0 ? item.system_qty : '<div class="qty-box"></div>'}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="footer-brand">POWERED BY GHERBI.AI</div>
        </div>
      </body>
      </html>
    `);
    doc.close();

    iframe.contentWindow.focus();
    setTimeout(() => { iframe.contentWindow.print(); setIsPrintModalOpen(false); }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans relative text-start" dir={i18n.dir()}>
      {toast && (
        <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[9999] px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 ${toast.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
          {toast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span className="font-bold">{toast.message}</span>
        </div>
      )}

      {/* الأزرار العلوية */}
      <div className="flex justify-between items-start mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <LayoutList className="text-blue-500" /> {t('sidebar.inventory', 'إدارة وجرد المخزون')}
          </h1>
          <p className="text-sm text-slate-500 mt-2">{t('inventory.description', 'أنشئ قوائم الجرد واطبعها.')}</p>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => { setEditingProduct(null); setModalMode('family'); setIsModalOpen(true); }} className="flex items-center gap-2 bg-slate-800 text-slate-300 hover:text-white px-4 py-2 rounded-lg font-medium border border-slate-700">
            <Layers size={18} /> + {t('inventory.addFamily', 'عائلة')}
          </button>
          <button onClick={() => { setEditingProduct(null); setModalMode('type'); setIsModalOpen(true); }} className="flex items-center gap-2 bg-slate-800 text-slate-300 hover:text-white px-4 py-2 rounded-lg font-medium border border-slate-700">
            <Tag size={18} /> + {t('inventory.addType', 'نوع')}
          </button>
          <button onClick={() => setIsNameDictModalOpen(true)} className="flex items-center gap-2 bg-slate-800 text-slate-300 hover:text-white px-4 py-2 rounded-lg font-medium border border-slate-700">
            <ListPlus size={18} /> + {t('inventory.addName', 'إسم')}
          </button>
          <button onClick={() => setIsMarketModalOpen(true)} className="flex items-center gap-2 bg-purple-600/20 text-purple-400 hover:bg-purple-600 hover:text-white px-4 py-2 rounded-lg font-bold border border-purple-500/50 transition-colors">
            <Store size={18} /> {t('inventory.marketDbBtn', 'قاعدة السوق')}
          </button>
          <button onClick={() => { setEditingProduct(null); setModalMode('product'); setIsModalOpen(true); }} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow-lg shadow-blue-900/20 ml-auto">
            <Package size={18} /> + {t('inventory.addProduct', 'منتج')}
          </button>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-6 flex flex-wrap gap-4 justify-between items-center shadow-lg">
        <div className="flex gap-3 flex-1 flex-wrap">
          
          <div className="flex items-center gap-1 bg-slate-950 border border-slate-700 rounded-lg pr-1">
            <select value={selectedFamily} onChange={(e) => { setSelectedFamily(e.target.value); setSelectedType('all'); }} className="bg-transparent px-4 py-2 text-white focus:outline-none min-w-[150px]">
              <option value="all" className="bg-slate-900 text-white">{t('inventory.allFamilies', 'جميع العائلات')}</option>
              {treeData.map(f => <option key={f.id} value={f.id} className="bg-slate-900 text-white">{f.name}</option>)}
            </select>
            {selectedFamily !== 'all' && (
              <div className="flex gap-1 border-s border-slate-700 ps-2 py-1">
                <button onClick={() => { 
                  const fam = treeData.find(f => String(f.id) === String(selectedFamily));
                  setFamilyName(fam.name); setEditingCategoryId(fam.id); setModalMode('edit-family'); setIsModalOpen(true); 
                }} className="text-blue-400 hover:text-white transition-colors flex items-center gap-1 text-xs font-bold" title={t('common.edit', 'تعديل')}>
                  <Edit size={14} />
                </button>
                <button onClick={() => setItemToDelete({ kind: 'family', id: selectedFamily })} className="text-red-400 hover:text-white transition-colors flex items-center gap-1 text-xs font-bold ml-2" title={t('common.delete', 'حذف')}>
                  <Trash2 size={14} />
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 bg-slate-950 border border-slate-700 rounded-lg pr-1">
            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="bg-transparent px-4 py-2 text-white focus:outline-none min-w-[150px]">
              <option value="all" className="bg-slate-900 text-white">{t('inventory.allTypes', 'جميع الأنواع')}</option>
              {typesForFilter.map(tOption => (
                <option key={tOption.id} value={tOption.id} className="bg-slate-900 text-white">{tOption.name}</option>
              ))}
            </select>
            {selectedType !== 'all' && (
              <div className="flex gap-1 border-s border-slate-700 ps-2 py-1">
                <button onClick={() => { 
                  const typ = typesForFilter.find(t => String(t.id) === String(selectedType));
                  setTypeData({ ...typeData, name: typ.name }); setEditingCategoryId(typ.id); setModalMode('edit-type'); setIsModalOpen(true); 
                }} className="text-blue-400 hover:text-white transition-colors flex items-center gap-1 text-xs font-bold" title={t('common.edit', 'تعديل')}>
                  <Edit size={14} /> 
                </button>
                <button onClick={() => setItemToDelete({ kind: 'type', id: selectedType })} className="text-red-400 hover:text-white transition-colors flex items-center gap-1 text-xs font-bold ml-2" title={t('common.delete', 'حذف')}>
                  <Trash2 size={14} />
                </button>
              </div>
            )}
          </div>

          <div className="relative flex-1 max-w-xs">
            <Search size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" placeholder={t('common.search', 'بحث...')} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={`w-full bg-slate-950 border border-slate-700 rounded-lg py-2 text-white focus:outline-none focus:border-blue-500 ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'}`} />
          </div>

          <button onClick={() => setSortByCategory(!sortByCategory)} className={`flex items-center justify-center p-2 rounded-lg border transition-colors ${sortByCategory ? 'bg-blue-600 border-blue-600 text-white' : 'bg-slate-950 border-slate-700 text-slate-400 hover:text-white'}`} title={t('inventory.sortByCategory', 'ترتيب')}>
            <ArrowUpDown size={18} />
          </button>
        </div>

        <div className="flex gap-3 mt-4 lg:mt-0">
          <button onClick={() => setIsDigitalMode(!isDigitalMode)} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-colors ${isDigitalMode ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-emerald-400 border border-emerald-900/50 hover:bg-slate-700'}`}>
            <ScanLine size={18} /> {isDigitalMode ? t('inventory.cancelDigitalMode', 'إلغاء الجرد الرقمي') : t('inventory.enterDigitalMode', 'إدخال جرد رقمي')}
          </button>
          
          <button onClick={() => setIsPrintModalOpen(true)} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-bold shadow-lg relative">
            <Printer size={18} /> {t('inventory.printSheet', 'طباعة ورقة جرد')}
            {selectedItems.size > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full border-2 border-slate-950">{selectedItems.size}</span>
            )}
          </button>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-start border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80">
                <th className="px-4 py-4 w-10 text-center">
                  <input type="checkbox" checked={displayProducts.length > 0 && selectedItems.size === displayProducts.length} onChange={handleSelectAll} className="w-4 h-4 rounded border-slate-700 cursor-pointer" />
                </th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('inventory.product', 'المنتج')}</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('inventory.category', 'التصنيف')}</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('inventory.pieces', 'العلبة')}</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('inventory.price', 'السعر')}</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('inventory.systemQty', 'النظام')}</th>
                {isDigitalMode ? (
                  <th className="px-6 py-4 text-sm font-bold text-emerald-400 text-center">{t('inventory.actualQty', 'الكمية')}</th>
                ) : (
                  <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('common.actions', 'إجراءات')}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan="7" className="text-center py-12 text-slate-500">{t('common.loading', 'جاري التحميل...')}</td></tr>
              ) : displayProducts.length === 0 ? (
                <tr><td colSpan="7" className="text-center py-12 text-slate-500">{t('common.noResults', 'لا توجد نتائج')}</td></tr>
              ) : (
                displayProducts.map(item => (
                  <tr key={item.id} className={`border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors ${selectedItems.has(item.id) ? 'bg-blue-900/10' : ''}`}>
                    <td className="px-4 py-4 text-center">
                      <input type="checkbox" checked={selectedItems.has(item.id)} onChange={() => handleSelectItem(item.id)} className="w-4 h-4 rounded cursor-pointer" />
                    </td>
                    <td className="px-6 py-4 font-bold text-white cursor-pointer" onClick={() => handleSelectItem(item.id)}>{item.name}</td>
                    <td className="px-6 py-4 text-center text-xs text-slate-400">
                      <span className="bg-slate-950 px-2 py-1 rounded border border-slate-700">{item.familyName}</span>
                      <span className="mx-1">/</span>
                      <span className="bg-slate-950 px-2 py-1 rounded border border-slate-700">{item.typeName}</span>
                    </td>
                    <td className="px-6 py-4 text-center font-medium text-slate-300">{item.pieces_per_box}</td>
                    <td className="px-6 py-4 text-center font-bold text-amber-400">{item.price.toLocaleString()}</td>
                    <td className="px-6 py-4 text-center font-bold text-slate-300">{item.system_qty}</td>
                    
                    {isDigitalMode ? (
                      <td className="px-6 py-2 text-center bg-emerald-950/20">
                        <div className="flex items-center justify-center gap-2">
                          <input type="number" 
                                 value={actualQuantities[item.id] !== undefined ? actualQuantities[item.id] : ''} 
                                 onChange={(e) => setActualQuantities({ ...actualQuantities, [item.id]: e.target.value })}
                                 placeholder={t('common.enterValue', 'أدخل')} 
                                 className="w-16 bg-slate-950 border border-emerald-900/50 rounded-lg px-1 py-1.5 text-center text-white focus:outline-none focus:border-emerald-500 font-bold" />
                          
                          <button onClick={() => handleSaveSingleDigitalQty(item)} className="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-bold text-xs flex items-center gap-1 transition-colors">
                             <Check size={14} /> {t('common.save', 'حفظ')}
                          </button>

                          <button onClick={() => handleClearSingleDigitalQty(item)} className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-bold text-xs flex items-center gap-1 transition-colors border border-slate-600">
                             <Eraser size={14} /> {t('inventory.clearQty', 'تفريغ')}
                          </button>
                        </div>
                      </td>
                    ) : (
                      <td className="px-6 py-4 text-center flex justify-center gap-2">
                        <button onClick={() => { setEditingProduct(item); setIsModalOpen(true); }} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors" title={t('common.edit', 'تعديل')}><Edit size={18} /></button>
                        <button onClick={() => setItemToDelete({ kind: 'product', id: item.id })} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors" title={t('common.delete', 'حذف')}><Trash2 size={18} /></button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingProduct(null); setEditingCategoryId(null); setEditingDictName(null); setNewDictNameValue(''); }} title={editingProduct ? t('inventory.editProductTitle', 'تعديل منتج') : modalMode === 'edit-family' ? t('inventory.editFamilyTitle', 'تعديل عائلة') : modalMode === 'edit-type' ? t('inventory.editTypeTitle', 'تعديل نوع') : modalMode === 'family' ? t('inventory.addFamilyTitle', 'إضافة عائلة') : modalMode === 'type' ? t('inventory.addTypeTitle', 'إضافة نوع') : t('inventory.addProductTitle', 'إضافة منتج')}>
        <form onSubmit={handleSubmit} className="p-4 space-y-4" dir={isRTL ? "rtl" : "ltr"}>
          
          {editingProduct ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('common.name', 'الاسم')}</label>
                <input type="text" required value={editingProduct.name} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('inventory.pieces', 'العلبة')}</label>
                  <input type="number" min="1" required value={editingProduct.pieces_per_box} onChange={(e) => setEditingProduct({ ...editingProduct, pieces_per_box: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('inventory.price', 'السعر')}</label>
                  <input type="number" min="0" required value={editingProduct.price} onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('inventory.systemQty', 'الكمية في النظام')}</label>
                <input type="number" min="0" required value={editingProduct.system_qty} onChange={(e) => setEditingProduct({ ...editingProduct, system_qty: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" />
              </div>
            </div>
          ) : (
            <>
              {(modalMode === 'type' || modalMode === 'product') && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('inventory.family', 'العائلة')}</label>
                    <select required value={modalMode === 'type' ? typeData.familyId : productForm.familyId || ''} 
                            onChange={(e) => {
                              if(modalMode === 'type') setTypeData({...typeData, familyId: e.target.value});
                              else {
                                setProductForm({...productForm, familyId: e.target.value, typeId: ''});
                                setSelectedProductDetails({});
                                setEditingDictName(null);
                              }
                            }} 
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none">
                      <option value="" disabled className="bg-slate-900">-- {t('inventory.selectFamily', 'اختر العائلة')} --</option>
                      {treeData.map(f => <option key={f.id} value={f.id} className="bg-slate-900 text-white">{f.name}</option>)}
                    </select>
                  </div>

                  {modalMode === 'product' && (
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('inventory.type', 'نوع المنتج')}</label>
                      <select required value={productForm.typeId} onChange={(e) => { setProductForm({...productForm, typeId: e.target.value}); setSelectedProductDetails({}); setEditingDictName(null); }} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none" disabled={!productForm.familyId}>
                        <option value="" disabled className="bg-slate-900">-- {t('inventory.selectType', 'اختر النوع')} --</option>
                        {treeData.find(f => String(f.id) === String(productForm.familyId))?.types.map(t => (
                          <option key={t.id} value={t.id} className="bg-slate-900 text-white">{t.name}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              )}

              {modalMode === 'product' ? (
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2 text-start">{t('inventory.selectNamesAndPrices', 'اختر المنتجات وحدد السعر والعلبة لكل واحد:')}</label>
                  
                  <div className="max-h-60 overflow-y-auto border border-slate-700 rounded-lg p-3 bg-slate-900 space-y-3 text-start">
                    {(invNamesDict[productForm.typeId] || []).map(n => {
                        const isChecked = selectedProductDetails[n] !== undefined;
                        const isEditingThis = editingDictName === n;

                        return (
                          <div key={n} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                            
                            {/* 🌟 واجهة تعديل الاسم داخلياً (Inline Edit) */}
                            {isEditingThis ? (
                              <div className="flex items-center gap-2 w-full">
                                <input 
                                  type="text" 
                                  autoFocus
                                  value={newDictNameValue} 
                                  onChange={(e) => setNewDictNameValue(e.target.value)} 
                                  className="w-full bg-slate-900 border border-blue-500 rounded px-2 py-1.5 text-white text-sm focus:outline-none" 
                                />
                                <button type="button" onClick={(e) => handleSaveEditDictName(e, n)} className="text-emerald-400 p-1.5 bg-emerald-400/10 hover:bg-emerald-400 hover:text-white transition-colors rounded">
                                  <Check size={16}/>
                                </button>
                                <button type="button" onClick={() => setEditingDictName(null)} className="text-slate-400 p-1.5 bg-slate-800 hover:bg-slate-700 hover:text-white transition-colors rounded">
                                  <X size={16}/>
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center justify-between w-full md:w-auto flex-1">
                                <label className="flex items-center gap-2 text-white cursor-pointer select-none">
                                    <input type="checkbox" checked={isChecked} onChange={() => {
                                      if (isChecked) {
                                        const copy = { ...selectedProductDetails };
                                        delete copy[n];
                                        setSelectedProductDetails(copy);
                                      } else {
                                        setSelectedProductDetails({ ...selectedProductDetails, [n]: { price: 0, pieces: 1 } });
                                      }
                                    }} className="w-4 h-4 rounded border-slate-600 cursor-pointer" /> 
                                    <span className="text-sm font-bold truncate max-w-[150px] sm:max-w-xs">{n}</span>
                                </label>
                                
                                {/* 🌟 أزرار التعديل والحذف لاسم القاموس */}
                                <div className="flex items-center gap-1 ms-2">
                                  <button type="button" onClick={(e) => { e.stopPropagation(); setEditingDictName(n); setNewDictNameValue(n); }} className="text-blue-400 hover:bg-blue-400/10 p-1.5 rounded transition-colors" title={t('common.edit', 'تعديل')}>
                                    <Edit size={14}/>
                                  </button>
                                  <button type="button" onClick={(e) => handleDeleteDictName(e, n)} className="text-red-400 hover:bg-red-400/10 p-1.5 rounded transition-colors" title={t('common.delete', 'حذف')}>
                                    <Trash2 size={14}/>
                                  </button>
                                </div>
                              </div>
                            )}

                            {/* الحقول الخاصة بالسعر والعلبة */}
                            {isChecked && !isEditingThis && (
                                <div className="flex items-center gap-2 w-full md:w-auto mt-2 md:mt-0 border-t border-slate-800 pt-2 md:pt-0 md:border-t-0 md:border-s md:ps-3">
                                  <div>
                                    <span className="text-[10px] text-slate-400 block">{t('inventory.price', 'السعر')}</span>
                                    <input type="number" min="0" value={selectedProductDetails[n].price} onChange={(e) => {
                                        setSelectedProductDetails({
                                          ...selectedProductDetails,
                                          [n]: { ...selectedProductDetails[n], price: e.target.value }
                                        });
                                    }} placeholder={t('inventory.price', 'السعر')} className="w-24 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-sm focus:outline-none focus:border-blue-500" />
                                  </div>
                                  <div>
                                    <span className="text-[10px] text-slate-400 block">{t('inventory.pieces', 'العلبة')}</span>
                                    <input type="number" min="1" value={selectedProductDetails[n].pieces} onChange={(e) => {
                                        setSelectedProductDetails({
                                          ...selectedProductDetails,
                                          [n]: { ...selectedProductDetails[n], pieces: e.target.value }
                                        });
                                    }} placeholder={t('inventory.pieces', 'العلبة')} className="w-20 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-sm focus:outline-none focus:border-blue-500" />
                                  </div>
                                </div>
                            )}
                          </div>
                        );
                    })}
                    {(!productForm.typeId) && <div className="text-center text-slate-500 text-sm py-4">{t('inventory.selectTypeFirst', 'يرجى اختيار العائلة والنوع أولاً')}</div>}
                    {(productForm.typeId && (invNamesDict[productForm.typeId] || []).length === 0) && <div className="text-center text-slate-500 text-sm py-4">{t('inventory.emptyDict', 'القائمة فارغة لهذا النوع، اضغط على زر + إسم لإضافة أسماء')}</div>}
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('common.name', 'الاسم')}</label>
                  <input type="text" required 
                         value={modalMode.includes('family') ? familyName : typeData.name} 
                         onChange={(e) => {
                           if(modalMode.includes('family')) setFamilyName(e.target.value);
                           else setTypeData({...typeData, name: e.target.value});
                         }} 
                         className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none" placeholder="..." />
                </div>
              )}
            </>
          )}

          <div className="pt-4 flex justify-end gap-3 mt-4">
            <button type="button" onClick={() => { setIsModalOpen(false); setEditingProduct(null); setEditingCategoryId(null); setEditingDictName(null); setNewDictNameValue(''); }} className="px-4 py-2 rounded-lg font-medium text-slate-300 hover:bg-slate-800">{t('common.cancel', 'إلغاء')}</button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">{t('common.save', 'حفظ')}</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isNameDictModalOpen} onClose={() => setIsNameDictModalOpen(false)} title={t('inventory.addNameTitle', 'إضافة أسماء للقاموس')}>
        <form onSubmit={saveNamesToDict} className="p-4 space-y-4" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('inventory.family', 'العائلة')}</label>
              <select required value={dictSelection.familyId} onChange={(e) => setDictSelection({ familyId: e.target.value, typeId: '' })} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none">
                <option value="" disabled className="bg-slate-900 text-slate-400">-- {t('inventory.selectFamily', 'اختر العائلة')} --</option>
                {treeData.map(f => <option key={f.id} value={f.id} className="bg-slate-900 text-white">{f.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('inventory.type', 'نوع المنتج')}</label>
              <select required value={dictSelection.typeId} onChange={(e) => setDictSelection({...dictSelection, typeId: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none" disabled={!dictSelection.familyId}>
                <option value="" disabled className="bg-slate-900 text-slate-400">-- {t('inventory.selectType', 'اختر النوع')} --</option>
                {treeData.find(f => String(f.id) === String(dictSelection.familyId))?.types.map(tOption => (
                  <option key={tOption.id} value={tOption.id} className="bg-slate-900 text-white">{tOption.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2 text-start">
              {t('inventory.namesDictHint', 'أدخل أسماء المنتجات (كل منتج في سطر جديد)')}
            </label>
            <textarea required value={dictInput} onChange={(e) => setDictInput(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 min-h-[150px] leading-relaxed" 
                      placeholder={t('inventory.namesPlaceholder', 'البراف\nفافو\nعادي\n...')} />
          </div>
          <div className="pt-2 flex justify-end gap-3">
            <button type="button" onClick={() => setIsNameDictModalOpen(false)} className="px-4 py-2 rounded-lg font-medium text-slate-300 hover:bg-slate-800">{t('common.cancel', 'إلغاء')}</button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">{t('common.save', 'حفظ')}</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isMarketModalOpen} onClose={() => setIsMarketModalOpen(false)} title={t('inventory.marketDbTitle', 'استيراد قاعدة السوق')} maxWidth="max-w-5xl">
        <div className="p-4" dir={isRTL ? 'rtl' : 'ltr'}>
          <p className="text-slate-400 mb-4 text-sm text-start">
            {t('inventory.marketDbDesc', 'اختر العائلة المناسبة لكل نوع ليتم استيراد منتجاتها تلقائياً. الأنواع المتروكة (تجاهل) لن يتم استيرادها.')}
          </p>
          
          <div className="max-h-[50vh] overflow-y-auto border border-slate-800 rounded-lg bg-slate-900">
            <table className="w-full text-sm text-start text-slate-300">
              <thead className="bg-slate-950/80 border-b border-slate-800 sticky top-0">
                 <tr>
                   <th className="p-3 text-start w-1/4">{t('inventory.type', 'نوع المنتج')}</th>
                   <th className="p-3 text-start w-1/2">{t('inventory.productsList', 'المنتجات')}</th>
                   <th className="p-3 text-start w-1/4">{t('inventory.assignToFamily', 'تعيين لعائلة')}</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                 {Object.entries(ALGERIAN_MARKET_DATA).map(([typeKey, data]) => (
                    <tr key={typeKey} className="hover:bg-slate-800/30">
                       <td className="p-3 font-bold text-white whitespace-nowrap">{data[currentLang]}</td>
                       <td className="p-3 text-xs text-slate-400 leading-relaxed">{data.items.join('، ')}</td>
                       <td className="p-3">
                          <select 
                             value={marketMapping[typeKey] || ''}
                             onChange={(e) => setMarketMapping({ ...marketMapping, [typeKey]: e.target.value })}
                             className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1.5 text-white focus:outline-none focus:border-purple-500 text-xs"
                          >
                             <option value="" className="bg-slate-900 text-slate-400">-- {t('common.ignore', 'تجاهل')} --</option>
                             {treeData.map(f => <option key={f.id} value={f.id} className="bg-slate-900 text-white">{f.name}</option>)}
                          </select>
                       </td>
                    </tr>
                 ))}
              </tbody>
            </table>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-800 flex justify-between items-center">
             <span className="text-xs text-slate-500">
               {t('inventory.selectedTypes', 'الأنواع المحددة:')} <strong className="text-purple-400">{Object.values(marketMapping).filter(v => v !== '').length}</strong>
             </span>
             <div className="flex gap-2">
               <button onClick={() => setIsMarketModalOpen(false)} className="px-4 py-2 rounded-lg font-medium text-slate-300 hover:bg-slate-800">{t('common.cancel', 'إلغاء')}</button>
               <button onClick={handleImportMarketData} disabled={isLoading} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-bold shadow-lg disabled:opacity-50 flex items-center gap-2">
                 {isLoading ? t('common.loading', 'جاري...') : <><Download size={16}/> {t('common.save', 'حفظ')}</>}
               </button>
             </div>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isPrintModalOpen} onClose={() => setIsPrintModalOpen(false)} title={t('inventory.printOptions', 'خيارات الطباعة')}>
        <div className="p-6 flex flex-col gap-4 text-start" dir={isRTL ? 'rtl' : 'ltr'}>
          <p className="text-slate-400 mb-4 text-center">{t('inventory.printDesc', 'اختر مقاس الورق المناسب لطباعة القائمة.')}</p>
          
          <button onClick={handleDownloadWordA4} className="w-full flex items-center justify-between p-4 bg-indigo-600/10 hover:bg-indigo-600 border border-indigo-500/50 hover:border-indigo-500 rounded-xl transition-all text-indigo-400 hover:text-white font-bold group">
            <div className="flex items-center gap-4">
              <Download size={24} className="text-indigo-400 group-hover:text-white" />
              <div className="text-start">
                <div className="text-lg">{t('inventory.printA4', 'تحميل ملف Word (A4)')}</div>
                <div className="text-xs font-normal opacity-80 mt-1">{t('inventory.printA4Desc', 'مستند وورد مقسوم على عمودين لتوفير المساحة')}</div>
              </div>
            </div>
            <FileText size={20} />
          </button>

          <button onClick={handlePrintA7} className="w-full flex items-center justify-between p-4 bg-emerald-600/10 hover:bg-emerald-600 border border-emerald-500/50 hover:border-emerald-500 rounded-xl transition-all text-emerald-500 hover:text-white font-bold group">
            <div className="flex items-center gap-4">
              <Printer size={24} className="text-emerald-400 group-hover:text-white" />
              <div className="text-start">
                <div className="text-lg">{t('inventory.printA7', 'ورقة جرد حرارية (80mm)')}</div>
                <div className="text-xs font-normal opacity-80 mt-1">{t('inventory.printA7Desc', 'جرد سريع للمنطقة المحددة (طابعة الكاشير)')}</div>
              </div>
            </div>
            <Printer size={20} />
          </button>
        </div>
      </Modal>

      <ConfirmAlert isOpen={!!itemToDelete} onClose={() => setItemToDelete(null)} onConfirm={executeDelete} title={t('common.confirmDelete', 'تأكيد الحذف')} message={t('inventory.deleteWarning', 'هل أنت متأكد من الحذف؟')} confirmText={t('common.confirm', 'تأكيد')} cancelText={t('common.cancel', 'إلغاء')} />
    </div>
  );
}