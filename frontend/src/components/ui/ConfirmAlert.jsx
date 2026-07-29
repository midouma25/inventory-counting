import React from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ConfirmAlert = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText, 
  cancelText,
  confirmColor = "bg-[#e11d48] hover:bg-[#be123c]" // أحمر كافتراضي (كما في الصورة)
}) => {
  const { t, i18n } = useTranslation();

  if (!isOpen) return null;

  return (
    // الخلفية الضبابية والطبقة العلوية
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm" 
      dir={i18n.dir()}
    >
      {/* جسم النافذة بألوان مطابقة للصورة */}
      <div className="bg-[#111827] border border-slate-700/50 rounded-xl shadow-2xl w-full max-w-[450px] overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* شريط العنوان (Header) */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-slate-700/50">
          <h2 className="text-white text-xl font-bold tracking-wide">
            {title || t('common.alert', 'تنبيه')}
          </h2>
          <button 
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg p-1.5 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* محتوى الرسالة (Body) */}
        <div className="p-6 mt-2">
          <p className="text-white text-lg text-center leading-relaxed">
            {message}
          </p>
        </div>

        {/* الأزرار (Footer) */}
        {/* justify-end يجعل الأزرار على اليسار في العربية وعلى اليمين في الإنجليزية */}
        <div className="flex justify-end items-center gap-3 px-6 pb-6 mt-2">
          <button 
            onClick={onClose} 
            className="px-6 py-2.5 bg-[#334155] hover:bg-[#475569] text-white rounded-lg font-medium transition-colors"
          >
            {cancelText || t('common.cancel', 'إلغاء')}
          </button>
          
          <button 
            onClick={onConfirm} 
            className={`px-6 py-2.5 text-white rounded-lg font-medium transition-colors ${confirmColor}`}
          >
            {confirmText || t('common.confirm', 'تأكيد')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAlert;