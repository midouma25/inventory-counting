import { create } from 'zustand';

const useAttendanceStore = create((set) => ({
  todayRecords: [],
  isLoading: false,
  error: null,

  fetchTodayRecords: async () => {
    set({ isLoading: true });
    try {
      if (window.api && window.api.getTodayAttendance) {
        const data = await window.api.getTodayAttendance();
        set({ todayRecords: data, isLoading: false });
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  submitPin: async (pin) => {
    try {
      if (window.api && window.api.handlePinEntry) {
        const result = await window.api.handlePinEntry(pin);
        return result; // نُرجع النتيجة لمعالجتها في الواجهة (لإظهار تنبيه أو رسالة نجاح)
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}));

export default useAttendanceStore;