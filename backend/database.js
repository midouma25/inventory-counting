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
    return db.prepare("SELECT * FROM employees ORDER BY id DESC").all();
  } catch (error) {
    console.error("خطأ في جلب الموظفين:", error);
    throw error;
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

function getTodayAttendance() {
  try {
    const today = new Date().toISOString().split('T')[0];
    // نجلب السجلات مع اسم الموظف ومنصبه عبر الربط (JOIN)
    return db.prepare(`
      SELECT a.*, e.name, e.role 
      FROM attendance a 
      JOIN employees e ON a.employee_id = e.id 
      WHERE a.date = ? 
      ORDER BY a.id DESC
    `).all(today);
  } catch (error) {
    console.error("خطأ في جلب سجلات الحضور:", error);
    throw error;
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
  getTodayAttendance
};