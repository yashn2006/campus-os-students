import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Share,
  PlusSquare,
  Smartphone,
  CheckCircle2,
  ShieldAlert,
  Sparkles,
  ArrowDown,
  Lock,
  Cpu,
  ChevronRight,
} from 'lucide-react';

interface IOSPwaInstallGateProps {
  children: React.ReactNode;
}

export const IOSPwaInstallGate: React.FC<IOSPwaInstallGateProps> = ({ children }) => {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(true); // Default true so non-iOS / Android pass freely
  const [devBypass, setDevBypass] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const userAgent = window.navigator.userAgent || '';
    const isIOSDevice =
      /iPhone|iPad|iPod/i.test(userAgent) ||
      (window.navigator.maxTouchPoints > 1 && /Macintosh/i.test(userAgent));

    const standaloneMode =
      (window.navigator as any).standalone === true ||
      window.matchMedia('(display-mode: standalone)').matches;

    setIsIOS(isIOSDevice);
    setIsStandalone(standaloneMode);
  }, []);

  // If user is on iOS AND NOT running in standalone mode (and dev bypass not toggled)
  const shouldBlockIOS = isIOS && !isStandalone && !devBypass;

  if (shouldBlockIOS) {
    return (
      <div className="fixed inset-0 z-[9999] bg-[#090D16] text-white font-sans flex flex-col justify-between p-5 sm:p-7 overflow-y-auto select-none pt-safe-header pb-safe-nav">
        {/* Ambient Glow Orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none animate-pulse" />

        {/* Top Header: Military Security Enforcement Header */}
        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 bg-rose-950/80 border border-rose-500/40 px-3 py-1 rounded-full shadow-[0_0_12px_rgba(244,63,94,0.2)]">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-[10px] font-mono font-black uppercase tracking-widest text-rose-200">
                HARDWARE BINDING ENFORCED
              </span>
            </div>

            <button
              onClick={() => setDevBypass(true)}
              className="text-[10px] font-mono text-slate-400 hover:text-indigo-300 underline cursor-pointer transition-colors"
            >
              Developer Preview Mode
            </button>
          </div>

          {/* Military Tactical Warning Banner */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-2.5 flex items-start gap-2.5"
          >
            <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-[10.5px] text-amber-200/90 leading-tight font-mono">
              <span className="font-bold text-amber-400 uppercase tracking-wider block mb-0.5">
                SECURITY MANDATE #8092
              </span>
              Standard Safari tabs block hardware anti-proxy verification. Home Screen installation is required to initialize device biometric keys.
            </div>
          </motion.div>
        </div>

        {/* Main Instruction Hero Body */}
        <div className="relative z-10 my-auto max-w-md mx-auto text-center space-y-5 py-4">
          {/* Animated App Badge Frame */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 15 }}
            className="relative mx-auto w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 p-0.5 shadow-2xl shadow-indigo-500/40"
          >
            <div className="w-full h-full bg-[#0B0F19] rounded-[22px] flex items-center justify-center border border-white/20">
              <Cpu className="w-10 h-10 text-indigo-400 animate-pulse" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center font-black shadow-lg">
              <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
            </div>
          </motion.div>

          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
              One quick step before you&apos;re in
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-sm mx-auto">
              Install <span className="font-bold text-indigo-300">Campus OS</span> to your iPhone Home Screen to unlock biometric camera attendance and instant offline sync.
            </p>
          </div>

          {/* 3-Step Visual Sequence */}
          <div className="space-y-2.5 text-left">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-900/90 border border-indigo-500/30 rounded-2xl p-3.5 flex items-center gap-3.5 shadow-lg relative overflow-hidden group"
            >
              <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0 font-black text-sm relative">
                1
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-indigo-400 rounded-full animate-ping" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Tap Safari Share Icon</span>
                  <span className="p-1 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    <Share className="w-3.5 h-3.5" />
                  </span>
                </p>
                <p className="text-[10.5px] text-slate-400 mt-0.5">
                  Located in Safari&apos;s bottom toolbar at the center
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-900/90 border border-purple-500/30 rounded-2xl p-3.5 flex items-center gap-3.5 shadow-lg relative overflow-hidden"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shrink-0 font-black text-sm">
                2
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Select &quot;Add to Home Screen&quot;</span>
                  <span className="p-1 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    <PlusSquare className="w-3.5 h-3.5" />
                  </span>
                </p>
                <p className="text-[10.5px] text-slate-400 mt-0.5">
                  Scroll down the share sheet & tap Add in top right
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-3.5 flex items-center gap-3.5 shadow-lg relative overflow-hidden"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 font-black text-sm">
                3
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Launch from Home Screen Icon</span>
                  <span className="p-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </span>
                </p>
                <p className="text-[10.5px] text-slate-400 mt-0.5">
                  Campus OS unlocks in native fullscreen mode
                </p>
              </div>
              <Smartphone className="w-4 h-4 text-emerald-400 shrink-0" />
            </motion.div>
          </div>
        </div>

        {/* Bottom Pointer & Location Guidance */}
        <div className="relative z-10 text-center space-y-2 pt-2 pb-1">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="inline-flex items-center gap-2 bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 text-xs font-extrabold px-4 py-2 rounded-full shadow-lg backdrop-blur-md"
          >
            <Share className="w-4 h-4 text-indigo-400 animate-pulse" />
            <span>Tap Safari Share Icon below</span>
            <ArrowDown className="w-4 h-4 text-indigo-400" />
          </motion.div>
          <p className="text-[10px] text-slate-500 font-mono">
            Campus OS Academic Platform • Version 3.4.0
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
