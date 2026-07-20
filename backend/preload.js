const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getSuppliers: () => ipcRenderer.invoke('get-suppliers'),
  addSupplier: (data) => ipcRenderer.invoke('add-supplier', data),
  
  getExpenses: () => ipcRenderer.invoke('get-expenses'),
  addExpense: (data) => ipcRenderer.invoke('add-expense', data),

  getTodayAttendance: (date) => ipcRenderer.invoke('get-today-attendance', date),
  processAttendance: (data) => ipcRenderer.invoke('process-attendance', data),

  getAgendaTasks: () => ipcRenderer.invoke('get-agenda-tasks'),
  addAgendaTask: (data) => ipcRenderer.invoke('add-agenda-task', data),
  toggleAgendaTaskStatus: (id, status) => ipcRenderer.invoke('toggle-agenda-task-status', id, status)
});