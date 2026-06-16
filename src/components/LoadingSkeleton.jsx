import React from 'react';

export const CardSkeleton = () => {
  return (
    <div className="glass-card p-6 rounded-2xl animate-pulse flex flex-col justify-between h-[150px]">
      <div className="flex items-center justify-between">
        <div className="h-4 w-24 bg-slate-300 dark:bg-slate-700 rounded" />
        <div className="h-10 w-10 bg-slate-300 dark:bg-slate-700 rounded-xl" />
      </div>
      <div className="space-y-2">
        <div className="h-8 w-20 bg-slate-300 dark:bg-slate-700 rounded" />
        <div className="h-3 w-32 bg-slate-300 dark:bg-slate-700 rounded" />
      </div>
    </div>
  );
};

export const TableSkeleton = ({ rows = 5 }) => {
  return (
    <div className="w-full space-y-4 animate-pulse">
      <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-lg w-full" />
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="flex gap-4 items-center">
          <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
          <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/6" />
          <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/12" />
          <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
          <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/12 ml-auto" />
        </div>
      ))}
    </div>
  );
};

export const ChartSkeleton = () => {
  return (
    <div className="glass-card p-6 rounded-2xl animate-pulse h-[350px] flex flex-col justify-between">
      <div className="h-5 w-40 bg-slate-300 dark:bg-slate-700 rounded" />
      <div className="flex items-end justify-between h-[240px] px-4">
        {[...Array(12)].map((_, i) => {
          const heights = ['h-16', 'h-32', 'h-24', 'h-48', 'h-40', 'h-56', 'h-20', 'h-36', 'h-28', 'h-52', 'h-44', 'h-60'];
          return (
            <div key={i} className={`w-6 ${heights[i % heights.length]} bg-slate-300 dark:bg-slate-700 rounded-t`} />
          );
        })}
      </div>
    </div>
  );
};

export const ProfileSkeleton = () => {
  return (
    <div className="glass-card p-8 rounded-2xl animate-pulse flex flex-col items-center">
      <div className="w-24 h-24 rounded-full bg-slate-300 dark:bg-slate-700 mb-4" />
      <div className="h-6 w-32 bg-slate-300 dark:bg-slate-700 rounded mb-2" />
      <div className="h-4 w-48 bg-slate-300 dark:bg-slate-700 rounded mb-6" />
      <div className="w-full space-y-4">
        <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-lg w-full" />
        <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-lg w-full" />
      </div>
    </div>
  );
};
