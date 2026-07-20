import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, AlertCircle, Users, Wallet, Plus } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';

// ألوان مخصصة للمخطط الدائري تتماشى مع الثيم المظلم
const PIE_COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

export default function Dashboard() {
  const { t } = useTranslation();
  
  // حالة (State) لحفظ الإحصائيات المجمعة
  const [stats, setStats] = useState({
    totalDebts: 0,
    totalExpenses: 0,
    presentEmployees: 0,
    totalEmployees: 0,
    topCreditors: [],
    expensesDist: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        if (window.api) {
          // جلب كل البيانات الحيوية في وقت واحد
          const todayString = new Date().toISOString().split('T')[0];
          const [suppliers, expenses, attendance] = await Promise.all([
            window.api.getSuppliers(),
            window.api.getExpenses(),
            window.api.getTodayAttendance(todayString)
          ]);

          // 1. حساب إجمالي الديون وأكبر 5 دائنين
          const totalDebts = suppliers.reduce((sum, s) => sum + s.totalDebt, 0);
          const topCreditors = [...suppliers]
            .filter(s => s.totalDebt > 0)
            .sort((a, b) => b.totalDebt - a.totalDebt)
            .slice(0, 5)
            .map(s => ({ name: s.name, debt: s.totalDebt }));

          // 2. حساب إجمالي مصاريف الشهر وتوزيعها حسب التصنيف
          // (للتبسيط هنا نجمع كل المصاريف، يمكنك لاحقاً فلترتها حسب الشهر الحالي)
          const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
          const distObj = expenses.reduce((acc, exp) => {
            acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
            return acc;
          }, {});
          
          const expensesDist = Object.entries(distObj).map(([key, value]) => ({
            name: t(`expenses.categories.${key}`), 
            value 
          }));

          // 3. حساب حضور اليوم
          const presentEmployees = attendance.filter(emp => emp.status === 'present').length;
          const totalEmployees = attendance.length;

          // تحديث الحالة
          setStats({
            totalDebts,
            totalExpenses,
            presentEmployees,
            totalEmployees,
            topCreditors,
            expensesDist
          });
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, [t]);

  // إعدادات نافذة التلميح (Tooltip) لتناسب الـ Dark Mode
  const customTooltipStyle = {
    backgroundColor: '#0f172a', // slate-950
    borderColor: '#1e293b', // slate-800
    color: '#f8fafc', // slate-50
    borderRadius: '0.5rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans">
      
      {/* Header */}
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

      {/* KPI Cards (ديناميكية الآن) */}
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
                {/* قيمة افتراضية حتى نبرمج مواعيد الاستحقاق */}
                {(stats.totalDebts * 0.3).toLocaleString()} DA 
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
                {stats.presentEmployees} / {stats.totalEmployees}
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

      {/* المخططات البيانية (Charts) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
        
        {/* مخطط الأعمدة: أكبر 5 دائنين */}
        <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-xl p-5 min-h-[300px] flex flex-col">
          <h3 className="text-lg font-medium text-white mb-6">{t('dashboard.charts.topCreditors')}</h3>
          <div className="flex-1 w-full" dir="ltr"> {/* ltr ليحافظ المخطط على اتجاهه السليم */}
            {stats.topCreditors.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.topCreditors} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
                  <RechartsTooltip cursor={{fill: '#1e293b'}} contentStyle={customTooltipStyle} formatter={(value) => [`${value.toLocaleString()} DA`, 'Debt']} />
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
          <div className="flex-1 w-full" dir="ltr">
            {stats.expensesDist.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.expensesDist}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {stats.expensesDist.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={customTooltipStyle} formatter={(value) => [`${value.toLocaleString()} DA`, '']} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#cbd5e1' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-500">
                {t('common.noResults')}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* القوائم السفلية */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h3 className="text-lg font-medium text-white mb-4">{t('dashboard.lists.urgentAlerts')}</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 border border-slate-800 rounded-lg hover:bg-slate-800/50 transition-colors">
              <div>
                <p className="font-medium text-white">ULTRA JOY Inc.</p>
                <p className="text-xs text-slate-500">Today at 14:00</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-red-400">39,390 DA</span>
                <button className="text-xs bg-slate-800 text-white px-3 py-1.5 rounded hover:bg-slate-700">
                  {t('dashboard.actions.payNow')}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h3 className="text-lg font-medium text-white mb-4">{t('dashboard.lists.recentAudit')}</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 border border-slate-800 rounded-lg">
              <div>
                <p className="text-sm font-medium text-white">Advance Recorded - Ahmed</p>
                <p className="text-xs text-slate-500">45 mins ago by Admin</p>
              </div>
              <span className="text-sm text-slate-400">- 2,000 DA</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}