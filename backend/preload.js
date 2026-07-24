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
  
  getExpenses: () => ipcRenderer.invoke('get-expenses'),
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
});