import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, UserPlus, Trash2, Users, Key, AlertCircle } from 'lucide-react';
import useAuthStore from '../store/authStore';

export default function Settings() {
  const { t } = useTranslation();
  const currentUser = useAuthStore(state => state.user);
  
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('cashier'); // الافتراضي هو كاشير
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      if (window.api && window.api.getUsers) {
        const data = await window.api.getUsers();
        setUsers(data);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('يرجى إدخال اسم المستخدم وكلمة المرور');
      return;
    }

    try {
      if (window.api && window.api.addUser) {
        const res = await window.api.addUser({ username, password, role });
        if (res.success) {
          setUsername('');
          setPassword('');
          setRole('cashier');
          fetchUsers();
        } else {
          setError(res.message || 'حدث خطأ أثناء إضافة المستخدم');
        }
      }
    } catch (err) {
      setError('خطأ في الاتصال بقاعدة البيانات');
    }
  };

  const handleDeleteUser = async (id, name) => {
    if (name === 'admin' || name === currentUser?.username) {
      alert('لا يمكنك حذف حسابك الحالي أو حساب المدير الأساسي.');
      return;
    }
    
    if (window.confirm(`هل أنت متأكد من حذف حساب (${name})؟`)) {
      try {
        if (window.api && window.api.deleteUser) {
          const res = await window.api.deleteUser(id);
          if (res.success) {
            fetchUsers();
          } else {
            alert(res.error || 'حدث خطأ أثناء الحذف');
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  // حماية الصفحة: لا نسمح بدخول غير المدير
  if (currentUser?.role !== 'admin' && currentUser?.role !== 'superadmin') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-red-500 text-xl font-bold gap-3">
        <AlertCircle size={32} /> عذراً، ليس لديك صلاحية للوصول إلى هذه الصفحة.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Shield className="text-blue-500" /> إدارة الحسابات والصلاحيات
        </h1>
        <p className="text-slate-500">إضافة وتعديل حسابات النظام (كاشير / مدير)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* فورم إضافة مستخدم جديد */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <UserPlus size={20} className="text-emerald-500" /> مستخدم جديد
            </h2>
            
            {error && (
              <div className="bg-red-900/30 border border-red-500/50 text-red-400 p-3 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">اسم المستخدم</label>
                <div className="relative">
                  <Users size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 ps-10 pe-4 text-white focus:outline-none focus:border-blue-500"
                    placeholder="مثال: cashier1"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">كلمة المرور</label>
                <div className="relative">
                  <Key size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 ps-10 pe-4 text-white focus:outline-none focus:border-blue-500"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">الصلاحية (الرتبة)</label>
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="cashier">كاشير (صلاحيات محدودة)</option>
                  <option value="admin">مدير (صلاحيات كاملة)</option>
                </select>
              </div>

              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors mt-4">
                إضافة الحساب
              </button>
            </form>
          </div>
        </div>

        {/* جدول المستخدمين */}
        <div className="lg:col-span-2">
          <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg overflow-hidden">
            {isLoading ? (
              <div className="p-8 text-center text-slate-500">جاري التحميل...</div>
            ) : (
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-400 bg-slate-950/50 uppercase border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-4 text-start">اسم المستخدم</th>
                    <th className="px-6 py-4 text-start">الرتبة</th>
                    <th className="px-6 py-4 text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                      <td className="px-6 py-4 font-medium text-white text-start flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${u.role === 'admin' ? 'bg-blue-900/50 text-blue-400' : 'bg-emerald-900/50 text-emerald-400'}`}>
                          {u.username.charAt(0).toUpperCase()}
                        </div>
                        {u.username}
                      </td>
                      <td className="px-6 py-4 text-start">
                        {u.role === 'admin' ? (
                          <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs font-medium border border-blue-500/20">مدير عام</span>
                        ) : (
                          <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-medium border border-emerald-500/20">كاشير</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={() => handleDeleteUser(u.id, u.username)}
                          disabled={u.username === 'admin' || u.username === currentUser?.username}
                          className="text-slate-500 hover:text-red-500 disabled:opacity-30 disabled:hover:text-slate-500 transition-colors"
                          title="حذف الحساب"
                        >
                          <Trash2 size={18} className="mx-auto" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan="3" className="px-6 py-8 text-center text-slate-500">لا يوجد مستخدمين.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}