import React from 'react';
import { ScreenId } from '../types';
import {
  FileText,
  Calendar,
  BookOpen,
  BarChart2,
  CheckCircle2,
  Edit3,
} from 'lucide-react';

interface QuickActionGridProps {
  navigate: (screen: ScreenId) => void;
  openScanner: () => void;
}

export const QuickActionGrid: React.FC<QuickActionGridProps> = ({ navigate }) => {
  const actions = [
    {
      id: 'timetable',
      label: 'Timetable',
      icon: <Calendar className="w-5 h-5 text-sky-500 dark:text-sky-400 stroke-[2.2]" />,
      bg: 'bg-sky-50 dark:bg-sky-950/70 border border-sky-200/60 dark:border-sky-800/60 shadow-sky-500/10',
      screen: 'timetable' as ScreenId,
    },
    {
      id: 'assignments',
      label: 'Assignments',
      icon: <FileText className="w-5 h-5 text-rose-500 dark:text-rose-400 stroke-[2.2]" />,
      bg: 'bg-rose-50 dark:bg-rose-950/70 border border-rose-200/60 dark:border-rose-800/60 shadow-rose-500/10',
      screen: 'assignments' as ScreenId,
    },
    {
      id: 'library',
      label: 'Library',
      icon: <BookOpen className="w-5 h-5 text-indigo-500 dark:text-indigo-400 stroke-[2.2]" />,
      bg: 'bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200/60 dark:border-indigo-800/60 shadow-indigo-500/10',
      screen: 'library' as ScreenId,
    },
    {
      id: 'attendance',
      label: 'Attendance',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400 stroke-[2.2]" />,
      bg: 'bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200/60 dark:border-emerald-800/60 shadow-emerald-500/10',
      screen: 'live_attendance' as ScreenId,
    },
    {
      id: 'grades',
      label: 'Grades',
      icon: <BarChart2 className="w-5 h-5 text-amber-500 dark:text-amber-400 stroke-[2.2]" />,
      bg: 'bg-amber-50 dark:bg-amber-950/70 border border-amber-200/60 dark:border-amber-800/60 shadow-amber-500/10',
      screen: 'results' as ScreenId,
    },
  ];

  return (
    <section className="my-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-3 px-0.5">
        <h2 className="text-[15px] sm:text-[16px] font-black text-[#0F172A] dark:text-white tracking-tight">
          Quick Access
        </h2>
        <button
          onClick={() => navigate('settings')}
          className="text-[12px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer flex items-center gap-1"
        >
          <Edit3 className="w-3 h-3" />
          <span>Edit</span>
        </button>
      </div>

      {/* 5-Column Grid Row */}
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {actions.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.screen)}
            className="flex flex-col items-center gap-1.5 group active:scale-95 transition-all cursor-pointer"
          >
            <div
              className={`w-12 h-12 sm:w-13 sm:h-13 ${item.bg} rounded-2xl flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform backdrop-blur-md`}
            >
              {item.icon}
            </div>
            <span className="text-[10.5px] font-bold text-slate-700 dark:text-slate-200 tracking-tight truncate w-full text-center">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};
