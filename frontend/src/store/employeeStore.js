import { create } from 'zustand';

const useEmployeeStore = create((set) => ({
  employees: [],
  isLoading: false,
  error: null,

  fetchEmployees: async () => {
    set({ isLoading: true, error: null });
    try {
      if (window.api && window.api.getEmployees) {
        const data = await window.api.getEmployees();
        set({ employees: data, isLoading: false });
      } else {
        set({ employees: [], isLoading: false });
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  addEmployee: async (employeeData) => {
    try {
      if (window.api && window.api.addEmployee) {
        const newEmployee = await window.api.addEmployee(employeeData);
        set((state) => ({ employees: [newEmployee, ...state.employees] }));
        return true; 
      }
      return false;
    } catch (error) {
      set({ error: error.message });
      return false; 
    }
  }
}));

export default useEmployeeStore;