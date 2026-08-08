import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ThemeTransitionOverlayProps {
  isTriggered: boolean;
  isDarkMode: boolean;
  origin: { x: number; y: number };
  onComplete: () => void;
}

export const ThemeTransitionOverlay: React.FC<ThemeTransitionOverlayProps> = ({
  isTriggered,
  isDarkMode,
  origin,
  onComplete,
}) => {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; color: string }[]>([]);

  useEffect(() => {
    if (isTriggered) {
      // Generate radial particle sparkles from tap origin
      const newParticles = Array.from({ length: 18 }, (_, i) => {
        const angle = (i / 18) * Math.PI * 2;
        const distance = 40 + Math.random() * 90;
        return {
          id: i,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          size: Math.random() * 6 + 4,
          color: isDarkMode
            ? ['#8B5CF6', '#38BDF8', '#C084FC', '#F472B6'][i % 4]
            : ['#F59E0B', '#3B82F6', '#10B981', '#6366F1'][i % 4],
        };
      });
      setParticles(newParticles);

      const timer = setTimeout(() => {
        onComplete();
      }, 850);
      return () => clearTimeout(timer);
    }
  }, [isTriggered, isDarkMode, onComplete]);

  if (!isTriggered) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] pointer-events-none overflow-hidden">
        {/* Radial Wave Expanding Ring */}
        <motion.div
          initial={{ scale: 0, opacity: 0.9 }}
          animate={{ scale: 28, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{
            left: origin.x || '90%',
            top: origin.y || '40px',
          }}
          className={`absolute -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full ${
            isDarkMode
              ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 shadow-[0_0_80px_rgba(139,92,246,0.8)]'
              : 'bg-gradient-to-r from-amber-400 via-sky-400 to-indigo-500 shadow-[0_0_80px_rgba(245,158,11,0.8)]'
          }`}
        />

        {/* Burst Sparkle Particles */}
        <div
          style={{
            left: origin.x || '90%',
            top: origin.y || '40px',
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
        >
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
              animate={{
                x: p.x,
                y: p.y,
                scale: [0, 1.2, 0],
                opacity: [1, 0.8, 0],
              }}
              transition={{ duration: 0.75, ease: 'easeOut' }}
              style={{
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                boxShadow: `0 0 10px ${p.color}`,
              }}
              className="absolute rounded-full"
            />
          ))}
        </div>
      </div>
    </AnimatePresence>
  );
};
