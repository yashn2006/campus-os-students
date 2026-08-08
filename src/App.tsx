import React, { useState, useEffect } from 'react';
import {
  ScreenId,
  StudentProfile,
  StackedHeroCard,
  Lecture,
  Assignment,
  LibraryBook,
  SubjectAttendance,
  SubjectGrade,
  CampusEvent,
  GoalItem,
  NotificationItem,
  OfflineAttendanceRecord,
} from './types';
import {
  INITIAL_STUDENT_PROFILE,
  INITIAL_HERO_CARDS,
  INITIAL_LECTURES,
  INITIAL_ASSIGNMENTS,
  INITIAL_LIBRARY_BOOKS,
  INITIAL_SUBJECT_ATTENDANCE,
  INITIAL_SUBJECT_GRADES,
  INITIAL_EVENTS,
  INITIAL_GOALS,
  INITIAL_NOTIFICATIONS,
} from './data/mockData';

// Layout & Frame Components
import { MobileFrame } from './components/MobileFrame';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { QRScannerModal } from './components/QRScannerModal';
import { Toast } from './components/Toast';
import { IOSPwaInstallGate } from './components/IOSPwaInstallGate';
import { ThemeTransitionOverlay } from './components/ThemeTransitionOverlay';
import { supabase, isSupabaseConfigured } from './lib/supabase';
import { loadFullAppState, saveFullAppState } from './lib/appStatePersistence';

// Screens
import { SplashScreen } from './screens/SplashScreen';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { LoginScreen } from './screens/LoginScreen';
import { OtpScreen } from './screens/OtpScreen';
import { AuthLoadingScreen } from './screens/AuthLoadingScreen';
import { ProfileSetupScreen } from './screens/ProfileSetupScreen';
import { AuthSuccessScreen } from './screens/AuthSuccessScreen';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { HomeScreen } from './screens/HomeScreen';
import { LiveAttendanceScreen } from './screens/LiveAttendanceScreen';
import { TimetableScreen } from './screens/TimetableScreen';
import { ClassDetailsScreen } from './screens/ClassDetailsScreen';
import { AssignmentsScreen } from './screens/AssignmentsScreen';
import { LibraryScreen } from './screens/LibraryScreen';
import { AnalyticsScreen } from './screens/AnalyticsScreen';
import { ResultsScreen } from './screens/ResultsScreen';
import { CreditsScreen } from './screens/CreditsScreen';
import { GoalsScreen } from './screens/GoalsScreen';
import { EventsScreen } from './screens/EventsScreen';
import { NotificationsScreen } from './screens/NotificationsScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { SettingsScreen } from './screens/SettingsScreen';

