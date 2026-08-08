import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'card' | 'line' | 'avatar' | 'chart' | 'banner';
}

export const SkeletonLoader: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'card',
}) => {
  if (variant === 'avatar') {
    return (
      <div
        className={`w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse shrink-0 ${className}`}
      />
    );
  }

  if (variant === 'line') {
    return (
      <div
        className={`h-4 bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse ${className}`}
      />
    );
  }

  if (variant === 'chart') {
    return (
      <div className={`p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-2xs ${className}`}>
        <div className="flex justify-between items-center">
          <div className="w-32 h-5 bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse" />
          <div className="w-16 h-4 bg-slate-200 dark:bg-slate-800 rounded-full animate-pulse" />
        </div>
        <div className="h-40 w-full bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 dark:from-slate-800/80 dark:via-slate-800 dark:to-slate-800/80 rounded-xl animate-pulse flex items-end justify-between p-4 gap-2">
          <div className="w-full bg-slate-300 dark:bg-slate-700 rounded-t-lg h-[40%]" />
          <div className="w-full bg-slate-300 dark:bg-slate-700 rounded-t-lg h-[80%]" />
          <div className="w-full bg-slate-300 dark:bg-slate-700 rounded-t-lg h-[60%]" />
          <div className="w-full bg-slate-300 dark:bg-slate-700 rounded-t-lg h-[95%]" />
          <div className="w-full bg-slate-300 dark:bg-slate-700 rounded-t-lg h-[50%]" />
        </div>
      </div>
    );
  }

  if (variant === 'banner') {
    return (
      <div className={`h-28 w-full bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-800/60 dark:to-slate-800 rounded-2xl animate-pulse ${className}`} />
    );
  }

  return (
    <div
      className={`p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-2xs ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
        <div className="space-y-1.5 flex-1">
          <div className="w-2/3 h-4 bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse" />
          <div className="w-1/3 h-3 bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse" />
        </div>
      </div>
      <div className="w-full h-12 bg-slate-100 dark:bg-slate-800/60 rounded-xl animate-pulse" />
    </div>
  );
};
