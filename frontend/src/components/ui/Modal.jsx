import React from 'react';
import { X } from 'lucide-react';

// 🔴 تمت إضافة maxWidth للتحكم في العرض، والافتراضي هو max-w-md (صغير)
export default function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-md' }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      {/* 🔴 هنا يتم تطبيق العرض المخصص */}
      <div className={`bg-slate-900 border border-slate-800 rounded-xl shadow-2xl w-full ${maxWidth} flex flex-col overflow-hidden max-h-[90vh]`}>
        
        <div className="flex justify-between items-center p-4 border-b border-slate-800 bg-slate-950/50">
          <h2 className="text-lg font-bold text-white">{title}</h2>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}