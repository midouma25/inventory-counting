import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Expenses from './components/pages/Expenses';
import Agenda from './components/pages/Agenda'; // استيراد صفحة الأجندة      
// Layout
import MainLayout from './components/layout/MainLayout';
 
// الصفحات الحقيقية التي قمنا ببنائها حتى الآن
import Dashboard from './components/pages/Dashboard';
import Suppliers from './components/pages/Suppliers';
import HR from './components/pages/HR';

// صفحات وهمية مؤقتة (Placeholders) لباقي الروابط حتى نقوم ببرمجتها

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* المسار الرئيسي يغلف كل الصفحات بـ MainLayout (الشريط الجانبي والعلوي) */}
        <Route path="/" element={<MainLayout />}>
          {/* صفحة البداية الافتراضية */}
          <Route index element={<Dashboard />} />
          
          {/* باقي الصفحات */}
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="hr" element={<HR />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="agenda" element={<Agenda />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;