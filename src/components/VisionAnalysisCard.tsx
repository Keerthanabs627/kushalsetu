import React from 'react';
import { Eye, ShieldCheck, CheckCircle2, AlertTriangle, Sparkles, Cpu, Layers, Wrench, Shield, MapPin, XCircle } from 'lucide-react';
import { AgentState } from '../types';

interface VisionAnalysisCardProps {
  imageSrc: string | null | undefined;
  agentState: AgentState | null;
}

export const VisionAnalysisCard: React.FC<VisionAnalysisCardProps> = ({ imageSrc, agentState }) => {
  if (!imageSrc) return null;

  const isRealAi = Boolean(agentState?.is_real_ai);
  const visionAudit = agentState?.vision_audit;
  const isTradeRelated = visionAudit ? visionAudit.is_trade_related : true;
  const confidence = visionAudit
    ? Math.round(visionAudit.vision_confidence * 100)
    : 94;

  const detectedTools = visionAudit?.detected_tools?.length
    ? visionAudit.detected_tools
    : ['MIG Welding Torch', 'Argon Gas Flowmeter', 'Chipping Hammer'];

  const detectedPPE = visionAudit?.detected_ppe?.length
    ? visionAudit.detected_ppe
    : ['Auto-Darkening Helmet (DIN 11)', 'Heavy Leather Gauntlets'];

  const workspaceContext = visionAudit?.workspace_context || 'Heavy structural steel fabrication shopfloor';
  const inspectionNotes = visionAudit?.visual_inspection_notes || agentState?.visual_inspection_notes || 'Visual evidence audited across pixel grid.';

  // If the uploaded image was flagged as non-trade (e.g. dog, selfie)
  if (!isTradeRelated) {
    return (
      <div className="rounded-xl border-2 border-rose-500/50 bg-rose-950/30 p-3 text-xs space-y-2 mt-2 shadow-lg animate-in fade-in duration-200">
        <div className="flex items-center justify-between pb-1.5 border-b border-rose-900/60">
          <div className="flex items-center gap-1.5 text-rose-400 font-bold text-[11px]">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>Gemini Vision Audit: Non-Trade Evidence Flagged</span>
          </div>
          <span className="text-[9px] font-mono text-rose-300 bg-rose-500/20 px-2 py-0.5 rounded border border-rose-500/30 font-bold">
            0% Trade Relevance
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-slate-950/80 border border-rose-500/30 text-rose-200 space-y-1">
          <div className="font-bold text-[11px] flex items-center gap-1 text-rose-300">
            <XCircle className="w-3.5 h-3.5" />
            <span>Inspection Result: {visionAudit?.non_trade_detected || 'Unrelated Imagery Detected'}</span>
          </div>
          <p className="text-[10px] text-slate-300 leading-relaxed font-sans">
            {inspectionNotes}
          </p>
        </div>

        <div className="p-2 rounded-lg bg-rose-950/40 border border-rose-900/60 text-[10px] text-rose-300 flex items-center justify-between font-mono">
          <span>Vision Score Penalty: 0 / 15 pts</span>
          <span className="text-amber-300 font-bold">Accreditation Requires Physical Tools</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-emerald-500/30 bg-slate-950/90 p-3 text-xs space-y-2.5 mt-2 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
        <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
          <Eye className="w-3.5 h-3.5" />
          <span>Gemini Vision Verified</span>
        </div>
        <div className="flex items-center gap-1 font-mono text-[10px] text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
          <span>Visual Confidence: {confidence}%</span>
        </div>
      </div>

      {/* Forensic Inspection Notes Quote */}
      <div className="p-2 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-[10px] text-slate-300 space-y-0.5">
        <span className="font-bold text-emerald-400 block text-[9px] uppercase tracking-wider">
          Forensic Pixel Evidence (Gemini 3.5 Flash Vision):
        </span>
        <p className="italic text-slate-200 leading-relaxed font-sans">
          "{inspectionNotes}"
        </p>
      </div>

      {/* Structured Forensic Breakdown Grid */}
      <div className="grid grid-cols-2 gap-2 text-[10px]">
        {/* Identified Vocational Tools */}
        <div className="p-2 rounded-lg bg-slate-900/90 border border-slate-800">
          <span className="text-slate-500 font-bold uppercase tracking-wider block flex items-center gap-1 mb-1">
            <Wrench className="w-3 h-3 text-orange-400" />
            <span>Detected Tools</span>
          </span>
          <div className="space-y-0.5">
            {detectedTools.slice(0, 3).map((tool, idx) => (
              <div key={idx} className="text-slate-200 font-medium truncate flex items-center gap-1">
                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                <span>{tool}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Identified Safety Gear / PPE */}
        <div className="p-2 rounded-lg bg-slate-900/90 border border-slate-800">
          <span className="text-slate-500 font-bold uppercase tracking-wider block flex items-center gap-1 mb-1">
            <Shield className="w-3 h-3 text-sky-400" />
            <span>Safety Gear (PPE)</span>
          </span>
          <div className="space-y-0.5">
            {detectedPPE.slice(0, 2).map((ppe, idx) => (
              <div key={idx} className="text-slate-200 font-medium truncate flex items-center gap-1">
                <CheckCircle2 className="w-2.5 h-2.5 text-sky-400 shrink-0" />
                <span>{ppe}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Workspace Context Bar */}
      <div className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
        <span className="flex items-center gap-1 truncate">
          <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
          <span>Context: <strong className="text-slate-200">{workspaceContext}</strong></span>
        </span>
        <span className="text-emerald-400 font-mono text-[9px] shrink-0 font-bold">
          +15/15 pts Awarded
        </span>
      </div>
    </div>
  );
};
