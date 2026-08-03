import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, LayoutGrid, Box, Store, ArrowRight, ArrowLeft } from 'lucide-react';

// ==========================================
// 1. مولد بيانات الهايبر ماركت الوهمية
// (تم تعديله ليعتمد على مفاتيح الترجمة بدلاً من النصوص الثابتة)
// ==========================================
const generateHugeDatabase = () => {
  const zonesConfig = [
    { id: 'Z_FOOD', tKey: 'food', count: 80 },
    { id: 'Z_FRESH', tKey: 'fresh', count: 40 },
    { id: 'Z_CLEAN', tKey: 'cleaning', count: 60 },
    { id: 'Z_ELEC', tKey: 'electronics', count: 30 },
    { id: 'Z_CLOTH', tKey: 'clothing', count: 50 },
    { id: 'Z_BEAUTY', tKey: 'beauty', count: 60 },
  ];

  let allShelves = [];
  
  zonesConfig.forEach(zone => {
    for (let i = 1; i <= zone.count; i++) {
      const capacity = Math.floor(Math.random() * 200) + 50;
      const currentStock = Math.floor(Math.random() * capacity); 
      
      let status = 'good';
      if (currentStock === 0) status = 'empty';
      else if ((currentStock / capacity) < 0.3) status = 'low';

      allShelves.push({
        id: `${zone.id}_S${i}`,
        zoneId: zone.id,
        zoneKey: zone.tKey,
        num: i,
        aisle: Math.ceil(i/10),
        type: zone.id === 'Z_FRESH' ? 'fridge' : 'shelf',
        capacity,
        currentStock,
        status
      });
    }
  });
  
  return { zonesConfig, shelves: allShelves };
};

const HYPE_DATA = generateHugeDatabase();

export default function StoreMap() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  const [db, setDb] = useState(HYPE_DATA.shelves);
  const [activeZone, setActiveZone] = useState(null); 
  const [searchQuery, setSearchQuery] = useState('');

  // ==========================================
  // العمليات الحسابية
  // ==========================================
  
  const zoneStats = useMemo(() => {
    const stats = {};
    HYPE_DATA.zonesConfig.forEach(z => {
      const zoneShelves = db.filter(s => s.zoneId === z.id);
      stats[z.id] = {
        total: zoneShelves.length,
        empty: zoneShelves.filter(s => s.status === 'empty').length,
        low: zoneShelves.filter(s => s.status === 'low').length,
        good: zoneShelves.filter(s => s.status === 'good').length,
      };
    });
    return stats;
  }, [db]);

  const displayedShelves = useMemo(() => {
    let filtered = db;
    if (activeZone) {
      filtered = filtered.filter(s => s.zoneId === activeZone.id);
    }
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(s => 
        s.id.toLowerCase().includes(lowerQuery) || 
        t(`storeMap.shelfName`, { num: s.num, aisle: s.aisle }).toLowerCase().includes(lowerQuery)
      );
    }
    return filtered;
  }, [db, activeZone, searchQuery, t]);

  return (
    <div className="min-h-screen bg-slate-950 p-6 font-sans text-slate-200" dir={i18n.dir()}>
      
      {/* الترويسة وشريط البحث */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Store className="text-blue-500" size={36} /> {t('storeMap.title')} 
          </h1>
          <p className="text-slate-500">{t('storeMap.subtitle', { count: db.length })}</p>
        </div>

        <div className="relative w-full md:w-96">
          <input 
            type="text" 
            placeholder={t('storeMap.searchPlaceholder')} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full bg-slate-900 border border-slate-700 rounded-xl py-3 text-white focus:outline-none focus:border-blue-500 transition-colors ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'}`}
          />
          <Search className={`absolute top-3.5 text-slate-500 ${isRTL ? 'right-4' : 'left-4'}`} size={20} />
        </div>
      </div>

      {/* الشاشة الأولى: الأقسام الكبرى */}
      {!activeZone && !searchQuery && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HYPE_DATA.zonesConfig.map(zone => {
            const stats = zoneStats[zone.id];
            const hasIssues = stats.empty > 0 || stats.low > 0;
            
            return (
              <div 
                key={zone.id} 
                onClick={() => setActiveZone(zone)}
                className={`cursor-pointer rounded-2xl p-6 border-2 transition-all hover:scale-[1.02] ${
                  hasIssues ? 'bg-slate-900 border-amber-500/50 hover:border-amber-500' : 'bg-slate-900 border-slate-700 hover:border-blue-500'
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-white">{t(`storeMap.zones.${zone.tKey}`)}</h3>
                  <LayoutGrid className="text-slate-500" />
                </div>
                
                <div className="grid grid-cols-3 gap-2 mt-6">
                  <div className="bg-slate-950 p-3 rounded-lg text-center border border-emerald-900/50">
                    <p className="text-emerald-500 text-2xl font-black">{stats.good}</p>
                    <p className="text-xs text-slate-500">{t('storeMap.status.good')}</p>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg text-center border border-amber-900/50">
                    <p className="text-amber-500 text-2xl font-black">{stats.low}</p>
                    <p className="text-xs text-slate-500">{t('storeMap.status.low')}</p>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg text-center border border-red-900/50 relative overflow-hidden">
                    {stats.empty > 0 && <div className="absolute inset-0 bg-red-500/20 animate-pulse"></div>}
                    <p className="text-red-500 text-2xl font-black relative z-10">{stats.empty}</p>
                    <p className="text-xs text-slate-500 relative z-10">{t('storeMap.status.empty')}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* الشاشة الثانية: الرفوف داخل القسم */}
      {(activeZone || searchQuery) && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
          
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => { setActiveZone(null); setSearchQuery(''); }}
                className="bg-slate-800 p-2 rounded-lg hover:bg-slate-700 text-white transition-colors"
              >
                {isRTL ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
              </button>
              <h2 className="text-2xl font-bold text-white">
                {searchQuery ? t('storeMap.searchResults') : t(`storeMap.zones.${activeZone?.tKey}`)}
              </h2>
            </div>
            <span className="text-slate-400 text-sm">
              {t('storeMap.showingShelves', { count: displayedShelves.length })}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {displayedShelves.map((shelf) => {
              let colors = 'bg-slate-800 border-slate-700 text-slate-400';
              if (shelf.status === 'empty') colors = 'bg-red-950 border-red-500 text-red-400';
              if (shelf.status === 'low') colors = 'bg-amber-950 border-amber-500 text-amber-400';
              if (shelf.status === 'good') colors = 'bg-emerald-950 border-emerald-500 text-emerald-400';

              return (
                <div 
                  key={shelf.id}
                  className={`cursor-pointer rounded-xl p-3 border-2 transition-all hover:scale-105 flex flex-col items-center text-center relative overflow-hidden ${colors}`}
                >
                  <Box size={24} className="mb-2 opacity-70" />
                  <h3 className="font-bold text-xs truncate w-full">
                    {t('storeMap.shelfName', { num: shelf.num, aisle: shelf.aisle })}
                  </h3>
                  <p className="text-[10px] opacity-70 mt-1" dir="ltr">{shelf.currentStock} / {shelf.capacity}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}