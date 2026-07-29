import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, UserPlus, Trash2, Users, Key, AlertCircle, Save, Upload } from 'lucide-react';
import useAuthStore from '../store/authStore';
import Modal from './ui/Modal';

export default function UsersManagement() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const currentUser = useAuthStore(state => state.user);
  
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('cashier');
  
  const [userToDelete, setUserToDelete] = useState(null); 
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false); // مودال استعادة النسخة
  
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

  useEffect(() => { fetchUsers(); }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    setError('');
    if (!username || !password) { setError(t('settings.errorFillFields')); return; }
    try {
      if (window.api && window.api.addUser) {
        const res = await window.api.addUser({ username, password, role });
        if (res.success) {
          setUsername(''); setPassword(''); setRole('cashier');
          fetchUsers();
        } else {
          setError(res.message || t('settings.addError'));
        }
      }
    } catch (err) { setError(t('settings.addError')); }
  };

  const handleDeleteUserClick = (id, name) => {
    if (name === 'admin' || name === currentUser?.username) {
      alert(t('settings.deleteAlert')); 
      setTimeout(() => window.focus(), 100);
      return;
    }
    setUserToDelete({ id, name }); 
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    try {
      if (window.api && window.api.deleteUser) {
        const res = await window.api.deleteUser(userToDelete.id);
        if (res.success) {
          if (res.isSoftDeleted) {
              alert(t('hr.employees.softDeleted', 'تم تعطيل الحساب لحماية سجلاته المالية.')); 
              setTimeout(() => window.focus(), 100);
          }
          fetchUsers();
        } else { 
            alert(res.error || t('settings.deleteError')); 
            setTimeout(() => window.focus(), 100);
        }
      }
    } catch (err) { console.error(err); }
    setUserToDelete(null); 
  };

  if (currentUser?.role !== 'admin' && currentUser?.role !== 'superadmin') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-red-500 text-xl font-bold gap-3">
        <AlertCircle size={32} /> {t('settings.accessDenied')}
      </div>
    );
  }

  const handleBackup = async () => {
    try {
      const result = await window.api.backupDatabase();
      if (result.success) { 
          alert(t('database.messages.backupSuccess')); 
      } 
      else if (!result.canceled) { 
          alert(t('database.messages.error') + "\n" + (result.error || '')); 
      }
    } catch (error) { 
        alert(t('database.messages.error')); 
    }
    setTimeout(() => window.focus(), 100); 
  };

  const confirmRestore = async () => {
      setIsRestoreModalOpen(false);
      try {
        const result = await window.api.restoreDatabase();
        if (result.success) { 
            alert(t('database.messages.restoreSuccess')); 
        } 
        else if (!result.canceled) { 
            alert(t('database.messages.error') + "\n" + (result.error || '')); 
        }
      } catch (error) { 
          alert(t('database.messages.error')); 
      }
      setTimeout(() => window.focus(), 100); 
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-6 font-sans text-start">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Shield className="text-blue-500" /> {t('settings.title')}
        </h1>
        <p className="text-slate-500">{t('settings.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-1">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <UserPlus size={20} className="text-emerald-500" /> {t('settings.newUser')}
            </h2>
            {error && <div className="bg-red-900/30 border border-red-500/50 text-red-400 p-3 rounded-lg mb-4 text-sm text-start">{error}</div>}

            <form onSubmit={handleAddUser} className="space-y-4 text-start">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">{t('settings.username')}</label>
                <div className="relative">
                  <Users size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 ps-10 pe-4 text-white focus:outline-none focus:border-blue-500 text-start" required />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">{t('settings.password')}</label>
                <div className="relative">
                  <Key size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 ps-10 pe-4 text-white focus:outline-none focus:border-blue-500 text-start" dir="ltr" required />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">{t('settings.role')}</label>
                <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-blue-500 text-start" dir={isRTL ? "rtl" : "ltr"}>
                  <option value="cashier">{t('hr.roles.cashier', 'بائع (كاشير)')}</option>
                  <option value="scale">{t('hr.roles.scale', 'عامل ميزان')}</option>
                  <option value="stock">{t('hr.roles.stock', 'ترتيبات')}</option>
                  <option value="admin">{t('hr.roles.admin', 'مدير عام')}</option>
                </select>
              </div>

              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors mt-4">
                {t('settings.addAccountBtn')}
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg overflow-hidden">
            {isLoading ? (
              <div className="p-8 text-center text-slate-500">{t('settings.loading')}</div>
            ) : (
              <table className="w-full text-sm text-start" dir={i18n.dir()}>
                <thead className="text-xs text-slate-400 bg-slate-950/50 uppercase border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-4 text-start">{t('settings.table.username')}</th>
                    <th className="px-6 py-4 text-start">{t('settings.table.role')}</th>
                    <th className="px-6 py-4 text-center">{t('settings.table.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                      <td className="px-6 py-4 font-medium text-white text-start flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${u.role === 'admin' || u.role === 'superadmin' ? 'bg-blue-900/50 text-blue-400' : 'bg-emerald-900/50 text-emerald-400'}`}>
                          {u.username.charAt(0).toUpperCase()}
                        </div>
                        <span dir="ltr">{u.username}</span>
                      </td>
                      <td className="px-6 py-4 text-start">
                         <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-xs font-medium border border-slate-700">
                            {t(`hr.roles.${u.role}`, u.role)}
                          </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={() => handleDeleteUserClick(u.id, u.username)}
                          disabled={u.username === 'admin' || u.username === currentUser?.username}
                          className="text-slate-500 hover:text-red-500 disabled:opacity-30 disabled:hover:text-slate-500 transition-colors"
                          title={t('settings.deleteTooltip')}
                        >
                          <Trash2 size={18} className="mx-auto" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr><td colSpan="3" className="px-6 py-8 text-center text-slate-500">{t('settings.noUsers')}</td></tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mt-6 lg:col-span-3">
          <h2 className="text-xl font-bold text-white mb-6 border-b border-slate-800 pb-4">
            {t('database.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-5 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-blue-500/10 rounded-full flex items-center justify-center mb-4"><Save className="text-blue-500" size={28} /></div>
              <h3 className="text-lg font-bold text-white mb-2">{t('database.backup')}</h3>
              <p className="text-sm text-slate-400 mb-6 flex-1">{t('database.backupDesc')}</p>
              <button onClick={handleBackup} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg transition-colors font-medium flex justify-center items-center gap-2">
                <Save size={18} />{t('database.backup')}
              </button>
            </div>
            <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-5 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-red-500/10 rounded-full flex items-center justify-center mb-4"><Upload className="text-red-500" size={28} /></div>
              <h3 className="text-lg font-bold text-white mb-2">{t('database.restore')}</h3>
              <p className="text-sm text-slate-400 mb-6 flex-1">{t('database.restoreDesc')}</p>
              <button onClick={() => setIsRestoreModalOpen(true)} className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg transition-colors font-medium flex justify-center items-center gap-2">
                <Upload size={18} />{t('database.restore')}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={!!userToDelete} onClose={() => setUserToDelete(null)} title={t('suppliers.actions.delete')}>
        <div className="p-4 text-start">
          <p className="text-white mb-6 text-lg">
            {t('settings.deleteConfirm', { name: userToDelete?.name })}
          </p>
          <div className="flex items-center justify-end gap-3 mt-4">
            <button onClick={() => setUserToDelete(null)} className="px-4 py-2 text-white bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
              {t('common.cancel')}
            </button>
            <button onClick={confirmDelete} className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors">
              {t('suppliers.actions.confirmDeleteBtn')}
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isRestoreModalOpen} onClose={() => setIsRestoreModalOpen(false)} title={t('database.restore')}>
        <div className="p-4 text-start">
          <div className="flex items-center gap-3 text-red-400 bg-red-950/30 p-4 rounded-lg border border-red-900 mb-6">
             <AlertCircle size={24} />
             <p className="font-bold">{t('database.messages.restoreConfirm')}</p>
          </div>
          <div className="flex items-center justify-end gap-3 mt-4">
            <button onClick={() => setIsRestoreModalOpen(false)} className="px-4 py-2 text-white bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
              {t('common.cancel')}
            </button>
            <button onClick={confirmRestore} className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors">
              {t('common.success', 'تأكيد العملية')}
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}