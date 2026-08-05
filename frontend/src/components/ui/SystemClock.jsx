import React, { useState, useEffect } from 'react';
import { Clock, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function SystemClock() {
  const { i18n } = useTranslation();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // تحديث الساعة كل ثانية
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      className="fixed bottom-4 left-6 bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-lg flex items-center gap-4 text-slate-300 z-[9999]" 
      dir={i18n.dir()}
    >
      <div className="flex items-center gap-2">
         <Calendar size={18} className="text-blue-400" />
         <span className="text-sm font-medium">
           {time.toLocaleDateString(i18n.language, { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}
         </span>
      </div>
      <div className="w-px h-6 bg-slate-700"></div>
      <div className="flex items-center gap-2" dir="ltr">
         <Clock size={18} className="text-emerald-400" />
         <span className="text-sm font-bold tracking-widest">
           {time.toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
         </span>
      </div>
    </div>
  );
}