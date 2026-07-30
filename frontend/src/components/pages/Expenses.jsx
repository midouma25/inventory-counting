import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Search, ArrowDownCircle, Wallet, Edit, Trash2, ShieldAlert, Filter, Info } from 'lucide-react';
import Modal from '../ui/Modal';
import ConfirmAlert from '../ui/ConfirmAlert'; 
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
  
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  const { employees, fetchEmployees } = useEmployeeStore();
  const { suppliers, fetchSuppliers } = useSupplierStore();
  const user = useAuthStore(state => state.user);

  const isSuperAdmin = user?.role === 'superadmin' || user?.role === 'admin';
  const myCaisseName = isSuperAdmin ? 'admin' : (user?.username || 'Cashier');
  
  const [selectedCaisseFilter, setSelectedCaisseFilter] = useState(isSuperAdmin ? 'all' : myCaisseName);

  const [formData, setFormData] = useState({
    description: '', category: 'utilities', amount: '', employeeId: '', supplierId: '', caisseSource: myCaisseName, date: new Date().toISOString().split('T')[0]
  });
  
  const myEmployeeRecord = useMemo(() => {
    return employees.find(e => e.name === user?.username);
  }, [employees, user]);

  const fetchExpensesList = async () => {
    try {
      if (window.api && window.api.getExpenses) {
        const data = await window.api.getExpenses(selectedCaisseFilter);
        setExpenses(data || []);
      }
    } catch (error) { console.error("Failed to fetch expenses:", error); }
  };

  useEffect(() => {
    fetchExpensesList();
  }, [selectedCaisseFilter]);

  useEffect(() => {
    fetchEmployees();
    fetchSuppliers();
  }, []);

  const openAddModal = () => {
    setEditingExpense(null);
    setFormData({ 
      description: '', category: 'utilities', amount: '', 
      employeeId: isSuperAdmin ? '' : (myEmployeeRecord?.id || ''), 
      supplierId: '', caisseSource: myCaisseName, 
      date: new Date().toISOString().split('T')[0] 
    });
    setIsModalOpen(true);
  };

  // 🔴 دالة فتح نافذة التعديل (أعدناها من جديد!)
  const openEditModal = (expense) => {
    setEditingExpense(expense);
    setFormData({
      description: expense.description,
      category: expense.category,
      amount: expense.amount,
      employeeId: '',
      supplierId: '',
      caisseSource: expense.caisse_source || myCaisseName, // جلب الصندوق السابق
      date: expense.date || new Date().toISOString().split('T')[0] // جلب التاريخ السابق
    });
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!expenseToDelete) return;
    try {
      if (window.api && window.api.deleteExpense) {
        const result = await window.api.deleteExpense(expenseToDelete, user?.username || 'Unknown');
        if (result && result.success) {
          fetchExpensesList();
        }
      }
    } catch (error) { console.error("Error deleting expense:", error); }
    setExpenseToDelete(null); 
  };

  const handleSubmitExpense = async (e) => {
    e.preventDefault();
    const amountNum = parseFloat(formData.amount) || 0;
    const dateStr = formData.date; 
    const finalCaisseSource = isSuperAdmin ? formData.caisseSource : myCaisseName;

    try {
      if (formData.category === 'advance') {
        const finalEmployeeId = isSuperAdmin ? formData.employeeId : myEmployeeRecord?.id;
        if (window.api && window.api.addAdvance) {
          await window.api.addAdvance({
            employeeId: finalEmployeeId, amount: amountNum, date: dateStr, caisseSource: finalCaisseSource, note: formData.description
          });
        }
      } else if (formData.category === 'supplier_payment') {
        if (window.api && window.api.addPayment) {
          await window.api.addPayment({
            supplierId: formData.supplierId, amount: amountNum, date: dateStr, caisseSource: finalCaisseSource, note: formData.description
          });
        }
      } else {
        if (editingExpense) {
          // 🔴 دعم التعديل الشامل
          await window.api.updateExpense(editingExpense.id, { 
            description: formData.description, 
            category: formData.category, 
            amount: amountNum,
            date: dateStr,
            caisseSource: finalCaisseSource 
          });
        } else {
          await window.api.addExpense({ description: formData.description, category: formData.category, amount: amountNum, date: dateStr, caisseSource: finalCaisseSource });
        }
      }

      setIsModalOpen(false);
      setEditingExpense(null);
      fetchExpensesList(); 
    } catch (error) { console.error("Error saving transaction:", error); }
  };

  const filteredExpenses = expenses?.filter(exp => {
    const description = exp.description || "";
    return description.toLowerCase().includes(searchTerm.toLowerCase());
  }) || []; 

  const todayString = new Date().toISOString().split('T')[0];
  const todayTotal = expenses?.filter(exp => exp.date === todayString)?.reduce((sum, exp) => sum + (exp.amount || 0), 0) || 0;
  const monthTotal = expenses?.reduce((sum, exp) => sum + (exp.amount || 0), 0) || 0;

  const getCategoryTranslation = (category) => {
    const translated = t(`expenses.categories.${category}`);
    return translated.includes('expenses.categories') ? category : translated;
  };

  const availableCaisses = useMemo(() => {
      const caisses = new Set(['admin']);
      employees.forEach(emp => {
         if(emp.role === 'cashier' || emp.role === 'scale') caisses.add(emp.name);
      });
      return Array.from(caisses);
  }, [employees]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans text-start relative">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">{t('expenses.title')}</h1>
          <p className="text-sm text-slate-500 mt-1">{t('expenses.subtitle')}</p>
        </div>
        <div className="flex items-center gap-3">
          {isSuperAdmin && (
             <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 shadow-sm">
               <Filter size={18} className="text-blue-400" />
               <select 
                 value={selectedCaisseFilter} 
                 onChange={(e) => setSelectedCaisseFilter(e.target.value)}
                 className="bg-transparent text-sm text-white font-medium focus:outline-none cursor-pointer"
                 dir={isRTL ? "rtl" : "ltr"}
               >
                 <option value="all">{t('expenses.allCaisses', 'كل الصناديق')}</option>
                 {availableCaisses.map(c => (
                   <option key={c} value={c}>
                     {c === 'admin' ? t('expenses.adminCaisse', 'صندوق المدير (الرئيسي)') : t('expenses.cashierCaisse', { name: c, defaultValue: `صندوق الكاشير: ${c}` })}
                   </option>
                 ))}
               </select>
             </div>
          )}

          <button onClick={openAddModal} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-700 transition-colors">
            <Plus size={18} /><span>{t('expenses.addExpense')}</span>
          </button>
        </div>
      </div>

      {!isSuperAdmin && (
        <div className="mb-6 bg-blue-900/20 border border-blue-800/50 rounded-lg p-3 flex items-center gap-3 text-blue-300 text-sm" dir={i18n.dir()}>
           <Info size={18} className="text-blue-400 shrink-0" />
           <p className="leading-relaxed">
             {t('expenses.cashierNotice', { name: myCaisseName, defaultValue: `You are viewing only the expenses and payments made from your own register (${myCaisseName}) across all days.` })}
           </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">{t('expenses.kpi.today')}</p>
            <h3 className="text-2xl font-bold text-white mt-1">{todayTotal.toLocaleString()} {t('currency')}</h3>
          </div>
          <div className="p-3 bg-red-950/30 rounded-lg text-red-400"><ArrowDownCircle size={24} /></div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">{t('expenses.kpi.month')}</p>
            <h3 className="text-2xl font-bold text-slate-300 mt-1">{monthTotal.toLocaleString()} {t('currency')}</h3>
          </div>
          <div className="p-3 bg-slate-800 rounded-lg text-slate-400"><Wallet size={24} /></div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        <div className="p-4 border-b border-slate-800 bg-slate-950/30">
          <div className="relative w-full max-w-md">
            <Search size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder={t('common.search')} className="w-full bg-slate-900 border border-slate-700 rounded-lg ps-10 pe-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors shadow-inner text-start" dir={isRTL ? "rtl" : "ltr"} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-start border-collapse" dir={i18n.dir()}>
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80">
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('expenses.table.date')}</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('expenses.table.description')}</th>
                {isSuperAdmin && <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('expenses.caisseSourceLabel', 'المصدر')}</th>}
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('expenses.table.amount')}</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('suppliers.table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((exp) => (
                <tr key={`${exp.source}-${exp.id}`} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-400 whitespace-nowrap text-start">{exp.date}</td>
                  <td className="px-6 py-4 text-start">
                    <span className="font-medium text-white">{exp.description}</span>
                    <div className="text-xs text-slate-500 mt-1">{getCategoryTranslation(exp.category)}</div>
                  </td>
                  
                  {isSuperAdmin && (
                     <td className="px-6 py-4 text-center">
                       <span className={`px-2 py-1 rounded-md text-xs font-medium ${exp.caisse_source === 'admin' ? 'bg-blue-950 text-blue-400 border border-blue-900' : 'bg-slate-800 text-slate-300 border border-slate-700'}`}>
                         {exp.caisse_source === 'admin' ? t('common.superAdmin', 'المدير') : exp.caisse_source}
                       </span>
                     </td>
                  )}

                  <td className="px-6 py-4 text-start font-bold text-red-400">{exp.amount.toLocaleString()} {t('currency')}</td>
                  <td className="px-6 py-4 text-center">
                    {exp.source === 'expense' ? (
                      <div className="flex items-center justify-center gap-2">
                        {/* 🔴 زر التعديل أصبح بجانب زر الحذف للمصاريف العادية */}
                        <button onClick={() => openEditModal(exp)} className="p-2 text-blue-400 hover:bg-blue-900/50 rounded-lg transition-colors" title={t('expenses.editExpense')}>
                          <Edit size={18} />
                        </button>
                        <button onClick={() => setExpenseToDelete(exp.id)} className="p-2 text-red-400 hover:bg-red-900/50 rounded-lg transition-colors" title={t('suppliers.actions.delete')}>
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center text-xs text-slate-500 gap-1" title="يُرجى الذهاب لصفحة الموردين أو الرواتب لتعديل هذا السجل">
                        <ShieldAlert size={14} /> {t('expenses.table.locked', 'مقفل')}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {filteredExpenses.length === 0 && (
                <tr><td colSpan={isSuperAdmin ? "5" : "4"} className="px-6 py-12 text-center text-slate-500">{t('common.noResults')}</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmAlert isOpen={!!expenseToDelete} onClose={() => setExpenseToDelete(null)} onConfirm={confirmDelete} title={t('suppliers.actions.delete')} message={t('expenses.deleteConfirm')} confirmText={t('suppliers.actions.confirmDeleteBtn')} />

      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingExpense(null); }} title={editingExpense ? t('expenses.editExpense') : t('expenses.addExpense')}>
        <form className="space-y-4" onSubmit={handleSubmitExpense} dir={isRTL ? "rtl" : "ltr"}>
          
          {/* 🔴 السماح للمدير بتعديل الصندوق حتى في وضع التعديل (تم إزالة شرط !editingExpense) */}
          {isSuperAdmin && (
             <div>
               <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('expenses.caisseSourceLabel', 'مصدر الأموال')}</label>
               <select value={formData.caisseSource} onChange={e => setFormData({...formData, caisseSource: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-start">
                 <option value="admin">{t('expenses.adminCaisse', 'صندوق المدير')}</option>
                 {availableCaisses.filter(c => c !== 'admin').map(c => <option key={c} value={c}>{t('expenses.cashierCaisse', { name: c, defaultValue: `صندوق الكاشير: ${c}` })}</option>)}
               </select>
             </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('expenses.table.category')}</label>
            <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors text-start" disabled={!!editingExpense}>
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
              {isSuperAdmin ? (
                <select required value={formData.employeeId} onChange={e => setFormData({...formData, employeeId: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-start">
                  <option value="" disabled>{t('payroll.selectEmployee')}</option>
                  {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
                </select>
              ) : (
                <div className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-blue-400 font-bold text-start cursor-not-allowed">
                  {user?.username} - {t('expenses.myAdvance', 'سلفتي الشخصية')}
                </div>
              )}
            </div>
          )}

          {formData.category === 'supplier_payment' && (
             <div>
               <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('suppliers.modal.nameLabel')}</label>
               <select required value={formData.supplierId} onChange={e => setFormData({...formData, supplierId: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-start">
                 <option value="" disabled>{t('suppliers.modal.selectSupplier', '-- اختر مورداً --')}</option>
                 {suppliers.map(sup => <option key={sup.id} value={sup.id}>{sup.name}</option>)}
               </select>
             </div>
          )}

          {/* 🔴 حقل التاريخ متوفر للتعديل دائماً */}
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('expenses.dateLabel', 'التاريخ')}</label>
            <input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors text-start" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('expenses.table.amount')} ({t('currency')})</label>
            <input type="number" min="1" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors text-start" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1 text-start">{t('expenses.table.description')}</label>
            <input type="text" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors text-start" required />
          </div>

          <div className="pt-4 flex justify-end gap-3 mt-4">
            <button type="button" onClick={() => { setIsModalOpen(false); setEditingExpense(null); }} className="px-4 py-2 rounded-lg font-medium text-slate-300 hover:bg-slate-800 transition-colors">{t('common.cancel')}</button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">{editingExpense ? t('expenses.saveChanges') : t('expenses.addExpense')}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}