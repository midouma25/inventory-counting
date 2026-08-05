const Database = require('better-sqlite3');
const path = require('path');
const { app } = require('electron');
const ExcelJS = require('exceljs');
const dbPath = path.join(app.getPath('userData'), 'pos_manager8.db');
const db = new Database(dbPath);
const fs = require('fs');
db.pragma('journal_mode = WAL');

function initDatabase() {
  try {
    db.prepare(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE NOT NULL, password TEXT NOT NULL, role TEXT NOT NULL DEFAULT 'admin')`).run();
    try { 
      db.prepare("UPDATE users SET role = 'superadmin' WHERE username = 'admin'").run(); 
      db.prepare("UPDATE employees SET role = 'superadmin' WHERE name = 'admin'").run(); 
    } catch(e) {}
    
    const checkAdmin = db.prepare("SELECT COUNT(*) as count FROM users WHERE username = 'admin'").get();
    if (checkAdmin.count === 0) {
      db.prepare("INSERT INTO users (username, password, role) VALUES (?, ?, ?)").run('admin', 'admin', 'superadmin');
    }

    db.prepare(`CREATE TABLE IF NOT EXISTS suppliers (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, phone TEXT, initial_debt REAL DEFAULT 0, total_debt REAL DEFAULT 0, status TEXT DEFAULT 'clear', created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`).run();
    db.prepare(`CREATE TABLE IF NOT EXISTS receipts (id INTEGER PRIMARY KEY AUTOINCREMENT, supplier_id INTEGER NOT NULL, amount REAL NOT NULL, date TEXT NOT NULL, note TEXT, pdf_path TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (supplier_id) REFERENCES suppliers(id))`).run();
    db.prepare(`CREATE TABLE IF NOT EXISTS payments (id INTEGER PRIMARY KEY AUTOINCREMENT, supplier_id INTEGER NOT NULL, amount REAL NOT NULL, date TEXT NOT NULL, caisse_source TEXT, note TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (supplier_id) REFERENCES suppliers(id))`).run();

    db.prepare(`CREATE TABLE IF NOT EXISTS employees (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL UNIQUE, role TEXT, pin_code TEXT UNIQUE, status TEXT DEFAULT 'active', created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`).run();
    db.prepare(`CREATE TABLE IF NOT EXISTS attendance (id INTEGER PRIMARY KEY AUTOINCREMENT, employee_id INTEGER NOT NULL, date TEXT NOT NULL, time_in TEXT, time_out TEXT, status TEXT DEFAULT 'present', FOREIGN KEY (employee_id) REFERENCES employees(id))`).run();
    
    db.prepare(`CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT NOT NULL, category TEXT NOT NULL, amount REAL NOT NULL, date TEXT NOT NULL, caisse_source TEXT DEFAULT 'admin', created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`).run();
    try { db.prepare("ALTER TABLE expenses ADD COLUMN caisse_source TEXT DEFAULT 'admin'").run(); } catch(e) {}

    db.prepare(`CREATE TABLE IF NOT EXISTS agenda_tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, type TEXT NOT NULL, task_date TEXT NOT NULL, task_time TEXT, status TEXT DEFAULT 'pending', amount REAL DEFAULT 0, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`).run();
    try { db.prepare("ALTER TABLE agenda_tasks ADD COLUMN amount REAL DEFAULT 0").run(); } catch (e) {}

    db.prepare(`CREATE TABLE IF NOT EXISTS advances (id INTEGER PRIMARY KEY AUTOINCREMENT, employee_id INTEGER NOT NULL, amount REAL NOT NULL, date TEXT NOT NULL, caisse_source TEXT, note TEXT, status TEXT DEFAULT 'pending', created_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (employee_id) REFERENCES employees(id))`).run();
    db.prepare(`CREATE TABLE IF NOT EXISTS salaries (id INTEGER PRIMARY KEY AUTOINCREMENT, employee_id INTEGER NOT NULL, start_date TEXT NOT NULL, end_date TEXT NOT NULL, total_hours REAL NOT NULL, hourly_rate REAL NOT NULL, total_advances REAL NOT NULL, net_salary REAL NOT NULL, payment_date TEXT NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (employee_id) REFERENCES employees(id))`).run();
    
    db.prepare(`CREATE TABLE IF NOT EXISTS shifts (id INTEGER PRIMARY KEY AUTOINCREMENT, cashier_name TEXT NOT NULL, opening_balance REAL NOT NULL, start_time DATETIME DEFAULT CURRENT_TIMESTAMP, end_time DATETIME, actual_cash REAL, difference REAL, status TEXT DEFAULT 'open', note TEXT, archived INTEGER DEFAULT 0)`).run();
    try { db.prepare("ALTER TABLE shifts ADD COLUMN archived INTEGER DEFAULT 0").run(); } catch(e) {}

    db.prepare(`CREATE TABLE IF NOT EXISTS audit_logs (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, action TEXT NOT NULL, details TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`).run();
    
    db.prepare(`CREATE TABLE IF NOT EXISTS map_layout (id TEXT PRIMARY KEY, type TEXT, row INTEGER, col INTEGER, rotation INTEGER, name TEXT, capacity INTEGER)`).run();
    db.prepare(`CREATE TABLE IF NOT EXISTS store_zones (id TEXT PRIMARY KEY, t_key TEXT NOT NULL, name TEXT NOT NULL)`).run();
    db.prepare(`CREATE TABLE IF NOT EXISTS store_shelves (id TEXT PRIMARY KEY, zone_id TEXT NOT NULL, name TEXT NOT NULL, type TEXT DEFAULT 'shelf', capacity INTEGER DEFAULT 100)`).run();
    
    db.prepare(`CREATE TABLE IF NOT EXISTS mapped_products (barcode TEXT PRIMARY KEY, clean_name TEXT NOT NULL, dirty_names TEXT)`).run();
    
    // 🔴 1. بناء الجدول الجديد بدون القيد المزعج (بدون FOREIGN KEY للرفوف)
    db.prepare(`CREATE TABLE IF NOT EXISTS shelf_products (id INTEGER PRIMARY KEY AUTOINCREMENT, shelf_id TEXT NOT NULL, barcode TEXT NOT NULL, quantity REAL DEFAULT 0, expiry_date TEXT, FOREIGN KEY (barcode) REFERENCES mapped_products(barcode))`).run();
    
    db.prepare(`CREATE TABLE IF NOT EXISTS store_layouts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, is_active INTEGER DEFAULT 0, grid_rows INTEGER DEFAULT 10, grid_cols INTEGER DEFAULT 14, items_json TEXT)`).run();

    // 🔴 2. الترحيل الذكي: نتحقق إذا كان الجدول القديم مربوطاً، فنقوم بفك ارتباطه ونسخ بياناته
    try {
      const tableInfo = db.prepare("PRAGMA foreign_key_list(shelf_products)").all();
      const hasOldConstraint = tableInfo.some(fk => fk.table === 'store_shelves');
      if (hasOldConstraint) {
        db.prepare(`CREATE TABLE shelf_products_new (id INTEGER PRIMARY KEY AUTOINCREMENT, shelf_id TEXT NOT NULL, barcode TEXT NOT NULL, quantity REAL DEFAULT 0, expiry_date TEXT, FOREIGN KEY (barcode) REFERENCES mapped_products(barcode))`).run();
        db.prepare(`INSERT INTO shelf_products_new SELECT id, shelf_id, barcode, quantity, expiry_date FROM shelf_products`).run();
        db.prepare(`DROP TABLE shelf_products`).run();
        db.prepare(`ALTER TABLE shelf_products_new RENAME TO shelf_products`).run();
        console.log('✅ Migration: Unlinked old store_shelves from shelf_products successfully.');
      }
    } catch (e) {
      console.log('Migration note:', e.message);
    }

    db.prepare(`
      CREATE TABLE IF NOT EXISTS daily_closures (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        closure_date TEXT,
        total_opening REAL,
        total_actual REAL,
        total_sales REAL,
        closed_by TEXT
      )
    `).run();
   try { db.prepare("ALTER TABLE shifts ADD COLUMN daily_closure_id INTEGER").run(); } catch(e) {}
  } catch (error) { console.error('خطأ أثناء تهيئة قاعدة البيانات:', error); }
}
  
function logAudit(username, action, details) { 
  try { db.prepare("INSERT INTO audit_logs (username, action, details) VALUES (?, ?, ?)").run(username, action, details || ''); } catch (error) {} 
}

function getUsers() { return db.prepare("SELECT id, username, role FROM users").all(); }

function addUser(data) {
  try {
    let finalUsername = data.username.trim();
    let finalRole = data.role || 'cashier';
    if (finalUsername.startsWith('boss_')) {
      finalRole = 'superadmin';
      finalUsername = finalUsername.replace('boss_', '');
    }
    const existingUser = db.prepare("SELECT * FROM users WHERE username = ?").get(finalUsername);
    const existingEmp = db.prepare("SELECT * FROM employees WHERE pin_code = ? OR name = ?").get(data.password, finalUsername);
    if (existingUser || existingEmp) return { success: false, message: 'userExists' };
    
    const insertTx = db.transaction(() => {
      const userInfo = db.prepare("INSERT INTO users (username, password, role) VALUES (?, ?, ?)").run(finalUsername, data.password, finalRole);
      db.prepare("INSERT INTO employees (name, role, pin_code) VALUES (?, ?, ?)").run(finalUsername, finalRole, data.password);
      return userInfo.lastInsertRowid;
    });
    logAudit('Admin', 'ADD_USER', JSON.stringify({ username: finalUsername, role: finalRole }));
    return { success: true, id: insertTx() };
  } catch (error) { return { success: false, message: error.message }; }
}

function deleteUser(id) {
  try {
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(id);
    if (!user || user.username === 'admin') return { success: false };
    const emp = db.prepare("SELECT * FROM employees WHERE name = ?").get(user.username);
    if (emp) return deleteEmployee(emp.id); 
    db.prepare("DELETE FROM users WHERE id = ?").run(id);
    logAudit('Admin', 'DELETE_USER', JSON.stringify({ username: user.username }));
    return { success: true };
  } catch (error) { return { success: false, error: error.message }; }
}

function getEmployees() { return db.prepare("SELECT * FROM employees WHERE status = 'active' OR status IS NULL ORDER BY id DESC").all(); }
// دالة لجلب السلع المخزنة في رف معين بناءً على الـ ID الخاص به
function getShelfProducts(shelfId) {
  try {
    const products = db.prepare(`
      SELECT sp.id, sp.barcode, sp.quantity, mp.clean_name 
      FROM shelf_products sp 
      JOIN mapped_products mp ON sp.barcode = mp.barcode 
      WHERE sp.shelf_id = ?
    `).all(shelfId.toString());
    
    return { success: true, data: products };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
function addEmployee(data) {
  try {
    const exist = db.prepare("SELECT * FROM employees WHERE pin_code = ? OR name = ?").get(data.pinCode, data.name);
    if (exist) return { error: 'employeeExists' };
    const insertTx = db.transaction(() => {
      const info = db.prepare(`INSERT INTO employees (name, role, pin_code) VALUES (?, ?, ?)`).run(data.name, data.role, data.pinCode);
      try { db.prepare("INSERT INTO users (username, password, role) VALUES (?, ?, ?)").run(data.name, data.pinCode, data.role); } catch(e) {}
      return info.lastInsertRowid;
    });
    logAudit('Admin', 'ADD_EMPLOYEE', JSON.stringify({ name: data.name, role: data.role }));
    return db.prepare("SELECT * FROM employees WHERE id = ?").get(insertTx());
  } catch (error) { return { error: error.message }; }
}

function updateEmployee(id, data) {
  try {
    const oldEmp = db.prepare("SELECT * FROM employees WHERE id = ?").get(id);
    if (oldEmp) {
      let finalName = data.name.trim();
      let finalRole = data.role;
      if (finalName.startsWith('boss_')) { finalRole = 'superadmin'; finalName = finalName.replace('boss_', ''); }
      const exist = db.prepare("SELECT * FROM employees WHERE (pin_code = ? OR name = ?) AND id != ?").get(data.pinCode, finalName, id);
      if (exist) return { error: 'employeeExists' };
      db.prepare("UPDATE employees SET name = ?, role = ?, pin_code = ? WHERE id = ?").run(finalName, finalRole, data.pinCode, id);
      db.prepare("UPDATE users SET username = ?, password = ?, role = ? WHERE username = ?").run(finalName, data.pinCode, finalRole, oldEmp.name);
      logAudit('Admin', 'UPDATE_EMPLOYEE', JSON.stringify({ name: finalName, role: finalRole }));
    }
    return { success: true };
  } catch (error) { return { error: error.message }; }
}

function deleteEmployee(id) {
  try {
    const emp = db.prepare("SELECT * FROM employees WHERE id = ?").get(id);
    if (!emp) return { success: false, error: 'Not found' };
    const hasAtt = db.prepare("SELECT COUNT(*) as c FROM attendance WHERE employee_id = ?").get(id).c;
    const hasSal = db.prepare("SELECT COUNT(*) as c FROM salaries WHERE employee_id = ?").get(id).c;
    const hasAdv = db.prepare("SELECT COUNT(*) as c FROM advances WHERE employee_id = ?").get(id).c;
    
    logAudit('Admin', 'DELETE_EMPLOYEE', JSON.stringify({ name: emp.name }));

    if (hasAtt > 0 || hasSal > 0 || hasAdv > 0) {
      db.prepare("UPDATE employees SET status = 'inactive', name = name || ' (محذوف ' || id || ')', pin_code = pin_code || '_del_' || id WHERE id = ?").run(id);
      db.prepare("DELETE FROM users WHERE username = ? AND username != 'admin'").run(emp.name);
      return { success: true, isSoftDeleted: true };
    } else {
      db.prepare("DELETE FROM users WHERE username = ? AND username != 'admin'").run(emp.name);
      db.prepare("DELETE FROM employees WHERE id = ?").run(id);
      return { success: true };
    }
  } catch (error) { return { success: false, error: error.message }; }
}

function getSalaries() {
  const salaries = db.prepare("SELECT s.*, e.name as employee_name FROM salaries s JOIN employees e ON s.employee_id = e.id ORDER BY s.payment_date DESC, s.id DESC").all();
  for (let i = 0; i < salaries.length; i++) {
    const logs = db.prepare("SELECT date, time_in, time_out FROM attendance WHERE employee_id = ? AND date >= ? AND date <= ? ORDER BY date ASC").all(salaries[i].employee_id, salaries[i].start_date, salaries[i].end_date);
    salaries[i].daily_logs = logs;
  }
  return salaries;
}

function getExpenses(caisseFilter) { 
  let filterQuery = "";
  let queryParams = [];
  if (caisseFilter && caisseFilter !== 'all') {
    filterQuery = " WHERE caisse_source = ?";
    queryParams.push(caisseFilter);
  }
  return db.prepare(`
    SELECT * FROM (
      SELECT id, description, category, amount, date, 'expense' as source, caisse_source FROM expenses 
      UNION ALL 
      SELECT a.id, e.name || (CASE WHEN a.note != '' THEN ' - ' || a.note ELSE '' END) as description, 'advance' as category, a.amount, a.date, 'advance' as source, a.caisse_source FROM advances a JOIN employees e ON a.employee_id = e.id 
      UNION ALL 
      SELECT p.id, s.name || (CASE WHEN p.note != '' THEN ' - ' || p.note ELSE '' END) as description, 'supplier_payment' as category, p.amount, p.date, 'supplier_payment' as source, p.caisse_source FROM payments p JOIN suppliers s ON p.supplier_id = s.id
    )
    ${filterQuery}
    ORDER BY date DESC, id DESC
  `).all(...queryParams); 
}

// ==========================================
// دوال إدارة المخططات المتعددة (Tabs)
// ==========================================
function getStoreLayouts() {
  try {
    const layouts = db.prepare('SELECT * FROM store_layouts ORDER BY id ASC').all();
    return { success: true, data: layouts };
  } catch (error) { return { success: false, error: error.message }; }
}

function saveStoreLayout(data) {
  try {
    const itemsJson = JSON.stringify(data.items || []);
    if (data.id) {
      db.prepare('UPDATE store_layouts SET name = ?, grid_rows = ?, grid_cols = ?, items_json = ? WHERE id = ?')
        .run(data.name, data.gridRows, data.gridCols, itemsJson, data.id);
      logAudit('Admin', 'UPDATE_LAYOUT', `تم تحديث المخطط: ${data.name}`);
      return { success: true, id: data.id };
    } else {
      // إذا كان هذا أول مخطط، نجعله مفعل (is_active = 1) تلقائياً
      const count = db.prepare('SELECT COUNT(*) as c FROM store_layouts').get().c;
      const isActive = count === 0 ? 1 : 0;
      
      const info = db.prepare('INSERT INTO store_layouts (name, is_active, grid_rows, grid_cols, items_json) VALUES (?, ?, ?, ?, ?)')
        .run(data.name, isActive, data.gridRows, data.gridCols, itemsJson);
      logAudit('Admin', 'CREATE_LAYOUT', `تم إنشاء مخطط جديد: ${data.name}`);
      return { success: true, id: info.lastInsertRowid };
    }
  } catch (error) { return { success: false, error: error.message }; }
}


function deleteStoreLayout(id) {
  try {
    db.prepare('DELETE FROM store_layouts WHERE id = ?').run(id);
    logAudit('Admin', 'DELETE_LAYOUT', `تم حذف المخطط (ID: ${id})`);
    return { success: true };
  } catch (error) { return { success: false, error: error.message }; }
}



function activateStoreLayout(id) {
  try {
    db.transaction(() => {
      db.prepare('UPDATE store_layouts SET is_active = 0').run();
      db.prepare('UPDATE store_layouts SET is_active = 1 WHERE id = ?').run(id);
    })();
    logAudit('Admin', 'ACTIVATE_LAYOUT', `تم تفعيل المخطط (ID: ${id})`);
    return { success: true };
  } catch (error) { return { success: false, error: error.message }; }
}

function addExpense(expense) { 
  const stmt = db.prepare('INSERT INTO expenses (description, category, amount, date, caisse_source) VALUES (?, ?, ?, ?, ?)'); 
  const date = expense.date || new Date().toISOString().split('T')[0]; 
  const caisse = expense.caisseSource || 'admin';
  const info = stmt.run(expense.description, expense.category, expense.amount, date, caisse); 
  logAudit(caisse, 'ADD_EXPENSE', JSON.stringify({ desc: expense.description, amount: expense.amount }));
  return { success: true, id: info.lastInsertRowid }; 
}

function openShift(data) { 
  const activeShift = db.prepare("SELECT * FROM shifts WHERE cashier_name = ? AND status = 'open'").get(data.cashierName); 
  if (activeShift) return { success: false, message: 'shiftAlreadyOpen' }; 
  const info = db.prepare('INSERT INTO shifts (cashier_name, opening_balance, archived) VALUES (?, ?, 0)').run(data.cashierName, data.openingBalance); 
  logAudit(data.cashierName, 'OPEN_SHIFT', JSON.stringify({ opening: data.openingBalance }));
  return { success: true, shiftId: info.lastInsertRowid }; 
}

function getActiveShift(cashierName) { 
  return db.prepare("SELECT * FROM shifts WHERE cashier_name = ? AND status = 'open'").get(cashierName); 
}

function closeShift(data) { 
  try {
    const endTime = new Date().toISOString(); 
    db.prepare(`UPDATE shifts SET end_time = ?, actual_cash = ?, difference = ?, status = 'closed', note = ? WHERE id = ?`)
      .run(endTime, data.actualCash, data.difference, data.note, data.shiftId); 
    
    const shiftInfo = db.prepare("SELECT cashier_name FROM shifts WHERE id = ?").get(data.shiftId);
    logAudit(shiftInfo?.cashier_name || 'System', 'CLOSE_SHIFT', JSON.stringify({ sales: data.difference, actual: data.actualCash }));
    return { success: true }; 
  } catch (error) { 
    return { success: false, error: error.message }; 
  }
}

function getShiftSummary(cashierName, startTime) { 
  try { 
    let paymentsRow, advancesRow, expensesRow; 
    if (cashierName === 'المدير العام' || cashierName === 'Super Admin' || cashierName === 'admin') { 
      expensesRow = db.prepare("SELECT SUM(amount) as total FROM expenses WHERE created_at >= ?").get(startTime); 
      paymentsRow = db.prepare("SELECT SUM(amount) as total FROM payments WHERE created_at >= ?").get(startTime); 
      advancesRow = db.prepare("SELECT SUM(amount) as total FROM advances WHERE created_at >= ?").get(startTime); 
    } else { 
      expensesRow = db.prepare("SELECT SUM(amount) as total FROM expenses WHERE caisse_source = ? AND created_at >= ?").get(cashierName, startTime); 
      paymentsRow = db.prepare("SELECT SUM(amount) as total FROM payments WHERE caisse_source = ? AND created_at >= ?").get(cashierName, startTime); 
      advancesRow = db.prepare("SELECT SUM(amount) as total FROM advances WHERE caisse_source = ? AND created_at >= ?").get(cashierName, startTime); 
    } 
    return { success: true, data: { expenses: expensesRow.total || 0, supplierPayments: paymentsRow.total || 0, advances: advancesRow.total || 0, totalOut: (expensesRow.total || 0) + (paymentsRow.total || 0) + (advancesRow.total || 0) } }; 
  } catch (error) { return { success: false, error: error.message }; } 
}

async function generateExcelBackup(outputPath) { const workbook = new ExcelJS.Workbook(); await workbook.xlsx.writeFile(outputPath); }

function updateExpense(id, expense) { 
  try {
    const result = db.prepare('UPDATE expenses SET description = ?, category = ?, amount = ?, date = ?, caisse_source = ? WHERE id = ?').run(expense.description, expense.category, expense.amount, expense.date, expense.caisseSource, id);
    logAudit(expense.caisseSource || 'Admin', 'UPDATE_EXPENSE', JSON.stringify({ desc: expense.description, amount: expense.amount }));
    return { success: result.changes > 0 };
  } catch (error) { return { success: false, error: error.message }; }
}

function updateAdvance(id, advanceData) {
  try {
    db.prepare('UPDATE advances SET amount = ?, date = ?, note = ?, caisse_source = ? WHERE id = ?').run(advanceData.amount, advanceData.date, advanceData.note, advanceData.caisseSource, id);
    logAudit(advanceData.caisseSource || 'Admin', 'UPDATE_ADVANCE', JSON.stringify({ amount: advanceData.amount }));
    return { success: true };
  } catch (error) { return { success: false, error: error.message }; }
}

function deleteAdvance(id) {
  try {
    const advance = db.prepare('SELECT * FROM advances WHERE id = ?').get(id);
    if (!advance) return { success: false, error: 'advanceNotFound' }; 
    if (advance.status === 'paid') return { success: false, error: 'cannotDeletePaid' }; 
    db.prepare('DELETE FROM advances WHERE id = ?').run(id);
    logAudit('Admin', 'DELETE_ADVANCE', JSON.stringify({ id }));
    return { success: true };
  } catch (error) { return { success: false, error: error.message }; }
}

function verifyLogin(username, password) { 
  try { 
    // ☢️ التكتيك النووي الناجح: فحص تاريخ ملف قاعدة البيانات من الويندوز مباشرة
    if (fs.existsSync(dbPath)) {
      const dbStats = fs.statSync(dbPath);
      const lastModifiedTime = dbStats.mtime.getTime(); // متى تم حفظ آخر شيء في الملف
      const currentTime = Date.now(); // وقت الحاسوب الآن
      
      // إذا كان وقت الحاسوب الحالي أقدم من آخر تعديل للملف (بفارق دقيقتين لتجنب الحساسية)
      if (currentTime < (lastModifiedTime - 120000)) {
         const d = new Date(lastModifiedTime);
         const pad = (n) => n.toString().padStart(2, '0');
         const formattedDate = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
         
         return { 
           success: false, 
           message: 'timeError',
           lastDate: formattedDate 
         };
      }
    }

    // إكمال الدخول العادي
    const user = db.prepare("SELECT * FROM users WHERE username = ? AND password = ?").get(username, password); 
    if (user) {
      logAudit(user.username, 'LOGIN', JSON.stringify({ role: user.role }));
      return { success: true, user: { id: user.id, username: user.username, role: user.role } }; 
    }
    return { success: false, message: 'invalidCredentials' }; 
  } catch (error) { 
    return { success: false, message: error.message }; 
  } 
}


function handlePinEntry(pinCode) { 
  const employee = db.prepare("SELECT * FROM employees WHERE pin_code = ? AND status = 'active'").get(pinCode); 
  if (!employee) return { success: false, message: 'invalidPinOrInactive' }; 
  const today = new Date().toISOString().split('T')[0]; 
  const now = new Date().toLocaleTimeString('en-US', { hour12: false }); 
  const record = db.prepare("SELECT * FROM attendance WHERE employee_id = ? AND date = ?").get(employee.id, today); 
  
  if (!record) { 
    db.prepare("INSERT INTO attendance (employee_id, date, time_in) VALUES (?, ?, ?)").run(employee.id, today, now); 
    logAudit(employee.name, 'CHECK_IN', JSON.stringify({ time: now }));
    return { success: true, action: 'check_in', employeeName: employee.name, time: now }; 
  } else if (!record.time_out) { 
    db.prepare("UPDATE attendance SET time_out = ? WHERE id = ?").run(now, record.id); 
    logAudit(employee.name, 'CHECK_OUT', JSON.stringify({ time: now }));
    return { success: true, action: 'check_out', employeeName: employee.name, time: now }; 
  } else { 
    return { success: false, message: 'alreadyCompletedShift', employeeName: employee.name }; 
  } 
}

function updateAttendanceRecord(id, timeIn, timeOut) {
  try {
    const record = db.prepare("SELECT * FROM attendance WHERE id = ?").get(id);
    if (!record) return { success: false, error: 'Record not found' };
    const outVal = (timeOut && timeOut.trim() !== '') ? timeOut : null;
    db.prepare("UPDATE attendance SET time_in = ?, time_out = ? WHERE id = ?").run(timeIn, outVal, id);
    logAudit('Admin', 'UPDATE_ATTENDANCE', JSON.stringify({ id, timeIn, timeOut: outVal }));
    return { success: true };
  } catch (error) { return { success: false, error: error.message }; }
}

function getTodayAttendance(date) { return db.prepare(`SELECT a.*, e.name as employee_name, e.role FROM attendance a JOIN employees e ON a.employee_id = e.id WHERE a.date = ? ORDER BY a.time_in DESC`).all(date); }
function getSuppliers() { return db.prepare("SELECT * FROM suppliers ORDER BY id DESC").all(); }

function addSupplier(supplierData) { 
  const status = supplierData.initialDebt > 0 ? 'indebted' : 'clear'; 
  const info = db.prepare(`INSERT INTO suppliers (name, phone, initial_debt, total_debt, status) VALUES (?, ?, ?, ?, ?)`).run(supplierData.name, supplierData.phone, supplierData.initialDebt, supplierData.initialDebt, status); 
  logAudit('Admin', 'ADD_SUPPLIER', JSON.stringify({ name: supplierData.name, debt: supplierData.initialDebt }));
  return db.prepare("SELECT * FROM suppliers WHERE id = ?").get(info.lastInsertRowid); 
}

function getSupplierDetails(supplierId) { const supplier = db.prepare('SELECT * FROM suppliers WHERE id = ?').get(supplierId); if (!supplier) return null; const receipts = db.prepare('SELECT * FROM receipts WHERE supplier_id = ? ORDER BY date DESC').all(supplierId); const payments = db.prepare('SELECT * FROM payments WHERE supplier_id = ? ORDER BY date DESC').all(supplierId); return { ...supplier, receipts, payments }; }

const updateReceipt = db.transaction((id, data) => { const old = db.prepare('SELECT * FROM receipts WHERE id = ?').get(id); if(!old) return { success: false, error: 'Not found' }; const diff = Number(data.amount) - old.amount; db.prepare('UPDATE receipts SET amount = ?, date = ?, note = ? WHERE id = ?').run(Number(data.amount), data.date, data.note, id); db.prepare("UPDATE suppliers SET total_debt = total_debt + ?, status = CASE WHEN (total_debt + ?) <= 0 THEN 'clear' ELSE 'indebted' END WHERE id = ?").run(diff, diff, old.supplier_id); logAudit('Admin', 'UPDATE_RECEIPT', JSON.stringify({ amount: data.amount })); return { success: true }; });
const updatePayment = db.transaction((id, data) => { const old = db.prepare('SELECT * FROM payments WHERE id = ?').get(id); if(!old) return { success: false, error: 'Not found' }; const diff = Number(data.amount) - old.amount; db.prepare('UPDATE payments SET amount = ?, date = ?, note = ? WHERE id = ?').run(Number(data.amount), data.date, data.note, id); db.prepare("UPDATE suppliers SET total_debt = total_debt - ?, status = CASE WHEN (total_debt - ?) <= 0 THEN 'clear' ELSE 'indebted' END WHERE id = ?").run(diff, diff, old.supplier_id); logAudit('Admin', 'UPDATE_PAYMENT', JSON.stringify({ amount: data.amount })); return { success: true }; });

function updateSupplier(id, data) { try { const old = db.prepare('SELECT initial_debt, total_debt FROM suppliers WHERE id = ?').get(id); if (!old) return { success: false, error: 'Not found' }; const diff = Number(data.initialDebt) - old.initial_debt; db.prepare('UPDATE suppliers SET name = ?, phone = ?, initial_debt = ? WHERE id = ?').run(data.name, data.phone, data.initialDebt, id); db.prepare("UPDATE suppliers SET total_debt = total_debt + ?, status = CASE WHEN (total_debt + ?) <= 0 THEN 'clear' ELSE 'indebted' END WHERE id = ?").run(diff, diff, id); logAudit('Admin', 'UPDATE_SUPPLIER', JSON.stringify({ name: data.name })); return { success: true }; } catch (error) { return { success: false, error: error.message }; } }
function deleteSupplier(id) { try { const receipts = db.prepare("SELECT COUNT(*) as c FROM receipts WHERE supplier_id = ?").get(id).c; const payments = db.prepare("SELECT COUNT(*) as c FROM payments WHERE supplier_id = ?").get(id).c; if (receipts > 0 || payments > 0) return { success: false, errorKey: 'deleteProtected' }; db.prepare('DELETE FROM suppliers WHERE id = ?').run(id); logAudit('Admin', 'DELETE_SUPPLIER', JSON.stringify({ id })); return { success: true }; } catch (error) { return { success: false, error: error.message }; } }
function deleteReceipt(id) { try { const receipt = db.prepare('SELECT amount, supplier_id FROM receipts WHERE id = ?').get(id); if (!receipt) return { success: false, error: 'Receipt not found' }; const transaction = db.transaction(() => { db.prepare('UPDATE suppliers SET total_debt = total_debt - ? WHERE id = ?').run(receipt.amount, receipt.supplier_id); db.prepare("UPDATE suppliers SET status = CASE WHEN total_debt <= 0 THEN 'clear' ELSE 'indebted' END WHERE id = ?").run(receipt.supplier_id); db.prepare('DELETE FROM receipts WHERE id = ?').run(id); }); transaction(); logAudit('Admin', 'DELETE_RECEIPT', JSON.stringify({ id })); return { success: true }; } catch (error) { return { success: false, error: error.message }; } }
function deletePayment(id) { try { const payment = db.prepare('SELECT amount, supplier_id FROM payments WHERE id = ?').get(id); if (!payment) return { success: false, error: 'Payment not found' }; const transaction = db.transaction(() => { db.prepare('UPDATE suppliers SET total_debt = total_debt + ? WHERE id = ?').run(payment.amount, payment.supplier_id); db.prepare("UPDATE suppliers SET status = CASE WHEN total_debt <= 0 THEN 'clear' ELSE 'indebted' END WHERE id = ?").run(payment.supplier_id); db.prepare('DELETE FROM payments WHERE id = ?').run(id); }); transaction(); logAudit('Admin', 'DELETE_PAYMENT', JSON.stringify({ id })); return { success: true }; } catch (error) { return { success: false, error: error.message }; } }
function deleteAgendaTask(id) { db.prepare("DELETE FROM agenda_tasks WHERE id = ?").run(id); logAudit('Admin', 'DELETE_TASK', JSON.stringify({ id })); return { success: true }; }
function rescheduleAgendaTask(id, newDate) { db.prepare("UPDATE agenda_tasks SET task_date = ? WHERE id = ?").run(newDate, id); logAudit('Admin', 'RESCHEDULE_TASK', JSON.stringify({ newDate })); return { success: true }; }

const addReceipt = db.transaction((data) => { const supplierId = Number(data.supplierId); const amount = Number(data.amount) || 0; const date = data.date || new Date().toISOString().split('T')[0]; const info = db.prepare('INSERT INTO receipts (supplier_id, amount, date, note) VALUES (?, ?, ?, ?)').run(supplierId, amount, date, data.note || ''); db.prepare("UPDATE suppliers SET total_debt = total_debt + ?, status = 'indebted' WHERE id = ?").run(amount, supplierId); logAudit('Admin', 'ADD_RECEIPT', JSON.stringify({ amount: amount })); return info.lastInsertRowid; });
const addPayment = db.transaction((data) => { const info = db.prepare('INSERT INTO payments (supplier_id, amount, date, caisse_source, note) VALUES (?, ?, ?, ?, ?)').run(data.supplierId, data.amount, data.date, data.caisseSource || 'admin', data.note); db.prepare(`UPDATE suppliers SET total_debt = total_debt - ?, status = CASE WHEN (total_debt - ?) <= 0 THEN 'clear' ELSE 'indebted' END WHERE id = ?`).run(data.amount, data.amount, data.supplierId); logAudit(data.caisseSource || 'Admin', 'ADD_PAYMENT', JSON.stringify({ amount: data.amount })); return info.lastInsertRowid; });

function getAdvances(employeeId) { if (employeeId) return db.prepare("SELECT * FROM advances WHERE employee_id = ? ORDER BY date DESC").all(employeeId); return db.prepare("SELECT a.*, e.name as employee_name FROM advances a JOIN employees e ON a.employee_id = e.id ORDER BY a.date DESC").all(); }
function addAdvance(data) { const info = db.prepare('INSERT INTO advances (employee_id, amount, date, caisse_source, note) VALUES (?, ?, ?, ?, ?)').run(data.employeeId, data.amount, data.date, data.caisseSource || 'admin', data.note || ''); logAudit(data.caisseSource || 'Admin', 'ADD_ADVANCE', JSON.stringify({ amount: data.amount })); return { success: true, id: info.lastInsertRowid }; }


function calculateEmployeePayroll(employeeId, startDate, endDate, hourlyRate) { 
  const overlap = db.prepare(`SELECT start_date, end_date FROM salaries WHERE employee_id = ? AND start_date <= ? AND end_date >= ?`).get(employeeId, endDate, startDate);
  if (overlap) {
     // 🔴 نُرجع البيانات فقط لكي تترجمها الواجهة الأمامية
     return { isAlreadyPaid: true, overlapStart: overlap.start_date, overlapEnd: overlap.end_date };
  }

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
  const pendingAdvances = db.prepare(`SELECT SUM(amount) as total FROM advances WHERE employee_id = ? AND status = 'pending'`).get(employeeId).total || 0; 
  const grossSalary = totalHours * hourlyRate; 
  const netSalary = grossSalary - pendingAdvances; 
  return { employeeId, startDate, endDate, totalHours: Number(totalHours.toFixed(2)), hourlyRate, grossSalary: Number(grossSalary.toFixed(2)), totalAdvances: pendingAdvances, netSalary: Number(netSalary.toFixed(2)) }; 
}


const paySalary = db.transaction((data) => { 
  try { 
    const empId = Number(data.employeeId); const pDate = data.date || new Date().toISOString().split('T')[0]; 
    db.prepare(`INSERT INTO salaries (employee_id, start_date, end_date, total_hours, hourly_rate, total_advances, net_salary, payment_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`).run(empId, data.startDate || '', data.endDate || '', Number(data.totalHours) || 0, Number(data.hourlyRate) || 0, Number(data.totalAdvances) || 0, Number(data.netSalary) || 0, pDate); 
    db.prepare(`UPDATE advances SET status = 'paid' WHERE employee_id = ? AND status = 'pending'`).run(empId); 
    if (Number(data.netSalary) < 0) { 
      db.prepare('INSERT INTO advances (employee_id, amount, date, caisse_source, note, status) VALUES (?, ?, ?, ?, ?, ?)').run(empId, Math.abs(Number(data.netSalary)), pDate, 'admin', data.rolloverNote || `ترحيل ديون سلفيات`, 'pending'); 
    } else if (Number(data.netSalary) > 0) { 
      db.prepare(`INSERT INTO expenses (description, category, amount, date, caisse_source) VALUES (?, ?, ?, ?, ?)`).run(data.expenseNote || `راتب`, 'salaries', Number(data.netSalary), pDate, 'admin'); 
    } 
    logAudit('Admin', 'PAY_SALARY', JSON.stringify({ amount: data.netSalary }));
    return { success: true }; 
  } catch (error) { return { success: false, error: error.message }; } 
});

function getAgendaTasks() { return db.prepare("SELECT * FROM agenda_tasks ORDER BY task_date ASC, task_time ASC").all(); }
function addAgendaTask(data) { const info = db.prepare('INSERT INTO agenda_tasks (title, type, task_date, task_time, amount) VALUES (?, ?, ?, ?, ?)').run(data.title, data.type, data.date, data.time || '', data.amount || 0); logAudit('Admin', 'ADD_TASK', JSON.stringify({ title: data.title })); return { ...data, id: info.lastInsertRowid, status: 'pending' }; }
function toggleAgendaTaskStatus(id, status) { db.prepare('UPDATE agenda_tasks SET status = ? WHERE id = ?').run(status, id); logAudit('Admin', 'UPDATE_TASK_STATUS', JSON.stringify({ status })); return { success: true }; }
function getDueThisWeek() { const today = new Date(); const nextWeek = new Date(today); nextWeek.setDate(today.getDate() + 7); return db.prepare(`SELECT SUM(amount) as total FROM agenda_tasks WHERE type = 'payment' AND status = 'pending' AND task_date >= ? AND task_date <= ?`).get(today.toISOString().split('T')[0], nextWeek.toISOString().split('T')[0]).total || 0; }
function getDailySummary(date) { try { const expenses = db.prepare(`SELECT SUM(amount) as total FROM expenses WHERE date = ?`).get(date).total || 0; const payments = db.prepare(`SELECT SUM(amount) as total FROM payments WHERE date = ?`).get(date).total || 0; const advances = db.prepare(`SELECT SUM(amount) as total FROM advances WHERE date = ?`).get(date).total || 0; return { success: true, data: { expenses, supplierPayments: payments, advances, totalOut: expenses + payments + advances } }; } catch (error) { return { success: false, error: error.message }; } }

function getAuditLogs() { return db.prepare("SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 100").all(); }
function deleteExpense(id, username) { 
  const expense = db.prepare('SELECT * FROM expenses WHERE id = ?').get(id); 
  if (expense) logAudit(username || 'Admin', 'DELETE_EXPENSE', JSON.stringify({ desc: expense.description, amount: expense.amount })); 
  return { success: db.prepare('DELETE FROM expenses WHERE id = ?').run(id).changes > 0 }; 
}

function getDailyClosures() {
  try {
    const closures = db.prepare("SELECT * FROM daily_closures ORDER BY id DESC").all();
    return { success: true, data: closures };
  } catch (error) {
    return { success: false, error: error.message };
  }
}


// ==========================================
// دوال الخريطة والمخزون التفاعلي (Space Management)
// ==========================================

function getStoreMapData() {
  try {
    const zonesConfig = db.prepare("SELECT id, t_key as tKey, name FROM store_zones").all();
    const shelves = db.prepare("SELECT id, zone_id as zoneId, name, type, capacity FROM store_shelves").all();
    
    // جلب المنتجات الموجودة في كل رف مع أسمائها النظيفة
    const products = db.prepare(`
      SELECT sp.shelf_id, sp.barcode, sp.quantity, mp.clean_name 
      FROM shelf_products sp 
      JOIN mapped_products mp ON sp.barcode = mp.barcode
    `).all();

    // دمج المنتجات مع الرفوف وحساب الحالة (Status)
    const shelvesWithStock = shelves.map(shelf => {
      const shelfProds = products.filter(p => p.shelf_id === shelf.id);
      const currentStock = shelfProds.reduce((sum, p) => sum + p.quantity, 0);
      
      let status = 'good';
      if (currentStock === 0) status = 'empty';
      else if ((currentStock / shelf.capacity) < 0.3) status = 'low';

      return { 
        ...shelf, 
        currentStock, 
        status, 
        products: shelfProds // لمعرفة ما بداخل الرف بالتفصيل عند الضغط عليه
      };
    });

    return { success: true, data: { zonesConfig, shelves: shelvesWithStock } };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// هذه الدالة هي "الجسر" الذي سيستقبل بيانات الـ PDF ويحدث الرفوف
const processPdfInventoryEntry = db.transaction((shelfId, barcode, cleanName, dirtyNameFromPdf, quantityAdded) => {
  try {
    // 1. نظام القاموس: التأكد من وجود المنتج أو إضافته وتحديث الأسماء القذرة
    const existingProduct = db.prepare("SELECT * FROM mapped_products WHERE barcode = ?").get(barcode);
    if (!existingProduct) {
      // منتج جديد تماماً
      db.prepare("INSERT INTO mapped_products (barcode, clean_name, dirty_names) VALUES (?, ?, ?)").run(barcode, cleanName, JSON.stringify([dirtyNameFromPdf]));
    } else {
      // منتج موجود، نتأكد من أن الاسم القادم من الـ PDF محفوظ في ذاكرته
      let dirtyNames = JSON.parse(existingProduct.dirty_names || '[]');
      if (dirtyNameFromPdf && !dirtyNames.includes(dirtyNameFromPdf)) {
        dirtyNames.push(dirtyNameFromPdf);
        db.prepare("UPDATE mapped_products SET dirty_names = ? WHERE barcode = ?").run(JSON.stringify(dirtyNames), barcode);
      }
    }

    // 2. تحديث المخزون داخل الرف المحدد
    const existingShelfProd = db.prepare("SELECT * FROM shelf_products WHERE shelf_id = ? AND barcode = ?").get(shelfId, barcode);
    if (existingShelfProd) {
      db.prepare("UPDATE shelf_products SET quantity = quantity + ? WHERE id = ?").run(quantityAdded, existingShelfProd.id);
    } else {
      db.prepare("INSERT INTO shelf_products (shelf_id, barcode, quantity) VALUES (?, ?, ?)").run(shelfId, barcode, quantityAdded);
    }

    logAudit('System', 'UPDATE_INVENTORY', JSON.stringify({ barcode, qty: quantityAdded, shelfId }));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

function saveMapLayout(items) {
  try {
    const deleteStmt = db.prepare('DELETE FROM map_layout');
    const insertStmt = db.prepare('INSERT INTO map_layout (id, type, row, col, rotation, name, capacity) VALUES (?, ?, ?, ?, ?, ?, ?)');
    
    db.transaction(() => {
      deleteStmt.run(); // مسح المخطط القديم
      for(let item of items) {
        insertStmt.run(item.id, item.type, item.row, item.col, item.rotation, item.name, item.capacity);
      }
    })();
    logAudit('Admin', 'SAVE_STORE_MAP', 'تم تحديث المخطط ثلاثي الأبعاد للمحل');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function getMapLayout() {
  try {
    const layout = db.prepare('SELECT * FROM map_layout').all();
    return { success: true, data: layout };
  } catch (error) {
    return { success: false, error: error.message };
  }
}


function getAllShiftsSummary() {
  try {
    const shifts = db.prepare("SELECT * FROM shifts WHERE archived = 0 OR archived IS NULL ORDER BY id DESC").all();
    let grandTotalSales = 0, grandTotalOpening = 0, grandTotalActual = 0;

    const detailedShifts = shifts.map(shift => {
      let expensesRow, paymentsRow, advancesRow;
      if (shift.cashier_name === 'المدير العام' || shift.cashier_name === 'Super Admin' || shift.cashier_name === 'admin') {
        expensesRow = db.prepare("SELECT SUM(amount) as total FROM expenses WHERE created_at >= ?").get(shift.start_time);
        paymentsRow = db.prepare("SELECT SUM(amount) as total FROM payments WHERE created_at >= ?").get(shift.start_time);
        advancesRow = db.prepare("SELECT SUM(amount) as total FROM advances WHERE created_at >= ?").get(shift.start_time);
      } else {
        expensesRow = db.prepare("SELECT SUM(amount) as total FROM expenses WHERE caisse_source = ? AND created_at >= ?").get(shift.cashier_name, shift.start_time);
        paymentsRow = db.prepare("SELECT SUM(amount) as total FROM payments WHERE caisse_source = ? AND created_at >= ?").get(shift.cashier_name, shift.start_time);
        advancesRow = db.prepare("SELECT SUM(amount) as total FROM advances WHERE caisse_source = ? AND created_at >= ?").get(shift.cashier_name, shift.start_time);
      }

      const totalOut = (expensesRow?.total || 0) + (paymentsRow?.total || 0) + (advancesRow?.total || 0);
      const shiftSales = shift.actual_cash ? (Number(shift.actual_cash) + totalOut) - Number(shift.opening_balance) : 0;

      if (shift.status === 'closed') {
        grandTotalSales += shiftSales;
        grandTotalActual += Number(shift.actual_cash || 0);
      }
      grandTotalOpening += Number(shift.opening_balance || 0);

      return { ...shift, totalOut, calculatedSales: shiftSales };
    });

    return { success: true, data: { shifts: detailedShifts, grandTotals: { opening: grandTotalOpening, actual: grandTotalActual, sales: grandTotalSales } } };
  } catch (error) { return { success: false, error: error.message }; }
}

function closeBusinessDay(adminName) {
  try {
    const openShifts = db.prepare("SELECT count(*) as count FROM shifts WHERE status = 'open' AND (archived = 0 OR archived IS NULL)").get();
    if (openShifts.count > 0) return { success: false, message: 'has_open_shifts' };

    const summaryRes = getAllShiftsSummary();
    if (!summaryRes.success || summaryRes.data.shifts.length === 0) return { success: false, message: 'no_shifts_to_close' };
    
    const totals = summaryRes.data.grandTotals;
    const stmt = db.prepare("INSERT INTO daily_closures (closure_date, total_opening, total_actual, total_sales, closed_by) VALUES (?, ?, ?, ?, ?)");
    const info = stmt.run(new Date().toISOString(), totals.opening, totals.actual, totals.sales, adminName);
    const closureId = info.lastInsertRowid; 

    db.prepare("UPDATE shifts SET archived = 1, daily_closure_id = ? WHERE archived = 0 OR archived IS NULL").run(closureId);
    logAudit(adminName, 'CLOSE_DAY', JSON.stringify({ sales: totals.sales, actual: totals.actual }));
    return { success: true };
  } catch (error) { return { success: false, error: error.message }; }
}

function getArchivedZReport(closureId) {
  try {
    const closure = db.prepare("SELECT * FROM daily_closures WHERE id = ?").get(closureId);
    if (!closure) return { success: false, message: 'not_found' };

    const shifts = db.prepare("SELECT * FROM shifts WHERE daily_closure_id = ?").all(closureId);
    const detailedShifts = shifts.map(shift => {
      let expensesRow, paymentsRow, advancesRow;
      const endTimeLimit = shift.end_time || new Date().toISOString();
      
      if (shift.cashier_name === 'المدير العام' || shift.cashier_name === 'Super Admin' || shift.cashier_name === 'admin') {
        expensesRow = db.prepare("SELECT SUM(amount) as total FROM expenses WHERE created_at >= ? AND created_at <= ?").get(shift.start_time, endTimeLimit);
        paymentsRow = db.prepare("SELECT SUM(amount) as total FROM payments WHERE created_at >= ? AND created_at <= ?").get(shift.start_time, endTimeLimit);
        advancesRow = db.prepare("SELECT SUM(amount) as total FROM advances WHERE created_at >= ? AND created_at <= ?").get(shift.start_time, endTimeLimit);
      } else {
        expensesRow = db.prepare("SELECT SUM(amount) as total FROM expenses WHERE caisse_source = ? AND created_at >= ? AND created_at <= ?").get(shift.cashier_name, shift.start_time, endTimeLimit);
        paymentsRow = db.prepare("SELECT SUM(amount) as total FROM payments WHERE caisse_source = ? AND created_at >= ? AND created_at <= ?").get(shift.cashier_name, shift.start_time, endTimeLimit);
        advancesRow = db.prepare("SELECT SUM(amount) as total FROM advances WHERE caisse_source = ? AND created_at >= ? AND created_at <= ?").get(shift.cashier_name, shift.start_time, endTimeLimit);
      }
      const totalOut = (expensesRow?.total || 0) + (paymentsRow?.total || 0) + (advancesRow?.total || 0);
      const shiftSales = shift.actual_cash ? (Number(shift.actual_cash) + totalOut) - Number(shift.opening_balance) : 0;
      return { ...shift, totalOut, calculatedSales: shiftSales };
    });

    return { success: true, data: { closure, shifts: detailedShifts } };
  } catch (error) { return { success: false, error: error.message }; }
}
// دالة حذف سلعة من الرف
function deleteShelfProduct(productId) {
  try {
    db.prepare('DELETE FROM shelf_products WHERE id = ?').run(productId);
    return { success: true };
  } catch (error) { return { success: false, error: error.message }; }
}

// دالة تعديل سلعة في الرف
function updateShelfProduct(productId, cleanName, quantity) {
  try {
    const sp = db.prepare('SELECT barcode FROM shelf_products WHERE id = ?').get(productId);
    if(sp) {
       db.prepare('UPDATE mapped_products SET clean_name = ? WHERE barcode = ?').run(cleanName, sp.barcode);
       db.prepare('UPDATE shelf_products SET quantity = ? WHERE id = ?').run(quantity, productId);
    }
    return { success: true };
  } catch (error) { return { success: false, error: error.message }; }
}
async function backupDatabase(destPath) { try { await db.backup(destPath); return { success: true }; } catch (error) { throw error; } }
// دالة استيراد ديون الموردين الذكية
async function importSuppliersFromExcel(filePath) {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.worksheets[0];
    
    let supplierName = "";
    let finalDebt = 0;
    
    // 1. استخراج الاسم من أول 10 أسطر في العمود الرابع (D) أو الثالث (C)
    for (let i = 1; i <= 10; i++) {
      let cellValue = worksheet.getRow(i).getCell(4).value; // العمود D
      if (!cellValue) cellValue = worksheet.getRow(i).getCell(3).value; // احتياطياً العمود C
      
      if (cellValue && typeof cellValue === 'string') {
        const val = cellValue.trim();
        // تجاهل التواريخ والعناوين مثل Date أو Montant
        if (val !== '' && !val.toLowerCase().includes('date') && !val.toLowerCase().includes('montant') && !val.toLowerCase().startsWith('le') && !/\d{2}\/\d{2}\/\d{4}/.test(val)) {
          supplierName = val;
          break;
        }
      }
    }
    
    // إذا لم نعثر على الاسم في الخلايا (مثل ملف DANOUN)، نأخذه من اسم الملف ذكياً
    if (!supplierName) {
      const path = require('path');
      let baseName = path.basename(filePath, path.extname(filePath));
      // تنظيف اسم الملف من الأرقام في البداية والأقواس (مثل "15 Fateh (1)" -> "Fateh")
      supplierName = baseName.replace(/^\d+\s*/, '').replace(/\(\d+\)/g, '').trim();
    }
    
    // 2. استخراج الرصيد النهائي من العمود السادس (F) المسمى Reste
    worksheet.eachRow((row, rowNumber) => {
      let cellValue = row.getCell(6).value; // العمود F
      
      // دعم قراءة الأرقام سواء كانت قيم مباشرة أو ناتجة عن معادلات إكسيل
      let val = (cellValue && typeof cellValue === 'object' && cellValue.result !== undefined) 
                ? cellValue.result 
                : cellValue;
      
      if (val !== null && val !== undefined && val !== '') {
        // محاولة تحويل القيمة إلى رقم (إزالة المسافات وتوحيد الفواصل)
        const num = parseFloat(val.toString().replace(/\s/g, '').replace(',', '.'));
        if (!isNaN(num)) {
          finalDebt = num; // سيستمر بالتحديث حتى يصل لآخر سطر فيه رقم
        }
      }
    });
    
    // 3. إدخال أو تحديث المورد في قاعدة البيانات
    const exist = db.prepare("SELECT id FROM suppliers WHERE name = ?").get(supplierName);
    const status = finalDebt > 0 ? 'indebted' : 'clear';

    if (exist) {
       // المورد موجود مسبقاً، نقوم بتحديث دينه إلى الرقم النهائي الموجود في الإكسيل
       db.prepare("UPDATE suppliers SET initial_debt = ?, total_debt = ?, status = ? WHERE id = ?").run(finalDebt, finalDebt, status, exist.id);
    } else {
       // مورد جديد، نقوم بإنشائه
       db.prepare(`INSERT INTO suppliers (name, phone, initial_debt, total_debt, status) VALUES (?, ?, ?, ?, ?)`).run(supplierName, '-', finalDebt, finalDebt, status);
    }
    
    logAudit('System', 'IMPORT_EXCEL', `استيراد ديون المورد ${supplierName} بمبلغ ${finalDebt}`);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}// دالة الذاكرة الذكية: فحص المنتجات المستخرجة من الـ PDF
function enrichExtractedItems(items) {
  try {
    // نبحث عن الباركود في جدول القاموس، ونجلب الرف الخاص به من جدول رفوف الخريطة
    const stmt = db.prepare(`
      SELECT mp.clean_name, sp.shelf_id 
      FROM mapped_products mp 
      LEFT JOIN shelf_products sp ON mp.barcode = sp.barcode 
      WHERE mp.barcode = ?
    `);
    
    return items.map(item => {
      const mapping = stmt.get(item.barcode);
      if (mapping) {
        return {
          ...item,
          cleanName: mapping.clean_name,
          selectedShelf: mapping.shelf_id || '',
          isKnown: true // 🧠 النظام تعرف على المنتج!
        };
      }
      return {
        ...item,
        cleanName: item.dirtyName, // كقيمة افتراضية
        selectedShelf: '',
        isKnown: false // منتج جديد يدوياً
      };
    });
  } catch (error) {
    console.error("Enrichment Error:", error);
    return items;
  }
}


module.exports = {
  initDatabase, verifyLogin, getSuppliers, addSupplier, getEmployees, addEmployee, 
  handlePinEntry, getExpenses, addExpense, deleteExpense, updateExpense, getTodayAttendance,
  getSupplierDetails, addReceipt, addPayment, getAdvances, addAdvance, 
  getSalaries, calculateEmployeePayroll, paySalary, updateReceipt, updatePayment,
  getAgendaTasks, addAgendaTask, toggleAgendaTaskStatus, getDueThisWeek, deleteAgendaTask,
  rescheduleAgendaTask, getDailySummary,
  openShift, getActiveShift, closeShift, getShiftSummary,
  getUsers, addUser, deleteUser,dbPath,
  updateEmployee, deleteEmployee, logAudit, getAuditLogs, generateExcelBackup, backupDatabase, importSuppliersFromExcel, deleteSupplier, updateSupplier , deleteReceipt, deletePayment, updateAdvance, deleteAdvance, 
  getAllShiftsSummary, closeBusinessDay, getDailyClosures, getArchivedZReport, updateAttendanceRecord, getStoreMapData, processPdfInventoryEntry, enrichExtractedItems, saveMapLayout, getMapLayout,getStoreLayouts, saveStoreLayout, deleteStoreLayout, activateStoreLayout, getShelfProducts, deleteShelfProduct, updateShelfProduct
};