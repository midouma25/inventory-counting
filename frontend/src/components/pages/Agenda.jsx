import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Calendar as CalendarIcon, CheckCircle2, Clock, Truck, Banknote, Wrench } from 'lucide-react';

// بيانات وهمية للمهام (بافتراض اليوم 2026-07-20)
const initialTasks = [
  { id: 1, title: 'Soummam Dairy Delivery', type: 'delivery', date: '2026-07-20', time: '10:00 AM', status: 'completed' },
  { id: 2, title: 'Pay ULTRA JOY Inc. Invoice', type: 'payment', date: '2026-07-20', time: '14:00 PM', status: 'pending' },
  { id: 3, title: 'Restock Beverage Coolers', type: 'maintenance', date: '2026-07-20', time: '20:00 PM', status: 'pending' },
  { id: 4, title: 'Cevital Oil Delivery', type: 'delivery', date: '2026-07-21', time: '09:00 AM', status: 'pending' },
  { id: 5, title: 'Store Deep Cleaning', type: 'maintenance', date: '2026-07-22', time: '22:00 PM', status: 'pending' },
];

export default function Agenda() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all'); // all, pending, completed
  const [tasks, setTasks] = useState(initialTasks);

  // تصفية المهام حسب الحالة
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  // فصل المهام إلى "اليوم" و "قادمة"
  const todayTasks = filteredTasks.filter(task => task.date === '2026-07-20');
  const upcomingTasks = filteredTasks.filter(task => task.date !== '2026-07-20');

  // دالة لتغيير حالة المهمة (Check/Uncheck)
  const toggleTaskStatus = (id) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' } 
        : task
    ));
  };

  // أيقونات وألوان حسب نوع المهمة
  const getTypeConfig = (type) => {
    switch (type) {
      case 'delivery': return { icon: <Truck size={18} />, color: 'text-blue-400 bg-blue-950 border-blue-900' };
      case 'payment': return { icon: <Banknote size={18} />, color: 'text-red-400 bg-red-950 border-red-900' };
      case 'maintenance': return { icon: <Wrench size={18} />, color: 'text-amber-400 bg-amber-950 border-amber-900' };
      default: return { icon: <Clock size={18} />, color: 'text-slate-400 bg-slate-800 border-slate-700' };
    }
  };

  // مكون فرعي لعرض بطاقة المهمة
  const TaskCard = ({ task }) => {
    const typeConfig = getTypeConfig(task.type);
    const isCompleted = task.status === 'completed';

    return (
      <div className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
        isCompleted 
          ? 'bg-slate-900/50 border-slate-800/50 opacity-60' 
          : 'bg-slate-900 border-slate-800 hover:border-slate-700'
      }`}>
        <div className="flex items-center gap-4">
          {/* زر الإنجاز */}
          <button 
            onClick={() => toggleTaskStatus(task.id)}
            className={`transition-colors ${isCompleted ? 'text-emerald-500' : 'text-slate-600 hover:text-emerald-400'}`}
          >
            <CheckCircle2 size={24} />
          </button>
          
          {/* تفاصيل المهمة */}
          <div>
            <h4 className={`font-medium ${isCompleted ? 'text-slate-500 line-through' : 'text-white'}`}>
              {task.title}
            </h4>
            <div className="flex items-center gap-3 mt-2 text-xs">
              <span className="flex items-center gap-1 text-slate-400">
                <Clock size={14} /> {task.time} {task.date !== '2026-07-20' && `| ${task.date}`}
              </span>
              <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full border ${typeConfig.color}`}>
                {typeConfig.icon}
                {t(`agenda.types.${task.type}`)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">{t('agenda.title')}</h1>
          <p className="text-sm text-slate-500 mt-1">{t('agenda.subtitle')}</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
          <Plus size={18} />
          <span>{t('agenda.addTask')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* القسم الأيسر: التقويم المصغر والفلاتر */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4 text-white font-medium border-b border-slate-800 pb-3">
              <CalendarIcon size={18} className="text-blue-400" />
              July 2026
            </div>
            {/* تقويم مصغر شكلي */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs text-slate-500 mb-2">
              <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              {[...Array(31)].map((_, i) => (
                <div key={i} className={`p-1.5 rounded-md cursor-pointer hover:bg-slate-800 ${
                  i + 1 === 20 ? 'bg-blue-600 text-white font-bold' : 'text-slate-400'
                }`}>
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* أزرار التصفية */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col gap-2">
            {['all', 'pending', 'completed'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                  filter === f ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:bg-slate-800/50'
                }`}
              >
                {t(`agenda.filters.${f}`)}
              </button>
            ))}
          </div>
        </div>

        {/* القسم الأيمن: قائمة المهام */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* مهام اليوم */}
          {todayTasks.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                {t('agenda.sections.today')}
              </h3>
              <div className="space-y-3">
                {todayTasks.map(task => <TaskCard key={task.id} task={task} />)}
              </div>
            </div>
          )}

          {/* المهام القادمة */}
          {upcomingTasks.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-slate-400 mb-4 border-b border-slate-800 pb-2">
                {t('agenda.sections.upcoming')}
              </h3>
              <div className="space-y-3">
                {upcomingTasks.map(task => <TaskCard key={task.id} task={task} />)}
              </div>
            </div>
          )}

          {filteredTasks.length === 0 && (
            <div className="text-center p-12 border-2 border-dashed border-slate-800 rounded-xl text-slate-500">
              No tasks found for this filter.
            </div>
          )}

        </div>
      </div>
    </div>
  );
}