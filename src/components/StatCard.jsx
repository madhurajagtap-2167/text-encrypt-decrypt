import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, description, trend, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="glass-card p-6 rounded-2xl flex flex-col justify-between shadow-glassLight dark:shadow-glass relative overflow-hidden"
    >
      {/* Decorative background glow */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {title}
        </span>
        <div className="p-3 rounded-xl bg-gradient-to-tr from-primary/10 to-secondary/10 text-primary dark:text-primary-light border border-primary/20">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div>
        <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-1">
          {value}
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          {trend && (
            <span className={`font-semibold ${trend.positive ? 'text-emerald-500' : 'text-rose-500'}`}>
              {trend.label}
            </span>
          )}
          <span>{description}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
