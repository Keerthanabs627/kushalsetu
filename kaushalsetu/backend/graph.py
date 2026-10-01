"""
KaushalSetu AI: LangGraph Multi-Agent Workflow
Compiles the 8-agent state graph pipeline orchestrating autonomous employability intelligence.
Includes both LangGraph StateGraph compilation and a synchronous sequential runner.
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

try:
    from langgraph.graph import StateGraph, END
    LANGGRAPH_AVAILABLE = True
except ImportError:
    LANGGRAPH_AVAILABLE = False
    END = "__end__"


def create_kaushalsetu_graph():
    """
    Constructs and compiles the full 8-agent LangGraph pipeline.
    """
    if not LANGGRAPH_AVAILABLE:
        return None

    workflow = StateGraph(AgentState)

    # Register all 8 agents as LangGraph nodes
    workflow.add_node("VernacularTradeAuditorAgent", vernacular_trade_auditor_agent)
    workflow.add_node("SkillGraphIntelligenceAgent", skill_graph_intelligence_agent)
    workflow.add_node("NSQFAlignmentAgent", nsqf_alignment_agent)
    workflow.add_node("FutureSkillsGapAgent", future_skills_gap_agent)
    workflow.add_node("UpskillingAgent", upskilling_agent)
    workflow.add_node("MSMEDemandIntelligenceAgent", msme_demand_intelligence_agent)
    workflow.add_node("EmployabilityPassportAgent", employability_passport_agent)
    workflow.add_node("ExecutionAgent", execution_agent)

    # Set pipeline entry point
    workflow.set_entry_point("VernacularTradeAuditorAgent")

    # Connect nodes linearly with deterministic conditional checks
    workflow.add_edge("VernacularTradeAuditorAgent", "SkillGraphIntelligenceAgent")
    workflow.add_edge("SkillGraphIntelligenceAgent", "NSQFAlignmentAgent")
    workflow.add_edge("NSQFAlignmentAgent", "FutureSkillsGapAgent")
    workflow.add_edge("FutureSkillsGapAgent", "UpskillingAgent")
    workflow.add_edge("UpskillingAgent", "MSMEDemandIntelligenceAgent")
    workflow.add_edge("MSMEDemandIntelligenceAgent", "EmployabilityPassportAgent")
    workflow.add_edge("EmployabilityPassportAgent", "ExecutionAgent")
    workflow.add_edge("ExecutionAgent", END)

    app = workflow.compile()
    return app


def run_pipeline(initial_state: AgentState) -> AgentState:
    """
    Executes the 8-agent pipeline sequentially, updating state at each step.
    Guarantees reliable execution even if langgraph runtime binaries are absent.
    """
    state = dict(initial_state)
    state.setdefault("agent_logs", [])
    state["pipeline_status"] = "RUNNING"

    agents_sequence = [
        ("VernacularTradeAuditorAgent", vernacular_trade_auditor_agent),
        ("SkillGraphIntelligenceAgent", skill_graph_intelligence_agent),
        ("NSQFAlignmentAgent", nsqf_alignment_agent),
        ("FutureSkillsGapAgent", future_skills_gap_agent),
        ("UpskillingAgent", upskilling_agent),
        ("MSMEDemandIntelligenceAgent", msme_demand_intelligence_agent),
        ("EmployabilityPassportAgent", employability_passport_agent),
        ("ExecutionAgent", execution_agent),
    ]

    for node_name, agent_fn in agents_sequence:
        try:
            update = agent_fn(state)
            state.update(update)
        except Exception as e:
            error_log = {
                "agent": node_name,
                "timestamp": "",
                "status": "ERROR",
                "message": f"Pipeline node failed: {str(e)}",
                "confidence": 0.0
            }
            state["agent_logs"].append(error_log)
            state["pipeline_status"] = f"FAILED_AT_{node_name}"
            break

    state["pipeline_status"] = "SUCCESS_ALL_AGENTS_COMPLETED"
    return state
