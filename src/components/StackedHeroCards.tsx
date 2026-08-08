import React, { useState, useRef, useEffect, useCallback } from 'react';
import { StackedHeroCard, ScreenId } from '../types';
import {
  QrCode,
  Calendar,
  FileText,
  BookOpen,
  Award,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Video,
  TrendingUp,
  GraduationCap,
  Target,
  Zap,
} from 'lucide-react';

interface StackedHeroCardsProps {
  cards: StackedHeroCard[];
  navigate: (screen: ScreenId) => void;
}

interface CardMeta {
  bgGradient: string;
  borderColor: string;
  titleColor: string;
  subtitleColor: string;
  badgeBg: string;
  badgeText: string;
  badgeTextColor: string;
  iconBg: string;
  iconColor: string;
  ctaBg: string;
  ctaText: string;
  shadow: string;
  iconComponent: React.ReactNode;
  render3DIllustration: (isFront: boolean) => React.ReactNode;
}

const getCardMeta = (cardId: string, card: StackedHeroCard, index: number): CardMeta => {
  const idKey = cardId.toLowerCase();

  if (idKey === 'card-1' || idKey === 'hero-attendance' || index % 10 === 0) {
    return {
      bgGradient: 'from-[#F3E8FF] via-[#F5F3FF] to-[#EDE9FE] dark:from-[#130B2E] dark:via-[#1D1142] dark:to-[#0C0720]',
      borderColor: 'border-purple-300/80 dark:border-indigo-500/50',
      titleColor: 'text-[#1E1B4B] dark:text-white',
      subtitleColor: 'text-[#6D28D9] dark:text-indigo-300',
      badgeBg: 'bg-[#DDD6FE] dark:bg-purple-950/80',
      badgeText: card.badgeText || '• LIVE CLASS',
      badgeTextColor: 'text-[#5B21B6] dark:text-purple-300',
      iconBg: 'bg-[#7C3AED]',
      iconColor: 'text-white',
      ctaBg: 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/30',
      ctaText: card.ctaText || 'Join Live Class',
      shadow: 'shadow-[0_10px_25px_-5px_rgba(124,58,237,0.22)] dark:shadow-[0_12px_35px_rgba(99,102,241,0.35)]',
      iconComponent: <QrCode className="w-4.5 h-4.5 stroke-[2.2]" />,
      render3DIllustration: (isFront: boolean) => (
        <div className="relative flex flex-col items-center justify-center p-1">
          <div className="relative w-16 h-16 flex items-center justify-center">
            {/* Pedestal Glow Base */}
            <div className="absolute bottom-0 w-14 h-5 bg-gradient-to-r from-purple-500/40 via-indigo-500/60 to-cyan-500/40 rounded-[50%] blur-xs animate-pulse" />
            <div className="absolute bottom-1 w-12 h-3 border-2 border-indigo-400/60 rounded-[50%]" />
            {/* 3D Floating Cube */}
            <div
              className={`relative -top-1 w-11 h-11 bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 rounded-xl p-1.5 border-2 border-indigo-300/80 flex flex-col items-center justify-center rotate-[-6deg] shadow-xl ${
                isFront ? 'animate-bounce-subtle' : ''
              }`}
            >
              <QrCode className="w-6 h-6 text-white stroke-[2.5]" />
            </div>
          </div>
        </div>
      ),
    };
  }

  if (idKey === 'card-2' || idKey === 'hero-timetable' || index % 10 === 1) {
    return {
      bgGradient: 'from-[#E0F2FE] via-[#F0F9FF] to-[#DBEAFE]',
      borderColor: 'border-sky-300/80',
      titleColor: 'text-[#0C4A6E]',
      subtitleColor: 'text-[#0284C7]',
      badgeBg: 'bg-[#BAE6FD]',
      badgeText: card.badgeText || 'Room 302',
      badgeTextColor: 'text-[#0369A1]',
      iconBg: 'bg-[#0284C7]',
      iconColor: 'text-white',
      ctaBg: 'bg-[#0284C7] hover:bg-[#0369A1] text-white',
      ctaText: card.ctaText || 'View Schedule',
      shadow: 'shadow-[0_10px_25px_-5px_rgba(2,132,199,0.22)]',
      iconComponent: <Calendar className="w-4.5 h-4.5 stroke-[2.2]" />,
      render3DIllustration: () => (
        <div className="relative flex flex-col items-center justify-center">
          <div className="relative w-14 h-14 flex items-center justify-center">
            <div className="absolute bottom-1 w-12 h-4 bg-gradient-to-r from-sky-300 via-blue-200 to-sky-300 rounded-[50%] opacity-80" />
            <div className="relative -top-1 w-10 h-10 bg-white rounded-xl p-1 border-2 border-sky-300 flex flex-col items-center justify-center rotate-[3deg] shadow-xs">
              <Calendar className="w-4.5 h-4.5 text-[#0284C7] stroke-[2.2]" />
              <span className="text-[6.5px] font-black text-sky-900 mt-0.5 tracking-wider">
                TODAY
              </span>
            </div>
          </div>
        </div>
      ),
    };
  }

  if (idKey === 'card-3' || idKey === 'hero-live-class' || index % 10 === 2) {
    return {
      bgGradient: 'from-[#ECFDF5] via-[#F0FDF4] to-[#D1FAE5]',
      borderColor: 'border-emerald-300/80',
      titleColor: 'text-[#064E3B]',
      subtitleColor: 'text-[#059669]',
      badgeBg: 'bg-[#A7F3D0]',
      badgeText: card.badgeText || 'IN SESSION',
      badgeTextColor: 'text-[#047857]',
      iconBg: 'bg-[#10B981]',
      iconColor: 'text-white',
      ctaBg: 'bg-[#10B981] hover:bg-[#059669] text-white',
      ctaText: card.ctaText || 'Enter Class',
      shadow: 'shadow-[0_10px_25px_-5px_rgba(16,185,129,0.22)]',
      iconComponent: <Video className="w-4.5 h-4.5 stroke-[2.2]" />,
      render3DIllustration: () => (
        <div className="relative flex flex-col items-center justify-center">
          <div className="relative w-14 h-14 flex items-center justify-center">
            <div className="absolute bottom-1 w-12 h-4 bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-300 rounded-[50%] opacity-80" />
            <div className="relative -top-1 w-10 h-10 bg-white rounded-xl p-1 border-2 border-emerald-300 flex flex-col items-center justify-center rotate-[-2deg] shadow-xs">
              <Video className="w-4.5 h-4.5 text-[#10B981] stroke-[2.2]" />
              <span className="text-[6.5px] font-black text-emerald-900 mt-0.5">LIVE</span>
            </div>
          </div>
        </div>
      ),
    };
  }

  if (idKey === 'card-4' || idKey === 'hero-assignments' || index % 10 === 3) {
    return {
      bgGradient: 'from-[#FFFBEB] via-[#FEF3C7] to-[#FDE68A]',
      borderColor: 'border-amber-300/80',
      titleColor: 'text-[#78350F]',
      subtitleColor: 'text-[#D97706]',
      badgeBg: 'bg-[#FDE68A]',
      badgeText: card.badgeText || 'Due in 2 Days',
      badgeTextColor: 'text-[#92400E]',
      iconBg: 'bg-[#F59E0B]',
      iconColor: 'text-white',
      ctaBg: 'bg-[#D97706] hover:bg-[#B45309] text-white',
      ctaText: card.ctaText || 'Submit Task',
      shadow: 'shadow-[0_10px_25px_-5px_rgba(245,158,11,0.22)]',
      iconComponent: <FileText className="w-4.5 h-4.5 stroke-[2.2]" />,
      render3DIllustration: () => (
        <div className="relative flex flex-col items-center justify-center">
          <div className="relative w-14 h-14 flex items-center justify-center">
            <div className="absolute bottom-1 w-12 h-4 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 rounded-[50%] opacity-80" />
            <div className="relative -top-1 w-10 h-10 bg-white rounded-xl p-1 border-2 border-amber-300 flex flex-col items-center justify-center rotate-[4deg] shadow-xs">
              <FileText className="w-4.5 h-4.5 text-[#D97706] stroke-[2.2]" />
              <span className="text-[6.5px] font-black text-amber-950 mt-0.5">85% DONE</span>
            </div>
          </div>
        </div>
      ),
    };
  }

  if (idKey === 'card-5' || idKey === 'hero-library' || index % 10 === 4) {
    return {
      bgGradient: 'from-[#FDF2F8] via-[#FCE7F3] to-[#FBCFE8]',
      borderColor: 'border-pink-300/80',
      titleColor: 'text-[#831843]',
      subtitleColor: 'text-[#DB2777]',
      badgeBg: 'bg-[#FBCFE8]',
      badgeText: card.badgeText || '12 Books',
      badgeTextColor: 'text-[#9D174D]',
      iconBg: 'bg-[#EC4899]',
      iconColor: 'text-white',
      ctaBg: 'bg-[#EC4899] hover:bg-[#DB2777] text-white',
      ctaText: card.ctaText || 'Manage Books',
      shadow: 'shadow-[0_10px_25px_-5px_rgba(236,72,153,0.22)]',
      iconComponent: <BookOpen className="w-4.5 h-4.5 stroke-[2.2]" />,
      render3DIllustration: () => (
        <div className="relative flex flex-col items-center justify-center">
          <div className="relative w-14 h-14 flex items-center justify-center">
            <div className="absolute bottom-1 w-12 h-4 bg-gradient-to-r from-pink-300 via-rose-200 to-pink-300 rounded-[50%] opacity-80" />
            <div className="relative -top-1 w-10 h-10 bg-white rounded-xl p-1 border-2 border-pink-300 flex flex-col items-center justify-center rotate-[-3deg] shadow-xs">
              <BookOpen className="w-4.5 h-4.5 text-[#EC4899] stroke-[2.2]" />
              <span className="text-[6.5px] font-black text-pink-950 mt-0.5">NFC PASS</span>
            </div>
          </div>
        </div>
      ),
    };
  }

  if (idKey === 'card-6' || idKey === 'hero-analytics' || index % 10 === 5) {
    return {
      bgGradient: 'from-[#ECFEFF] via-[#F0FDFA] to-[#CFFAFE]',
      borderColor: 'border-cyan-300/80',
      titleColor: 'text-[#164E63]',
      subtitleColor: 'text-[#0891B2]',
      badgeBg: 'bg-[#A5F3FC]',
      badgeText: card.badgeText || '84% AVG TREND',
      badgeTextColor: 'text-[#0E7490]',
      iconBg: 'bg-[#06B6D4]',
      iconColor: 'text-white',
      ctaBg: 'bg-[#0891B2] hover:bg-[#0E7490] text-white',
      ctaText: card.ctaText || 'Analyze Trends',
      shadow: 'shadow-[0_10px_25px_-5px_rgba(6,182,212,0.22)]',
      iconComponent: <TrendingUp className="w-4.5 h-4.5 stroke-[2.2]" />,
      render3DIllustration: () => (
        <div className="relative flex flex-col items-center justify-center">
          <div className="relative w-14 h-14 flex items-center justify-center">
            <div className="absolute bottom-1 w-12 h-4 bg-gradient-to-r from-cyan-300 via-sky-200 to-cyan-300 rounded-[50%] opacity-80" />
            <div className="relative -top-1 w-10 h-10 bg-white rounded-xl p-1 border-2 border-cyan-300 flex flex-col items-center justify-center rotate-[3deg] shadow-xs">
              <TrendingUp className="w-4.5 h-4.5 text-[#0891B2] stroke-[2.2]" />
              <span className="text-[6.5px] font-black text-cyan-950 mt-0.5">SAFE ZONE</span>
            </div>
          </div>
        </div>
      ),
    };
  }

  if (idKey === 'card-7' || idKey === 'hero-results' || index % 10 === 6) {
    return {
      bgGradient: 'from-[#FFF1F2] via-[#FFE4E6] to-[#FECDD3]',
      borderColor: 'border-rose-300/80',
      titleColor: 'text-[#881337]',
      subtitleColor: 'text-[#E11D48]',
      badgeBg: 'bg-[#FECDD3]',
      badgeText: card.badgeText || 'TOP 5% RANK',
      badgeTextColor: 'text-[#9F1239]',
      iconBg: 'bg-[#F43F5E]',
      iconColor: 'text-white',
      ctaBg: 'bg-[#E11D48] hover:bg-[#BE123C] text-white',
      ctaText: card.ctaText || 'View Report',
      shadow: 'shadow-[0_10px_25px_-5px_rgba(244,63,94,0.22)]',
      iconComponent: <Award className="w-4.5 h-4.5 stroke-[2.2]" />,
      render3DIllustration: () => (
        <div className="relative flex flex-col items-center justify-center">
          <div className="relative w-14 h-14 flex items-center justify-center">
            <div className="absolute bottom-1 w-12 h-4 bg-gradient-to-r from-rose-300 via-pink-200 to-rose-300 rounded-[50%] opacity-80" />
            <div className="relative -top-1 w-10 h-10 bg-white rounded-xl p-1 border-2 border-rose-300 flex flex-col items-center justify-center rotate-[-2deg] shadow-xs">
              <Award className="w-4.5 h-4.5 text-[#E11D48] stroke-[2.2]" />
              <span className="text-[6.5px] font-black text-rose-950 mt-0.5">3.88 CGPA</span>
            </div>
          </div>
        </div>
      ),
    };
  }

  if (idKey === 'card-8' || idKey === 'hero-credits' || index % 10 === 7) {
    return {
      bgGradient: 'from-[#F0FDFA] via-[#CCFBF1] to-[#99F6E4]',
      borderColor: 'border-teal-300/80',
      titleColor: 'text-[#134E4A]',
      subtitleColor: 'text-[#0D9488]',
      badgeBg: 'bg-[#99F6E4]',
      badgeText: card.badgeText || '114 / 140 EARNED',
      badgeTextColor: 'text-[#115E59]',
      iconBg: 'bg-[#14B8A6]',
      iconColor: 'text-white',
      ctaBg: 'bg-[#0D9488] hover:bg-[#115E59] text-white',
      ctaText: card.ctaText || 'Credit Audit',
      shadow: 'shadow-[0_10px_25px_-5px_rgba(13,148,136,0.22)]',
      iconComponent: <GraduationCap className="w-4.5 h-4.5 stroke-[2.2]" />,
      render3DIllustration: () => (
        <div className="relative flex flex-col items-center justify-center">
          <div className="relative w-14 h-14 flex items-center justify-center">
            <div className="absolute bottom-1 w-12 h-4 bg-gradient-to-r from-teal-300 via-emerald-200 to-teal-300 rounded-[50%] opacity-80" />
            <div className="relative -top-1 w-10 h-10 bg-white rounded-xl p-1 border-2 border-teal-300 flex flex-col items-center justify-center rotate-[3deg] shadow-xs">
              <GraduationCap className="w-4.5 h-4.5 text-[#0D9488] stroke-[2.2]" />
              <span className="text-[6.5px] font-black text-teal-950 mt-0.5">81% AUDIT</span>
            </div>
          </div>
        </div>
      ),
    };
  }

  if (idKey === 'card-9' || idKey === 'hero-goals' || index % 10 === 8) {
    return {
      bgGradient: 'from-[#FAF5FF] via-[#F3E8FF] to-[#E9D5FF]',
      borderColor: 'border-purple-300/80',
      titleColor: 'text-[#581C87]',
      subtitleColor: 'text-[#9333EA]',
      badgeBg: 'bg-[#E9D5FF]',
      badgeText: card.badgeText || '3 GOALS ACTIVE',
      badgeTextColor: 'text-[#6B21A8]',
      iconBg: 'bg-[#A855F7]',
      iconColor: 'text-white',
      ctaBg: 'bg-[#9333EA] hover:bg-[#7E22CE] text-white',
      ctaText: card.ctaText || 'View Goals',
      shadow: 'shadow-[0_10px_25px_-5px_rgba(147,51,234,0.22)]',
      iconComponent: <Target className="w-4.5 h-4.5 stroke-[2.2]" />,
      render3DIllustration: () => (
        <div className="relative flex flex-col items-center justify-center">
          <div className="relative w-14 h-14 flex items-center justify-center">
            <div className="absolute bottom-1 w-12 h-4 bg-gradient-to-r from-purple-300 via-fuchsia-200 to-purple-300 rounded-[50%] opacity-80" />
            <div className="relative -top-1 w-10 h-10 bg-white rounded-xl p-1 border-2 border-purple-300 flex flex-col items-center justify-center rotate-[-3deg] shadow-xs">
              <Target className="w-4.5 h-4.5 text-[#9333EA] stroke-[2.2]" />
              <span className="text-[6.5px] font-black text-purple-950 mt-0.5">DEAN'S LIST</span>
            </div>
          </div>
        </div>
      ),
    };
  }

  return {
    bgGradient: 'from-[#FEFCE8] via-[#FEF9C3] to-[#FEF08A]',
    borderColor: 'border-yellow-300/80',
    titleColor: 'text-[#713F12]',
    subtitleColor: 'text-[#CA8A04]',
    badgeBg: 'bg-[#FEF08A]',
    badgeText: card.badgeText || 'THIS WEEK',
    badgeTextColor: 'text-[#854D0E]',
    iconBg: 'bg-[#EAB308]',
    iconColor: 'text-white',
    ctaBg: 'bg-[#CA8A04] hover:bg-[#A16207] text-white',
    ctaText: card.ctaText || 'Explore Events',
    shadow: 'shadow-[0_10px_25px_-5px_rgba(234,179,8,0.22)]',
    iconComponent: <Zap className="w-4.5 h-4.5 stroke-[2.2]" />,
    render3DIllustration: () => (
      <div className="relative flex flex-col items-center justify-center">
        <div className="relative w-14 h-14 flex items-center justify-center">
          <div className="absolute bottom-1 w-12 h-4 bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-300 rounded-[50%] opacity-80" />
          <div className="relative -top-1 w-10 h-10 bg-white rounded-xl p-1 border-2 border-yellow-300 flex flex-col items-center justify-center rotate-[2deg] shadow-xs">
            <Zap className="w-4.5 h-4.5 text-[#CA8A04] stroke-[2.2]" />
            <span className="text-[6.5px] font-black text-yellow-950 mt-0.5">HACKATHON</span>
          </div>
        </div>
      </div>
    ),
  };
};

