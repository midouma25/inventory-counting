import { create } from 'zustand';

const useAuditStore = create((set) => ({
  logs: [],
  isLoading: false,

  fetchLogs: async () => {
    set({ isLoading: true });
    try {
      if (window.api && window.api.getAuditLogs) {
        const data = await window.api.getAuditLogs();
        set({ logs: data || [], isLoading: false });
      }
    } catch (error) {
      console.error("Error fetching audit logs:", error);
      set({ isLoading: false });
    }
  }
}));

export default useAuditStore;