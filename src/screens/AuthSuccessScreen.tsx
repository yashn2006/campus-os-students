import React, { useEffect } from 'react';
import { ScreenId, StudentProfile } from '../types';
import { CheckCircle2, Sparkles, Award, ArrowRight } from 'lucide-react';

interface AuthSuccessScreenProps {
  student: StudentProfile;
  navigate: (screen: ScreenId) => void;
}

export const AuthSuccessScreen: React.FC<AuthSuccessScreenProps> = ({ student, navigate }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('home');
    }, 2200);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] text-[#0F172A] dark:text-white flex flex-col justify-between items-center p-8 font-sans relative overflow-hidden">
      {/* Background Soft Aurora Light Gradients */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-emerald-200/40 dark:bg-emerald-950/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-indigo-200/40 dark:bg-indigo-950/30 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full flex justify-end items-center z-10 pt-4 max-w-sm">
        <span className="px-3 py-1 rounded-full bg-[#DCFCE7] dark:bg-emerald-950/60 text-[#15803D] dark:text-emerald-300 text-[10px] font-extrabold border border-emerald-200 dark:border-emerald-800">
          AUTH SUCCESSFUL
        </span>
      </div>

      {/* Main Success Visual */}
      <div className="flex flex-col items-center text-center z-10 space-y-6 my-auto max-w-sm w-full">
        {/* Animated Green Checkmark Ring */}
        <div className="w-24 h-24 rounded-full bg-[#DCFCE7] dark:bg-emerald-950/60 border-4 border-emerald-400 text-[#15803D] dark:text-emerald-300 flex items-center justify-center mx-auto shadow-lg animate-bounce">
          <CheckCircle2 className="w-14 h-14" />
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl font-black tracking-tight text-[#0F172A] dark:text-white">
            Welcome, {student.name}!
          </h1>
          <p className="text-xs text-[#64748B] dark:text-slate-300 font-medium">
            Your Campus OS session is active & synchronized
          </p>
        </div>

        {/* Quick Academic Card */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-[#E2E8F0] dark:border-slate-700 shadow-2xs w-full grid grid-cols-2 gap-3 text-center">
          <div>
            <span className="text-[10px] font-bold text-[#64748B] dark:text-slate-400 uppercase">Overall Attendance</span>
            <p className="text-lg font-black text-[#22C55E]">{student.overallAttendance}%</p>
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#64748B] dark:text-slate-400 uppercase">Current CGPA</span>
            <p className="text-lg font-black text-[#6366F1]">{student.cgpa}</p>
          </div>
        </div>

        <button
          onClick={() => navigate('home')}
          className="w-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:opacity-95 text-white font-bold py-3.5 rounded-2xl text-xs tracking-wide shadow-[0_8px_20px_rgba(99,102,241,0.25)] flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
        >
          <span>Launching Dashboard...</span>
          <ArrowRight className="w-4 h-4 animate-pulse" />
        </button>
      </div>

      <div className="pb-4 text-center z-10 max-w-sm mx-auto w-full">
        <p className="text-[10px] text-[#94A3B8] font-medium">
          SIES College of Arts, Science & Commerce • Official Portal v2.4
        </p>
      </div>
    </div>
  );
};
