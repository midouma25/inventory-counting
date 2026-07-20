const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getSuppliers: () => ipcRenderer.invoke('get-suppliers'),
  addSupplier: (data) => ipcRenderer.invoke('add-supplier', data),
  
  getExpenses: () => ipcRenderer.invoke('get-expenses'),
  addExpense: (data) => ipcRenderer.invoke('add-expense', data),

  getTodayAttendance: (date) => ipcRenderer.invoke('get-today-attendance', date),
  processAttendance: (data) => ipcRenderer.invoke('process-attendance', data)
});