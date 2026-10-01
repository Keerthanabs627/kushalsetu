import React from 'react';
import { X, Settings, Cpu, Database, RefreshCw, Shield, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface DeveloperSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDemoMode: boolean;
  onToggleDemoMode: () => void;
  onResetData?: () => void;
}

export const DeveloperSettingsModal: React.FC<DeveloperSettingsModalProps> = ({
  isOpen,
  onClose,
  isDemoMode,
  onToggleDemoMode,
  onResetData
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Developer & Stage Controls
              </h2>
              <p className="text-xs text-slate-400">
                Diagnostic switches and offline stage testing (hidden from primary judge UI)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs text-slate-300">
          {/* Active Engine Toggle */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Execution Engine Mode</span>
                <span className="text-[11px] text-slate-400">
                  {isDemoMode
                    ? 'Offline fast benchmark simulation (deterministic demo)'
                    : 'Live Gemini API + Full-Stack Express Server (Default)'}
                </span>
              </div>
              <button
                onClick={onToggleDemoMode}
                className={`px-3 py-1.5 rounded-lg font-bold text-xs border transition-all ${
                  !isDemoMode
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-sm'
                    : 'bg-indigo-600 text-white border-indigo-400'
                }`}
              >
                {!isDemoMode ? 'Live AI Mode' : 'Offline Benchmark'}
              </button>
            </div>
          </div>

          {/* Model Status & Telemetry */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-[11px]">
            <span className="font-bold text-white block">System Health Diagnostics:</span>
            <div className="flex items-center justify-between text-slate-400">
              <span>Primary LLM:</span>
              <span className="font-mono text-emerald-400 font-bold">gemini-3.5-flash</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Multimodal Vision:</span>
              <span className="font-mono text-sky-400 font-bold">Inline Base64 Part</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Rate Limit Mitigation:</span>
              <span className="font-mono text-amber-300">Atomic Multi-Agent Batch</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Credential Security:</span>
              <span className="font-mono text-emerald-400">SHA-256 Digest Signing</span>
            </div>
          </div>

          {/* Warning Notice */}
          <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-200 text-[11px] flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>
              Leave in <strong>Live AI Mode</strong> for all judging evaluations. Offline Benchmark should only be used if presenting in an auditorium with zero Internet connectivity.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/70 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
          >
            Apply & Return
          </button>
        </div>
      </div>
    </div>
  );
};
