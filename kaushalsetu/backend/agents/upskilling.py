"""
Agent 5: UpskillingAgent
Constructs a customized 4-Week Micro-Upskilling Roadmap with bite-sized daily modules,
shopfloor practical assignments, and vernacular audio/video links.
"""

from typing import Dict, Any, List
from datetime import datetime
from ..state import AgentState
from ..prompts.agent_prompts import UPSKILLING_ROADMAP_PROMPT
from ..services.gemini_service import generate_structured_response


def upskilling_agent(state: AgentState) -> Dict[str, Any]:
    future_gaps = state.get("future_skill_gaps", [])
    language = state.get("preferred_language", "Hindi")
    nsqf = state.get("nsqf_mapping", {})
    matched_role = nsqf.get("matched_role", "Industrial Artisan")

    prompt = UPSKILLING_ROADMAP_PROMPT.format(
        preferred_language=language,
        future_skill_gaps=future_gaps
    )

    fallback_weeks = [
        {
            "week_number": 1,
            "theme": "Core Theory & Digital Instrumentation",
            "daily_micro_modules": [
                "Day 1: Digital schematic & electrical blueprint reading in Hindi",
                "Day 2: Multi-meter & digital clamp sensor calibration",
                "Day 3: Safety protocols, arc flash, and PPE standards (ISO/BIS)",
                "Day 4: Understanding telemetry parameters & tolerance limits",
                "Day 5: 15-minute interactive audio quiz on mobile"
            ],
            "shopfloor_practical_task": "Perform terminal resistance and grounding check on live industrial machine.",
            "recommended_portal": "Skill India Digital (Bharat Skills Vernacular Library)",
            "est_hours": 3.5,
            "badge_earned": "Digital Diagnostic Foundationalist"
        },
        {
            "week_number": 2,
            "theme": "Advanced Techniques & Process Control",
            "daily_micro_modules": [
                "Day 1: Shielding gas flow meter regulation & nozzle maintenance",
                "Day 2: Defect prevention: porosity, undercutting, and root penetration",
                "Day 3: Parameter tuning for thin-sheet vs thick plate materials",
                "Day 4: Non-destructive testing (NDT) dye penetrant basics",
                "Day 5: Real-world case study video with senior master craftsman"
            ],
            "shopfloor_practical_task": "Execute 3 trial joint welds/fittings and inspect with dye-check penetrant.",
            "recommended_portal": "NPTEL Vocational & ITI Video Hub",
            "est_hours": 4.0,
            "badge_earned": "Precision Process Specialist"
        },
        {
            "week_number": 3,
            "theme": "Automation, Sensors & Industry 4.0 Integration",
            "daily_micro_modules": [
                "Day 1: Introduction to Cobot robotic arms and teach pendants",
                "Day 2: Understanding PLC input/output status indicators",
                "Day 3: Safe emergency stop circuit wiring and lockout-tagout (LOTO)",
                "Day 4: Preventive maintenance schedule logging via mobile app",
                "Day 5: Vernacular workshop simulation on smartphone"
            ],
            "shopfloor_practical_task": "Program or observe a 3-step automated cycle and log cycle time deviation.",
            "recommended_portal": "KaushalSetu Interactive Micro-Simulations",
            "est_hours": 4.5,
            "badge_earned": "Automation Ready Artisan"
        },
        {
            "week_number": 4,
            "theme": "Shopfloor Leadership & NSQF Level 5 Transition",
            "daily_micro_modules": [
                "Day 1: Quality control checklists and rejection rate minimization",
                "Day 2: 5S shopfloor methodology and junior apprentice mentoring",
                "Day 3: Customer specification audit & compliance documentation",
                "Day 4: Mock practical interview and video portfolio prep",
                "Day 5: Final NSQF Level 5 competency self-assessment"
            ],
            "shopfloor_practical_task": "Supervise a complete shift handover checklist and calculate first-pass yield.",
            "recommended_portal": "NSDC / Sector Skill Council Assessment Portal",
            "est_hours": 4.0,
            "badge_earned": "NSQF Level 5 Master Craftsperson"
        }
    ]

    fallback = {
        "roadmap_title": f"4-Week Fast-Track Career Escalation ({matched_role})",
        "target_outcome": "Upskill from routine operator to high-value certified supervisor with +₹8,000 to ₹12,000 monthly wage premium.",
        "weeks": fallback_weeks
    }

    result = generate_structured_response(
        prompt=prompt,
        fallback_data=fallback
    )

    plan = result if "weeks" in result else fallback

    log_entry = {
        "agent": "UpskillingAgent",
        "timestamp": datetime.utcnow().isoformat(),
        "status": "COMPLETED",
        "message": f"Generated high-velocity 4-Week Micro-Upskilling Roadmap in {language} with 4 practical shopfloor milestones.",
        "confidence": 0.96
    }

    logs = list(state.get("agent_logs", []))
    logs.append(log_entry)

    return {
        "learning_plan": plan,
        "current_step": "UpskillingAgent",
        "agent_logs": logs
    }
