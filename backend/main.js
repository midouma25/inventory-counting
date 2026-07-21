const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { initDatabase, verifyLogin, getSuppliers, addSupplier, getEmployees, addEmployee, handlePinEntry, getTodayAttendance } = require('./database');
function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    show: false, // إخفاء النافذة حتى تكتمل جاهزيتها
  });

  // إزالة القائمة العلوية الافتراضية
  win.setMenuBarVisibility(false);

  // تشغيل واجهة React
  win.loadURL('http://localhost:5173');

  // إظهار النافذة بسلاسة عند جاهزيتها
  win.once('ready-to-show', () => {
    win.show();
  });
}



// إنشاء قنوات الاتصال (IPC Channels)
function setupIpcHandlers() {
  // قناة تسجيل الدخول
  ipcMain.handle('login', async (event, credentials) => {
    return verifyLogin(credentials.username, credentials.password);
  });

  // الموردين
  ipcMain.handle('get-suppliers', () => {
    return getSuppliers(); // مسحنا .db
  });

  ipcMain.handle('add-supplier', (event, data) => {
    return addSupplier(data); // مسحنا .db
  });

  // الموارد البشرية والحضور
  ipcMain.handle('get-employees', () => {
    return getEmployees(); // مسحنا .db
  });

  ipcMain.handle('add-employee', (event, data) => {
    return addEmployee(data); // مسحنا .db
  });

  ipcMain.handle('handle-pin-entry', (event, pinCode) => {
    return handlePinEntry(pinCode); // مسحنا .db
  });

  ipcMain.handle('get-today-attendance', () => {
    return getTodayAttendance(); // مسحنا .db
  });
}

app.whenReady().then(() => {
  // 1. تهيئة قاعدة البيانات
  initDatabase();
  
  // 2. تفعيل قنوات الاتصال
  setupIpcHandlers();
  
  // 3. فتح النافذة
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});