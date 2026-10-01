import React from 'react';
import { X, Network, Layers, ArrowRight, ShieldCheck, Cpu, Database, Send, Terminal, Sparkles } from 'lucide-react';

interface LangGraphArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LangGraphArchitectureModal: React.FC<LangGraphArchitectureModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const nodes = [
    {
      step: 1,
      id: 'VernacularTradeAuditorAgent',
      title: '1. Vernacular Trade Auditor',
      type: 'Multimodal Input Node',
      input: 'audio_text + image_b64',
      output: 'verified_skills[]',
      color: 'border-amber-500 bg-amber-950/30 text-amber-200'
    },
    {
      step: 2,
      id: 'SkillGraphIntelligenceAgent',
      title: '2. Skill Graph Intelligence',
      type: 'Knowledge Graph Synthesizer',
      input: 'verified_skills[]',
      output: 'skill_graph (nodes, edges)',
      color: 'border-blue-500 bg-blue-950/30 text-blue-200'
    },
    {
      step: 3,
      id: 'NSQFAlignmentAgent',
      title: '3. NSQF Alignment Engine',
      type: 'Standards Classifier',
      input: 'skill_graph + nsqf_roles.json',
      output: 'nsqf_mapping (QP, Level 4)',
      color: 'border-emerald-500 bg-emerald-950/30 text-emerald-200'
    },
    {
      step: 4,
      id: 'FutureSkillsGapAgent',
      title: '4. Future Skills Gap Agent',
      type: 'Market Elasticity Evaluator',
      input: 'nsqf_mapping + future_skills.json',
      output: 'future_skill_gaps[]',
      color: 'border-purple-500 bg-purple-950/30 text-purple-200'
    },
    {
      step: 5,
      id: 'UpskillingAgent',
      title: '5. Upskilling Agent',
      type: 'Curriculum Generator',
      input: 'future_skill_gaps[] + language',
      output: 'learning_plan (4 Weeks)',
      color: 'border-sky-500 bg-sky-950/30 text-sky-200'
    },
    {
      step: 6,
      id: 'MSMEDemandIntelligenceAgent',
      title: '6. MSME Demand Intelligence',
      type: 'Spatial Recommender',
      input: 'location + nsqf_level + msme_jobs',
      output: 'matched_jobs[] (Top 5)',
      color: 'border-cyan-500 bg-cyan-950/30 text-cyan-200'
    },
    {
      step: 7,
      id: 'EmployabilityPassportAgent',
      title: '7. Employability Passport Agent',
      type: 'Digital Credential & Verification Engine',
      input: 'all previous agent states',
      output: 'employability_passport (Tamper-Evident Hash)',
      color: 'border-emerald-400 bg-emerald-950/40 text-emerald-100'
    },
    {
      step: 8,
      id: 'ExecutionAgent',
      title: '8. Execution Agent',
      type: 'WhatsApp Dispatcher',
      input: 'passport + matched_jobs[0]',
      output: 'outreach_payload (wa.me)',
      color: 'border-emerald-600 bg-emerald-950/50 text-emerald-200'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>LangGraph Architecture & StateGraph Topology</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Compiled DAG
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Visualizing state schema transitions, linear edge compilation, and output sinks
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

        {/* Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-950">
          {/* Architecture Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 uppercase text-[10px] font-bold block mb-1">State Type</span>
              <span className="font-mono text-indigo-300 font-bold">TypedDict AgentState</span>
              <span className="text-[10px] text-slate-500 block mt-1">13 Immutable Typed Keys</span>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 uppercase text-[10px] font-bold block mb-1">Graph Nodes</span>
              <span className="font-mono text-emerald-400 font-bold">8 Autonomous Nodes</span>
              <span className="text-[10px] text-slate-500 block mt-1">Zero Cyclic Invariants</span>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 uppercase text-[10px] font-bold block mb-1">Underlying AI</span>
              <span className="font-mono text-amber-300 font-bold">Gemini 2.5 Flash / Vision</span>
              <span className="text-[10px] text-slate-500 block mt-1">Multi-signal Corroboration</span>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 uppercase text-[10px] font-bold block mb-1">Downstream Sinks</span>
              <span className="font-mono text-sky-300 font-bold">wa.me + PDF + SQLite</span>
              <span className="text-[10px] text-slate-500 block mt-1">Direct MSME Placement</span>
            </div>
          </div>

          {/* Item 7: High-Level System Architecture Flow Diagram */}
          <div className="bg-slate-900/90 p-4 rounded-xl border border-indigo-500/30 shadow-lg">
            <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Network className="w-3.5 h-3.5 text-amber-400" />
              <span>High-Level System Architecture Flow</span>
            </h3>
            <p className="text-[11px] text-slate-400 mb-3">
              End-to-end multi-agent execution pipeline converting informal worker signals into verified digital employability credentials.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-mono">
              <span className="px-2.5 py-1 rounded-lg bg-orange-950/70 border border-orange-500/40 text-orange-300 font-bold">
                Worker Input
              </span>
              <span className="text-slate-500">→</span>
              <span className="px-2.5 py-1 rounded-lg bg-sky-950/70 border border-sky-500/40 text-sky-300 font-bold">
                Voice / Text Agent
              </span>
              <span className="text-slate-500">→</span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 font-bold">
                Vision Agent
              </span>
              <span className="text-slate-500">→</span>
              <span className="px-2.5 py-1 rounded-lg bg-indigo-950/70 border border-indigo-500/40 text-indigo-300 font-bold">
                Skill Extraction Agent
              </span>
              <span className="text-slate-500">→</span>
              <span className="px-2.5 py-1 rounded-lg bg-amber-950/70 border border-amber-500/40 text-amber-300 font-bold">
                NSQF Mapping Agent
              </span>
              <span className="text-slate-500">→</span>
              <span className="px-2.5 py-1 rounded-lg bg-purple-950/70 border border-purple-500/40 text-purple-300 font-bold">
                Future Skill Agent
              </span>
              <span className="text-slate-500">→</span>
              <span className="px-2.5 py-1 rounded-lg bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 font-bold">
                MSME Matching Agent
              </span>
              <span className="text-slate-500">→</span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-900/80 border border-emerald-400 text-emerald-200 font-bold shadow-sm">
                Digital Passport Agent
              </span>
            </div>
          </div>

          {/* Interactive DAG Nodes Layout */}
          <div>
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              <span>Linear State Machine Execution Sequence (1 to 8)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {nodes.map((node, idx) => (
                <div
                  key={node.id}
                  className={`rounded-xl border p-3.5 flex flex-col justify-between ${node.color} shadow-sm transition-all hover:scale-[1.02]`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-1 text-[10px] font-mono">
                      <span className="font-bold opacity-80">NODE #{node.step}</span>
                      <span className="bg-slate-900/80 px-1.5 py-0.2 rounded font-semibold text-slate-300">
                        {node.type}
                      </span>
                    </div>

                    <h4 className="font-bold text-xs text-white mb-2 leading-tight">
                      {node.title}
                    </h4>

                    <div className="space-y-1 text-[10px] font-mono bg-slate-950/80 p-2 rounded-lg border border-slate-800/80">
                      <div>
                        <span className="text-slate-500">IN: </span>
                        <span className="text-slate-300">{node.input}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">OUT: </span>
                        <span className="text-emerald-400 font-semibold">{node.output}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[9px] text-slate-400 font-mono">
                    <span>Edge: #{node.step} → #{node.step < 8 ? node.step + 1 : 'END'}</span>
                    <ArrowRight className="w-3 h-3 opacity-60" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Code Integration Preview */}
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs">
            <div className="flex justify-between items-center mb-2 font-mono text-[11px] text-indigo-300 font-bold">
              <span>backend/graph.py (Compilation Snippet)</span>
              <span className="text-slate-500 text-[10px]">LangGraph v0.0.30+</span>
            </div>
            <pre className="font-mono text-[11px] text-slate-300 overflow-x-auto leading-relaxed">
{`workflow = StateGraph(AgentState)
workflow.add_node("VernacularTradeAuditorAgent", vernacular_trade_auditor_agent)
workflow.add_node("SkillGraphIntelligenceAgent", skill_graph_intelligence_agent)
workflow.add_node("NSQFAlignmentAgent", nsqf_alignment_agent)
workflow.add_node("FutureSkillsGapAgent", future_skills_gap_agent)
workflow.add_node("UpskillingAgent", upskilling_agent)
workflow.add_node("MSMEDemandIntelligenceAgent", msme_demand_intelligence_agent)
workflow.add_node("EmployabilityPassportAgent", employability_passport_agent)
workflow.add_node("ExecutionAgent", execution_agent)

workflow.set_entry_point("VernacularTradeAuditorAgent")
workflow.add_edge("VernacularTradeAuditorAgent", "SkillGraphIntelligenceAgent")
# ... linear conditional sequence ...
workflow.add_edge("ExecutionAgent", END)
app = workflow.compile()`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
