import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Search, Receipt, ArrowDownCircle, Wallet, Edit, Trash2, ShieldAlert } from 'lucide-react';
import Modal from '../ui/Modal';
import useEmployeeStore from '../../store/employeeStore';
import useSupplierStore from '../../store/supplierStore';
import useAuthStore from '../../store/authStore';

export default function Expenses() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const { employees, fetchEmployees } = useEmployeeStore();
  const { suppliers, fetchSuppliers } = useSupplierStore();
  const user = useAuthStore(state => state.user);

  const [formData, setFormData] = useState({
    description: '',
    category: 'utilities',
    amount: '',
    employeeId: '',
    supplierId: ''
  });
  
  const fetchExpensesList = async () => {
    try {
      if (window.api && window.api.getExpenses) {
        const data = await window.api.getExpenses();
        setExpenses(data || []);
      }
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpensesList();
    fetchEmployees();
    fetchSuppliers();
  }, [fetchEmployees, fetchSuppliers]);

  const openAddModal = () => {
    setEditingExpense(null);
    setFormData({ description: '', category: 'utilities', amount: '', employeeId: '', supplierId: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (expense) => {
    setEditingExpense(expense);
    setFormData({ description: expense.description, category: expense.category, amount: expense.amount, employeeId: '', supplierId: '' });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm(t('expenses.deleteConfirm'))) {
      try {
        if (window.api && window.api.deleteExpense) {
          const result = await window.api.deleteExpense(id);
          if (result && result.success) {
            setExpenses(prev => prev.filter(exp => !(exp.id === id && exp.source === 'expense')));
          }
        }
      } catch (error) {
        console.error("Error deleting expense:", error);
      }
    }
  };

  // دالة تحديد اسم الكاشير (الدافع) بذكاء
  const getCaisseName = () => {
    if (user?.role === 'superadmin' || user?.username === 'admin') {
      return t('common.superAdmin');
    }
    return user?.username || 'Cashier';
  };

  const handleSubmitExpense = async (e) => {
    e.preventDefault();
    const amountNum = parseFloat(formData.amount) || 0;
    const dateStr = editingExpense ? editingExpense.date : new Date().toISOString().split('T')[0];

    try {
      if (formData.category === 'advance') {
        if (window.api && window.api.addAdvance) {
          await window.api.addAdvance({
            employeeId: formData.employeeId,
            amount: amountNum,
            date: dateStr,
            caisseSource: getCaisseName(), // استخدام الاسم الحقيقي
            note: formData.description
          });
        }
      } 
      else if (formData.category === 'supplier_payment') {
        if (window.api && window.api.addPayment) {
          await window.api.addPayment({
            supplierId: formData.supplierId,
            amount: amountNum,
            date: dateStr,
            caisseSource: getCaisseName(), // استخدام الاسم الحقيقي
            note: formData.description
          });
        }
      } 
      else {
        if (editingExpense) {
          await window.api.updateExpense(editingExpense.id, {
            description: formData.description,
            category: formData.category,
            amount: amountNum
          });
        } else {
          await window.api.addExpense({
            description: formData.description,
            category: formData.category,
            amount: amountNum,
            date: dateStr
          });
        }
      }

      setIsModalOpen(false);
      setEditingExpense(null);
      fetchExpensesList();
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  };

  const filteredExpenses = expenses?.filter(exp => {
    const description = exp.description || "";
    const search = searchTerm || "";
    return description.toLowerCase().includes(search.toLowerCase());
  }) || []; 

  const todayString = new Date().toISOString().split('T')[0];
  const todayTotal = expenses?.filter(exp => exp.date === todayString)?.reduce((sum, exp) => sum + (exp.amount || 0), 0) || 0;
  const monthTotal = expenses?.reduce((sum, exp) => sum + (exp.amount || 0), 0) || 0;

  const getCategoryColor = (category) => {
    switch (category) {
      case 'advance': return 'bg-purple-950 text-purple-400 border-purple-900';
      case 'supplier_payment': return 'bg-orange-950 text-orange-400 border-orange-900';
      case 'utilities': return 'bg-blue-950 text-blue-400 border-blue-900';
      case 'maintenance': return 'bg-amber-950 text-amber-400 border-amber-900';
      case 'supplies': return 'bg-emerald-950 text-emerald-400 border-emerald-900';
      default: return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  // دالة للتعامل مع الترجمات المفقودة أو القديمة مثل "رواتب"
  const getCategoryTranslation = (category) => {
    const translated = t(`expenses.categories.${category}`);
    return translated.includes('expenses.categories') ? category : translated;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans">
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">{t('expenses.title')}</h1>
          <p className="text-sm text-slate-500 mt-1">{t('expenses.subtitle')}</p>
        </div>
        <button onClick={openAddModal} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-700 transition-colors">
          <Plus size={18} /><span>{t('expenses.addExpense')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">{t('expenses.kpi.today')}</p>
            <h3 className="text-2xl font-bold text-white mt-1">{todayTotal.toLocaleString()} DA</h3>
          </div>
          <div className="p-3 bg-red-950/30 rounded-lg text-red-400"><ArrowDownCircle size={24} /></div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">{t('expenses.kpi.month')}</p>
            <h3 className="text-2xl font-bold text-slate-300 mt-1">{monthTotal.toLocaleString()} DA</h3>
          </div>
          <div className="p-3 bg-slate-800 rounded-lg text-slate-400"><Wallet size={24} /></div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800">
          <div className="relative w-full max-w-md">
            <Search size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder={t('expenses.searchPlaceholder')} className="w-full bg-slate-950 border border-slate-800 rounded-lg ps-10 pe-4 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-slate-600 transition-colors" dir={isRTL ? "rtl" : "ltr"} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-start border-collapse" dir={i18n.dir()}>
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/50">
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('expenses.table.date')}</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('expenses.table.description')}</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('expenses.table.category')}</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('expenses.table.amount')}</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('expenses.table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((exp) => (
                <tr key={`${exp.source}-${exp.id}`} className="border-b border-slate-800/50 hover:bg-slate-800/20">
                  <td className="px-6 py-4 text-sm text-slate-400 whitespace-nowrap text-start">{exp.date}</td>
                  <td className="px-6 py-4 text-start">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-white">
                        {/* ترجمة البوادئ ديناميكياً */}
                        {exp.source === 'advance' && <span className="text-purple-400 font-bold mx-1">{t('expenses.prefixes.advance')}:</span>}
                        {exp.source === 'supplier_payment' && <span className="text-orange-400 font-bold mx-1">{t('expenses.prefixes.supplier')}:</span>}
                        {exp.description}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-start">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getCategoryColor(exp.category)}`}>
                      {getCategoryTranslation(exp.category)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-start">
                    <span className="font-bold text-white">{exp.amount.toLocaleString()} DA</span>
                  </td>
                  <td className="px-6 py-4">
                    {exp.source === 'expense' ? (
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => openEditModal(exp)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"><Edit size={18} /></button>
                        <button onClick={() => handleDelete(exp.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"><Trash2 size={18} /></button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center text-xs text-slate-500 gap-1" title={t('expenses.table.managedElsewhere')}>
                        <ShieldAlert size={14} /> {t('expenses.table.locked')}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {filteredExpenses.length === 0 && (
                <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-500">{t('common.noResults')}</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingExpense(null); }} title={editingExpense ? t('expenses.editExpense') : t('expenses.addExpense')}>
        <form className="space-y-4" onSubmit={handleSubmitExpense} dir={isRTL ? "rtl" : "ltr"}>
          
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('expenses.table.category')}</label>
            <select 
              value={formData.category} 
              onChange={e => setFormData({...formData, category: e.target.value})} 
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors text-start"
              disabled={!!editingExpense}
            >
              <option value="utilities">{t('expenses.categories.utilities')}</option>
              <option value="maintenance">{t('expenses.categories.maintenance')}</option>
              <option value="supplies">{t('expenses.categories.supplies')}</option>
              <option value="advance">{t('expenses.categories.advance')}</option>
              <option value="supplier_payment">{t('expenses.categories.supplier_payment')}</option>
            </select>
          </div>

          {formData.category === 'advance' && (
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('payroll.selectEmployee')}</label>
              <select required value={formData.employeeId} onChange={e => setFormData({...formData, employeeId: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-start">
                <option value="" disabled>{t('payroll.selectEmployee')}</option>
                {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
              </select>
            </div>
          )}

          {formData.category === 'supplier_payment' && (
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('suppliers.modal.nameLabel')}</label>
              <select required value={formData.supplierId} onChange={e => setFormData({...formData, supplierId: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-start">
                <option value="" disabled>{t('suppliers.modal.selectSupplier')}</option>
                {suppliers.map(sup => <option key={sup.id} value={sup.id}>{sup.name}</option>)}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('expenses.table.amount')} (DA)</label>
            <input type="number" min="1" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors text-start" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{formData.category === 'advance' || formData.category === 'supplier_payment' ? t('suppliers.details.note') : t('expenses.table.description')}</label>
            <input type="text" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors text-start" />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={() => { setIsModalOpen(false); setEditingExpense(null); }} className="px-4 py-2 rounded-lg font-medium text-slate-300 hover:bg-slate-800 transition-colors">
              {t('common.cancel')}
            </button>
            <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              {editingExpense ? t('expenses.saveChanges') : t('expenses.addExpense')}
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
}