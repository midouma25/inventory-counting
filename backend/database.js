const Database = require('better-sqlite3');
const path = require('path');
const { app } = require('electron');
const ExcelJS = require('exceljs');
const dbPath = path.join(app.getPath('userData'), 'pos_manager2.db');
const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

function initDatabase() {
  try {
    db.prepare(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE NOT NULL, password TEXT NOT NULL, role TEXT NOT NULL DEFAULT 'admin')`).run();
    
    const checkAdmin = db.prepare("SELECT COUNT(*) as count FROM users WHERE username = 'admin'").get();
    if (checkAdmin.count === 0) {
      db.prepare("INSERT INTO users (username, password, role) VALUES (?, ?, ?)").run('admin', 'admin', 'admin');
    }

    db.prepare(`CREATE TABLE IF NOT EXISTS suppliers (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, phone TEXT, initial_debt REAL DEFAULT 0, total_debt REAL DEFAULT 0, status TEXT DEFAULT 'clear', created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`).run();
    db.prepare(`CREATE TABLE IF NOT EXISTS receipts (id INTEGER PRIMARY KEY AUTOINCREMENT, supplier_id INTEGER NOT NULL, amount REAL NOT NULL, date TEXT NOT NULL, note TEXT, pdf_path TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (supplier_id) REFERENCES suppliers(id))`).run();
    db.prepare(`CREATE TABLE IF NOT EXISTS payments (id INTEGER PRIMARY KEY AUTOINCREMENT, supplier_id INTEGER NOT NULL, amount REAL NOT NULL, date TEXT NOT NULL, caisse_source TEXT, note TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (supplier_id) REFERENCES suppliers(id))`).run();

    db.prepare(`CREATE TABLE IF NOT EXISTS employees (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, role TEXT, pin_code TEXT UNIQUE, status TEXT DEFAULT 'active', created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`).run();
    db.prepare(`CREATE TABLE IF NOT EXISTS attendance (id INTEGER PRIMARY KEY AUTOINCREMENT, employee_id INTEGER NOT NULL, date TEXT NOT NULL, time_in TEXT, time_out TEXT, status TEXT DEFAULT 'present', FOREIGN KEY (employee_id) REFERENCES employees(id))`).run();
    db.prepare(`CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT NOT NULL, category TEXT NOT NULL, amount REAL NOT NULL, date TEXT NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`).run();
    
    // إنشاء جدول الأجندة
    db.prepare(`CREATE TABLE IF NOT EXISTS agenda_tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, type TEXT NOT NULL, task_date TEXT NOT NULL, task_time TEXT, status TEXT DEFAULT 'pending', created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`).run();

    // إضافة حقل المبلغ لجدول الأجندة (مع تخطي الخطأ إذا كان موجوداً مسبقاً)
    try {
      db.prepare("ALTER TABLE agenda_tasks ADD COLUMN amount REAL DEFAULT 0").run();
    } catch (innerError) {
      // نتجاهل الخطأ بصمت لأن العمود موجود بالفعل
    }

    db.prepare(`CREATE TABLE IF NOT EXISTS advances (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      employee_id INTEGER NOT NULL, 
      amount REAL NOT NULL, 
      date TEXT NOT NULL, 
      caisse_source TEXT, 
      note TEXT, 
      status TEXT DEFAULT 'pending', 
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
      FOREIGN KEY (employee_id) REFERENCES employees(id)
    )`).run();

    db.prepare(`CREATE TABLE IF NOT EXISTS salaries (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      employee_id INTEGER NOT NULL, 
      start_date TEXT NOT NULL, 
      end_date TEXT NOT NULL, 
      total_hours REAL NOT NULL, 
      hourly_rate REAL NOT NULL, 
      total_advances REAL NOT NULL, 
      net_salary REAL NOT NULL, 
      payment_date TEXT NOT NULL, 
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
      FOREIGN KEY (employee_id) REFERENCES employees(id)
    )`).run();
    
    // 1. إضافة جدول الورديات (Shifts)
    db.prepare(`CREATE TABLE IF NOT EXISTS shifts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cashier_name TEXT NOT NULL,
      opening_balance REAL NOT NULL,
      start_time DATETIME DEFAULT CURRENT_TIMESTAMP,
      end_time DATETIME,
      actual_cash REAL,
      difference REAL,
      status TEXT DEFAULT 'open',
      note TEXT
    )`).run();
    

    db.prepare(`CREATE TABLE IF NOT EXISTS audit_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      username TEXT NOT NULL, 
      action TEXT NOT NULL, 
      details TEXT, 
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`).run();



    const tableCheck = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='shifts'").get();
    if (tableCheck) {
      console.log("✅ Shifts table created successfully!");
    } else {
      console.log("❌ Shifts table was not created.");
    }

    console.log('تمت تهيئة قاعدة البيانات بنجاح');
  } catch (error) {
    console.error('خطأ أثناء تهيئة قاعدة البيانات:', error);
  }
}

// الدالة المعدلة لجلب المصاريف بشكل موحد
function getExpenses() {
  return db.prepare(`
    SELECT id, description, category, amount, date, 'expense' as source 
    FROM expenses 
    UNION ALL 
    SELECT a.id, e.name || (CASE WHEN a.note != '' THEN ' - ' || a.note ELSE '' END) as description, 'advance' as category, a.amount, a.date, 'advance' as source 
    FROM advances a
    JOIN employees e ON a.employee_id = e.id
    UNION ALL
    SELECT p.id, s.name || (CASE WHEN p.note != '' THEN ' - ' || p.note ELSE '' END) as description, 'supplier_payment' as category, p.amount, p.date, 'supplier_payment' as source 
    FROM payments p
    JOIN suppliers s ON p.supplier_id = s.id
    ORDER BY date DESC, id DESC
  `).all();
}

// 2. دوال التحكم في الورديات الجديدة
function openShift(data) {
  const activeShift = db.prepare("SELECT * FROM shifts WHERE cashier_name = ? AND status = 'open'").get(data.cashierName);
  if (activeShift) return { success: false, message: 'لديك وردية مفتوحة بالفعل.' };

  const info = db.prepare('INSERT INTO shifts (cashier_name, opening_balance) VALUES (?, ?)').run(data.cashierName, data.openingBalance);
  return { success: true, shiftId: info.lastInsertRowid };
}

function getActiveShift(cashierName) {
  return db.prepare("SELECT * FROM shifts WHERE cashier_name = ? AND status = 'open'").get(cashierName);
}

function closeShift(data) {
  const endTime = new Date().toISOString();
  db.prepare(`
    UPDATE shifts 
    SET end_time = ?, actual_cash = ?, difference = ?, status = 'closed', note = ?
    WHERE id = ?
  `).run(endTime, data.actualCash, data.difference, data.note, data.shiftId);
  return { success: true };
}



function getShiftSummary(cashierName, startTime) {
  try {
    let paymentsRow, advancesRow;
    const expensesRow = db.prepare("SELECT SUM(amount) as total FROM expenses WHERE created_at >= ?").get(startTime);

    // إذا كان المستخدم هو المدير العام، نجمع كل الأموال الخارجة بغض النظر عن الكاشير
    if (cashierName === 'المدير العام' || cashierName === 'Super Admin' || cashierName === 'admin') {
      paymentsRow = db.prepare("SELECT SUM(amount) as total FROM payments WHERE created_at >= ?").get(startTime);
      advancesRow = db.prepare("SELECT SUM(amount) as total FROM advances WHERE created_at >= ?").get(startTime);
    } else {
      // إذا كان كاشير عادي، نجمع مبالغه هو فقط
      paymentsRow = db.prepare("SELECT SUM(amount) as total FROM payments WHERE caisse_source = ? AND created_at >= ?").get(cashierName, startTime);
      advancesRow = db.prepare("SELECT SUM(amount) as total FROM advances WHERE caisse_source = ? AND created_at >= ?").get(cashierName, startTime);
    }

    const totalExp = expensesRow.total || 0;
    const totalPay = paymentsRow.total || 0;
    const totalAdv = advancesRow.total || 0;

    return {
      success: true,
      data: {
        expenses: totalExp,
        supplierPayments: totalPay,
        advances: totalAdv,
        totalOut: totalExp + totalPay + totalAdv
      }
    };
  } catch (error) {
    console.error("Database Error in getShiftSummary:", error);
    return { success: false, error: error.message };
  }
}



function getUsers() {
  return db.prepare("SELECT id, username, role FROM users").all();
}


// دالة إضافة مستخدم (تلقائياً تضيفه كعامل في الموارد البشرية)
function addUser(data) {
  try {
    // 1. التحقق مما إذا كان رقم السري (PIN) مستخدماً من قبل عامل آخر (لأنه يجب أن يكون فريداً)
    const existingPin = db.prepare("SELECT * FROM employees WHERE pin_code = ?").get(data.password);
    if (existingPin) {
      return { success: false, message: 'The password (PIN) is already in use for another agent, please choose a different password.' };
    }

    // 2. استخدام Transaction لضمان إنشاء الحساب وملف العامل معاً
    const insertTx = db.transaction(() => {
      // إضافة حساب الدخول
      const userStmt = db.prepare("INSERT INTO users (username, password, role) VALUES (?, ?, ?)");
      const userInfo = userStmt.run(data.username, data.password, data.role || 'cashier');
      
      // إضافة ملف الموارد البشرية بنفس الاسم وكلمة المرور كـ PIN
      const empStmt = db.prepare("INSERT INTO employees (name, role, pin_code) VALUES (?, ?, ?)");
      empStmt.run(data.username, data.role || 'cashier', data.password);

      return userInfo.lastInsertRowid;
    });

    const newId = insertTx();
    return { success: true, id: newId };
  } catch (error) {
    if (error.message.includes('UNIQUE')) {
      return { success: false, message: 'The username already exists' };
    }
    return { success: false, message: error.message };
  }
}


// دالة حذف مستخدم من النظام
function deleteUser(id) {
  try {
    // نمنع حذف حساب الأدمن الأساسي لحماية النظام
    db.prepare("DELETE FROM users WHERE id = ? AND username != 'admin'").run(id);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}



// دالة تعديل بيانات عامل (جديدة)
function updateEmployee(id, data) {
  try {
    db.prepare("UPDATE employees SET name = ?, role = ?, pin_code = ? WHERE id = ?")
      .run(data.name, data.role, data.pinCode, id);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// دالة حذف عامل (جديدة)
function deleteEmployee(id) {
  try {
    db.prepare("DELETE FROM employees WHERE id = ?").run(id);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}


// دالة توليد ملف الإكسيل الشامل (يحتوي على جميع جداول قاعدة البيانات)
async function generateExcelBackup(outputPath) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'POS Manager System';
  workbook.created = new Date();

  // 1. ورقة المصاريف (Expenses)
  const expensesSheet = workbook.addWorksheet('المصاريف - Expenses');
  expensesSheet.columns = [
    { header: 'الرقم | ID', key: 'id', width: 10 },
    { header: 'الوصف | Description', key: 'description', width: 35 },
    { header: 'التصنيف | Category', key: 'category', width: 25 },
    { header: 'المبلغ | Amount', key: 'amount', width: 15 },
    { header: 'التاريخ | Date', key: 'date', width: 15 },
    { header: 'تاريخ الإنشاء | Created At', key: 'created_at', width: 25 }
  ];
  expensesSheet.addRows(db.prepare('SELECT * FROM expenses').all());
  expensesSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
  expensesSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0070C0' } }; // أزرق

  // 2. ورقة الموردين (Suppliers)
  const suppliersSheet = workbook.addWorksheet('الموردين - Suppliers');
  suppliersSheet.columns = [
    { header: 'الرقم | ID', key: 'id', width: 10 },
    { header: 'الاسم | Name', key: 'name', width: 30 },
    { header: 'الهاتف | Phone', key: 'phone', width: 20 },
    { header: 'الدين الأولي | Initial Debt', key: 'initial_debt', width: 20 },
    { header: 'الدين الإجمالي | Total Debt', key: 'total_debt', width: 20 },
    { header: 'الحالة | Status', key: 'status', width: 15 },
    { header: 'تاريخ الإنشاء | Created At', key: 'created_at', width: 25 }
  ];
  suppliersSheet.addRows(db.prepare('SELECT * FROM suppliers').all());
  suppliersSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
  suppliersSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF00B050' } }; // أخضر

  // 3. ورقة فواتير الموردين (Receipts)
  const receiptsSheet = workbook.addWorksheet('فواتير الموردين - Receipts');
  receiptsSheet.columns = [
    { header: 'الرقم | ID', key: 'id', width: 10 },
    { header: 'رقم المورد | Supplier ID', key: 'supplier_id', width: 20 },
    { header: 'المبلغ | Amount', key: 'amount', width: 15 },
    { header: 'التاريخ | Date', key: 'date', width: 15 },
    { header: 'ملاحظة | Note', key: 'note', width: 30 },
    { header: 'تاريخ الإنشاء | Created At', key: 'created_at', width: 25 }
  ];
  receiptsSheet.addRows(db.prepare('SELECT * FROM receipts').all());
  receiptsSheet.getRow(1).font = { bold: true };
  receiptsSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF92D050' } }; // أخضر فاتح

  // 4. ورقة مدفوعات الموردين (Supplier Payments)
  const paymentsSheet = workbook.addWorksheet('مدفوعات الموردين - Payments');
  paymentsSheet.columns = [
    { header: 'الرقم | ID', key: 'id', width: 10 },
    { header: 'رقم المورد | Supplier ID', key: 'supplier_id', width: 20 },
    { header: 'المبلغ | Amount', key: 'amount', width: 15 },
    { header: 'التاريخ | Date', key: 'date', width: 15 },
    { header: 'المصدر | Caisse Source', key: 'caisse_source', width: 20 },
    { header: 'ملاحظة | Note', key: 'note', width: 30 }
  ];
  paymentsSheet.addRows(db.prepare('SELECT * FROM payments').all());
  paymentsSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
  paymentsSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF385D8A' } }; // أزرق داكن

  // 5. ورقة العمال (Employees)
  const employeesSheet = workbook.addWorksheet('العمال - Employees');
  employeesSheet.columns = [
    { header: 'الرقم | ID', key: 'id', width: 10 },
    { header: 'الاسم | Name', key: 'name', width: 30 },
    { header: 'المنصب | Role', key: 'role', width: 20 },
    { header: 'الرمز السري | PIN', key: 'pin_code', width: 15 },
    { header: 'الحالة | Status', key: 'status', width: 15 },
    { header: 'تاريخ الإنشاء | Created At', key: 'created_at', width: 25 }
  ];
  employeesSheet.addRows(db.prepare('SELECT * FROM employees').all());
  employeesSheet.getRow(1).font = { bold: true };
  employeesSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFA500' } }; // برتقالي

  // 6. ورقة الحضور (Attendance)
  const attendanceSheet = workbook.addWorksheet('الحضور - Attendance');
  attendanceSheet.columns = [
    { header: 'الرقم | ID', key: 'id', width: 10 },
    { header: 'رقم العامل | Employee ID', key: 'employee_id', width: 20 },
    { header: 'التاريخ | Date', key: 'date', width: 15 },
    { header: 'وقت الدخول | Time In', key: 'time_in', width: 15 },
    { header: 'وقت الخروج | Time Out', key: 'time_out', width: 15 },
    { header: 'الحالة | Status', key: 'status', width: 15 }
  ];
  attendanceSheet.addRows(db.prepare('SELECT * FROM attendance').all());
  attendanceSheet.getRow(1).font = { bold: true };
  attendanceSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFC000' } }; // أصفر

  // 7. ورقة السلفيات (Advances)
  const advancesSheet = workbook.addWorksheet('السلفيات - Advances');
  advancesSheet.columns = [
    { header: 'الرقم | ID', key: 'id', width: 10 },
    { header: 'رقم العامل | Employee ID', key: 'employee_id', width: 20 },
    { header: 'المبلغ | Amount', key: 'amount', width: 15 },
    { header: 'التاريخ | Date', key: 'date', width: 15 },
    { header: 'ملاحظة | Note', key: 'note', width: 30 },
    { header: 'الحالة | Status', key: 'status', width: 15 }
  ];
  advancesSheet.addRows(db.prepare('SELECT * FROM advances').all());
  advancesSheet.getRow(1).font = { bold: true };
  advancesSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE2EFDA' } }; 

  // 8. ورقة الرواتب (Salaries)
  const salariesSheet = workbook.addWorksheet('الرواتب - Salaries');
  salariesSheet.columns = [
    { header: 'الرقم | ID', key: 'id', width: 10 },
    { header: 'رقم العامل | Emp ID', key: 'employee_id', width: 15 },
    { header: 'من | Start Date', key: 'start_date', width: 15 },
    { header: 'إلى | End Date', key: 'end_date', width: 15 },
    { header: 'إجمالي الساعات | Total Hours', key: 'total_hours', width: 20 },
    { header: 'سعر الساعة | Hourly Rate', key: 'hourly_rate', width: 20 },
    { header: 'إجمالي السلف | Total Advances', key: 'total_advances', width: 25 },
    { header: 'الصافي | Net Salary', key: 'net_salary', width: 20 },
    { header: 'تاريخ الدفع | Payment Date', key: 'payment_date', width: 20 }
  ];
  salariesSheet.addRows(db.prepare('SELECT * FROM salaries').all());
  salariesSheet.getRow(1).font = { bold: true };
  salariesSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF4B084' } };

  // 9. ورقة الورديات (Shifts)
  const shiftsSheet = workbook.addWorksheet('الورديات - Shifts');
  shiftsSheet.columns = [
    { header: 'الرقم | ID', key: 'id', width: 10 },
    { header: 'الكاشير | Cashier', key: 'cashier_name', width: 25 },
    { header: 'الافتتاحي | Opening Balance', key: 'opening_balance', width: 25 },
    { header: 'وقت البدء | Start Time', key: 'start_time', width: 25 },
    { header: 'وقت الانتهاء | End Time', key: 'end_time', width: 25 },
    { header: 'النقود الفعلية | Actual Cash', key: 'actual_cash', width: 20 },
    { header: 'الفارق | Difference', key: 'difference', width: 15 },
    { header: 'الحالة | Status', key: 'status', width: 15 }
  ];
  shiftsSheet.addRows(db.prepare('SELECT * FROM shifts').all());
  shiftsSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
  shiftsSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF7030A0' } }; // بنفسجي

  // 10. ورقة الأجندة (Agenda Tasks)
  const agendaSheet = workbook.addWorksheet('الأجندة - Agenda');
  agendaSheet.columns = [
    { header: 'الرقم | ID', key: 'id', width: 10 },
    { header: 'العنوان | Title', key: 'title', width: 30 },
    { header: 'النوع | Type', key: 'type', width: 15 },
    { header: 'المبلغ | Amount', key: 'amount', width: 15 },
    { header: 'التاريخ | Date', key: 'task_date', width: 15 },
    { header: 'الوقت | Time', key: 'task_time', width: 15 },
    { header: 'الحالة | Status', key: 'status', width: 15 }
  ];
  agendaSheet.addRows(db.prepare('SELECT * FROM agenda_tasks').all());
  agendaSheet.getRow(1).font = { bold: true };
  agendaSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF66CC' } }; // وردي

  // 11. ورقة حسابات الدخول (Users)
  const usersSheet = workbook.addWorksheet('المستخدمين - Users');
  usersSheet.columns = [
    { header: 'الرقم | ID', key: 'id', width: 10 },
    { header: 'اسم المستخدم | Username', key: 'username', width: 25 },
    { header: 'كلمة المرور | Password', key: 'password', width: 25 },
    { header: 'الصلاحية | Role', key: 'role', width: 20 }
  ];
  usersSheet.addRows(db.prepare('SELECT * FROM users').all());
  usersSheet.getRow(1).font = { bold: true };
  usersSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFBFBFBF' } }; // رمادي

  // 12. ورقة سجل الحركات (Audit Logs)
  const auditSheet = workbook.addWorksheet('سجل الحركات - Audit Logs');
  auditSheet.columns = [
    { header: 'الرقم | ID', key: 'id', width: 10 },
    { header: 'المستخدم | Username', key: 'username', width: 25 },
    { header: 'الإجراء | Action', key: 'action', width: 25 },
    { header: 'التفاصيل | Details', key: 'details', width: 50 },
    { header: 'الوقت والتاريخ | Created At', key: 'created_at', width: 25 }
  ];
  auditSheet.addRows(db.prepare('SELECT * FROM audit_logs').all());
  auditSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
  auditSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFC00000' } }; // أحمر

  // حفظ الملف الشامل
  await workbook.xlsx.writeFile(outputPath);
}


function addExpense(expense) {
  const stmt = db.prepare('INSERT INTO expenses (description, category, amount, date) VALUES (?, ?, ?, ?)');
  const date = expense.date || new Date().toISOString().split('T')[0];
  const info = stmt.run(expense.description, expense.category, expense.amount, date);
  const detailsObj = { desc: data.description, amount: data.amount };
  logAudit(data.username || 'System', 'ADD_EXPENSE', JSON.stringify(detailsObj));
  return { success: true, id: info.lastInsertRowid };
}

function deleteExpense(id) { return { success: db.prepare('DELETE FROM expenses WHERE id = ?').run(id).changes > 0 }; }

function updateExpense(id, expense) { return { success: db.prepare('UPDATE expenses SET description = ?, category = ?, amount = ? WHERE id = ?').run(expense.description, expense.category, expense.amount, id).changes > 0 }; }

function verifyLogin(username, password) {
  try {
    const user = db.prepare("SELECT * FROM users WHERE username = ? AND password = ?").get(username, password);
    if (user) return { success: true, user: { id: user.id, username: user.username, role: user.role } };
    return { success: false, message: 'Invalid username or password' };
  } catch (error) { return { success: false, message: error.message }; }
}

function getEmployees() { return db.prepare('SELECT * FROM employees').all(); }

function addEmployee(employeeData) {
  const info = db.prepare(`INSERT INTO employees (name, role, pin_code) VALUES (?, ?, ?)`).run(employeeData.name, employeeData.role, employeeData.pinCode);
  return db.prepare("SELECT * FROM employees WHERE id = ?").get(info.lastInsertRowid);
}

function handlePinEntry(pinCode) {
  const employee = db.prepare("SELECT * FROM employees WHERE pin_code = ?").get(pinCode);
  if (!employee) return { success: false, message: 'رمز PIN غير صحيح' };
  const today = new Date().toISOString().split('T')[0];
  const now = new Date().toLocaleTimeString('en-US', { hour12: false });
  const record = db.prepare("SELECT * FROM attendance WHERE employee_id = ? AND date = ?").get(employee.id, today);
  if (!record) {
    db.prepare("INSERT INTO attendance (employee_id, date, time_in) VALUES (?, ?, ?)").run(employee.id, today, now);
    return { success: true, action: 'check_in', employeeName: employee.name, time: now };
  } else if (!record.time_out) {
    db.prepare("UPDATE attendance SET time_out = ? WHERE id = ?").run(now, record.id);
    return { success: true, action: 'check_out', employeeName: employee.name, time: now };
  } else {
    return { success: false, message: `الموظف ${employee.name} أتم تسجيل الحضور والانصراف اليوم` };
  }
}

function getTodayAttendance(date) { 
  return db.prepare(`
    SELECT a.*, e.name as employee_name, e.role 
    FROM attendance a 
    JOIN employees e ON a.employee_id = e.id 
    WHERE a.date = ? 
    ORDER BY a.time_in DESC
  `).all(date); 
}

function getSuppliers() { return db.prepare("SELECT * FROM suppliers ORDER BY id DESC").all(); }

function addSupplier(supplierData) {
  const status = supplierData.initialDebt > 0 ? 'indebted' : 'clear';
  const info = db.prepare(`INSERT INTO suppliers (name, phone, initial_debt, total_debt, status) VALUES (?, ?, ?, ?, ?)`).run(supplierData.name, supplierData.phone, supplierData.initialDebt, supplierData.initialDebt, status);
  return db.prepare("SELECT * FROM suppliers WHERE id = ?").get(info.lastInsertRowid);
}

function getSupplierDetails(supplierId) {
  const supplier = db.prepare('SELECT * FROM suppliers WHERE id = ?').get(supplierId);
  if (!supplier) return null;
  const receipts = db.prepare('SELECT * FROM receipts WHERE supplier_id = ? ORDER BY date DESC').all(supplierId);
  const payments = db.prepare('SELECT * FROM payments WHERE supplier_id = ? ORDER BY date DESC').all(supplierId);
  return { ...supplier, receipts, payments };
}

function deleteAgendaTask(id) {
  try {
    db.prepare("DELETE FROM agenda_tasks WHERE id = ?").run(id);
    return { success: true };
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
}

function rescheduleAgendaTask(id, newDate) {
  try {
    db.prepare("UPDATE agenda_tasks SET task_date = ? WHERE id = ?").run(newDate, id);
    return { success: true };
  } catch (error) {
    console.error('Error rescheduling task:', error);
    throw error;
  }
}

const addReceipt = db.transaction((data) => {
  try {
    const supplierId = Number(data.supplierId);
    const amount = Number(data.amount) || 0;
    const date = data.date || new Date().toISOString().split('T')[0];
    const note = data.note || '';

    const info = db.prepare('INSERT INTO receipts (supplier_id, amount, date, note) VALUES (?, ?, ?, ?)').run(supplierId, amount, date, note);
    db.prepare("UPDATE suppliers SET total_debt = total_debt + ?, status = 'indebted' WHERE id = ?").run(amount, supplierId);
    
    return info.lastInsertRowid;
  } catch (error) {
    throw error; 
  }
});

const addPayment = db.transaction((data) => {
  try {
    const { supplierId, amount, date, caisseSource, note } = data;
    const info = db.prepare('INSERT INTO payments (supplier_id, amount, date, caisse_source, note) VALUES (?, ?, ?, ?, ?)').run(supplierId, amount, date, caisseSource || 'Caisse 1', note);
    const updateStmt = db.prepare(`UPDATE suppliers SET total_debt = total_debt - ?, status = CASE WHEN (total_debt - ?) <= 0 THEN 'clear' ELSE 'indebted' END WHERE id = ?`);
    updateStmt.run(amount, amount, supplierId);
    return info.lastInsertRowid;
  } catch (error) {
    throw error;
  }
});

function getAdvances(employeeId) {
  if (employeeId) return db.prepare("SELECT * FROM advances WHERE employee_id = ? ORDER BY date DESC").all(employeeId);
  return db.prepare("SELECT a.*, e.name as employee_name FROM advances a JOIN employees e ON a.employee_id = e.id ORDER BY a.date DESC").all();
}

function addAdvance(data) {
  const info = db.prepare('INSERT INTO advances (employee_id, amount, date, caisse_source, note) VALUES (?, ?, ?, ?, ?)').run(data.employeeId, data.amount, data.date, data.caisseSource || 'Admin', data.note || '');
  return { success: true, id: info.lastInsertRowid };
}

function getSalaries() {
  return db.prepare("SELECT s.*, e.name as employee_name FROM salaries s JOIN employees e ON s.employee_id = e.id ORDER BY s.payment_date DESC, s.id DESC").all();
}

function calculateEmployeePayroll(employeeId, startDate, endDate, hourlyRate) {
  const attendances = db.prepare(`SELECT * FROM attendance WHERE employee_id = ? AND date >= ? AND date <= ?`).all(employeeId, startDate, endDate);
  let totalHours = 0;
  attendances.forEach(record => {
    if (record.time_in && record.time_out) {
        const tIn = record.time_in.split(':');
        const tOut = record.time_out.split(':');
        const dIn = new Date(2000, 0, 1, tIn[0], tIn[1], tIn[2] || 0);
        const dOut = new Date(2000, 0, 1, tOut[0], tOut[1], tOut[2] || 0);
        let diff = (dOut - dIn) / (1000 * 60 * 60);
        if (diff < 0) diff += 24;
        totalHours += diff;
    }
  });
  const pendingAdvancesInfo = db.prepare(`SELECT SUM(amount) as total FROM advances WHERE employee_id = ? AND status = 'pending'`).get(employeeId);
  const pendingAdvances = pendingAdvancesInfo.total || 0;
  const grossSalary = totalHours * hourlyRate;
  const netSalary = grossSalary - pendingAdvances;

  return {
    employeeId, startDate, endDate, totalHours: Number(totalHours.toFixed(2)),
    hourlyRate, grossSalary: Number(grossSalary.toFixed(2)),
    totalAdvances: pendingAdvances, netSalary: Number(netSalary.toFixed(2))
  };
}

const paySalary = db.transaction((data) => {
  try {
    const empId = Number(data.employeeId);
    const tHours = Number(data.totalHours) || 0;
    const hRate = Number(data.hourlyRate) || 0;
    const tAdvances = Number(data.totalAdvances) || 0;
    const nSalary = Number(data.netSalary) || 0;
    const sDate = data.startDate || '';
    const eDate = data.endDate || '';
    const pDate = data.date || new Date().toISOString().split('T')[0];

    db.prepare(`INSERT INTO salaries (employee_id, start_date, end_date, total_hours, hourly_rate, total_advances, net_salary, payment_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`).run(
      empId, sDate, eDate, tHours, hRate, tAdvances, nSalary, pDate
    );
    
    db.prepare(`UPDATE advances SET status = 'paid' WHERE employee_id = ? AND status = 'pending'`).run(empId);
    
    if (nSalary < 0) {
      const remainingDebt = Math.abs(nSalary);
      const rollNote = data.rolloverNote || `ترحيل ديون سلفيات (${sDate} إلى ${eDate})`;
      db.prepare('INSERT INTO advances (employee_id, amount, date, caisse_source, note, status) VALUES (?, ?, ?, ?, ?, ?)').run(
        empId, remainingDebt, pDate, 'System', rollNote, 'pending'
      );
    } else if (nSalary > 0) {
      const expNote = data.expenseNote || `راتب (أسبوع: ${sDate} إلى ${eDate})`;
      db.prepare(`INSERT INTO expenses (description, category, amount, date) VALUES (?, ?, ?, ?)`).run(
        expNote, 'salaries', nSalary, pDate
      );
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

function getAgendaTasks() {
  return db.prepare("SELECT * FROM agenda_tasks ORDER BY task_date ASC, task_time ASC").all();
}

function addAgendaTask(data) {
  const info = db.prepare('INSERT INTO agenda_tasks (title, type, task_date, task_time, amount) VALUES (?, ?, ?, ?, ?)').run(
    data.title, 
    data.type, 
    data.date, 
    data.time || '', 
    data.amount || 0
  );
  return { ...data, id: info.lastInsertRowid, status: 'pending' };
}

function toggleAgendaTaskStatus(id, status) {
  db.prepare('UPDATE agenda_tasks SET status = ? WHERE id = ?').run(status, id);
  return { success: true };
}

function getDueThisWeek() {
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  
  const todayStr = today.toISOString().split('T')[0];
  const nextWeekStr = nextWeek.toISOString().split('T')[0];

  const result = db.prepare(`
    SELECT SUM(amount) as total 
    FROM agenda_tasks 
    WHERE type = 'payment' AND status = 'pending' 
    AND task_date >= ? AND task_date <= ?
  `).get(todayStr, nextWeekStr);
  
  return result.total || 0;
}

function getDailySummary(date) {
  try {
    const expensesRow = db.prepare(`SELECT SUM(amount) as total FROM expenses WHERE date = ?`).get(date);
    const totalExpenses = expensesRow.total || 0;

    const paymentsRow = db.prepare(`SELECT SUM(amount) as total FROM payments WHERE date = ?`).get(date);
    const totalPayments = paymentsRow.total || 0;

    const advancesRow = db.prepare(`SELECT SUM(amount) as total FROM advances WHERE date = ?`).get(date);
    const totalAdvances = advancesRow.total || 0;

    const totalOut = totalExpenses + totalPayments + totalAdvances;

    return {
      success: true,
      data: {
        expenses: totalExpenses,
        supplierPayments: totalPayments,
        advances: totalAdvances,
        totalOut: totalOut
      }
    };
  } catch (error) {
    console.error("Database Error in getDailySummary:", error);
    return { success: false, error: error.message };
  }
}


// دالة لتسجيل أي حركة حساسة في النظام
function logAudit(username, action, details) {
  try {
    db.prepare("INSERT INTO audit_logs (username, action, details) VALUES (?, ?, ?)")
      .run(username, action, details || '');
  } catch (error) {
    console.error("Audit Log Error:", error);
  }
}

// دالة لجلب آخر 100 حركة للسوبر أدمن
function getAuditLogs() {
  return db.prepare("SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 100").all();
}

function deleteExpense(id, username) { 
  const expense = db.prepare('SELECT * FROM expenses WHERE id = ?').get(id);
  if (expense) {
    // نقوم بتخزين المتغيرات فقط في كائن JSON
    const detailsObj = { desc: expense.description, amount: expense.amount };
    logAudit(username || 'Unknown', 'DELETE_EXPENSE', JSON.stringify(detailsObj));
  }
  return { success: db.prepare('DELETE FROM expenses WHERE id = ?').run(id).changes > 0 }; 
}

// دالة النسخ الاحتياطي الآمن لقاعدة البيانات
async function backupDatabase(destPath) {
  try {
    await db.backup(destPath);
    return { success: true };
  } catch (error) {
    console.error('Error backing up database:', error);
    throw error;
  }
}


module.exports = {
  initDatabase, verifyLogin, getSuppliers, addSupplier, getEmployees, addEmployee, 
  handlePinEntry, getExpenses, addExpense, deleteExpense, updateExpense, getTodayAttendance,
  getSupplierDetails, addReceipt, addPayment, getAdvances, addAdvance, 
  getSalaries, calculateEmployeePayroll, paySalary,
  getAgendaTasks, addAgendaTask, toggleAgendaTaskStatus, getDueThisWeek, deleteAgendaTask,
  rescheduleAgendaTask, getDailySummary,
  openShift, getActiveShift, closeShift, getShiftSummary,
  
  getUsers, addUser, deleteUser,
  
  updateEmployee, deleteEmployee,logAudit, getAuditLogs, generateExcelBackup , backupDatabase
};