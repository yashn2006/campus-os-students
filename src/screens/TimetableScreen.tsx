import React, { useState } from 'react';
import { ScreenId, Lecture } from '../types';
import { SkeletonLoader } from '../components/SkeletonLoader';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  User,
  CheckCircle2,
  XCircle,
  Video,
} from 'lucide-react';

interface TimetableScreenProps {
  lectures: Lecture[];
  navigate: (screen: ScreenId) => void;
  onSelectLecture: (lec: Lecture) => void;
}

export const TimetableScreen: React.FC<TimetableScreenProps> = ({
  lectures,
  navigate,
  onSelectLecture,
}) => {
  const [selectedDay, setSelectedDay] = useState(2); // WED
  const [isLoading, setIsLoading] = useState(false);

  const days = [
    { day: 'MON', date: '12' },
    { day: 'TUE', date: '13' },
    { day: 'WED', date: '14' },
    { day: 'THU', date: '15' },
    { day: 'FRI', date: '16' },
  ];

  const handleSelectDay = (index: number) => {
    setIsLoading(true);
    setSelectedDay(index);
    setTimeout(() => {
      setIsLoading(false);
    }, 220);
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
              Class Timetable
            </h1>
            <p className="text-xs text-[#64748B] dark:text-slate-400 font-medium">September 2026 Schedule</p>
          </div>
        </div>

        <button className="p-2.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-[#6366F1] hover:bg-indigo-100 transition-colors cursor-pointer">
          <Calendar className="w-5 h-5" />
        </button>
      </div>

      {/* Week Selector Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-2.5 shadow-xs border border-[#E2E8F0] dark:border-slate-700 flex justify-between items-center">
        {days.map((d, idx) => {
          const isSelected = idx === selectedDay;

          return (
            <button
              key={idx}
              onClick={() => handleSelectDay(idx)}
              className={`flex flex-col items-center gap-1 py-2 px-3.5 rounded-xl transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#6366F1] text-white shadow-md scale-105 font-bold'
                  : 'text-[#64748B] dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <span className="text-[10px] font-bold tracking-wider">{d.day}</span>
              <span className="text-sm font-extrabold">{d.date}</span>
            </button>
          );
        })}
      </div>

      {/* Path-style Lectures Timeline List */}
      <div className="relative pl-1 space-y-4 min-h-[300px]">
        {isLoading ? (
          <div className="space-y-4">
            <SkeletonLoader variant="card" />
            <SkeletonLoader variant="card" />
            <SkeletonLoader variant="card" />
          </div>
        ) : (
          lectures.map((lec, index) => {
          const isMissed = lec.attendanceStatus === 'missed' || lec.attendanceStatus === 'absent';
          const isCurrent = lec.status === 'current';
          const isCompleted = lec.status === 'completed' || lec.attendanceStatus === 'marked';
          const isLast = index === lectures.length - 1;

          const arcColor = isMissed
            ? '#E11D48'
            : isCompleted
            ? '#22C55E'
            : isCurrent
            ? '#6366F1'
            : index % 2 === 0
            ? '#06B6D4'
            : '#8B5CF6';

          return (
            <div key={lec.id} className="flex items-start gap-3 relative group">
              {/* Left Time Column & Path Line */}
              <div className="w-13 shrink-0 flex flex-col items-center pt-3">
                <span
                  className={`text-[13px] font-extrabold tracking-tight ${
                    isMissed
                      ? 'text-[#E11D48]'
                      : isCurrent
                      ? 'text-[#6366F1]'
                      : isCompleted
                      ? 'text-[#22C55E]'
                      : 'text-[#64748B]'
                  }`}
                >
                  {lec.startTime}
                </span>

                {!isLast && (
                  <div className="w-[2px] bg-[#E2E8F0] dark:bg-slate-700 h-14 my-1 rounded-full group-hover:bg-slate-300 transition-colors" />
                )}
              </div>

              {/* Right Capsule Card with Path Arc Border */}
              <div
                onClick={() => {
                  onSelectLecture(lec);
                  navigate('class_details');
                }}
                className={`flex-1 ${
                  isMissed
                    ? 'bg-[#FFF1F2] dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50'
                    : 'bg-white dark:bg-slate-800 border-[#E2E8F0] dark:border-slate-700'
                } rounded-[28px] p-4 pr-5 border shadow-2xs hover:shadow-md transition-all cursor-pointer relative overflow-hidden active:scale-[0.99]`}
              >
                {/* SVG Smooth Arched Curve Border on Left */}
                <svg
                  className="absolute left-0 top-0 bottom-0 h-full w-7 pointer-events-none"
                  viewBox="0 0 28 80"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 26 3 C 6 3, 3 20, 3 40 C 3 60, 6 77, 26 77"
                    fill="none"
                    stroke={arcColor}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>

                <div className="pl-4">
                  <div className="flex justify-between items-start mb-1.5">
                    <div>
                      <h3 className="text-[16px] font-black text-[#0F172A] dark:text-white">
                        {lec.title}
                      </h3>
                      <p className="text-[11px] text-[#64748B] dark:text-slate-400 font-medium">
                        {lec.code} • {lec.startTime} - {lec.endTime}
                      </p>
                    </div>

                    {/* Status Badge */}
                    <div>
                      {isMissed ? (
                        <span className="px-3 py-1 rounded-full bg-[#FFE4E6] dark:bg-rose-950/60 text-[#E11D48] text-[10px] font-black uppercase tracking-wide flex items-center gap-1 border border-rose-200">
                          <XCircle className="w-3.5 h-3.5" /> NOT ATTENDED
                        </span>
                      ) : isCurrent ? (
                        <span className="px-3 py-1 rounded-full bg-[#EEF2FF] text-[#6366F1] text-[10px] font-black uppercase tracking-wide border border-indigo-100">
                          CURRENT
                        </span>
                      ) : isCompleted ? (
                        <span className="px-3 py-1 rounded-full bg-[#DCFCE7] text-[#15803D] text-[10px] font-black uppercase tracking-wide flex items-center gap-1 border border-emerald-100">
                          <CheckCircle2 className="w-3.5 h-3.5" /> MARKED
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-[#F1F5F9] dark:bg-slate-700 text-[#64748B] dark:text-slate-300 text-[10px] font-bold uppercase tracking-wide">
                          Upcoming
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Lecturer & Location Row */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-[#64748B] dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-700 mt-2">
                    <div className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-[#6366F1]" />
                      <span>{lec.professor}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#06B6D4]" />
                      <span>{lec.room}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#8B5CF6]" />
                      <span>{lec.duration}</span>
                    </div>
                  </div>

                  {isCurrent && lec.onlineMeetingUrl && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectLecture(lec);
                        navigate('class_details');
                      }}
                      className="mt-3 w-full bg-[#6366F1] hover:bg-indigo-600 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                    >
                      <Video className="w-4 h-4" />
                      <span>Join Live Meeting</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        }))}
      </div>
    </div>
  );
};
