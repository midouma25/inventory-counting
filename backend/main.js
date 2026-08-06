const { app, BrowserWindow, ipcMain , Notification, dialog } = require('electron');
const db = require('./database'); 
const path = require('path');
const fs = require('fs');
// أضف هذا السطر لإخفاء تحذيرات الأمان أثناء التطوير
const licenseManager = require('./licenseManager');
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
const { 
  initDatabase, verifyLogin, getSuppliers, addSupplier, getEmployees, 
  addEmployee, handlePinEntry, getExpenses, addExpense, deleteExpense, 
  updateExpense, getTodayAttendance, 
  getSupplierDetails, addReceipt, addPayment, getAdvances, addAdvance, 
  getSalaries, calculateEmployeePayroll, paySalary , getAgendaTasks, addAgendaTask, toggleAgendaTaskStatus, getDueThisWeek , deleteAgendaTask,
  rescheduleAgendaTask , getDailySummary,
  openShift, getActiveShift, closeShift, getShiftSummary,dbPath,
  getUsers, addUser, deleteUser, updateEmployee, deleteEmployee ,logAudit , getAuditLogs, backupDatabase, getShelfProducts,
  generateExcelBackup, updateSupplier, deleteSupplier, updateAdvance, deleteAdvance, getAllShiftsSummary , getDailyClosures, getArchivedZReport,updateAttendanceRecord,getStoreMapData, processPdfInventoryEntry, enrichExtractedItems, closeBusinessDay, getSuppliersList, saveInvoiceDebt, saveMapLayout, getMapLayout, getStoreLayouts, saveStoreLayout, deleteStoreLayout, activateStoreLayout
  , deleteReceipt, deletePayment, updateReceipt, updatePayment, importSuppliersFromExcel, deleteShelfProduct, updateShelfProduct, setWindowsTime
} = require('./database');

// 👇 استدعاء آمن للمكتبة ليتوافق مع جميع إصدارات Electron و Node.js
const pdfParseRaw = require('pdf-parse');
const parsePDF = typeof pdfParseRaw === 'function' ? pdfParseRaw : pdfParseRaw.default;
const { exec } = require('child_process');

const express = require('express');
const cors = require('cors');

