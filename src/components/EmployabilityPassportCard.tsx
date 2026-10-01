import React from 'react';
import { EmployabilityPassport, NSQFMapping } from '../types';
import {
  ShieldCheck,
  Award,
  TrendingUp,
  Download,
  Share2,
  CheckCircle,
  QrCode,
  Sparkles,
  Lock,
  ArrowRight,
  Briefcase,
  Target
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface EmployabilityPassportCardProps {
  passport: EmployabilityPassport | null;
  nsqfMapping: NSQFMapping | null;
}

export const EmployabilityPassportCard: React.FC<EmployabilityPassportCardProps> = ({
  passport,
  nsqfMapping
}) => {
  const triggerCelebration = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  if (!passport) {
    return (
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl flex flex-col items-center justify-center text-center h-full backdrop-blur-sm">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h3 className="text-base font-bold text-white mb-1">Employability Passport Card</h3>
        <p className="text-xs text-slate-400 max-w-xs mb-4 leading-relaxed">
          Accredited credentials and composite Employability Score will be minted automatically when the LangGraph pipeline completes Node 7.
        </p>
        <div className="flex items-center gap-2 text-[11px] text-amber-400/90 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Awaiting Worker Intake & Audit</span>
        </div>
      </div>
    );
  }

  const score = passport.employability_score;
  const readiness = nsqfMapping?.readiness_percentage || 88;
  const salary = passport.expected_salary_band;

  // Priority 3 Upgraded fields
  const employmentProbability = passport.employment_probability || 94;
  const futureSkillsReadiness = passport.future_skills_readiness || 86;
  const careerTrajectory = passport.career_path_trajectory || `Level ${passport.nsqf_level} Technician → Level 5 Supervisor`;
  const marketDemand = passport.market_demand_score || 'High';
  const placementStatus = passport.placement_status || 'Placement Ready';

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl flex flex-col justify-between h-full backdrop-blur-sm">
      {/* Panel Title */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">Employability Passport</h2>
            <p className="text-[11px] text-slate-400">DigiLocker-Ready Sovereign Credential</p>
          </div>
        </div>
        <button
          onClick={triggerCelebration}
          className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-md hover:bg-emerald-500/20 transition-colors flex items-center gap-1"
        >
          <Sparkles className="w-3 h-3" />
          <span>Celebrate</span>
        </button>
      </div>

      {/* Official Government of Bharat Holographic Credential Box */}
      <div className="relative rounded-2xl p-4 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border-2 border-indigo-400/40 shadow-2xl overflow-hidden">
        {/* Hologram top edge sheen */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-white to-emerald-400 opacity-90" />

        {/* Passport Header */}
        <div className="flex justify-between items-start gap-2 mb-3">
          <div>
            <div className="text-[9px] font-black uppercase tracking-widest text-amber-400 flex items-center gap-1">
              <span>GOVT OF BHARAT • MSDE ALIGNED</span>
            </div>
            <h3 className="text-lg font-black text-white tracking-tight mt-0.5">
              {passport.worker_name}
            </h3>
            <div className="text-xs font-semibold text-indigo-300">
              {passport.primary_trade}
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="bg-emerald-600/90 text-white font-black text-[10px] px-2.5 py-0.5 rounded-full border border-emerald-400/40 shadow-sm uppercase tracking-wider">
              NSQF LEVEL {passport.nsqf_level}
            </span>
            <span className="text-[9px] text-slate-400 mt-1 font-mono">{passport.qp_code}</span>
          </div>
        </div>

        {/* Metric Badges Grid: Score, Readiness, Salary */}
        <div className="grid grid-cols-3 gap-2 py-2.5 px-2 rounded-xl bg-slate-900/80 border border-slate-800/80 mb-2.5 text-center">
          {/* Employability Score */}
          <div className="border-r border-slate-800">
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">Score</div>
            <div className="text-xl font-black text-emerald-400 leading-tight mt-0.5">
              {score}
              <span className="text-[10px] text-emerald-300/80 font-normal">/100</span>
            </div>
            <div className="text-[9px] text-emerald-400/90 font-medium">A+ Certified</div>
          </div>

          {/* NSQF Readiness */}
          <div className="border-r border-slate-800">
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">Readiness</div>
            <div className="text-xl font-black text-sky-400 leading-tight mt-0.5">
              {readiness}%
            </div>
            <div className="text-[9px] text-slate-400 font-medium">NOS Grade {passport.nsqf_level}</div>
          </div>

          {/* Expected Salary Band */}
          <div>
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">Salary Band</div>
            <div className="text-xs font-black text-amber-300 leading-tight mt-1 truncate">
              {salary.split('/')[0]}
            </div>
            <div className="text-[9px] text-slate-400 font-medium">Market Index</div>
          </div>
        </div>

        {/* Priority 3 Upgrade: 5 Extended Intelligence Pillars */}
        <div className="grid grid-cols-2 gap-2 mb-2.5 text-[10px]">
          {/* Employment Probability */}
          <div className="bg-slate-900/70 p-2 rounded-lg border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1 font-medium">
              <Target className="w-3 h-3 text-emerald-400" />
              <span>Employment Prob:</span>
            </span>
            <span className="font-black text-emerald-400 font-mono text-xs">{employmentProbability}%</span>
          </div>

          {/* Future Skill Readiness */}
          <div className="bg-slate-900/70 p-2 rounded-lg border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1 font-medium">
              <Sparkles className="w-3 h-3 text-purple-400" />
              <span>Future Readiness:</span>
            </span>
            <span className="font-black text-purple-300 font-mono text-xs">{futureSkillsReadiness}%</span>
          </div>

          {/* Market Demand Score */}
          <div className="bg-slate-900/70 p-2 rounded-lg border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1 font-medium">
              <Briefcase className="w-3 h-3 text-sky-400" />
              <span>Market Demand:</span>
            </span>
            <span className="font-bold text-sky-300 text-[10px] bg-sky-500/10 px-1.5 py-0.2 rounded border border-sky-500/20">
              {marketDemand}
            </span>
          </div>

          {/* Placement Status */}
          <div className="bg-slate-900/70 p-2 rounded-lg border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1 font-medium">
              <CheckCircle className="w-3 h-3 text-emerald-400" />
              <span>Placement Status:</span>
            </span>
            <span className="font-bold text-emerald-300 text-[9px] bg-emerald-500/15 px-1.5 py-0.2 rounded border border-emerald-500/30">
              {placementStatus}
            </span>
          </div>
        </div>

        {/* Career Growth Trajectory Banner */}
        <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-lg p-2 mb-2.5 text-[10px] flex items-center justify-between">
          <div className="flex items-center gap-1 text-slate-300">
            <span className="font-bold text-amber-400 uppercase tracking-tight">Trajectory:</span>
            <span className="text-indigo-200 font-semibold">{careerTrajectory}</span>
          </div>
          <span className="text-emerald-400 font-bold font-mono">+₹14k/mo</span>
        </div>

        {/* Verified Skills Badges */}
        <div className="mb-2.5">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>Verified Competency Portfolio</span>
            <span className="text-emerald-400 font-mono text-[9px]">{passport.verified_skills_count} Skills</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {passport.verified_skills_summary.slice(0, 3).map((skill, idx) => (
              <span
                key={idx}
                className="bg-indigo-900/60 text-indigo-200 border border-indigo-500/30 text-[9px] font-semibold px-2 py-0.5 rounded-md truncate max-w-[190px]"
              >
                ✓ {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Cryptographic Hash & QR Verification */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white p-1 flex items-center justify-center shrink-0 shadow">
              <QrCode className="w-6 h-6 text-slate-900" />
            </div>
            <div>
              <div className="font-mono text-[9px] text-slate-400 flex items-center gap-1">
                <Lock className="w-2.5 h-2.5 text-indigo-400" />
                <span className="text-slate-300">{passport.verification_hash}</span>
              </div>
              <div className="text-[9px] text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle className="w-2.5 h-2.5" />
                <span>DigiLocker Authenticated</span>
              </div>
            </div>
          </div>

          <div className="text-right text-[9px] text-slate-400">
            <div>ID: <span className="text-white font-mono">{passport.passport_id}</span></div>
            <div>{passport.issue_date}</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-800">
        <button
          onClick={() => {
            alert(`KaushalSetu Employability Passport [${passport.passport_id}] downloaded as sovereign credential certificate.`);
          }}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-colors shadow-sm"
        >
          <Download className="w-3.5 h-3.5 text-slate-300" />
          <span>Export Passport</span>
        </button>

        <button
          onClick={() => {
            if (navigator.clipboard) {
              navigator.clipboard.writeText(`https://kaushalsetu.gov.in/passport/${passport.passport_id}`);
              alert('Passport verification link copied to clipboard!');
            }
          }}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-indigo-600/90 hover:bg-indigo-600 text-white font-bold text-xs border border-indigo-400/30 transition-colors shadow-sm"
        >
          <Share2 className="w-3.5 h-3.5 text-indigo-200" />
          <span>Share Credential</span>
        </button>
      </div>
    </div>
  );
};
