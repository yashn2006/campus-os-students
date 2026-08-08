import React from 'react';
import { ScreenId } from '../types';
import { Home, CheckCircle2, Sparkles, BarChart2, User } from 'lucide-react';

interface BottomNavProps {
  activeScreen: ScreenId;
  navigate: (screen: ScreenId) => void;
  openScannerModal: () => void;
  unreadCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeScreen,
  navigate,
  openScannerModal,
}) => {
  if (['splash', 'welcome', 'login', 'otp', 'auth_loading', 'profile_setup', 'auth_success'].includes(activeScreen)) {
    return null;
  }

  const isHome = activeScreen === 'home';
  const isAttendance = activeScreen === 'live_attendance';
  const isDashboard = ['analytics', 'attendance_analytics', 'results', 'timetable'].includes(activeScreen);
  const isProfile = ['profile', 'settings'].includes(activeScreen);

  return (
    <nav className="sticky bottom-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border-t border-slate-200/60 dark:border-slate-800/80 px-3 py-2 pb-safe-nav flex justify-around items-center w-full transition-colors">
      {/* Home */}
      <button
        onClick={() => navigate('home')}
        className={`flex flex-col items-center justify-center w-12 transition-all cursor-pointer ${
          isHome ? 'text-[#6366F1] dark:text-indigo-400 font-extrabold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        <Home className={`w-5 h-5 ${isHome ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
        <span className="text-[10px] tracking-tight mt-0.5">Home</span>
      </button>

      {/* Attendance */}
      <button
        onClick={() => navigate('live_attendance')}
        className={`flex flex-col items-center justify-center w-12 transition-all cursor-pointer ${
          isAttendance ? 'text-[#6366F1] dark:text-indigo-400 font-extrabold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        <CheckCircle2 className={`w-5 h-5 ${isAttendance ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
        <span className="text-[10px] tracking-tight mt-0.5">Attendance</span>
      </button>

      {/* Center Floating Glowing AI Action Button */}
      <div className="relative -top-3">
        <button
          onClick={openScannerModal}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#4F46E5] via-[#6366F1] to-[#06B6D4] text-white flex items-center justify-center shadow-[0_8px_25px_rgba(99,102,241,0.5)] hover:shadow-[0_12px_32px_rgba(99,102,241,0.6)] active:scale-95 transition-all ring-4 ring-white dark:ring-slate-900 cursor-pointer group"
          title="AI Assistant & Live QR Attendance Scanner"
        >
          <Sparkles className="w-6 h-6 stroke-[2.2] fill-white/20 text-white group-hover:rotate-12 transition-transform" />
        </button>
      </div>

      {/* Dashboard / Analytics */}
      <button
        onClick={() => navigate('analytics')}
        className={`flex flex-col items-center justify-center w-12 transition-all cursor-pointer ${
          isDashboard ? 'text-[#6366F1] dark:text-indigo-400 font-extrabold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        <BarChart2 className={`w-5 h-5 ${isDashboard ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
        <span className="text-[10px] tracking-tight mt-0.5">Analytics</span>
      </button>

      {/* Profile */}
      <button
        onClick={() => navigate('profile')}
        className={`flex flex-col items-center justify-center w-12 transition-all cursor-pointer ${
          isProfile ? 'text-[#6366F1] dark:text-indigo-400 font-extrabold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        <User className={`w-5 h-5 ${isProfile ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
        <span className="text-[10px] tracking-tight mt-0.5">Profile</span>
      </button>
    </nav>
  );
};

