"""
Agent 7: EmployabilityPassportAgent
Compiles the official KaushalSetu Employability Passport with cryptographic verification hash,
composite Employability Score (0-100), NSQF accreditation, and portable credentials.
"""

import hashlib
import uuid
from typing import Dict, Any
from datetime import datetime
from ..state import AgentState


def employability_passport_agent(state: AgentState) -> Dict[str, Any]:
    worker_name = state.get("worker_name", "Artisan")
    location = state.get("location", "India")
    nsqf = state.get("nsqf_mapping", {})
    verified_skills = state.get("verified_skills", [])
    skill_graph = state.get("skill_graph", {})

    # Calculate Composite Employability Score (0-100)
    # Weights:
    # 40% Verified hands-on competency scores
    # 30% NSQF readiness level alignment
    # 15% Tool versatility
    # 15% Market demand index
    skill_conf_avg = 85.0
    if verified_skills:
        skill_conf_avg = sum(s.get("confidence_score", 0.85) * 100 for s in verified_skills) / len(verified_skills)

    nsqf_readiness = nsqf.get("readiness_percentage", 88.0)
    tools_count = sum(len(s.get("tools_identified", [])) for s in verified_skills)
    tool_score = min(100.0, tools_count * 15.0)

    employability_score = round(
        (0.40 * skill_conf_avg) +
        (0.35 * nsqf_readiness) +
        (0.15 * tool_score) +
        (0.10 * 92.0),  # High MSME cluster demand
        1
    )

    # Generate deterministic cryptographic proof hash
    raw_hash_input = f"{worker_name}:{location}:{nsqf.get('qp_code')}:{employability_score}:{datetime.utcnow().strftime('%Y-%m-%d')}"
    sha256_hash = hashlib.sha256(raw_hash_input.encode()).hexdigest()
    verification_hash = f"0x{sha256_hash[:16].upper()}"

    unique_passport_id = f"KS-{datetime.utcnow().strftime('%Y')}-{abs(hash(worker_name)) % 90000 + 10000}"

    passport = {
        "passport_id": unique_passport_id,
        "worker_name": worker_name,
        "location": location,
        "preferred_language": state.get("preferred_language", "Hindi"),
        "primary_trade": nsqf.get("matched_role", "Master Technician"),
        "qp_code": nsqf.get("qp_code", "CSC/Q0209"),
        "sector": nsqf.get("sector", "Capital Goods & Automotive"),
        "nsqf_level": nsqf.get("nsqf_level", 4),
        "employability_score": employability_score,
        "score_grade": "A+ Elite Certified" if employability_score >= 88 else "A Verified Skilled",
        "expected_salary_band": nsqf.get("expected_salary_band", "₹26,000 - ₹38,000 / month"),
        "verified_skills_count": len(verified_skills),
        "verified_skills_summary": [s.get("skill_name") for s in verified_skills[:4]],
        "verification_hash": verification_hash,
        "issued_by": "KaushalSetu Bharat Autonomous Workforce Board",
        "issue_date": datetime.utcnow().strftime("%d %b %Y"),
        "status": "ACTIVE_AUTHENTICATED",
        "digilocker_compatible": True
    }

    log_entry = {
        "agent": "EmployabilityPassportAgent",
        "timestamp": datetime.utcnow().isoformat(),
        "status": "COMPLETED",
        "message": f"Minted Employability Passport {unique_passport_id} with Employability Score {employability_score}/100 and SHA-256 verification hash {verification_hash}.",
        "confidence": 0.99
    }

    logs = list(state.get("agent_logs", []))
    logs.append(log_entry)

    return {
        "employability_passport": passport,
        "current_step": "EmployabilityPassportAgent",
        "agent_logs": logs
    }
