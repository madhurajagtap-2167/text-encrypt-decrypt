import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import StatCard from '../components/StatCard.jsx';
import { CardSkeleton } from '../components/LoadingSkeleton.jsx';
import {
  FiLock,
  FiUnlock,
  FiActivity,
  FiDatabase,
  FiArrowRight,
  FiCpu,
  FiClock,
  FiShield
} from 'react-icons/fi';
import { motion } from 'framer-motion';

const DashboardPage = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEncryptions: 0,
    totalDecryptions: 0,
    mostUsedCipher: 'None',
    totalRecords: 0
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const res = await api.get('/history');
        if (res.data.success) {
          const logs = res.data.history;
          setHistory(logs);

          // Calculate statistics
          const encCount = logs.filter((log) => log.actionType === 'encrypt').length;
          const decCount = logs.filter((log) => log.actionType === 'decrypt').length;

          // Deduce most used cipher
          const cipherCounts = {};
          logs.forEach((log) => {
            cipherCounts[log.cipherType] = (cipherCounts[log.cipherType] || 0) + 1;
          });

          let mostUsed = 'None';
          let maxCount = 0;
          Object.keys(cipherCounts).forEach((key) => {
            if (cipherCounts[key] > maxCount) {
              maxCount = cipherCounts[key];
              mostUsed = key;
            }
          });

          setStats({
            totalEncryptions: encCount,
            totalDecryptions: decCount,
            mostUsedCipher: mostUsed,
            totalRecords: logs.length
          });
        }
      } catch (error) {
        console.error('Failed to load dashboard data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Welcome Banner */}
      <motion.div
        variants={itemVariants}
        className="glass-panel p-6 lg:p-8 rounded-3xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm border border-white/20"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-2 relative z-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl">
            Securely perform real-time text encryptions, decode existing messages, and analyze layout frequencies in one workspace.
          </p>
        </div>
        <Link
          to="/cipher"
          className="relative z-10 shrink-0 self-start md:self-center px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 group"
        >
          <span>Encrypt New Text</span>
          <FiArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : (
          <>
            <StatCard
              title="Total Encryptions"
              value={stats.totalEncryptions}
              icon={FiLock}
              description="Actions registered"
              delay={0}
            />
            <StatCard
              title="Total Decryptions"
              value={stats.totalDecryptions}
              icon={FiUnlock}
              description="Texts decrypted"
              delay={0.1}
            />
            <StatCard
              title="Most Used Cipher"
              value={stats.mostUsedCipher}
              icon={FiCpu}
              description="Preferred algorithm"
              delay={0.2}
            />
            <StatCard
              title="History Records"
              value={stats.totalRecords}
              icon={FiDatabase}
              description="Stored in secure logs"
              delay={0.3}
            />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Quick Tools Access Widget */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-1 glass-card p-6 rounded-2xl flex flex-col justify-between shadow-sm"
        >
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Workspace Shortcuts</h3>
            <p className="text-xs text-slate-400">Jump directly into the workspace panels</p>
            <div className="space-y-3 pt-2">
              <Link
                to="/cipher"
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/50 dark:hover:bg-slate-800 border border-slate-200/40 dark:border-slate-800/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 text-primary rounded-lg"><FiShield /></div>
                  <span className="text-sm font-semibold">Cipher Workbench</span>
                </div>
                <FiChevronRight className="text-slate-400" />
              </Link>
              <Link
                to="/analytics"
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/50 dark:hover:bg-slate-800 border border-slate-200/40 dark:border-slate-800/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary/10 text-secondary rounded-lg"><FiActivity /></div>
                  <span className="text-sm font-semibold">Frequency Analyzer</span>
                </div>
                <FiChevronRight className="text-slate-400" />
              </Link>
              <Link
                to="/history"
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/50 dark:hover:bg-slate-800 border border-slate-200/40 dark:border-slate-800/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/10 text-accent rounded-lg"><FiClock /></div>
                  <span className="text-sm font-semibold">Vault Logs Management</span>
                </div>
                <FiChevronRight className="text-slate-400" />
              </Link>
            </div>
          </div>
          <div className="pt-6 border-t border-slate-200/50 dark:border-slate-800/50 text-[11px] text-slate-400 font-medium">
            Status: Fully Sync'd with MongoDB Atlas
          </div>
        </motion.div>

        {/* Recent Activity List */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 glass-card p-6 rounded-2xl shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Activity Logs</h3>
              <Link to="/history" className="text-xs font-bold text-primary dark:text-primary-light hover:underline flex items-center gap-1">
                <span>View All Logs</span>
                <FiArrowRight />
              </Link>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-14 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-xl" />
                ))}
              </div>
            ) : history.length === 0 ? (
              <div className="py-12 text-center text-slate-400 flex flex-col items-center justify-center gap-2">
                <FiClock className="w-8 h-8 opacity-40" />
                <p className="text-sm font-semibold">No recent crypt events registered.</p>
                <p className="text-xs text-slate-500">Run an encryption/decryption on the cipher workbench.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {history.slice(0, 4).map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-100/40 dark:bg-slate-800/30 border border-slate-200/30 dark:border-slate-800/30 hover:bg-slate-100/80 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className={`p-2.5 rounded-xl shrink-0 ${
                        item.actionType === 'encrypt'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                          : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20'
                      }`}>
                        {item.actionType === 'encrypt' ? <FiLock className="w-4 h-4" /> : <FiUnlock className="w-4 h-4" />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-800 dark:text-white truncate max-w-[200px] sm:max-w-[320px]">
                          {item.originalText}
                        </p>
                        <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <span className="font-semibold text-slate-500 dark:text-slate-400">{item.cipherType}</span>
                          <span>•</span>
                          <span>{new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </p>
                      </div>
                    </div>
                    
                    <span className={`text-[10px] uppercase font-extrabold px-2.5 py-1 rounded-full ${
                      item.actionType === 'encrypt'
                        ? 'bg-emerald-500/10 text-emerald-600'
                        : 'bg-indigo-500/10 text-indigo-600'
                    }`}>
                      {item.actionType}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="pt-6 mt-6 border-t border-slate-200/50 dark:border-slate-800/50 text-[10px] text-slate-400">
            Vault data uses AES compatible key mapping references.
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};

// Simple Chevron Helper to prevent build failure if react-icons doesn't export it
const FiChevronRight = (props) => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

export default DashboardPage;
