import React from 'react';
import { motion } from 'motion/react';
import { ScreenId, StudentProfile, Lecture } from '../types';
import { StackedHeroCards } from '../components/StackedHeroCards';
import { QuickActionGrid } from '../components/QuickActionGrid';
import { TodayTimeline } from '../components/TodayTimeline';
import { INITIAL_HERO_CARDS } from '../data/mockData';
import { Bot, Sparkles, Calendar, Clock, ChevronRight } from 'lucide-react';

interface HomeScreenProps {
  student: StudentProfile;
  lectures: Lecture[];
  navigate: (screen: ScreenId) => void;
  openScannerModal: () => void;
  onSelectLecture: (lec: Lecture) => void;
  assignments?: any;
  books?: any;
  subjects?: any;
  grades?: any;
  goals?: any;
  onSubmitAssignment?: any;
  onRenewBook?: any;
  onAddGoal?: any;
  initialTab?: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  student,
  lectures,
  navigate,
  openScannerModal,
  onSelectLecture,
}) => {
  const firstName = student.name.split(' ')[0] || 'Saad';

  const upcomingDeadlines = [
    {
      id: 'dsa-1',
      title: 'DSA Assignment',
      due: 'Due Tomorrow',
      time: '11:59 PM',
      priority: 'HIGH',
      badgeBg: 'bg-rose-500/10 text-rose-500 border-rose-500/30',
      iconBg: 'bg-rose-500/20 text-rose-400',
    },
    {
      id: 'os-1',
      title: 'OS Lab Report',
      due: 'Due 18 May',
      time: '11:59 PM',
      priority: 'MEDIUM',
      badgeBg: 'bg-sky-500/10 text-sky-500 border-sky-500/30',
      iconBg: 'bg-sky-500/20 text-sky-400',
    },
    {
      id: 'math-1',
      title: 'Maths Problem Set',
      due: 'Due 20 May',
      time: '11:59 PM',
      priority: 'LOW',
      badgeBg: 'bg-amber-500/10 text-amber-500 border-amber-500/30',
      iconBg: 'bg-amber-500/20 text-amber-400',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6 pb-28 max-w-2xl mx-auto px-4 sm:px-6 pt-2"
    >
      {/* 0. Signature Greeting Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1 pt-1"
      >
        <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <span>Good Morning, <strong className="text-slate-900 dark:text-white font-black">{firstName}! 👋</strong></span>
        </p>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          Ready to{' '}
          <span className="bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 bg-clip-text text-transparent">
            level up
          </span>{' '}
          today?
        </h1>

        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wide">
          Focus. Learn. Achieve.
        </p>
      </motion.div>

      {/* 1. Stacked Hero Cards Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <StackedHeroCards cards={INITIAL_HERO_CARDS} navigate={navigate} />
      </motion.div>

      {/* 2. Quick Access 5-Column Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <QuickActionGrid navigate={navigate} openScanner={openScannerModal} />
      </motion.div>

      {/* 3. Today's Schedule Live Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.45 }}
      >
        <TodayTimeline
          lectures={lectures}
          navigate={navigate}
          onSelectLecture={onSelectLecture}
          openScannerModal={openScannerModal}
        />
      </motion.div>

      {/* 4. AI Study Buddy Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.38, duration: 0.4 }}
        onClick={openScannerModal}
        className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 rounded-3xl p-4 shadow-xl flex items-center justify-between cursor-pointer group hover:border-indigo-500/60 transition-all relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center gap-3.5 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-indigo-300 shrink-0 group-hover:scale-105 transition-transform shadow-lg">
            <Bot className="w-6 h-6 animate-pulse text-cyan-400" />
          </div>
          <div>
            <h3 className="text-sm font-black text-white tracking-tight flex items-center gap-1.5">
              <span>AI Study Buddy</span>
            </h3>
            <p className="text-[11px] font-medium text-indigo-200/80">
              Ask anything. Get smarter.
            </p>
          </div>
        </div>

        <button className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-black shadow-md shadow-indigo-500/30 flex items-center gap-1.5 shrink-0 group-hover:scale-105 transition-transform cursor-pointer">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Chat Now</span>
        </button>
      </motion.div>

      {/* 5. Upcoming Deadlines Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.4 }}
        className="space-y-3"
      >
        <div className="flex justify-between items-center px-0.5">
          <h2 className="text-[15px] sm:text-[16px] font-black text-slate-900 dark:text-white tracking-tight">
            Upcoming Deadlines
          </h2>
          <button
            onClick={() => navigate('assignments')}
            className="text-[12px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer flex items-center gap-0.5"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {upcomingDeadlines.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate('assignments')}
              className="bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 p-3.5 rounded-2xl shadow-xs hover:border-indigo-500/50 transition-all cursor-pointer space-y-2 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-xl ${item.iconBg}`}>
                  <Calendar className="w-4 h-4" />
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${item.badgeBg}`}>
                  {item.priority}
                </span>
              </div>

              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white tracking-tight truncate">
                  {item.title}
                </h4>
                <p className="text-[10.5px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{item.due} • {item.time}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
