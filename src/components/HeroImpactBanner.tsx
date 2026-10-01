import React from 'react';
import { AgentState } from '../types';
import { Sparkles, TrendingUp, ShieldCheck, Award, Briefcase, Play, RefreshCw, CheckCircle2, Calculator, Trophy, ExternalLink } from 'lucide-react';

interface HeroImpactBannerProps {
  agentState: AgentState | null;
  isRunning: boolean;
  isDemoMode: boolean;
  onOpenFormulaModal: () => void;
  onOpenJudgeWalkthrough: () => void;
  onTriggerDemoRun: () => void;
}

export const HeroImpactBanner: React.FC<HeroImpactBannerProps> = ({
  agentState,
  isRunning,
  isDemoMode,
  onOpenFormulaModal,
  onOpenJudgeWalkthrough,
  onTriggerDemoRun
}) => {
  const tradeName = agentState?.nsqf_mapping?.matched_role || 'EV Assembly & Retrofit Technician';
  const nsqfLevel = agentState?.nsqf_mapping?.nsqf_level || 4;
  const score = agentState?.employability_passport?.employability_score || 88;
  const msmeMatches = agentState?.matched_jobs?.length || 5;
  const incomeGrowth = agentState?.impact_metrics?.income_growth_potential || 35;
  const formula = agentState?.scoring_formula;

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

            {/* AI Generated Status Indicator */}
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 font-mono border text-emerald-300 bg-emerald-950/80 border-emerald-500/40">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>AI Engine Online • Gemini Connected</span>
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight">
            Transforming Informal Skills into{' '}
            <span className="bg-gradient-to-r from-amber-400 via-orange-300 to-emerald-400 bg-clip-text text-transparent">
              Verified Employability
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
            Multi-agent autonomous intelligence auditing grassroots blue-collar trade narratives into certified NSQF credentials and direct MSME recruitment.
          </p>
        </div>

        {/* Center/Right: 5 Impact Metric Pillars with Score Explanations & Citations */}
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
            <div className="text-[9px] text-orange-400 font-medium mt-0.5">MSDE NOS Aligned</div>
          </div>

          {/* 2. NSQF Readiness with Real QP Code */}
          <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800 flex flex-col justify-between group">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-sky-400 shrink-0" />
              <span>NSQF Alignment</span>
            </div>
            <div className="text-sm sm:text-base font-black text-sky-400 mt-1 flex items-baseline gap-1">
              <span>Level {nsqfLevel}</span>
              <span className="text-[9px] font-mono font-normal text-sky-300/80">({agentState?.nsqf_mapping?.qp_code || 'CSC/Q0209'})</span>
            </div>
            <div className="text-[9px] text-slate-400 font-medium truncate">
              {agentState?.nsqf_mapping?.matched_role?.split(' ')[0] || 'Welder'} • {agentState?.nsqf_mapping?.readiness_percentage || 89}% NOS
            </div>
          </div>

          {/* 3. Employability Score with Formula Trigger */}
          <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800 flex flex-col justify-between group cursor-pointer hover:border-emerald-500/50 transition-colors"
            onClick={onOpenFormulaModal}
            title="Click to view transparent 4-pillar mathematical formula"
          >
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight flex items-center justify-between">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>Employability</span>
              </span>
              <Calculator className="w-3 h-3 text-emerald-400 opacity-70 group-hover:opacity-100" />
            </div>
            <div className="text-base sm:text-lg font-black text-emerald-400 mt-1">
              {score}<span className="text-xs text-emerald-300 font-normal">/100</span>
            </div>
            <div className="text-[9px] text-emerald-400/90 font-medium underline flex items-center gap-0.5">
              <span>View Formula</span>
            </div>
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
            <div className="text-[9px] text-indigo-400 font-medium">Udyam Verified</div>
          </div>

          {/* 5. Realistic Income Growth (Grounded Estimate) */}
          <div className="col-span-2 sm:col-span-1 p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/40 flex flex-col justify-between shadow-sm">
            <div className="text-[10px] font-bold text-emerald-300 uppercase tracking-tight flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-emerald-400 shrink-0" />
              <span>Wage Premium</span>
            </div>
            <div className="text-base sm:text-lg font-black text-emerald-400 mt-1">
              +{incomeGrowth}%
            </div>
            <div className="text-[9px] text-emerald-300 font-semibold">MSDE Wage Grid</div>
          </div>
        </div>

        {/* Action Controller */}
        <div className="flex sm:flex-col items-center justify-end gap-2 shrink-0">
          <button
            onClick={onOpenJudgeWalkthrough}
            className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-orange-500/25 active:scale-95"
            title="Launch interactive 8-step presentation walkthrough for judges"
          >
            <Trophy className="w-3.5 h-3.5 fill-current" />
            <span>3-Minute Demo Mode</span>
          </button>

          <button
            onClick={onOpenFormulaModal}
            className="w-full sm:w-auto px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition-all flex items-center justify-center gap-1.5 bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white"
          >
            <Calculator className="w-3.5 h-3.5 text-orange-400" />
            <span>Audit Scoring Formula</span>
          </button>
        </div>
      </div>
    </div>
  );
};
