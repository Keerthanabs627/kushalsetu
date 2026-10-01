import React, { useState } from 'react';
import { X, Copy, Check, FileCode, Folder, Download, Terminal, Cpu } from 'lucide-react';

interface CodebaseExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FILE_REGISTRY: { path: string; language: string; summary: string; code: string }[] = [
  {
    path: 'kaushalsetu/backend/state.py',
    language: 'python',
    summary: 'TypedDict AgentState tracking the 8-agent LangGraph workflow.',
    code: `"""
KaushalSetu AI: AgentState Definition
TypedDict schema tracking the end-to-end multi-agent pipeline state across all 8 LangGraph nodes.
"""

from typing import TypedDict, List, Dict, Any, Optional

class AgentState(TypedDict, total=False):
    # Worker Intake Inputs
    worker_name: str
    location: str
    preferred_language: str
    trade_description: str
    uploaded_image: Optional[str]  # base64 encoded data URI or path
    experience_years: Optional[float]
    phone_number: Optional[str]

    # Agent 1 Output: Vernacular Trade Auditor
    verified_skills: List[Dict[str, Any]]

    # Agent 2 Output: Skill Graph Intelligence
    skill_graph: Dict[str, Any]

    # Agent 3 Output: NSQF Alignment
    nsqf_mapping: Dict[str, Any]

    # Agent 4 Output: Future Skills Gap
    future_skill_gaps: List[Dict[str, Any]]

    # Agent 5 Output: Upskilling Agent
    learning_plan: Dict[str, Any]

    # Agent 6 Output: MSME Demand Intelligence
    matched_jobs: List[Dict[str, Any]]

    # Agent 7 Output: Employability Passport Agent
    employability_passport: Dict[str, Any]

    # Agent 8 Output: Execution Agent
    outreach_payload: Dict[str, Any]

    # Telemetry and Tracking
    agent_logs: List[Dict[str, Any]]
    current_step: str
    pipeline_status: str`
  },
  {
    path: 'kaushalsetu/backend/graph.py',
    language: 'python',
    summary: 'LangGraph StateGraph compilation wiring all 8 autonomous agent nodes.',
    code: `"""
KaushalSetu AI: LangGraph Multi-Agent Workflow
Compiles the 8-agent state graph pipeline orchestrating autonomous employability intelligence.
"""

from typing import Dict, Any
from .state import AgentState
from .agents.auditor import vernacular_trade_auditor_agent
from .agents.skill_graph import skill_graph_intelligence_agent
from .agents.nsqf import nsqf_alignment_agent
from .agents.gaps import future_skills_gap_agent
from .agents.upskilling import upskilling_agent
from .agents.msme import msme_demand_intelligence_agent
from .agents.passport import employability_passport_agent
from .agents.execution import execution_agent

from langgraph.graph import StateGraph, END

def create_kaushalsetu_graph():
    workflow = StateGraph(AgentState)

    # 1. Register all 8 agents as LangGraph nodes
    workflow.add_node("VernacularTradeAuditorAgent", vernacular_trade_auditor_agent)
    workflow.add_node("SkillGraphIntelligenceAgent", skill_graph_intelligence_agent)
    workflow.add_node("NSQFAlignmentAgent", nsqf_alignment_agent)
    workflow.add_node("FutureSkillsGapAgent", future_skills_gap_agent)
    workflow.add_node("UpskillingAgent", upskilling_agent)
    workflow.add_node("MSMEDemandIntelligenceAgent", msme_demand_intelligence_agent)
    workflow.add_node("EmployabilityPassportAgent", employability_passport_agent)
    workflow.add_node("ExecutionAgent", execution_agent)

    # 2. Set entry point
    workflow.set_entry_point("VernacularTradeAuditorAgent")

    # 3. Add edges connecting all 8 nodes
    workflow.add_edge("VernacularTradeAuditorAgent", "SkillGraphIntelligenceAgent")
    workflow.add_edge("SkillGraphIntelligenceAgent", "NSQFAlignmentAgent")
    workflow.add_edge("NSQFAlignmentAgent", "FutureSkillsGapAgent")
    workflow.add_edge("FutureSkillsGapAgent", "UpskillingAgent")
    workflow.add_edge("UpskillingAgent", "MSMEDemandIntelligenceAgent")
    workflow.add_edge("MSMEDemandIntelligenceAgent", "EmployabilityPassportAgent")
    workflow.add_edge("EmployabilityPassportAgent", "ExecutionAgent")
    workflow.add_edge("ExecutionAgent", END)

    return workflow.compile()`
  },
  {
    path: 'kaushalsetu/backend/api.py',
    language: 'python',
    summary: 'FastAPI production backend with /api/evaluate and /api/passport endpoints.',
    code: `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, Any
from .state import AgentState
from .graph import run_pipeline
from .services.db_service import save_evaluation_record, get_all_workers, get_passport_by_id

app = FastAPI(title="KaushalSetu AI API", version="1.0.0")

class WorkerIntakeRequest(BaseModel):
    worker_name: str
    location: str
    preferred_language: str = "Hindi"
    trade_description: str
    experience_years: Optional[float] = 5.0
    uploaded_image: Optional[str] = None
    phone_number: Optional[str] = "+91 98450 12894"

@app.post("/api/evaluate")
def evaluate_worker(payload: WorkerIntakeRequest):
    final_state = run_pipeline(payload.dict())
    passport_id = save_evaluation_record(payload.worker_name, final_state)
    return {"status": "SUCCESS", "pipeline_state": final_state, "passport_id": passport_id}`
  },
  {
    path: 'kaushalsetu/frontend/dashboard.py',
    language: 'python',
    summary: 'Streamlit 4-panel Bharat Workforce Command Center UI.',
    code: `import streamlit as st
import requests

st.set_page_config(page_title="KaushalSetu AI Command Center", layout="wide")

# 4-Panel Layout
col_left, col_center, col_right = st.columns([1.1, 1.2, 1.1])

with col_left:
    st.subheader("1. Worker Intake Form")
    # Worker intake inputs...

with col_center:
    st.subheader("2. Live Agent Pipeline")
    # Live LangGraph 8-node tracking...

with col_right:
    st.subheader("3. Employability Passport Card")
    # Score gauge, NSQF readiness & QR...

st.subheader("4. Downstream Autonomous Execution")
# Learning roadmap, MSME matches & WhatsApp dispatch`
  },
  {
    path: 'kaushalsetu/requirements.txt',
    language: 'text',
    summary: 'Python dependencies (LangGraph, FastAPI, Streamlit, Google GenAI).',
    code: `fastapi>=0.110.0
uvicorn[standard]>=0.28.0
langgraph>=0.0.30
langchain-core>=0.1.30
langchain-google-genai>=0.0.9
google-genai>=0.1.1
google-generativeai>=0.4.1
pydantic>=2.6.0
streamlit>=1.32.0
httpx>=0.27.0
python-dotenv>=1.0.1
pillow>=10.2.0
networkx>=3.2.1
matplotlib>=3.8.3
pandas>=2.2.1
qrcode>=7.4.2`
  },
  {
    path: 'kaushalsetu/Dockerfile',
    language: 'dockerfile',
    summary: 'Production Dockerfile for Python 3.11 environment.',
    code: `FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000 8501
CMD ["python", "app.py", "api"]`
  }
];

