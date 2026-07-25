const { app, BrowserWindow, ipcMain , Notification, dialog } = require('electron');
const db = require('./database'); 
const path = require('path');
const fs = require('fs');

const { 
  initDatabase, verifyLogin, getSuppliers, addSupplier, getEmployees, 
  addEmployee, handlePinEntry, getExpenses, addExpense, deleteExpense, 
  updateExpense, getTodayAttendance, 
  getSupplierDetails, addReceipt, addPayment, getAdvances, addAdvance, 
  getSalaries, calculateEmployeePayroll, paySalary , getAgendaTasks, addAgendaTask, toggleAgendaTaskStatus, getDueThisWeek , deleteAgendaTask,
  rescheduleAgendaTask , getDailySummary,
  openShift, getActiveShift, closeShift, getShiftSummary,
  getUsers, addUser, deleteUser, updateEmployee, deleteEmployee ,logAudit , getAuditLogs, backupDatabase, generateExcelBackup // أضفنا هذه الدوال هنا
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

  ipcMain.handle('get-suppliers', () => getSuppliers());
  ipcMain.handle('add-supplier', (event, data) => addSupplier(data));
  
  ipcMain.handle('get-supplier-details', (event, id) => getSupplierDetails(id));
  ipcMain.handle('add-receipt', (event, data) => {
    try { return { success: true, id: addReceipt(data) }; } 
    catch (e) { return { success: false, error: e.message }; }
  });
  ipcMain.handle('add-payment', (event, data) => {
    try { return { success: true, id: addPayment(data) }; } 
    catch (e) { return { success: false, error: e.message }; }
  });

  ipcMain.handle('get-expenses', () => getExpenses());
  ipcMain.handle('add-expense', (event, data) => addExpense(data));
  ipcMain.handle('update-expense', (event, data) => updateExpense(data.id, data.expense));

  ipcMain.handle('get-employees', () => getEmployees());
  ipcMain.handle('add-employee', (event, data) => addEmployee(data));
  ipcMain.handle('handle-pin-entry', (event, pinCode) => handlePinEntry(pinCode));
  ipcMain.handle('get-today-attendance', (event, date) => getTodayAttendance(date));

  ipcMain.handle('get-advances', (e, empId) => getAdvances(empId));
  ipcMain.handle('add-advance', (e, data) => addAdvance(data));
  ipcMain.handle('get-salaries', () => getSalaries());
  ipcMain.handle('calculate-payroll', (e, params) => {
    return calculateEmployeePayroll(params.employeeId, params.startDate, params.endDate, params.hourlyRate);
  });
  ipcMain.handle('pay-salary', (e, data) => {
    try { return paySalary(data); } catch (err) { return { success: false, error: err.message }; }
  });

  ipcMain.handle('get-agenda-tasks', () => getAgendaTasks());
  ipcMain.handle('add-agenda-task', (event, data) => addAgendaTask(data));
  ipcMain.handle('toggle-agenda-task-status', (event, id, status) => toggleAgendaTaskStatus(id, status));
  ipcMain.handle('get-due-this-week', () => getDueThisWeek());

  ipcMain.handle('delete-agenda-task', async (event, id) => {
    return deleteAgendaTask(id);
  });

  ipcMain.handle('reschedule-agenda-task', async (event, id, newDate) => {
    return rescheduleAgendaTask(id, newDate);
  });

  ipcMain.handle('get-daily-summary', async (event, date) => {
    return getDailySummary(date);
  });

  // --- مسارات الورديات (Shifts) الجديدة ---
  ipcMain.handle('open-shift', async (event, data) => openShift(data));
  ipcMain.handle('get-active-shift', async (event, cashierName) => getActiveShift(cashierName));
  ipcMain.handle('close-shift', async (event, data) => closeShift(data));
  ipcMain.handle('get-shift-summary', async (event, cashierName, startTime) => getShiftSummary(cashierName, startTime));
}

ipcMain.on('show-notification', (event, data) => {
  if (Notification.isSupported()) {
    new Notification({
      title: data?.title || 'تنبيهات النظام ⚠️',
      body: data?.body || 'لديك مهام مستحقة تحتاج إلى مراجعة',
      icon: path.join(__dirname, 'assets', 'icon.png') 
    }).show();
  }
});

ipcMain.handle('get-users', () => getUsers());
  ipcMain.handle('add-user', (event, data) => addUser(data));
  ipcMain.handle('delete-user', (event, id) => deleteUser(id));


  ipcMain.handle('update-employee', (event, id, data) => updateEmployee(id, data));
  ipcMain.handle('delete-employee', (event, id) => deleteEmployee(id));

  ipcMain.handle('get-audit-logs', () => getAuditLogs());

  ipcMain.handle('delete-expense', (event, id, username) => deleteExpense(id, username));
  
  


app.whenReady().then(() => {
  initDatabase();
  setupIpcHandlers();
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

ipcMain.handle('backup-database', async (event) => {
  try {
    const defaultName = `POS_Backup_${new Date().toISOString().split('T')[0]}`;
    
    const { canceled, filePath } = await dialog.showSaveDialog({
      title: 'حفظ النسخة الاحتياطية (قاعدة البيانات + تقرير الإكسيل)',
      defaultPath: defaultName,
      buttonLabel: 'حفظ (Save)'
    });

    if (canceled || !filePath) return { success: false, canceled: true };

    // تنظيف المسار لضمان إنشاء ملفين بنفس الاسم
    const basePath = filePath.replace(/\.[^/.]+$/, ""); 
    const dbOutputPath = `${basePath}.db`;
    const excelOutputPath = `${basePath}.xlsx`;

    // 1. توليد نسخة قاعدة البيانات (الطريقة الآمنة المخصصة لـ SQLite)
    await backupDatabase(dbOutputPath);

    // 2. توليد وحفظ تقرير الإكسيل
    await generateExcelBackup(excelOutputPath);

    return { success: true };
  } catch (error) {
    console.error("Backup Error:", error);
    return { success: false, error: error.message };
  }
});

  // 2. استعادة البيانات
  ipcMain.handle('restore-database', async () => {
    const dbPath = path.join(app.getPath('userData'), 'pos_manager2.db');
    
    // فتح نافذة للمستخدم لاختيار ملف النسخة الاحتياطية
    const { canceled, filePaths } = await dialog.showOpenDialog({
      title: 'اختيار ملف النسخة الاحتياطية',
      properties: ['openFile'],
      filters: [{ name: 'SQLite Database', extensions: ['sqlite'] }]
    });

    if (canceled || filePaths.length === 0) return { success: false, canceled: true };

    try {
      const sourcePath = filePaths[0];
      fs.copyFileSync(sourcePath, dbPath);
      // يجب إعادة تشغيل التطبيق ليقرأ قاعدة البيانات الجديدة
      app.relaunch();
      app.exit(0);
      return { success: true };
    } catch (error) {
      console.error('Restore Error:', error);
      return { success: false, error: error.message };
    }
  });


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});