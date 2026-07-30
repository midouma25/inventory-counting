import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Calendar as CalendarIcon, CheckCircle2, Clock, Truck, Banknote, Wrench, Trash2, CalendarClock, AlertCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import Modal from '../ui/Modal';
import ConfirmAlert from '../ui/ConfirmAlert'; // 🔴 استيراد نافذة التنبيه المخصصة

export default function Agenda() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const [filter, setFilter] = useState('all'); 
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [taskToDelete, setTaskToDelete] = useState(null);

  // 🔴 نظام الإشعارات الذكي (Toast)
  const [toast, setToast] = useState(null);
  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const [currentDate, setCurrentDate] = useState(new Date());
  
  const todayString = new Date().toISOString().split('T')[0];
  const currentMonthName = currentDate.toLocaleString(i18n.language, { month: 'long', year: 'numeric' });
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const prevMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
  
  const isCurrentMonth = new Date().getMonth() === currentDate.getMonth() && new Date().getFullYear() === currentDate.getFullYear();
  const currentDay = new Date().getDate();

  const prevMonth = () => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (window.api && window.api.getAgendaTasks) {
          const data = await window.api.getAgendaTasks();
          const normalizedData = data.map(task => ({
            ...task,
            date: task.task_date || task.date,
            time: task.task_time || task.time
          }));
          setTasks(normalizedData);
        }
      } catch (error) { console.error("Failed to fetch agenda tasks:", error); }
    };
    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    const timeValue = e.target[3].value;
    let formattedTime = '';
    if (timeValue) {
      const timeParts = timeValue.split(':');
      let hours = parseInt(timeParts[0]);
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12; 
      formattedTime = `${hours.toString().padStart(2, '0')}:${timeParts[1]} ${ampm}`;
    }

    const newTask = {
      title: e.target[0].value, type: e.target[1].value, date: e.target[2].value, time: formattedTime,
      task_date: e.target[2].value, task_time: formattedTime, status: 'pending', amount: Number(e.target[4]?.value || 0)
    };

    try {
      if (window.api && window.api.addAgendaTask) {
        const addedTask = await window.api.addAgendaTask(newTask);
        const normalizedTask = { ...addedTask, date: addedTask.task_date || newTask.date, time: addedTask.task_time || newTask.time };
        setTasks(prev => [...prev, normalizedTask].sort((a, b) => new Date(`${a.date} ${a.time || '00:00'}`) - new Date(`${b.date} ${b.time || '00:00'}`)));
        setIsModalOpen(false);
        showToast('success', t('common.success')); // 🔴 إشعار بدلاً من التنبيه الأصلي
      }
    } catch (error) { 
      console.error("Error adding task:", error); 
      showToast('error', t('common.error'));
    }
  };

  const toggleTaskStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    try {
      if (window.api && window.api.toggleAgendaTaskStatus) {
        await window.api.toggleAgendaTaskStatus(id, newStatus);
        setTasks(tasks.map(task => task.id === id ? { ...task, status: newStatus } : task));
      }
    } catch (error) { console.error("Error toggling task status:", error); }
  };

  const confirmDeleteTask = async () => {
    if (!taskToDelete) return;
    try {
      if (window.api && window.api.deleteAgendaTask) {
        await window.api.deleteAgendaTask(taskToDelete.id);
        setTasks(tasks.filter(task => task.id !== taskToDelete.id));
        showToast('success', t('common.success'));
      }
    } catch (error) { console.error(error); showToast('error', t('common.error')); }
    setTaskToDelete(null);
  };

  const handleReschedule = async (id, newDate) => {
    if (!newDate) return;
    try {
      if (window.api && window.api.rescheduleAgendaTask) {
        await window.api.rescheduleAgendaTask(id, newDate);
        setTasks(tasks.map(task => task.id === id ? { ...task, date: newDate, task_date: newDate } : task));
        showToast('success', t('common.success'));
      }
    } catch (error) { console.error("Error rescheduling task:", error); }
  };

  const filteredTasks = tasks.filter(task => filter === 'all' ? true : task.status === filter);
  const overdueTasks = filteredTasks.filter(task => task.date && task.date < todayString && task.status === 'pending');
  const todayTasks = filteredTasks.filter(task => task.date === todayString);
  const upcomingTasks = filteredTasks.filter(task => task.date && task.date > todayString);

  const getTypeConfig = (type) => {
    switch (type) {
      case 'delivery': return { icon: <Truck size={16} />, color: 'text-blue-400 bg-blue-950 border-blue-900' };
      case 'payment': return { icon: <Banknote size={16} />, color: 'text-red-400 bg-red-950 border-red-900' };
      case 'maintenance': return { icon: <Wrench size={16} />, color: 'text-amber-400 bg-amber-950 border-amber-900' };
      default: return { icon: <Clock size={16} />, color: 'text-slate-400 bg-slate-800 border-slate-700' };
    }
  };

  const TaskCard = ({ task, isOverdue }) => {
    const typeConfig = getTypeConfig(task.type);
    const isCompleted = task.status === 'completed';
    const displayTime = task.time && task.time !== 'undefined' ? task.time : t('agenda.allDay', 'طوال اليوم');
    const cardStyle = isCompleted ? 'bg-slate-900/50 border-slate-800/50 opacity-60' : isOverdue ? 'bg-red-950/20 border-red-900/50 hover:border-red-800' : 'bg-slate-900 border-slate-800 hover:border-slate-700';

    return (
      <div className={`p-4 rounded-xl border flex items-center justify-between transition-all ${cardStyle}`}>
        <div className="flex items-center gap-4">
          <button onClick={() => toggleTaskStatus(task.id, task.status)} className={`transition-colors ${isCompleted ? 'text-emerald-500' : isOverdue ? 'text-red-400 hover:text-red-300' : 'text-slate-600 hover:text-emerald-400'}`}>
            {isOverdue && !isCompleted ? <AlertCircle size={24} /> : <CheckCircle2 size={24} />}
          </button>
          
          <div>
            <h4 className={`font-medium ${isCompleted ? 'text-slate-500 line-through' : isOverdue ? 'text-red-200' : 'text-white'}`}>{task.title}</h4>
            <div className="flex items-center gap-3 mt-2 text-xs">
              <span className={`flex items-center gap-1 ${isOverdue ? 'text-red-400' : 'text-slate-400'}`}><Clock size={14} /> {displayTime} {task.date !== todayString && `| ${task.date}`}</span>
              <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full border ${typeConfig.color}`}>{typeConfig.icon}{t(`agenda.types.${task.type}`, task.type)}</span>
              {task.amount > 0 && <span className="font-bold text-slate-300 bg-slate-800 px-2 py-0.5 rounded-full">{task.amount.toLocaleString()} {t('currency')}</span>}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isCompleted && (
            <div className="relative" title={t('agenda.rescheduleTask', 'تأجيل المهمة')}>
              <input type="date" className="opacity-0 absolute inset-0 w-full h-full cursor-pointer" onChange={(e) => handleReschedule(task.id, e.target.value)} />
              <button className="p-2 text-slate-500 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-colors"><CalendarClock size={18} /></button>
            </div>
          )}
          <button onClick={() => setTaskToDelete(task)} className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors" title={t('suppliers.actions.delete')}><Trash2 size={18} /></button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans text-start relative">
      
      {/* 🔴 مكون الـ Toast */}
      {toast && (
        <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[9999] px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 ${
          toast.type === 'success' ? 'bg-emerald-600 text-white' :
          toast.type === 'warning' ? 'bg-amber-600 text-white' :
          'bg-red-600 text-white'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span className="font-bold">{toast.message}</span>
        </div>
      )}

      <div className="flex justify-between items-center mb-8 text-start">
        <div>
          <h1 className="text-3xl font-bold text-white">{t('agenda.title')}</h1>
          <p className="text-sm text-slate-500 mt-1">{t('agenda.subtitle')}</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
          <Plus size={18} /><span>{t('agenda.addTask')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-4 text-white font-medium border-b border-slate-800 pb-3 capitalize">
              <button onClick={prevMonth} className="p-1 hover:bg-slate-800 rounded transition-colors">{isRTL ? <ChevronRight size={18}/> : <ChevronLeft size={18}/>}</button>
              <div className="flex items-center gap-2"><CalendarIcon size={18} className="text-blue-400" /> {currentMonthName}</div>
              <button onClick={nextMonth} className="p-1 hover:bg-slate-800 rounded transition-colors">{isRTL ? <ChevronLeft size={18}/> : <ChevronRight size={18}/>}</button>
            </div>
            
            <div dir="ltr">
              <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-500 mb-2">
                 {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => <div key={day}>{day}</div>)}
              </div>
              
              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {[...Array(firstDayOfMonth)].map((_, i) => (
                   <div key={`empty-prev-${i}`} className="p-1.5 text-slate-700">{prevMonthDays - firstDayOfMonth + i + 1}</div>
                ))}
                {[...Array(daysInMonth)].map((_, i) => (
                  <div key={i} className={`p-1.5 rounded-md cursor-pointer transition-colors ${isCurrentMonth && (i + 1 === currentDay) ? 'bg-blue-600 text-white font-bold' : 'text-slate-300 hover:bg-slate-800'}`}>
                    {i + 1}
                  </div>
                ))}
                {[...Array(42 - (firstDayOfMonth + daysInMonth))].map((_, i) => (
                   <div key={`empty-next-${i}`} className="p-1.5 text-slate-700">{i + 1}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col gap-2 shadow-lg text-start">
            {['all', 'pending', 'completed'].map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`text-start px-4 py-2 rounded-lg text-sm transition-colors ${filter === f ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:bg-slate-800/50'}`}>
                {t(`agenda.filters.${f}`)}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 space-y-8">
          {overdueTasks.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-red-400 mb-4 flex items-center gap-2 border-b border-red-900/50 pb-2"><AlertCircle size={18} /> {t('agenda.sections.overdue', 'مهام متأخرة')}</h3>
              <div className="space-y-3">{overdueTasks.map(task => <TaskCard key={task.id} task={task} isOverdue={true} />)}</div>
            </div>
          )}
          {todayTasks.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>{t('agenda.sections.today')}</h3>
              <div className="space-y-3">{todayTasks.map(task => <TaskCard key={task.id} task={task} isOverdue={false} />)}</div>
            </div>
          )}
          {upcomingTasks.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-slate-400 mb-4 border-b border-slate-800 pb-2 mt-8">{t('agenda.sections.upcoming')}</h3>
              <div className="space-y-3">{upcomingTasks.map(task => <TaskCard key={task.id} task={task} isOverdue={false} />)}</div>
            </div>
          )}
          {filteredTasks.length === 0 && <div className="text-center p-12 border-2 border-dashed border-slate-800 rounded-xl text-slate-500">{t('common.noResults')}</div>}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t('agenda.addTask')}>
        <form className="space-y-4 text-start" onSubmit={handleAddTask} dir={isRTL ? "rtl" : "ltr"}>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">{t('agenda.modal.taskTitleLabel')}</label>
            <input type="text" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-start" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">{t('agenda.modal.taskTypeLabel')}</label>
            <select className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-start">
              <option value="delivery">{t('agenda.types.delivery')}</option>
              <option value="payment">{t('agenda.types.payment')}</option>
              <option value="maintenance">{t('agenda.types.maintenance')}</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t('agenda.modal.dateLabel')}</label>
              <input type="date" defaultValue={todayString} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-start" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t('agenda.modal.timeLabel')} ({t('common.optional')})</label>
              <input type="time" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-start" />
            </div>
          </div>
          <div>
             <label className="block text-sm font-medium text-slate-400 mb-1">{t('suppliers.details.amount', 'المبلغ')} ({t('common.optional')})</label>
             <input type="number" min="0" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-start" />
          </div>
          <div className="pt-4 flex justify-end gap-3 mt-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg font-medium text-slate-300 hover:bg-slate-800 transition-colors">{t('agenda.modal.cancelBtn', 'إلغاء')}</button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">{t('agenda.modal.saveBtn', 'حفظ المهمة')}</button>
          </div>
        </form>
      </Modal>

      {/* 🔴 استخدام النافذة السوداء المخصصة بدلاً من النافذة العادية */}
      <ConfirmAlert 
        isOpen={!!taskToDelete}
        onClose={() => setTaskToDelete(null)}
        onConfirm={confirmDeleteTask}
        title={t('suppliers.actions.delete', 'حذف')}
        message={t('agenda.deleteConfirm', 'هل أنت متأكد من حذف هذه المهمة من الأجندة؟')}
        cancelText={t('common.cancel', 'إلغاء')}
        confirmText={t('suppliers.actions.confirmDeleteBtn', 'تأكيد الحذف')}
      />

    </div>
  );
}