import React from 'react';
import { ScreenId, StudentProfile } from '../types';
import {
  ArrowLeft,
  Settings,
  ShieldCheck,
  Award,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  QrCode,
  LogOut,
  Mail,
  BookOpen,
  User,
} from 'lucide-react';

interface ProfileScreenProps {
  student: StudentProfile;
  navigate: (screen: ScreenId) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ student, navigate }) => {
  return (
    <div className="space-y-6 pb-28 max-w-2xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="flex justify-between items-center pt-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('home')}
            className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 shadow-2xs flex items-center justify-center text-[#0F172A] dark:text-white hover:bg-slate-50 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-black text-[#0F172A] dark:text-white tracking-tight">
              Student Profile
            </h1>
            <p className="text-xs text-[#64748B] font-medium">Academic Credentials</p>
          </div>
        </div>

        <button
          onClick={() => navigate('settings')}
          className="p-2.5 rounded-full bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 text-[#0F172A] dark:text-white hover:bg-slate-50 cursor-pointer"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Hero Profile Header Card (NO PHOTO, INITIALS BADGE) */}
      <div className="bg-gradient-to-br from-[#EEF2FF] via-white to-[#F0F7FF] dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 rounded-[28px] p-6 shadow-md border border-[#E2E8F0] dark:border-slate-700 text-center relative overflow-hidden space-y-4">
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#6366F1] via-[#8B5CF6] to-[#06B6D4] text-white font-black text-3xl flex items-center justify-center mx-auto shadow-lg border-4 border-white dark:border-slate-800">
            SP
          </div>
          <span className="absolute bottom-1 right-1 w-5 h-5 bg-[#22C55E] border-2 border-white dark:border-slate-800 rounded-full shadow-xs" />
        </div>

        <div>
          <h2 className="text-2xl font-black text-[#0F172A] dark:text-white tracking-tight">{student.name}</h2>
          <p className="text-xs font-extrabold text-[#6366F1] mt-0.5">{student.idNumber}</p>
          <p className="text-xs text-[#64748B] dark:text-slate-300 mt-1 font-medium">
            {student.department} • {student.semester}
          </p>
          <p className="text-[11px] text-[#64748B] dark:text-slate-400 mt-0.5">{student.collegeName}</p>
        </div>

        {/* Quick Digital ID Pass CTA */}
        <button
          onClick={() => navigate('library')}
          className="w-full bg-[#6366F1] hover:bg-indigo-600 text-white font-bold py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer"
        >
          <QrCode className="w-4 h-4 text-cyan-200" />
          <span>View 3D Digital Student ID Pass</span>
        </button>
      </div>

      {/* Academic Highlights */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-[#E2E8F0] dark:border-slate-700 shadow-2xs text-center">
          <span className="text-[10px] font-bold text-[#64748B] dark:text-slate-400 uppercase">Attendance</span>
          <p className="text-lg font-black text-[#22C55E] mt-0.5">{student.overallAttendance}%</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-[#E2E8F0] dark:border-slate-700 shadow-2xs text-center">
          <span className="text-[10px] font-bold text-[#64748B] dark:text-slate-400 uppercase">CGPA</span>
          <p className="text-lg font-black text-[#6366F1] mt-0.5">{student.cgpa}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-[#E2E8F0] dark:border-slate-700 shadow-2xs text-center">
          <span className="text-[10px] font-bold text-[#64748B] dark:text-slate-400 uppercase">Class Rank</span>
          <p className="text-lg font-black text-[#D97706] mt-0.5">#{student.classRank}</p>
        </div>
      </div>

      {/* Honors & Certificates */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-[#E2E8F0] dark:border-slate-700 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-[#0F172A] dark:text-white">Honors & Certificates</h3>

        <div className="space-y-2">
          <div className="p-3 rounded-xl bg-[#FFFBEB] dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50 flex items-center gap-3 text-xs">
            <Award className="w-5 h-5 text-[#D97706]" />
            <div>
              <p className="font-bold text-[#0F172A] dark:text-amber-200">
                Dean's Academic Excellence Award
              </p>
              <p className="text-[10px] text-[#64748B] dark:text-amber-300/70">Awarded Spring 2026 • CGPA 3.88</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#EEF2FF] dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 flex items-center gap-3 text-xs">
            <Sparkles className="w-5 h-5 text-[#6366F1]" />
            <div>
              <p className="font-bold text-[#0F172A] dark:text-indigo-200">
                AI Innovation Hackathon Winner
              </p>
              <p className="text-[10px] text-[#64748B] dark:text-indigo-300/70">Issued by SIES Department of CS</p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate('welcome')}
        className="w-full bg-[#FFE4E6] dark:bg-rose-950/40 hover:bg-rose-200 text-[#E11D48] font-bold py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 transition-all border border-rose-200 dark:border-rose-900/50 cursor-pointer"
      >
        <LogOut className="w-4 h-4" />
        <span>Log Out of Campus OS</span>
      </button>
    </div>
  );
};