export const StackedHeroCards: React.FC<StackedHeroCardsProps> = ({ cards, navigate }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const frontCardRef = useRef<HTMLDivElement | null>(null);

  // Performance optimized gesture state using refs
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const currentDeltaXRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  if (!cards || cards.length === 0) return null;

  const nextCard = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % cards.length);
  }, [cards.length]);

  const prevCard = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
  }, [cards.length]);

  // AUTO SHUFFLE / AUTO ROTATE EVERY 3 SECONDS
  useEffect(() => {
    if (isInteracting) return;
    const interval = setInterval(() => {
      nextCard();
    }, 3000);
    return () => clearInterval(interval);
  }, [nextCard, isInteracting]);

  // Fast GPU position update
  const updateCardPosition = useCallback(() => {
    if (frontCardRef.current) {
      const deltaX = currentDeltaXRef.current;
      const rotateDeg = deltaX * 0.05;
      frontCardRef.current.style.transform = `translate3d(${deltaX}px, 0, 0) rotate(${rotateDeg}deg)`;
    }
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    setIsInteracting(true);
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    currentDeltaXRef.current = 0;

    if (e.currentTarget && typeof e.currentTarget.setPointerCapture === 'function') {
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch (err) {
        // ignore
      }
    }

    if (frontCardRef.current) {
      frontCardRef.current.style.transition = 'none';
      frontCardRef.current.style.willChange = 'transform';
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - startXRef.current;
    currentDeltaXRef.current = deltaX;

    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }
    rafIdRef.current = requestAnimationFrame(updateCardPosition);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    if (e.currentTarget && typeof e.currentTarget.releasePointerCapture === 'function') {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch (err) {
        // ignore
      }
    }

    if (frontCardRef.current) {
      frontCardRef.current.style.transition = 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)';
    }

    const deltaX = currentDeltaXRef.current;
    currentDeltaXRef.current = 0;

    if (deltaX < -30) {
      // Swiped Left -> Next
      if (frontCardRef.current) {
        frontCardRef.current.style.transform = `translate3d(-110%, 0, 0) rotate(-7deg)`;
      }
      setTimeout(() => {
        nextCard();
        if (frontCardRef.current) {
          frontCardRef.current.style.transition = 'none';
          frontCardRef.current.style.transform = 'translate3d(0, 0, 0) rotate(0deg)';
        }
        setIsInteracting(false);
      }, 140);
    } else if (deltaX > 30) {
      // Swiped Right -> Prev
      if (frontCardRef.current) {
        frontCardRef.current.style.transform = `translate3d(110%, 0, 0) rotate(7deg)`;
      }
      setTimeout(() => {
        prevCard();
        if (frontCardRef.current) {
          frontCardRef.current.style.transition = 'none';
          frontCardRef.current.style.transform = 'translate3d(0, 0, 0) rotate(0deg)';
        }
        setIsInteracting(false);
      }, 140);
    } else {
      // Snap back
      if (frontCardRef.current) {
        frontCardRef.current.style.transform = 'translate3d(0, 0, 0) rotate(0deg)';
      }
      setTimeout(() => {
        setIsInteracting(false);
      }, 200);
    }
  };

  useEffect(() => {
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  const stackConfigs = [
    { x: 0, scale: 1.0, zIndex: 30, opacity: 1.0 },
    { x: 18, scale: 0.98, zIndex: 24, opacity: 0.92 },
    { x: 36, scale: 0.96, zIndex: 18, opacity: 0.82 },
    { x: 52, scale: 0.94, zIndex: 12, opacity: 0.72 },
    { x: 66, scale: 0.92, zIndex: 6, opacity: 0.62 },
  ];

  const visibleLayers = [0, 1, 2, 3, 4].map((offsetIndex) => {
    const cardIndex = (activeIndex + offsetIndex) % cards.length;
    return {
      card: cards[cardIndex],
      offsetIndex,
      config: stackConfigs[offsetIndex],
      cardIndex,
    };
  });

  return (
    <section className="relative my-2 select-none w-full max-w-full overflow-hidden touch-pan-y">
      {/* STACKED CARD CAROUSEL CONTAINER */}
      <div
        className="relative h-[210px] w-full flex items-center justify-start px-0.5"
        onMouseEnter={() => setIsInteracting(true)}
        onMouseLeave={() => setIsInteracting(false)}
      >
        {visibleLayers
          .slice()
          .reverse()
          .map(({ card, offsetIndex, config, cardIndex }) => {
            const meta = getCardMeta(card.id, card, cardIndex);
            const isFront = offsetIndex === 0;

            return (
              <div
                key={card.id || cardIndex}
                ref={isFront ? frontCardRef : null}
                onPointerDown={isFront ? handlePointerDown : undefined}
                onPointerMove={isFront ? handlePointerMove : undefined}
                onPointerUp={isFront ? handlePointerUp : undefined}
                onPointerCancel={isFront ? handlePointerUp : undefined}
                onClick={() => {
                  if (!isFront) {
                    setActiveIndex(cardIndex);
                  }
                }}
                style={{
                  transform: `translate3d(${config.x}px, 0, 0) scale(${config.scale})`,
                  opacity: config.opacity,
                  zIndex: config.zIndex,
                  transformOrigin: 'left center',
                  touchAction: isFront ? 'pan-y' : 'auto',
                  transition: isDraggingRef.current && isFront
                    ? 'none'
                    : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className={`absolute top-0 left-0 w-[85%] sm:w-[82%] h-[202px] rounded-[22px] bg-gradient-to-br ${meta.bgGradient} p-3 sm:p-3.5 ${meta.shadow} border ${meta.borderColor} flex flex-col justify-between overflow-hidden cursor-grab active:cursor-grabbing transform-gpu box-border`}
              >
                {/* TOP HEADER ROW: Icon + Title/Subtitle + Status Badge */}
                <div className="flex justify-between items-center gap-2 z-10 w-full min-w-0">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <div
                      className={`w-7.5 h-7.5 rounded-xl ${meta.iconBg} ${meta.iconColor} flex items-center justify-center shadow-xs shrink-0`}
                    >
                      {meta.iconComponent}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3
                        className={`text-[14px] sm:text-[15px] font-black tracking-tight leading-none truncate ${meta.titleColor}`}
                      >
                        {card.title}
                      </h3>
                      <p
                        className={`text-[10px] font-semibold truncate ${meta.subtitleColor} mt-0.5`}
                      >
                        {card.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`px-2 py-0.5 rounded-full text-[8.5px] sm:text-[9px] font-black uppercase tracking-wide whitespace-nowrap shrink-0 ${meta.badgeBg} ${meta.badgeTextColor}`}
                  >
                    {card.badgeText || meta.badgeText}
                  </span>
                </div>

                {/* MIDDLE ROW: Left Main Class Details + Right 3D Illustration */}
                <div className="flex justify-between items-center gap-2 z-10 my-0.5 w-full min-w-0">
                  <div className="space-y-0.5 min-w-0 flex-1 pr-1">
                    <p className="text-[12.5px] sm:text-[13.5px] font-black text-[#0F172A] dark:text-slate-100 leading-tight truncate">
                      {card.statPrimary}
                    </p>
                    {card.statSecondary && (
                      <p className="text-[10px] font-bold text-[#475569] dark:text-slate-300 truncate">
                        {card.statSecondary}
                      </p>
                    )}
                    {card.locationOrTime && (
                      <p className="text-[9.5px] font-medium text-[#64748B] dark:text-slate-400 truncate">
                        {card.locationOrTime}
                      </p>
                    )}
                  </div>

                  {/* 3D Illustration Graphic */}
                  <div className="shrink-0">{meta.render3DIllustration(isFront)}</div>
                </div>

                {/* BOTTOM ROW: Action CTA button + Swipe dots */}
                <div className="flex justify-between items-center gap-2 z-10 pt-0.5 w-full min-w-0">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-[#64748B] shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        prevCard();
                      }}
                      className="p-1 rounded-full hover:bg-black/5 transition-colors cursor-pointer"
                      title="Previous"
                    >
                      <ChevronLeft className="w-3.5 h-3.5 text-[#475569]" />
                    </button>
                    <span>
                      {activeIndex + 1}/{cards.length}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        nextCard();
                      }}
                      className="p-1 rounded-full hover:bg-black/5 transition-colors cursor-pointer"
                      title="Next"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-[#475569]" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(card.targetScreen);
                    }}
                    className={`px-3 py-1 rounded-xl text-[10px] font-black active:scale-95 transition-all cursor-pointer shadow-xs flex items-center gap-1 whitespace-nowrap shrink-0 ${meta.ctaBg}`}
                  >
                    <span>{meta.ctaText}</span>
                    <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            );
          })}
      </div>

      {/* PAGINATION DOTS WITH PROGRESS ACCENT */}
      <div className="flex justify-center items-center gap-1.5 mt-2">
        {cards.map((_, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setActiveIndex(idx);
                setIsInteracting(false);
              }}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                isActive
                  ? 'w-6 h-1.5 bg-[#7C3AED] shadow-2xs'
                  : 'w-1.5 h-1.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
              }`}
              title={`Card ${idx + 1}`}
            />
          );
        })}
      </div>
    </section>
  );
};
