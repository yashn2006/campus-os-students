import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ScreenId } from '../types';
import { Sparkles, Shield, Cpu, Layers } from 'lucide-react';

interface AuthLoadingScreenProps {
  navigate: (screen: ScreenId) => void;
}

export const AuthLoadingScreen: React.FC<AuthLoadingScreenProps> = ({ navigate }) => {
  const [textIndex, setTextIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const loadingMessages = [
    'Initializing Campus OS...',
    'Loading Student Workspace...',
    'Preparing Smart Experience...',
  ];

  useEffect(() => {
    // Progress fill timer
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2.5;
      });
    }, 45);

    // Text cycler
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 700);

    // Transition to Splash Screen after ~2.0 seconds
    const redirectTimeout = setTimeout(() => {
      navigate('splash');
    }, 2100);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
      clearTimeout(redirectTimeout);
    };
  }, [navigate]);

  return (
    <div className="fixed inset-0 z-50 bg-[#F8FAFC] dark:bg-[#090D16] text-[#0F172A] dark:text-white flex flex-col justify-between items-center p-6 sm:p-8 selection:bg-indigo-500 overflow-hidden font-sans">
      {/* Background Animated Subtle Mesh Gradient & Aurora Lights */}
      <div className="absolute top-1/4 -left-28 w-96 h-96 bg-gradient-to-tr from-indigo-400/25 via-purple-300/20 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 -right-28 w-96 h-96 bg-gradient-to-bl from-sky-400/25 via-indigo-300/20 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Floating Ambient Particles & Light Sweeps */}
      <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
        <motion.div
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-16 left-12 w-2.5 h-2.5 rounded-full bg-indigo-500 blur-2xs"
        />
        <motion.div
          animate={{
            y: [20, -20, 20],
            x: [10, -10, 10],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-28 right-16 w-3 h-3 rounded-full bg-cyan-400 blur-2xs"
        />
        <motion.div
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
          className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-indigo-500/5 to-transparent skew-x-12"
        />
      </div>

      {/* Top Header Label */}
      <div className="w-full flex justify-between items-center z-10 pt-4 max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#6366F1]">
            CAMPUS OS • v2.4
          </span>
        </motion.div>

        <button
          onClick={() => navigate('splash')}
          className="text-xs font-bold text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
        >
          Skip &rarr;
        </button>
      </div>

      {/* Center Logo Reveal & Liquid Loader */}
      <div className="flex flex-col items-center text-center z-10 my-auto max-w-md space-y-8">
        {/* Logo Pulse with Glowing Ring */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="relative flex items-center justify-center"
        >
          {/* External Glowing Ambient Halo */}
          <div className="absolute w-36 h-36 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 opacity-30 blur-2xl animate-pulse" />

          {/* Logo Container */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-[32px] bg-gradient-to-tr from-[#6366F1] via-[#8B5CF6] to-[#06B6D4] p-1 shadow-[0_20px_50px_rgba(99,102,241,0.35)]">
            <div className="w-full h-full bg-white dark:bg-[#0B132B] rounded-[28px] flex items-center justify-center relative overflow-hidden border border-white/60 dark:border-slate-800 backdrop-blur-xl">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent"
              />
              <Sparkles className="w-14 h-14 text-[#6366F1] dark:text-indigo-400 stroke-[2.2] animate-pulse" />
            </div>
          </div>
        </motion.div>

        {/* Morphing Glowing Dots Indicator (NOT a normal spinner) */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {[0, 1, 2, 3].map((idx) => (
            <motion.div
              key={idx}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
                backgroundColor: [
                  '#6366F1',
                  '#8B5CF6',
                  '#06B6D4',
                  '#6366F1',
                ][idx],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: idx * 0.18,
                ease: 'easeInOut',
              }}
              className="w-3 h-3 rounded-full shadow-[0_0_12px_rgba(99,102,241,0.6)]"
            />
          ))}
        </div>

        {/* Dynamic Smooth Status Text */}
        <div className="space-y-2 h-14 flex flex-col items-center justify-center">
          <motion.p
            key={textIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="text-base sm:text-lg font-extrabold text-[#0F172A] dark:text-white tracking-tight"
          >
            {loadingMessages[textIndex]}
          </motion.p>
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-400">
            Powered by Campus OS Intelligent Core
          </p>
        </div>
      </div>

      {/* Bottom Liquid Progress Line */}
      <div className="w-full max-w-sm z-10 pb-6 space-y-3">
        <div className="flex justify-between items-center text-[11px] font-bold text-slate-500 dark:text-slate-400 px-1">
          <span>Bootstrapping UI</span>
          <span>{Math.min(100, Math.round(progress))}%</span>
        </div>

        {/* Liquid Gradient Progress Bar */}
        <div className="w-full bg-slate-200/80 dark:bg-slate-800/80 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-300/60 dark:border-slate-700/60 shadow-inner relative">
          <motion.div
            style={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#06B6D4] rounded-full shadow-[0_0_12px_rgba(99,102,241,0.8)] relative overflow-hidden"
          >
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 bg-white/40 skew-x-12"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
