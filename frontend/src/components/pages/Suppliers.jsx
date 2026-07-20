import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  useReactTable, 
  getCoreRowModel, 
  getFilteredRowModel,
  getSortedRowModel,
  flexRender 
} from '@tanstack/react-table';
import { Plus, Search, MoreHorizontal, ArrowUpDown } from 'lucide-react';
import Modal from '../ui/Modal';

export default function Suppliers() {
  const { t } = useTranslation();
  
  const [suppliers, setSuppliers] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        if (window.api && window.api.getSuppliers) {
          const data = await window.api.getSuppliers();
          setSuppliers(data);
        } else {
          console.warn("API is not available. Are you running in Electron?");
        }
      } catch (error) {
        console.error("Failed to fetch suppliers:", error);
      }
    };
    fetchSuppliers();
  }, []);

  const handleAddSupplier = async (e) => {
    e.preventDefault();
    const newSupplier = {
      name: e.target[0].value,
      phone: e.target[1].value,
      totalDebt: parseFloat(e.target[2].value) || 0
    };

    try {
      if (window.api && window.api.addSupplier) {
        const addedSupplier = await window.api.addSupplier(newSupplier);
        setSuppliers(prev => [addedSupplier, ...prev]);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error adding supplier:", error);
    }
  };

  const columns = useMemo(() => [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <button 
          className="flex items-center gap-2 hover:text-white transition-colors"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {t('suppliers.table.name')}
          <ArrowUpDown size={14} />
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
      accessorKey: 'totalDebt',
      header: t('suppliers.table.totalDebt'),
      cell: (info) => {
        const amount = info.getValue();
        return (
          <span className={`font-bold ${amount > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
            {amount.toLocaleString()} DA
          </span>
        );
      },
    },
    {
      id: 'status',
      header: t('suppliers.table.status'),
      cell: ({ row }) => {
        const amount = row.original.totalDebt;
        const isClear = amount === 0;
        return (
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
            isClear 
              ? 'bg-emerald-950 text-emerald-400 border border-emerald-900' 
              : 'bg-red-950 text-red-400 border border-red-900'
          }`}>
            {isClear ? t('suppliers.status.clear') : t('suppliers.status.indebted')}
          </span>
        );
      },
    },
    {
      id: 'actions',
      header: t('suppliers.table.actions'),
      cell: () => (
        <div className="flex items-center gap-3">
          <button className="text-xs bg-slate-800 text-white px-3 py-1.5 rounded hover:bg-slate-700 transition-colors">
            {t('suppliers.actions.pay')}
          </button>
          <button className="text-slate-400 hover:text-white transition-colors">
            <MoreHorizontal size={18} />
          </button>
        </div>
      ),
    },
  ], [t]);

  const table = useReactTable({
    data: suppliers, 
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans">
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">{t('suppliers.title')}</h1>
          <p className="text-sm text-slate-500 mt-1">{t('suppliers.subtitle')}</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-slate-200 transition-colors"
        >
          <Plus size={18} />
          <span>{t('suppliers.addSupplier')}</span>
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        
        <div className="p-4 border-b border-slate-800 flex items-center">
          <div className="relative w-full max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={globalFilter ?? ''}
              onChange={e => setGlobalFilter(e.target.value)}
              placeholder={t('suppliers.searchPlaceholder')}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-slate-600 transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="border-b border-slate-800 bg-slate-950/50">
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className="px-6 py-4 text-sm font-medium text-slate-400 whitespace-nowrap">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
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
          <div className="p-8 text-center text-slate-500">
            {t('common.noResults')}
          </div>
        )}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={t('suppliers.addSupplier')}
      >
        <form className="space-y-4" onSubmit={handleAddSupplier}>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">{t('suppliers.modal.nameLabel')}</label>
            <input 
              type="text" 
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">{t('suppliers.modal.phoneLabel')}</label>
            <input 
              type="tel" 
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">{t('suppliers.modal.debtLabel')}</label>
            <input 
              type="number" 
              defaultValue="0" 
              min="0"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors" 
            />
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={() => setIsModalOpen(false)} 
              className="px-4 py-2 rounded-lg font-medium text-slate-300 hover:bg-slate-800 transition-colors"
            >
              {t('suppliers.modal.cancelBtn')}
            </button>
            <button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              {t('suppliers.modal.saveBtn')}
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
}