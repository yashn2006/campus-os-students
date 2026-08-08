import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ScreenId, StudentProfile } from '../types';
import { Bell, Settings, Sun, Moon, WifiOff, Calendar, ChevronDown } from 'lucide-react';

interface HeaderProps {
  student: StudentProfile;
  activeScreen: ScreenId;
  navigate: (screen: ScreenId) => void;
  unreadNotificationsCount: number;
  isOffline: boolean;
  offlineQueueCount: number;
  isDarkMode: boolean;
  onToggleDarkMode: (e?: React.MouseEvent) => void;
}

export const Header: React.FC<HeaderProps> = ({
  student,
  activeScreen,
  navigate,
  unreadNotificationsCount,
  isOffline,
  offlineQueueCount,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const [selectedSem, setSelectedSem] = useState('Sem 6');
  const [isSemDropdownOpen, setIsSemDropdownOpen] = useState(false);

  if (['splash', 'welcome', 'login', 'otp', 'auth_loading', 'profile_setup', 'auth_success'].includes(activeScreen)) {
    return null;
  }

  const firstName = student.name.split(' ')[0] || 'Saad';
  const semesters = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'];

  return (
    <header className="sticky top-0 z-40 bg-[#F8FAFC]/95 dark:bg-[#0F172A]/95 backdrop-blur-2xl px-3.5 py-2.5 pt-safe-header flex justify-between items-center w-full transition-colors border-b border-slate-200/60 dark:border-slate-800/80">
      {/* Left: Avatar, Greeting & Semester Selector */}
      <div className="flex items-center gap-2.5">
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => navigate('profile')}
        >
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#6366F1] via-[#8B5CF6] to-[#06B6D4] text-white font-black text-xs flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform ring-2 ring-white dark:ring-slate-800">
              SP
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#22C55E] ring-2 ring-white dark:ring-slate-800 rounded-full"></span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <p className="text-[12.5px] font-semibold text-[#0F172A] dark:text-slate-100 leading-tight">
                Hi, <span className="font-extrabold text-[#0F172A] dark:text-white">{firstName} 👋</span>
              </p>
            </div>
            <p className="text-[10px] text-[#64748B] dark:text-slate-400 font-semibold truncate max-w-[120px]">
              {student.collegeName || 'SIES College'}
            </p>
          </div>
        </div>

        {/* Semester Selector Pill */}
        <div className="relative">
          <button
            onClick={() => setIsSemDropdownOpen(!isSemDropdownOpen)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/60 text-[#6366F1] dark:text-indigo-300 text-[10.5px] font-extrabold hover:bg-indigo-100/70 transition-colors cursor-pointer"
          >
            <span>{selectedSem}</span>
            <ChevronDown className="w-3 h-3 text-indigo-500" />
          </button>

          {isSemDropdownOpen && (
            <div className="absolute top-8 left-0 z-50 w-28 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 py-1 overflow-hidden animate-in fade-in zoom-in-95">
              {semesters.map((sem) => (
                <button
                  key={sem}
                  onClick={() => {
                    setSelectedSem(sem);
                    setIsSemDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer flex items-center justify-between ${
                    selectedSem === sem ? 'text-[#6366F1] font-bold bg-indigo-50/50 dark:bg-indigo-900/30' : 'text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <span>{sem}</span>
                  {selectedSem === sem && <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1]"></span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Actions: Offline, Calendar, Theme, Notifications, Settings */}
      <div className="flex items-center gap-1.5">
        {isOffline && (
          <div
            onClick={() => navigate('settings')}
            className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200 cursor-pointer animate-pulse"
          >
            <WifiOff className="w-3 h-3" />
            <span>Off ({offlineQueueCount})</span>
          </div>
        )}

        {/* Calendar Button */}
        <button
          onClick={() => navigate('timetable')}
          className="w-8.5 h-8.5 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-200 shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 transition-all cursor-pointer"
          title="Open Timetable / Calendar"
        >
          <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
        </button>

        {/* Physics-based Theme Toggle Button */}
        <motion.button
          onClick={(e) => onToggleDarkMode(e)}
          whileTap={{ scale: 0.88 }}
          animate={{ rotate: isDarkMode ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          className="w-8.5 h-8.5 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-200 shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer relative overflow-hidden"
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-indigo-600 dark:text-slate-300" />
          )}
        </motion.button>

        {/* Notifications Button */}
        <button
          onClick={() => navigate('notifications')}
          className="relative w-8.5 h-8.5 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-200 shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 transition-all cursor-pointer"
          title="Notifications"
        >
          <Bell className="w-4 h-4 text-slate-700 dark:text-slate-200" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#6366F1] text-white text-[9px] font-extrabold rounded-full flex items-center justify-center ring-2 ring-white dark:ring-slate-900">
              {unreadNotificationsCount}
            </span>
          )}
        </button>

        {/* Settings Button */}
        <button
          onClick={() => navigate('settings')}
          className="w-8.5 h-8.5 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-200 shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 transition-all cursor-pointer"
          title="Settings"
        >
          <Settings className="w-4 h-4 text-slate-700 dark:text-slate-200" />
        </button>
      </div>
    </header>
  );
};

