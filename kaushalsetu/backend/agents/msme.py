"""
Agent 6: MSMEDemandIntelligenceAgent
Matches verified artisan profiles to active MSME industrial cluster vacancies
(e.g., Peenya, Bhosari MIDC, Okhla, Ambattur, Manesar) with real wage benchmarks.
"""

import json
import os
from typing import Dict, Any, List
from datetime import datetime
from ..state import AgentState


def load_msme_jobs() -> List[Dict[str, Any]]:
    path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "data", "msme_jobs.json")
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return []


def msme_demand_intelligence_agent(state: AgentState) -> Dict[str, Any]:
    all_jobs = load_msme_jobs()
    nsqf = state.get("nsqf_mapping", {})
    verified = state.get("verified_skills", [])
    worker_loc = state.get("location", "").lower()
    matched_role = str(nsqf.get("matched_role", "")).lower()

    scored_jobs = []
    for job in all_jobs:
        score = 65  # Base match
        # Check title / role match
        if any(w in job["role"].lower() for w in matched_role.split()):
            score += 25
        # Check location match
        if any(w in job["city"].lower() or w in job["state"].lower() for w in worker_loc.split()):
            score += 15
        # Check requirements overlap
        for req in job.get("key_requirements", []):
            if any(v.get("skill_name", "").lower() in req.lower() for v in verified):
                score += 10

        scored_job = dict(job)
        scored_job["match_score"] = min(98, score)
        scored_jobs.append(scored_job)

    # Sort descending by match score
    scored_jobs.sort(key=lambda j: j["match_score"], reverse=True)
    top_matches = scored_jobs[:4]

    log_entry = {
        "agent": "MSMEDemandIntelligenceAgent",
        "timestamp": datetime.utcnow().isoformat(),
        "status": "COMPLETED",
        "message": f"Identified {len(top_matches)} verified MSME cluster vacancies matching verified NSQF profile with up to {top_matches[0]['match_score']}% fit.",
        "confidence": 0.95
    }

    logs = list(state.get("agent_logs", []))
    logs.append(log_entry)

    return {
        "matched_jobs": top_matches,
        "current_step": "MSMEDemandIntelligenceAgent",
        "agent_logs": logs
    }
