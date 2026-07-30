import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Archive, Calendar, User, DollarSign, RotateCcw } from 'lucide-react';

export default function DailyClosuresArchive() {
  const { t, i18n } = useTranslation();
  const [closures, setClosures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchClosures = async () => {
    setIsLoading(true);
    try {
      const res = await window.api.getDailyClosures();
      if (res && res.success) {
        setClosures(res.data);
      }
    } catch (error) {
      console.error("Error fetching archives:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClosures();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans relative text-start">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3 mb-2">
            <Archive className="text-purple-500" /> {t('zreport.archive_title')}
          </h1>
          <p className="text-sm text-slate-500">سجل الأيام المغلقة والترحيلات المالية السابقة</p>
        </div>
        <button onClick={fetchClosures} className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-md font-medium hover:bg-slate-700 transition-colors">
          <RotateCcw size={18} className={isLoading ? 'animate-spin' : ''} />
          <span>{t('common.refresh')}</span>
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-start border-collapse" dir={i18n.dir()}>
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80">
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">التاريخ والوقت</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-start">{t('zreport.closed_by')}</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('zreport.opening')}</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('zreport.net_sales')}</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400 text-center">{t('zreport.actual_cash')}</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan="5" className="text-center py-12 text-slate-500">جاري التحميل...</td></tr>
              ) : closures.length === 0 ? (
                <tr><td colSpan="5" className="text-center py-12 text-slate-500">لا توجد سجلات محفوظة بعد.</td></tr>
              ) : (
                closures.map(c => (
                  <tr key={c.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                      <Calendar size={16} className="text-purple-400"/>
                      <span dir="ltr">{new Date(c.closure_date).toLocaleString(i18n.language)}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-300 flex items-center gap-2">
                      <User size={14} className="text-slate-500"/> {c.closed_by}
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-slate-400">
                      {Number(c.total_opening).toLocaleString()} {t('currency')}
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-amber-400">
                      +{Number(c.total_sales).toLocaleString()} {t('currency')}
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-emerald-400 bg-slate-950/50">
                      {Number(c.total_actual).toLocaleString()} {t('currency')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}