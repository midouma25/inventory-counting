import React, { useState, useEffect } from "react";
import { Search, Plus, Edit, Trash2, AlertCircle, CheckCircle2 } from "lucide-react"; 
import { useTranslation } from "react-i18next"; 
import useEmployeeStore from "../../store/employeeStore";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// 🔴 1. استيراد نافذة التنبيه المخصصة الجديدة
import ConfirmAlert from '../ui/ConfirmAlert'; 

const Employees = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  const { employees, fetchEmployees, addEmployee, isLoading } = useEmployeeStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({ name: "", role: "", pinCode: "" });
  
  const [employeeToDelete, setEmployeeToDelete] = useState(null); 
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);
  
  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const unlockFocus = () => {
    if (document.activeElement) document.activeElement.blur();
    setTimeout(() => {
      window.focus();
      document.body.focus();
      document.body.style.pointerEvents = 'auto';
    }, 10);
  };

  const filteredEmployees = employees.filter((emp) =>
    (emp?.name || "").toLowerCase().includes((searchQuery || "").toLowerCase()) // 🔴 الحماية المضافة سابقاً
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openAddDialog = () => {
    setEditingEmployee(null);
    setFormData({ name: "", role: "", pinCode: "" });
    setIsDialogOpen(true);
  };

  const openEditDialog = (emp) => {
    setEditingEmployee(emp);
    setFormData({ name: emp.name, role: emp.role, pinCode: emp.pin_code });
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (emp) => {
    setEmployeeToDelete(emp);
  };

  const confirmDelete = async () => {
    if (!employeeToDelete) return;
    const store = useEmployeeStore.getState();
    const idToDelete = employeeToDelete.id;
    
    // إغلاق النافذة
    setEmployeeToDelete(null); 
    
    try {
      if (store.deleteEmployee) {
        const res = await window.api.deleteEmployee(idToDelete);
        if (res.success) {
          if (res.isSoftDeleted) {
            showToast('warning', t('hr.employees.softDeleted', 'تم تعطيل الحساب بنجاح لحماية السجلات.')); 
          } else {
            showToast('success', t('common.success', 'تمت العملية بنجاح'));
          }
          fetchEmployees();
        } else {
          showToast('error', t('common.error', 'حدث خطأ غير متوقع'));
        }
      }
    } catch (err) {
      showToast('error', t('common.error', 'حدث خطأ غير متوقع'));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.pinCode) return; 

    const dataToSubmit = { ...formData };
    const isEdit = !!editingEmployee;
    const editId = editingEmployee ? editingEmployee.id : null;

    unlockFocus(); 
    
    setIsDialogOpen(false); 
    setFormData({ name: "", role: "", pinCode: "" }); 
    setEditingEmployee(null);

    setTimeout(async () => {
      try {
        let res;
        if (isEdit) {
          res = await window.api.updateEmployee(editId, dataToSubmit);
        } else {
          res = await window.api.addEmployee(dataToSubmit);
        }

        if (res && res.error) {
          showToast('warning', res.error); 
        } else if (res) {
          fetchEmployees();
          showToast('success', t('common.success', 'تمت العملية بنجاح'));
        } else {
          showToast('error', t('common.error', 'حدث خطأ غير متوقع'));
        }
      } catch (err) {
        showToast('error', t('common.error', 'حدث خطأ غير متوقع'));
      }
    }, 150);
  };

  return (
    <div className={`flex flex-col gap-6 p-6 w-full text-slate-100 ${isRTL ? 'text-right' : 'text-left'} relative`}>
      
      {toast && (
        <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[100] px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 ${
          toast.type === 'success' ? 'bg-emerald-600 text-white' :
          toast.type === 'warning' ? 'bg-amber-600 text-white' :
          'bg-red-600 text-white'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span className="font-bold">{toast.message}</span>
        </div>
      )}

      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">{t('hr.tabs.employees', 'العمال')}</h1>
          <p className="text-slate-400">{t('hr.subtitle', 'إدارة الحضور والانصراف والعمال')}</p>
        </div>
      </div>

      <div className="flex justify-between items-center bg-slate-900/50 p-4 rounded-xl border border-slate-800">
        <Button onClick={openAddDialog} className="flex gap-2 items-center bg-blue-600 text-white hover:bg-blue-700">
          <Plus size={18} /> {t('hr.employees.addBtn', 'إضافة موظف')}
        </Button>

        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          if (!open) unlockFocus(); 
          setIsDialogOpen(open);
        }}>
          <DialogContent 
            onOpenAutoFocus={(e) => e.preventDefault()}
            onCloseAutoFocus={(e) => e.preventDefault()}
            className={`sm:max-w-[425px] bg-slate-950 text-slate-100 border-slate-800 ${isRTL ? 'text-right' : 'text-left'}`} 
            dir={i18n.dir()}
          >
            <DialogHeader>
              <DialogTitle>{editingEmployee ? t('hr.dialog.editTitle', 'تعديل موظف') : t('hr.dialog.title', 'إضافة موظف جديد')}</DialogTitle>
              <DialogDescription className="text-slate-400">
                {t('hr.dialog.desc', 'أدخل تفاصيل الموظف ورمز PIN السري.')}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className={`col-span-1 ${isRTL ? 'text-right' : 'text-left'}`}>{t('hr.dialog.name', 'الاسم الكامل')}</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} className="col-span-3 bg-slate-900 border-slate-800" placeholder={t('hr.dialog.namePlaceholder', 'محمد أمين...')} required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className={`col-span-1 ${isRTL ? 'text-right' : 'text-left'}`}>{t('hr.dialog.role', 'المنصب')}</Label>
                <select id="role" name="role" value={formData.role} onChange={handleChange} className="col-span-3 bg-slate-900 border-slate-800 rounded-md p-2 text-sm text-white focus:outline-none focus:border-blue-500" required>
                  <option value="" disabled>{t('hr.dialog.rolePlaceholder', 'اختر منصباً')}</option>
                  <option value="cashier">{t('hr.roles.cashier', 'بائع (كاشير)')}</option>
                  <option value="scale">{t('hr.roles.scale', 'عامل ميزان')}</option>
                  <option value="stock">{t('hr.roles.stock', 'ترتيبات')}</option>
                  <option value="admin">{t('hr.roles.admin', 'مدير عام')}</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="pinCode" className={`col-span-1 ${isRTL ? 'text-right' : 'text-left'}`}>{t('hr.dialog.pin', 'رمز PIN')}</Label>
                <Input id="pinCode" name="pinCode" type="password" value={formData.pinCode} onChange={handleChange} className="col-span-3 bg-slate-900 border-slate-800 tracking-widest" placeholder="****" required />
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4">
                  {editingEmployee ? t('hr.dialog.saveChanges', 'حفظ التعديلات') : t('hr.dialog.save', 'حفظ بيانات الموظف')}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <div className="relative w-1/3">
          <Input placeholder={t('common.search', 'بحث...')} className={`bg-slate-900 border-slate-800 w-full ${isRTL ? 'pr-10 text-right' : 'pl-10 text-left'}`} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} dir={i18n.dir()} />
          <Search className={`absolute top-2.5 text-slate-500 ${isRTL ? 'right-3' : 'left-3'}`} size={18} />
        </div>
      </div>

      <div className="bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden">
        <Table dir={i18n.dir()}>
          <TableHeader>
            <TableRow className="border-slate-800 hover:bg-transparent">
              <TableHead className={`${isRTL ? 'text-right' : 'text-left'} text-slate-400`}>{t('hr.employees.table.name', 'الاسم الكامل')}</TableHead>
              <TableHead className={`${isRTL ? 'text-right' : 'text-left'} text-slate-400`}>{t('hr.employees.table.role', 'المنصب')}</TableHead>
              <TableHead className="text-center text-slate-400">{t('hr.employees.table.status', 'الحالة')}</TableHead>
              <TableHead className="text-center text-slate-400">{t('hr.employees.table.actions', 'الإجراءات')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={4} className="text-center py-8 text-slate-500">{t('hr.table.loading', 'جاري التحميل...')}</TableCell></TableRow>
            ) : filteredEmployees.length === 0 ? (
              <TableRow><TableCell colSpan={4} className="text-center py-8 text-slate-500">{t('common.noResults', 'لا توجد نتائج')}</TableCell></TableRow>
            ) : (
              filteredEmployees.map((emp) => (
                <TableRow key={emp.id} className="border-slate-800 hover:bg-slate-800/50">
                  <TableCell className={`font-medium ${isRTL ? 'text-right' : 'text-left'}`}>{emp.name}</TableCell>
                  <TableCell className={`${isRTL ? 'text-right' : 'text-left'} text-slate-300`}>
                    {t(`hr.roles.${emp.role}`, { defaultValue: emp.role })}
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${emp.status === "active" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"}`}>
                      {emp.status === "active" ? t('hr.status.active', 'نشط') : t('hr.status.inactive', 'معطل')}
                    </span>
                  </TableCell>
                  <TableCell className="text-center flex justify-center gap-2">
                    <Button onClick={() => openEditDialog(emp)} variant="ghost" size="icon" className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/30" title={t('hr.employees.actions.edit', 'تعديل')}>
                      <Edit size={18} />
                    </Button>
                    <Button 
                      onClick={() => handleDeleteClick(emp)} 
                      variant="ghost" size="icon" className="text-red-400 hover:text-red-300 hover:bg-red-900/30" title={t('hr.employees.actions.delete', 'حذف')}>
                      <Trash2 size={18} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* 🔴 2. استخدام النافذة الجديدة بدلاً من القديمة */}
      <ConfirmAlert 
        isOpen={!!employeeToDelete}
        onClose={() => setEmployeeToDelete(null)}
        onConfirm={confirmDelete}
        title={t('hr.employees.actions.delete', 'حذف')}
        message={t('hr.employees.deleteConfirmMsg', { 
          name: employeeToDelete?.name, 
          defaultValue: `هل أنت متأكد من حذف الحساب الإداري للمستخدم:\n${employeeToDelete?.name}؟` 
        })}
        cancelText={t('common.cancel', 'إلغاء')}
        confirmText={t('suppliers.actions.confirmDeleteBtn', 'تأكيد الحذف')}
      />

    </div>
  );
};
export default Employees;