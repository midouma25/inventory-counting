const { app, BrowserWindow, ipcMain , Notification, dialog } = require('electron');
const db = require('./database'); 
const path = require('path');
const fs = require('fs');
// أضف هذا السطر لإخفاء تحذيرات الأمان أثناء التطوير
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
const { 
  initDatabase, verifyLogin, getSuppliers, addSupplier, getEmployees, 
  addEmployee, handlePinEntry, getExpenses, addExpense, deleteExpense, 
  updateExpense, getTodayAttendance, 
  getSupplierDetails, addReceipt, addPayment, getAdvances, addAdvance, 
  getSalaries, calculateEmployeePayroll, paySalary , getAgendaTasks, addAgendaTask, toggleAgendaTaskStatus, getDueThisWeek , deleteAgendaTask,
  rescheduleAgendaTask , getDailySummary,
  openShift, getActiveShift, closeShift, getShiftSummary,
  getUsers, addUser, deleteUser, updateEmployee, deleteEmployee ,logAudit , getAuditLogs, backupDatabase, generateExcelBackup, updateSupplier, deleteSupplier, updateAdvance, deleteAdvance, getAllShiftsSummary , getDailyClosures // أضفنا هذه الدوال هنا
} = require('./database');
const express = require('express');
const cors = require('cors');

function createWindow() {
  // 1. إنشاء شاشة الإقلاع أولاً
  const splash = new BrowserWindow({
    width: 650,
    height: 400,
    transparent: true, // الشفافية مفعلة لكي يظهر الحواف المنحنية فقط
    frame: false,      // بدون إطار علوي (أزرار الإغلاق والتكبير)
    alwaysOnTop: true, // تبقى فوق النوافذ الأخرى
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
  });

  // تحميل ملف HTML الخاص بشاشة الإقلاع
  splash.loadFile(path.join(__dirname, 'splash.html'));

  // 2. إنشاء النافذة الرئيسية (في الخلفية ومخفية)
  const win = new BrowserWindow({
    width: 1200, height: 800, minWidth: 900, minHeight: 600,
    show: false, // تبقى مخفية أثناء التحميل
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.setMenuBarVisibility(false);
  win.loadURL('http://localhost:5173'); // (قم بتغييرها للمسار المحلي لاحقاً عند عمل Build)

  // 3. عندما تجهز النافذة الرئيسية تماماً
  win.once('ready-to-show', () => {
    // نضع تأخير زمني بسيط (3 ثوانٍ) لكي يستمتع العميل برؤية اللوجو الخاص بك واسمك
    setTimeout(() => {
      if (!splash.isDestroyed()) {
        splash.close(); // إغلاق شاشة الإقلاع
      }
      win.show(); // إظهار البرنامج
    }, 3000); // يمكنك تقليلها إلى 1000 إذا أردت تسريع الفتح
  });
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

  ipcMain.handle('get-expenses', (event, caisseFilter) => getExpenses(caisseFilter));
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
  
  ipcMain.handle('close-business-day', async (event, adminName) => closeBusinessDay(adminName));
// هذه الدالة ستحول حاسوب المدير إلى سيرفر يخدم الكاشيرات
function startLocalNetworkServer() {
  const apiApp = express();
  apiApp.use(cors());
  apiApp.use(express.json());

  // دالة ذكية تستقبل أي طلب من الكاشير وتنفذه في قاعدة البيانات
  apiApp.post('/api/:method', async (req, res) => {
    const method = req.params.method;
    const args = req.body.args || [];
    
    try {
      // التحقق من وجود الدالة في database.js
      if (typeof db[method] === 'function') {
        const result = await db[method](...args);
        res.json({ success: true, data: result });
      } else {
        res.status(404).json({ success: false, error: 'Method not found' });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // بث الواجهة الأمامية (Frontend) ليتمكن الكاشير من فتحها بمتصفح كروم
  const frontendPath = path.join(__dirname, '..', 'frontend', 'dist'); // المسار بعد عمل Build للـ Vite
  if (fs.existsSync(frontendPath)) {
    apiApp.use(express.static(frontendPath));
  }

  // تشغيل السيرفر على البورت 3000 لجميع الأجهزة المتصلة بالراوتر
  apiApp.listen(3000, '0.0.0.0', () => {
    console.log('✅ Local Network Server is running on port 3000');
  });
}

app.whenReady().then(() => {
  initDatabase();
  setupIpcHandlers();
  startLocalNetworkServer();
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

ipcMain.handle('import-suppliers-excel', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      title: 'استيراد الموردين من ملف إكسيل',
      properties: ['openFile'],
      filters: [{ name: 'Excel Files', extensions: ['xlsx', 'xls'] }]
    });

    if (canceled || filePaths.length === 0) return { success: false, canceled: true };

    return await db.importSuppliersFromExcel(filePaths[0]);
  });


ipcMain.handle('update-receipt', (event, id, data) => { try { return db.updateReceipt(id, data); } catch (e) { return { success: false, error: e.message }; }});
  ipcMain.handle('update-payment', (event, id, data) => { try { return db.updatePayment(id, data); } catch (e) { return { success: false, error: e.message }; }});
  ipcMain.handle('delete-receipt', (event, id) => { try { return db.deleteReceipt(id); } catch(e) { return {success: false, error: e.message}; }});
  ipcMain.handle('delete-payment', (event, id) => { try { return db.deletePayment(id); } catch(e) { return {success: false, error: e.message}; }});

  ipcMain.handle('update-supplier', async (event, id, data) => {
    return updateSupplier(id, data);
  });

  ipcMain.handle('delete-supplier', async (event, id) => {
    return deleteSupplier(id);
  });

 
ipcMain.handle('update-advance', (event, payload) => updateAdvance(payload.id, payload.data));
ipcMain.handle('delete-advance', (event, id) => deleteAdvance(id));

ipcMain.handle('get-all-shifts-summary', async () => getAllShiftsSummary());
ipcMain.handle('get-daily-closures', async () => getDailyClosures());
  
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});