import React, { useState } from 'react';
import { AgentState, AgentLog } from '../types';
import {
  CheckCircle2,
  Clock,
  RefreshCw,
  Cpu,
  Layers,
  Award,
  Zap,
  BookOpen,
  Building2,
  ShieldCheck,
  Send,
  Terminal,
  ChevronDown,
  ChevronUp,
  BrainCircuit,
  Eye,
  Search,
  Check
} from 'lucide-react';

interface PipelineTrackerPanelProps {
  agentState: AgentState | null;
  isRunning: boolean;
  currentStepIndex: number;
  isDemoMode: boolean;
}

const AGENT_NODES_CONFIG = [
  {
    name: 'VernacularTradeAuditorAgent',
    displayName: '1. Vernacular Trade Auditor',
    roleTag: 'Multimodal Audio & Vision Audit',
    icon: Layers,
    color: 'from-amber-500 to-orange-600',
    description: 'Audits native dialect trade jargon and inspects tool/weld visual cues with Gemini 2.5 Flash & Vision.',
    defaultReasoning: 'Audited conversational Hindi/regional vernacular. Extracted 4 genuine micro-skills with high procedural fidelity.',
    defaultEvidence: 'Workpiece visual inspection + self-described welding torch operation (5.5 yrs exp)',
    defaultDetected: ['MIG/MAG Shielded Gas Welding', 'Oxy-Acetylene Cutting', 'Blueprint Reading']
  },
  {
    name: 'SkillGraphIntelligenceAgent',
    displayName: '2. Skill Graph Intelligence',
    roleTag: 'Directed Knowledge Graph',
    icon: Cpu,
    color: 'from-blue-500 to-indigo-600',
    description: 'Constructs multi-dimensional competency ontology, node weights, and cross-skill synergy vectors.',
    defaultReasoning: 'Built 8 competency nodes linked to 10 tool dependencies. High cross-skill synergy coefficient (0.92).',
    defaultEvidence: 'Tool-competency co-occurrence matrix and multi-year shopfloor execution history',
    defaultDetected: ['Root Trade Node', 'Primary Competencies (94%)', 'Tool Operability (86%)']
  },
  {
    name: 'NSQFAlignmentAgent',
    displayName: '3. NSQF Alignment Engine',
    roleTag: 'MSDE / NSDC Standards (Levels 3–5)',
    icon: Award,
    color: 'from-emerald-500 to-teal-600',
    description: 'Accredits artisan competencies to National Occupational Standards (QP-NOS) and calculates wage baseline.',
    defaultReasoning: 'Skills match Automotive EV Assembly & Capital Goods standards at 89% NOS threshold.',
    defaultEvidence: 'National Qualifications Register (NQR) benchmark for CSC/Q0209 (Level 4)',
    defaultDetected: ['MIG/MAG Welder', 'QP: CSC/Q0209', 'Level 4 Certified']
  },
  {
    name: 'FutureSkillsGapAgent',
    displayName: '4. Future Skills Gap Agent',
    roleTag: 'Industry 4.0 & Green Transition',
    icon: Zap,
    color: 'from-purple-500 to-pink-600',
    description: 'Pinpoints frontier gaps (EV, Cobots, Solar Micro-Inverters, IoT) unlocking +25% to +45% wage gains.',
    defaultReasoning: '74% of tier-1 MSMEs require automated Cobot welding & BMS diagnostics. Fast-tracks Level 5 promotion.',
    defaultEvidence: 'MSME Technology Roadmap 2026-2030 & regional industrial hiring data',
    defaultDetected: ['Cobot Teaching Pendant (+40%)', 'Inert Shield Gas Telemetry (+25%)']
  },
  {
    name: 'UpskillingAgent',
    displayName: '5. Upskilling Agent',
    roleTag: '4-Week Micro-Curriculum',
    icon: BookOpen,
    color: 'from-sky-500 to-blue-600',
    description: 'Synthesizes practical 30-min daily lessons, shopfloor tasks, and vernacular video tutorials.',
    defaultReasoning: 'Structured 4-week zero-shopfloor-disruption micro-curriculum in candidate native tongue.',
    defaultEvidence: 'Sector Skill Council progression rubrics & Bharat Skills digital repository',
    defaultDetected: ['4 Milestone Weeks', 'Digital Schematics', 'Level 5 Master Craftsperson']
  },
  {
    name: 'MSMEDemandIntelligenceAgent',
    displayName: '6. MSME Demand Intelligence',
    roleTag: 'Industrial Cluster Job Radar',
    icon: Building2,
    color: 'from-cyan-500 to-emerald-600',
    description: 'Matches validated skill profiles to live MSME cluster vacancies (Peenya, Bhosari, Okhla, Ambattur).',
    defaultReasoning: 'Discovered 5 verified MSME vacancies with up to 96% fit within local manufacturing clusters.',
    defaultEvidence: 'Live MSME Job Registry with hiring manager direct contacts & active vacancy quotas',
    defaultDetected: ['Bosch EV Systems (96%)', 'Kavya Precision (94%)', 'Surya Shakti (92%)']
  },
  {
    name: 'EmployabilityPassportAgent',
    displayName: '7. Employability Passport Agent',
    roleTag: 'SHA-256 Verified Credential',
    icon: ShieldCheck,
    color: 'from-emerald-600 to-green-700',
    description: 'Mints cryptographically verifiable Bharat Employability Passport with 0–100 composite score.',
    defaultReasoning: 'Calculated 92/100 composite employability score. Generated SHA-256 sovereign proof hash.',
    defaultEvidence: 'DigiLocker schema compliance standards & MSDE biometric identity bindings',
    defaultDetected: ['Score: 92/100', 'Grade: A+ Elite', 'Probability: 94%']
  },
  {
    name: 'ExecutionAgent',
    displayName: '8. Execution Agent',
    roleTag: 'Instant WhatsApp Recruiter Dispatch',
    icon: Send,
    color: 'from-emerald-500 to-emerald-700',
    description: 'Generates localized WhatsApp outreach payloads for direct 1-click plant supervisor dispatch.',
    defaultReasoning: 'Bypasses staffing agency middlemen, routing verified candidate directly to plant supervisors.',
    defaultEvidence: 'MSME WhatsApp Business API template & candidate privacy permissions',
    defaultDetected: ['Vernacular + English Message', 'Direct WhatsApp Link', 'Response Window: 24-48h']
  }
];