ipcMain.handle('delete-shelf-product', (e, id) => db.deleteShelfProduct(id));
ipcMain.handle('update-shelf-product', (e, id, name, qty) => db.updateShelfProduct(id, name, qty));
function createWindow() {
  // 1. إنشاء شاشة الإقلاع أولاً
  const splash = new BrowserWindow({
    width: 650,
    height: 400,
    transparent: true, 
    frame: false,      
    alwaysOnTop: true, 
    icon: path.join(__dirname, 'assets', 'icon.png'), // 🔴 إضافة اللوجو هنا
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
  });

  splash.loadFile(path.join(__dirname, 'splash.html'));

  // 2. إنشاء النافذة الرئيسية
  const win = new BrowserWindow({
    width: 1200, height: 800, minWidth: 900, minHeight: 600,
    show: false, 
    icon: path.join(__dirname, 'assets', 'icon.png'), // 🔴 إضافة اللوجو لشريط المهام
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.setMenuBarVisibility(false);

  // 👇==== الحل السحري للشاشة البيضاء ====👇
  const isDev = !app.isPackaged; // هل نحن في وضع التطوير أم الإنتاج (exe)؟

  if (isDev) {
    // في وضع التطوير: اقرأ من سيرفر React
    win.loadURL('http://localhost:5173'); 
  } else {
    // في وضع الإنتاج (exe): اقرأ من الملفات المبنية مباشرة
    win.loadFile(path.join(__dirname, '../frontend/dist/index.html'));
  }
  // 👆=====================================👆

  // 3. إظهار النافذة بعد التحميل
  win.once('ready-to-show', () => {
    setTimeout(() => {
      if (!splash.isDestroyed()) {
        splash.close(); 
      }
      win.show(); 
    }, 3000); 
  });
}
// 👇===== الكود السحري لتوحيد وتصحيح التوقيت المحلي لجميع صفحات البرنامج =====👇
function fixDatesGlobal(data) {
  if (!data || typeof data !== 'object') return data;
  if (Array.isArray(data)) return data.map(item => fixDatesGlobal(item));
  
  const obj = { ...data };
  for (const key in obj) {
    const value = obj[key];
    if (typeof value === 'string') {
      // البحث عن أي نص يشبه التوقيت العالمي (سواء بصيغة Node.js أو SQLite)
      const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/;
      const sqliteRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
      
      if (isoRegex.test(value)) {
        const d = new Date(value);
        const pad = (n) => n.toString().padStart(2, '0');
        obj[key] = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
      } else if (sqliteRegex.test(value)) {
        // إضافة Z لكي يتعرف عليه كأنه توقيت عالمي ويضيف له فارق الساعات الخاص بدولتك
        const d = new Date(value.replace(' ', 'T') + 'Z');
        const pad = (n) => n.toString().padStart(2, '0');
        obj[key] = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
      }
    } else if (value !== null && typeof value === 'object') {
      obj[key] = fixDatesGlobal(value);
    }
  }
  return obj;
}

// 🔴 اعتراض كل الطلبات المرسلة للواجهة الأمامية وتمريرها على الفلتر أولاً
const originalIpcHandle = ipcMain.handle;
ipcMain.handle = function(channel, listener) {
  return originalIpcHandle.call(this, channel, async (event, ...args) => {
    const result = await listener(event, ...args);
    return fixDatesGlobal(result); // إرسال بيانات نظيفة بالوقت الصحيح
  });
};
// 👆========================================================================👆
function setupIpcHandlers() {
ipcMain.handle('login', async (event, credentials) => {
  console.log("==================================");
  console.log("👤 استلمت طلب الدخول من الواجهة:", credentials.username);
  
  try {
    // هنا نقوم باستدعاء الدالة المحصنة التي برمجناها في database.js
    const result = verifyLogin(credentials.username, credentials.password);
    console.log("📦 النتيجة المُرسلة للواجهة:", result);
    return result;
  } catch (error) {
    console.error("🔥 خطأ في كوبري الدخول:", error);
    return { success: false, message: 'serverError' };
  }
});
  ipcMain.handle('get-suppliers', () => getSuppliers());
  ipcMain.handle('add-supplier', (event, data) => addSupplier(data));
  

// 🔴 مسار تصحيح وقت الويندوز تلقائياً من داخل البرنامج (النسخة المدرعة)
  ipcMain.handle('set-windows-time', async (event, datetimeStr) => {
    return new Promise((resolve) => {
      try {
        // 1. تحويل الوقت القادم من الواجهة إلى كائن Date 
        const dateObj = new Date(datetimeStr);
        
        // التحقق من أن التاريخ صالح لتجنب تحطم السكريبت
        if (isNaN(dateObj.getTime())) {
          console.error("🔥 خطأ: التاريخ المرسل غير صالح:", datetimeStr);
          return resolve({ success: false, error: "invalid_date" });
        }
        
        // 2. تحويل التاريخ لصيغة ISO العالمية (تفهمها كل أنظمة الويندوز مهما كانت لغتها)
        const safeIsoDate = dateObj.toISOString(); 

        // 3. أمر PowerShell مدرع ضد مسافات النصوص وأخطاء الترجمة
        const command = `powershell.exe -Command "Start-Process powershell -Verb RunAs -WindowStyle Hidden -ArgumentList \\"-Command Set-Date -Date ([datetime]'${safeIsoDate}')\\""`;

        exec(command, (error) => {
          if (error) {
            console.error("🔥 خطأ في تحديث وقت الويندوز:", error);
            resolve({ success: false, error: error.message });
          } else {
            resolve({ success: true });
          }
        });
      } catch (err) {
        resolve({ success: false, error: err.message });
      }
    });
  });


  ipcMain.handle('get-supplier-details', (event, id) => getSupplierDetails(id));
  ipcMain.handle('add-receipt', (event, data) => {
    try { return { success: true, id: addReceipt(data) }; } 
    catch (e) { return { success: false, error: e.message }; }
  });
  ipcMain.handle('add-payment', (event, data) => {
    try { return { success: true, id: addPayment(data) }; } 
    catch (e) { return { success: false, error: e.message }; }
  });
  ipcMain.handle('save-map-layout', (event, items) => db.saveMapLayout(items));
  ipcMain.handle('get-map-layout', () => db.getMapLayout());
  ipcMain.handle('get-shelf-products', (event, shelfId) => db.getShelfProducts(shelfId));
  ipcMain.handle("print-receipt", async (event) => {
  
    const win = BrowserWindow.fromWebContents(event.sender);

    return new Promise((resolve)=>{

        win.webContents.print({

            silent:false,

            printBackground:true,

            margins:{
                marginType:"none"
            },

            scaleFactor:100,

            landscape:false,

            color:false

        },(success,errorType)=>{

            resolve({
                success,
                errorType
            });

        });

    });

});
  

  // --- مسارات الخريطة والمخزون الذكي ---
  ipcMain.handle('get-store-map-data', () => getStoreMapData());
  ipcMain.handle('process-pdf-inventory', (event, data) => processPdfInventoryEntry(data.shelfId, data.barcode, data.cleanName, data.dirtyName, data.quantity));

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
  ipcMain.handle('get-store-layouts', () => db.getStoreLayouts());
  ipcMain.handle('save-store-layout', (event, data) => db.saveStoreLayout(data));
  ipcMain.handle('delete-store-layout', (event, id) => db.deleteStoreLayout(id));
  ipcMain.handle('activate-store-layout', (event, id) => db.activateStoreLayout(id));
  // 🌟 مسارات استيراد الفواتير الذكية (PDF) 🌟
  
  // 1. جلب قائمة الموردين للنافذة المنسدلة
  ipcMain.handle('get-suppliers-list', async () => {
    try {
      // نستخدم دالة getSuppliers الموجودة لديك مسبقاً في database.js
      const suppliers = getSuppliers(); 
      return { success: true, data: suppliers };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });

  // 2. ترحيل الفاتورة كدين (إضافة وصل استلام فاتورة)
  ipcMain.handle('save-invoice-debt', async (event, data) => {
    try {
      // تجهيز البيانات لتتناسب مع دالة addReceipt الموجودة لديك
      const receiptData = {
        supplierId: data.supplierId,
        amount: data.totalAmount,
        date: data.date,
        // إضافة ملاحظة توثيقية آلية لحماية حقوق المحل
        notes: `فاتورة مستوردة آلياً (PDF) - الاسم المصدر بالملف: ${data.pdfSupplierName}` 
      };
      
      const newId = addReceipt(receiptData);
      return { success: true, id: newId };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });
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


  ipcMain.handle('check-activation', () => licenseManager.checkIsActivated());
  ipcMain.handle('get-hardware-id', () => licenseManager.getHardwareId());
  ipcMain.handle('activate-app', (event, key) => licenseManager.activateApp(key));

  
ipcMain.handle('get-users', () => getUsers());
  ipcMain.handle('add-user', (event, data) => addUser(data));
  ipcMain.handle('delete-user', (event, id) => deleteUser(id));


  ipcMain.handle('update-employee', (event, id, data) => updateEmployee(id, data));
  ipcMain.handle('delete-employee', (event, id) => deleteEmployee(id));

  ipcMain.handle('get-audit-logs', () => getAuditLogs());

  ipcMain.handle('delete-expense', (event, id, username) => deleteExpense(id, username));
  
  ipcMain.handle('close-business-day', async (event, adminName) => closeBusinessDay(adminName));

  ipcMain.handle('get-archived-zreport', async (event, id) => getArchivedZReport(id));
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
        res.json({ success: true, data: fixDatesGlobal(result) });
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
// 2. استعادة البيانات
  ipcMain.handle('restore-database', async () => {
    
    // 🔴 لقد قمنا بحذف تعريف dbPath من هنا، لأنه سيستخدم المسار القادم من database.js مباشرة!
    
    // فتح نافذة للمستخدم لاختيار ملف النسخة الاحتياطية
    const { canceled, filePaths } = await dialog.showOpenDialog({
      title: 'اختيار ملف النسخة الاحتياطية (Select Backup File)',
      properties: ['openFile'],
      filters: [
        { name: 'Database Files', extensions: ['db', 'sqlite', 'sqlite3'] },
        { name: 'All Files', extensions: ['*'] }
      ]
    });

    if (canceled || filePaths.length === 0) return { success: false, canceled: true };

    try {
      const sourcePath = filePaths[0];
      
      const buffer = Buffer.alloc(16);
      const fd = fs.openSync(sourcePath, 'r');
      fs.readSync(fd, buffer, 0, 16, 0);
      fs.closeSync(fd);
      
      const header = buffer.toString('utf8');
      if (!header.startsWith('SQLite format 3')) {
        return { success: false, error: 'invalid_format' }; 
      }

      // 🔴 هنا سيقوم بنسخ الملف المختار واستبداله بالمسار الأصلي المعرف في database.js
      fs.copyFileSync(sourcePath, dbPath);
      
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
      title: 'استيراد ديون الموردين من ملفات إكسيل',
      properties: ['openFile', 'multiSelections'], // 🔴 تفعيل التحديد المتعدد
      filters: [{ name: 'Excel Files', extensions: ['xlsx', 'xls'] }]
    });

    if (canceled || filePaths.length === 0) return { success: false, canceled: true };

    let successCount = 0;
    let errors = [];

    // قراءة كل الملفات المحددة واحداً تلو الآخر
    for (let filePath of filePaths) {
      const res = await db.importSuppliersFromExcel(filePath);
      if (res.success) {
        successCount++;
      } else {
        errors.push(`${require('path').basename(filePath)}: ${res.error}`);
      }
    }

    if (successCount > 0) {
      return { success: true, count: successCount, error: errors.join('\n') };
    } else {
      return { success: false, error: errors.join('\n') };
    }
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



ipcMain.handle('parse-pdf-invoice', async () => {
    try {
      const { canceled, filePaths } = await dialog.showOpenDialog({
        title: 'اختر ملف PDF (Bon de Livraison)',
        filters: [{ name: 'PDF Files', extensions: ['pdf'] }]
      });

      if (canceled || filePaths.length === 0) return { success: false, canceled: true };

      const PDFParser = require("pdf2json");
      
      return new Promise((resolve, reject) => {
        const pdfParser = new PDFParser(this, 1);
        
        pdfParser.on("pdfParser_dataError", errData => {
           resolve({ success: false, error: "تعذر قراءة هيكل الملف." });
        });
        
        pdfParser.on("pdfParser_dataReady", pdfData => {
            let text = pdfParser.getRawTextContent();
            text = text.replace(/\r\n/g, '\n');
            
            const lines = text.split('\n');
            let extractedItems = [];
            
            // 🌟 كائن جديد لتخزين بيانات الفاتورة الأساسية
            let invoiceMeta = {
              supplierName: "",
              totalAmount: 0
            };

            for (let line of lines) {
              const trimmedLine = line.trim();
              if (!trimmedLine) continue;

              // 1. استخراج اسم المورد
              if (trimmedLine.toUpperCase().includes('FOURNISSEUR')) {
                // استخراج ما بعد كلمة Fournisseur أو النقطتين
                const parts = trimmedLine.split(/[:|]/);
                if (parts.length > 1) {
                  invoiceMeta.supplierName = parts[1].trim();
                }
              }

              // 2. استخراج المبلغ الإجمالي
              if (trimmedLine.toUpperCase().includes('NET A PAYER') || trimmedLine.toUpperCase().includes('TOTAL TTC')) {
                // قنص الأرقام فقط من السطر (مع الفاصلة والنقطة)
                let amountStr = trimmedLine.replace(/[^0-9,.]/g, '');
                // توحيد الفواصل العشرية
                amountStr = amountStr.replace(',', '.');
                // بما أن الرقم قد يحتوي على مسافات (مثال 39 390)، استخراج الرقم كالتالي:
                const amountMatches = trimmedLine.match(/[\d\s]+[.,]\d{2}/);
                if (amountMatches) {
                   const cleanAmount = parseFloat(amountMatches[0].replace(/\s/g, '').replace(',', '.'));
                   if (!isNaN(cleanAmount)) {
                     invoiceMeta.totalAmount = cleanAmount;
                   }
                }
              }

              // 3. استخراج السلع (الخوارزمية المدرعة السابقة)
              const columns = trimmedLine.split(/\s{3,}/).map(col => col.trim());

              if (columns.length >= 5 && /^\d+$/.test(columns[0])) {
                const id = columns[0];
                const barcode = columns[1];
                
                const qtyIndex = columns.length - 4;
                const finalQtyIndex = qtyIndex > 1 ? qtyIndex : 2;
                
                const qtyStr = columns[finalQtyIndex];
                const qty = parseFloat(qtyStr.replace(/\s/g, '').replace(',', '.'));
                
                if (!isNaN(qty)) {
                  const dirtyName = columns.slice(2, finalQtyIndex).join(' ');
                  extractedItems.push({
                    id: id,
                    barcode: barcode,
                    dirtyName: dirtyName || "بدون اسم",
                    quantity: qty,
                  });
                }
              }
            }

            const enrichedItems = enrichExtractedItems(extractedItems);
            
            // 🌟 نرجع السلع + بيانات الفاتورة للواجهة الأمامية
            resolve({ success: true, data: enrichedItems, meta: invoiceMeta });
        });
        
        pdfParser.loadPDF(filePaths[0]);
      });

    } catch (error) {
      return { success: false, error: error.message };
    }
  });

ipcMain.handle('update-advance', (event, payload) => updateAdvance(payload.id, payload.data));
ipcMain.handle('delete-advance', (event, id) => deleteAdvance(id));

ipcMain.handle('get-all-shifts-summary', async () => getAllShiftsSummary());
ipcMain.handle('get-daily-closures', async () => getDailyClosures());
ipcMain.handle('update-attendance-record', (event, id, timeIn, timeOut) => updateAttendanceRecord(id, timeIn, timeOut)); 
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});