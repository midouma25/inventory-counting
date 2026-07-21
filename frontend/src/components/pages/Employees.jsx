import React, { useState, useEffect } from "react";
import { Search, Plus, MoreHorizontal } from "lucide-react";
import useEmployeeStore from "../store/employeeStore"; // تأكد من مسار الملف

// افترضت أنك تستخدم هذا المسار لمكونات shadcn. قم بتعديله إذا لزم الأمر
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Employees = () => {
  // جلب البيانات والدوال من مخزن Zustand
  const { employees, fetchEmployees, addEmployee, isLoading } = useEmployeeStore();

  // حالات الواجهة (States)
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    pinCode: "",
  });

  // جلب الموظفين عند تحميل الصفحة
  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  // فلترة الموظفين حسب البحث
  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // التعامل مع إدخال البيانات في النموذج
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // إرسال النموذج لإضافة موظف جديد
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.pinCode) return; // تحقق بسيط

    const success = await addEmployee(formData);
    if (success) {
      setIsDialogOpen(false); // إغلاق النافذة عند النجاح
      setFormData({ name: "", role: "", pinCode: "" }); // تفريغ الحقول
    } else {
      alert("حدث خطأ. قد يكون رمز الدخول (PIN) مستخدماً بالفعل لموظف آخر.");
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 w-full text-slate-100">
      {/* الترويسة (Header) */}
      <div className="flex justify-between items-end">
        <div className="text-right">
          <h1 className="text-3xl font-bold mb-2">الموارد البشرية</h1>
          <p className="text-slate-400">إدارة حسابات الموظفين ورموز الدخول (PIN)</p>
        </div>
      </div>

      {/* شريط الإجراءات والبحث */}
      <div className="flex justify-between items-center bg-slate-900/50 p-4 rounded-xl border border-slate-800">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex gap-2 items-center bg-white text-black hover:bg-slate-200">
              <Plus size={18} />
              موظف جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-slate-950 text-slate-100 border-slate-800" dir="rtl">
            <DialogHeader>
              <DialogTitle className="text-right">إضافة موظف جديد</DialogTitle>
              <DialogDescription className="text-right text-slate-400">
                أدخل بيانات الموظف. يجب أن يكون رمز (PIN) فريداً لكل موظف.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right col-span-1">
                  الاسم الكامل
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="col-span-3 bg-slate-900 border-slate-800"
                  placeholder="مثال: فاتح حمة"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right col-span-1">
                  المنصب
                </Label>
                <Input
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="col-span-3 bg-slate-900 border-slate-800"
                  placeholder="مثال: كاشير"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="pinCode" className="text-right col-span-1">
                  رمز PIN
                </Label>
                <Input
                  id="pinCode"
                  name="pinCode"
                  type="password" // إخفاء الرمز أثناء الكتابة
                  value={formData.pinCode}
                  onChange={handleChange}
                  className="col-span-3 bg-slate-900 border-slate-800"
                  placeholder="أرقام فقط (مثال: 1234)"
                  required
                />
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  حفظ الموظف
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* حقل البحث */}
        <div className="relative w-1/3">
          <Input
            placeholder="ابحث عن موظف بالاسم..."
            className="pr-10 bg-slate-900 border-slate-800 text-right w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            dir="rtl"
          />
          <Search className="absolute right-3 top-2.5 text-slate-500" size={18} />
        </div>
      </div>

      {/* جدول الموظفين */}
      <div className="bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden">
        <Table dir="rtl">
          <TableHeader>
            <TableRow className="border-slate-800 hover:bg-transparent">
              <TableHead className="text-right text-slate-400">اسم الموظف</TableHead>
              <TableHead className="text-right text-slate-400">المنصب</TableHead>
              <TableHead className="text-center text-slate-400">الحالة</TableHead>
              <TableHead className="text-left text-slate-400">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-slate-500">
                  جاري تحميل البيانات...
                </TableCell>
              </TableRow>
            ) : filteredEmployees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-slate-500">
                  لا يوجد موظفين حالياً.
                </TableCell>
              </TableRow>
            ) : (
              filteredEmployees.map((emp) => (
                <TableRow key={emp.id} className="border-slate-800 hover:bg-slate-800/50">
                  <TableCell className="font-medium text-right">{emp.name}</TableCell>
                  <TableCell className="text-right text-slate-300">{emp.role}</TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        emp.status === "active"
                          ? "bg-green-500/10 text-green-500 border border-green-500/20"
                          : "bg-red-500/10 text-red-500 border border-red-500/20"
                      }`}
                    >
                      {emp.status === "active" ? "نشط" : "غير نشط"}
                    </span>
                  </TableCell>
                  <TableCell className="text-left">
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                      <MoreHorizontal size={18} />
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