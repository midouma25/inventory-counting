import React, { useState, useEffect } from "react";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next"; // 🔴 استيراد مكتبة الترجمة
import useEmployeeStore from "../../store/employeeStore";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Employees = () => {
  // 🔴 تفعيل الترجمة والاتجاه 🔴
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  const { employees, fetchEmployees, addEmployee, isLoading } = useEmployeeStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({ name: "", role: "", pinCode: "" });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase())
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

  const handleDelete = async (emp) => {
    // 🔴 استخدام الترجمة في رسائل التأكيد 🔴
    if (window.confirm(t('hr.employees.deleteConfirm', { name: emp.name }))) {
      const store = useEmployeeStore.getState();
      if (store.deleteEmployee) {
        const res = await window.api.deleteEmployee(emp.id);
        if (res.success) {
          if (res.isSoftDeleted) alert(t('hr.employees.softDeleted'));
          fetchEmployees();
        } else {
          alert(t('common.error'));
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.pinCode) return; 

    let success;
    if (editingEmployee) {
      success = await window.api.updateEmployee(editingEmployee.id, formData);
    } else {
      success = await addEmployee(formData);
    }

    if (success) {
      setIsDialogOpen(false); 
      setFormData({ name: "", role: "", pinCode: "" }); 
      setEditingEmployee(null);
      fetchEmployees();
    } else {
      alert(t('hr.messages.error'));
    }
  };

  return (
    <div className={`flex flex-col gap-6 p-6 w-full text-slate-100 ${isRTL ? 'text-right' : 'text-left'}`}>
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">{t('hr.tabs.employees')}</h1>
          <p className="text-slate-400">{t('hr.subtitle')}</p>
        </div>
      </div>

      <div className="flex justify-between items-center bg-slate-900/50 p-4 rounded-xl border border-slate-800">
        <Button onClick={openAddDialog} className="flex gap-2 items-center bg-blue-600 text-white hover:bg-blue-700">
          <Plus size={18} /> {t('hr.employees.addBtn')}
        </Button>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className={`sm:max-w-[425px] bg-slate-950 text-slate-100 border-slate-800 ${isRTL ? 'text-right' : 'text-left'}`} dir={i18n.dir()}>
            <DialogHeader>
              <DialogTitle>{editingEmployee ? t('hr.dialog.editTitle') : t('hr.dialog.title')}</DialogTitle>
              <DialogDescription className="text-slate-400">
                {t('hr.dialog.desc')}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className={`col-span-1 ${isRTL ? 'text-right' : 'text-left'}`}>{t('hr.dialog.name')}</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} className="col-span-3 bg-slate-900 border-slate-800" placeholder={t('hr.dialog.namePlaceholder')} required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className={`col-span-1 ${isRTL ? 'text-right' : 'text-left'}`}>{t('hr.dialog.role')}</Label>
                {/* 🔴 ربط المناصب بملفات الترجمة 🔴 */}
                <select id="role" name="role" value={formData.role} onChange={handleChange} className="col-span-3 bg-slate-900 border-slate-800 rounded-md p-2 text-sm text-white focus:outline-none focus:border-blue-500" required>
                  <option value="" disabled>{t('hr.dialog.rolePlaceholder')}</option>
                  <option value="cashier">{t('hr.roles.cashier')}</option>
                  <option value="scale">{t('hr.roles.scale')}</option>
                  <option value="stock">{t('hr.roles.stock')}</option>
                  <option value="admin">{t('hr.roles.admin')}</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="pinCode" className={`col-span-1 ${isRTL ? 'text-right' : 'text-left'}`}>{t('hr.dialog.pin')}</Label>
                <Input id="pinCode" name="pinCode" type="password" value={formData.pinCode} onChange={handleChange} className="col-span-3 bg-slate-900 border-slate-800 tracking-widest" placeholder="****" required />
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4">
                  {editingEmployee ? t('hr.dialog.saveChanges') : t('hr.dialog.save')}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <div className="relative w-1/3">
          <Input placeholder={t('hr.employees.search')} className={`bg-slate-900 border-slate-800 w-full ${isRTL ? 'pr-10 text-right' : 'pl-10 text-left'}`} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} dir={i18n.dir()} />
          <Search className={`absolute top-2.5 text-slate-500 ${isRTL ? 'right-3' : 'left-3'}`} size={18} />
        </div>
      </div>

      <div className="bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden">
        <Table dir={i18n.dir()}>
          <TableHeader>
            <TableRow className="border-slate-800 hover:bg-transparent">
              <TableHead className={`${isRTL ? 'text-right' : 'text-left'} text-slate-400`}>{t('hr.employees.table.name')}</TableHead>
              <TableHead className={`${isRTL ? 'text-right' : 'text-left'} text-slate-400`}>{t('hr.employees.table.role')}</TableHead>
              <TableHead className="text-center text-slate-400">{t('hr.employees.table.status')}</TableHead>
              <TableHead className="text-center text-slate-400">{t('hr.employees.table.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={4} className="text-center py-8 text-slate-500">{t('hr.table.loading')}</TableCell></TableRow>
            ) : filteredEmployees.length === 0 ? (
              <TableRow><TableCell colSpan={4} className="text-center py-8 text-slate-500">{t('hr.employees.empty')}</TableCell></TableRow>
            ) : (
              filteredEmployees.map((emp) => (
                <TableRow key={emp.id} className="border-slate-800 hover:bg-slate-800/50">
                  <TableCell className={`font-medium ${isRTL ? 'text-right' : 'text-left'}`}>{emp.name}</TableCell>
                  <TableCell className={`${isRTL ? 'text-right' : 'text-left'} text-slate-300`}>
                    {t(`hr.roles.${emp.role}`, emp.role)}
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${emp.status === "active" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"}`}>
                      {emp.status === "active" ? t('hr.status.active') : t('hr.status.inactive')}
                    </span>
                  </TableCell>
                  <TableCell className="text-center flex justify-center gap-2">
                    <Button onClick={() => openEditDialog(emp)} variant="ghost" size="icon" className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/30" title={t('hr.employees.actions.edit')}>
                      <Edit size={18} />
                    </Button>
                    <Button onClick={() => handleDelete(emp)} variant="ghost" size="icon" className="text-red-400 hover:text-red-300 hover:bg-red-900/30" title={t('hr.employees.actions.delete')}>
                      <Trash2 size={18} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default Employees;