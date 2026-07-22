import { create } from 'zustand';

const useExpenseStore = create((set) => ({
  // 1. الأهم: القيمة الافتراضية يجب أن تكون مصفوفة فارغة وليس null
  expenses: [], 
  isLoading: false,
  error: null,

  // جلب المصاريف من قاعدة البيانات
  fetchExpenses: async () => {
    set({ isLoading: true, error: null });
    try {
      // استدعاء الدالة من الجسر (preload.js)
      const data = await window.api.getExpenses(); 
      // التأكد من أن القيمة المرجعة هي مصفوفة دائماً
      set({ expenses: data || [], isLoading: false });
    } catch (err) {
      console.error("Error fetching expenses:", err);
      set({ error: err.message, isLoading: false, expenses: [] });
    }
  },

  // إضافة مصروف جديد
  addExpense: async (expenseData) => {
    try {
      const result = await window.api.addExpense(expenseData);
      if (result && result.success) {
        // تحديث القائمة تلقائياً بعد الإضافة
        const data = await window.api.getExpenses();
        set({ expenses: data || [] });
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error adding expense:", err);
      return false;
    }
  }
}));

export default useExpenseStore;