// frontend/src/networkApi.js
import i18n from './i18n'; // 🔴 استيراد ملف الترجمة لمعرفة اللغة الحالية

export const setupNetworkApi = () => {
  if (window.api) return;

  console.log('🌐 Running in Browser Mode (Cashier Client). Setting up Network API...');

  const SERVER_URL = window.location.origin;

  const fetchFromServer = async (methodName, args = []) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/${methodName}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ args })
      });
      const data = await response.json();
      if (data.success) {
        return data.data; 
      } else {
        return { success: false, error: data.error, message: data.error };
      }
    } catch (error) {
      console.error(`Network Error in ${methodName}:`, error);
      // 🔴 استخدام الترجمة الذكية لخطأ انقطاع الاتصال
      return { success: false, error: i18n.t('common.networkError', 'Network connection error'), message: error.message };
    }
  };

  window.api = {
    login: (credentials) => fetchFromServer('verifyLogin', [credentials.username, credentials.password]),
    
    getSuppliers: () => fetchFromServer('getSuppliers'),
    addSupplier: (data) => fetchFromServer('addSupplier', [data]),
    updateSupplier: (id, data) => fetchFromServer('updateSupplier', [id, data]),
    deleteSupplier: (id) => fetchFromServer('deleteSupplier', [id]),
    getSupplierDetails: (id) => fetchFromServer('getSupplierDetails', [id]),
    
    addReceipt: async (data) => {
      const res = await fetchFromServer('addReceipt', [data]);
      return res.error ? res : { success: true, id: res };
    },
    addPayment: async (data) => {
      const res = await fetchFromServer('addPayment', [data]);
      return res.error ? res : { success: true, id: res };
    },
    updateReceipt: (id, data) => fetchFromServer('updateReceipt', [id, data]),
    updatePayment: (id, data) => fetchFromServer('updatePayment', [id, data]),
    deleteReceipt: (id) => fetchFromServer('deleteReceipt', [id]),
    deletePayment: (id) => fetchFromServer('deletePayment', [id]),
    
    getEmployees: () => fetchFromServer('getEmployees'),
    addEmployee: (data) => fetchFromServer('addEmployee', [data]),
    updateEmployee: (id, data) => fetchFromServer('updateEmployee', [id, data]),
    deleteEmployee: (id) => fetchFromServer('deleteEmployee', [id]),
    handlePinEntry: (pin) => fetchFromServer('handlePinEntry', [pin]),
    getTodayAttendance: (date) => fetchFromServer('getTodayAttendance', [date]),
    
    getExpenses: (caisseFilter) => fetchFromServer('getExpenses', [caisseFilter]),
    addExpense: (data) => fetchFromServer('addExpense', [data]),
    updateExpense: ({id, expense}) => fetchFromServer('updateExpense', [id, expense]),
    deleteExpense: (id, username) => fetchFromServer('deleteExpense', [id, username]),
    
    getAdvances: (empId) => fetchFromServer('getAdvances', [empId]),
    addAdvance: (data) => fetchFromServer('addAdvance', [data]),
    getSalaries: () => fetchFromServer('getSalaries'),
    calculatePayroll: (params) => fetchFromServer('calculateEmployeePayroll', [params.employeeId, params.startDate, params.endDate, params.hourlyRate]),
    paySalary: (data) => fetchFromServer('paySalary', [data]),
    
    getAgendaTasks: () => fetchFromServer('getAgendaTasks'),
    addAgendaTask: (data) => fetchFromServer('addAgendaTask', [data]),
    toggleAgendaTaskStatus: (id, status) => fetchFromServer('toggleAgendaTaskStatus', [id, status]),
    deleteAgendaTask: (id) => fetchFromServer('deleteAgendaTask', [id]),
    rescheduleAgendaTask: (id, date) => fetchFromServer('rescheduleAgendaTask', [id, date]),
    getDueThisWeek: () => fetchFromServer('getDueThisWeek'),
    getDailySummary: (date) => fetchFromServer('getDailySummary', [date]),
    
    getStoreMapData: () => fetchFromServer('getStoreMapData'),
    processPdfInventory: (data) => fetchFromServer('processPdfInventoryEntry', [data.shelfId, data.barcode, data.cleanName, data.dirtyName, data.quantity]),

    parsePdfInvoice: () => fetchFromServer('parsePdfInvoice'),
    openShift: (data) => fetchFromServer('openShift', [data]),
    getActiveShift: (cashierName) => fetchFromServer('getActiveShift', [cashierName]),
    closeShift: (data) => fetchFromServer('closeShift', [data]),
    getShiftSummary: (cashierName, startTime) => fetchFromServer('getShiftSummary', [cashierName, startTime]),
    getStoreLayouts: () => fetchFromServer('getStoreLayouts'),
    saveStoreLayout: (data) => fetchFromServer('saveStoreLayout', [data]),
    deleteStoreLayout: (id) => fetchFromServer('deleteStoreLayout', [id]),
    activateStoreLayout: (id) => fetchFromServer('activateStoreLayout', [id]),
    getUsers: () => fetchFromServer('getUsers'),
    addUser: (data) => fetchFromServer('addUser', [data]),
    deleteUser: (id) => fetchFromServer('deleteUser', [id]),
    getAuditLogs: () => fetchFromServer('getAuditLogs'),
    getDailyClosures: () => fetchFromServer('getDailyClosures'),
    getArchivedZReport: (id) => fetchFromServer('getArchivedZReport', id),
    updateAttendanceRecord: (id, timeIn, timeOut) => fetchFromServer('updateAttendanceRecord', [id, timeIn, timeOut]),
    // 🔴 استخدام الترجمة بدلاً من النصوص العربية الثابتة
    backupDatabase: () => Promise.resolve({ success: false, error: i18n.t('common.serverOnlyFeature', 'This feature only works on the main server.') }),
    restoreDatabase: () => Promise.resolve({ success: false, error: i18n.t('common.serverOnlyFeature', 'This feature only works on the main server.') }),
    importSuppliersExcel: () => Promise.resolve({ success: false, error: i18n.t('common.serverOnlyFeature', 'This feature only works on the main server.') }),
    getAllShiftsSummary: () => fetchFromServer('getAllShiftsSummary'),
    closeBusinessDay: (adminName) => fetchFromServer('closeBusinessDay', adminName),
    getShelfProducts: (shelfId) => fetchFromServer('getShelfProducts', [shelfId]),
    showNotification: (data) => {
      if (Notification.permission === 'granted') new Notification(data.title, { body: data.body });
      else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(p => { if(p === 'granted') new Notification(data.title, { body: data.body }) });
      }
    }
  };
};