import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ExpensesPieChart() {
  const { t } = useTranslation();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (window.api && window.api.getExpenses) {
          const expenses = await window.api.getExpenses();
          
          // تجميع المصاريف حسب التصنيف
          const grouped = expenses.reduce((acc, exp) => {
            acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
            return acc;
          }, {});

          // تحويل البيانات لشكل يقبله Recharts مع دمج الترجمة الذكية
          const formattedData = Object.keys(grouped).map(key => {
            const translated = t(`expenses.categories.${key}`);
            // تخطي مفتاح الترجمة إذا لم يكن موجوداً (مثل كلمة "رواتب" القديمة)
            const finalName = translated.includes('expenses.categories') ? key : translated;
            
            return {
              name: finalName, 
              value: grouped[key],
              category: key
            };
          });

          setChartData(formattedData);
        }
      } catch (error) {
        console.error("Failed to load expenses for pie chart:", error);
      }
    };
    
    loadData();
  }, [t]); // إضافة t لتحديث المخطط فور تغيير اللغة

  // الألوان المخصصة حسب التصنيف (بما في ذلك التصنيفات الجديدة)
  const getCategoryColor = (category) => {
    switch (category) {
      case 'advance': return '#a855f7'; // Purple
      case 'supplier_payment': return '#f97316'; // Orange
      case 'utilities': return '#3b82f6'; // Blue
      case 'maintenance': return '#f59e0b'; // Amber
      case 'supplies': return '#10b981'; // Emerald
      case 'salaries':
      case 'رواتب': return '#ef4444'; // Red
      default: return '#64748b'; // Slate
    }
  };

  // إعدادات الـ Tooltip المظلمة
  const customTooltipStyle = {
    backgroundColor: '#0f172a',
    borderColor: '#1e293b',
    color: '#f8fafc',
    borderRadius: '0.5rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
  };

  if (chartData.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center text-slate-500 text-sm">
        {t('common.noResults')}
      </div>
    );
  }

  return (
    <div className="h-full w-full" dir="ltr"> {/* فرض الاتجاه ltr ليحافظ المخطط على تنسيقه */}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getCategoryColor(entry.category)} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => [`${value.toLocaleString()} DA`, '']}
            contentStyle={customTooltipStyle}
            itemStyle={{ color: '#f8fafc', fontWeight: 'bold' }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle"
            wrapperStyle={{ color: '#cbd5e1', fontSize: '12px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}