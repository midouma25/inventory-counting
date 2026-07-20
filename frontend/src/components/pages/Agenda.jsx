import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Calendar as CalendarIcon, CheckCircle2, Clock, Truck, Banknote, Wrench } from 'lucide-react';
import Modal from '../ui/Modal';

export default function Agenda() {
  const { t, i18n } = useTranslation();
  const [filter, setFilter] = useState('all'); 
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const d = new Date();
  const todayString = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  
  const currentMonthName = d.toLocaleString(i18n.language, { month: 'long', year: 'numeric' });
  const daysInMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  const currentDay = d.getDate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (window.api && window.api.getAgendaTasks) {
          const data = await window.api.getAgendaTasks();
          setTasks(data);
        }
      } catch (error) {
        console.error("Failed to fetch agenda tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    
    const timeValue = e.target[3].value;
    const timeParts = timeValue.split(':');
    let hours = parseInt(timeParts[0]);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; 
    const formattedTime = `${hours.toString().padStart(2, '0')}:${timeParts[1]} ${ampm}`;

    const newTask = {
      title: e.target[0].value,
      type: e.target[1].value,
      date: e.target[2].value,
      time: formattedTime,
      status: 'pending'
    };

    try {
      if (window.api && window.api.addAgendaTask) {
        const addedTask = await window.api.addAgendaTask(newTask);
        setTasks(prev => {
          const updated = [...prev, addedTask];
          return updated.sort((a, b) => new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`));
        });
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const toggleTaskStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    try {
      if (window.api && window.api.toggleAgendaTaskStatus) {
        await window.api.toggleAgendaTaskStatus(id, newStatus);
        setTasks(tasks.map(task => 
          task.id === id ? { ...task, status: newStatus } : task
        ));
      }
    } catch (error) {
      console.error("Error toggling task status:", error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const todayTasks = filteredTasks.filter(task => task.date === todayString);
  const upcomingTasks = filteredTasks.filter(task => task.date !== todayString);

  const getTypeConfig = (type) => {
    switch (type) {
      case 'delivery': return { icon: <Truck size={18} />, color: 'text-blue-400 bg-blue-950 border-blue-900' };
      case 'payment': return { icon: <Banknote size={18} />, color: 'text-red-400 bg-red-950 border-red-900' };
      case 'maintenance': return { icon: <Wrench size={18} />, color: 'text-amber-400 bg-amber-950 border-amber-900' };
      default: return { icon: <Clock size={18} />, color: 'text-slate-400 bg-slate-800 border-slate-700' };
    }
  };

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
          <button 
            onClick={() => toggleTaskStatus(task.id, task.status)}
            className={`transition-colors ${isCompleted ? 'text-emerald-500' : 'text-slate-600 hover:text-emerald-400'}`}
          >
            <CheckCircle2 size={24} />
          </button>
          
          <div>
            <h4 className={`font-medium ${isCompleted ? 'text-slate-500 line-through' : 'text-white'}`}>
              {task.title}
            </h4>
            <div className="flex items-center gap-3 mt-2 text-xs">
              <span className="flex items-center gap-1 text-slate-400">
                <Clock size={14} /> {task.time} {task.date !== todayString && `| ${task.date}`}
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
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">{t('agenda.title')}</h1>
          <p className="text-sm text-slate-500 mt-1">{t('agenda.subtitle')}</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          <span>{t('agenda.addTask')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-4 text-white font-medium border-b border-slate-800 pb-3 capitalize">
              <CalendarIcon size={18} className="text-blue-400" />
              {currentMonthName}
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              {[...Array(daysInMonth)].map((_, i) => (
                <div key={i} className={`p-1.5 rounded-md cursor-pointer hover:bg-slate-800 ${
                  i + 1 === currentDay ? 'bg-blue-600 text-white font-bold' : 'text-slate-400'
                }`}>
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col gap-2 shadow-lg">
            {['all', 'pending', 'completed'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-start px-4 py-2 rounded-lg text-sm transition-colors ${
                  filter === f ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:bg-slate-800/50'
                }`}
              >
                {t(`agenda.filters.${f}`)}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 space-y-8">
          
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
              {t('common.noResults')}
            </div>
          )}
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={t('agenda.addTask')}
      >
        <form className="space-y-4" onSubmit={handleAddTask} dir="auto">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">{t('agenda.modal.taskTitleLabel')}</label>
            <input 
              type="text" 
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">{t('agenda.modal.taskTypeLabel')}</label>
            <select className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors">
              <option value="delivery">{t('agenda.types.delivery')}</option>
              <option value="payment">{t('agenda.types.payment')}</option>
              <option value="maintenance">{t('agenda.types.maintenance')}</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t('agenda.modal.dateLabel')}</label>
              <input 
                type="date" 
                defaultValue={todayString}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors" 
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t('agenda.modal.timeLabel')}</label>
              <input 
                type="time" 
                defaultValue="10:00"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors" 
                required 
              />
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={() => setIsModalOpen(false)} 
              className="px-4 py-2 rounded-lg font-medium text-slate-300 hover:bg-slate-800 transition-colors"
            >
              {t('agenda.modal.cancelBtn')}
            </button>
            <button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              {t('agenda.modal.saveBtn')}
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
}