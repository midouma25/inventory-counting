const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { initDatabase, verifyLogin, getSuppliers, addSupplier } = require('./database');

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

  // قنوات الموردين
  ipcMain.handle('get-suppliers', async () => {
    return getSuppliers();
  });

  ipcMain.handle('add-supplier', async (event, data) => {
    return addSupplier(data);
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