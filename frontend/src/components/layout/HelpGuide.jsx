import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HelpCircle, Store, Users, FileText, Wallet, MonitorPlay, ChevronDown, ChevronUp, ShoppingCart, ScanLine, Clock, Calculator } from 'lucide-react';
import Modal from '../ui/Modal';
import useAuthStore from '../../store/authStore'; 

export default function HelpGuide() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const user = useAuthStore(state => state.user);
  const isCashier = user?.role === 'cashier' || user?.role === 'scale' || user?.role === 'stock';

  const adminSections = [
    { id: 'pos', icon: <MonitorPlay size={20} />, title: t('guide.pos.title', 'الصندوق والمبيعات') },
    { id: 'hr', icon: <Users size={20} />, title: t('guide.hr.title', 'الموارد البشرية والعمال') },
    { id: 'payroll', icon: <Calculator size={20} />, title: t('guide.payroll.title', 'رواتب العمال') },
    { id: 'suppliers', icon: <FileText size={20} />, title: t('guide.suppliers.title', 'الموردين والديون') },
    { id: 'expenses', icon: <Wallet size={20} />, title: t('guide.expenses.title', 'المصاريف والسلف') },
    { id: 'map', icon: <Store size={20} />, title: t('guide.map.title', 'المخطط والفواتير PDF') },
  ];

  const cashierSections = [
    { id: 'cashier_shift', icon: <Clock size={20} />, title: t('guide.cashier_shift.title', 'الوردية وافتتاح الصندوق') },
    { id: 'cashier_pos', icon: <ShoppingCart size={20} />, title: t('guide.cashier_pos.title', 'نقطة البيع (الكاشير)') },
    { id: 'cashier_expenses', icon: <Wallet size={20} />, title: t('guide.cashier_expenses.title', 'سحب المصاريف') },
    { id: 'cashier_attendance', icon: <ScanLine size={20} />, title: t('guide.cashier_attendance.title', 'تسجيل الحضور والانصراف') },
  ];

  const sections = isCashier ? cashierSections : adminSections;

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 end-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 md:px-4 md:py-3 rounded-full shadow-2xl shadow-blue-900/50 flex items-center gap-2 transition-all hover:scale-105 print:hidden"
        title={t('guide.buttonTitle', 'دليل الاستخدام')}
      >
        <HelpCircle size={24} />
        <span className="hidden md:inline font-bold text-sm">{t('guide.buttonTitle', 'دليل الاستخدام')}</span>
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={t('guide.modalTitle', 'دليل الاستخدام الشامل')}>
        <div className="p-4 text-start h-[70vh] overflow-y-auto" dir={i18n.dir()}>
          <p className="text-slate-400 mb-6 text-sm">
            {t('guide.modalDesc', 'اختر القسم الذي تريد معرفة تفاصيله بدقة من القائمة أدناه:')}
          </p>

          <div className="space-y-3">
            {sections.map((sec) => (
              <div key={sec.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden transition-all">
                <button 
                  onClick={() => setActiveSection(activeSection === sec.id ? '' : sec.id)}
                  className={`w-full flex items-center justify-between p-4 transition-colors ${activeSection === sec.id ? 'bg-blue-900/20 text-blue-400' : 'text-slate-300 hover:bg-slate-800'}`}
                >
                  <div className="flex items-center gap-3 font-bold text-sm md:text-base">
                    {sec.icon} {sec.title}
                  </div>
                  {activeSection === sec.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {activeSection === sec.id && (
                  <div className="p-5 border-t border-slate-800 bg-slate-950/80 text-slate-300 text-sm leading-loose whitespace-pre-line">
                    {t(`guide.${sec.id}.content`)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
}