import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, AlertCircle, Users, Wallet, Plus } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import ExpensesPieChart from '../ExpensesPieChart'; // استيراد المكون الدائري المستقل

export default function Dashboard() {
  const { t } = useTranslation();
  
  // حفظ الإحصائيات المجمعة من أقسام النظام المختلفة
  const [stats, setStats] = useState({
    totalDebts: 0,
    totalExpenses: 0,
    presentEmployees: 0,
    totalEmployees: 0,
    topCreditors: [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        if (window.api) {
          const todayString = new Date().toISOString().split('T')[0];
          
          // جلب البيانات بشكل متوازي لسرعة الأداء
          const [suppliers, expenses, attendance] = await Promise.all([
            window.api.getSuppliers(),
            window.api.getExpenses(),
            window.api.getTodayAttendance(todayString)
          ]);

          // 1. حساب الديون وأكبر الدائنين
          const totalDebts = suppliers.reduce((sum, s) => sum + s.totalDebt, 0);
          const topCreditors = [...suppliers]
            .filter(s => s.totalDebt > 0)
            .sort((a, b) => b.totalDebt - a.totalDebt)
            .slice(0, 5) // جلب أكبر 5 دائنين
            .map(s => ({ name: s.name, debt: s.totalDebt }));

          // 2. إجمالي المصاريف
          const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

          // 3. إحصائيات الحضور
          const presentEmployees = attendance.filter(emp => emp.status === 'present').length;
          // جلب إجمالي العمال من واجهة الموظفين (سنفترض وجود دالة getEmployees)
          let totalEmployees = 0;
          if (window.api.getEmployees) {
             const employeesObj = await window.api.getEmployees();
             // تحويل الكائن إلى مصفوفة إذا لزم الأمر
             const empArray = Object.values(employeesObj).filter(e => typeof e === 'object' && e !== null);
             totalEmployees = empArray.length;
          } else {
             // بديل مؤقت في حال عدم وجود الدالة
             totalEmployees = attendance.length || 0; 
          }

          setStats({
            totalDebts,
            totalExpenses,
            presentEmployees,
            totalEmployees,
            topCreditors,
          });
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, [t]);

  const customTooltipStyle = {
    backgroundColor: '#0f172a',
    borderColor: '#1e293b',
    color: '#f8fafc',
    borderRadius: '0.5rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans">
      
      {/* الترويسة العليا */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">{t('dashboard.title')}</h1>
          <p className="text-sm text-slate-500 mt-1">{t('dashboard.subtitle')}</p>
        </div>
        <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-slate-200 transition-colors">
          <Plus size={18} />
          <span>{t('dashboard.quickAction')}</span>
        </button>
      </div>

      {/* بطاقات الإحصائيات العلوية KPI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-slate-400">{t('dashboard.kpi.totalDebts')}</p>
              <h3 className="text-2xl font-bold text-white mt-1">
                {stats.totalDebts.toLocaleString()} DA
              </h3>
            </div>
            <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
              <TrendingUp size={20} />
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-red-900/30 p-5 rounded-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-slate-400">{t('dashboard.kpi.dueThisWeek')}</p>
              <h3 className="text-2xl font-bold text-red-400 mt-1">
                {/* قيمة استرشادية، تمثل ثلث الديون تقريباً */}
                {Math.round(stats.totalDebts * 0.3).toLocaleString()} DA 
              </h3>
            </div>
            <div className="p-2 bg-red-950/50 rounded-lg text-red-400">
              <AlertCircle size={20} />
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-slate-400">{t('dashboard.kpi.activeEmployees')}</p>
              <h3 className="text-2xl font-bold text-white mt-1">
                {stats.presentEmployees} / {stats.totalEmployees || 0}
              </h3>
            </div>
            <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
              <Users size={20} />
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-slate-400">{t('dashboard.kpi.expenses')}</p>
              <h3 className="text-2xl font-bold text-white mt-1">
                {stats.totalExpenses.toLocaleString()} DA
              </h3>
            </div>
            <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
              <Wallet size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* قسم المخططات البيانية */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
        
        {/* المخطط العمودي: أكبر الدائنين */}
        <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-xl p-5 min-h-[300px] flex flex-col">
          <h3 className="text-lg font-medium text-white mb-6">{t('dashboard.charts.topCreditors')}</h3>
          <div className="flex-1 w-full" dir="ltr"> 
            {stats.topCreditors.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.topCreditors} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
                  <RechartsTooltip cursor={{fill: '#1e293b'}} contentStyle={customTooltipStyle} formatter={(value) => [`${value.toLocaleString()} DA`, t('suppliers.table.totalDebt') || 'Debt']} />
                  <Bar dataKey="debt" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={50} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-500">
                {t('common.noResults')}
              </div>
            )}
          </div>
        </div>

        {/* المخطط الدائري: توزيع المصاريف */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5 min-h-[300px] flex flex-col">
          <h3 className="text-lg font-medium text-white mb-2">{t('dashboard.charts.expensesDist')}</h3>
          <div className="flex-1 w-full h-full relative">
             <ExpensesPieChart />
          </div>
        </div>
      </div>

      {/* قوائم التنبيهات والأحداث الأخيرة */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h3 className="text-lg font-medium text-white mb-4">{t('dashboard.lists.urgentAlerts')}</h3>
          <div className="space-y-3">
            {stats.topCreditors.length > 0 ? (
               <div className="flex justify-between items-center p-3 border border-slate-800 rounded-lg hover:bg-slate-800/50 transition-colors">
                 <div>
                   <p className="font-medium text-white">{stats.topCreditors[0].name}</p>
                   <p className="text-xs text-red-400">أكبر دائن متبقي</p>
                 </div>
                 <div className="flex items-center gap-3">
                   <span className="font-bold text-red-400">{stats.topCreditors[0].debt.toLocaleString()} DA</span>
                   <button className="text-xs bg-slate-800 text-white px-3 py-1.5 rounded hover:bg-slate-700">
                     {t('dashboard.actions.payNow')}
                   </button>
                 </div>
               </div>
            ) : (
               <div className="p-3 text-slate-500 text-center text-sm">{t('common.noResults')}</div>
            )}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h3 className="text-lg font-medium text-white mb-4">{t('dashboard.lists.recentAudit')}</h3>
          <div className="space-y-3">
            {/* نموذج لحدث أخير، سيتم استبداله مستقبلاً ببيانات السجل */}
            <div className="flex justify-between items-center p-3 border border-slate-800 rounded-lg">
              <div>
                <p className="text-sm font-medium text-white">System Status</p>
                <p className="text-xs text-slate-500">Live & Running</p>
              </div>
              <span className="text-sm text-green-400">OK</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}