export function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('auth_loading');
  const [student, setStudent] = useState<StudentProfile>(INITIAL_STUDENT_PROFILE);
  const [heroCards, setHeroCards] = useState<StackedHeroCard[]>(INITIAL_HERO_CARDS);
  const [lectures, setLectures] = useState<Lecture[]>(INITIAL_LECTURES);
  const [assignments, setAssignments] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);
  const [books, setBooks] = useState<LibraryBook[]>(INITIAL_LIBRARY_BOOKS);
  const [subjects, setSubjects] = useState<SubjectAttendance[]>(INITIAL_SUBJECT_ATTENDANCE);
  const [grades] = useState<SubjectGrade[]>(INITIAL_SUBJECT_GRADES);
  const [events, setEvents] = useState<CampusEvent[]>(INITIAL_EVENTS);
  const [goals, setGoals] = useState<GoalItem[]>(INITIAL_GOALS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Restore full state from IndexedDB / LocalStorage on app boot
  useEffect(() => {
    loadFullAppState().then((saved) => {
      if (saved) {
        if (saved.activeScreen && saved.activeScreen !== 'auth_loading') {
          setActiveScreen(saved.activeScreen as ScreenId);
        }
        if (typeof saved.isDarkMode === 'boolean') {
          setIsDarkMode(saved.isDarkMode);
        }
        if (Array.isArray(saved.markedLectures) && saved.markedLectures.length > 0) {
          setMarkedLectures(saved.markedLectures);
        }
        if (Array.isArray(saved.offlineQueue)) {
          setOfflineQueue(saved.offlineQueue);
        }
      }
    });
  }, []);

  // Dark Mode Theme State (Default: Light Theme)
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Supabase Realtime Subscription to 'sessions' table for live attendance notifications
  useEffect(() => {
    if (!isSupabaseConfigured) return;

    const channel = supabase
      .channel('public:sessions')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'sessions' },
        (payload) => {
          if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
            const sessionData = payload.new;
            if (sessionData && sessionData.status === 'active') {
              showToast('🔔 Live Lecture Session Started! Tap to scan attendance.', 'info');
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // App States & Scans
  const [selectedLecture, setSelectedLecture] = useState<Lecture>(INITIAL_LECTURES[1]); // CS201
  const [markedLectures, setMarkedLectures] = useState<string[]>(['lec-1']);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [autoSync, setAutoSync] = useState(true);
  const [offlineQueue, setOfflineQueue] = useState<OfflineAttendanceRecord[]>([]);

  // Save full state whenever key state changes
  useEffect(() => {
    if (activeScreen !== 'auth_loading' && activeScreen !== 'splash') {
      saveFullAppState({
        activeScreen,
        isDarkMode,
        markedLectures,
        offlineQueue,
      });
    }
  }, [activeScreen, isDarkMode, markedLectures, offlineQueue]);

  // Toast State
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(
    null
  );

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const [themeTransition, setThemeTransition] = useState<{
    isTriggered: boolean;
    origin: { x: number; y: number };
  }>({
    isTriggered: false,
    origin: { x: 0, y: 0 },
  });

  const toggleDarkMode = (e?: React.MouseEvent) => {
    if (e) {
      setThemeTransition({
        isTriggered: true,
        origin: { x: e.clientX, y: e.clientY },
      });
    } else {
      setThemeTransition({
        isTriggered: true,
        origin: { x: typeof window !== 'undefined' ? window.innerWidth * 0.9 : 300, y: 40 },
      });
    }

    const nextState = !isDarkMode;
    const update = () => {
      setIsDarkMode(nextState);
    };

    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      (document as any).startViewTransition(() => {
        update();
      });
    } else {
      update();
    }

    showToast(nextState ? 'Dark Mode theme activated 🌙' : 'Light Mode theme activated ☀️', 'info');
  };

  const handleUpdateStudent = (updated: Partial<StudentProfile>) => {
    setStudent((prev) => ({ ...prev, ...updated }));
  };

  // Mark Attendance Handler
  const handleAttendanceSuccess = (lectureId: string, offline: boolean) => {
    if (!markedLectures.includes(lectureId)) {
      setMarkedLectures((prev) => [...prev, lectureId]);

      // Update lecture status in list
      setLectures((prev) =>
        prev.map((lec) =>
          lec.id === lectureId
            ? { ...lec, attendanceStatus: 'marked', attendancePercentage: Math.min(100, lec.attendancePercentage + 2) }
            : lec
        )
      );

      // Increment overall attendance
      setStudent((prev) => ({
        ...prev,
        overallAttendance: Math.min(100, prev.overallAttendance + 1),
      }));
    }

    if (offline) {
      const record: OfflineAttendanceRecord = {
        id: `rec-${Date.now()}`,
        lectureId,
        lectureTitle: selectedLecture.title,
        scannedAt: new Date().toLocaleTimeString(),
        qrPayload: `QR_PASS_${lectureId}_${Date.now()}`,
        isSynced: false,
      };
      setOfflineQueue((prev) => [...prev, record]);
      showToast('Attendance Saved Offline! Will auto-sync when online.', 'info');
    } else {
      showToast('Attendance Marked Present & Synced with College Portal! ✓', 'success');
    }
  };

  // Auto sync when coming online
  const handleSyncNow = () => {
    if (offlineQueue.length === 0) {
      showToast('No pending records to sync.', 'info');
      return;
    }
    const count = offlineQueue.length;
    setOfflineQueue([]);
    setIsOffline(false);
    showToast(`Successfully synced ${count} offline attendance records!`, 'success');
  };

  // Assignment submission handler
  const handleSubmitAssignment = (assignmentId: string, fileName: string) => {
    setAssignments((prev) =>
      prev.map((a) =>
        a.id === assignmentId
          ? {
              ...a,
              status: 'Submitted',
              readinessPercentage: 100,
              submissionFile: fileName,
              submittedAt: 'Just Now',
            }
          : a
      )
    );
    showToast(`Assignment "${fileName}" submitted successfully!`, 'success');
  };

  // Library renewal handler
  const handleRenewBook = (bookId: string) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === bookId
          ? {
              ...b,
              daysRemaining: (b.daysRemaining || 0) + 14,
              isDueSoon: false,
              dueDate: 'Nov 20, 2026',
            }
          : b
      )
    );
    showToast('Book renewed for +14 days!', 'success');
  };

  // RSVP Event handler
  const handleToggleRsvp = (eventId: string) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? {
              ...e,
              isRsvped: !e.isRsvped,
              attendeesCount: e.isRsvped ? e.attendeesCount - 1 : e.attendeesCount + 1,
            }
          : e
      )
    );
    const ev = events.find((e) => e.id === eventId);
    if (ev && !ev.isRsvped) {
      showToast(`RSVP Confirmed for ${ev.title}!`, 'success');
    } else {
      showToast('RSVP Cancelled.', 'info');
    }
  };

  // Add Goal handler
  const handleAddGoal = (newGoal: GoalItem) => {
    setGoals((prev) => [newGoal, ...prev]);
    showToast('New academic milestone goal created!', 'success');
  };

  // Mark all notifications read
  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isUnread: false })));
    showToast('All notifications marked as read.', 'info');
  };

  const unreadCount = notifications.filter((n) => n.isUnread).length;

  return (
    <IOSPwaInstallGate>
      <div className={isDarkMode ? 'dark' : ''}>
        <MobileFrame>
          {/* Toast Notification */}
          {toast && (
            <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
          )}

        {/* Header Bar */}
        <Header
          student={student}
          activeScreen={activeScreen}
          navigate={setActiveScreen}
          unreadNotificationsCount={unreadCount}
          isOffline={isOffline}
          offlineQueueCount={offlineQueue.length}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
        />

        {/* Main Screen Router Content */}
        <main className="flex-1 pb-16 bg-[#F8FAFC] dark:bg-[#0F172A] text-[#0F172A] dark:text-white transition-colors">
          {activeScreen === 'splash' && <SplashScreen navigate={setActiveScreen} />}

          {activeScreen === 'welcome' && <WelcomeScreen navigate={setActiveScreen} />}

          {activeScreen === 'login' && (
            <LoginScreen student={student} navigate={setActiveScreen} />
          )}

          {activeScreen === 'otp' && (
            <OtpScreen email={student.email} navigate={setActiveScreen} />
          )}

          {activeScreen === 'auth_loading' && (
            <AuthLoadingScreen navigate={setActiveScreen} />
          )}

          {activeScreen === 'profile_setup' && (
            <ProfileSetupScreen
              student={student}
              navigate={setActiveScreen}
              onUpdateStudent={handleUpdateStudent}
            />
          )}

          {activeScreen === 'auth_success' && (
            <AuthSuccessScreen student={student} navigate={setActiveScreen} />
          )}

          {activeScreen === 'onboarding' && <OnboardingScreen navigate={setActiveScreen} />}

          {activeScreen === 'home' && (
            <HomeScreen
              student={student}
              lectures={lectures}
              assignments={assignments}
              books={books}
              subjects={subjects}
              grades={grades}
              goals={goals}
              navigate={setActiveScreen}
              openScannerModal={() => setIsScannerOpen(true)}
              onSelectLecture={setSelectedLecture}
              onSubmitAssignment={handleSubmitAssignment}
              onRenewBook={handleRenewBook}
              onAddGoal={handleAddGoal}
            />
          )}

          {activeScreen === 'live_attendance' && (
            <LiveAttendanceScreen
              currentLecture={selectedLecture}
              navigate={setActiveScreen}
              openScannerModal={() => setIsScannerOpen(true)}
              isOffline={isOffline}
              markedLectures={markedLectures}
            />
          )}

          {activeScreen === 'timetable' && (
            <TimetableScreen
              lectures={lectures}
              navigate={setActiveScreen}
              onSelectLecture={setSelectedLecture}
            />
          )}

          {activeScreen === 'class_details' && (
            <ClassDetailsScreen
              lecture={selectedLecture}
              navigate={setActiveScreen}
              openScannerModal={() => setIsScannerOpen(true)}
            />
          )}

          {activeScreen === 'assignments' && (
            <AssignmentsScreen
              assignments={assignments}
              navigate={setActiveScreen}
              onSubmitAssignment={handleSubmitAssignment}
            />
          )}

          {activeScreen === 'library' && (
            <LibraryScreen
              student={student}
              books={books}
              navigate={setActiveScreen}
              onRenewBook={handleRenewBook}
            />
          )}

          {(activeScreen === 'analytics' || activeScreen === 'attendance_analytics') && (
            <AnalyticsScreen
              student={student}
              lectures={lectures}
              assignments={assignments}
              books={books}
              subjects={subjects}
              grades={grades}
              goals={goals}
              navigate={setActiveScreen}
              openScannerModal={() => setIsScannerOpen(true)}
              onSelectLecture={setSelectedLecture}
              onSubmitAssignment={handleSubmitAssignment}
              onRenewBook={handleRenewBook}
              onAddGoal={handleAddGoal}
            />
          )}

          {activeScreen === 'results' && (
            <ResultsScreen student={student} grades={grades} navigate={setActiveScreen} />
          )}

          {activeScreen === 'credits' && (
            <CreditsScreen student={student} navigate={setActiveScreen} />
          )}

          {activeScreen === 'goals' && (
            <GoalsScreen goals={goals} navigate={setActiveScreen} onAddGoal={handleAddGoal} />
          )}

          {activeScreen === 'events' && (
            <EventsScreen
              events={events}
              navigate={setActiveScreen}
              onToggleRsvp={handleToggleRsvp}
            />
          )}

          {activeScreen === 'notifications' && (
            <NotificationsScreen
              notifications={notifications}
              navigate={setActiveScreen}
              onMarkAllAsRead={handleMarkAllNotificationsRead}
            />
          )}

          {activeScreen === 'profile' && (
            <ProfileScreen student={student} navigate={setActiveScreen} />
          )}

          {activeScreen === 'settings' && (
            <SettingsScreen
              navigate={setActiveScreen}
              isOffline={isOffline}
              setIsOffline={setIsOffline}
              autoSync={autoSync}
              setAutoSync={setAutoSync}
              offlineQueueCount={offlineQueue.length}
              onSyncNow={handleSyncNow}
              isDarkMode={isDarkMode}
              onToggleDarkMode={toggleDarkMode}
              isLiveSessionActive={true}
            />
          )}
        </main>

        {/* QR Camera Attendance Scanner Modal */}
        <QRScannerModal
          isOpen={isScannerOpen}
          onClose={() => setIsScannerOpen(false)}
          currentLecture={selectedLecture}
          onAttendanceSuccess={handleAttendanceSuccess}
          isOffline={isOffline}
        />

        {/* Bottom Floating Navigation Bar */}
        <BottomNav
          activeScreen={activeScreen}
          navigate={setActiveScreen}
          openScannerModal={() => setIsScannerOpen(true)}
          unreadCount={unreadCount}
        />

        {/* Signature Physics Theme Transition Wave & Sparkles Overlay */}
        <ThemeTransitionOverlay
          isTriggered={themeTransition.isTriggered}
          isDarkMode={isDarkMode}
          origin={themeTransition.origin}
          onComplete={() => setThemeTransition((prev) => ({ ...prev, isTriggered: false }))}
        />
      </MobileFrame>
    </div>
    </IOSPwaInstallGate>
  );
}

export default App;
