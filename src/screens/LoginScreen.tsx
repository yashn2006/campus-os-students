import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ScreenId, StudentProfile } from '../types';
import {
  QrCode,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Lock,
  Sparkles,
  CreditCard,
  CheckCircle2,
} from 'lucide-react';

interface LoginScreenProps {
  student: StudentProfile;
  navigate: (screen: ScreenId) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ student, navigate }) => {
  const [studentId, setStudentId] = useState(student.idNumber || 'STU-2026-8894');
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning 👋';
    if (hour < 18) return 'Good Afternoon 👋';
    return 'Good Evening 👋';
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      navigate('otp');
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#F8FAFC] dark:bg-[#070B14] text-[#0F172A] dark:text-white flex flex-col justify-between items-center p-5 sm:p-8 selection:bg-indigo-500 overflow-y-auto font-sans">
      {/* Background Subtle Gradient Glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-indigo-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-cyan-400/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Row */}
      <div className="w-full flex justify-between items-center z-10 pt-2 max-w-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#6366F1] to-[#06B6D4] text-white flex items-center justify-center font-black text-xs shadow-xs">
            OS
          </div>
          <span className="text-xs font-black tracking-tight text-[#0F172A] dark:text-white">
            Campus OS
          </span>
        </div>

        <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-1.5 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          SYSTEM ONLINE
        </span>
      </div>

      {/* Main Login Workspace Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md my-auto z-10 space-y-6 pt-4 pb-2"
      >
        {/* Welcome Section */}
        <div className="space-y-1">
          <motion.h2
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-white tracking-tight"
          >
            {getGreeting()}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm font-semibold text-slate-500 dark:text-slate-400"
          >
            Welcome to Campus OS
          </motion.p>
        </div>

        {/* Minimal Student ID Card Illustration */}
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 220 }}
          className="relative bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-[26px] p-5 border border-indigo-500/30 shadow-[0_16px_36px_-8px_rgba(99,102,241,0.25)] overflow-hidden"
        >
          {/* Card Glass Sheen Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

          <div className="flex justify-between items-start z-10 relative">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#6366F1] via-[#8B5CF6] to-[#06B6D4] text-white font-black text-xs flex items-center justify-center ring-2 ring-white/30 shadow-xs">
                SP
              </div>
              <div>
                <h4 className="text-sm font-black tracking-tight text-white leading-tight">
                  {student.name || 'Saad Parkar'}
                </h4>
                <p className="text-[11px] font-semibold text-indigo-200 mt-0.5">
                  {student.department || 'B.Sc. Computer Science'}
                </p>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/40 text-[9px] font-black tracking-widest uppercase">
              STUDENT ID
            </span>
          </div>

          <div className="mt-5 pt-3 border-t border-indigo-500/20 flex justify-between items-center z-10 relative">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-cyan-300" />
              <span className="font-mono text-xs font-bold tracking-widest text-white">
                {studentId || 'STU-2026-8894'}
              </span>
            </div>

            <div className="flex items-center gap-1 text-[10px] font-bold text-indigo-300">
              <QrCode className="w-4 h-4 text-cyan-300" />
              <span>NFC Pass</span>
            </div>
          </div>
        </motion.div>

        {/* Login Form: ONLY ONE input field (Student ID) */}
        <form onSubmit={handleContinue} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-[#0F172A] dark:text-slate-200 tracking-tight flex items-center justify-between">
              <span>Enter Student ID / Enrollment No</span>
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold">
                SIES Portal Sync
              </span>
            </label>

            {/* Input Field with Animated Focus State */}
            <div
              className={`relative flex items-center rounded-2xl bg-white dark:bg-slate-900 border-2 transition-all duration-300 ${
                isFocused
                  ? 'border-[#6366F1] shadow-[0_0_20px_rgba(99,102,241,0.25)] ring-2 ring-indigo-500/20'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="pl-4 pr-2 text-slate-400">
                <Lock className={`w-5 h-5 transition-colors ${isFocused ? 'text-[#6366F1]' : ''}`} />
              </div>

              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value.toUpperCase())}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="e.g. STU-2026-8894"
                className="w-full py-4 pr-4 bg-transparent text-sm font-extrabold tracking-wider text-[#0F172A] dark:text-white placeholder:text-slate-400 focus:outline-none uppercase"
                required
              />

              {studentId && (
                <button
                  type="button"
                  onClick={() => setStudentId('')}
                  className="pr-4 text-xs font-extrabold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  Clear
                </button>
              )}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium pl-1">
              Your 6-digit verification passkey will be sent to your campus profile.
            </p>
          </div>

          {/* Large Glass / Gradient Continue Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            disabled={!studentId.trim() || isSubmitting}
            className={`w-full py-4 rounded-2xl font-black text-sm text-white shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer relative overflow-hidden ${
              studentId.trim()
                ? 'bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#06B6D4] shadow-indigo-500/30'
                : 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Transforming to OTP Verification...</span>
              </div>
            ) : (
              <>
                <span>Continue</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </>
            )}
            <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
          </motion.button>
        </form>

        {/* Quick NFC Pass / Face ID login alternative */}
        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => navigate('otp')}
            className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-colors cursor-pointer shadow-2xs flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Use Face ID / Fast Pass</span>
          </button>
        </div>
      </motion.div>

      {/* Footer Info */}
      <div className="pb-4 text-center z-10 max-w-md mx-auto w-full">
        <p className="text-[10px] text-slate-400 font-semibold flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
          <span>Encrypted Student Auth • SIES College Campus OS</span>
        </p>
      </div>
    </div>
  );
};
