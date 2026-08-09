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

  // 🔴 دالة التنسيق الرياضي الدقيق للتاريخ
  const formatDateTime = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleString('en-GB', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: false 
    }).replace(',', ' -');
  };

  // 🔴 ترجمة الحدث حسب الإجراءات المتوفرة بما فيها إجراءات الجرد الجديدة
  const renderAuditDetails = (log) => {
    try {
      const p = JSON.parse(log.details || '{}');
      switch(log.action) {
        case 'LOGIN': return t('audit.login', { role: p.role, defaultValue: `تسجيل دخول للنظام (${p.role})` });
        
        // المصاريف
        case 'ADD_EXPENSE': return t('audit.addExpense', { desc: p.desc, amount: p.amount, defaultValue: `إضافة مصروف: ${p.desc} (${p.amount} د.ج)` });
        case 'UPDATE_EXPENSE': return t('audit.updateExpense', { desc: p.desc, amount: p.amount, defaultValue: `تعديل مصروف: ${p.desc} (${p.amount} د.ج)` });
        case 'DELETE_EXPENSE': return t('audit.deleteExpense', { desc: p.desc, amount: p.amount, defaultValue: `حذف مصروف: ${p.desc} (${p.amount} د.ج)` });
        
        // الصندوق والورديات
        case 'CLOSE_DAY': return t('audit.closeDay', { sales: p.sales, defaultValue: `إغلاق وتأكيد يومية المتجر. المبيعات: ${p.sales} د.ج` });
        case 'CLOSE_SHIFT': return t('audit.closeShift', { sales: p.sales, defaultValue: `إغلاق وردية كاشير. المبيعات: ${p.sales} د.ج` });
        case 'OPEN_SHIFT': return t('audit.openShift', { opening: p.opening, defaultValue: `فتح وردية جديدة بفوندوكاس: ${p.opening} د.ج` });
        
        // الموظفين والمستخدمين
        case 'ADD_EMPLOYEE': return t('audit.addEmployee', { name: p.name, role: p.role, defaultValue: `إضافة موظف جديد: ${p.name} (${p.role})` });
        case 'UPDATE_EMPLOYEE': return t('audit.updateEmployee', { name: p.name, defaultValue: `تعديل بيانات الموظف: ${p.name}` });
        case 'DELETE_EMPLOYEE': return t('audit.deleteEmployee', { name: p.name, defaultValue: `حذف/تعطيل الموظف: ${p.name}` });
        case 'ADD_USER': return t('audit.addUser', { username: p.username, role: p.role, defaultValue: `إنشاء حساب للنظام: ${p.username} (${p.role})` });
        case 'DELETE_USER': return t('audit.deleteUser', { username: p.username, defaultValue: `حذف حساب: ${p.username}` });
        case 'PAY_SALARY': return t('audit.paySalary', { amount: p.amount, defaultValue: `صرف راتب موظف بقيمة: ${p.amount} د.ج` });
        
        // الموردين والفواتير
        case 'ADD_SUPPLIER': return t('audit.addSupplier', { name: p.name, debt: p.debt, defaultValue: `إضافة مورد جديد: ${p.name} (دين أولي: ${p.debt})` });
        case 'UPDATE_SUPPLIER': return t('audit.updateSupplier', { name: p.name, defaultValue: `تعديل بيانات المورد: ${p.name}` });
        case 'DELETE_SUPPLIER': return t('audit.deleteSupplier', { id: p.id, defaultValue: `حذف بيانات المورد (ID: ${p.id})` });
        case 'ADD_RECEIPT': return t('audit.addReceipt', { amount: p.amount, defaultValue: `استلام فاتورة/سلعة بقيمة: ${p.amount} د.ج` });
        case 'UPDATE_RECEIPT': return t('audit.updateReceipt', { amount: p.amount, defaultValue: `تعديل فاتورة مورد إلى: ${p.amount} د.ج` });
        case 'DELETE_RECEIPT': return t('audit.deleteReceipt', { id: p.id, defaultValue: `حذف فاتورة مورد (ID: ${p.id})` });
        case 'ADD_PAYMENT': return t('audit.addPayment', { amount: p.amount, defaultValue: `تسديد دفعة لمورد بقيمة: ${p.amount} د.ج` });
        case 'UPDATE_PAYMENT': return t('audit.updatePayment', { amount: p.amount, defaultValue: `تعديل تسديد مورد إلى: ${p.amount} د.ج` });
        case 'DELETE_PAYMENT': return t('audit.deletePayment', { id: p.id, defaultValue: `حذف تسديد مورد (ID: ${p.id})` });
        
        // الأجندة والمهام
        case 'ADD_TASK': return t('audit.addTask', { title: p.title, defaultValue: `إضافة مهمة للأجندة: ${p.title}` });
        case 'UPDATE_TASK_STATUS': return t('audit.updateTaskStatus', { status: p.status, defaultValue: `تغيير حالة مهمة إلى: ${p.status}` });
        case 'DELETE_TASK': return t('audit.deleteTask', { id: p.id, defaultValue: `حذف مهمة من الأجندة (ID: ${p.id})` });
        case 'RESCHEDULE_TASK': return t('audit.rescheduleTask', { date: p.newDate, defaultValue: `تأجيل مهمة إلى تاريخ: ${p.newDate}` });
        
        // الحضور والانصراف
        case 'CHECK_IN': return t('audit.checkIn', { time: p.time, defaultValue: `تسجيل حضور الساعة: ${p.time}` });
        case 'CHECK_OUT': return t('audit.checkOut', { time: p.time, defaultValue: `تسجيل انصراف الساعة: ${p.time}` });
        case 'UPDATE_ATTENDANCE': return t('audit.updateAttendance', { defaultValue: `تعديل وقت حضور/انصراف الموظف` });

        // 🟢 الإضافة الجديدة: إدارة المخزون والجرد (Inventory)
        case 'ADD_INV_FAMILY': return t('audit.addInvFamily', { name: p.name, defaultValue: `إضافة عائلة مخزون جديدة: ${p.name || 'غير محدد'}` });
        case 'UPDATE_INV_FAMILY': return t('audit.updateInvFamily', { name: p.name, defaultValue: `تعديل عائلة مخزون: ${p.name || ''}` });
        case 'DELETE_INV_FAMILY': return t('audit.deleteInvFamily', { id: p.id, defaultValue: `حذف عائلة مخزون بالمعرف: ${p.id || ''}` });
        
        case 'ADD_INV_TYPE': return t('audit.addInvType', { name: p.name, defaultValue: `إضافة نوع منتج جديد: ${p.name || 'غير محدد'}` });
        case 'UPDATE_INV_TYPE': return t('audit.updateInvType', { name: p.name, defaultValue: `تعديل نوع منتج: ${p.name || ''}` });
        case 'DELETE_INV_TYPE': return t('audit.deleteInvType', { id: p.id, defaultValue: `حذف نوع منتج بالمعرف: ${p.id || ''}` });
        
        case 'ADD_INV_ITEM': return t('audit.addInvItem', { name: p.name, defaultValue: `إضافة منتج جديد للمخزون: ${p.name || 'غير محدد'}` });
        case 'UPDATE_INV_ITEM': return t('audit.updateInvItem', { name: p.name, defaultValue: `تعديل بيانات/كمية منتج: ${p.name || ''}` });
        case 'DELETE_INV_ITEM': return t('audit.deleteInvItem', { id: p.id, defaultValue: `حذف منتج من المخزون بالمعرف: ${p.id || ''}` });

        default: return t(`audit.details.${log.action}`, p, { defaultValue: JSON.stringify(p) });
      }
    } catch (e) { return log.details || log.action; }
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
        <button onClick={fetchLogs} className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors text-sm font-bold border border-slate-700 shadow-md">
          {t('common.refresh', 'تحديث السجل')}
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
            <select value={filterAction} onChange={(e) => setFilterAction(e.target.value)} className="bg-transparent text-white focus:outline-none py-2.5 max-w-[200px] truncate cursor-pointer">
              {uniqueActions.map(action => (
                <option key={action} value={action} className="bg-slate-900">{action === 'all' ? t('common.all', 'الكل') : action}</option>
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
                    <div className="w-10 h-10 rounded-full bg-blue-900/30 text-blue-400 flex items-center justify-center font-bold shrink-0 uppercase border border-blue-800/50 shadow-inner">
                      {log.username ? log.username.charAt(0) : '?'}
                    </div>
                    <div>
                      <p className="text-white font-medium mb-1 text-[15px] leading-relaxed">{renderAuditDetails(log)}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                        <span className="flex items-center gap-1.5 bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800"><User size={12} className="text-slate-400"/> {log.username}</span>
                        <span className="flex items-center gap-1.5 bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800"><Clock size={12} className="text-slate-400"/> <span dir="ltr" className="font-mono text-slate-400 tracking-wider">{formatDateTime(log.created_at)}</span></span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold px-3 py-1.5 rounded-lg bg-slate-900 text-slate-400 border border-slate-700 self-start md:self-auto shrink-0 uppercase tracking-wider shadow-sm">
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