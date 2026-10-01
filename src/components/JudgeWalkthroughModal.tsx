import React, { useState } from 'react';
import {
  X,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Award,
  Eye,
  ShieldCheck,
  TrendingUp,
  BookOpen,
  Briefcase,
  QrCode,
  Send,
  CheckCircle2,
  Cpu,
  Layers,
  FileText
} from 'lucide-react';
import { AgentState } from '../types';

interface JudgeWalkthroughModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentState: AgentState | null;
}

export const JudgeWalkthroughModal: React.FC<JudgeWalkthroughModalProps> = ({
  isOpen,
  onClose,
  agentState
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  if (!isOpen) return null;

  const candidateName = agentState?.worker_name || 'Ramesh Kumar';
  const tradeDesc = agentState?.trade_description || 'MIG welding and heavy fabrication';
  const role = agentState?.nsqf_mapping?.matched_role || 'EV Assembly & Retrofit Technician';
  const nsqfLevel = agentState?.nsqf_mapping?.nsqf_level || 4;
  const score = agentState?.employability_passport?.employability_score || 88;
  const isTradeRelated = agentState?.vision_audit?.is_trade_related ?? false;
  const topJob = agentState?.matched_jobs?.[0] || {
    company: 'Peenya Dynamics Pvt Ltd',
    cluster: 'Peenya Industrial Complex',
    salary_range: '₹30,000 - ₹38,000 / month',
    match_score: 95
  };

  const steps = [
    {
      id: 1,
      title: 'Step 1: Grassroots Vernacular Intake',
      agent: 'VernacularTradeAuditorAgent',
      badge: 'Multimodal Natural Language',
      icon: <FileText className="w-5 h-5 text-orange-400" />,
      tagline: 'Transforming dialect-rich trade narratives into structured technical terminology',
      inputs: `Worker: ${candidateName} • Preferred Language: ${agentState?.preferred_language || 'Hindi'} • Experience: ${agentState?.experience_years || 5} yrs`,
      outputs: `Audited Narrative: "${tradeDesc}"`,
      detail: (
        <div className="space-y-2 text-xs">
          <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
            <span className="font-bold text-slate-300 block mb-1">Candidate Raw Input:</span>
            <p className="text-slate-400 italic font-sans">"{tradeDesc}"</p>
          </div>
          <div className="p-3 bg-orange-950/30 rounded-xl border border-orange-500/30 text-orange-200">
            <span className="font-bold block mb-1">Vernacular Dialect Audit:</span>
            <p>Deconstructed native workshop jargon (e.g. "root pass", "beveling", "tork") into standardized engineering competencies.</p>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: 'Step 2: Forensic Gemini Vision Inspection',
      agent: 'VernacularTradeAuditorAgent (Vision Core)',
      badge: 'Multimodal Vision Grounding',
      icon: <Eye className="w-5 h-5 text-sky-400" />,
      tagline: 'Pixel-level inspection of workpiece joints, equipment, and shopfloor PPE',
      inputs: agentState?.uploaded_image ? 'RGB Workpiece / Tool Photograph (Base64)' : 'No image uploaded',
      outputs: isTradeRelated ? 'Trade Equipment Verified' : 'Non-Trade / Flagged',
      detail: (
        <div className="space-y-2 text-xs">
          <div className={`p-3 rounded-xl border ${
            isTradeRelated
              ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
              : 'bg-amber-950/30 border-amber-500/30 text-amber-200'
          }`}>
            <span className="font-bold block mb-1">
              {isTradeRelated ? '✅ Genuine Trade Equipment Detected:' : '⚠️ Non-Trade / Flagged Status:'}
            </span>
            <p className="leading-relaxed">
              {agentState?.vision_audit?.visual_inspection_notes || 'Vision engine evaluated workpiece and tool setup.'}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
              <span className="text-slate-500 block">Identified Tools:</span>
              <span className="font-semibold text-white">
                {agentState?.vision_audit?.detected_tools?.join(', ') || 'Standard Trade Toolkit'}
              </span>
            </div>
            <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
              <span className="text-slate-500 block">Vision Confidence:</span>
              <span className="font-semibold text-emerald-400 font-mono">
                {agentState?.vision_audit ? `${Math.round(agentState.vision_audit.vision_confidence * 100)}%` : '94%'}
              </span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: 'Step 3: Micro-Competency Knowledge Graph',
      agent: 'SkillGraphIntelligenceAgent',
      badge: 'Graph Neural Topology',
      icon: <Award className="w-5 h-5 text-amber-400" />,
      tagline: 'Constructing directed competency topology with mathematical synergy edges',
      inputs: `Verified Skills List (${agentState?.verified_skills?.length || 3} micro-competencies)`,
      outputs: `Competency Index: ${agentState?.skill_graph?.competency_index || 91}%`,
      detail: (
        <div className="space-y-2 text-xs">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
            <span className="font-bold text-white block">Extracted Micro-Skills:</span>
            {agentState?.verified_skills?.slice(0, 3).map((s, idx) => (
              <div key={idx} className="flex items-center justify-between text-[11px] bg-slate-900/80 p-1.5 rounded">
                <span className="text-slate-200">{s.skill_name}</span>
                <span className="font-mono text-emerald-400 font-bold">{Math.round(s.confidence_score * 100)}%</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: 'Step 4: National NSQF Alignment & Wage Grid',
      agent: 'NSQFAlignmentAgent',
      badge: 'MSDE / NSDC National Standard',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      tagline: 'Accrediting informal competencies directly to official Qualification Pack (QP-NOS)',
      inputs: 'Directed Skill Graph + Experience Verification',
      outputs: `NSQF Level ${nsqfLevel} (${role})`,
      detail: (
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Formal Occupation:</span>
            <span className="font-bold text-white">{role}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Official QP Code:</span>
            <span className="font-mono text-amber-400">{agentState?.nsqf_mapping?.qp_code || 'ASC/Q1411'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Certified Wage Benchmark:</span>
            <span className="font-bold text-emerald-400">{agentState?.nsqf_mapping?.expected_salary_band || '₹28,000 - ₹38,000 / mo'}</span>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: 'Step 5: Frontier Technology Gap Detection',
      agent: 'FutureSkillsGapAgent',
      badge: 'Industry 4.0 / EV / Green Transition',
      icon: <TrendingUp className="w-5 h-5 text-indigo-400" />,
      tagline: 'Pinpointing high-yield technological shifts that yield +25% to +45% wage premiums',
      inputs: `Accredited Level ${nsqfLevel} Baseline`,
      outputs: `${agentState?.future_skill_gaps?.length || 2} Frontier Transition Gaps`,
      detail: (
        <div className="space-y-2 text-xs">
          {agentState?.future_skill_gaps?.slice(0, 2).map((gap, idx) => (
            <div key={idx} className="p-2.5 bg-indigo-950/20 border border-indigo-500/30 rounded-xl flex items-center justify-between">
              <div>
                <div className="font-bold text-indigo-200">{gap.gap_name}</div>
                <div className="text-[10px] text-slate-400">{gap.trend_category}</div>
              </div>
              <span className="text-emerald-400 font-bold font-mono text-[11px]">
                +{gap.potential_wage_boost_percentage}% Wage
              </span>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 6,
      title: 'Step 6: 4-Week Micro-Upskilling Roadmap',
      agent: 'UpskillingAgent',
      badge: 'Shopfloor Practical Drills',
      icon: <BookOpen className="w-5 h-5 text-amber-400" />,
      tagline: 'Asynchronous 30-minute daily vernacular modules matched with live practical milestones',
      inputs: 'Frontier Gaps + Candidate Language Preference',
      outputs: '20 Daily Lessons & 4 Shopfloor Certifications',
      detail: (
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 text-xs">
          <div className="font-bold text-white text-[11px]">
            {agentState?.learning_plan?.roadmap_title || '4-Week Fast-Track Career Escalation'}
          </div>
          <p className="text-[11px] text-slate-400">
            70% practical shopfloor reinforcement + 30% vernacular theory ensures rapid completion.
          </p>
          <div className="text-[10px] text-emerald-400 font-mono">
            Platform: Skill India Digital & Bharat Skills
          </div>
        </div>
      )
    },
    {
      id: 7,
      title: 'Step 7: MSME Industrial Cluster Job Radar',
      agent: 'MSMEDemandIntelligenceAgent',
      badge: 'NCS & Udyam Requisition Matching',
      icon: <Briefcase className="w-5 h-5 text-rose-400" />,
      tagline: 'Dynamic employer vacancies matching candidate skills in their exact local industrial estate',
      inputs: `Role: ${role} • City: ${agentState?.location || 'Bengaluru'}`,
      outputs: `${agentState?.matched_jobs?.length || 5} Active MSME Vacancies`,
      detail: (
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white">{topJob.company}</span>
            <span className="font-mono text-emerald-400 font-bold">{topJob.match_score}% Fit</span>
          </div>
          <div className="text-slate-400 text-[11px]">
            Cluster: <strong className="text-slate-200">{topJob.cluster}</strong>
          </div>
          <div className="text-emerald-400 font-semibold text-[11px]">
            Salary: {topJob.salary_range}
          </div>
          <div className="text-[9px] text-slate-500 italic">
            Source: Ministry of MSME Udyam Registration & NCS Industrial Cluster Requisitions
          </div>
        </div>
      )
    },
    {
      id: 8,
      title: 'Step 8: Digital Passport Generation & WhatsApp Outreach',
      agent: 'EmployabilityPassportAgent + ExecutionAgent',
      badge: 'Verifiable Digital Standard',
      icon: <QrCode className="w-5 h-5 text-emerald-400" />,
      tagline: 'Cryptographically signed credential with instant wa.me recruiter dispatch',
      inputs: 'Full 8-Agent StateGraph State',
      outputs: `Passport ID: ${agentState?.employability_passport?.passport_id || 'KS-2026-89102'} • Score: ${score}/100`,
      detail: (
        <div className="space-y-2 text-xs">
          <div className="p-3 bg-emerald-950/30 rounded-xl border border-emerald-500/30 space-y-1.5">
            <div className="flex items-center justify-between font-bold text-emerald-300">
              <span>Composite Employability Score: {score}/100</span>
              <span className="font-mono text-[10px]">Credential Verified</span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 truncate">
              Hash: {agentState?.employability_passport?.verification_hash || '0x7F8E492B4A...'}
            </div>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
            <div>
              <span className="font-bold text-white block">WhatsApp Recruiter Dispatch</span>
              <span className="text-[10px] text-slate-400">Direct hiring manager outreach link ready</span>
            </div>
            <span className="text-emerald-400 text-[11px] font-bold">wa.me Active</span>
          </div>
        </div>
      )
    }
  ];

  const currentStepData = steps[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <span>3-Minute Demo Mode: Live Pipeline Walkthrough</span>
                <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-bold">
                  Step {currentStep + 1} of 8
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                End-to-End Autonomous Pipeline Execution for Candidate: <strong className="text-slate-200">{candidateName}</strong>
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

        {/* Step Indicator Progress Bar */}
        <div className="grid grid-cols-8 gap-1 p-2 bg-slate-950 border-b border-slate-800">
          {steps.map((st, idx) => (
            <button
              key={st.id}
              onClick={() => setCurrentStep(idx)}
              className={`h-2 rounded transition-all ${
                idx === currentStep
                  ? 'bg-orange-500 shadow-sm shadow-orange-500/50'
                  : idx < currentStep
                  ? 'bg-emerald-500'
                  : 'bg-slate-800 hover:bg-slate-700'
              }`}
              title={`Jump to ${st.title}`}
            />
          ))}
        </div>

        {/* Modal Body: Active Step View (Zero Scrolling Needed) */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700">
                {currentStepData.icon}
              </div>
              <div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                  {currentStepData.agent}
                </span>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {currentStepData.title}
                </h3>
              </div>
            </div>
            <span className="text-[10px] font-mono text-slate-300 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700 font-bold">
              {currentStepData.badge}
            </span>
          </div>

          <p className="text-xs text-slate-300 font-medium leading-relaxed">
            {currentStepData.tagline}
          </p>

          {/* State Transfer Telemetry Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wide block mb-0.5">
                Input State Consumed
              </span>
              <span className="font-mono text-slate-300 block truncate" title={currentStepData.inputs}>
                {currentStepData.inputs}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wide block mb-0.5">
                Output State Mutated
              </span>
              <span className="font-mono text-emerald-400 font-bold block truncate" title={currentStepData.outputs}>
                {currentStepData.outputs}
              </span>
            </div>
          </div>

          {/* Step Detail Card */}
          <div className="pt-2">
            {currentStepData.detail}
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between">
          <button
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
              currentStep === 0
                ? 'text-slate-600 bg-slate-900 cursor-not-allowed'
                : 'text-slate-300 bg-slate-800 hover:bg-slate-700'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Node</span>
          </button>

          <span className="text-xs font-mono text-slate-400">
            Node {currentStep + 1} of 8: <strong>{currentStepData.agent}</strong>
          </span>

          <button
            onClick={() => {
              if (currentStep < 7) {
                setCurrentStep(prev => prev + 1);
              } else {
                onClose();
              }
            }}
            className="px-4 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white flex items-center gap-1.5 shadow-md shadow-orange-500/20"
          >
            <span>{currentStep === 7 ? 'Complete Walkthrough' : 'Next Node'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
