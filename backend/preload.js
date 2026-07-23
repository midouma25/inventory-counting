const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  login: (credentials) => ipcRenderer.invoke('login', credentials),
  
  // الموردين والفواتير والدفعات
  getSuppliers: () => ipcRenderer.invoke('get-suppliers'),
  addSupplier: (data) => ipcRenderer.invoke('add-supplier', data),
  getSupplierDetails: (id) => ipcRenderer.invoke('get-supplier-details', id),
  addReceipt: (data) => ipcRenderer.invoke('add-receipt', data),
  addPayment: (data) => ipcRenderer.invoke('add-payment', data),
  
  // الموارد البشرية والحضور
  getEmployees: () => ipcRenderer.invoke('get-employees'),
  addEmployee: (data) => ipcRenderer.invoke('add-employee', data),
  handlePinEntry: (pinCode) => ipcRenderer.invoke('handle-pin-entry', pinCode),
  getTodayAttendance: (date) => ipcRenderer.invoke('get-today-attendance', date),
  
  // المصاريف
  getExpenses: () => ipcRenderer.invoke('get-expenses'),
  addExpense: (data) => ipcRenderer.invoke('add-expense', data),
  deleteExpense: (id) => ipcRenderer.invoke('delete-expense', id),
  updateExpense: (id, expense) => ipcRenderer.invoke('update-expense', { id, expense }),

  // --- السلفيات والرواتب ---
getAdvances: (empId) => ipcRenderer.invoke('get-advances', empId),
addAdvance: (data) => ipcRenderer.invoke('add-advance', data),
getSalaries: () => ipcRenderer.invoke('get-salaries'), // السطر الجديد
calculatePayroll: (params) => ipcRenderer.invoke('calculate-payroll', params),
paySalary: (data) => ipcRenderer.invoke('pay-salary', data),
});