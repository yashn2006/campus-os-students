import React, { useState, useEffect } from 'react';
import { Lecture, ScreenId } from '../types';
import { MapPin, User, CheckCircle2, XCircle, Clock, QrCode } from 'lucide-react';

interface TodayTimelineProps {
  lectures: Lecture[];
  navigate: (screen: ScreenId) => void;
  onSelectLecture: (lec: Lecture) => void;
  openScannerModal?: () => void;
}

export const TodayTimeline: React.FC<TodayTimelineProps> = ({
  lectures,
  navigate,
  onSelectLecture,
  openScannerModal,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(1458); // ~24 mins

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 1458));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')} left`;
  };

  return (
    <section className="my-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 px-0.5">
        <div>
          <h2 className="text-[16px] sm:text-[17px] font-black text-[#0F172A] dark:text-white tracking-tight flex items-center gap-2">
            <span>Today&apos;s Schedule</span>
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          </h2>
        </div>
        <button
          onClick={() => navigate('timetable')}
          className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
        >
          Full Timetable &gt;
        </button>
      </div>

      {/* Timeline Schedule List */}
      <div className="space-y-3">
        {lectures.map((lec, index) => {
          const isCurrent = lec.status === 'current';
          const isCompleted = lec.status === 'completed' || lec.attendanceStatus === 'marked';

          const nodeColor = isCompleted
            ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]'
            : isCurrent
            ? 'bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)] animate-pulse'
            : index === 2
            ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]'
            : 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]';

          const leftBorderColor = isCompleted
            ? 'border-l-4 border-l-emerald-500'
            : isCurrent
            ? 'border-l-4 border-l-blue-500'
            : index === 2
            ? 'border-l-4 border-l-amber-500'
            : 'border-l-4 border-l-rose-500';

          return (
            <div key={lec.id} className="flex items-center gap-3 relative group">
              {/* Left Column: Timestamp & Node */}
              <div className="w-14 shrink-0 flex flex-col items-start pt-1">
                <span
                  className={`text-[12px] font-black tracking-tight ${
                    isCompleted
                      ? 'text-emerald-500'
                      : isCurrent
                      ? 'text-blue-500 dark:text-blue-400'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {lec.startTime}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">AM</span>
              </div>

              {/* Connected Glow Node */}
              <div className={`w-3.5 h-3.5 rounded-full ${nodeColor} shrink-0 ring-4 ring-white dark:ring-[#090D16]`} />

              {/* Schedule Card */}
              <div
                onClick={() => {
                  onSelectLecture(lec);
                  navigate('class_details');
                }}
                className={`flex-1 bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 ${leftBorderColor} rounded-2xl p-3 sm:p-3.5 shadow-xs hover:shadow-md transition-all cursor-pointer relative overflow-hidden flex items-center justify-between active:scale-[0.99]`}
              >
                <div className="space-y-1 min-w-0 flex-1 pr-2">
                  <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white tracking-tight truncate">
                    {lec.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-2 text-[10.5px] text-slate-500 dark:text-slate-400 font-medium">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-indigo-500" />
                      {lec.room}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 truncate">
                      <User className="w-3 h-3 text-slate-400" />
                      {lec.professor}
                    </span>
                  </div>
                </div>

                {/* Right Status Badge / Action Button */}
                <div className="shrink-0">
                  {isCompleted ? (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[9.5px] font-black uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> COMPLETED
                    </span>
                  ) : isCurrent ? (
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/30 text-[9px] font-mono font-bold">
                        {formatCountdown(secondsRemaining)}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (openScannerModal) openScannerModal();
                          else navigate('live_attendance');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-black uppercase tracking-wide shadow-md shadow-blue-500/30 hover:opacity-90 cursor-pointer active:scale-95 transition-all"
                      >
                        JOIN LIVE
                      </button>
                    </div>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-[9.5px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <Clock className="w-3 h-3" /> UPCOMING
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