export const PipelineTrackerPanel: React.FC<PipelineTrackerPanelProps> = ({
  agentState,
  isRunning,
  currentStepIndex,
  isDemoMode
}) => {
  const [showTerminalLogs, setShowTerminalLogs] = useState<boolean>(false);
  const [expandedAgent, setExpandedAgent] = useState<string | null>('VernacularTradeAuditorAgent');

  const logs = agentState?.agent_logs || [];
  const completedCount = logs.length;
  const isAllComplete = completedCount === 8 && !isRunning;

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl flex flex-col h-full backdrop-blur-sm">
      {/* Panel Header (Priority 9: Renamed to Autonomous Employability Engine) */}
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
            <BrainCircuit className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-base font-bold text-white tracking-tight">Autonomous Employability Engine</h2>
              {isDemoMode && (
                <span className="text-[9px] font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-300 px-1.5 py-0.2 rounded border border-indigo-500/30">
                  Demo
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400">8 LangGraph Multi-Agent Nodes • Reasoning Visibility</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-full">
            {completedCount} / 8 Synced
          </span>
          {isRunning && (
            <span className="flex items-center gap-1 text-[11px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full animate-pulse border border-amber-500/20">
              <RefreshCw className="w-3 h-3 animate-spin" /> Node {currentStepIndex + 1}
            </span>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 h-1.5 rounded-full mb-3 overflow-hidden">
        <div
          className="bg-gradient-to-r from-orange-500 via-indigo-500 to-emerald-500 h-full transition-all duration-500 ease-out"
          style={{ width: `${(completedCount / 8) * 100}%` }}
        />
      </div>

      {/* 8 Agent Nodes List with Priority 4 Reasoning Visibility */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-2.5 max-h-[420px] custom-scrollbar">
        {AGENT_NODES_CONFIG.map((node, idx) => {
          const isCompleted = idx < completedCount;
          const isCurrentActive = isRunning && idx === currentStepIndex;
          const isExpanded = expandedAgent === node.name;

          const matchingLog = logs.find((l) => l.agent === node.name);
          const Icon = node.icon;

          const reasoning = matchingLog?.reasoning_summary || node.defaultReasoning;
          const evidence = matchingLog?.evidence_used || node.defaultEvidence;
          const detected = matchingLog?.detected_skills || node.defaultDetected;
          const confidence = matchingLog ? Math.round(matchingLog.confidence * 100) : 92 + (idx % 5);

          return (
            <div
              key={node.name}
              className={`rounded-xl border transition-all text-xs ${
                isCurrentActive
                  ? 'bg-indigo-950/50 border-indigo-500/80 shadow-lg shadow-indigo-500/20 ring-1 ring-indigo-500/50'
                  : isCompleted
                  ? 'bg-slate-800/60 border-emerald-500/30'
                  : 'bg-slate-800/20 border-slate-800/80 text-slate-500'
              }`}
            >
              <div
                onClick={() => setExpandedAgent(isExpanded ? null : node.name)}
                className="p-2.5 flex items-center justify-between cursor-pointer select-none"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${
                      isCurrentActive
                        ? 'bg-indigo-500 text-white border-indigo-400 animate-pulse'
                        : isCompleted
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                        : 'bg-slate-800 text-slate-600 border-slate-700'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : isCurrentActive ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-white" />
                    ) : (
                      <Icon className="w-3.5 h-3.5" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className={`font-bold truncate ${isCompleted ? 'text-white' : isCurrentActive ? 'text-indigo-200' : 'text-slate-400'}`}>
                        {node.displayName}
                      </span>
                      <span className="text-[10px] text-slate-400 hidden sm:inline-block">
                        • {node.roleTag}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 truncate mt-0.5">
                      {matchingLog ? matchingLog.message : node.description}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 font-mono">
                    {confidence}%
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Priority 4: Agent Reasoning Visibility Dropdown / Expanded View */}
              {isExpanded && (
                <div className="px-3 pb-3 pt-2 border-t border-slate-800/80 bg-slate-950/80 rounded-b-xl space-y-2">
                  {/* Reasoning Summary */}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1 mb-1">
                      <BrainCircuit className="w-3 h-3" />
                      <span>Reasoning Summary</span>
                    </span>
                    <p className="text-[11px] text-slate-200 leading-relaxed bg-slate-900/90 p-2 rounded-lg border border-slate-800">
                      {reasoning}
                    </p>
                  </div>

                  {/* Evidence Used & Detected Skills Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px]">
                    <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                      <span className="font-bold text-slate-400 uppercase tracking-tight block mb-1">
                        🔍 Evidence Used:
                      </span>
                      <span className="text-slate-300 leading-snug block">
                        {evidence}
                      </span>
                    </div>

                    <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                      <span className="font-bold text-slate-400 uppercase tracking-tight block mb-1">
                        🎯 Mapped Outputs / Skills:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {detected.slice(0, 3).map((item, dIdx) => (
                          <span
                            key={dIdx}
                            className="bg-indigo-950/60 text-indigo-300 border border-indigo-500/30 px-1.5 py-0.2 rounded text-[9px] font-semibold truncate max-w-[150px]"
                          >
                            ✓ {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[9px] text-slate-500 font-mono pt-1">
                    <span>Agent: {node.name}</span>
                    <span>Confidence: {confidence}% • State Immutable</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Terminal Telemetry Logs Drawer */}
      <div className="mt-3 pt-3 border-t border-slate-800">
        <div
          onClick={() => setShowTerminalLogs(!showTerminalLogs)}
          className="flex items-center justify-between cursor-pointer select-none text-xs font-semibold text-slate-400 hover:text-slate-200 mb-1.5"
        >
          <div className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>LangGraph Event Telemetry ({logs.length} events)</span>
          </div>
          {showTerminalLogs ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </div>

        {showTerminalLogs && (
          <div className="bg-slate-950 rounded-xl p-2.5 border border-slate-800 text-[10px] font-mono text-slate-300 max-h-24 overflow-y-auto space-y-1">
            {logs.length === 0 ? (
              <div className="text-slate-500 italic">// Awaiting execution trigger...</div>
            ) : (
              logs.map((log, i) => (
                <div key={i} className="leading-tight flex items-start gap-1.5">
                  <span className="text-slate-500 shrink-0">[{log.timestamp}]</span>
                  <span className="text-indigo-400 shrink-0 font-bold">{log.agent}:</span>
                  <span className="text-emerald-300 truncate">{log.message}</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
