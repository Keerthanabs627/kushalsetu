import React from 'react';
import { ShieldCheck, Cpu, Code2, Sparkles, BookOpen, Globe, Languages, Settings, LayoutDashboard, Layers, Trophy } from 'lucide-react';
import { LanguageCode, TRANSLATIONS } from '../utils/translations';

interface HeaderProps {
  onOpenCodeExplorer: () => void;
  isRunning: boolean;
  isDemoMode: boolean;
  onOpenDeveloperSettings: () => void;
  onOpenJudgeWalkthrough: () => void;
  viewMode: 'executive' | 'detailed';
  onSelectViewMode: (mode: 'executive' | 'detailed') => void;
  language: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCodeExplorer,
  isRunning,
  isDemoMode,
  onOpenDeveloperSettings,
  onOpenJudgeWalkthrough,
  viewMode,
  onSelectViewMode,
  language,
  onSelectLanguage
}) => {
  const t = TRANSLATIONS[language];

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white px-4 lg:px-8 py-3 sticky top-0 z-30 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left branding */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-emerald-600 flex items-center justify-center shadow-md shadow-orange-500/20 text-white font-black text-xl tracking-tighter border border-white/20">
            KS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-lg lg:text-xl tracking-tight bg-gradient-to-r from-amber-300 via-orange-200 to-emerald-300 bg-clip-text text-transparent">
                {t.appName}
              </h1>
              <span className="bg-orange-500/20 text-orange-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-orange-500/30 uppercase tracking-wider">
                {t.commandCenter}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium hidden sm:block">
              "{t.tagline}" • Multi-Agent Workforce Verification Architecture
            </p>
          </div>
        </div>

        {/* Center: 3-Way UX View Mode Switcher (Executive, Detailed, Judge Walkthrough) */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 self-center">
          <button
            onClick={() => onSelectViewMode('executive')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'executive'
                ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Executive View</span>
          </button>

          <button
            onClick={() => onSelectViewMode('detailed')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'detailed'
                ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Command Center</span>
          </button>

          <button
            onClick={onOpenJudgeWalkthrough}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-300 hover:text-amber-200 hover:bg-slate-900 transition-all border border-amber-500/30 ml-1"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>3-Minute Demo Mode</span>
          </button>
        </div>

        {/* Right meta badges & controllers */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          {/* Priority 3: 3-Way Language Toggle (English, Hindi, Kannada) */}
          <div className="flex items-center p-0.5 bg-slate-950 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => onSelectLanguage('en')}
              className={`px-2 py-1 rounded text-[11px] font-semibold transition-all ${
                language === 'en'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => onSelectLanguage('hi')}
              className={`px-2 py-1 rounded text-[11px] font-semibold transition-all ${
                language === 'hi'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => onSelectLanguage('kn')}
              className={`px-2 py-1 rounded text-[11px] font-semibold transition-all ${
                language === 'kn'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ಕನ್ನಡ
            </button>
          </div>

          {/* AI Engine Status Badge */}
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[11px] font-mono text-emerald-300">AI Engine Online</span>
          </div>

          {/* System Architecture Source Explorer */}
          <button
            onClick={onOpenCodeExplorer}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium px-2.5 py-1.5 rounded-lg border border-slate-700 shadow-sm transition-all"
            title="Inspect System Architecture & Pipeline Code"
          >
            <Code2 className="w-3.5 h-3.5 text-indigo-300" />
            <span className="hidden lg:inline">System Architecture</span>
          </button>

          {/* Discreet Developer Settings Icon (Hiding Demo Mode from Judges) */}
          <button
            onClick={onOpenDeveloperSettings}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors"
            title="Developer Settings (Stage & Offline Switches)"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
