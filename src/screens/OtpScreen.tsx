import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScreenId } from '../types';
import { ArrowLeft, RefreshCw, AlertCircle, ShieldCheck, Sparkles, Check, Lock, Cpu, Zap } from 'lucide-react';

interface OtpScreenProps {
  email: string;
  navigate: (screen: ScreenId) => void;
}

export const OtpScreen: React.FC<OtpScreenProps> = ({ email, navigate }) => {
  const [otp, setOtp] = useState<string[]>(['8', '4', '9', '2', '0', '1']);
  const [activeBoxIndex, setActiveBoxIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [errorMsg, setErrorMsg] = useState('');
  const [boxParticles, setBoxParticles] = useState<{ [key: number]: boolean }>({});

  // Animation Sequence Stages:
  // 'typing' -> 'pulse_wave' -> 'liquid_merge' -> 'ring_verifying' -> 'success_checkmark' -> 'os_launch'
  const [stage, setStage] = useState<
    'typing' | 'pulse_wave' | 'liquid_merge' | 'ring_verifying' | 'success_checkmark' | 'os_launch'
  >('typing');

  const [activePulseIndex, setActivePulseIndex] = useState<number>(-1);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Resend Countdown
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Auto focus active input
  useEffect(() => {
    if (stage === 'typing' && inputRefs.current[activeBoxIndex]) {
      inputRefs.current[activeBoxIndex]?.focus();
    }
  }, [activeBoxIndex, stage]);

  // Trigger digit particle burst
  const triggerBoxParticle = (index: number) => {
    setBoxParticles((prev) => ({ ...prev, [index]: true }));
    setTimeout(() => {
      setBoxParticles((prev) => ({ ...prev, [index]: false }));
    }, 450);
  };

  const handleChange = (index: number, value: string) => {
    setErrorMsg('');
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    const char = value.slice(-1);
    newOtp[index] = char;
    setOtp(newOtp);

    if (char) {
      triggerBoxParticle(index);
      if (index < 5) {
        setActiveBoxIndex(index + 1);
      } else {
        // 6th digit entered! Auto verify sequence
        if (newOtp.every((d) => d !== '')) {
          startLiquidVerificationSequence(newOtp);
        }
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        setActiveBoxIndex(index - 1);
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setOtp(digits);
      setActiveBoxIndex(5);
      startLiquidVerificationSequence(digits);
    }
  };

  const handleResend = () => {
    setTimeLeft(30);
    setErrorMsg('');
    setOtp(['', '', '', '', '', '']);
    setActiveBoxIndex(0);
    setStage('typing');
  };

  // Liquid UI Verification Animation Sequence
  const startLiquidVerificationSequence = (digits: string[]) => {
    if (digits.join('').length < 6) {
      setErrorMsg('Please enter all 6 digits of your security passcode.');
      return;
    }

    // 1. Lock boxes & trigger sequential pulse wave from Box 0 -> 5
    setStage('pulse_wave');

    let waveStep = 0;
    const waveInterval = setInterval(() => {
      setActivePulseIndex(waveStep);
      waveStep++;
      if (waveStep > 5) {
        clearInterval(waveInterval);
        setActivePulseIndex(-1);

        // 2. Magnetic Liquid Merge Phase: boxes slide & attract to center
        setTimeout(() => {
          setStage('liquid_merge');
        }, 120);
      }
    }, 70);

    // 3. Ring Drawing & Inward Spiral Particle Phase
    setTimeout(() => {
      setStage('ring_verifying');
    }, 900);

    // 4. Apple Face ID Checkmark Drawing & Green Glow Phase
    setTimeout(() => {
      setStage('success_checkmark');
    }, 1800);

    // 5. OS Launch Transition (Lift upward, morphing orb, blur wave)
    setTimeout(() => {
      setStage('os_launch');
    }, 3000);

    // 6. Navigate to Home
    setTimeout(() => {
      navigate('home');
    }, 4400);
  };

  const handleManualSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    startLiquidVerificationSequence(otp);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#F8FAFC] dark:bg-[#070B14] text-[#0F172A] dark:text-white flex flex-col justify-between p-6 font-sans overflow-hidden selection:bg-purple-500">
      {/* Animated Floating Aurora Background Mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -50, 20, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-purple-600/20 dark:bg-purple-600/25 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -50, 40, 0],
            y: [0, 40, -30, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-indigo-600/20 dark:bg-indigo-600/25 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-cyan-400/15 rounded-full blur-3xl"
        />
      </div>

      {/* Screen Blur Wave Overlay during OS Launch */}
      {stage === 'os_launch' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 bg-white/90 dark:bg-[#070B14]/90 backdrop-blur-3xl z-50 pointer-events-none flex flex-col items-center justify-center space-y-6"
        >
          {/* Morphing Glowing Breathing Orb */}
          <div className="relative flex items-center justify-center">
            <motion.div
              animate={{
                borderRadius: [
                  '40% 60% 70% 30% / 40% 50% 60% 50%',
                  '60% 40% 30% 70% / 50% 30% 70% 50%',
                  '40% 60% 70% 30% / 40% 50% 60% 50%',
                ],
                rotate: [0, 180, 360],
                scale: [1, 1.15, 1],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="w-28 h-28 bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 blur-md opacity-90 shadow-[0_0_80px_rgba(139,92,246,0.9)]"
            />
            <div className="absolute w-16 h-16 rounded-2xl bg-slate-900/90 border border-white/20 flex items-center justify-center shadow-2xl backdrop-blur-xl">
              <Cpu className="w-8 h-8 text-cyan-400 animate-pulse" />
            </div>
          </div>

          <div className="text-center space-y-1 z-10">
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl font-black text-slate-900 dark:text-white tracking-tight"
            >
              Initialising Campus OS
            </motion.h3>
            <p className="text-xs font-mono text-purple-600 dark:text-purple-300 tracking-wider uppercase">
              Loading OS Modules & Analytics...
            </p>
          </div>
        </motion.div>
      )}

      {/* Top Header */}
      <div className="pt-2 flex justify-between items-center z-10 max-w-sm mx-auto w-full">
        <button
          type="button"
          onClick={() => navigate('login')}
          className="w-10 h-10 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 flex items-center justify-center text-[#0F172A] dark:text-white shadow-2xs hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4.5 h-4.5" />
        </button>

        <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-500/10 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 text-[10px] font-black border border-purple-300/40 dark:border-purple-800 tracking-wider uppercase backdrop-blur-md shadow-xs">
          <Zap className="w-3 h-3 text-purple-500" />
          <span>IDENTITY GATEWAY</span>
        </div>
      </div>

      {/* Main Workspace Body */}
      <div className="my-auto max-w-md w-full mx-auto space-y-6 z-10 py-2">
        {/* Title Header */}
        <div className="text-center space-y-2">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-0.5 mx-auto shadow-xl shadow-purple-500/20"
          >
            <div className="w-full h-full bg-white dark:bg-[#0D1527] rounded-[22px] flex items-center justify-center text-purple-600 dark:text-purple-400">
              <ShieldCheck className="w-8 h-8 stroke-[2.2]" />
            </div>
          </motion.div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0F172A] dark:text-white">
            Verify Your Identity
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xs mx-auto">
            We&apos;ve sent a secure verification code to your registered mobile number.
          </p>
        </div>

        {/* OTP Interaction Area */}
        <div className="relative min-h-[190px] flex flex-col items-center justify-center">
          {stage === 'typing' || stage === 'pulse_wave' ? (
            <form onSubmit={handleManualSubmit} className="w-full space-y-6">
              {/* 6 Individual Centered Glass Boxes */}
              <div className="flex justify-center gap-2 sm:gap-2.5" onPaste={handlePaste}>
                {otp.map((digit, index) => {
                  const isActive = activeBoxIndex === index && stage === 'typing';
                  const isPulsing = activePulseIndex === index;
                  const showParticle = boxParticles[index];

                  return (
                    <div key={index} className="relative">
                      {/* Floating Micro Sparkles on Entry */}
                      <AnimatePresence>
                        {showParticle && (
                          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                            {[0, 72, 144, 216, 288].map((deg, i) => (
                              <motion.span
                                key={i}
                                initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                                animate={{
                                  x: Math.cos((deg * Math.PI) / 180) * 26,
                                  y: Math.sin((deg * Math.PI) / 180) * 26,
                                  scale: [0, 1, 0],
                                  opacity: [1, 0.8, 0],
                                }}
                                transition={{ duration: 0.4 }}
                                className="absolute w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_#A855F7]"
                              />
                            ))}
                          </div>
                        )}
                      </AnimatePresence>

                      {/* Glass Box Input */}
                      <motion.input
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        disabled={stage !== 'typing'}
                        onFocus={() => setActiveBoxIndex(index)}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        animate={{
                          scale: digit ? [1, 1.08, 1] : isActive ? [1, 1.04, 1] : 1,
                          borderColor: isPulsing
                            ? '#C084FC'
                            : isActive
                            ? '#A855F7'
                            : digit
                            ? '#818CF8'
                            : 'rgba(203,213,225,0.4)',
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 20,
                        }}
                        className={`w-11 h-14 sm:w-13 sm:h-16 text-center text-xl font-black rounded-[20px] backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-2 transition-all duration-200 ${
                          isPulsing
                            ? 'bg-purple-500/20 border-purple-400 shadow-[0_0_25px_rgba(192,132,252,0.8)]'
                            : isActive
                            ? 'border-purple-500 shadow-[0_0_22px_rgba(168,85,247,0.45)] ring-2 ring-purple-500/30'
                            : digit
                            ? 'border-indigo-400 dark:border-indigo-500 shadow-sm'
                            : 'border-slate-200/80 dark:border-slate-800/80 shadow-xs'
                        } text-slate-900 dark:text-white focus:outline-none`}
                      />

                      {/* Active Cursor Breathe Bar */}
                      {isActive && (
                        <motion.div
                          layoutId="activeUnderline"
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ repeat: Infinity, duration: 1.2 }}
                          className="absolute bottom-2 left-3 right-3 h-0.5 bg-purple-500 rounded-full shadow-[0_0_10px_#A855F7]"
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {errorMsg && (
                <div className="flex items-center gap-1.5 text-xs text-rose-600 bg-rose-50 dark:bg-rose-950/40 p-3 rounded-xl border border-rose-200 dark:border-rose-800 font-bold animate-shake">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Resend Actions */}
              <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 font-semibold px-1">
                <span>
                  {timeLeft > 0 ? (
                    <span>
                      Resend code in <strong className="text-purple-600 dark:text-purple-400 font-black">{timeLeft}s</strong>
                    </span>
                  ) : (
                    <span className="text-amber-500 font-bold">Code expired</span>
                  )}
                </span>

                <button
                  type="button"
                  disabled={timeLeft > 0}
                  onClick={handleResend}
                  className="text-purple-600 dark:text-purple-400 font-black hover:underline disabled:opacity-40 flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Resend Code</span>
                </button>
              </div>

              {/* Verify Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-black py-4 rounded-2xl text-xs tracking-wider shadow-xl shadow-purple-500/25 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span>Verify Passcode & Unlock</span>
              </motion.button>
            </form>
          ) : (
            /* LIQUID MERGE & FACE ID VERIFICATION STAGE */
            <div className="relative flex flex-col items-center justify-center my-2 w-full">
              {/* Radial Exploding Particles on Success */}
              {stage === 'success_checkmark' && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                      animate={{
                        x: Math.cos((angle * Math.PI) / 180) * 110,
                        y: Math.sin((angle * Math.PI) / 180) * 110,
                        opacity: 0,
                        scale: 0,
                      }}
                      transition={{ duration: 0.9, ease: 'easeOut' }}
                      className="absolute w-3 h-3 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-400 shadow-[0_0_12px_#10B981]"
                    />
                  ))}
                </div>
              )}

              {/* Liquid UI Magnetically Merged Glass Card */}
              <motion.div
                initial={{ width: 320, borderRadius: 20 }}
                animate={{
                  width: stage === 'liquid_merge' ? 220 : 280,
                  borderRadius: 28,
                  borderColor:
                    stage === 'success_checkmark'
                      ? 'rgba(16,185,129,0.8)'
                      : 'rgba(168,85,247,0.6)',
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`relative p-5 rounded-3xl backdrop-blur-2xl bg-white/90 dark:bg-slate-900/90 border-2 shadow-2xl flex flex-col items-center justify-center space-y-3 ${
                  stage === 'success_checkmark'
                    ? 'shadow-[0_0_60px_rgba(16,185,129,0.5)] border-emerald-400'
                    : 'shadow-[0_0_50px_rgba(168,85,247,0.4)] border-purple-500'
                }`}
              >
                {/* Ring Drawing & Inward Particle Dissolve */}
                {stage === 'ring_verifying' && (
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <svg className="w-20 h-20 transform -rotate-90">
                      <circle
                        cx="40"
                        cy="40"
                        r="32"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="text-purple-500/20"
                        fill="transparent"
                      />
                      <motion.circle
                        cx="40"
                        cy="40"
                        r="32"
                        stroke="url(#purpleCyanGrad)"
                        strokeWidth="4"
                        strokeDasharray="201"
                        initial={{ strokeDashoffset: 201 }}
                        animate={{ strokeDashoffset: 0 }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                        fill="transparent"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="purpleCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#A855F7" />
                          <stop offset="100%" stopColor="#06B6D4" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Spiraling Inward Digits */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{ scale: [1, 0], opacity: [1, 0], rotate: 180 }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                        className="text-sm font-mono font-black text-purple-400 tracking-widest"
                      >
                        {otp.join('')}
                      </motion.div>
                    </div>
                  </div>
                )}

                {/* Apple Face ID Stroke-by-Stroke Checkmark Drawing */}
                {stage === 'success_checkmark' && (
                  <motion.div
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/40"
                  >
                    <svg
                      className="w-8 h-8 text-white stroke-current"
                      viewBox="0 0 24 24"
                      fill="none"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <motion.path
                        d="M20 6L9 17l-5-5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </svg>
                  </motion.div>
                )}

                {/* Status Messages */}
                <div className="text-center space-y-0.5">
                  <motion.h3
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-base font-black text-slate-900 dark:text-white"
                  >
                    {stage === 'success_checkmark' ? 'Verified Successfully' : 'Verifying Code...'}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[11px] font-semibold text-slate-500 dark:text-slate-400"
                  >
                    {stage === 'success_checkmark'
                      ? 'Preparing your Campus OS'
                      : 'Authenticating biometric security keys'}
                  </motion.p>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="pb-4 text-center z-10 max-w-sm mx-auto w-full">
        <p className="text-[10px] text-slate-400 font-medium">
          Encrypted Biometric Authentication • Campus OS
        </p>
      </div>
    </div>
  );
};
