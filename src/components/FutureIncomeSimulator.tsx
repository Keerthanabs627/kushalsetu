import React, { useState } from 'react';
import { AgentState } from '../types';
import { TrendingUp, ArrowRight, Zap, Award, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

interface FutureIncomeSimulatorProps {
  agentState: AgentState | null;
}

export const FutureIncomeSimulator: React.FC<FutureIncomeSimulatorProps> = ({ agentState }) => {
  const currentBase = agentState?.nsqf_mapping?.current_base_salary || 24000;
  const certifiedSalary = agentState?.nsqf_mapping?.nsqf_certified_salary || 32000;
  const specializedSalary = agentState?.nsqf_mapping?.future_specialized_salary || 42000;
  const futureGaps = agentState?.future_skill_gaps || [];
  const topFutureSkill = futureGaps[0]?.gap_name || 'EV Battery Pack & BMS Telematics Specialization';

  const [activeStage, setActiveStage] = useState<number>(3); // 1: base, 2: certified, 3: specialized

  const totalGrowthPercent = Math.round(((specializedSalary - currentBase) / currentBase) * 100);
  const nsqfGrowthPercent = Math.round(((certifiedSalary - currentBase) / currentBase) * 100);

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl backdrop-blur-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-3 border-b border-slate-800 mb-4 gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Future Income Simulator</h3>
            <p className="text-[11px] text-slate-400">
              Interactive career wage progression from unverified artisan to high-yield Industry 4.0 specialist
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-purple-300 bg-purple-500/15 border border-purple-500/30 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Projected Growth: +{totalGrowthPercent}%</span>
          </span>
        </div>
      </div>

      {/* 3-Stage Income Progression Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Stage 1: Current Base Salary */}
        <div
          onClick={() => setActiveStage(1)}
          className={`rounded-xl border p-4 cursor-pointer transition-all ${
            activeStage === 1
              ? 'bg-slate-800/90 border-slate-500 shadow-md ring-1 ring-slate-500'
              : 'bg-slate-950/70 border-slate-800/80 hover:bg-slate-900'
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
              Stage 1
            </span>
            <span className="text-[10px] text-rose-400 font-semibold">Unaccredited</span>
          </div>

          <h4 className="text-xs font-bold text-slate-300 mb-1">Current Informal Wage</h4>
          <div className="text-2xl font-black text-slate-200 font-mono">
            ₹{currentBase.toLocaleString('en-IN')}{' '}
            <span className="text-xs text-slate-500 font-normal">/ mo</span>
          </div>

          <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
            Market rate for daily wage artisan lacking sovereign credential proof. Vulnerable to contractor commission cuts.
          </p>

          <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] text-slate-500">
            Baseline Annual: ₹{(currentBase * 12).toLocaleString('en-IN')}
          </div>
        </div>

        {/* Stage 2: After NSQF Certification */}
        <div
          onClick={() => setActiveStage(2)}
          className={`rounded-xl border p-4 cursor-pointer transition-all ${
            activeStage === 2
              ? 'bg-sky-950/40 border-sky-500/80 shadow-md ring-1 ring-sky-500'
              : 'bg-slate-950/70 border-slate-800/80 hover:bg-slate-900'
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
              Stage 2
            </span>
            <span className="text-[10px] text-sky-300 font-bold bg-sky-500/10 px-1.5 py-0.5 rounded">
              +{nsqfGrowthPercent}% Surge
            </span>
          </div>

          <h4 className="text-xs font-bold text-white mb-1">After NSQF Certification</h4>
          <div className="text-2xl font-black text-sky-400 font-mono">
            ₹{certifiedSalary.toLocaleString('en-IN')}{' '}
            <span className="text-xs text-sky-300/80 font-normal">/ mo</span>
          </div>

          <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">
            Formal NSQF Level 4 accreditation triggers structured wage grids in MSME clusters, including ESI + PF social security.
          </p>

          <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] text-sky-300 font-semibold flex items-center justify-between">
            <span>Annual: ₹{(certifiedSalary * 12).toLocaleString('en-IN')}</span>
            <span>+₹{(certifiedSalary - currentBase).toLocaleString('en-IN')}/mo net gain</span>
          </div>
        </div>

        {/* Stage 3: After Future Skill Specialization */}
        <div
          onClick={() => setActiveStage(3)}
          className={`rounded-xl border p-4 cursor-pointer transition-all ${
            activeStage === 3
              ? 'bg-emerald-950/50 border-emerald-500/80 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500'
              : 'bg-slate-950/70 border-slate-800/80 hover:bg-slate-900'
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/40">
              Stage 3: Frontier
            </span>
            <span className="text-[10px] text-emerald-300 font-extrabold bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/40 animate-pulse">
              +{totalGrowthPercent}% Growth
            </span>
          </div>

          <h4 className="text-xs font-bold text-emerald-300 mb-1">After Future Skill Upgrade</h4>
          <div className="text-2xl font-black text-emerald-400 font-mono">
            ₹{specializedSalary.toLocaleString('en-IN')}{' '}
            <span className="text-xs text-emerald-300/80 font-normal">/ mo</span>
          </div>

          <p className="text-[11px] text-slate-200 mt-2 leading-relaxed">
            {topFutureSkill}. Unlocks supervisory Level 5 appointments and Tier-1 OEM manufacturing contracts.
          </p>

          <div className="mt-3 pt-2 border-t border-emerald-500/30 text-[10px] text-emerald-300 font-bold flex items-center justify-between">
            <span>Annual: ₹{(specializedSalary * 12).toLocaleString('en-IN')}</span>
            <span>+₹{(specializedSalary - currentBase).toLocaleString('en-IN')}/mo net gain</span>
          </div>
        </div>
      </div>

      {/* Trajectory Timeline Bar */}
      <div className="bg-slate-950/90 rounded-xl p-3.5 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-slate-300 font-semibold">
            Escalation Pathway: <strong className="text-white">Uncertified ₹24k</strong> → <strong className="text-sky-300">NSQF Level 4 ₹32k</strong> → <strong className="text-emerald-400">EV/Industry 4.0 Lead ₹42k+</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-400">Total 3-Year Cumulative Gain:</span>
          <span className="text-xs font-black text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 rounded font-mono">
            +₹5,04,000 INR
          </span>
        </div>
      </div>
    </div>
  );
};
