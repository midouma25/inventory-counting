import React from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, AlertCircle, Users, Wallet, Plus } from 'lucide-react';

export default function Dashboard() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans">
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">{t('dashboard.title')}</h1>
          <p className="text-sm text-slate-500 mt-1">{t('dashboard.subtitle')}</p>
        </div>
        <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-slate-200 transition-colors">
          <Plus size={18} />
          <span>{t('dashboard.quickAction')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-slate-400">{t('dashboard.kpi.totalDebts')}</p>
              <h3 className="text-2xl font-bold text-white mt-1">450,000 DA</h3>
            </div>
            <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
              <TrendingUp size={20} />
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-red-900/30 p-5 rounded-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-slate-400">{t('dashboard.kpi.dueThisWeek')}</p>
              <h3 className="text-2xl font-bold text-red-400 mt-1">125,000 DA</h3>
            </div>
            <div className="p-2 bg-red-950/50 rounded-lg text-red-400">
              <AlertCircle size={20} />
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-slate-400">{t('dashboard.kpi.activeEmployees')}</p>
              <h3 className="text-2xl font-bold text-white mt-1">4 / 6</h3>
            </div>
            <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
              <Users size={20} />
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-slate-400">{t('dashboard.kpi.expenses')}</p>
              <h3 className="text-2xl font-bold text-white mt-1">32,000 DA</h3>
            </div>
            <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
              <Wallet size={20} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
        <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-xl p-5 min-h-[300px] flex flex-col">
          <h3 className="text-lg font-medium text-white mb-4">{t('dashboard.charts.topCreditors')}</h3>
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-slate-800 rounded-lg text-slate-500">
            {t('dashboard.charts.barPlaceholder')}
          </div>
        </div>

        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5 min-h-[300px] flex flex-col">
          <h3 className="text-lg font-medium text-white mb-4">{t('dashboard.charts.expensesDist')}</h3>
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-slate-800 rounded-lg text-slate-500">
            {t('dashboard.charts.piePlaceholder')}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h3 className="text-lg font-medium text-white mb-4">{t('dashboard.lists.urgentAlerts')}</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 border border-slate-800 rounded-lg hover:bg-slate-800/50 transition-colors">
              <div>
                <p className="font-medium text-white">ULTRA JOY Inc.</p>
                <p className="text-xs text-slate-500">Today at 14:00</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-red-400">39,390 DA</span>
                <button className="text-xs bg-slate-800 text-white px-3 py-1.5 rounded hover:bg-slate-700">
                  {t('dashboard.actions.payNow')}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h3 className="text-lg font-medium text-white mb-4">{t('dashboard.lists.recentAudit')}</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 border border-slate-800 rounded-lg">
              <div>
                <p className="text-sm font-medium text-white">Advance Recorded - Ahmed</p>
                <p className="text-xs text-slate-500">45 mins ago by Admin</p>
              </div>
              <span className="text-sm text-slate-400">- 2,000 DA</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}