import React, { useState } from 'react';
import { ScreenId, Assignment } from '../types';
import {
  ArrowLeft,
  FileCheck,
  UploadCloud,
  Clock,
  AlertCircle,
  CheckCircle2,
  FileText,
  X,
  Sparkles,
} from 'lucide-react';

interface AssignmentsScreenProps {
  assignments: Assignment[];
  navigate: (screen: ScreenId) => void;
  onSubmitAssignment: (assignmentId: string, fileName: string) => void;
}

export const AssignmentsScreen: React.FC<AssignmentsScreenProps> = ({
  assignments,
  navigate,
  onSubmitAssignment,
}) => {
  const [activeTab, setActiveTab] = useState<'Pending' | 'Submitted' | 'Completed'>('Pending');
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadFileName, setUploadFileName] = useState('');

  const filtered = assignments.filter((a) => a.status === activeTab);

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssignment) return;
    const fileName = uploadFileName || `${selectedAssignment.title.replace(/\s+/g, '_')}_Final.pdf`;
    onSubmitAssignment(selectedAssignment.id, fileName);
    setSelectedAssignment(null);
    setUploadFileName('');
  };

  return (
    <div className="space-y-6 pb-28 max-w-2xl mx-auto px-4 sm:px-6">
      {/* Top Header */}
      <div className="flex justify-between items-center pt-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('home')}
            className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-200 active:scale-95 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Assignments & Tasks
            </h1>
            <p className="text-xs text-slate-500 font-medium">12 / 16 Course Submissions Done</p>
          </div>
        </div>

        <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
          75%
        </div>
      </div>

      {/* Segmented Control Tabs */}
      <div className="bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl flex justify-between gap-1">
        {(['Pending', 'Submitted', 'Completed'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab
                ? 'bg-white dark:bg-slate-800 text-indigo-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Assignments List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">All caught up!</p>
            <p className="text-xs text-slate-400 mt-0.5">No {activeTab.toLowerCase()} assignments found.</p>
          </div>
        ) : (
          filtered.map((asg) => (
            <div
              key={asg.id}
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-indigo-200 transition-all space-y-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${
                        asg.priority === 'High'
                          ? 'bg-rose-100 text-rose-700'
                          : asg.priority === 'Medium'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {asg.priority} PRIORITY
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">{asg.subject}</span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    {asg.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">{asg.faculty}</p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">DUE DATE</span>
                  <p className="text-xs font-bold text-rose-600 flex items-center gap-1 justify-end">
                    <Clock className="w-3.5 h-3.5" />
                    {asg.dueDate}
                  </p>
                </div>
              </div>

              {/* Progress & Submit Bar */}
              {asg.status === 'Pending' ? (
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-indigo-600 h-full rounded-full"
                        style={{ width: `${asg.readinessPercentage}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500">
                      {asg.readinessPercentage}% Draft
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedAssignment(asg)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
                  >
                    <UploadCloud className="w-4 h-4" />
                    <span>Upload Submission</span>
                  </button>
                </div>
              ) : (
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Submitted ({asg.submissionFile})</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{asg.submittedAt}</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Upload Submission Drawer / Modal */}
      {selectedAssignment && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-t-[32px] sm:rounded-[32px] p-6 max-w-md w-full space-y-4 shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Submit Assignment
                </h3>
                <p className="text-xs text-slate-500">{selectedAssignment.title}</p>
              </div>
              <button
                onClick={() => setSelectedAssignment(null)}
                className="p-1.5 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              {/* Drag and drop box */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragActive(false);
                  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    setUploadFileName(e.dataTransfer.files[0].name);
                  }
                }}
                className={`border-2 border-dashed rounded-2xl p-8 text-center space-y-2 cursor-pointer transition-colors ${
                  dragActive
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40'
                    : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100'
                }`}
              >
                <UploadCloud className="w-10 h-10 text-indigo-600 mx-auto" />
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {uploadFileName ? uploadFileName : 'Drag and drop PDF or ZIP file here'}
                </p>
                <p className="text-[10px] text-slate-400">Supported formats: .pdf, .zip, .docx (Max 25MB)</p>
                <label className="inline-block bg-white dark:bg-slate-800 text-indigo-600 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold cursor-pointer hover:border-indigo-300">
                  Browse Files
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setUploadFileName(e.target.files[0].name);
                      }
                    }}
                  />
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-2xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all text-xs"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm & Submit Solution</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
