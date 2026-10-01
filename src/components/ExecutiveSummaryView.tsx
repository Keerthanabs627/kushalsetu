import React from 'react';
import { AgentState } from '../types';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Briefcase,
  Send,
  Download,
  Calculator,
  QrCode,
  MapPin,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { generateEmployabilityPassportPDF } from '../utils/pdfGenerator';

interface ExecutiveSummaryViewProps {
  agentState: AgentState | null;
  onOpenFormulaModal: () => void;
  onOpenVerificationModal: () => void;
}

export const ExecutiveSummaryView: React.FC<ExecutiveSummaryViewProps> = ({
  agentState,
  onOpenFormulaModal,
  onOpenVerificationModal
}) => {
  const passport = agentState?.employability_passport;
  const nsqf = agentState?.nsqf_mapping;
  const topJob = agentState?.matched_jobs?.[0];
  const outreach = agentState?.outreach_payload;
  const formula = agentState?.scoring_formula;

  const candidateName = agentState?.worker_name || 'Ramesh Kumar';
  const role = nsqf?.matched_role || 'EV Assembly & Retrofit Technician';
  const score = passport?.employability_score || 88;
  const wageBoost = agentState?.impact_metrics?.income_growth_potential || 35;

  const handleDownloadPDF = () => {
    if (passport) {
      generateEmployabilityPassportPDF(passport, nsqf || null, agentState?.verified_skills || []);
    }
  };

  return (
    <div className="space-y-6">
      {/* Executive Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold uppercase">
              Executive View • Digital Workforce Intelligence
            </span>
            <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-bold">
              DigiLocker Accredited
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
            Executive Summary: <span className="text-amber-300">{candidateName}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Key employability metrics, NSQF occupational standing, and matched industrial vacancies.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenFormulaModal}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 border border-slate-700 transition-colors shadow-sm"
          >
            <Calculator className="w-4 h-4 text-orange-400" />
            <span>Formula Breakdown</span>
          </button>
          <button
            onClick={onOpenVerificationModal}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 border border-slate-700 transition-colors shadow-sm"
          >
            <QrCode className="w-4 h-4 text-emerald-400" />
            <span>Verifiable QR</span>
          </button>
        </div>
      </div>

      {/* 5 Key Executive Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Pillar 1: Verified Occupation & Candidate Identity */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
                <Award className="w-4 h-4 text-orange-400" />
                <span>1. Verified Trade</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                {agentState?.experience_years || 5} Yrs Experience
              </span>
            </div>
            <h3 className="text-base font-bold text-white leading-snug">
              {role}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Audited from self-described dialect narrative in {agentState?.preferred_language || 'vernacular'} and verified hands-on micro-skills.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{agentState?.location || 'India'}</span>
            </span>
            <span className="text-slate-400 font-medium">
              {passport?.verified_skills_count || 3} Verified Skills
            </span>
          </div>
        </div>

        {/* Pillar 2: NSQF Qualification Pack & Wage Grid */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>2. NSQF Level & Wage</span>
              </span>
              <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20 font-bold">
                Level {nsqf?.nsqf_level || 4} Certified
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-slate-400">Formal Salary Band:</span>
              <div className="text-base font-extrabold text-emerald-400 font-mono">
                {nsqf?.expected_salary_band || '₹28,000 - ₹38,000 / mo'}
              </div>
            </div>
            <div className="text-xs text-slate-400 leading-snug">
              National Occupational Standards QP Code: <strong className="text-amber-300 font-mono">{nsqf?.qp_code || 'ASC/Q1411'}</strong>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-500">
            Source: MSDE Model Wage Grid 2025-26 & NQR NSDC Standard
          </div>
        </div>

        {/* Pillar 3: Employability Score with Formula Link */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>3. Employability Score</span>
              </span>
              <button
                onClick={onOpenFormulaModal}
                className="text-[10px] text-orange-400 hover:text-orange-300 underline font-semibold"
              >
                Inspect Formula
              </button>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-emerald-400 font-mono">{score}</span>
              <span className="text-xs text-slate-400 font-medium">/ 100</span>
              <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 ml-auto">
                {passport?.score_grade || 'A+ Elite Certified'}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Derived mathematically: 40% Skills ({formula?.skill_points || 36} pts) + 35% NSQF ({formula?.nsqf_points || 31} pts) + 15% Vision ({formula?.vision_points || 14} pts) + 10% Demand ({formula?.demand_points || 10} pts).
            </p>
          </div>
          <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-500 font-mono truncate">
            SHA-256: {passport?.verification_hash || '0x7F8E492B4A'}
          </div>
        </div>

        {/* Pillar 4: Top MSME Industrial Cluster Vacancy */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-indigo-400" />
                <span>4. Top MSME Match</span>
              </span>
              <span className="text-[10px] font-mono text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 font-bold">
                {topJob?.match_score || 95}% Fit Score
              </span>
            </div>
            <h4 className="text-sm font-bold text-white">
              {topJob?.company || 'Precision Dynamics Pvt Ltd'}
            </h4>
            <div className="text-xs text-slate-400">
              Cluster: <strong className="text-slate-200">{topJob?.cluster || 'Peenya Industrial Complex'}</strong>
            </div>
            <div className="text-xs font-semibold text-emerald-400">
              Salary: {topJob?.salary_range || '₹30,000 - ₹38,000 / mo'} • {topJob?.vacancies || 4} Openings
            </div>
          </div>
          <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-500 italic">
            Source: Ministry of MSME Udyam Registration & NCS Cluster Requisitions
          </div>
        </div>

        {/* Pillar 5: Direct WhatsApp Outreach & Verifiable Export */}
        <div className="col-span-1 md:col-span-2 p-5 rounded-2xl bg-gradient-to-r from-emerald-950/30 via-slate-900 to-indigo-950/30 border border-emerald-500/40 shadow-md space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-300 uppercase tracking-wide flex items-center gap-1.5">
                <Send className="w-4 h-4 text-emerald-400" />
                <span>5. Direct Recruiter Action</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                Instant wa.me Dispatch
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Bypasses staffing agency middlemen by generating a localized, verified WhatsApp dispatch message with DigiLocker token routed directly to plant managers in {topJob?.cluster || 'local industrial estate'}.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-3">
            {outreach?.direct_whatsapp_url ? (
              <a
                href={outreach.direct_whatsapp_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Dispatch to Hiring Manager on WhatsApp</span>
                <ExternalLink className="w-3 h-3 opacity-80" />
              </a>
            ) : (
              <button
                disabled
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-500 font-bold text-xs flex items-center gap-2 border border-slate-700 cursor-not-allowed"
              >
                <span>WhatsApp Link Pending Evaluation</span>
              </button>
            )}

            <button
              onClick={handleDownloadPDF}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2 border border-slate-700 transition-colors"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Download DigiLocker PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
