const Database = require('better-sqlite3');
const path = require('path');
const { app } = require('electron');

const dbPath = path.join(app.getPath('userData'), 'pos_manager1.db');
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
    


    db.exec(`
  CREATE TABLE IF NOT EXISTS end_of_day (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    caisse_id INTEGER DEFAULT 1,       -- To identify the cash register (useful if we later add a Multi-Caisse feature)
    date TEXT UNIQUE,                  -- Closing date (UNIQUE to prevent creating more than one close for the same day)
    expected_amount REAL DEFAULT 0,    -- Expected amount (calculated within the application)
    actual_amount REAL DEFAULT 0,      -- Actual amount (entered manually by the manager)
    difference REAL DEFAULT 0,         -- Difference between expected and actual
    closed_by TEXT,                    -- Name or ID of the person who performed the close
    status TEXT DEFAULT 'Pending',     -- Status (Pending / Closed)
    notes TEXT,                        -- Additional notes (for example, justification for any shortage)
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);


// Add this code after creating the table to verify its existence
const tableCheck = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='end_of_day'").get();

if (tableCheck) {
  console.log("✅ End-of-day table (end_of_day) created successfully!");
} else {
  console.log("❌ Table was not created.");
}


    console.log('تمت تهيئة قاعدة البيانات بنجاح');
  } catch (error) {
    console.error('خطأ أثناء تهيئة قاعدة البيانات:', error);
  }
}

function getExpenses() { return db.prepare('SELECT * FROM expenses ORDER BY date DESC, id DESC').all(); }
function addExpense(expense) {
  const stmt = db.prepare('INSERT INTO expenses (description, category, amount, date) VALUES (?, ?, ?, ?)');
  const date = expense.date || new Date().toISOString().split('T')[0];
  const info = stmt.run(expense.description, expense.category, expense.amount, date);
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


// دالة حذف المهمة
function deleteAgendaTask(id) {
  try {
    db.prepare("DELETE FROM agenda_tasks WHERE id = ?").run(id);
    return { success: true };
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
}

// دالة تأجيل المهمة
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

    // إدخال الفاتورة
    const info = db.prepare('INSERT INTO receipts (supplier_id, amount, date, note) VALUES (?, ?, ?, ?)').run(supplierId, amount, date, note);
    
    // التعديل هنا: استخدام علامات التنصيص المفردة 'indebted' بدلاً من المزدوجة
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

// التعديل هنا: استقبال وتسجيل مصدر الكاشير للسلفة
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
    // 1. تنظيف وتحويل كل البيانات لضمان عدم وجود undefined
    const empId = Number(data.employeeId);
    const tHours = Number(data.totalHours) || 0;
    const hRate = Number(data.hourlyRate) || 0;
    const tAdvances = Number(data.totalAdvances) || 0;
    const nSalary = Number(data.netSalary) || 0;
    const sDate = data.startDate || '';
    const eDate = data.endDate || '';
    const pDate = data.date || new Date().toISOString().split('T')[0];

    // 2. إدخال سجل الراتب
    db.prepare(`INSERT INTO salaries (employee_id, start_date, end_date, total_hours, hourly_rate, total_advances, net_salary, payment_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`).run(
      empId, sDate, eDate, tHours, hRate, tAdvances, nSalary, pDate
    );
    
    // 3. تحديث السلفيات لتصبح مدفوعة
    db.prepare(`UPDATE advances SET status = 'paid' WHERE employee_id = ? AND status = 'pending'`).run(empId);
    
    // 4. معالجة الراتب (بالسالب أو الموجب)
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
    // إرجاع الخطأ الدقيق للواجهة لكي نعرف السبب الحقيقي
    return { success: false, error: error.message };
  }
});



// --- دوال الأجندة والتنبيهات ---

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



module.exports = {
  initDatabase, verifyLogin, getSuppliers, addSupplier, getEmployees, addEmployee, 
  handlePinEntry, getExpenses, addExpense, deleteExpense, updateExpense, getTodayAttendance,
  getSupplierDetails, addReceipt, addPayment, getAdvances, addAdvance, 
  getSalaries, calculateEmployeePayroll, paySalary,
  getAgendaTasks, addAgendaTask, toggleAgendaTaskStatus, getDueThisWeek , deleteAgendaTask,
  rescheduleAgendaTask
  // <-- تمت إضافتها هنا
};