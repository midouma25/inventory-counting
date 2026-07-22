const Database = require('better-sqlite3');
const path = require('path');
const { app } = require('electron');

// تحديد مسار قاعدة البيانات في مجلد بيانات المستخدم الخاص بالنظام
const dbPath = path.join(app.getPath('userData'), 'pos_manager.db');
const db = new Database(dbPath);

// تفعيل وضع WAL لتحسين أداء وسرعة قاعدة البيانات
db.pragma('journal_mode = WAL');

function initDatabase() {
  try {
    // 1. جدول المستخدمين
    db.prepare(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'admin'
      )
    `).run();
    

    const createExpensesTable = `
  CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    amount REAL NOT NULL,
    date DATE DEFAULT (date('now', 'localtime')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`;
  db.prepare(createExpensesTable).run();


    // التحقق من وجود حساب الأدمن وإنشائه إذا لم يكن موجوداً
    const checkAdmin = db.prepare("SELECT COUNT(*) as count FROM users WHERE username = 'admin'").get();
    if (checkAdmin.count === 0) {
      db.prepare("INSERT INTO users (username, password, role) VALUES (?, ?, ?)").run('admin', 'admin', 'admin');
      console.log("تم إنشاء حساب الأدمن الافتراضي بنجاح (admin / admin)");
    }

    // 2. جدول الموردين
    db.prepare(`
      CREATE TABLE IF NOT EXISTS suppliers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT,
        initial_debt REAL DEFAULT 0,
        total_debt REAL DEFAULT 0,
        status TEXT DEFAULT 'clear',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `).run();

    // 3. جدول الموظفين
    db.prepare(`
      CREATE TABLE IF NOT EXISTS employees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        role TEXT,
        pin_code TEXT UNIQUE,
        status TEXT DEFAULT 'active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `).run();

    // 4. جدول الحضور والانصراف
    db.prepare(`
      CREATE TABLE IF NOT EXISTS attendance (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        employee_id INTEGER NOT NULL,
        date TEXT NOT NULL,
        time_in TEXT,
        time_out TEXT,
        status TEXT DEFAULT 'present',
        FOREIGN KEY (employee_id) REFERENCES employees(id)
      )
    `).run();

    // 5. جدول المصروفات
    db.prepare(`
      CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        amount REAL NOT NULL,
        date TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `).run();

    // 6. جدول المهام (الأجندة)
    db.prepare(`
      CREATE TABLE IF NOT EXISTS agenda_tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        type TEXT NOT NULL,
        task_date TEXT NOT NULL,
        task_time TEXT,
        status TEXT DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `).run();

    console.log('تمت تهيئة قاعدة البيانات بنجاح في المسار:', dbPath);
  } catch (error) {
    console.error('خطأ أثناء تهيئة قاعدة البيانات:', error);
  }
}


function getExpenses() {
  return db.prepare('SELECT * FROM expenses ORDER BY id DESC').all();
}

function addExpense(expense) {
  const stmt = db.prepare('INSERT INTO expenses (description, category, amount, date) VALUES (?, ?, ?, ?)');
  const date = expense.date || new Date().toISOString().split('T')[0]; // تاريخ اليوم إذا لم يُحدد
  const info = stmt.run(expense.description, expense.category, expense.amount, date);
  return { success: true, id: info.lastInsertRowid };
}

// حذف مصروف
function deleteExpense(id) {
  const stmt = db.prepare('DELETE FROM expenses WHERE id = ?');
  const info = stmt.run(id);
  return { success: info.changes > 0 };
}

// تعديل مصروف
function updateExpense(id, expense) {
  const stmt = db.prepare('UPDATE expenses SET description = ?, category = ?, amount = ? WHERE id = ?');
  const info = stmt.run(expense.description, expense.category, expense.amount, id);
  return { success: info.changes > 0 };
}
// دالة التحقق من تسجيل الدخول
function verifyLogin(username, password) {
  try {
    const user = db.prepare("SELECT * FROM users WHERE username = ? AND password = ?").get(username, password);
    if (user) {
      return { success: true, user: { id: user.id, username: user.username, role: user.role } };
    }
    return { success: false, message: 'Invalid username or password' };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

// دوال الموردين
function getSuppliers() {
  try {
    return db.prepare("SELECT * FROM suppliers ORDER BY id DESC").all();
  } catch (error) {
    console.error("خطأ في جلب الموردين:", error);
    throw error;
  }
}

function addSupplier(supplierData) {
  try {
    const { name, phone, initialDebt } = supplierData;
    const status = initialDebt > 0 ? 'indebted' : 'clear';
    
    const info = db.prepare(`
      INSERT INTO suppliers (name, phone, initial_debt, total_debt, status)
      VALUES (?, ?, ?, ?, ?)
    `).run(name, phone, initialDebt, initialDebt, status);
    
    // إرجاع المورد الجديد مع المعرف الخاص به
    return db.prepare("SELECT * FROM suppliers WHERE id = ?").get(info.lastInsertRowid);
  } catch (error) {
    console.error("خطأ في إضافة المورد:", error);
    throw error;
  }
}

// دوال الموظفين
function getEmployees() {
  try {
    const stmt = db.prepare('SELECT * FROM employees');
    return stmt.all();
  } catch (error) {
    console.error("Error fetching employees:", error);
    return [];
  }
}

function addEmployee(employeeData) {
  try {
    const { name, role, pinCode } = employeeData;
    const info = db.prepare(`
      INSERT INTO employees (name, role, pin_code) VALUES (?, ?, ?)
    `).run(name, role, pinCode);
    
    return db.prepare("SELECT * FROM employees WHERE id = ?").get(info.lastInsertRowid);
  } catch (error) {
    console.error("خطأ في إضافة الموظف:", error);
    throw error;
  }
}

// دوال الحضور والانصراف
function handlePinEntry(pinCode) {
  try {
    // 1. البحث عن الموظف
    const employee = db.prepare("SELECT * FROM employees WHERE pin_code = ?").get(pinCode);
    if (!employee) return { success: false, message: 'رمز PIN غير صحيح' };

    // 2. تجهيز تاريخ ووقت اليوم
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const now = new Date().toLocaleTimeString('en-US', { hour12: false }); // HH:MM:SS

    // 3. فحص سجل الموظف لليوم الحالي
    const record = db.prepare("SELECT * FROM attendance WHERE employee_id = ? AND date = ?").get(employee.id, today);

    if (!record) {
      // تسجيل دخول (Check-in)
      db.prepare("INSERT INTO attendance (employee_id, date, time_in) VALUES (?, ?, ?)").run(employee.id, today, now);
      return { success: true, action: 'check_in', employeeName: employee.name, time: now };
    } else if (!record.time_out) {
      // تسجيل خروج (Check-out)
      db.prepare("UPDATE attendance SET time_out = ? WHERE id = ?").run(now, record.id);
      return { success: true, action: 'check_out', employeeName: employee.name, time: now };
    } else {
      // تم إكمال الدوام
      return { success: false, message: `الموظف ${employee.name} أتم تسجيل الحضور والانصراف اليوم` };
    }
  } catch (error) {
    console.error("خطأ في تسجيل الحضور:", error);
    return { success: false, message: error.message };
  }
}

function getTodayAttendance(date) {
  try {
    const stmt = db.prepare('SELECT * FROM attendance WHERE date = ?');
    return stmt.all(date);
  } catch (error) {
    console.error("Error fetching today's attendance:", error);
    return [];
  }
}


module.exports = {
  initDatabase,
  verifyLogin,
  getSuppliers,
  addSupplier,
  getEmployees,
  addEmployee,
  handlePinEntry,
  getExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
  getTodayAttendance,
  getEmployees
};