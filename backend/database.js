const Database = require('better-sqlite3');
const path = require('path');
const { app } = require('electron');

const dbPath = path.join(app.getPath('userData'), 'inventory_system.db');
const db = new Database(dbPath, { verbose: console.log });

function initDB() {
  // 1. جداول الموردين والمصاريف
  db.prepare(`
    CREATE TABLE IF NOT EXISTS suppliers (
      id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, phone TEXT, totalDebt REAL DEFAULT 0, created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  db.prepare(`
    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT NOT NULL, description TEXT NOT NULL, category TEXT NOT NULL, amount REAL DEFAULT 0, created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  // 2. جداول الموارد البشرية (العمال وسجل الحضور)
  db.prepare(`
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, role TEXT, pin TEXT UNIQUE NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  db.prepare(`
    CREATE TABLE IF NOT EXISTS attendance (
      id INTEGER PRIMARY KEY AUTOINCREMENT, employee_id INTEGER NOT NULL, date TEXT NOT NULL, time_in TEXT, time_out TEXT, FOREIGN KEY (employee_id) REFERENCES employees(id)
    )
  `).run();

  // 3. حقن بيانات عمال افتراضية للتجربة (إذا كان الجدول فارغاً)
  const empCount = db.prepare('SELECT COUNT(*) as count FROM employees').get().count;
  if (empCount === 0) {
    const insertEmp = db.prepare('INSERT INTO employees (name, role, pin) VALUES (?, ?, ?)');
    insertEmp.run('Ahmed Ali', 'Cashier', '1001');
    insertEmp.run('Sarah Connor', 'Store Manager', '1002');
    insertEmp.run('Karim Nabil', 'Stock Clerk', '1003');
    insertEmp.run('Mona Youssef', 'Cashier', '1004');
  }
}

// === دوال الموردين ===
function getSuppliers() { return db.prepare('SELECT * FROM suppliers ORDER BY id DESC').all(); }
function addSupplier(s) {
  const info = db.prepare('INSERT INTO suppliers (name, phone, totalDebt) VALUES (?, ?, ?)').run(s.name, s.phone, s.totalDebt);
  return { id: info.lastInsertRowid, ...s };
}

// === دوال المصاريف ===
function getExpenses() { return db.prepare('SELECT * FROM expenses ORDER BY date DESC, id DESC').all(); }
function addExpense(e) {
  const info = db.prepare('INSERT INTO expenses (date, description, category, amount) VALUES (?, ?, ?, ?)').run(e.date, e.description, e.category, e.amount);
  return { id: info.lastInsertRowid, ...e };
}

// === دوال الموارد البشرية ===
function getTodayAttendance(date) {
  // نجلب جميع العمال، ونربطهم بجدول الحضور لتاريخ اليوم
  return db.prepare(`
    SELECT 
      e.id, e.name, e.role, e.pin,
      a.time_in as timeIn, a.time_out as timeOut,
      CASE WHEN a.time_in IS NOT NULL THEN 'present' ELSE 'absent' END as status
    FROM employees e
    LEFT JOIN attendance a ON e.id = a.employee_id AND a.date = ?
  `).all(date);
}

function processAttendance(pin, date, time) {
  const emp = db.prepare('SELECT id, name FROM employees WHERE pin = ?').get(pin);
  if (!emp) return { success: false, message: 'Invalid PIN or Barcode not recognized!' };

  const record = db.prepare('SELECT id, time_in, time_out FROM attendance WHERE employee_id = ? AND date = ?').get(emp.id, date);

  if (!record) {
    // لم يسجل الدخول اليوم -> إنشاء سجل دخول
    db.prepare('INSERT INTO attendance (employee_id, date, time_in) VALUES (?, ?, ?)').run(emp.id, date, time);
    return { success: true, message: `${emp.name} Checked IN at ${time}` };
  } else if (!record.time_out) {
    // سجل الدخول ولم يخرج -> تسجيل خروج
    db.prepare('UPDATE attendance SET time_out = ? WHERE id = ?').run(time, record.id);
    return { success: true, message: `${emp.name} Checked OUT at ${time}` };
  } else {
    // سجل الدخول والخروج مسبقاً
    return { success: false, message: `${emp.name} has already completed their shift.` };
  }
}

module.exports = { initDB, getSuppliers, addSupplier, getExpenses, addExpense, getTodayAttendance, processAttendance };