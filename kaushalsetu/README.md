# 🇮🇳 KaushalSetu AI: Autonomous Employability Intelligence Platform

> **Bharat Workforce Command Center** powered by an 8-Agent LangGraph State Machine, Google Gemini 2.5 Flash / Vision, and NSQF Level 3–5 alignment for 400M+ skilled & semi-skilled artisans.

---

## 🏛️ System Architecture

```
                                  [ Worker Intake ]
                    (Vernacular Audio / Text + Vision Inspection)
                                          │
                                          ▼
                      ┌───────────────────────────────────────┐
                      │ 1. VernacularTradeAuditorAgent        │
                      └──────────────────┬────────────────────┘
                                         │
                                         ▼
                      ┌───────────────────────────────────────┐
                      │ 2. SkillGraphIntelligenceAgent        │
                      └──────────────────┬────────────────────┘
                                         │
                                         ▼
                      ┌───────────────────────────────────────┐
                      │ 3. NSQFAlignmentAgent (Levels 3–5)    │
                      └──────────────────┬────────────────────┘
                                         │
                                         ▼
                      ┌───────────────────────────────────────┐
                      │ 4. FutureSkillsGapAgent (EV/Solar/IoT)│
                      └──────────────────┬────────────────────┘
                                         │
                                         ▼
                      ┌───────────────────────────────────────┐
                      │ 5. UpskillingAgent (4-Week Roadmap)   │
                      └──────────────────┬────────────────────┘
                                         │
                                         ▼
                      ┌───────────────────────────────────────┐
                      │ 6. MSMEDemandIntelligenceAgent        │
                      └──────────────────┬────────────────────┘
                                         │
                                         ▼
                      ┌───────────────────────────────────────┐
                      │ 7. EmployabilityPassportAgent (Score) │
                      └──────────────────┬────────────────────┘
                                         │
                                         ▼
                      ┌───────────────────────────────────────┐
                      │ 8. ExecutionAgent (WhatsApp Outreach) │
                      └──────────────────┬────────────────────┘
                                         │
                                         ▼
                             [ Verified Digital Output ]
                   (Employability Passport + MSME Placement Dispatch)
```

---

## 📦 Project Structure

```
kaushalsetu/
│
├── app.py                      # Unified CLI launcher (API / Streamlit / Test)
├── backend/
│   ├── graph.py                # LangGraph StateGraph connecting all 8 nodes
│   ├── state.py                # TypedDict AgentState schema
│   ├── agents/
│   │   ├── auditor.py          # 1. VernacularTradeAuditorAgent
│   │   ├── skill_graph.py      # 2. SkillGraphIntelligenceAgent
│   │   ├── nsqf.py             # 3. NSQFAlignmentAgent
│   │   ├── gaps.py             # 4. FutureSkillsGapAgent
│   │   ├── upskilling.py       # 5. UpskillingAgent
│   │   ├── msme.py             # 6. MSMEDemandIntelligenceAgent
│   │   ├── passport.py         # 7. EmployabilityPassportAgent
│   │   └── execution.py        # 8. ExecutionAgent
│   ├── prompts/
│   │   └── agent_prompts.py    # Structured prompts for Gemini 2.5 Flash / Vision
│   ├── services/
│   │   ├── gemini_service.py   # Gemini API client with fallback resilience
│   │   └── db_service.py       # SQLite modular persistence (Postgres-ready)
│   └── api.py                  # FastAPI REST endpoints & Swagger docs
│
├── frontend/
│   └── dashboard.py            # Streamlit Command Center (4-panel industrial UI)
│
├── data/
│   ├── nsqf_roles.json         # Benchmark QP-NOS vocational standards
│   ├── msme_jobs.json          # Active industrial cluster vacancies
│   └── future_skills.json      # Frontier transition skills benchmarks
│
├── Dockerfile                  # Containerized deployment spec
├── requirements.txt            # Python dependencies
└── README.md                   # Complete architectural guide
```

---

## 🚀 Quickstart Guide

### 1. Prerequisites
- Python 3.10+ or Python 3.11
- (Optional) `GEMINI_API_KEY` for live multimodal inference

### 2. Installation
```bash
cd kaushalsetu
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Set Environment Variables
```bash
export GEMINI_API_KEY="your-gemini-api-key"
```

### 4. Run Automated 8-Agent Test
```bash
python app.py test
```

### 5. Launch FastAPI Backend
```bash
python app.py api
# Swagger documentation available at: http://localhost:8000/docs
```

### 6. Launch Streamlit Command Center
```bash
python app.py streamlit
# Dashboard opens automatically at: http://localhost:8501
```

---

## 🐳 Docker Deployment

```bash
# Build Docker image
docker build -t kaushalsetu-ai .

# Run FastAPI backend
docker run -p 8000:8000 -e GEMINI_API_KEY="your-key" kaushalsetu-ai

# Or run Streamlit directly
docker run -p 8501:8501 -e GEMINI_API_KEY="your-key" kaushalsetu-ai streamlit run frontend/dashboard.py --server.port=8501 --server.address=0.0.0.0
```

---

## 📡 API Specification

### `POST /api/evaluate`
Trigger the 8-agent LangGraph workflow.

**Request Payload:**
```json
{
  "worker_name": "Ramesh Kumar",
  "location": "Peenya, Bengaluru, Karnataka",
  "preferred_language": "Hindi",
  "trade_description": "Mai pichhle 5 saal se MIG aur TIG welding kar raha hu. Heavy mild steel plates aur argon gas torch se joints banata hu.",
  "experience_years": 5.0,
  "uploaded_image": "data:image/jpeg;base64,...",
  "phone_number": "+91 98450 12894"
}
```

**Response:**
Returns the complete `AgentState` containing:
- `verified_skills`: Extracted micro-competencies with proficiency & tools
- `skill_graph`: Directed knowledge graph nodes and synergy edges
- `nsqf_mapping`: QP code, NSQF level (3-5), salary band
- `future_skill_gaps`: EV / Automation / Solar transition gaps
- `learning_plan`: 4-Week shopfloor micro-curriculum
- `matched_jobs`: Cluster MSME openings with salary & recruiter contacts
- `employability_passport`: Verification hash, score (0-100), digital badge
- `outreach_payload`: Direct WhatsApp payload & 1-click dispatch link

---

## 🏆 Key Innovations
1. **Vernacular Multimodal Auditing**: Bridges informal dialect trade jargon (Hindi, Marathi, Tamil, etc.) with official NSQF qualification standards.
2. **Deterministic Fallback Engine**: Works offline in rugged industrial environments with zero failure rate.
3. **Instant WhatsApp MSME Dispatch**: Direct one-click recruiter connection without intermediate agency friction.
