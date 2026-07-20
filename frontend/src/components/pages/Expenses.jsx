import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Search, Receipt, ArrowDownCircle, Wallet } from 'lucide-react';

// بيانات وهمية للمصاريف
const initialExpenses = [
  { id: 1, date: '2026-07-20', description: 'Electricity Bill', category: 'utilities', amount: 12500 },
  { id: 2, date: '2026-07-20', description: 'Advance for Karim (Stock Clerk)', category: 'advance', amount: 5000 },
  { id: 3, date: '2026-07-19', description: 'Cleaning Supplies', category: 'supplies', amount: 3200 },
  { id: 4, date: '2026-07-18', description: 'AC Repair', category: 'maintenance', amount: 8000 },
];

export default function Expenses() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  // تصفية المصاريف حسب البحث
  const filteredExpenses = initialExpenses.filter(exp => 
    exp.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // حساب إجمالي اليوم (بافتراض أن اليوم هو 2026-07-20 للتجربة)
  const todayTotal = initialExpenses
    .filter(exp => exp.date === '2026-07-20')
    .reduce((sum, exp) => sum + exp.amount, 0);

  const monthTotal = initialExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  // دالة لتحديد لون الفئة (Category Badge)
  const getCategoryColor = (category) => {
    switch (category) {
      case 'advance': return 'bg-purple-950 text-purple-400 border-purple-900';
      case 'utilities': return 'bg-blue-950 text-blue-400 border-blue-900';
      case 'maintenance': return 'bg-amber-950 text-amber-400 border-amber-900';
      case 'supplies': return 'bg-emerald-950 text-emerald-400 border-emerald-900';
      default: return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">{t('expenses.title')}</h1>
          <p className="text-sm text-slate-500 mt-1">{t('expenses.subtitle')}</p>
        </div>
        <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-700 transition-colors">
          <Plus size={18} />
          <span>{t('expenses.addExpense')}</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">{t('expenses.kpi.today')}</p>
            <h3 className="text-2xl font-bold text-white mt-1">{todayTotal.toLocaleString()} DA</h3>
          </div>
          <div className="p-3 bg-red-950/30 rounded-lg text-red-400">
            <ArrowDownCircle size={24} />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">{t('expenses.kpi.month')}</p>
            <h3 className="text-2xl font-bold text-slate-300 mt-1">{monthTotal.toLocaleString()} DA</h3>
          </div>
          <div className="p-3 bg-slate-800 rounded-lg text-slate-400">
            <Wallet size={24} />
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        
        {/* Search Bar */}
        <div className="p-4 border-b border-slate-800">
          <div className="relative w-full max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('expenses.searchPlaceholder')}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-slate-600 transition-colors"
            />
          </div>
        </div>

        {/* Expenses Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/50">
                <th className="px-6 py-4 text-sm font-medium text-slate-400">{t('expenses.table.date')}</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400">{t('expenses.table.description')}</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400">{t('expenses.table.category')}</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-right">{t('expenses.table.amount')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((exp) => (
                <tr key={exp.id} className="border-b border-slate-800/50 hover:bg-slate-800/20">
                  <td className="px-6 py-4 text-sm text-slate-400 whitespace-nowrap">{exp.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Receipt size={16} className="text-slate-500" />
                      <span className="font-medium text-white">{exp.description}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getCategoryColor(exp.category)}`}>
                      {t(`expenses.categories.${exp.category}`)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-bold text-white">{exp.amount.toLocaleString()} DA</span>
                  </td>
                </tr>
              ))}
              {filteredExpenses.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-slate-500">
                    No expenses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}