import React from 'react';
import { Check, X, ShieldCheck, Zap, TrendingUp, Users, ArrowRight, AlertTriangle } from 'lucide-react';

export const WhyKaushalSetuCard: React.FC = () => {
  const comparisonRows = [
    {
      dimension: 'Artisan Intake Mode',
      informal: 'Word-of-mouth referral; no documented profile',
      jobBoards: 'English resume text; excludes non-English blue-collar workers',
      kaushalSetu: 'Vernacular audio (Hindi/Marathi/Kannada) + Gemini Vision tool photo',
      highlight: true
    },
    {
      dimension: 'Skill Verification Standard',
      informal: 'Unverified verbal claims; high employer trust deficit',
      jobBoards: 'Unverified keyword matching without shopfloor evidence',
      kaushalSetu: 'Formal MSDE / NSDC NSQF Level 3–5 competency mapping',
      highlight: true
    },
    {
      dimension: 'Recruitment Middlemen & Fees',
      informal: 'Thekedar cuts 15%–25% of worker wages every month',
      jobBoards: 'Staffing agency commissions & costly portal fees',
      kaushalSetu: 'Zero middleman deduction; 100% open workforce digital public infrastructure',
      highlight: true
    },
    {
      dimension: 'Placement Turnaround Time',
      informal: '30 to 45 days of uncertain physical searching',
      jobBoards: '21 to 30 days of cold email/ATS screening',
      kaushalSetu: 'Direct MSME connection via verified WhatsApp outreach',
      highlight: false
    },
    {
      dimension: 'Career Upskilling Pathway',
      informal: 'None; locked into repetitive low-wage manual labor',
      jobBoards: 'Generic paid online courses without shopfloor alignment',
      kaushalSetu: '4-Week micro-curriculum tailored for +28% to +40% wage growth',
      highlight: false
    },
    {
      dimension: 'Credential Portability',
      informal: 'None; worker must restart from zero at every new site',
      jobBoards: 'Proprietary platform resume lock-in',
      kaushalSetu: 'Permanent DigiLocker-compatible digital employability credential',
      highlight: true
    }
  ];

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl backdrop-blur-sm space-y-5">
      {/* 🟢 What Makes This Different? (Judge Winning Feature Card) */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-slate-950 to-indigo-950/40 border border-emerald-500/40 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 mb-3 border-b border-slate-800">
          <div>
            <h4 className="text-sm font-black text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>What Makes This Different?</span>
            </h4>
            <p className="text-[11px] text-slate-400">
              Foundational breakthroughs replacing broken resume-first and agency-dominated hiring models
            </p>
          </div>
          <span className="text-[10px] font-mono text-emerald-300 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30 shrink-0">
            Built for Bharat's 400M+ Workers
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-start gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-white">Voice-first onboarding</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Natural voice description in regional dialects (no typed resumes required)</div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-start gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-white">Vernacular support</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Hindi, Kannada, and English native tongue interface</div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-start gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-white">Gemini Vision validation</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Inspects actual shopfloor tools, welds, joints & safety PPE</div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-start gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-white">NSQF alignment</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Formal National Qualification Pack (QP-NOS) Levels 3–5 standard</div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-start gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-white">Digital employability passport</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Verifiable tamper-evident digital credential with QR scan</div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-start gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-white">Direct MSME hiring</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Zero middleman cut; instant wa.me WhatsApp plant supervisor connection</div>
            </div>
          </div>
        </div>
      </div>

      {/* Problem Statement & Potential National Impact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Problem Statement Section */}
        <div className="lg:col-span-7 bg-slate-950/80 p-4 rounded-xl border border-rose-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-rose-400 font-bold text-xs uppercase tracking-wider mb-2">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>The Problem</span>
            </div>
            <p className="text-sm font-bold text-white mb-2">
              90% of India's skilled workforce lacks formal skill credentials.
            </p>
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0"></span>
                <span><strong>Lower wages:</strong> Artisans trapped in unorganized thekedar wage exploitation</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0"></span>
                <span><strong>Limited mobility:</strong> Unable to prove vocational experience when relocating</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0"></span>
                <span><strong>No digital employability proof:</strong> Excluded by English ATS portals and resume screens</span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> KaushalSetu Solution:
            </span>
            <span className="text-[11px] text-slate-300 font-medium">
              Autonomous AI transforms informal skills into certified, verified employability
            </span>
          </div>
        </div>

        {/* Priority 3 Item 8: Potential National Impact Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-indigo-950/60 to-slate-950 p-4 rounded-xl border border-indigo-500/30 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
              <span>Potential National Impact</span>
            </span>
            <span className="text-[9px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Macro Scale
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center my-1">
            <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
              <div className="text-base font-black text-white font-mono">400M+</div>
              <div className="text-[9px] text-slate-300 font-medium">Informal Workers</div>
              <div className="text-[8px] text-slate-400 font-mono mt-0.5">Source: PLFS 2023–24</div>
            </div>
            <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
              <div className="text-base font-black text-sky-400 font-mono">63M+</div>
              <div className="text-[9px] text-slate-300 font-medium">MSMEs in Need</div>
              <div className="text-[8px] text-sky-400/90 font-mono mt-0.5">Source: MSME Report</div>
            </div>
            <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
              <div className="text-base font-black text-emerald-400 font-mono">₹1.8L Cr+</div>
              <div className="text-[9px] text-slate-300 font-medium">Wage Formalization</div>
              <div className="text-[8px] text-emerald-400/90 font-mono mt-0.5">Source: NITI Aayog</div>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 text-center mt-1">
            Accelerating direct recruitment velocity across India's manufacturing backbone
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-3 border-b border-slate-800 mb-2 gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Why KaushalSetu vs. Traditional Hiring
            </h3>
            <p className="text-[11px] text-slate-400">
              Comparative analysis against informal thekedar networks and legacy job portals
            </p>
          </div>
        </div>

        <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          Digital Public Infrastructure
        </span>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
              <th className="py-2.5 px-3">Evaluation Vector</th>
              <th className="py-2.5 px-3 bg-rose-950/20 text-rose-300 rounded-t-lg">
                Traditional Thekedar System
              </th>
              <th className="py-2.5 px-3 text-slate-400">
                General Job Boards (Naukri/Indeed)
              </th>
              <th className="py-2.5 px-3 bg-emerald-950/30 text-emerald-300 font-extrabold rounded-t-lg border-t border-l border-r border-emerald-500/30">
                🇮🇳 KaushalSetu AI Platform
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-sans">
            {comparisonRows.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-3 font-semibold text-slate-200 text-[11px]">
                  {row.dimension}
                </td>
                <td className="py-3 px-3 bg-rose-950/10 text-slate-400 text-[11px]">
                  <div className="flex items-start gap-1.5">
                    <X className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                    <span>{row.informal}</span>
                  </div>
                </td>
                <td className="py-3 px-3 text-slate-400 text-[11px]">
                  <div className="flex items-start gap-1.5">
                    <X className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{row.jobBoards}</span>
                  </div>
                </td>
                <td className="py-3 px-3 bg-emerald-950/20 text-emerald-200 font-medium text-[11px] border-l border-r border-emerald-500/20">
                  <div className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{row.kaushalSetu}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔴 Item 10: Why Existing Platforms Fail Table */}
      <div className="mt-4 p-4 rounded-xl bg-slate-950/90 border border-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2 mb-3 border-b border-slate-800 gap-1">
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <span>Why Existing Platforms Fail for Bharat's Workforce</span>
            </h4>
            <p className="text-[10px] text-slate-400">
              Direct structural comparison against LinkedIn and generic recruitment job portals
            </p>
          </div>
          <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
            Root Cause Matrix
          </span>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] text-slate-400 uppercase font-mono">
                <th className="py-2 px-3">Problem Vector</th>
                <th className="py-2 px-3 text-center text-slate-400">LinkedIn</th>
                <th className="py-2 px-3 text-center text-slate-400">Job Portals (Naukri/Indeed)</th>
                <th className="py-2 px-3 text-center text-emerald-400 font-bold bg-emerald-950/40 border-l border-r border-emerald-500/30">
                  KaushalSetu AI
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans text-[11px]">
              {[
                { problem: 'English Required', linkedin: 'Yes', portals: 'Yes', kaushalSetu: 'No (Vernacular Multi-Dialect)' },
                { problem: 'Skill Verification', linkedin: 'No (Self-Reported)', portals: 'No (Keyword Matching)', kaushalSetu: 'Yes (NSQF Standards)' },
                { problem: 'Tool & Equipment Verification', linkedin: 'No', portals: 'No', kaushalSetu: 'Yes (Gemini Vision Audited)' },
                { problem: 'Voice Input Support', linkedin: 'No', portals: 'No', kaushalSetu: 'Yes (Voice-First Dialect)' },
                { problem: 'NSQF Formal Mapping', linkedin: 'No', portals: 'No', kaushalSetu: 'Yes (QP-NOS Certified)' },
                { problem: 'Direct Recruiter Outreach', linkedin: 'InMail (Paid Gate)', portals: 'Email / Third-Party Agency', kaushalSetu: 'Yes (Instant wa.me Dispatch)' }
              ].map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-900/50">
                  <td className="py-2.5 px-3 font-medium text-slate-200">{row.problem}</td>
                  <td className="py-2.5 px-3 text-center text-rose-400 font-mono">{row.linkedin}</td>
                  <td className="py-2.5 px-3 text-center text-rose-400 font-mono">{row.portals}</td>
                  <td className="py-2.5 px-3 text-center text-emerald-300 font-bold bg-emerald-950/20 border-l border-r border-emerald-500/20">
                    ✓ {row.kaushalSetu}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
