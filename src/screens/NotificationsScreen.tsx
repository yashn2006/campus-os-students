import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScreenId, NotificationItem } from '../types';
import { ArrowLeft, CheckCheck, Bell, Clock, ArrowRight, Sparkles, Trash2 } from 'lucide-react';

interface NotificationsScreenProps {
  notifications: NotificationItem[];
  navigate: (screen: ScreenId) => void;
  onMarkAllAsRead: () => void;
}

const getCategoryStyle = (category: string) => {
  switch (category.toLowerCase()) {
    case 'attendance':
      return {
        bg: 'bg-[#EEF2FF] dark:bg-indigo-950/40',
        border: 'border-indigo-200 dark:border-indigo-800',
        badge: 'bg-[#6366F1] text-white',
        text: 'text-[#6366F1] dark:text-indigo-300',
      };
    case 'result':
    case 'results':
    case 'exam':
      return {
        bg: 'bg-[#FEF3C7] dark:bg-amber-950/40',
        border: 'border-amber-200 dark:border-amber-800',
        badge: 'bg-[#D97706] text-white',
        text: 'text-[#D97706] dark:text-amber-300',
      };
    case 'assignment':
    case 'assignments':
      return {
        bg: 'bg-[#F3E8FF] dark:bg-purple-950/40',
        border: 'border-purple-200 dark:border-purple-800',
        badge: 'bg-[#7C3AED] text-white',
        text: 'text-[#7C3AED] dark:text-purple-300',
      };
    case 'timetable':
    case 'class':
      return {
        bg: 'bg-[#E0F2FE] dark:bg-sky-950/40',
        border: 'border-sky-200 dark:border-sky-800',
        badge: 'bg-[#0284C7] text-white',
        text: 'text-[#0284C7] dark:text-sky-300',
      };
    default:
      return {
        bg: 'bg-[#F1F5F9] dark:bg-slate-800',
        border: 'border-slate-200 dark:border-slate-700',
        badge: 'bg-[#64748B] text-white',
        text: 'text-[#64748B] dark:text-slate-300',
      };
  }
};

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  notifications: initialNotifications,
  navigate,
  onMarkAllAsRead,
}) => {
  const [items, setItems] = useState<NotificationItem[]>(initialNotifications);
  const [dismissedCount, setDismissedCount] = useState(0);

  const dateGroups: ('TODAY' | 'YESTERDAY' | 'EARLIER THIS WEEK')[] = [
    'TODAY',
    'YESTERDAY',
    'EARLIER THIS WEEK',
  ];

  const handleDismiss = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setDismissedCount((prev) => prev + 1);
  };

  return (
    <div className="space-y-6 pb-28 max-w-2xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="flex justify-between items-center pt-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('home')}
            className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 flex items-center justify-center text-[#0F172A] dark:text-white hover:bg-slate-50 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-black text-[#0F172A] dark:text-white tracking-tight">
              Inbox & Activity Alerts
            </h1>
            <p className="text-xs text-[#64748B] dark:text-slate-400 font-medium">
              Swipe card left/right to dismiss
            </p>
          </div>
        </div>

        <button
          onClick={onMarkAllAsRead}
          className="text-xs font-bold text-[#6366F1] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <CheckCheck className="w-4 h-4" />
          <span>Mark All Read</span>
        </button>
      </div>

      {dismissedCount > 0 && (
        <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-2.5 rounded-xl text-center text-xs font-bold text-emerald-700 dark:text-emerald-300">
          ✓ Dismissed {dismissedCount} notification{dismissedCount > 1 ? 's' : ''}
        </div>
      )}

      {/* Date Groups */}
      <div className="space-y-6">
        {dateGroups.map((group) => {
          const groupNotifs = items.filter((n) => n.dateGroup === group);
          if (groupNotifs.length === 0) return null;

          return (
            <div key={group} className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-widest text-[#64748B] dark:text-slate-400">
                {group}
              </h3>

              <div className="space-y-3">
                <AnimatePresence>
                  {groupNotifs.map((n) => {
                    const style = getCategoryStyle(n.category);

                    return (
                      <motion.div
                        key={n.id}
                        layout
                        initial={{ opacity: 0, height: 'auto' }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, x: -300, height: 0, marginBottom: 0 }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.6}
                        onDragEnd={(_, info) => {
                          if (Math.abs(info.offset.x) > 120) {
                            handleDismiss(n.id);
                          }
                        }}
                        className="relative group touch-pan-y"
                      >
                        {/* Background Dismiss Trash Indicator */}
                        <div className="absolute inset-0 bg-rose-500/10 rounded-2xl flex items-center justify-between px-6 text-rose-500 font-extrabold text-xs">
                          <div className="flex items-center gap-1">
                            <Trash2 className="w-4 h-4" />
                            <span>Dismiss</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span>Dismiss</span>
                            <Trash2 className="w-4 h-4" />
                          </div>
                        </div>

                        <div
                          onClick={() => {
                            if (n.actionScreen) {
                              navigate(n.actionScreen);
                            }
                          }}
                          className={`p-4.5 rounded-2xl border transition-all cursor-pointer relative shadow-2xs hover:shadow-md ${
                            n.isUnread
                              ? `${style.bg} ${style.border} ring-1 ring-indigo-500/20`
                              : 'bg-white dark:bg-slate-900 border-[#E2E8F0] dark:border-slate-800 opacity-90'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2">
                              {n.isUnread && (
                                <span className="w-2.5 h-2.5 rounded-full bg-[#6366F1] animate-pulse"></span>
                              )}
                              <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${style.badge}`}>
                                {n.category}
                              </span>
                            </div>
                            <span className="text-[10px] text-[#64748B] dark:text-slate-400 font-extrabold">{n.timestamp}</span>
                          </div>

                          <h4 className="text-[15px] font-black text-[#0F172A] dark:text-white mt-2 leading-snug">
                            {n.title}
                          </h4>
                          <p className="text-xs text-[#475569] dark:text-slate-300 mt-1 leading-relaxed font-medium">
                            {n.message}
                          </p>

                          {n.actionScreen && (
                            <div className="mt-3 flex justify-end">
                              <span className={`text-[11px] font-extrabold ${style.text} hover:underline flex items-center gap-1`}>
                                <span>View Details</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
