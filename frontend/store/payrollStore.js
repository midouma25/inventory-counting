import { create } from 'zustand';

const usePayrollStore = create((set, get) => ({
  advances: [],
  salaries: [],
  payrollResult: null,
  isLoading: false,

  fetchAdvances: async (employeeId = null) => {
    try {
      const data = await window.api.getAdvances(employeeId);
      set({ advances: data || [] });
    } catch (error) {
      console.error('Error fetching advances:', error);
    }
  },

  fetchSalaries: async () => {
    try {
      const data = await window.api.getSalaries();
      set({ salaries: data || [] });
    } catch (error) {
      console.error('Error fetching salaries:', error);
    }
  },

  addAdvance: async (data) => {
    try {
      const res = await window.api.addAdvance(data);
      if (res.success) {
        get().fetchAdvances(); // تحديث القائمة العامة
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error adding advance:', error);
      return false;
    }
  },

  calculatePayroll: async (params) => {
    set({ isLoading: true });
    try {
      const result = await window.api.calculatePayroll(params);
      set({ payrollResult: result, isLoading: false });
      return result;
    } catch (error) {
      console.error('Error calculating payroll:', error);
      set({ isLoading: false });
      return null;
    }
  },

  paySalary: async (data) => {
    try {
      const res = await window.api.paySalary(data);
      if (res.success) {
        set({ payrollResult: null }); 
        get().fetchAdvances();
        get().fetchSalaries();
        return { success: true };
      }
      return { success: false, error: res.error };
    } catch (error) {
      console.error('Error paying salary:', error);
      return { success: false, error: error.message };
    }
  },
  clearPayrollResult: () => set({ payrollResult: null })
}));

export default usePayrollStore;