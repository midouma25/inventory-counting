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

  // 2. جداول الموارد البشرية
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

  // 3. جدول الأجندة والمهام
  db.prepare(`
    CREATE TABLE IF NOT EXISTS agenda (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      type TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  // حقن بيانات وهمية للعمال (إذا كان الجدول فارغاً)
  const empCount = db.prepare('SELECT COUNT(*) as count FROM employees').get().count;
  if (empCount === 0) {
    const insertEmp = db.prepare('INSERT INTO employees (name, role, pin) VALUES (?, ?, ?)');
    insertEmp.run('Ahmed Ali', 'Cashier', '1001');
    insertEmp.run('Sarah Connor', 'Store Manager', '1002');
    insertEmp.run('Karim Nabil', 'Stock Clerk', '1003');
    insertEmp.run('Mona Youssef', 'Cashier', '1004');
  }

  // حقن بيانات وهمية للأجندة بتواريخ ديناميكية (إذا كان الجدول فارغاً)
  const agendaCount = db.prepare('SELECT COUNT(*) as count FROM agenda').get().count;
  if (agendaCount === 0) {
    // الحصول على تاريخ اليوم وغداً بصيغة YYYY-MM-DD بناءً على التوقيت المحلي
    const d = new Date();
    const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    
    const d2 = new Date(d.getTime() + 86400000);
    const tomorrow = `${d2.getFullYear()}-${String(d2.getMonth() + 1).padStart(2, '0')}-${String(d2.getDate()).padStart(2, '0')}`;

    const insertTask = db.prepare('INSERT INTO agenda (title, type, date, time, status) VALUES (?, ?, ?, ?, ?)');
    insertTask.run('Soummam Dairy Delivery', 'delivery', today, '10:00 AM', 'completed');
    insertTask.run('Pay ULTRA JOY Inc. Invoice', 'payment', today, '14:00 PM', 'pending');
    insertTask.run('Restock Beverage Coolers', 'maintenance', today, '20:00 PM', 'pending');
    insertTask.run('Cevital Oil Delivery', 'delivery', tomorrow, '09:00 AM', 'pending');
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
  return db.prepare(`
    SELECT e.id, e.name, e.role, e.pin, a.time_in as timeIn, a.time_out as timeOut,
    CASE WHEN a.time_in IS NOT NULL THEN 'present' ELSE 'absent' END as status
    FROM employees e LEFT JOIN attendance a ON e.id = a.employee_id AND a.date = ?
  `).all(date);
}
function processAttendance(pin, date, time) {
  const emp = db.prepare('SELECT id, name FROM employees WHERE pin = ?').get(pin);
  if (!emp) return { success: false, message: 'Invalid PIN or Barcode not recognized!' };
  const record = db.prepare('SELECT id, time_in, time_out FROM attendance WHERE employee_id = ? AND date = ?').get(emp.id, date);
  if (!record) {
    db.prepare('INSERT INTO attendance (employee_id, date, time_in) VALUES (?, ?, ?)').run(emp.id, date, time);
    return { success: true, message: `${emp.name} Checked IN at ${time}` };
  } else if (!record.time_out) {
    db.prepare('UPDATE attendance SET time_out = ? WHERE id = ?').run(time, record.id);
    return { success: true, message: `${emp.name} Checked OUT at ${time}` };
  } else {
    return { success: false, message: `${emp.name} has already completed their shift.` };
  }
}

// === دوال الأجندة ===
function getAgendaTasks() {
  return db.prepare('SELECT * FROM agenda ORDER BY date ASC, time ASC').all();
}

function addAgendaTask(task) {
  const stmt = db.prepare('INSERT INTO agenda (title, type, date, time, status) VALUES (?, ?, ?, ?, ?)');
  const info = stmt.run(task.title, task.type, task.date, task.time, task.status || 'pending');
  return { id: info.lastInsertRowid, ...task, status: task.status || 'pending' };
}

function toggleAgendaTaskStatus(id, status) {
  db.prepare('UPDATE agenda SET status = ? WHERE id = ?').run(status, id);
  return { id, status };
}

module.exports = { 
  initDB, getSuppliers, addSupplier, getExpenses, addExpense, 
  getTodayAttendance, processAttendance,
  getAgendaTasks, addAgendaTask, toggleAgendaTaskStatus
};