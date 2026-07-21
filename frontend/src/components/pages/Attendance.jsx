import React, { useState, useEffect } from "react";
import { Clock, LogIn, LogOut, AlertCircle, CheckCircle2 } from "lucide-react";
import useAttendanceStore from "../store/attendanceStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Attendance = () => {
  const { todayRecords, fetchTodayRecords, submitPin, isLoading } = useAttendanceStore();
  const [pinInput, setPinInput] = useState("");
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message: '' }

  // جلب سجلات اليوم عند فتح الصفحة
  useEffect(() => {
    fetchTodayRecords();
    
    // تحديث السجلات تلقائياً كل دقيقة (اختياري)
    const interval = setInterval(fetchTodayRecords, 60000);
    return () => clearInterval(interval);
  }, [fetchTodayRecords]);

  // دالة إرسال الرمز
  const handlePinSubmit = async (e) => {
    e.preventDefault();
    if (!pinInput) return;

    const result = await submitPin(pinInput);
    
    if (result.success) {
      const actionText = result.action === 'check_in' ? 'تم تسجيل الدخول' : 'تم تسجيل الخروج';
      setFeedback({ 
        type: 'success', 
        message: `${actionText} بنجاح: ${result.employeeName} (${result.time})` 
      });
      fetchTodayRecords(); // تحديث الجدول فوراً
    } else {
      setFeedback({ type: 'error', message: result.message });
    }

    setPinInput(""); // تفريغ الحقل
    
    // إخفاء الرسالة بعد 4 ثوانٍ
    setTimeout(() => setFeedback(null), 4000);
  };

  return (
    <div className="flex gap-6 p-6 w-full text-slate-100 h-[calc(100vh-100px)]">
      
      {/* القسم الأيمن: إدخال الرمز (Terminal) */}
      <div className="w-1/3 bg-slate-900/80 rounded-xl border border-slate-800 p-8 flex flex-col items-center justify-center relative overflow-hidden">
        
        {/* خلفية جمالية */}
        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
        
        <div className="bg-slate-800/50 p-4 rounded-full mb-6">
          <Clock size={48} className="text-blue-400" />
        </div>
        
        <h2 className="text-2xl font-bold mb-2">تسجيل الدخول / الخروج</h2>
        <p className="text-slate-400 mb-8 text-center text-sm">
          أدخل رمز PIN الخاص بك لتسجيل حضورك أو انصرافك
        </p>

        <form onSubmit={handlePinSubmit} className="w-full flex flex-col gap-4">
          <Input
            type="password"
            value={pinInput}
            onChange={(e) => setPinInput(e.target.value)}
            placeholder="****"
            className="text-center text-4xl py-8 tracking-[1em] bg-slate-950 border-slate-700 shadow-inner"
            autoFocus
          />
          <Button 
            type="submit" 
            size="lg"
            className="w-full text-lg bg-blue-600 hover:bg-blue-700 h-14"
          >
            تأكيد الرمز
          </Button>
        </form>

        {/* رسائل التنبيه والنجاح */}
        {feedback && (
          <div className={`mt-6 w-full p-4 rounded-lg flex items-center justify-center gap-3 text-sm font-medium animate-in fade-in slide-in-from-bottom-4
            ${feedback.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
            {feedback.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span>{feedback.message}</span>
          </div>
        )}
      </div>

      {/* القسم الأيسر: سجل اليوم */}
      <div className="w-2/3 bg-slate-900/50 rounded-xl border border-slate-800 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900">
          <h3 className="font-bold text-lg">سجل حركة الموظفين لليوم</h3>
          <span className="text-sm text-slate-400 bg-slate-800 px-3 py-1 rounded-full">
            {new Date().toLocaleDateString('ar-DZ')}
          </span>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <Table dir="rtl">
            <TableHeader>
              <TableRow className="border-slate-800 hover:bg-transparent">
                <TableHead className="text-right text-slate-400">الموظف</TableHead>
                <TableHead className="text-center text-slate-400">وقت الدخول</TableHead>
                <TableHead className="text-center text-slate-400">وقت الخروج</TableHead>
                <TableHead className="text-left text-slate-400">الحالة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-slate-500">جاري التحديث...</TableCell>
                </TableRow>
              ) : todayRecords.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-12 text-slate-500">
                    لا توجد حركات تسجيل دخول حتى الآن اليوم.
                  </TableCell>
                </TableRow>
              ) : (
                todayRecords.map((record) => (
                  <TableRow key={record.id} className="border-slate-800 hover:bg-slate-800/50">
                    <TableCell className="font-medium text-right">
                      <div>{record.name}</div>
                      <div className="text-xs text-slate-400">{record.role}</div>
                    </TableCell>
                    
                    <TableCell className="text-center text-green-400">
                      <div className="flex items-center justify-center gap-2">
                        <LogIn size={14} /> {record.time_in}
                      </div>
                    </TableCell>
                    
                    <TableCell className="text-center text-orange-400">
                      {record.time_out ? (
                        <div className="flex items-center justify-center gap-2">
                          <LogOut size={14} /> {record.time_out}
                        </div>
                      ) : (
                        <span className="text-slate-600">-</span>
                      )}
                    </TableCell>

                    <TableCell className="text-left">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium 
                        ${!record.time_out 
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                          : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>
                        {!record.time_out ? 'متواجد حالياً' : 'أنهى الدوام'}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

    </div>
  );
};

export default Attendance;