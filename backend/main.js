const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { 
  initDatabase, verifyLogin, getSuppliers, addSupplier, getEmployees, 
  addEmployee, handlePinEntry, getExpenses, addExpense, deleteExpense, 
  updateExpense, getTodayAttendance, 
  getSupplierDetails, addReceipt, addPayment, getAdvances, addAdvance, 
  getSalaries, calculateEmployeePayroll, paySalary // <--- تم إضافة getSalaries هنا بنجاح
} = require('./database');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200, height: 800, minWidth: 900, minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    show: false,
  });

  win.setMenuBarVisibility(false);
  win.loadURL('http://localhost:5173');
  win.once('ready-to-show', () => win.show());
}

function setupIpcHandlers() {
  ipcMain.handle('login', async (event, credentials) => verifyLogin(credentials.username, credentials.password));

  // --- الموردين ---
  ipcMain.handle('get-suppliers', () => getSuppliers());
  ipcMain.handle('add-supplier', (event, data) => addSupplier(data));
  
  // --- تفاصيل الموردين ---
  ipcMain.handle('get-supplier-details', (event, id) => getSupplierDetails(id));
  ipcMain.handle('add-receipt', (event, data) => {
    try { return { success: true, id: addReceipt(data) }; } 
    catch (e) { return { success: false, error: e.message }; }
  });
  ipcMain.handle('add-payment', (event, data) => {
    try { return { success: true, id: addPayment(data) }; } 
    catch (e) { return { success: false, error: e.message }; }
  });

  // --- المصاريف ---
  ipcMain.handle('get-expenses', () => getExpenses());
  ipcMain.handle('add-expense', (event, data) => addExpense(data));
  ipcMain.handle('delete-expense', (event, id) => deleteExpense(id));
  ipcMain.handle('update-expense', (event, data) => updateExpense(data.id, data.expense));

  // --- الموارد البشرية ---
  ipcMain.handle('get-employees', () => getEmployees());
  ipcMain.handle('add-employee', (event, data) => addEmployee(data));
  ipcMain.handle('handle-pin-entry', (event, pinCode) => handlePinEntry(pinCode));
  ipcMain.handle('get-today-attendance', (event, date) => getTodayAttendance(date));

  // --- السلفيات والرواتب ---
  ipcMain.handle('get-advances', (e, empId) => getAdvances(empId));
  ipcMain.handle('add-advance', (e, data) => addAdvance(data));
  ipcMain.handle('get-salaries', () => getSalaries());
  ipcMain.handle('calculate-payroll', (e, params) => {
    return calculateEmployeePayroll(params.employeeId, params.startDate, params.endDate, params.hourlyRate);
  });
  ipcMain.handle('pay-salary', (e, data) => {
    try { return paySalary(data); } catch (err) { return { success: false, error: err.message }; }
  });
}

app.whenReady().then(() => {
  initDatabase();
  setupIpcHandlers();
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});