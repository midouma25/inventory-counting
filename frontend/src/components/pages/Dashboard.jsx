import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, AlertCircle, Users, Wallet, Plus, Settings, CheckCircle2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import ExpensesPieChart from '../ExpensesPieChart';
import useAuditStore from '../../store/auditStore';
import Modal from '../ui/Modal'; 

export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.dir() === 'rtl';
  const [urgentTasks, setUrgentTasks] = useState([]);
  const [stats, setStats] = useState({
    totalDebts: 0,
    totalExpenses: 0,
    presentEmployees: 0,
    totalEmployees: 0,
    topCreditors: [],
    dueThisWeek: 0,
  });
  
  const { logs, fetchLogs } = useAuditStore();

  const [toast, setToast] = useState(null);
  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  // 🔴 دالة تنسيق التاريخ المنظم
  const formatDateTime = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleString('en-GB', { 
      year: 'numeric', month: '2-digit', day: '2-digit', 
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false 
    }).replace(',', ' -');
  };

  const renderAuditDetails = (log) => {
    try {
      const p = JSON.parse(log.details);
      switch(log.action) {
        case 'LOGIN': return `تسجيل دخول (${p.role})`;
        case 'ADD_EXPENSE': return `إضافة مصروف: ${p.desc} (${p.amount})`;
        case 'UPDATE_EXPENSE': return `تعديل مصروف: ${p.desc} (${p.amount})`;
        case 'DELETE_EXPENSE': return `حذف مصروف: ${p.desc} (${p.amount})`;
        case 'CLOSE_DAY': return `إغلاق وتأكيد اليومية. المبيعات: ${p.sales}`;
        case 'CLOSE_SHIFT': return `إغلاق وردية كاشير. المبيعات: ${p.sales}`;
        case 'OPEN_SHIFT': return `فتح وردية جديدة بفوندوكاس: ${p.opening}`;
        case 'ADD_EMPLOYEE': return `إضافة موظف جديد: ${p.name}`;
        case 'UPDATE_EMPLOYEE': return `تعديل بيانات الموظف: ${p.name}`;
        case 'DELETE_EMPLOYEE': return `حذف/تعطيل الموظف: ${p.name}`;
        case 'ADD_USER': return `إنشاء حساب نظام: ${p.username}`;
        case 'DELETE_USER': return `حذف حساب: ${p.username}`;
        case 'PAY_SALARY': return `صرف راتب موظف بقيمة: ${p.amount}`;
        case 'ADD_SUPPLIER': return `إضافة مورد جديد: ${p.name}`;
        case 'UPDATE_SUPPLIER': return `تعديل بيانات المورد: ${p.name}`;
        case 'DELETE_SUPPLIER': return `حذف بيانات المورد`;
        case 'ADD_RECEIPT': return `استلام فاتورة/سلعة بقيمة: ${p.amount}`;
        case 'UPDATE_RECEIPT': return `تعديل فاتورة مورد إلى: ${p.amount}`;
        case 'DELETE_RECEIPT': return `حذف فاتورة مورد`;
        case 'ADD_PAYMENT': return `تسديد دفعة لمورد بقيمة: ${p.amount}`;
        case 'UPDATE_PAYMENT': return `تعديل تسديد مورد إلى: ${p.amount}`;
        case 'DELETE_PAYMENT': return `حذف تسديد مورد`;
        case 'ADD_ADVANCE': return `تقديم سلفة بقيمة: ${p.amount}`;
        case 'UPDATE_ADVANCE': return `تعديل سلفة إلى: ${p.amount}`;
        case 'DELETE_ADVANCE': return `إلغاء سلفة مالية`;
        case 'ADD_TASK': return `إضافة مهمة للأجندة: ${p.title}`;
        case 'UPDATE_TASK_STATUS': return `تغيير حالة مهمة إلى: ${p.status}`;
        case 'DELETE_TASK': return `حذف مهمة من الأجندة`;
        case 'RESCHEDULE_TASK': return `تأجيل مهمة إلى تاريخ: ${p.newDate}`;
        case 'CHECK_IN': return `تسجيل حضور الساعة: ${p.time}`;
        case 'CHECK_OUT': return `تسجيل انصراف الساعة: ${p.time}`;
        case 'UPDATE_ATTENDANCE': return `تعديل وقت حضور/انصراف الموظف`;
        default: return t(`audit.details.${log.action}`, p) || JSON.stringify(p);
      }
    } catch (e) { return log.details; }
  };

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [storeName, setStoreName] = useState(localStorage.getItem('storeName') || 'GHERBI.AI');

  const handleSaveStoreName = (e) => {
    e.preventDefault();
    localStorage.setItem('storeName', storeName);
    setIsSettingsOpen(false);
    showToast('success', t('settings.modal.saveSuccess', 'تم حفظ التغييرات بنجاح!'));
  };

  useEffect(() => {
    const fetchAndNotifyUrgentData = async () => {
      try {
        if (window.api && window.api.getAgendaTasks) {
          const tasks = await window.api.getAgendaTasks();
          const todayString = new Date().toISOString().split('T')[0];
          const urgent = tasks.filter(task => ((task.task_date && task.task_date <= todayString) || (task.date && task.date <= todayString)) && task.status === 'pending');
          setUrgentTasks(urgent);
          if (urgent.length > 0) {
            const hasNotified = sessionStorage.getItem('notified_urgent_tasks');
            if (!hasNotified && window.api.showNotification) {
              window.api.showNotification({ title: t('dashboard.alerts.systemTitle', 'تنبيهات النظام'), body: t('dashboard.alerts.urgentBody', { count: urgent.length, defaultValue: `لديك ${urgent.length} مهام مستحقة.` }) });
              sessionStorage.setItem('notified_urgent_tasks', 'true');
            }
          }
        }
      } catch (error) { console.error("Error fetching urgent tasks:", error); }
    };
    fetchAndNotifyUrgentData();
  }, [t]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        if (window.api) {
          const todayString = new Date().toISOString().split('T')[0];
          const [suppliers, expenses, attendance, dueAmount] = await Promise.all([
            window.api.getSuppliers(), window.api.getExpenses(), window.api.getTodayAttendance(todayString), window.api.getDueThisWeek()
          ]);
          const totalDebts = suppliers.reduce((sum, s) => sum + (s.total_debt || s.totalDebt || 0), 0);
          const topCreditors = [...suppliers].filter(s => (s.total_debt || s.totalDebt || 0) > 0).sort((a, b) => (b.total_debt || b.totalDebt || 0) - (a.total_debt || a.totalDebt || 0)).slice(0, 5).map(s => ({ name: s.name, debt: s.total_debt || s.totalDebt || 0 }));
          const totalExpenses = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
          const presentEmployees = attendance.filter(emp => emp.status === 'present').length;
          let totalEmployees = 0;
          if (window.api.getEmployees) {
             const employeesObj = await window.api.getEmployees();
             totalEmployees = (Array.isArray(employeesObj) ? employeesObj : Object.values(employeesObj).filter(e => typeof e === 'object' && e !== null)).length;
          }
          setStats({ totalDebts, totalExpenses, presentEmployees, totalEmployees, topCreditors, dueThisWeek: dueAmount || 0 });
        }
      } catch (error) { console.error("Error fetching dashboard data:", error); }
    };
    fetchDashboardData();
  }, [t]);

  const customTooltipStyle = { backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc', borderRadius: '0.5rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans text-start relative">
      {toast && (
        <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[9999] px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 ${
          toast.type === 'success' ? 'bg-emerald-600 text-white' : toast.type === 'warning' ? 'bg-amber-600 text-white' : 'bg-red-600 text-white'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span className="font-bold">{toast.message}</span>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">{t('dashboard.title', 'لوحة القيادة')}</h1>
          <p className="text-sm text-slate-500 mt-1">{t('dashboard.subtitle', 'نظرة عامة على النظام')}</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setIsSettingsOpen(true)} className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-md font-medium hover:bg-slate-700 transition-colors">
            <Settings size={18} /><span>{t('sidebar.settings', 'الإعدادات')}</span>
          </button>
          <button onClick={() => navigate('/expenses')} className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-slate-200 transition-colors">
            <Plus size={18} /><span>{t('dashboard.quickActionExpense', 'إضافة مصروف')}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-slate-400">{t('dashboard.kpi.totalDebts', 'إجمالي ديون الموردين')}</p>
              <h3 className="text-2xl font-bold text-white mt-1">{stats.totalDebts.toLocaleString()} {t('currency', 'د.ج')}</h3>
            </div>
            <div className="p-2 bg-slate-800 rounded-lg text-slate-400"><TrendingUp size={20} /></div>
          </div>
        </div>

        <div className="bg-slate-900 border border-red-900/30 p-5 rounded-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-slate-400">{t('dashboard.kpi.dueThisWeek', 'مستحقات هذا الأسبوع')}</p>
              <h3 className="text-2xl font-bold text-red-400 mt-1">{stats.dueThisWeek.toLocaleString()} {t('currency', 'د.ج')}</h3>
            </div>
            <div className="p-2 bg-red-950/50 rounded-lg text-red-400"><AlertCircle size={20} /></div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-slate-400">{t('dashboard.kpi.activeEmployees', 'العمال الحاضرين')}</p>
              <h3 className="text-2xl font-bold text-white mt-1">{stats.presentEmployees} / {stats.totalEmployees || 0}</h3>
            </div>
            <div className="p-2 bg-slate-800 rounded-lg text-slate-400"><Users size={20} /></div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-slate-400">{t('dashboard.kpi.expenses', 'إجمالي المصاريف')}</p>
              <h3 className="text-2xl font-bold text-white mt-1">{stats.totalExpenses.toLocaleString()} {t('currency', 'د.ج')}</h3>
            </div>
            <div className="p-2 bg-slate-800 rounded-lg text-slate-400"><Wallet size={20} /></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
        <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-xl p-5 min-h-[300px] flex flex-col">
          <h3 className="text-lg font-medium text-white mb-6">{t('dashboard.charts.topCreditors', 'أكبر الدائنين')}</h3>
          <div className="flex-1 w-full" dir="ltr"> 
            {stats.topCreditors.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.topCreditors} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
                  <RechartsTooltip cursor={{fill: '#1e293b'}} contentStyle={customTooltipStyle} formatter={(value) => [`${value.toLocaleString()} ${t('currency', 'د.ج')}`, t('suppliers.table.totalDebt', 'الدين')]} />
                  <Bar dataKey="debt" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={50} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-500">{t('common.noResults', 'لا توجد نتائج')}</div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5 min-h-[300px] flex flex-col">
          <h3 className="text-lg font-medium text-white mb-2">{t('dashboard.charts.expensesDist', 'توزيع المصاريف')}</h3>
          <div className="flex-1 w-full h-full relative"><ExpensesPieChart /></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h3 className="text-lg font-bold text-white mb-4">{t('dashboard.lists.urgentAlerts', 'تنبيهات عاجلة')}</h3>
          <div className="space-y-3">
            {urgentTasks.length === 0 ? (
              <p className="text-slate-500 text-sm">{t('dashboard.alerts.noTasks', 'لا توجد مهام.')}</p>
            ) : (
              urgentTasks.slice(0, 5).map(task => (
                <div key={task.id} className="p-3 bg-red-950/20 border border-red-900/50 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-medium text-red-200 text-sm">{task.title}</p>
                    <p className="text-xs text-red-400 mt-1">{task.date || task.task_date}</p>
                  </div>
                  {task.amount > 0 && <span className="font-bold text-slate-300 text-sm">{task.amount.toLocaleString()} {t('currency', 'د.ج')}</span>}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h3 className="text-lg font-bold text-white mb-4">{t('dashboard.lists.recentAudit', 'سجل النشاطات الحديثة')}</h3>
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
            {logs.length === 0 ? (
              <div className="text-center p-4 text-slate-500 text-sm border border-dashed border-slate-800 rounded-lg">
                {t('dashboard.lists.noAuditLogs', 'لا يوجد نشاط مسجل حديثاً.')}
              </div>
            ) : (
              logs.slice(0, 8).map(log => (
                <div key={log.id} className="flex justify-between items-center p-3 border border-slate-800 rounded-lg bg-slate-950/50">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-300">{renderAuditDetails(log)}</p>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <span className="text-blue-400 font-bold">{log.username}</span> 
                      {/* 🔴 استخدام دالة التاريخ الجديدة هنا */}
                      • <span dir="ltr" className="font-mono text-slate-400">{formatDateTime(log.created_at)}</span>
                    </p>
                  </div>
                  <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded">
                    {log.action}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <Modal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} title={t('settings.modal.title', 'إعدادات المتجر')}>
        <form onSubmit={handleSaveStoreName} className="space-y-4 text-start">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">
               {t('settings.modal.storeNameLabel', 'اسم المتجر')}
            </label>
            <input 
              type="text" 
              value={storeName} 
              onChange={e => setStoreName(e.target.value)} 
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-start" 
              placeholder={t('settings.modal.storeNamePlaceholder', 'أدخل اسم المتجر')}
              required
            />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={() => setIsSettingsOpen(false)} className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors">
               {t('common.cancel', 'إلغاء')}
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-colors">
               {t('settings.modal.saveBtn', 'حفظ')}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}