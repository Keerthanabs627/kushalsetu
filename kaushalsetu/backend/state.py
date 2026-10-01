"""
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
    pipeline_status: str
