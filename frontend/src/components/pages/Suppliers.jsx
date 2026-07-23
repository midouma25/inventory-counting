import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  useReactTable, 
  getCoreRowModel, 
  getFilteredRowModel, 
  getSortedRowModel, 
  flexRender 
} from '@tanstack/react-table';
import { 
  Plus, Search, ArrowUpDown, ArrowRight, ArrowLeft, 
  FileText, Banknote, ArrowUpRight, ArrowDownRight, MoreHorizontal, Calendar 
} from 'lucide-react';

import useSupplierStore from '../../../store/supplierStore';
import useEmployeeStore from '../../../store/employeeStore'; 
import Modal from '../ui/Modal';

export default function Suppliers() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  
  const { 
    suppliers, fetchSuppliers, addSupplier, 
    currentSupplier, fetchSupplierDetails, clearCurrentSupplier,
    addReceipt, addPayment
  } = useSupplierStore();

  const { employees, fetchEmployees } = useEmployeeStore();

  const [globalFilter, setGlobalFilter] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({ name: '', phone: '', initialDebt: 0 });
  const [transactionData, setTransactionData] = useState({ 
    amount: '', 
    date: new Date().toISOString().split('T')[0], 
    note: '', 
    caisseSource: '' 
  });
  const [scheduleData, setScheduleData] = useState({ 
    amount: '', 
    date: new Date().toISOString().split('T')[0], 
    time: '10:00',
    note: '' 
  });

  useEffect(() => {
    fetchSuppliers();
    fetchEmployees(); 
  }, [fetchSuppliers, fetchEmployees]);

  const handleSaveSupplier = async (e) => {
    e.preventDefault();
    const success = await addSupplier(formData);
    if (success) {
      setIsAddModalOpen(false);
      setFormData({ name: '', phone: '', initialDebt: 0 });
    }
  };

  const handleSaveReceipt = async (e) => {
    e.preventDefault();
    const payload = { ...transactionData, supplierId: currentSupplier.id, amount: Number(transactionData.amount) };
    const success = await addReceipt(payload);
    if (success) setIsReceiptModalOpen(false);
  };

  const handleSavePayment = async (e) => {
    e.preventDefault();
    const payload = { ...transactionData, supplierId: currentSupplier.id, amount: Number(transactionData.amount) };
    const success = await addPayment(payload);
    if (success) setIsPaymentModalOpen(false);
  };

  const handleSchedulePayment = async (e) => {
    e.preventDefault();
    const taskData = {
      title: `${t('agenda.scheduledPaymentTitle')} ${currentSupplier.name}`,
      type: 'payment',
      date: scheduleData.date,
      time: scheduleData.time,
      task_date: scheduleData.date, // إضافة ضرورية للباك إند
      task_time: scheduleData.time, // إضافة ضرورية للباك إند
      amount: Number(scheduleData.amount),
    };
    try {
      if (window.api && window.api.addAgendaTask) {
        await window.api.addAgendaTask(taskData);
        setIsScheduleModalOpen(false);
        setScheduleData({ amount: '', date: new Date().toISOString().split('T')[0], time: '10:00', note: '' });
        alert(t('common.success'));
      }
    } catch (error) {
      console.error("Error scheduling payment:", error);
      alert(t('common.errorScheduling'));
    }
  };

  const openTransactionModal = (type) => {
    setTransactionData({ amount: '', date: new Date().toISOString().split('T')[0], note: '', caisseSource: '' });
    if (type === 'receipt') setIsReceiptModalOpen(true);
    else setIsPaymentModalOpen(true);
  };

  const columns = useMemo(() => [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <button className="flex items-center gap-2 hover:text-white outline-none transition-colors" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          {t('suppliers.table.name')} <ArrowUpDown size={14} />
        </button>
      ),
      cell: (info) => <span className="font-medium text-white">{info.getValue()}</span>,
    },
    {
      accessorKey: 'phone',
      header: t('suppliers.table.phone'),
      cell: (info) => <span className="text-slate-400">{info.getValue() || '-'}</span>,
    },
    {
      accessorKey: 'total_debt',
      header: t('suppliers.table.totalDebt'),
      cell: (info) => {
        const amount = info.getValue() || 0;
        return <span className={`font-bold ${amount > 0 ? 'text-red-400' : 'text-emerald-400'}`}>{amount.toLocaleString()} DA</span>;
      },
    },
    {
      id: 'status',
      header: t('suppliers.table.status'),
      cell: ({ row }) => {
        const amount = row.original.total_debt || 0;
        const isClear = amount <= 0;
        return (
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${isClear ? 'bg-emerald-950 text-emerald-400 border-emerald-900' : 'bg-red-950 text-red-400 border-red-900'}`}>
            {isClear ? t('suppliers.status.clear') : t('suppliers.status.indebted')}
          </span>
        );
      },
    },
    {
      id: 'actions',
      header: t('suppliers.table.actions'),
      cell: ({ row }) => (
        <button onClick={() => fetchSupplierDetails(row.original.id)} className="text-xs bg-blue-600/20 text-blue-400 border border-blue-900/50 px-4 py-1.5 rounded hover:bg-blue-600 hover:text-white transition-colors">
          {t('suppliers.actions.view')}
        </button>
      ),
    },
  ], [t, fetchSupplierDetails]);

  const table = useReactTable({
    data: suppliers, columns, state: { globalFilter }, onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(), getFilteredRowModel: getFilteredRowModel(), getSortedRowModel: getSortedRowModel(),
  });

  if (currentSupplier) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans relative">
        <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-6">
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
              {currentSupplier.total_debt.toLocaleString()} DA
            </h2>
          </div>
        </div>

        <div className="flex gap-4 mb-8">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  <div key={r.id} className="p-4 border border-slate-800 rounded-lg bg-slate-950 hover:border-slate-700 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm text-slate-400">{r.date}</span>
                      <span className="font-bold text-red-400">+{r.amount.toLocaleString()} DA</span>
                    </div>
                    <p className="text-sm text-slate-300">{r.note || '-'}</p>
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
                  <div key={p.id} className="p-4 border border-slate-800 rounded-lg bg-slate-950 hover:border-slate-700 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm text-slate-400">{p.date} • <span className="text-emerald-500/70"> {t('suppliers.details.caisseLabel')} {p.caisse_source}</span></span>
                      <span className="font-bold text-emerald-400">-{p.amount.toLocaleString()} DA</span>
                    </div>
                    <p className="text-sm text-slate-300">{p.note || '-'}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <Modal isOpen={isReceiptModalOpen} onClose={() => setIsReceiptModalOpen(false)} title={t('suppliers.details.addReceipt')}>
          <form onSubmit={handleSaveReceipt} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t('suppliers.details.amount')} (DA)</label>
              <input type="number" min="1" required value={transactionData.amount} onChange={e => setTransactionData({...transactionData, amount: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500 transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t('suppliers.details.date')}</label>
              <input type="date" required value={transactionData.date} onChange={e => setTransactionData({...transactionData, date: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500 transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t('suppliers.details.note')}</label>
              <input type="text" value={transactionData.note} onChange={e => setTransactionData({...transactionData, note: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500 transition-colors" />
            </div>
            <div className="pt-4 flex justify-end gap-3 mt-6">
              <button type="button" onClick={() => setIsReceiptModalOpen(false)} className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors">{t('suppliers.modal.cancelBtn')}</button>
              <button type="submit" className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors">{t('suppliers.details.addReceipt')}</button>
            </div>
          </form>
        </Modal>

        <Modal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} title={t('suppliers.details.addPayment')}>
          <form onSubmit={handleSavePayment} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t('suppliers.details.amount')} (DA)</label>
              <input type="number" min="1" max={currentSupplier.total_debt > 0 ? currentSupplier.total_debt : undefined} required value={transactionData.amount} onChange={e => setTransactionData({...transactionData, amount: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t('suppliers.details.caisse')}</label>
              <select required value={transactionData.caisseSource} onChange={e => setTransactionData({...transactionData, caisseSource: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors" dir={isRTL ? "rtl" : "ltr"}>
                <option value="" disabled>{t('suppliers.modal.selectEmployee')}</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.name}>{emp.name} ({emp.role})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t('suppliers.details.date')}</label>
              <input type="date" required value={transactionData.date} onChange={e => setTransactionData({...transactionData, date: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t('suppliers.details.note')}</label>
              <input type="text" value={transactionData.note} onChange={e => setTransactionData({...transactionData, note: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors" />
            </div>
            <div className="pt-4 flex justify-end gap-3 mt-6">
              <button type="button" onClick={() => setIsPaymentModalOpen(false)} className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors">{t('suppliers.modal.cancelBtn')}</button>
              <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors">{t('suppliers.details.addPayment')}</button>
            </div>
          </form>
        </Modal>

        <Modal isOpen={isScheduleModalOpen} onClose={() => setIsScheduleModalOpen(false)} title={t('suppliers.modal.scheduleTitle')}>
          <form onSubmit={handleSchedulePayment} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t('suppliers.details.amount')} (DA)</label>
              <input type="number" min="1" max={currentSupplier.total_debt > 0 ? currentSupplier.total_debt : undefined} required value={scheduleData.amount} onChange={e => setScheduleData({...scheduleData, amount: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">{t('suppliers.details.date')}</label>
                <input type="date" required value={scheduleData.date} onChange={e => setScheduleData({...scheduleData, date: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">{t('suppliers.details.time')}</label>
<input 
  type="time" 
  value={scheduleData.time} 
  onChange={e => setScheduleData({...scheduleData, time: e.target.value})} 
  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors" 
/>              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t('suppliers.details.note')}</label>
              <input type="text" value={scheduleData.note} onChange={e => setScheduleData({...scheduleData, note: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder={t('suppliers.modal.notePlaceholder')} />
            </div>
            <div className="pt-4 flex justify-end gap-3 mt-6">
              <button type="button" onClick={() => setIsScheduleModalOpen(false)} className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors">{t('suppliers.modal.cancelBtn')}</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">{t('suppliers.modal.confirmScheduleBtn')}</button>
            </div>
          </form>
        </Modal>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans relative">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">{t('suppliers.title')}</h1>
          <p className="text-sm text-slate-500 mt-1">{t('suppliers.subtitle')}</p>
        </div>
        <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-slate-200 transition-colors shadow-sm">
          <Plus size={18} /><span>{t('suppliers.addSupplier')}</span>
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        <div className="p-4 border-b border-slate-800 flex items-center bg-slate-950/30">
          <div className="relative w-full max-w-md">
            <Search size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" value={globalFilter ?? ''} onChange={e => setGlobalFilter(e.target.value)} placeholder={t('suppliers.searchPlaceholder')} className="w-full bg-slate-900 border border-slate-700 rounded-lg ps-10 pe-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors shadow-inner" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" dir={i18n.dir()}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="border-b border-slate-800 bg-slate-950/80">
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className={`px-6 py-4 text-sm font-medium text-slate-400 whitespace-nowrap ${isRTL ? 'text-right' : 'text-left'}`}>
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
                    <td key={cell.id} className="px-6 py-4 text-sm whitespace-nowrap">
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

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title={t('suppliers.addSupplier')}>
        <form onSubmit={handleSaveSupplier} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">{t('suppliers.modal.nameLabel')}</label>
            <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">{t('suppliers.modal.phoneLabel')}</label>
            <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">{t('suppliers.modal.debtLabel')}</label>
            <input type="number" min="0" required value={formData.initialDebt} onChange={e => setFormData({...formData, initialDebt: Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors" />
          </div>
          <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-slate-800">
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors font-medium">{t('suppliers.modal.cancelBtn')}</button>
            <button type="submit" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-md">{t('suppliers.modal.saveBtn')}</button>
          </div>
        </form>
      </Modal>

    </div>
  );
}