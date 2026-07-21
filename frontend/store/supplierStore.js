import { create } from 'zustand';

const useSupplierStore = create((set) => ({
  suppliers: [],
  isLoading: false,
  error: null,

  // دالة جلب الموردين من قاعدة البيانات
  fetchSuppliers: async () => {
    set({ isLoading: true, error: null });
    try {
      if (window.api && window.api.getSuppliers) {
        const data = await window.api.getSuppliers();
        set({ suppliers: data, isLoading: false });
      } else {
        // بيانات احتياطية في حال كنت تشغل الموقع من المتصفح مباشرة وليس من Electron
        console.warn("API not found. Running in browser mode.");
        set({ suppliers: [], isLoading: false });
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // دالة إضافة مورد جديد
  addSupplier: async (supplierData) => {
    try {
      if (window.api && window.api.addSupplier) {
        const newSupplier = await window.api.addSupplier(supplierData);
        // تحديث القائمة فوراً بإضافة المورد الجديد في الأعلى
        set((state) => ({ suppliers: [newSupplier, ...state.suppliers] }));
        return true; // نجاح
      }
      return false;
    } catch (error) {
      set({ error: error.message });
      return false; // فشل
    }
  }
}));

export default useSupplierStore;