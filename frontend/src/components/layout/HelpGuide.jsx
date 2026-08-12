import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HelpCircle, X, Info, ChevronRight, ChevronLeft } from 'lucide-react';
import useAuthStore from '../../store/authStore';

export default function HelpGuide() {
  const [isOpen, setIsOpen] = useState(false);
  
  // 🌟 حالة الزر (مُصغر أو مُكبر)، ونجعله يقرأ من الذاكرة ليتذكر اختيار المستخدم
  const [isMinimized, setIsMinimized] = useState(() => {
    return localStorage.getItem('guideMinimized') === 'true';
  });

  const { t, i18n } = useTranslation();
  const location = useLocation();
  const user = useAuthStore(state => state.user);

  const currentPath = location.pathname;
  const pageGuideTitle = t(`guide.pages.${currentPath}.title`, { defaultValue: '' });
  const pageGuideContent = t(`guide.pages.${currentPath}.content`, { defaultValue: '' });

  if (!pageGuideTitle || pageGuideTitle === `guide.pages.${currentPath}.title`) {
    return null; 
  }

  // دالة لتغيير حالة الزر وحفظها في الذاكرة
  const toggleMinimize = (e) => {
    e.stopPropagation(); // لمنع فتح النافذة عند الضغط على سهم التصغير
    const newVal = !isMinimized;
    setIsMinimized(newVal);
    localStorage.setItem('guideMinimized', newVal);
  };

  // تحديد أيقونة السهم بناءً على لغة الواجهة (عربي يمين/يسار)
  const isRTL = i18n.dir() === 'rtl';
  const CollapseIcon = isRTL ? ChevronLeft : ChevronRight;
  const ExpandIcon = isRTL ? ChevronRight : ChevronLeft;

  return (
    <>
      {/* 🌟 الحاوية العائمة للزر مع تأثيرات حركية (Transitions) */}
      <div 
        className={`fixed bottom-6 end-6 z-40 flex items-center bg-blue-600 rounded-full shadow-2xl shadow-blue-900/50 transition-all duration-300 print:hidden ${isMinimized ? 'w-auto' : 'w-auto'}`}
      >
        
        {isMinimized ? (
          /* ========================================= */
          /* 1. الوضع المُصغر (أيقونة فقط - لا تأخذ مساحة) */
          /* ========================================= */
          <div className="flex items-center">
            {/* زر فتح الدليل */}
            <button
              onClick={() => setIsOpen(true)}
              className="p-3 text-white hover:bg-blue-500 rounded-full transition-colors flex items-center justify-center"
              title={t('guide.title', 'دليل الاستخدام')}
            >
              <HelpCircle size={24} />
            </button>
            
            {/* زر التكبير */}
            <button
              onClick={toggleMinimize}
              className={`p-2 text-blue-200 hover:text-white hover:bg-blue-700 transition-colors ${isRTL ? 'rounded-l-full pr-1' : 'rounded-r-full pl-1'}`}
              title="تكبير الزر"
            >
              <ExpandIcon size={16} />
            </button>
          </div>
        ) : (
          /* ========================================= */
          /* 2. الوضع المُكبر (أيقونة + نص + زر تصغير) */
          /* ========================================= */
          <div className="flex items-center">
            {/* زر فتح الدليل (النص والأيقونة) */}
            <button
              onClick={() => setIsOpen(true)}
              className={`flex items-center gap-2 py-3 px-4 text-white hover:bg-blue-500 transition-colors ${isRTL ? 'rounded-r-full' : 'rounded-l-full'}`}
            >
              <HelpCircle size={24} />
              <span className="font-bold text-sm whitespace-nowrap">
                {t('guide.title', 'دليل الاستخدام السريع')}
              </span>
            </button>

            {/* خط فاصل أنيق */}
            <div className="w-px h-6 bg-blue-400/50"></div>

            {/* زر التصغير */}
            <button
              onClick={toggleMinimize}
              className={`p-3 text-blue-200 hover:text-white hover:bg-blue-700 transition-colors flex items-center justify-center ${isRTL ? 'rounded-l-full' : 'rounded-r-full'}`}
              title="تصغير الزر لإخلاء الشاشة"
            >
              <CollapseIcon size={20} />
            </button>
          </div>
        )}
      </div>

      {/* النافذة المنبثقة (Modal) للشرح الذكي تبقى كما هي تماماً */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 text-start" dir={i18n.dir()}>
          <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            
            <div className="flex justify-between items-center bg-slate-800 p-4 border-b border-slate-700">
              <div className="flex items-center gap-2 text-blue-400">
                <Info size={20} />
                <h3 className="font-bold text-lg">{pageGuideTitle}</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <p className="text-sm text-blue-300 mb-4 font-medium">
                {user?.role === 'superadmin' 
                  ? t('guide.roles.superadmin', 'مرحباً بك أيها المدير. إليك شرح مفصل لعمل هذه الصفحة:') 
                  : t('guide.roles.cashier', 'مرحباً بك. إليك مهامك وصلاحياتك في هذه الصفحة:')}
              </p>
              
              <div className="text-slate-300 text-sm leading-loose whitespace-pre-line bg-slate-950 p-5 rounded-xl border border-slate-800 shadow-inner">
                {pageGuideContent}
              </div>
            </div>

            <div className="p-4 border-t border-slate-800 flex justify-end">
              <button 
                onClick={() => setIsOpen(false)}
                className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                {t('common.understood', 'فهمت ذلك')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}