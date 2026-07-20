const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const db = require('./database');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadURL('http://localhost:5173');
}

app.whenReady().then(() => {
  db.initDB(); 
  createWindow();
  
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  ipcMain.handle('get-suppliers', () => db.getSuppliers());
  ipcMain.handle('add-supplier', (e, data) => db.addSupplier(data));
  
  ipcMain.handle('get-expenses', () => db.getExpenses());
  ipcMain.handle('add-expense', (e, data) => db.addExpense(data));

  ipcMain.handle('get-today-attendance', (e, date) => db.getTodayAttendance(date));
  ipcMain.handle('process-attendance', (e, data) => db.processAttendance(data.pin, data.date, data.time));
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});