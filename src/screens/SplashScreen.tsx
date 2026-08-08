import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ScreenId } from '../types';
import { Sparkles, ShieldCheck, ArrowRight, Smartphone, Zap } from 'lucide-react';

interface SplashScreenProps {
  navigate: (screen: ScreenId) => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ navigate }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('login');
    }, 2200);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 z-50 bg-[#F8FAFC] dark:bg-[#070B14] text-[#0F172A] dark:text-white flex flex-col justify-between items-center p-6 sm:p-8 selection:bg-indigo-500 overflow-hidden font-sans">
      {/* Background Soft Glass & Gradient Lighting */}
      <div className="absolute top-1/3 -left-20 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Floating Abstract Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50">
        <motion.div
          animate={{
            rotate: [0, 360],
            y: [-15, 15, -15],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute top-12 right-10 w-32 h-32 rounded-3xl border border-indigo-400/20 bg-indigo-500/5 backdrop-blur-3xl rotate-12"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            y: [15, -15, 15],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-16 left-8 w-40 h-40 rounded-full border border-cyan-400/20 bg-cyan-500/5 backdrop-blur-3xl"
        />
      </div>

      {/* Top Header Badge */}
      <div className="w-full flex justify-between items-center z-10 pt-4 max-w-md">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 shadow-xs backdrop-blur-xl">
          <ShieldCheck className="w-3.5 h-3.5 text-[#6366F1]" />
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-200">
            OFFICIAL PWA INSTANCE
          </span>
        </div>

        <button
          onClick={() => navigate('login')}
          className="text-xs font-bold text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer"
        >
          Skip &rarr;
        </button>
      </div>

      {/* Center Hero Glass Card & Identity */}
      <div className="flex flex-col items-center text-center z-10 my-auto max-w-md space-y-7 px-2">
        {/* Large Logo with Gentle Scale & Floating Motion */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: [0.95, 1.02, 1], opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative flex items-center justify-center"
        >
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
          >
            {/* Outer Glass Aura */}
            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-[36px] bg-gradient-to-tr from-[#6366F1] via-[#8B5CF6] to-[#06B6D4] p-1.5 shadow-[0_24px_60px_rgba(99,102,241,0.35)] relative overflow-hidden">
              <div className="w-full h-full bg-white dark:bg-[#0D1527] rounded-[30px] flex items-center justify-center relative overflow-hidden border border-white/80 dark:border-slate-800 backdrop-blur-2xl">
                <Sparkles className="w-16 h-16 text-[#6366F1] dark:text-indigo-400 stroke-[2.2]" />
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Title & Tagline */}
        <div className="space-y-2">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl font-black tracking-tight text-[#0F172A] dark:text-white leading-tight"
          >
            Campus OS
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sm sm:text-base font-bold text-[#6366F1] dark:text-indigo-400 tracking-tight"
          >
            "Your Campus. One Intelligent Workspace."
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto font-medium leading-relaxed pt-1"
          >
            Unified attendance, schedule automation, digital library ID, and AI student analytics.
          </motion.p>
        </div>

        {/* Soft Glass Feature Badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-2 pt-2"
        >
          <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200/80 dark:border-indigo-800/80 text-[11px] font-extrabold text-[#6366F1] dark:text-indigo-300 flex items-center gap-1.5 shadow-2xs">
            <Zap className="w-3.5 h-3.5" />
            Instant NFC & QR
          </span>
          <span className="px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/50 border border-cyan-200/80 dark:border-cyan-800/80 text-[11px] font-extrabold text-cyan-700 dark:text-cyan-300 flex items-center gap-1.5 shadow-2xs">
            <Smartphone className="w-3.5 h-3.5" />
            iOS PWA Ready
          </span>
        </motion.div>
      </div>

      {/* Bottom Progress Line & CTA */}
      <div className="w-full max-w-sm z-10 pb-6 space-y-3">
        {/* Animated Progress Line */}
        <div className="w-full bg-slate-200 dark:bg-slate-800/80 h-1.5 rounded-full overflow-hidden relative">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            transition={{ duration: 2.1, ease: 'easeInOut' }}
            className="w-full h-full bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#06B6D4] rounded-full shadow-[0_0_10px_#6366F1]"
          />
        </div>

        <button
          onClick={() => navigate('login')}
          className="w-full py-3.5 rounded-2xl bg-[#6366F1] hover:bg-indigo-600 active:scale-95 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>Continue to Login</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
