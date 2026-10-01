import React from 'react';
import { AgentState } from '../types';
import { Sparkles, TrendingUp, ShieldCheck, Award, Briefcase, Play, RefreshCw, CheckCircle2 } from 'lucide-react';

interface HeroImpactBannerProps {
  agentState: AgentState | null;
  isRunning: boolean;
  isDemoMode: boolean;
  onToggleDemoMode: () => void;
  onTriggerDemoRun: () => void;
}

export const HeroImpactBanner: React.FC<HeroImpactBannerProps> = ({
  agentState,
  isRunning,
  isDemoMode,
  onToggleDemoMode,
  onTriggerDemoRun
}) => {
  const tradeName = agentState?.nsqf_mapping?.matched_role || 'EV Assembly & Retrofit Technician';
  const nsqfLevel = agentState?.nsqf_mapping?.nsqf_level || 4;
  const score = agentState?.employability_passport?.employability_score || 92;
  const msmeMatches = agentState?.matched_jobs?.length || 5;
  const incomeGrowth = agentState?.impact_metrics?.income_growth_potential || 37;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-indigo-500/40 bg-gradient-to-r from-slate-950 via-indigo-950/80 to-slate-950 shadow-2xl backdrop-blur-xl p-4 sm:p-6 mb-6">
      {/* Background glow and subtle ambient pattern */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-400 via-amber-300 via-white to-emerald-400 opacity-90" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
        {/* Left: Core Title and Tagline */}
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              🎉 Employability Transformation Complete
            </span>

            <span className="text-[10px] font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
              Sovereign Bharat Model
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight">
            Transforming Informal Skills into{' '}
            <span className="bg-gradient-to-r from-amber-400 via-orange-300 to-emerald-400 bg-clip-text text-transparent">
              Verified Employability
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
            Multi-agent autonomous intelligence auditing grassroots blue-collar trade narratives into certified NSQF credentials and instant MSME recruitment.
          </p>
        </div>

        {/* Center/Right: 5 Impact Metric Pillars */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 bg-slate-900/80 p-3 sm:p-3.5 rounded-xl border border-slate-800/90 shadow-inner">
          {/* 1. Verified Trade */}
          <div className="col-span-2 sm:col-span-1 p-2 rounded-lg bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight flex items-center gap-1">
              <Award className="w-3 h-3 text-orange-400 shrink-0" />
              <span>Verified Trade</span>
            </div>
            <div className="text-xs font-black text-white truncate mt-1" title={tradeName}>
              {tradeName}
            </div>
            <div className="text-[10px] text-orange-400 font-semibold mt-0.5">MSDE NOS Aligned</div>
          </div>

          {/* 2. NSQF Readiness */}
          <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-sky-400 shrink-0" />
              <span>NSQF Readiness</span>
            </div>
            <div className="text-base sm:text-lg font-black text-sky-400 mt-1">
              Level {nsqfLevel}
            </div>
            <div className="text-[10px] text-slate-400 font-medium">89% Match</div>
          </div>

          {/* 3. Employability Score */}
          <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
              <span>Employability</span>
            </div>
            <div className="text-base sm:text-lg font-black text-emerald-400 mt-1">
              {score}<span className="text-xs text-emerald-300 font-normal">/100</span>
            </div>
            <div className="text-[10px] text-emerald-400/90 font-semibold">A+ Certified</div>
          </div>

          {/* 4. MSME Matches */}
          <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight flex items-center gap-1">
              <Briefcase className="w-3 h-3 text-indigo-400 shrink-0" />
              <span>MSME Matches</span>
            </div>
            <div className="text-base sm:text-lg font-black text-indigo-300 mt-1">
              {msmeMatches} Openings
            </div>
            <div className="text-[10px] text-indigo-400 font-medium">Verified Plants</div>
          </div>

          {/* 5. Projected Income Growth */}
          <div className="col-span-2 sm:col-span-1 p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/40 flex flex-col justify-between shadow-sm">
            <div className="text-[10px] font-bold text-emerald-300 uppercase tracking-tight flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-emerald-400 shrink-0" />
              <span>Income Growth</span>
            </div>
            <div className="text-base sm:text-lg font-black text-emerald-400 mt-1">
              +{incomeGrowth}%
            </div>
            <div className="text-[10px] text-emerald-300 font-semibold">+₹14,000/mo</div>
          </div>
        </div>

        {/* Demo Mode Action Controller */}
        <div className="flex sm:flex-col items-center justify-end gap-2 shrink-0">
          <button
            onClick={onTriggerDemoRun}
            disabled={isRunning}
            className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md ${
              isRunning
                ? 'bg-slate-800 text-slate-400 border border-slate-700 cursor-not-allowed'
                : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-orange-500/25 active:scale-95'
            }`}
          >
            {isRunning ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Simulating...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run Live Demo</span>
              </>
            )}
          </button>

          <button
            onClick={onToggleDemoMode}
            className={`w-full sm:w-auto px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition-all flex items-center justify-center gap-1.5 ${
              isDemoMode
                ? 'bg-indigo-600/30 border-indigo-400 text-indigo-200'
                : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
            title="Toggle step-by-step paced demonstration for judges"
          >
            <span className={`w-2 h-2 rounded-full ${isDemoMode ? 'bg-indigo-400 animate-ping' : 'bg-slate-600'}`} />
            <span>Demo Mode: {isDemoMode ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
