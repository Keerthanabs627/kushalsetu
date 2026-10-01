"""
KaushalSetu AI: Professional Bharat Workforce Command Center UI
Streamlit-based industrial dashboard featuring:
- Left Panel: Worker Intake Form & Multimodal upload
- Center Panel: Live 8-Agent LangGraph Pipeline Status
- Right Panel: Digital Employability Passport, NSQF Readiness, Salary Band
- Bottom Panel: 4-Week Learning Roadmap, MSME Cluster Jobs, WhatsApp Outreach Dispatch
"""

import streamlit as st
import json
import base64
import requests
import os
import time

# Page Configuration
st.set_page_config(
    page_title="KaushalSetu AI | Bharat Workforce Command Center",
    page_icon="🇮🇳",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom Industrial Styling
st.markdown("""
<style>
    .main-header {
        background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
        padding: 24px;
        border-radius: 12px;
        border-left: 6px solid #F97316;
        color: white;
        margin-bottom: 24px;
    }
    .badge-tag {
        display: inline-block;
        padding: 4px 10px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        margin-right: 6px;
        background-color: #3B82F6;
        color: white;
    }
    .passport-box {
        background: linear-gradient(145deg, #1E1B4B 0%, #0F172A 100%);
        border: 2px solid #818CF8;
        border-radius: 16px;
        padding: 24px;
        color: white;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);
    }
    .stat-metric {
        font-size: 28px;
        font-weight: 800;
        color: #10B981;
    }
    .agent-pill {
        padding: 8px 14px;
        border-radius: 8px;
        margin-bottom: 8px;
        font-size: 13px;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .agent-pill-done {
        background-color: #064E3B;
        color: #A7F3D0;
        border: 1px solid #059669;
    }
</style>
""", unsafe_allow_html=True)

# Top Bar
st.markdown("""
<div class="main-header">
    <div style="display:flex; justify-content:space-between; align-items:center;">
        <div>
            <h1 style="margin:0; font-size:26px; font-weight:800; letter-spacing:-0.5px;">
                🇮🇳 KAUSHALSETU AI : BHARAT WORKFORCE COMMAND CENTER
            </h1>
            <p style="margin:4px 0 0 0; color:#94A3B8; font-size:14px;">
                Autonomous Employability Intelligence Platform • LangGraph 8-Agent Pipeline • NSQF Levels 3–5
            </p>
        </div>
        <div style="text-align:right;">
            <span class="badge-tag" style="background:#F97316;">MSDE / NSDC Aligned</span>
            <span class="badge-tag" style="background:#10B981;">Gemini 2.5 Flash</span>
        </div>
    </div>
</div>
""", unsafe_allow_html=True)

# Session State Initialization
if "pipeline_result" not in st.session_state:
    st.session_state.pipeline_result = None

# Backend URL
API_URL = os.getenv("API_URL", "http://localhost:8000")

# Main 3-Column Layout: Left (Intake), Center (Pipeline), Right (Passport)
col_left, col_center, col_right = st.columns([1.1, 1.2, 1.1], gap="medium")

# ==========================================
# LEFT PANEL: WORKER INTAKE FORM
# ==========================================
with col_left:
    st.subheader("📋 1. Worker Intake Form")
    st.caption("Multimodal vernacular profile capture for unorganized artisans")

    # Quick presets
    preset = st.selectbox(
        "⚡ Load Sample Artisan Profile",
        [
            "Ramesh Kumar (MIG/TIG Welder - Peenya, BLR)",
            "Sunita Devi (Solar PV Technician - Okhla, DEL)",
            "Rajesh Verma (EV Wire Harness & Diagnostics - Pune)",
            "Custom Profile"
        ]
    )

    if preset.startswith("Ramesh"):
        default_name = "Ramesh Kumar"
        default_loc = "Peenya Industrial Area, Bengaluru, Karnataka"
        default_lang = "Hindi"
        default_desc = "Mai pichhle 5 saal se MIG aur TIG welding kar raha hu. Heavy mild steel plates aur argon gas torch se joints banata hu. Blueprint dekh ke joint fit karta hu aur safety helmet use karta hu."
        default_exp = 5.0
    elif preset.startswith("Sunita"):
        default_name = "Sunita Devi"
        default_loc = "Okhla Industrial Area, New Delhi"
        default_lang = "Hindi"
        default_desc = "Main rooftop solar panels installation aur inverter wiring karti hu. 5kW se 20kW ke string inverters connect karti hu, MC4 connectors aur DC earth pit check karti hu."
        default_exp = 4.0
    elif preset.startswith("Rajesh"):
        default_name = "Rajesh Verma"
        default_loc = "Bhosari MIDC, Pune, Maharashtra"
        default_lang = "Marathi"
        default_desc = "Maza 6 varshancha auto electrician anubhav aahe. Aata EV battery packs, BMS wiring aani 48V/72V BLDC motor controller wiring karun fault diagnosis karto."
        default_exp = 6.0
    else:
        default_name = ""
        default_loc = ""
        default_lang = "Hindi"
        default_desc = ""
        default_exp = 3.0

    worker_name = st.text_input("Full Name", value=default_name)
    col_l1, col_l2 = st.columns(2)
    with col_l1:
        location = st.text_input("Industrial Hub / City", value=default_loc)
    with col_l2:
        language = st.selectbox("Preferred Language", ["Hindi", "Marathi", "Tamil", "Telugu", "Kannada", "Bengali", "English"], index=0)

    experience_years = st.slider("Years of Hands-on Experience", 0.5, 20.0, float(default_exp), 0.5)

    trade_description = st.text_area(
        "Vernacular Trade Description (Voice / Text)",
        value=default_desc,
        height=110,
        help="Artisan explains in their own language the tools used, parts welded/wired, and procedures followed."
    )

    uploaded_file = st.file_uploader("📷 Tool / Workpiece Photo (Vision Audit)", type=["jpg", "jpeg", "png"])
    image_b64 = None
    if uploaded_file:
        raw_bytes = uploaded_file.read()
        image_b64 = "data:image/jpeg;base64," + base64.b64encode(raw_bytes).decode("utf-8")
        st.image(raw_bytes, caption="Uploaded Evidence for Gemini Vision Audit", use_container_width=True)

    start_eval = st.button("🚀 Trigger Autonomous Intelligence Pipeline", type="primary", use_container_width=True)

    if start_eval:
        if not worker_name or not trade_description:
            st.error("Please provide candidate name and trade narrative.")
        else:
            with st.spinner("Executing LangGraph 8-Agent Sequence..."):
                payload = {
                    "worker_name": worker_name,
                    "location": location,
                    "preferred_language": language,
                    "trade_description": trade_description,
                    "experience_years": experience_years,
                    "uploaded_image": image_b64
                }
                try:
                    # Attempt backend call, fallback to direct execution if standalone
                    res = requests.post(f"{API_URL}/api/evaluate", json=payload, timeout=60)
                    if res.status_code == 200:
                        st.session_state.pipeline_result = res.json()["pipeline_state"]
                        st.success("Pipeline executed successfully!")
                    else:
                        raise Exception(res.text)
                except Exception as e:
                    # Run direct local pipeline fallback
                    from kaushalsetu.backend.graph import run_pipeline
                    initial_state = dict(payload)
                    initial_state["agent_logs"] = []
                    result_state = run_pipeline(initial_state)
                    st.session_state.pipeline_result = result_state
                    st.success("Pipeline processed via internal LangGraph engine!")


# ==========================================
# CENTER PANEL: LIVE AGENT PIPELINE TRACKING
# ==========================================
with col_center:
    st.subheader("⚙️ 2. Live Agent Pipeline")
    st.caption("Real-time telemetry of the 8 LangGraph nodes")

    agents_list = [
        ("1. VernacularTradeAuditorAgent", "Multimodal trade audit & tools extraction"),
        ("2. SkillGraphIntelligenceAgent", "Directed competency knowledge graph"),
        ("3. NSQFAlignmentAgent", "National Occupational Standards (Level 3-5)"),
        ("4. FutureSkillsGapAgent", "High-yield Industry 4.0 wage gap analysis"),
        ("5. UpskillingAgent", "4-Week practical shopfloor micro-curriculum"),
        ("6. MSMEDemandIntelligenceAgent", "MSME cluster vacancy & wage radar"),
        ("7. EmployabilityPassportAgent", "Cryptographic Employability Score minting"),
        ("8. ExecutionAgent", "Dual-language WhatsApp recruiter payload")
    ]

    has_data = st.session_state.pipeline_result is not None
    logs = st.session_state.pipeline_result.get("agent_logs", []) if has_data else []

    for idx, (agent_name, desc) in enumerate(agents_list):
        is_done = has_data and idx < len(logs)
        status_icon = "✅" if is_done else "⏳"
        bg_color = "#064E3B" if is_done else "#1E293B"
        border_color = "#059669" if is_done else "#334155"
        text_color = "#D1FAE5" if is_done else "#94A3B8"

        st.markdown(f"""
        <div style="background:{bg_color}; border:1px solid {border_color}; border-radius:8px; padding:10px 14px; margin-bottom:8px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-weight:700; color:{text_color}; font-size:13px;">{status_icon} {agent_name}</span>
                <span style="font-size:11px; background:#0F172A; padding:2px 8px; border-radius:4px; color:#38BDF8;">Node {idx+1}/8</span>
            </div>
            <div style="font-size:11px; color:#CBD5E1; margin-top:3px;">{desc}</div>
        </div>
        """, unsafe_allow_html=True)

    if has_data:
        st.markdown("##### 🔬 Verified Micro-Competencies")
        skills = st.session_state.pipeline_result.get("verified_skills", [])
        for s in skills[:3]:
            conf = int(s.get("confidence_score", 0.9) * 100)
            st.markdown(f"- **{s.get('skill_name')}** ({s.get('proficiency')}) • `{conf}% confidence`")


# ==========================================
# RIGHT PANEL: EMPLOYABILITY PASSPORT CARD
# ==========================================
with col_right:
    st.subheader("🛡️ 3. Employability Passport Card")
    st.caption("Cryptographically accredited Bharat artisan credential")

    if has_data:
        passport = st.session_state.pipeline_result.get("employability_passport", {})
        nsqf = st.session_state.pipeline_result.get("nsqf_mapping", {})
        score = passport.get("employability_score", 88.0)

        st.markdown(f"""
        <div class="passport-box">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                <div>
                    <div style="font-size:10px; color:#F59E0B; font-weight:800; letter-spacing:1px;">GOVT OF BHARAT • MSDE ALIGNED</div>
                    <div style="font-size:18px; font-weight:800; color:#FFFFFF; margin-top:4px;">{passport.get('worker_name', worker_name)}</div>
                    <div style="font-size:12px; color:#93C5FD;">{passport.get('primary_trade')}</div>
                </div>
                <div style="text-align:right;">
                    <div style="background:#059669; color:white; padding:3px 8px; border-radius:6px; font-size:11px; font-weight:800;">
                        NSQF LEVEL {passport.get('nsqf_level', 4)}
                    </div>
                </div>
            </div>
            <hr style="border-color:#312E81; margin:14px 0;">
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                <div>
                    <div style="font-size:10px; color:#94A3B8; text-transform:uppercase;">Employability Score</div>
                    <div class="stat-metric">{score}<span style="font-size:16px; color:#6EE7B7;">/100</span></div>
                </div>
                <div>
                    <div style="font-size:10px; color:#94A3B8; text-transform:uppercase;">Expected Salary</div>
                    <div style="font-size:16px; font-weight:700; color:#FBBF24; margin-top:6px;">{passport.get('expected_salary_band', '₹26k - ₹38k/mo')}</div>
                </div>
            </div>
            <div style="margin-top:14px; background:#0F172A; padding:8px 12px; border-radius:6px; font-size:11px; color:#94A3B8; font-family:monospace;">
                HASH: {passport.get('verification_hash', '0x9F4B23A8C')}
            </div>
            <div style="margin-top:10px; font-size:10px; color:#A5B4FC; text-align:center;">
                ✅ DigiLocker Ready • QR Code Verified • Active Status
            </div>
        </div>
        """, unsafe_allow_html=True)
    else:
        st.info("Submit an artisan profile on the left to mint their Employability Passport.")


# ==========================================
# BOTTOM PANEL: ROADMAP, MSME & OUTREACH
# ==========================================
st.markdown("---")
st.subheader("📊 4. Downstream Autonomous Execution")

tab_roadmap, tab_jobs, tab_outreach = st.tabs([
    "🗓️ 4-Week Micro-Upskilling Roadmap",
    "🏢 Local MSME Job Radar",
    "📲 WhatsApp Outreach Payload"
])

with tab_roadmap:
    if has_data:
        plan = st.session_state.pipeline_result.get("learning_plan", {})
        st.markdown(f"**{plan.get('roadmap_title', 'Career Escalation')}**")
        st.caption(plan.get("target_outcome", ""))
        cols = st.columns(4)
        for idx, week in enumerate(plan.get("weeks", [])):
            with cols[idx % 4]:
                st.markdown(f"""
                <div style="background:#1E293B; border:1px solid #475569; border-radius:8px; padding:12px; height:100%;">
                    <div style="font-size:11px; color:#F97316; font-weight:800;">WEEK {week.get('week_number')}</div>
                    <div style="font-size:13px; font-weight:700; margin:4px 0 8px 0; color:#F8FAFC;">{week.get('theme')}</div>
                    <div style="font-size:11px; color:#94A3B8; margin-bottom:8px;">🎯 {week.get('shopfloor_practical_task')}</div>
                    <div style="background:#0F172A; padding:4px 6px; border-radius:4px; font-size:10px; color:#38BDF8;">🏅 {week.get('badge_earned')}</div>
                </div>
                """, unsafe_allow_html=True)
    else:
        st.write("Awaiting pipeline execution to generate customized learning roadmap.")

with tab_jobs:
    if has_data:
        jobs = st.session_state.pipeline_result.get("matched_jobs", [])
        for j in jobs:
            st.markdown(f"""
            <div style="background:#1E293B; border-left:4px solid #10B981; padding:14px; border-radius:6px; margin-bottom:10px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <div>
                        <strong style="color:#F8FAFC; font-size:15px;">{j.get('role')}</strong> • <span style="color:#94A3B8;">{j.get('company')}</span>
                        <div style="font-size:12px; color:#64748B;">📍 {j.get('cluster')}, {j.get('city')} • 💰 {j.get('salary_range')}</div>
                    </div>
                    <div style="text-align:right;">
                        <span style="background:#064E3B; color:#A7F3D0; font-size:12px; font-weight:700; padding:4px 10px; border-radius:12px;">
                            {j.get('match_score', 90)}% Match
                        </span>
                    </div>
                </div>
            </div>
            """, unsafe_allow_html=True)
    else:
        st.write("Matched jobs will appear here upon evaluation.")

with tab_outreach:
    if has_data:
        outreach = st.session_state.pipeline_result.get("outreach_payload", {})
        col_o1, col_o2 = st.columns(2)
        with col_o1:
            st.markdown("##### 🇮🇳 Vernacular WhatsApp Payload")
            st.code(outreach.get("whatsapp_message_vernacular", ""), language="markdown")
        with col_o2:
            st.markdown("##### 🇬🇧 English Recruiter Format")
            st.code(outreach.get("whatsapp_message_english", ""), language="markdown")

        direct_link = outreach.get("direct_whatsapp_url", "https://whatsapp.com")
        st.markdown(f"""
        <div style="text-align:center; margin-top:16px;">
            <a href="{direct_link}" target="_blank" style="background:#25D366; color:white; padding:12px 28px; border-radius:8px; text-decoration:none; font-weight:700; font-size:15px; display:inline-block;">
                📲 Dispatch Instantly to MSME Recruiter on WhatsApp
            </a>
        </div>
        """, unsafe_allow_html=True)
    else:
        st.write("WhatsApp dispatch payload ready to be generated.")