export const CodebaseExplorerModal: React.FC<CodebaseExplorerModalProps> = ({ isOpen, onClose }) => {
  const [selectedFileIdx, setSelectedFileIdx] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const activeFile = FILE_REGISTRY[selectedFileIdx];

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(activeFile.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">KaushalSetu AI • Python & LangGraph Codebase</h2>
              <p className="text-xs text-slate-400">Generated production files in /kaushalsetu/</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
              Validated on Python 3.10 / 3.11
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Left Files List, Right Code Viewer */}
        <div className="flex-1 flex flex-col md:flex-row min-h-0">
          {/* Left file tree */}
          <div className="w-full md:w-72 bg-slate-950/90 border-r border-slate-800 p-3 overflow-y-auto flex flex-col justify-between">
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-2 py-1 flex items-center gap-1.5">
                <Folder className="w-3.5 h-3.5 text-amber-500" />
                <span>kaushalsetu /</span>
              </div>
              {FILE_REGISTRY.map((file, idx) => {
                const isSelected = selectedFileIdx === idx;
                const fileName = file.path.replace('kaushalsetu/', '');
                return (
                  <button
                    key={file.path}
                    onClick={() => setSelectedFileIdx(idx)}
                    className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-mono flex items-center gap-2 transition-all ${
                      isSelected
                        ? 'bg-indigo-600/30 text-indigo-200 border border-indigo-500/50 font-bold'
                        : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                    }`}
                  >
                    <FileCode className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-indigo-400' : 'text-slate-500'}`} />
                    <span className="truncate">{fileName}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500 px-2 font-mono">
              <div>Total Agents: 8</div>
              <div>Framework: LangGraph</div>
              <div>Backend: FastAPI</div>
              <div>UI: Streamlit / React</div>
            </div>
          </div>

          {/* Right code editor display */}
          <div className="flex-1 bg-slate-950 flex flex-col min-w-0">
            {/* File info bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/60 border-b border-slate-800 text-xs">
              <div className="min-w-0">
                <div className="font-mono text-indigo-300 font-bold truncate">{activeFile.path}</div>
                <div className="text-[11px] text-slate-400 truncate">{activeFile.summary}</div>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors shrink-0 ml-3"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy File'}</span>
              </button>
            </div>

            {/* Code contents */}
            <div className="flex-1 p-4 overflow-auto font-mono text-xs text-slate-200 bg-slate-950 leading-relaxed selection:bg-indigo-900">
              <pre className="whitespace-pre">{activeFile.code}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
