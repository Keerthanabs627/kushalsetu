"""
KaushalSetu AI: FastAPI Backend
Production-ready REST API orchestrating the LangGraph 8-Agent pipeline,
database persistence, MSME job radar, and digital passport verification.
"""

import uuid
from typing import Optional, List, Dict, Any
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from .state import AgentState
from .graph import run_pipeline, create_kaushalsetu_graph
from .services.db_service import (
    save_evaluation_record,
    get_all_workers,
    get_passport_by_id,
    init_db
)
from .agents.msme import load_msme_jobs
from .agents.nsqf import load_nsqf_benchmarks

app = FastAPI(
    title="KaushalSetu AI API",
    description="Autonomous Employability Intelligence Platform for Bharat's Skilled Workforce",
    version="1.0.0"
)

# Enable CORS for Streamlit and React clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    init_db()


class WorkerIntakeRequest(BaseModel):
    worker_name: str = Field(..., example="Ramesh Kumar")
    location: str = Field(..., example="Peenya, Bengaluru, Karnataka")
    preferred_language: str = Field(default="Hindi", example="Hindi")
    trade_description: str = Field(..., example="Mai pichhle 5 saal se MIG aur TIG welding kar raha hu. Heavy mild steel plates aur argon gas torch se joints banata hu.")
    experience_years: Optional[float] = Field(default=5.0, example=5.0)
    uploaded_image: Optional[str] = Field(default=None, description="Base64 encoded data URI of tool or workpiece")
    phone_number: Optional[str] = Field(default="+91 98450 12894", example="+91 98450 12894")


class EvaluationResponse(BaseModel):
    worker_id: str
    status: str
    pipeline_state: Dict[str, Any]
    passport_id: str


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "KaushalSetu AI Autonomous Employability Intelligence",
        "agents_registered": 8,
        "langgraph_ready": True
    }


@app.post("/api/evaluate", response_model=EvaluationResponse)
def evaluate_worker(payload: WorkerIntakeRequest):
    """
    Executes the 8-agent LangGraph pipeline:
    1. VernacularTradeAuditorAgent ->
    2. SkillGraphIntelligenceAgent ->
    3. NSQFAlignmentAgent ->
    4. FutureSkillsGapAgent ->
    5. UpskillingAgent ->
    6. MSMEDemandIntelligenceAgent ->
    7. EmployabilityPassportAgent ->
    8. ExecutionAgent
    """
    worker_id = f"worker-{uuid.uuid4().hex[:8]}"

    initial_state: AgentState = {
        "worker_name": payload.worker_name,
        "location": payload.location,
        "preferred_language": payload.preferred_language,
        "trade_description": payload.trade_description,
        "uploaded_image": payload.uploaded_image,
        "experience_years": payload.experience_years,
        "phone_number": payload.phone_number,
        "agent_logs": [],
        "pipeline_status": "INITIALIZED"
    }

    try:
        final_state = run_pipeline(initial_state)
        passport_id = save_evaluation_record(worker_id, final_state)
        return {
            "worker_id": worker_id,
            "status": final_state.get("pipeline_status", "COMPLETED"),
            "pipeline_state": final_state,
            "passport_id": passport_id
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Pipeline execution error: {str(e)}")


@app.get("/api/workers")
def list_workers():
    """Lists all previously evaluated artisans from the database."""
    return {"workers": get_all_workers()}


@app.get("/api/jobs")
def get_jobs(city: Optional[str] = None):
    """Retrieves active MSME job opportunities."""
    jobs = load_msme_jobs()
    if city:
        jobs = [j for j in jobs if city.lower() in j["city"].lower()]
    return {"jobs": jobs, "total": len(jobs)}


@app.get("/api/nsqf-roles")
def get_nsqf_roles():
    """Retrieves NSQF Level 3-5 vocational standards."""
    roles = load_nsqf_benchmarks()
    return {"roles": roles, "total": len(roles)}


@app.get("/api/passport/{passport_id}")
def get_passport(passport_id: str):
    """Public verification endpoint for Employability Passport."""
    record = get_passport_by_id(passport_id)
    if not record:
        raise HTTPException(status_code=404, detail="Passport not found or unverified")
    return {"passport": record}


@app.get("/api/graph/schema")
def get_graph_schema():
    """Returns the visual DAG node topology of the 8 agents."""
    return {
        "nodes": [
            {"id": "VernacularTradeAuditorAgent", "step": 1, "description": "Multimodal vernacular audit of trade narrative & workpiece"},
            {"id": "SkillGraphIntelligenceAgent", "step": 2, "description": "Directed competency knowledge graph construction"},
            {"id": "NSQFAlignmentAgent", "step": 3, "description": "National Occupational Standards mapping to Level 3-5"},
            {"id": "FutureSkillsGapAgent", "step": 4, "description": "EV, Solar, and Industry 4.0 wage-boost gap analysis"},
            {"id": "UpskillingAgent", "step": 5, "description": "4-Week practical shopfloor micro-curriculum"},
            {"id": "MSMEDemandIntelligenceAgent", "step": 6, "description": "Cluster-based MSME job radar and wage benchmarking"},
            {"id": "EmployabilityPassportAgent", "step": 7, "description": "Cryptographic Employability Score and QR card minting"},
            {"id": "ExecutionAgent", "step": 8, "description": "Instant WhatsApp recruiter dispatch payload generation"}
        ],
        "edges": [
            {"from": "VernacularTradeAuditorAgent", "to": "SkillGraphIntelligenceAgent"},
            {"from": "SkillGraphIntelligenceAgent", "to": "NSQFAlignmentAgent"},
            {"from": "NSQFAlignmentAgent", "to": "FutureSkillsGapAgent"},
            {"from": "FutureSkillsGapAgent", "to": "UpskillingAgent"},
            {"from": "UpskillingAgent", "to": "MSMEDemandIntelligenceAgent"},
            {"from": "MSMEDemandIntelligenceAgent", "to": "EmployabilityPassportAgent"},
            {"from": "EmployabilityPassportAgent", "to": "ExecutionAgent"}
        ]
    }
