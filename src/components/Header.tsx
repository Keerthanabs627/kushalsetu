import React from 'react';
import { ShieldCheck, Cpu, Code2, Sparkles, BookOpen } from 'lucide-react';

interface HeaderProps {
  onOpenCodeExplorer: () => void;
  isRunning: boolean;
  isDemoMode: boolean;
  onToggleDemoMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCodeExplorer,
  isRunning,
  isDemoMode,
  onToggleDemoMode
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white px-4 lg:px-8 py-3.5 sticky top-0 z-30 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left branding */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-emerald-600 flex items-center justify-center shadow-md shadow-orange-500/20 text-white font-black text-xl tracking-tighter border border-white/20">
            KS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-lg lg:text-xl tracking-tight bg-gradient-to-r from-amber-300 via-orange-200 to-emerald-300 bg-clip-text text-transparent">
                KAUSHALSETU AI
              </h1>
              <span className="bg-orange-500/20 text-orange-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-orange-500/30 uppercase tracking-wider">
                Bharat Command Center
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium hidden sm:block">
              "Transforming Informal Skills into Verified Employability" • LangGraph 8-Agent Infrastructure
            </p>
          </div>
        </div>

        {/* Right meta badges & controllers */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          {/* Demo Mode Toggle */}
          <button
            onClick={onToggleDemoMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-bold text-xs transition-all ${
              isDemoMode
                ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-500/20'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
            title="Toggle Demo Mode for judging walkthrough"
          >
            <span className={`w-2 h-2 rounded-full ${isDemoMode ? 'bg-white animate-ping' : 'bg-slate-500'}`} />
            <span>Demo Mode: {isDemoMode ? 'Active' : 'Standby'}</span>
          </button>

          <div className="hidden lg:flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Gemini 2.5 Flash / Vision</span>
          </div>

          <button
            onClick={onOpenCodeExplorer}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium px-3 py-1.5 rounded-lg border border-slate-700 shadow-sm transition-all"
          >
            <Code2 className="w-3.5 h-3.5 text-indigo-300" />
            <span>Python & LangGraph Codebase</span>
          </button>
        </div>
      </div>
    </header>
  );
};
