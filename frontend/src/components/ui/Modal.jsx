import React from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity">
      {/* حاوية النافذة */}
      <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* رأس النافذة (Header) */}
        <div className="flex justify-between items-center p-4 border-b border-slate-800 bg-slate-950/50">
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-red-400 bg-slate-800 hover:bg-slate-800/50 p-1.5 rounded-md transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* محتوى النافذة (Body) */}
        <div className="p-5 overflow-y-auto">
          {children}
        </div>
        
      </div>
    </div>
  );
}