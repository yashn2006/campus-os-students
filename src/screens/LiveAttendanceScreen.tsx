import React, { useState, useEffect } from 'react';
import { ScreenId, Lecture } from '../types';
import {
  ArrowLeft,
  QrCode,
  MapPin,
  Clock,
  CheckCircle2,
  Users,
  ShieldAlert,
  WifiOff,
  Video,
  Sparkles,
  Zap,
  Building2,
  UserCheck,
} from 'lucide-react';

interface LiveAttendanceScreenProps {
  currentLecture: Lecture;
  navigate: (screen: ScreenId) => void;
  openScannerModal: () => void;
  isOffline: boolean;
  markedLectures: string[];
}

export const LiveAttendanceScreen: React.FC<LiveAttendanceScreenProps> = ({
  currentLecture,
  navigate,
  openScannerModal,
  isOffline,
  markedLectures,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(292); // 04:52
  const isMarked = markedLectures.includes(currentLecture.id);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 pb-28 max-w-2xl mx-auto px-4 sm:px-6 select-none">
      {/* Top Navigation Header */}
      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={() => navigate('home')}
          className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex items-center justify-center text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Live Attendance Session
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {currentLecture.title} • {currentLecture.room}
          </p>
        </div>
      </div>

      {/* Main Hero Session Card */}
      <div className="bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/60 dark:from-slate-900 dark:via-indigo-950/40 dark:to-slate-950 rounded-[28px] p-6 shadow-xl border border-indigo-100 dark:border-indigo-900/50 relative overflow-hidden">
        {/* Ambient Glow Orbs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-purple-500/10 dark:bg-purple-500/15 rounded-full blur-2xl pointer-events-none" />

        <div className="flex justify-between items-start relative z-10 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 w-fit border border-rose-200 dark:border-rose-800/60 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                <span>WINDOW ACTIVE</span>
              </span>

              {isOffline && (
                <span className="px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 text-[9.5px] font-bold flex items-center gap-1 border border-amber-200 dark:border-amber-800/60">
                  <WifiOff className="w-3 h-3" />
                  <span>Offline Ready</span>
                </span>
              )}
            </div>

            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight mt-2.5">
              {currentLecture.title}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 font-semibold mt-1">
              <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Video className="w-3.5 h-3.5" />
              </span>
              <span>Prof. {currentLecture.professor}</span>
            </div>
          </div>

          {/* Time Remaining Digital Clock */}
          <div className="text-right shrink-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-3 rounded-2xl border border-indigo-100 dark:border-slate-800 shadow-2xs">
            <span className="text-[9.5px] uppercase font-mono font-bold text-slate-500 dark:text-slate-400 tracking-wider">
              TIME REMAINING
            </span>
            <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono tracking-tight mt-0.5">
              {formatTime(secondsLeft)}
            </p>
          </div>
        </div>

        {/* Center High-Tech Interactive QR Box */}
        <div className="my-6 flex flex-col items-center">
          <div
            onClick={openScannerModal}
            className="relative p-5 bg-white dark:bg-slate-900 rounded-3xl border border-indigo-200/80 dark:border-slate-800 shadow-xl group hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            <div className="w-48 h-48 bg-slate-950 dark:bg-slate-950 rounded-2xl flex items-center justify-center relative overflow-hidden border border-indigo-500/30">
              {/* Laser Beam Animation inside Preview */}
              <div className="scanner-beam absolute top-0 left-0 right-0 h-1 z-20" />
              
              <QrCode className="w-32 h-32 text-indigo-400 dark:text-indigo-400 stroke-[1.5] group-hover:scale-110 transition-transform" />

              {/* Status Overlay if Already Marked */}
              {isMarked && (
                <div className="absolute inset-0 bg-emerald-950/90 backdrop-blur-md flex flex-col items-center justify-center text-white p-3 text-center animate-in zoom-in-95">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 animate-bounce" />
                  <p className="text-xs font-black uppercase tracking-wider mt-1 text-emerald-300">
                    MARKED PRESENT
                  </p>
                  <p className="text-[10px] text-emerald-200/80 mt-0.5">
                    {isOffline ? 'Queued Offline' : 'Portal Synchronized'}
                  </p>
                </div>
              )}
            </div>

            {/* Micro Badge */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-md flex items-center gap-1 whitespace-nowrap">
              <Zap className="w-3 h-3 text-amber-300" />
              <span>Tap QR to Scan</span>
            </div>
          </div>

          {/* Location Badge */}
          <div className="mt-5 flex items-center gap-2 bg-indigo-100/80 dark:bg-indigo-950/60 px-4 py-2 rounded-full border border-indigo-200 dark:border-indigo-800/60 shadow-2xs">
            <MapPin className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              {currentLecture.room} ({currentLecture.building || 'Science Complex'})
            </span>
          </div>
        </div>

        {/* Primary Action CTA Button */}
        <button
          onClick={openScannerModal}
          className={`w-full py-4 rounded-2xl font-extrabold text-xs sm:text-sm tracking-wide shadow-lg flex items-center justify-center gap-2.5 active:scale-98 transition-all cursor-pointer ${
            isMarked
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/25'
              : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white shadow-indigo-600/30'
          }`}
        >
          <QrCode className="w-5 h-5 stroke-[2.2]" />
          <span>{isMarked ? 'Attendance Marked Present ✓' : 'Open Camera QR Scanner'}</span>
        </button>
      </div>

      {/* Live Classroom Attendance Stats */}
      <div className="grid grid-cols-2 gap-3.5">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">Checked In</span>
            <UserCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-xl font-black text-indigo-600 dark:text-indigo-400 mt-1.5">
            42 <span className="text-xs font-bold text-slate-400">/ 60</span>
          </p>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-2.5 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-full rounded-full w-[70%]" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">Device Binding</span>
            <Sparkles className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1.5 flex items-center gap-1">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <span>Verified</span>
          </p>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-2 font-semibold">
            Hardware ID Active
          </p>
        </div>
      </div>

      {/* Lecture Specification Details */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-xs border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Lecture Specifications
        </h3>

        <div className="space-y-3 divide-y divide-slate-100 dark:divide-slate-800/60">
          <div className="pt-2 flex justify-between items-center text-xs">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <Clock className="w-4 h-4 text-indigo-500" />
              <span className="font-semibold">Lecture Time</span>
            </div>
            <span className="font-extrabold text-slate-900 dark:text-slate-100">
              {currentLecture.startTime} - {currentLecture.endTime}
            </span>
          </div>

          <div className="pt-3 flex justify-between items-center text-xs">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <Users className="w-4 h-4 text-cyan-500" />
              <span className="font-semibold">Section & Batch</span>
            </div>
            <span className="font-extrabold text-slate-900 dark:text-slate-100">
              CS-Section B (2026)
            </span>
          </div>

          <div className="pt-3 flex justify-between items-center text-xs">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <Building2 className="w-4 h-4 text-purple-500" />
              <span className="font-semibold">Venue Location</span>
            </div>
            <span className="font-extrabold text-slate-900 dark:text-slate-100">
              {currentLecture.room}, {currentLecture.building || 'Science Wing'}
            </span>
          </div>

          <div className="pt-3 flex justify-between items-center text-xs">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              <span className="font-semibold">Mandatory Attendance</span>
            </div>
            <span className="font-extrabold text-indigo-600 dark:text-indigo-400">
              75% Minimum Required
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
