import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Activity, Search, ShieldAlert, User, Clock, Filter } from 'lucide-react';
import useAuditStore from '../../store/auditStore';

export default function AuditLogs() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const { logs, fetchLogs, isLoading } = useAuditStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('all');

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  // ترجمة احترافية لكل أنواع الحركات التي يتنفس بها النظام
  const renderAuditDetails = (log) => {
    try {
      const p = JSON.parse(log.details);
      switch(log.action) {
        case 'LOGIN': return `تسجيل دخول للنظام (${p.role})`;
        case 'ADD_EXPENSE': return `إضافة مصروف: ${p.desc} (${p.amount} د.ج)`;
        case 'UPDATE_EXPENSE': return `تعديل مصروف: ${p.desc} (${p.amount} د.ج)`;
        case 'DELETE_EXPENSE': return `حذف مصروف: ${p.desc} (${p.amount} د.ج)`;
        case 'CLOSE_DAY': return `إغلاق وتأكيد يومية المتجر. المبيعات: ${p.sales} د.ج`;
        case 'CLOSE_SHIFT': return `إغلاق وردية بائع. المبيعات: ${p.sales} د.ج`;
        case 'OPEN_SHIFT': return `فتح وردية جديدة بفوندوكاس: ${p.opening} د.ج`;
        case 'ADD_EMPLOYEE': return `إضافة موظف جديد: ${p.name} (${p.role})`;
        case 'UPDATE_EMPLOYEE': return `تعديل بيانات الموظف: ${p.name}`;
        case 'DELETE_EMPLOYEE': return `حذف/تعطيل الموظف: ${p.name}`;
        case 'ADD_USER': return `إنشاء حساب للنظام: ${p.username} (${p.role})`;
        case 'DELETE_USER': return `حذف حساب: ${p.username}`;
        case 'PAY_SALARY': return `صرف راتب موظف بقيمة: ${p.amount} د.ج`;
        case 'ADD_SUPPLIER': return `إضافة مورد جديد: ${p.name} (دين أولي: ${p.debt})`;
        case 'UPDATE_SUPPLIER': return `تعديل بيانات المورد: ${p.name}`;
        case 'DELETE_SUPPLIER': return `حذف بيانات المورد (ID: ${p.id})`;
        case 'ADD_RECEIPT': return `استلام فاتورة/سلعة بقيمة: ${p.amount} د.ج`;
        case 'UPDATE_RECEIPT': return `تعديل فاتورة مورد إلى: ${p.amount} د.ج`;
        case 'DELETE_RECEIPT': return `حذف فاتورة مورد (ID: ${p.id})`;
        case 'ADD_PAYMENT': return `تسديد دفعة لمورد بقيمة: ${p.amount} د.ج`;
        case 'UPDATE_PAYMENT': return `تعديل تسديد مورد إلى: ${p.amount} د.ج`;
        case 'DELETE_PAYMENT': return `حذف تسديد مورد (ID: ${p.id})`;
        case 'ADD_ADVANCE': return `تقديم سلفة بقيمة: ${p.amount} د.ج`;
        case 'UPDATE_ADVANCE': return `تعديل سلفة إلى: ${p.amount} د.ج`;
        case 'DELETE_ADVANCE': return `إلغاء سلفة (ID: ${p.id})`;
        case 'ADD_TASK': return `إضافة مهمة للأجندة: ${p.title}`;
        case 'UPDATE_TASK_STATUS': return `تغيير حالة مهمة إلى: ${p.status}`;
        case 'DELETE_TASK': return `حذف مهمة من الأجندة (ID: ${p.id})`;
        case 'RESCHEDULE_TASK': return `تأجيل مهمة إلى تاريخ: ${p.newDate}`;
        case 'CHECK_IN': return `تسجيل حضور الساعة: ${p.time}`;
        case 'CHECK_OUT': return `تسجيل انصراف الساعة: ${p.time}`;
        case 'UPDATE_ATTENDANCE': return `تعديل وقت حضور/انصراف الموظف`;
        default: return t(`audit.details.${log.action}`, p) || JSON.stringify(p);
      }
    } catch (e) { return log.details; }
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (log.details || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterAction === 'all' || log.action === filterAction;
    return matchesSearch && matchesFilter;
  });

  const uniqueActions = ['all', ...new Set(logs.map(log => log.action))];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans text-start">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3 mb-2">
            <Activity className="text-blue-500" /> {t('sidebar.auditLogs', 'سجل النشاطات الشامل')}
          </h1>
          <p className="text-slate-500">{t('audit.subtitle', 'مراقبة وتتبع جميع حركات النظام والمستخدمين بدقة')}</p>
        </div>
        <button onClick={fetchLogs} className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors text-sm">
          تحديث السجل
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg flex flex-col h-[calc(100vh-180px)]">
        <div className="p-4 border-b border-slate-800 bg-slate-950/30 flex gap-4">
          <div className="relative flex-1">
            <Search size={18} className={`absolute top-1/2 -translate-y-1/2 text-slate-500 ${isRTL ? 'right-3' : 'left-3'}`} />
            <input type="text" placeholder={t('common.search', 'بحث...')} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={`w-full bg-slate-950 border border-slate-700 rounded-lg py-2.5 text-white focus:outline-none focus:border-blue-500 ${isRTL ? 'pr-10' : 'pl-10'}`} />
          </div>
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-700 rounded-lg px-3">
            <Filter size={18} className="text-slate-500" />
            <select value={filterAction} onChange={(e) => setFilterAction(e.target.value)} className="bg-transparent text-white focus:outline-none py-2.5">
              {uniqueActions.map(action => (
                <option key={action} value={action}>{action === 'all' ? t('common.all', 'الكل') : action}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4">
          {isLoading ? (
            <div className="text-center py-12 text-slate-500">{t('common.loading', 'جاري التحميل...')}</div>
          ) : filteredLogs.length === 0 ? (
            <div className="text-center py-12 flex flex-col items-center gap-2 text-slate-500">
              <ShieldAlert size={32} />
              <p>{t('common.noResults', 'لا توجد سجلات مطابقة.')}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredLogs.map(log => (
                <div key={log.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-slate-800 rounded-lg bg-slate-950 hover:border-slate-700 transition-colors gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-900/30 text-blue-400 flex items-center justify-center font-bold shrink-0 uppercase">
                      {log.username.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-medium mb-1">{renderAuditDetails(log)}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><User size={12}/> {log.username}</span>
                        <span className="flex items-center gap-1"><Clock size={12}/> <bdi dir="ltr">{new Date(log.created_at).toLocaleString(i18n.language)}</bdi></span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-3 py-1.5 rounded bg-slate-800 text-slate-300 border border-slate-700 self-start md:self-auto shrink-0">
                    {log.action}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}