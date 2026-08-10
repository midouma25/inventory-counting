import React, { useState, useEffect } from 'react';
import { Clock, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function SystemClock() {
  const { i18n } = useTranslation();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      // تم تغيير التصميم ليناسب الشريط العلوي (Topbar)
      className="hidden md:flex items-center gap-3 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-slate-300 shadow-sm" 
      dir={i18n.dir()}
    >
      <div className="flex items-center gap-1.5">
         <Calendar size={14} className="text-blue-400" />
         <span className="text-xs font-medium whitespace-nowrap">
           {time.toLocaleDateString(i18n.language, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
         </span>
      </div>
      <div className="w-px h-4 bg-slate-700"></div>
      <div className="flex items-center gap-1.5" dir="ltr">
         <Clock size={14} className="text-emerald-400" />
         <span className="text-xs font-bold tracking-widest whitespace-nowrap">
           {time.toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
         </span>
      </div>
    </div>
  );
}