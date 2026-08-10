import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-md' }) {
  
  // 🌟 ميزة ذكية: إغلاق النافذة عند الضغط على زر Esc في الكيبورد
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      // 🌟 خلفية معتمة وزجاجية
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      
      // 🔴 الحل السحري: نتحقق أن الضغطة بدأت فعلاً على الخلفية وليس سحباً من الداخل
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* 🌟 حاوية النافذة الرئيسية (تم إزالة onClick القديم من هنا لأنه لم يعد ضرورياً) */}
      <div 
        className={`bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl w-full ${maxWidth} flex flex-col overflow-hidden max-h-[90vh] animate-in zoom-in-95 slide-in-from-bottom-4 duration-300`}
      >
        
        {/* 🌟 شريط العنوان (الهيدر) */}
        <div className="flex justify-between items-center p-4 sm:px-6 border-b border-slate-800/80 bg-slate-900/50">
          <h2 className="text-lg font-bold text-white tracking-wide">{title}</h2>
          
          <button 
            onClick={onClose} 
            className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/50"
            title="إغلاق (Esc)"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>
        
        {/* 🌟 محتوى النافذة (مع قابلية التمرير للأسفل إذا كان المحتوى طويلاً) */}
        <div className="overflow-y-auto">
          {children}
        </div>
        
      </div>
    </div>
  );
}