import React, { useState, useEffect } from 'react';
import { ScreenId } from '../types';
import {
  ArrowLeft,
  WifiOff,
  RefreshCw,
  Sun,
  Moon,
  Shield,
  HelpCircle,
  Smartphone,
  CheckCircle2,
  Lock,
  LogOut,
  Cpu,
  ShieldAlert,
} from 'lucide-react';
import { getPersistentDeviceId } from '../lib/deviceId';

interface SettingsScreenProps {
  navigate: (screen: ScreenId) => void;
  isOffline: boolean;
  setIsOffline: (val: boolean) => void;
  autoSync: boolean;
  setAutoSync: (val: boolean) => void;
  offlineQueueCount: number;
  onSyncNow: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  isLiveSessionActive?: boolean;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  navigate,
  isOffline,
  setIsOffline,
  autoSync,
  setAutoSync,
  offlineQueueCount,
  onSyncNow,
  isDarkMode,
  onToggleDarkMode,
  isLiveSessionActive = true,
}) => {
  const [boundDeviceId, setBoundDeviceId] = useState<string>('binding...');

  useEffect(() => {
    getPersistentDeviceId().then(setBoundDeviceId);
  }, []);
  return (
    <div className="space-y-6 pb-28 max-w-2xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={() => navigate('home')}
          className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 flex items-center justify-center text-[#0F172A] dark:text-white hover:bg-slate-50 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-black text-[#0F172A] dark:text-white tracking-tight">
            OS Preferences & Settings
          </h1>
          <p className="text-xs text-[#64748B] dark:text-slate-400 font-medium">Theme, Offline Engine & System Controls</p>
        </div>
      </div>

      {/* Theme Settings Box */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-[#E2E8F0] dark:border-slate-700 shadow-2xs space-y-4">
        <h3 className="text-xs font-black uppercase tracking-widest text-[#6366F1]">
          Appearance & Theme
        </h3>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-3">
            {isDarkMode ? <Moon className="w-5 h-5 text-indigo-400" /> : <Sun className="w-5 h-5 text-amber-500" />}
            <div>
              <p className="text-xs font-extrabold text-[#0F172A] dark:text-white">Dark Mode Theme</p>
              <p className="text-[10px] text-[#64748B] dark:text-slate-400 font-medium">
                {isDarkMode ? 'Eye-safe dark canvas enabled' : 'Clean high-contrast light theme active'}
              </p>
            </div>
          </div>
          <button
            onClick={onToggleDarkMode}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
              isDarkMode ? 'bg-[#6366F1]' : 'bg-slate-300'
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-xs transition-transform ${
                isDarkMode ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Offline & Sync Settings Box */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-[#E2E8F0] dark:border-slate-700 shadow-2xs space-y-4">
        <h3 className="text-xs font-black uppercase tracking-widest text-[#06B6D4]">
          Offline & Connectivity Engine
        </h3>

        {/* Offline Mode Toggle */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-3">
            <WifiOff className="w-5 h-5 text-amber-500" />
            <div>
              <p className="text-xs font-extrabold text-[#0F172A] dark:text-white">Simulate Offline Mode</p>
              <p className="text-[10px] text-[#64748B] dark:text-slate-400 font-medium">Queue attendance scans locally without network</p>
            </div>
          </div>
          <button
            onClick={() => setIsOffline(!isOffline)}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
              isOffline ? 'bg-amber-500' : 'bg-slate-300'
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-xs transition-transform ${
                isOffline ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Auto Sync Toggle */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-5 h-5 text-[#6366F1]" />
            <div>
              <p className="text-xs font-extrabold text-[#0F172A] dark:text-white">Auto-Sync When Online</p>
              <p className="text-[10px] text-[#64748B] dark:text-slate-400 font-medium">Sync pending attendance records automatically</p>
            </div>
          </div>
          <button
            onClick={() => setAutoSync(!autoSync)}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
              autoSync ? 'bg-[#6366F1]' : 'bg-slate-300'
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-xs transition-transform ${
                autoSync ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Sync Action */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-[#64748B] dark:text-slate-300">Queued Scans:</span>
            <span className="ml-1 font-black text-amber-600 dark:text-amber-400">{offlineQueueCount} Pending</span>
          </div>

          <button
            onClick={onSyncNow}
            disabled={offlineQueueCount === 0}
            className="px-4 py-2 bg-[#6366F1] disabled:opacity-50 hover:bg-indigo-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-2xs active:scale-95 transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Force Sync Now</span>
          </button>
        </div>
      </div>

      {/* Hardware & Device Binding Info */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-[#E2E8F0] dark:border-slate-700 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-widest text-[#6366F1] flex items-center gap-1.5">
            <Cpu className="w-4 h-4" />
            <span>Bound Hardware Device</span>
          </h3>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-200 dark:border-emerald-800">
            Active Binding
          </span>
        </div>

        <p className="text-[11px] text-[#64748B] dark:text-slate-400 font-medium leading-relaxed">
          Attendance records are hardware-verified using this unique device identifier to prevent proxy scans.
        </p>

        <div className="bg-slate-50 dark:bg-slate-900/80 p-3 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-between">
          <span className="truncate mr-2">{boundDeviceId}</span>
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
        </div>
      </div>

      {/* Session Lock & Logout Security Box */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-[#E2E8F0] dark:border-slate-700 shadow-2xs space-y-3">
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
          Account Security & Session Lock
        </h3>

        {isLiveSessionActive ? (
          <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-xs font-extrabold text-amber-900 dark:text-amber-200">
                Session Soft-Lock Active
              </p>
              <p className="text-[11px] text-amber-800/90 dark:text-amber-300/80 font-medium leading-relaxed">
                A live attendance window is active for your class ({'CS201 Data Structures'}). Logging out is soft-locked to prevent session tampering during active lectures.
              </p>
            </div>
          </div>
        ) : null}

        <button
          onClick={() => {
            if (isLiveSessionActive) {
              alert('Soft Session-Lock: Live lecture attendance is currently active for your class. Logging out now will be flagged in portal logs.');
            } else {
              navigate('welcome');
            }
          }}
          className={`w-full py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border transition-all cursor-pointer ${
            isLiveSessionActive
              ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
              : 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900 hover:bg-rose-100'
          }`}
        >
          {isLiveSessionActive ? <Lock className="w-4 h-4 text-amber-500" /> : <LogOut className="w-4 h-4" />}
          <span>{isLiveSessionActive ? 'Logout Soft-Locked (Session Active)' : 'Log Out of Student Account'}</span>
        </button>
      </div>

      {/* App Info Box */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-[#E2E8F0] dark:border-slate-700 shadow-2xs space-y-3">
        <h3 className="text-xs font-black uppercase tracking-widest text-[#64748B] dark:text-slate-400">
          About Campus OS
        </h3>

        <div className="flex justify-between items-center text-xs pt-1">
          <span className="text-[#64748B] dark:text-slate-300 font-bold">PWA Build Version</span>
          <span className="font-black text-[#0F172A] dark:text-white">v2.4.1 (Flagship)</span>
        </div>

        <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-100 dark:border-slate-700">
          <span className="text-[#64748B] dark:text-slate-300 font-bold">Architecture</span>
          <span className="font-black text-[#6366F1]">Aurora Design Engine</span>
        </div>
      </div>
    </div>
  );
};
