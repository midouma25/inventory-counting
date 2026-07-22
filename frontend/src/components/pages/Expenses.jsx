import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Search, Receipt, ArrowDownCircle, Wallet, Edit, Trash2 } from 'lucide-react';
import Modal from '../ui/Modal';

export default function Expenses() {
  const { t } = useTranslation();
  
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        if (window.api && window.api.getExpenses) {
          const data = await window.api.getExpenses();
          setExpenses(data || []);
        }
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
      }
    };
    fetchExpenses();
  }, []);

  const openAddModal = () => {
    setEditingExpense(null);
    setIsModalOpen(true);
  };

  const openEditModal = (expense) => {
    setEditingExpense(expense);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    // تم تغيير النص الثابت ليستخدم الترجمة
    if (window.confirm(t('expenses.deleteConfirm'))) {
      try {
        if (window.api && window.api.deleteExpense) {
          const result = await window.api.deleteExpense(id);
          if (result && result.success) {
            setExpenses(prev => prev.filter(exp => exp.id !== id));
          }
        }
      } catch (error) {
        console.error("Error deleting expense:", error);
      }
    }
  };

  const handleSubmitExpense = async (e) => {
    e.preventDefault();
    
    const expenseData = {
      description: e.target[0].value,
      category: e.target[1].value,
      amount: parseFloat(e.target[2].value) || 0,
      date: editingExpense ? editingExpense.date : new Date().toISOString().split('T')[0] 
    };

    try {
      if (editingExpense) {
        if (window.api && window.api.updateExpense) {
          const result = await window.api.updateExpense(editingExpense.id, expenseData);
          if (result && result.success) {
            setExpenses(prev => prev.map(exp => 
              exp.id === editingExpense.id ? { ...exp, ...expenseData } : exp
            ));
            setIsModalOpen(false);
            setEditingExpense(null);
          }
        }
      } else {
        if (window.api && window.api.addExpense) {
          const result = await window.api.addExpense(expenseData);
          if (result && result.success) {
            const completeExpense = { id: result.id, ...expenseData };
            setExpenses(prev => [completeExpense, ...prev]);
            setIsModalOpen(false);
          }
        }
      }
    } catch (error) {
      console.error("Error saving expense:", error);
    }
  };

  const filteredExpenses = expenses?.filter(exp => {
    const description = exp.description || "";
    const search = searchTerm || "";
    return description.toLowerCase().includes(search.toLowerCase());
  }) || []; 

  const todayString = new Date().toISOString().split('T')[0];
  
  const todayTotal = expenses
    ?.filter(exp => exp.date === todayString)
    ?.reduce((sum, exp) => sum + (exp.amount || 0), 0) || 0;

  const monthTotal = expenses?.reduce((sum, exp) => sum + (exp.amount || 0), 0) || 0;

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
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">{t('expenses.title')}</h1>
          <p className="text-sm text-slate-500 mt-1">{t('expenses.subtitle')}</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-700 transition-colors"
        >
          <Plus size={18} />
          <span>{t('expenses.addExpense')}</span>
        </button>
      </div>

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

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        
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

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/50">
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-right">{t('expenses.table.date')}</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-right">{t('expenses.table.description')}</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-right">{t('expenses.table.category')}</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-right">{t('expenses.table.amount')}</th>
                {/* تم استبدال كلمة الإجراءات الثابتة بمفتاح الترجمة */}
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('expenses.table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((exp) => (
                <tr key={exp.id} className="border-b border-slate-800/50 hover:bg-slate-800/20">
                  <td className="px-6 py-4 text-sm text-slate-400 whitespace-nowrap text-right">{exp.date}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <span className="font-medium text-white">{exp.description}</span>
                      <Receipt size={16} className="text-slate-500" />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getCategoryColor(exp.category)}`}>
                      {t(`expenses.categories.${exp.category}`)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-bold text-white">{exp.amount.toLocaleString()} DA</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => openEditModal(exp)}
                        className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                        title={t('expenses.editExpense')}
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(exp.id)}
                        className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredExpenses.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                    {t('common.noResults')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setEditingExpense(null); }} 
        // تم استبدال العناوين الثابتة بمفاتيح الترجمة
        title={editingExpense ? t('expenses.editExpense') : t('expenses.addExpense')}
      >
        <form className="space-y-4" onSubmit={handleSubmitExpense}>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1 text-right">{t('expenses.table.description')}</label>
            <input 
              type="text" 
              defaultValue={editingExpense ? editingExpense.description : ''}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors text-right" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1 text-right">{t('expenses.table.category')}</label>
            <select 
              defaultValue={editingExpense ? editingExpense.category : 'utilities'}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors text-right"
              dir="rtl"
            >
              <option value="utilities">{t('expenses.categories.utilities')}</option>
              <option value="maintenance">{t('expenses.categories.maintenance')}</option>
              <option value="supplies">{t('expenses.categories.supplies')}</option>
              <option value="advance">{t('expenses.categories.advance')}</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1 text-right">{t('expenses.table.amount')} (DA)</label>
            <input 
              type="number" 
              min="0"
              defaultValue={editingExpense ? editingExpense.amount : ''}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors text-right" 
              required
            />
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={() => { setIsModalOpen(false); setEditingExpense(null); }} 
              className="px-4 py-2 rounded-lg font-medium text-slate-300 hover:bg-slate-800 transition-colors"
            >
              {t('suppliers.modal.cancelBtn')}
            </button>
            <button 
              type="submit" 
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              {/* تم استبدال أزرار الحفظ الثابتة بمفاتيح الترجمة */}
              {editingExpense ? t('expenses.saveChanges') : t('expenses.addExpense')}
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
}