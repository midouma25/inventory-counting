import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Play, Lock, Calculator, Banknote, AlertCircle, Clock } from 'lucide-react';
import useAuthStore from '../store//authStore';

export default function EndOfDay() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  
  const user = useAuthStore(state => state.user);
  const cashierName = (user?.role === 'superadmin' || user?.username === 'admin') ? t('common.superAdmin') : (user?.username || 'Cashier');

  const [activeShift, setActiveShift] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [openingBalanceInput, setOpeningBalanceInput] = useState('');
  const [actualAmount, setActualAmount] = useState('');
  const [notes, setNotes] = useState('');
  
  const [summary, setSummary] = useState({ expenses: 0, supplierPayments: 0, advances: 0, totalOut: 0 });

  const fetchShiftData = async () => {
    setIsLoading(true);
    try {
      if (window.api && window.api.getActiveShift) {
        const shift = await window.api.getActiveShift(cashierName);
        if (shift) {
          setActiveShift(shift);
          
          // جلب ملخص المصاريف الخاص بهذه الوردية فقط
          const summaryRes = await window.api.getShiftSummary(cashierName, shift.start_time);
          if (summaryRes.success) {
            setSummary(summaryRes.data);
          }
        } else {
          setActiveShift(null);
          setSummary({ expenses: 0, supplierPayments: 0, advances: 0, totalOut: 0 });
        }
      }
    } catch (error) {
      console.error("Error fetching shift:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchShiftData();
  }, [cashierName]);

  const handleOpenShift = async (e) => {
    e.preventDefault();
    if (!openingBalanceInput) return;
    try {
      if (window.api && window.api.openShift) {
        const res = await window.api.openShift({ 
          cashierName, 
          openingBalance: Number(openingBalanceInput) 
        });
        if (res.success) {
          setOpeningBalanceInput('');
          fetchShiftData();
        } else {
          alert(res.message);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const totalOut = summary.totalOut || 0;
  const currentOpeningBalance = activeShift ? activeShift.opening_balance : 0;
  
  // حساب المبيعات (المداخيل الصافية): (النقد الفعلي + المصاريف الخارجة) - الرصيد الافتتاحي
  const todaySales = (actualAmount === '' || actualAmount === 0) 
    ? 0 
    : (Number(actualAmount) + totalOut) - Number(currentOpeningBalance);

  const handleCloseShift = async (e) => {
    e.preventDefault();
    if (actualAmount === '') return;
    
    if (window.confirm(t('eod.confirmClose'))) {
      try {
        if (window.api && window.api.closeShift) {
          const res = await window.api.closeShift({
            shiftId: activeShift.id,
            actualCash: Number(actualAmount),
            difference: todaySales, // نحفظ المبيعات/الفارق هنا
            note: notes
          });
          
          if (res.success) {
            alert(t('eod.closeSuccess'));
            setActiveShift(null);
            setActualAmount('');
            setNotes('');
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (isLoading) {
    return <div className="p-6 text-center text-slate-500">{t('hr.table.loading')}</div>;
  }

  // === الشاشة 1: فتح وردية جديدة ===
  if (!activeShift) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans flex items-center justify-center">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mb-4">
              <Play size={32} className="text-blue-500 ms-1" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">{t('eod.open_shift_title')}</h1>
            <p className="text-slate-500 text-sm">{t('eod.open_shift_desc')} <span className="font-bold text-white">{cashierName}</span></p>
          </div>

          <form onSubmit={handleOpenShift} className="space-y-6 text-start">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">{t('eod.opening_balance')} (DA)</label>
              <div className="relative">
                <Banknote size={18} className="absolute start-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input 
                  type="number" 
                  min="0"
                  required
                  value={openingBalanceInput}
                  onChange={(e) => setOpeningBalanceInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 ps-11 pe-4 text-white focus:outline-none focus:border-blue-500 text-lg font-bold"
                  placeholder="0.00"
                />
              </div>
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors flex justify-center items-center gap-2">
              <Play size={18} /> {t('eod.open_shift_btn')}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // === الشاشة 2: الوردية النشطة (إغلاق الوردية) ===
  const shiftStartTime = new Date(activeShift.start_time).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans">
      
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Lock className="text-red-500" /> {t('eod.title')}
          </h1>
          <p className="text-slate-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            {t('eod.active_shift')}: <strong className="text-white">{cashierName}</strong>
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg flex items-center gap-3">
          <Clock className="text-blue-400" size={18} />
          <span className="text-sm font-medium">{t('hr.table.timeIn')}: {shiftStartTime}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl shadow-lg border-t-4 border-t-emerald-500">
          <h3 className="text-slate-400 text-sm mb-1">{t('eod.opening_balance')}</h3>
          <p className="text-2xl font-bold text-white">{currentOpeningBalance.toLocaleString()} {t('currency')}</p>
        </div>
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl shadow-lg border-t-4 border-t-red-500">
          <h3 className="text-slate-400 text-sm mb-1">{t('eod.total_deducted')}</h3>
          <p className="text-2xl font-bold text-red-400">{totalOut.toLocaleString()} {t('currency')}</p>
        </div>
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl shadow-lg border-t-4 border-t-blue-500">
          <h3 className="text-slate-400 text-sm mb-1">{t('eod.advances')} & {t('eod.supplier_payments')}</h3>
          <p className="text-2xl font-bold text-blue-400">{(summary.advances + summary.supplierPayments).toLocaleString()} {t('currency')}</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
        <form onSubmit={handleCloseShift} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-emerald-400 mb-2">{t('eod.actual_cash')}</label>
              <div className="relative">
                <Calculator size={20} className="absolute start-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input 
                  type="number" 
                  min="0"
                  required
                  value={actualAmount} 
                  onChange={(e) => setActualAmount(e.target.value)}
                  className="w-full bg-slate-950 border-2 border-emerald-900/50 rounded-lg py-4 ps-12 pe-4 text-white focus:outline-none focus:border-emerald-500 text-2xl font-bold transition-colors"
                  placeholder="0.00"
                />
              </div>
              <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                <AlertCircle size={12} /> أَدخل المبلغ الإجمالي المتواجد في درج النقود حالياً.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">{t('eod.notes')}</label>
              <textarea 
                value={notes} 
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-4 text-white focus:outline-none focus:border-blue-500"
                rows="3"
                placeholder="ملاحظات حول الإغلاق أو فوارق الدرج..."
              ></textarea>
            </div>
          </div>

          <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 flex flex-col justify-center">
            <div className="text-center mb-8">
              <h3 className="text-slate-400 mb-2">{t('eod.today_sales')}</h3>
              <p className={`text-5xl font-bold ${todaySales > 0 ? 'text-emerald-400' : todaySales < 0 ? 'text-red-500' : 'text-slate-300'}`}>
                {todaySales > 0 ? '+' : ''}{todaySales.toLocaleString()} <span className="text-2xl text-slate-500">{t('currency')}</span>
              </p>
            </div>
            
            <button 
              type="submit"
              disabled={actualAmount === ''}
              className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition duration-200 flex justify-center items-center gap-2 text-lg shadow-lg shadow-red-900/20"
            >
              <Lock size={24} /> {t('eod.save_btn')}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}