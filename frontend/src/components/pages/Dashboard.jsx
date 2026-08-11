import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, AlertCircle, Users, Wallet, Plus, Settings, CheckCircle2, Rocket, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import ExpensesPieChart from '../ExpensesPieChart';
import useAuditStore from '../../store/auditStore';
import Modal from '../ui/Modal'; 
import useAuthStore from '../../store/authStore'; // 🌟 أضفنا استيراد مخزن الصلاحيات هنا

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
    totalSuppliers: 0, 
    topCreditors: [],
    dueThisWeek: 0,
  });
  
  const { logs, fetchLogs } = useAuditStore();
  const [toast, setToast] = useState(null);
  
  const [hideOnboarding, setHideOnboarding] = useState(localStorage.getItem('hideOnboarding') === 'true');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [storeName, setStoreName] = useState(localStorage.getItem('storeName') || 'GHERBI.AI');

  // 🌟 الإصلاح هنا: استخدام مخزن النظام بدلاً من الـ localStorage للتحقق من أنك المدير
  const user = useAuthStore(state => state.user);
  const isSuperAdmin = user?.role === 'superadmin' || user?.role === 'admin';

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

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
      const p = JSON.parse(log.details || '{}');
      switch(log.action) {
        case 'LOGIN': return t('audit.login', { role: p.role, defaultValue: `تسجيل دخول للنظام (${p.role})` });
        case 'ADD_EXPENSE': return t('audit.addExpense', { desc: p.desc, amount: p.amount, defaultValue: `إضافة مصروف: ${p.desc} (${p.amount} د.ج)` });
        case 'UPDATE_EXPENSE': return t('audit.updateExpense', { desc: p.desc, amount: p.amount, defaultValue: `تعديل مصروف: ${p.desc} (${p.amount} د.ج)` });
        case 'DELETE_EXPENSE': return t('audit.deleteExpense', { desc: p.desc, amount: p.amount, defaultValue: `حذف مصروف: ${p.desc} (${p.amount} د.ج)` });
        case 'CLOSE_DAY': return t('audit.closeDay', { sales: p.sales, defaultValue: `إغلاق وتأكيد يومية المتجر. المبيعات: ${p.sales} د.ج` });
        case 'CLOSE_SHIFT': return t('audit.closeShift', { sales: p.sales, defaultValue: `إغلاق وردية كاشير. المبيعات: ${p.sales} د.ج` });
        case 'OPEN_SHIFT': return t('audit.openShift', { opening: p.opening, defaultValue: `فتح وردية جديدة بفوندوكاس: ${p.opening} د.ج` });
        case 'ADD_EMPLOYEE': return t('audit.addEmployee', { name: p.name, role: p.role, defaultValue: `إضافة موظف جديد: ${p.name} (${p.role})` });
        case 'UPDATE_EMPLOYEE': return t('audit.updateEmployee', { name: p.name, defaultValue: `تعديل بيانات الموظف: ${p.name}` });
        case 'DELETE_EMPLOYEE': return t('audit.deleteEmployee', { name: p.name, defaultValue: `حذف/تعطيل الموظف: ${p.name}` });
        case 'ADD_USER': return t('audit.addUser', { username: p.username, role: p.role, defaultValue: `إنشاء حساب للنظام: ${p.username} (${p.role})` });
        case 'DELETE_USER': return t('audit.deleteUser', { username: p.username, defaultValue: `حذف حساب: ${p.username}` });
        case 'PAY_SALARY': return t('audit.paySalary', { amount: p.amount, defaultValue: `صرف راتب موظف بقيمة: ${p.amount} د.ج` });
        case 'ADD_SUPPLIER': return t('audit.addSupplier', { name: p.name, debt: p.debt, defaultValue: `إضافة مورد جديد: ${p.name} (دين أولي: ${p.debt})` });
        case 'UPDATE_SUPPLIER': return t('audit.updateSupplier', { name: p.name, defaultValue: `تعديل بيانات المورد: ${p.name}` });
        case 'DELETE_SUPPLIER': return t('audit.deleteSupplier', { id: p.id, defaultValue: `حذف بيانات المورد (ID: ${p.id})` });
        case 'ADD_RECEIPT': return t('audit.addReceipt', { amount: p.amount, defaultValue: `استلام فاتورة/سلعة بقيمة: ${p.amount} د.ج` });
        case 'UPDATE_RECEIPT': return t('audit.updateReceipt', { amount: p.amount, defaultValue: `تعديل فاتورة مورد إلى: ${p.amount} د.ج` });
        case 'DELETE_RECEIPT': return t('audit.deleteReceipt', { id: p.id, defaultValue: `حذف فاتورة مورد (ID: ${p.id})` });
        case 'ADD_PAYMENT': return t('audit.addPayment', { amount: p.amount, defaultValue: `تسديد دفعة لمورد بقيمة: ${p.amount} د.ج` });
        case 'UPDATE_PAYMENT': return t('audit.updatePayment', { amount: p.amount, defaultValue: `تعديل تسديد مورد إلى: ${p.amount} د.ج` });
        case 'DELETE_PAYMENT': return t('audit.deletePayment', { id: p.id, defaultValue: `حذف تسديد مورد (ID: ${p.id})` });
        case 'ADD_TASK': return t('audit.addTask', { title: p.title, defaultValue: `إضافة مهمة للأجندة: ${p.title}` });
        case 'UPDATE_TASK_STATUS': return t('audit.updateTaskStatus', { status: p.status, defaultValue: `تغيير حالة مهمة إلى: ${p.status}` });
        case 'DELETE_TASK': return t('audit.deleteTask', { id: p.id, defaultValue: `حذف مهمة من الأجندة (ID: ${p.id})` });
        case 'RESCHEDULE_TASK': return t('audit.rescheduleTask', { date: p.newDate, defaultValue: `تأجيل مهمة إلى تاريخ: ${p.newDate}` });
        case 'CHECK_IN': return t('audit.checkIn', { time: p.time, defaultValue: `تسجيل حضور الساعة: ${p.time}` });
        case 'CHECK_OUT': return t('audit.checkOut', { time: p.time, defaultValue: `تسجيل انصراف الساعة: ${p.time}` });
        case 'UPDATE_ATTENDANCE': return t('audit.updateAttendance', { defaultValue: `تعديل وقت حضور/انصراف الموظف` });
        case 'ADD_INV_FAMILY': return t('audit.addInvFamily', { name: p.name, defaultValue: `إضافة عائلة مخزون جديدة: ${p.name || 'غير محدد'}` });
        case 'UPDATE_INV_FAMILY': return t('audit.updateInvFamily', { name: p.name, defaultValue: `تعديل عائلة مخزون: ${p.name || ''}` });
        case 'DELETE_INV_FAMILY': return t('audit.deleteInvFamily', { id: p.id, defaultValue: `حذف عائلة مخزون بالمعرف: ${p.id || ''}` });
        case 'ADD_INV_TYPE': return t('audit.addInvType', { name: p.name, defaultValue: `إضافة نوع منتج جديد: ${p.name || 'غير محدد'}` });
        case 'UPDATE_INV_TYPE': return t('audit.updateInvType', { name: p.name, defaultValue: `تعديل نوع منتج: ${p.name || ''}` });
        case 'DELETE_INV_TYPE': return t('audit.deleteInvType', { id: p.id, defaultValue: `حذف نوع منتج بالمعرف: ${p.id || ''}` });
        case 'ADD_INV_ITEM': return t('audit.addInvItem', { name: p.name, defaultValue: `إضافة منتج جديد للمخزون: ${p.name || 'غير محدد'}` });
        case 'UPDATE_INV_ITEM': return t('audit.updateInvItem', { name: p.name, defaultValue: `تعديل بيانات/كمية منتج: ${p.name || ''}` });
        case 'DELETE_INV_ITEM': return t('audit.deleteInvItem', { id: p.id, defaultValue: `حذف منتج من المخزون بالمعرف: ${p.id || ''}` });
        default: return t(`audit.details.${log.action}`, p, { defaultValue: JSON.stringify(p) });
      }
    } catch (e) { return log.details || log.action; }
  };

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

          const totalSuppliers = suppliers.length;

          setStats({ totalDebts, totalExpenses, presentEmployees, totalEmployees, topCreditors, dueThisWeek: dueAmount || 0, totalSuppliers });
        }
      } catch (error) { console.error("Error fetching dashboard data:", error); }
    };
    fetchDashboardData();
  }, [t]);

  const onboardingSteps = [
    { id: 'store', label: t('onboarding.store', 'تحديث اسم المحل'), completed: storeName !== 'GHERBI.AI' && storeName.trim() !== '', onClick: () => setIsSettingsOpen(true) },
    { id: 'emp', label: t('onboarding.emp', 'إضافة أول موظف'), completed: stats.totalEmployees > 1, onClick: () => navigate('/hr') },
    { id: 'sup', label: t('onboarding.sup', 'إضافة مورد للتعاملات'), completed: stats.totalSuppliers > 0, onClick: () => navigate('/suppliers') },
    { id: 'exp', label: t('onboarding.exp', 'تسجيل أول مصروف'), completed: stats.totalExpenses > 0, onClick: () => navigate('/expenses') },
  ];

  const completedSteps = onboardingSteps.filter(s => s.completed).length;
  const progressPercent = Math.round((completedSteps / onboardingSteps.length) * 100);

  useEffect(() => {
    if (progressPercent === 100 && !hideOnboarding) {
      const timer = setTimeout(() => {
        setHideOnboarding(true);
        localStorage.setItem('hideOnboarding', 'true');
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [progressPercent, hideOnboarding]);

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

      {!hideOnboarding && isSuperAdmin && (
        <div className="mb-8 bg-slate-900 border border-blue-900/50 rounded-2xl p-6 relative overflow-hidden shadow-2xl transition-all">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
          
          <button 
            onClick={() => { localStorage.setItem('hideOnboarding', 'true'); setHideOnboarding(true); }} 
            className="absolute top-4 end-4 text-slate-500 hover:text-white transition-colors"
            title={t('common.close', 'إغلاق')}
          >
            <X size={20} />
          </button>

          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            <div className="flex-1 w-full">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <Rocket className="text-blue-400" size={24} />
                {t('onboarding.title', 'مرحباً بك! لنقم بإعداد متجرك')}
              </h2>
              <p className="text-slate-400 text-sm mb-5">
                {t('onboarding.desc', 'أكمل هذه الخطوات الأساسية لتستفيد من النظام بأقصى كفاءة.')}
              </p>

              <div className="flex items-center gap-3">
                <div className="flex-1 bg-slate-950 border border-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-indigo-500 h-full transition-all duration-700 ease-out" 
                    style={{ width: `${progressPercent}%` }}>
                  </div>
                </div>
                <span className={`text-sm font-bold w-10 text-end ${progressPercent === 100 ? 'text-emerald-400' : 'text-blue-400'}`}>
                  {progressPercent}%
                </span>
              </div>
              
              {progressPercent === 100 && (
                <p className="text-emerald-400 text-xs mt-3 font-bold animate-pulse">
                  {t('onboarding.done', 'عمل رائع! أنت الآن جاهز لاستخدام النظام بالكامل.')}
                </p>
              )}
            </div>

            <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
              {onboardingSteps.map(step => (
                <div
                  key={step.id}
                  onClick={!step.completed ? step.onClick : undefined}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                    step.completed
                      ? 'bg-emerald-950/20 border-emerald-900/40 cursor-default'
                      : 'bg-slate-950/50 border-slate-800 hover:border-blue-500/50 hover:bg-slate-800/80 cursor-pointer shadow-sm hover:shadow-blue-900/20'
                  }`}
                >
                  {step.completed ? (
                    <CheckCircle2 className="text-emerald-500 shrink-0" size={20} />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-600 shrink-0"></div>
                  )}
                  <span className={`text-sm font-medium ${step.completed ? 'text-emerald-400/60 line-through' : 'text-slate-200'}`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* مؤشرات الأداء KPI */}
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
                      • <span dir="ltr" className="font-mono text-slate-400">{formatDateTime(log.created_at)}</span>
                    </p>
                  </div>
                  <span className="text-[10px] font-bold bg-slate-800 text-slate-400 px-2 py-1 rounded">
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