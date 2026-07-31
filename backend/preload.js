const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  login: (credentials) => ipcRenderer.invoke('login', credentials),
  
  getSuppliers: () => ipcRenderer.invoke('get-suppliers'),
  addSupplier: (data) => ipcRenderer.invoke('add-supplier', data),
  getSupplierDetails: (id) => ipcRenderer.invoke('get-supplier-details', id),
  addReceipt: (data) => ipcRenderer.invoke('add-receipt', data),
  addPayment: (data) => ipcRenderer.invoke('add-payment', data),
  
  getEmployees: () => ipcRenderer.invoke('get-employees'),
  addEmployee: (data) => ipcRenderer.invoke('add-employee', data),
  handlePinEntry: (pinCode) => ipcRenderer.invoke('handle-pin-entry', pinCode),
  getTodayAttendance: (date) => ipcRenderer.invoke('get-today-attendance', date),
  
  
  addExpense: (data) => ipcRenderer.invoke('add-expense', data),
  deleteExpense: (id) => ipcRenderer.invoke('delete-expense', id),
  updateExpense: (id, expense) => ipcRenderer.invoke('update-expense', { id, expense }),

  getAdvances: (empId) => ipcRenderer.invoke('get-advances', empId),
  addAdvance: (data) => ipcRenderer.invoke('add-advance', data),
  getSalaries: () => ipcRenderer.invoke('get-salaries'),
  calculatePayroll: (params) => ipcRenderer.invoke('calculate-payroll', params),
  paySalary: (data) => ipcRenderer.invoke('pay-salary', data),

  getAgendaTasks: () => ipcRenderer.invoke('get-agenda-tasks'),
  addAgendaTask: (data) => ipcRenderer.invoke('add-agenda-task', data),
  toggleAgendaTaskStatus: (id, status) => ipcRenderer.invoke('toggle-agenda-task-status', id, status),
  getDueThisWeek: () => ipcRenderer.invoke('get-due-this-week'),

  getDailySummary: (date) => ipcRenderer.invoke('get-daily-summary', date),
  deleteAgendaTask: (id) => ipcRenderer.invoke('delete-agenda-task', id),
  rescheduleAgendaTask: (id, newDate) => ipcRenderer.invoke('reschedule-agenda-task', id, newDate),
  showNotification: (title, body) => ipcRenderer.send('show-notification', { title, body }),

  // --- مسارات الورديات (Shifts) الجديدة ---
  openShift: (data) => ipcRenderer.invoke('open-shift', data),
  getActiveShift: (cashierName) => ipcRenderer.invoke('get-active-shift', cashierName),
  closeShift: (data) => ipcRenderer.invoke('close-shift', data),
  getShiftSummary: (cashierName, startTime) => ipcRenderer.invoke('get-shift-summary', cashierName, startTime),

  getUsers: () => ipcRenderer.invoke('get-users'),
  addUser: (data) => ipcRenderer.invoke('add-user', data),
  deleteUser: (id) => ipcRenderer.invoke('delete-user', id),

  updateEmployee: (id, data) => ipcRenderer.invoke('update-employee', id, data),
  deleteEmployee: (id) => ipcRenderer.invoke('delete-employee', id),

  getAuditLogs: () => ipcRenderer.invoke('get-audit-logs'),
  deleteExpense: (id, username) => ipcRenderer.invoke('delete-expense', id, username),
  
  updateReceipt: (id, data) => ipcRenderer.invoke('update-receipt', id, data),
  updatePayment: (id, data) => ipcRenderer.invoke('update-payment', id, data),
  deleteReceipt: (id) => ipcRenderer.invoke('delete-receipt', id),
  deletePayment: (id) => ipcRenderer.invoke('delete-payment', id),
  importSuppliersExcel: () => ipcRenderer.invoke('import-suppliers-excel'),
  // Database Management
  backupDatabase: () => ipcRenderer.invoke('backup-database'),
  restoreDatabase: () => ipcRenderer.invoke('restore-database'),
  updateSupplier: (id, data) => ipcRenderer.invoke('update-supplier', id, data),
  deleteSupplier: (id) => ipcRenderer.invoke('delete-supplier', id),
  getExpenses: (caisseFilter) => ipcRenderer.invoke('get-expenses', caisseFilter),
  updateAdvance: (id, data) => ipcRenderer.invoke('update-advance', { id, data }),
  deleteAdvance: (id) => ipcRenderer.invoke('delete-advance', id),
  getAllShiftsSummary: () => ipcRenderer.invoke('get-all-shifts-summary'),
  getDailyClosures: () => ipcRenderer.invoke('get-daily-closures'),
  closeBusinessDay: (adminName) => ipcRenderer.invoke('close-business-day', adminName),
  getArchivedZReport: (id) => ipcRenderer.invoke('get-archived-zreport', id),
  updateAttendanceRecord: (id, timeIn, timeOut) => ipcRenderer.invoke('update-attendance-record', id, timeIn, timeOut),
});