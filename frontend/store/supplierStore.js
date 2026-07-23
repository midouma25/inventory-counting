import { create } from 'zustand';

const useSupplierStore = create((set, get) => ({
  suppliers: [],
  currentSupplier: null, // سيحمل بيانات المورد المحدد مع فواتيره ودفعاته
  isLoading: false,
  error: null,

  fetchSuppliers: async () => {
    set({ isLoading: true, error: null });
    try {
      if (window.api && window.api.getSuppliers) {
        const data = await window.api.getSuppliers();
        set({ suppliers: data, isLoading: false });
      } else {
        set({ suppliers: [], isLoading: false });
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  addSupplier: async (supplierData) => {
    try {
      if (window.api && window.api.addSupplier) {
        const newSupplier = await window.api.addSupplier(supplierData);
        set((state) => ({ suppliers: [newSupplier, ...state.suppliers] }));
        return true;
      }
      return false;
    } catch (error) {
      set({ error: error.message });
      return false;
    }
  },

  // --- الدوال الجديدة الخاصة بالتفاصيل والعمليات المحاسبية ---

  fetchSupplierDetails: async (id) => {
    set({ isLoading: true, error: null });
    try {
      if (window.api && window.api.getSupplierDetails) {
        const data = await window.api.getSupplierDetails(id);
        set({ currentSupplier: data, isLoading: false });
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  clearCurrentSupplier: () => set({ currentSupplier: null }),

  addReceipt: async (receiptData) => {
    try {
      if (window.api && window.api.addReceipt) {
        const result = await window.api.addReceipt(receiptData);
        if (result.success) {
          // تحديث تفاصيل المورد الحالي وتحديث القائمة الرئيسية ليعكس الدين الجديد
          await get().fetchSupplierDetails(receiptData.supplierId);
          await get().fetchSuppliers();
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  addPayment: async (paymentData) => {
    try {
      if (window.api && window.api.addPayment) {
        const result = await window.api.addPayment(paymentData);
        if (result.success) {
          // تحديث تفاصيل المورد الحالي وتحديث القائمة الرئيسية
          await get().fetchSupplierDetails(paymentData.supplierId);
          await get().fetchSuppliers();
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}));

export default useSupplierStore;