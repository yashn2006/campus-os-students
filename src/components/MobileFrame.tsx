import React from 'react';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  return (
    <div className="min-h-screen min-h-[100dvh] w-full bg-[#F8FAFC] dark:bg-[#0F172A] text-[#0F172A] dark:text-white font-sans antialiased selection:bg-[#6366F1] selection:text-white relative overflow-x-hidden transition-colors duration-300">
      {/* Background Soft Glowing Ambient Light Orbs */}
      <div className="fixed top-[-80px] left-[-80px] w-96 h-96 bg-indigo-300/25 dark:bg-indigo-900/20 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="fixed top-[30%] right-[-100px] w-80 h-80 bg-sky-300/25 dark:bg-sky-900/20 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="fixed bottom-[-60px] left-[10%] w-96 h-96 bg-purple-300/20 dark:bg-purple-900/20 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="w-full sm:max-w-md sm:mx-auto min-h-screen min-h-[100dvh] bg-[#F8FAFC] dark:bg-[#0F172A] flex flex-col relative overflow-hidden z-10 sm:shadow-2xl transition-colors duration-300">
        <div className="flex-1 flex flex-col relative">
          {children}
        </div>
      </div>
    </div>
  );
};
