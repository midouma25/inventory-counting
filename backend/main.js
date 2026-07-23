const { app, BrowserWindow, ipcMain , Notification } = require('electron');
const path = require('path');
const { 
  initDatabase, verifyLogin, getSuppliers, addSupplier, getEmployees, 
  addEmployee, handlePinEntry, getExpenses, addExpense, deleteExpense, 
  updateExpense, getTodayAttendance, 
  getSupplierDetails, addReceipt, addPayment, getAdvances, addAdvance, 
  getSalaries, calculateEmployeePayroll, paySalary , getAgendaTasks, addAgendaTask, toggleAgendaTaskStatus, getDueThisWeek , deleteAgendaTask,
  rescheduleAgendaTask

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


// --- الأجندة والتنبيهات ---
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


// تفعيل إشعارات سطح المكتب
ipcMain.on('show-notification', (event, data) => {
  if (Notification.isSupported()) {
    new Notification({
      // نستخدم البيانات القادمة، وإذا ضاعت نستخدم نصاً افتراضياً
      title: data?.title || 'تنبيهات النظام ⚠️',
      body: data?.body || 'لديك مهام مستحقة تحتاج إلى مراجعة',
      icon: path.join(__dirname, 'assets', 'icon.png') // تأكد من مسار الأيقونة إذا أردت تغيير أيقونة Electron
    }).show();
  }
});





// دالة لجلب ملخص الحركات المالية ليوم محدد
ipcMain.handle('get-daily-summary', (event, date) => {
  try {
    // 1. حساب إجمالي المصاريف العامة لذلك اليوم
    const expensesRow = db.prepare(`SELECT SUM(amount) as total FROM expenses WHERE date = ?`).get(date);
    const totalExpenses = expensesRow.total || 0;

    // 2. حساب إجمالي دفعات الموردين لذلك اليوم
    // ملاحظة: تأكد من اسم الجدول الخاص بالدفعات في قاعدة بياناتك (مثلا payments أو supplier_payments)
    const paymentsRow = db.prepare(`SELECT SUM(amount) as total FROM payments WHERE payment_date = ?`).get(date);
    const totalPayments = paymentsRow.total || 0;

    // 3. حساب إجمالي سلف العمال لذلك اليوم
    // ملاحظة: تأكد من اسم جدول السلف (مثلا advances أو employee_advances)
    const advancesRow = db.prepare(`SELECT SUM(amount) as total FROM advances WHERE date = ?`).get(date);
    const totalAdvances = advancesRow.total || 0;

    // إجمالي الأموال الخارجة من الصندوق
    const totalOut = totalExpenses + totalPayments + totalAdvances;

    return {
      success: true,
      date: date,
      data: {
        expenses: totalExpenses,
        supplierPayments: totalPayments,
        advances: totalAdvances,
        totalOut: totalOut
      }
    };
  } catch (error) {
    console.error("خطأ أثناء جلب ملخص اليوم:", error);
    return { success: false, error: error.message };
  }
});





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