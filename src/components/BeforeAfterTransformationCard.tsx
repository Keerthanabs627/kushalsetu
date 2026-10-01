import React from 'react';
import { ArrowRight, XCircle, CheckCircle, ShieldAlert, ShieldCheck, TrendingUp, Sparkles, Zap } from 'lucide-react';
import { AgentState } from '../types';

interface BeforeAfterTransformationCardProps {
  agentState: AgentState | null;
}

export const BeforeAfterTransformationCard: React.FC<BeforeAfterTransformationCardProps> = ({ agentState }) => {
  const currentSalary = agentState?.nsqf_mapping?.current_base_salary || 24000;
  const upgradedSalary = agentState?.nsqf_mapping?.nsqf_certified_salary || 38000;
  const specializedSalary = agentState?.nsqf_mapping?.future_specialized_salary || 44000;
  const tradeRole = agentState?.nsqf_mapping?.matched_role || 'Verified Technician';
  const growthPercent = Math.round(((upgradedSalary - currentSalary) / currentSalary) * 100);

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl backdrop-blur-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-3 border-b border-slate-800 mb-4 gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Before vs. After Transformation</h3>
            <p className="text-[11px] text-slate-400">Quantifiable impact of verified autonomous employability intelligence</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>+{growthPercent}% Direct Wage Surge</span>
          </span>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* LEFT: BEFORE KAUSHALSETU */}
        <div className="md:col-span-5 rounded-xl border border-rose-900/40 bg-gradient-to-b from-rose-950/20 to-slate-950/80 p-4 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-rose-900/30">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span className="font-extrabold text-xs uppercase tracking-wider text-rose-300">
                Before KaushalSetu
              </span>
            </div>
            <span className="text-[10px] bg-rose-500/15 text-rose-300 font-bold px-2 py-0.5 rounded border border-rose-500/30">
              Informal Baseline
            </span>
          </div>

          <ul className="space-y-2.5 text-xs">
            <li className="flex items-start gap-2 text-slate-300">
              <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span><strong>Informal Worker:</strong> Word-of-mouth daily wage labor without recognized proof</span>
            </li>
            <li className="flex items-start gap-2 text-slate-300">
              <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span><strong>No Verification:</strong> Zero documented skills or official accreditation</span>
            </li>
            <li className="flex items-start gap-2 text-slate-300">
              <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span><strong>No Career Roadmap:</strong> Stagnant manual execution without upward mobility</span>
            </li>
            <li className="flex items-start gap-2 text-slate-300">
              <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span><strong>Limited Opportunities:</strong> Trapped in local contractor dependency and middlemen fees</span>
            </li>
          </ul>

          <div className="mt-4 pt-3 border-t border-rose-900/30 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase">Base Wage:</span>
            <span className="text-base font-black text-rose-400 font-mono">
              ₹{currentSalary.toLocaleString('en-IN')}{' '}
              <span className="text-[10px] text-slate-500 font-normal">/ month</span>
            </span>
          </div>
        </div>

        {/* CENTER: TRANSFORMATION CATALYST */}
        <div className="md:col-span-2 flex flex-col items-center justify-center text-center py-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 via-indigo-600 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 border border-white/20">
            <Zap className="w-6 h-6 fill-current" />
          </div>
          <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mt-2">
            Autonomous
          </div>
          <div className="text-xs font-bold text-white">Engine</div>
          <div className="flex items-center justify-center text-emerald-400 mt-1">
            <ArrowRight className="w-5 h-5 hidden md:block" />
          </div>
        </div>

        {/* RIGHT: AFTER KAUSHALSETU */}
        <div className="md:col-span-5 rounded-xl border border-emerald-500/50 bg-gradient-to-b from-emerald-950/30 via-slate-900 to-slate-950 p-4 relative overflow-hidden shadow-lg shadow-emerald-500/5">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-emerald-500/30">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="font-extrabold text-xs uppercase tracking-wider text-emerald-300">
                After KaushalSetu
              </span>
            </div>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-500/40">
              National Verified
            </span>
          </div>

          <ul className="space-y-2.5 text-xs">
            <li className="flex items-start gap-2 text-slate-200">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Verified Technician:</strong> Accredited digital employability identity with DigiLocker QR</span>
            </li>
            <li className="flex items-start gap-2 text-slate-200">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>NSQF Aligned:</strong> Mapped to National Occupational Standards (Level 4 Certified)</span>
            </li>
            <li className="flex items-start gap-2 text-slate-200">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Future Skills Ready:</strong> 4-Week fast-track into EV, Cobots, and Solar Automation</span>
            </li>
            <li className="flex items-start gap-2 text-slate-200">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>MSME Matched:</strong> Direct WhatsApp recruitment to 5 top industrial plant heads</span>
            </li>
          </ul>

          <div className="mt-4 pt-3 border-t border-emerald-500/30 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase block">Certified Wage:</span>
              <span className="text-[10px] text-emerald-300 font-medium">Future Skill Peak: ₹{specializedSalary.toLocaleString('en-IN')}</span>
            </div>
            <span className="text-lg font-black text-emerald-400 font-mono">
              ₹{upgradedSalary.toLocaleString('en-IN')}{' '}
              <span className="text-[10px] text-emerald-300/80 font-normal">/ month</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
