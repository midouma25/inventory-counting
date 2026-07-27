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
 
  // أضف هذه الدوال داخل الـ store إذا لم تكن موجودة
  updateEmployee: async (id, updatedData) => {
    try {
      // نفترض أن لديك دالة في الـ backend باسم updateEmployee
      const success = await window.api.updateEmployee(id, updatedData);
      if (success) {
        set((state) => ({
          employees: state.employees.map((emp) => (emp.id === id ? { ...emp, ...updatedData } : emp)),
        }));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error updating employee:", error);
      return false;
    }
  },

  deleteEmployee: async (id) => {
    try {
      // نفترض أن لديك دالة في الـ backend باسم deleteEmployee
      const success = await window.api.deleteEmployee(id);
      if (success) {
        set((state) => ({ employees: state.employees.filter((emp) => emp.id !== id) }));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error deleting employee:", error);
      return false;
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