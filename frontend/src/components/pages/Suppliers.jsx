import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel, flexRender } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import useSupplierStore from '../../store/supplierStore';
import useEmployeeStore from '../../store/employeeStore'; 
import Modal from '../ui/Modal';
import { Plus, Search, ArrowUpDown, ArrowRight, ArrowLeft, FileText, Banknote, ArrowUpRight, ArrowDownRight, Calendar, Eye, Edit, Trash2, Upload } from 'lucide-react';

export default function Suppliers() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const navigate = useNavigate();
  
  const { employees, fetchEmployees } = useEmployeeStore();
  const { suppliers, fetchSuppliers, addSupplier, updateSupplier, deleteSupplier, currentSupplier, fetchSupplierDetails, clearCurrentSupplier, addReceipt, addPayment } = useSupplierStore();
  
  const [globalFilter, setGlobalFilter] = useState('');
  
  // حالات النوافذ (Modals)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [supplierToDelete, setSupplierToDelete] = useState(null);

  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState('receipt'); 
  const [editingTransactionId, setEditingTransactionId] = useState(null); 
  const [transactionToDelete, setTransactionToDelete] = useState(null); // 🔴 حالة جديدة لحذف المعاملات

  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  // حالات البيانات (Forms)
  const [formData, setFormData] = useState({ name: '', phone: '', initialDebt: 0 });
  const [transactionData, setTransactionData] = useState({ amount: '', date: new Date().toISOString().split('T')[0], note: '', caisseSource: '' });
  const [scheduleData, setScheduleData] = useState({ amount: '', date: new Date().toISOString().split('T')[0], time: '10:00', note: '' });

  useEffect(() => { fetchSuppliers(); fetchEmployees(); }, []);

  const handlePreview = (type, item) => { navigate('/preview', { state: { type, item, supplierName: currentSupplier.name } }); };

  const handleSaveSupplier = async (e) => { 
    e.preventDefault(); 
    let res;
    if (editingSupplier) {
      res = await updateSupplier(editingSupplier.id, formData);
    } else {
      res = await addSupplier(formData); 
    }

    if (res && (res === true || res.success)) { 
      setIsAddModalOpen(false); 
      setEditingSupplier(null);
      setFormData({ name: '', phone: '', initialDebt: 0 }); 
      fetchSuppliers();
    } else {
      alert(t('suppliers.messages.saveError'));
      setTimeout(() => window.focus(), 100);
    }
  };

  const openEditSupplierModal = (supplier) => {
    setEditingSupplier(supplier);
    setFormData({ name: supplier.name, phone: supplier.phone || '', initialDebt: supplier.initial_debt || 0 });
    setIsAddModalOpen(true);
  };

  const confirmDeleteSupplier = (id) => {
    setSupplierToDelete(id);
  };

  const executeDeleteSupplier = async () => {
    if (!supplierToDelete) return;
    const res = await deleteSupplier(supplierToDelete);
    if (res && res.success) {
      fetchSuppliers();
    } else {
      const errorMessage = res?.errorKey ? t(`suppliers.messages.${res.errorKey}`) : t('suppliers.messages.deleteError');
      alert(errorMessage);
      setTimeout(() => window.focus(), 100);
    }
    setSupplierToDelete(null); 
  };

  const openTransactionModal = (type) => {
    setTransactionType(type);
    setEditingTransactionId(null);
    setTransactionData({ amount: '', date: new Date().toISOString().split('T')[0], note: '', caisseSource: '' });
    setIsTransactionModalOpen(true);
  };

  const openEditTransactionModal = (type, item) => {
    setTransactionType(type);
    setEditingTransactionId(item.id);
    setTransactionData({ amount: item.amount, date: item.date, note: item.note || '', caisseSource: item.caisse_source || '' });
    setIsTransactionModalOpen(true);
  };

  const handleSaveTransaction = async (e) => {
    e.preventDefault();
    try {
      if (editingTransactionId) {
        if (transactionType === 'receipt') await window.api.updateReceipt(editingTransactionId, transactionData);
        else await window.api.updatePayment(editingTransactionId, transactionData);
      } else {
        const payload = { ...transactionData, supplierId: currentSupplier.id, amount: Number(transactionData.amount) };
        if (transactionType === 'receipt') await addReceipt(payload);
        else await addPayment(payload);
      }
      setIsTransactionModalOpen(false);
      fetchSupplierDetails(currentSupplier.id); 
      fetchSuppliers(); 
    } catch (error) { console.error("Error saving transaction:", error); }
  };

  // 🔴 دالة لفتح مودال حذف المعاملة المالية
  const handleDeleteTransactionClick = (type, id) => {
    setTransactionToDelete({ type, id });
  };

  // 🔴 التنفيذ الفعلي لحذف المعاملة
  const executeDeleteTransaction = async () => {
    if (!transactionToDelete) return;
    try {
      let res;
      if (transactionToDelete.type === 'receipt') {
        res = await window.api.deleteReceipt(transactionToDelete.id);
      } else {
        res = await window.api.deletePayment(transactionToDelete.id);
      }

      if (res && res.success) {
        fetchSupplierDetails(currentSupplier.id); 
        fetchSuppliers(); 
      } else {
        alert(t('common.error'));
        setTimeout(() => window.focus(), 100);
      }
    } catch (error) { console.error(error); }
    setTransactionToDelete(null);
  };

  const handleImportExcel = async () => {
    try {
      if (window.api && window.api.importSuppliersExcel) {
        const res = await window.api.importSuppliersExcel();
        if (res && res.success) {
          alert(t('suppliers.actions.importSuccess', { count: res.count }));
          setTimeout(() => window.focus(), 100);
          fetchSuppliers(); 
        } else if (res && !res.canceled) {
          alert(t('suppliers.actions.importError') + "\n" + res.error);
          setTimeout(() => window.focus(), 100);
        }
      }
    } catch (error) { console.error(error); }
  };

  const columns = useMemo(() => [
    { accessorKey: 'name', header: ({ column }) => ( <button className="flex items-center gap-2 hover:text-white outline-none transition-colors" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}> {t('suppliers.table.name')} <ArrowUpDown size={14} /> </button> ), cell: (info) => <span className="font-medium text-white">{info.getValue()}</span> },
    { accessorKey: 'phone', header: t('suppliers.table.phone'), cell: (info) => <span className="text-slate-400">{info.getValue() || '-'}</span> },
    { accessorKey: 'total_debt', header: t('suppliers.table.totalDebt'), cell: (info) => { const amount = info.getValue() || 0; return <span className={`font-bold ${amount > 0 ? 'text-red-400' : 'text-emerald-400'}`}>{amount.toLocaleString()} {t('currency')}</span>; } },
    { id: 'status', header: t('suppliers.table.status'), cell: ({ row }) => { const amount = row.original.total_debt || 0; const isClear = amount <= 0; return ( <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${isClear ? 'bg-emerald-950 text-emerald-400 border-emerald-900' : 'bg-red-950 text-red-400 border-red-900'}`}> {isClear ? t('suppliers.status.clear') : t('suppliers.status.indebted')} </span> ); } },
    { 
      id: 'actions', 
      header: t('suppliers.table.actions'), 
      cell: ({ row }) => ( 
        <div className="flex items-center gap-2">
          <button onClick={() => fetchSupplierDetails(row.original.id)} className="p-2 text-blue-400 hover:bg-blue-900/50 rounded-lg transition-colors" title={t('suppliers.actions.view')}>
            <Eye size={18} />
          </button>
          <button onClick={() => openEditSupplierModal(row.original)} className="p-2 text-emerald-400 hover:bg-emerald-900/50 rounded-lg transition-colors" title={t('suppliers.actions.edit')}>
            <Edit size={18} />
          </button>
          <button onClick={() => confirmDeleteSupplier(row.original.id)} className="p-2 text-red-400 hover:bg-red-900/50 rounded-lg transition-colors" title={t('suppliers.actions.delete')}>
            <Trash2 size={18} />
          </button>
        </div>
      ) 
    }, 
  ], [t, fetchSupplierDetails]);

  const table = useReactTable({ data: suppliers, columns, state: { globalFilter }, onGlobalFilterChange: setGlobalFilter, getCoreRowModel: getCoreRowModel(), getFilteredRowModel: getFilteredRowModel(), getSortedRowModel: getSortedRowModel() });
  
  if (currentSupplier) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans relative text-start">
        <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-6 print:hidden">
          <div className="flex items-center gap-4">
            <button onClick={clearCurrentSupplier} className="p-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
              {isRTL ? <ArrowRight size={24} /> : <ArrowLeft size={24} />}
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white">{currentSupplier.name}</h1>
              <p className="text-sm text-slate-500 mt-1">{currentSupplier.phone || '-'}</p>
            </div>
          </div>
          <div className="text-end">
            <p className="text-sm text-slate-400 mb-1">{t('suppliers.table.totalDebt')}</p>
            <h2 className={`text-3xl font-bold ${currentSupplier.total_debt > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
              {currentSupplier.total_debt.toLocaleString()} {t('currency')}
            </h2>
          </div>
        </div>

        <div className="flex gap-4 mb-8 print:hidden">
          <button onClick={() => openTransactionModal('receipt')} className="flex-1 flex items-center justify-center gap-3 bg-slate-900 border border-slate-800 hover:border-red-900 hover:bg-red-950/30 text-white py-4 rounded-xl transition-all shadow-sm">
            <div className="p-2 bg-red-500/20 text-red-400 rounded-lg"><ArrowUpRight size={20} /></div>
            <span className="font-medium text-lg">{t('suppliers.details.addReceipt')}</span>
          </button>
          <button onClick={() => openTransactionModal('payment')} className="flex-1 flex items-center justify-center gap-3 bg-slate-900 border border-slate-800 hover:border-emerald-900 hover:bg-emerald-950/30 text-white py-4 rounded-xl transition-all shadow-sm">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg"><ArrowDownRight size={20} /></div>
            <span className="font-medium text-lg">{t('suppliers.details.addPayment')}</span>
          </button>
          <button onClick={() => setIsScheduleModalOpen(true)} className="flex-1 flex items-center justify-center gap-3 bg-slate-900 border border-slate-800 hover:border-blue-900 hover:bg-blue-950/30 text-white py-4 rounded-xl transition-all shadow-sm">
            <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg"><Calendar size={20} /></div>
            <span className="font-medium text-lg">{t('suppliers.details.schedulePayment')}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 print:hidden">
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-[450px]">
            <div className="p-4 bg-slate-950/50 border-b border-slate-800 flex items-center gap-2">
              <FileText size={18} className="text-slate-400" />
              <h3 className="font-bold text-white">{t('suppliers.details.receipts')}</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {(!currentSupplier.receipts || currentSupplier.receipts.length === 0) ? (
                <div className="text-center p-8 text-slate-500 flex flex-col items-center gap-2"><FileText size={32} className="opacity-20 mb-2" />{t('common.noResults')}</div>
              ) : (
                currentSupplier.receipts.map(r => (
                  <div key={r.id} className="p-4 border border-slate-800 rounded-lg bg-slate-950 hover:border-slate-700 transition-colors flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm text-slate-400">{r.date}</span>
                        <span className="font-bold text-red-400">+{r.amount.toLocaleString()} {t('currency')}</span>
                      </div>
                      <p className="text-sm text-slate-300">{r.note || '-'}</p>
                    </div>
                    <div className="flex gap-2 ms-4 border-s border-slate-800 ps-4">
                      <button onClick={() => handlePreview('receipt', r)} className="p-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors border border-slate-800" title="معاينة المستند"><Eye size={18} /></button>
                      <button onClick={() => openEditTransactionModal('receipt', r)} className="p-2 text-blue-400 hover:bg-slate-800 hover:text-blue-300 rounded-lg transition-colors border border-slate-800" title="تعديل"><Edit size={18} /></button>
                      <button onClick={() => handleDeleteTransactionClick('receipt', r.id)} className="p-2 text-red-400 hover:bg-slate-800 hover:text-red-300 rounded-lg transition-colors border border-slate-800" title="حذف"><Trash2 size={18} /></button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-[450px]">
            <div className="p-4 bg-slate-950/50 border-b border-slate-800 flex items-center gap-2">
              <Banknote size={18} className="text-slate-400" />
              <h3 className="font-bold text-white">{t('suppliers.details.payments')}</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {(!currentSupplier.payments || currentSupplier.payments.length === 0) ? (
                <div className="text-center p-8 text-slate-500 flex flex-col items-center gap-2"><Banknote size={32} className="opacity-20 mb-2" />{t('common.noResults')}</div>
              ) : (
                currentSupplier.payments.map(p => (
                  <div key={p.id} className="p-4 border border-slate-800 rounded-lg bg-slate-950 hover:border-slate-700 transition-colors flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm text-slate-400">{p.date} • <span className="text-emerald-500/70">{p.caisse_source}</span></span>
                        <span className="font-bold text-emerald-400">-{p.amount.toLocaleString()} {t('currency')}</span>
                      </div>
                      <p className="text-sm text-slate-300">{p.note || '-'}</p>
                    </div>
                    <div className="flex gap-2 ms-4 border-s border-slate-800 ps-4">
                      <button onClick={() => handlePreview('payment', p)} className="p-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors border border-slate-800" title="معاينة المستند"><Eye size={18} /></button>
                      <button onClick={() => openEditTransactionModal('payment', p)} className="p-2 text-blue-400 hover:bg-slate-800 hover:text-blue-300 rounded-lg transition-colors border border-slate-800" title="تعديل"><Edit size={18} /></button>
                      <button onClick={() => handleDeleteTransactionClick('payment', p.id)} className="p-2 text-red-400 hover:bg-slate-800 hover:text-red-300 rounded-lg transition-colors border border-slate-800" title="حذف"><Trash2 size={18} /></button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <Modal isOpen={isTransactionModalOpen} onClose={() => setIsTransactionModalOpen(false)} title={transactionType === 'receipt' ? (editingTransactionId ? t('expenses.editExpense') : t('suppliers.details.addReceipt')) : (editingTransactionId ? t('expenses.editExpense') : t('suppliers.details.addPayment'))}>
          <form onSubmit={handleSaveTransaction} className="space-y-4 text-start">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t('suppliers.details.amount')} ({t('currency')})</label>
              <input type="number" min="1" required value={transactionData.amount} onChange={e => setTransactionData({...transactionData, amount: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors text-start" />
            </div>
            
            {transactionType === 'payment' && (
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">{t('suppliers.details.caisse')}</label>
                <select required value={transactionData.caisseSource} onChange={e => setTransactionData({...transactionData, caisseSource: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors text-start" dir={isRTL ? "rtl" : "ltr"}>
                  <option value="" disabled>{t('payroll.selectCaisse')}</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.name}>{emp.name} ({t(`hr.roles.${emp.role}`, emp.role)})</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t('suppliers.details.date')}</label>
              <input type="date" required value={transactionData.date} onChange={e => setTransactionData({...transactionData, date: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors text-start" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t('suppliers.details.note')}</label>
              <input type="text" value={transactionData.note} onChange={e => setTransactionData({...transactionData, note: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors text-start" />
            </div>
            <div className="pt-4 flex justify-end gap-3 mt-6">
              <button type="button" onClick={() => setIsTransactionModalOpen(false)} className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors">{t('common.cancel')}</button>
              <button type="submit" className={`px-4 py-2 text-white rounded-lg font-medium transition-colors ${transactionType === 'receipt' ? 'bg-red-600 hover:bg-red-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}>
                {editingTransactionId ? t('expenses.saveChanges') : t('common.success')}
              </button>
            </div>
          </form>
        </Modal>

        <Modal isOpen={isScheduleModalOpen} onClose={() => setIsScheduleModalOpen(false)} title={t('suppliers.modal.scheduleTitle')}>
          <form onSubmit={async (e) => {
            e.preventDefault();
            try {
               await window.api.addAgendaTask({
                 title: t('agenda.scheduledPaymentDesc', { name: currentSupplier.name, amount: scheduleData.amount, date: scheduleData.date }) || `تسديد دفعة لمورد: ${currentSupplier.name}`,
                 type: 'payment',
                 date: scheduleData.date,
                 time: scheduleData.time,
                 amount: Number(scheduleData.amount)
               });
               setIsScheduleModalOpen(false);
               alert(t('common.success'));
               setTimeout(() => window.focus(), 100);
            } catch(error) { console.error(error); }
          }} className="space-y-4 text-start">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t('suppliers.details.amount')} ({t('currency')})</label>
              <input type="number" required value={scheduleData.amount} onChange={e => setScheduleData({...scheduleData, amount: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-start" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t('suppliers.details.date')}</label>
              <input type="date" required value={scheduleData.date} onChange={e => setScheduleData({...scheduleData, date: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-start" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t('suppliers.details.time')} ({t('common.optional')})</label>
              <input type="time" value={scheduleData.time} onChange={e => setScheduleData({...scheduleData, time: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-start" />
            </div>
            <div className="pt-4 flex justify-end gap-3 mt-6">
              <button type="button" onClick={() => setIsScheduleModalOpen(false)} className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg">{t('common.cancel')}</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">{t('suppliers.modal.confirmScheduleBtn')}</button>
            </div>
          </form>
        </Modal>

        {/* 🔴 مودال تأكيد حذف المعاملة المالية */}
        <Modal isOpen={!!transactionToDelete} onClose={() => setTransactionToDelete(null)} title={t('suppliers.actions.delete')}>
          <div className="p-4 text-start">
            <p className="text-white mb-6 text-lg">{t('suppliers.actions.deleteConfirm')}</p>
            <div className="flex items-center justify-end gap-3 mt-4">
              <button onClick={() => setTransactionToDelete(null)} className="px-4 py-2 text-white bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                {t('common.cancel')}
              </button>
              <button onClick={executeDeleteTransaction} className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors">
                {t('suppliers.actions.confirmDeleteBtn')}
              </button>
            </div>
          </div>
        </Modal>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans relative text-start">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">{t('suppliers.title')}</h1>
          <p className="text-sm text-slate-500 mt-1">{t('suppliers.subtitle')}</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleImportExcel} 
            className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-md font-medium hover:bg-emerald-700 transition-colors shadow-sm" 
            title={t('suppliers.actions.importExcelTooltip')}
          >
            <Upload size={18} /><span>{t('suppliers.actions.importExcel')}</span>
          </button>
          
          <button 
            onClick={() => setIsAddModalOpen(true)} 
            className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-slate-200 transition-colors shadow-sm"
          >
            <Plus size={18} /><span>{t('suppliers.addSupplier')}</span>
          </button>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        <div className="p-4 border-b border-slate-800 flex items-center bg-slate-950/30">
          <div className="relative w-full max-w-md">
            <Search size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" value={globalFilter ?? ''} onChange={e => setGlobalFilter(e.target.value)} placeholder={t('suppliers.searchPlaceholder')} className="w-full bg-slate-900 border border-slate-700 rounded-lg ps-10 pe-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors shadow-inner text-start" dir={isRTL ? "rtl" : "ltr"} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-start border-collapse" dir={i18n.dir()}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="border-b border-slate-800 bg-slate-950/80">
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className={`px-6 py-4 text-sm font-medium text-slate-400 whitespace-nowrap text-start`}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-6 py-4 text-sm whitespace-nowrap text-start">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {table.getRowModel().rows.length === 0 && (
          <div className="p-12 flex flex-col items-center justify-center text-slate-500"><Search size={48} className="opacity-20 mb-4" /><p>{t('common.noResults')}</p></div>
        )}
      </div>

      <Modal isOpen={isAddModalOpen} onClose={() => { setIsAddModalOpen(false); setEditingSupplier(null); }} title={editingSupplier ? t('suppliers.messages.editTitle') : t('suppliers.addSupplier')}>
        <form onSubmit={handleSaveSupplier} className="space-y-4 text-start">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">{t('suppliers.modal.nameLabel')}</label>
            <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors text-start" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">{t('suppliers.modal.phoneLabel')}</label>
            <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors text-start" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">{t('suppliers.modal.debtLabel')}</label>
            <input type="number" min="0" required value={formData.initialDebt} onChange={e => setFormData({...formData, initialDebt: Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors text-start" />
          </div>
          <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-slate-800">
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors font-medium">{t('suppliers.modal.cancelBtn')}</button>
            <button type="submit" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-md">{t('suppliers.modal.saveBtn')}</button>
          </div>
        </form>
      </Modal>
    
      {/* 🔴 مودال تأكيد حذف المورد */}
      <Modal isOpen={!!supplierToDelete} onClose={() => setSupplierToDelete(null)} title={t('suppliers.actions.delete')}>
        <div className="p-4 text-start">
          <p className="text-white mb-6 text-lg">{t('suppliers.actions.deleteConfirm')}</p>
          <div className="flex items-center justify-end gap-3 mt-4">
            <button onClick={() => setSupplierToDelete(null)} className="px-4 py-2 text-white bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
              {t('common.cancel')}
            </button>
            <button onClick={executeDeleteSupplier} className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors">
              {t('suppliers.actions.confirmDeleteBtn')}
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}