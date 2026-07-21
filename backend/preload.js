const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // دوال المصادقة
  login: (credentials) => ipcRenderer.invoke('login', credentials),
  
  // دوال الموردين
  getSuppliers: () => ipcRenderer.invoke('get-suppliers'),
  addSupplier: (data) => ipcRenderer.invoke('add-supplier', data)
});