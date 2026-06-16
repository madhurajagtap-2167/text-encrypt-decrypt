import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import {
  FiSettings,
  FiSun,
  FiMoon,
  FiTrash2,
  FiAlertTriangle,
  FiCheck,
  FiInfo
} from 'react-icons/fi';
import { motion } from 'framer-motion';

const SettingsPage = () => {
  const { deleteAccount } = useAuth();
  const { theme, setTheme } = useTheme();

  const handleThemeSelect = (mode) => {
    setTheme(mode);
  };

  const handleDeleteAccount = async () => {
    const confirmation1 = window.confirm(
      'WARNING: This is a permanent action. Are you sure you want to delete your CipherVault account?'
    );
    if (!confirmation1) return;

    const confirmation2 = window.confirm(
      'FINAL CONFIRMATION: This will delete your profile AND erase all encryption/decryption history records from our database. There is no recovery. Proceed?'
    );
    if (!confirmation2) return;

    try {
      await deleteAccount();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl space-y-8"
    >
      
      {/* Theme preferences card */}
      <div className="glass-card p-6 lg:p-8 rounded-3xl shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 text-primary rounded-2xl border border-primary/20"><FiSettings className="w-5 h-5"/></div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Application Theme</h2>
            <p className="text-xs text-slate-400">Configure visual layout preferences</p>
          </div>
        </div>

        {/* Choice cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Light Theme Card */}
          <div
            onClick={() => handleThemeSelect('light')}
            className={`p-5 rounded-2xl border cursor-pointer flex items-center justify-between group transition-all duration-200 ${
              theme === 'light'
                ? 'bg-primary/5 border-primary dark:border-primary-light shadow-sm text-primary dark:text-primary-light'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className={`p-2.5 rounded-xl transition-colors ${
                theme === 'light' ? 'bg-primary/10 text-primary' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
              }`}>
                <FiSun className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">Light Mode</h4>
                <p className="text-[10px] text-slate-400 font-medium">Clean, bright interface</p>
              </div>
            </div>
            {theme === 'light' && (
              <div className="w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center"><FiCheck className="w-3.5 h-3.5" /></div>
            )}
          </div>

          {/* Dark Theme Card */}
          <div
            onClick={() => handleThemeSelect('dark')}
            className={`p-5 rounded-2xl border cursor-pointer flex items-center justify-between group transition-all duration-200 ${
              theme === 'dark'
                ? 'bg-secondary/5 border-secondary dark:border-secondary-light shadow-sm text-secondary dark:text-secondary-light'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className={`p-2.5 rounded-xl transition-colors ${
                theme === 'dark' ? 'bg-secondary/10 text-secondary' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
              }`}>
                <FiMoon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">Dark Mode</h4>
                <p className="text-[10px] text-slate-400 font-medium">Deep slate background colors</p>
              </div>
            </div>
            {theme === 'dark' && (
              <div className="w-5 h-5 bg-secondary text-white rounded-full flex items-center justify-center"><FiCheck className="w-3.5 h-3.5" /></div>
            )}
          </div>

        </div>

        <div className="p-4 bg-slate-100/40 dark:bg-slate-800/30 rounded-2xl border border-slate-200/20 dark:border-slate-700/20 flex gap-3 text-xs text-slate-500 dark:text-slate-400">
          <FiInfo className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <p>Visual settings sync instantly on client render loops without reloading the app page.</p>
        </div>

      </div>

      {/* Danger Zone */}
      <div className="glass-card p-6 lg:p-8 rounded-3xl border border-rose-500/10 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-rose-500/10 text-rose-500 rounded-2xl border border-rose-500/20"><FiAlertTriangle className="w-5 h-5"/></div>
          <div>
            <h2 className="text-lg font-bold text-rose-600 dark:text-rose-400">Danger Zone</h2>
            <p className="text-xs text-slate-400">Irreversible account modifications</p>
          </div>
        </div>

        <div className="p-5 bg-rose-500/5 rounded-2xl border border-rose-500/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Delete Account Permanently</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
              Erase your user record, credentials, and all transaction history logs from MongoDB. This action is irreversible.
            </p>
          </div>
          
          <button
            onClick={handleDeleteAccount}
            className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-sm hover:shadow-rose-600/20 hover:scale-[1.01] active:scale-[0.99] transition-all focus:outline-none"
          >
            <FiTrash2 className="w-4 h-4"/>
            <span>Delete Account</span>
          </button>
        </div>
      </div>

    </motion.div>
  );
};

export default SettingsPage;
