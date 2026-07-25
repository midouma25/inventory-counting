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
  },
  
addEmployee: async (employeeData) => {
    try {
      if (window.api && window.api.addEmployee) {
        await window.api.addEmployee(employeeData);
        get().fetchEmployees(); // إعادة الجلب لتحديث القائمة
        return true; 
      }
      return false;
    } catch (error) {
      set({ error: error.message });
      return false; 
    }
  },

  // الدالة الجديدة للتعديل
  updateEmployee: async (id, employeeData) => {
    try {
      if (window.api && window.api.updateEmployee) {
        const res = await window.api.updateEmployee(id, employeeData);
        if (res.success) {
          get().fetchEmployees();
          return true;
        }
      }
      return false;
    } catch (error) {
      return false;
    }
  },

  // الدالة الجديدة للحذف
  deleteEmployee: async (id) => {
    try {
      if (window.api && window.api.deleteEmployee) {
        const res = await window.api.deleteEmployee(id);
        if (res.success) {
          get().fetchEmployees();
          return true;
        }
      }
      return false;
    } catch (error) {
      return false;
    }
  }
}));

export default useExpenseStore;