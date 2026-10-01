"""
KaushalSetu AI: Unified CLI Runner & Entry Point
Usage:
  python app.py api        # Runs FastAPI backend on port 8000
  python app.py streamlit  # Runs Streamlit dashboard on port 8501
  python app.py test       # Runs an automated end-to-end 8-agent test
"""

import sys
import os

# Add project root to sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))


def run_api():
    import uvicorn
    print("🚀 Starting KaushalSetu AI FastAPI Backend on http://0.0.0.0:8000 ...")
    uvicorn.run("backend.api:app", host="0.0.0.0", port=8000, reload=True)


def run_streamlit():
    import subprocess
    print("🎨 Starting KaushalSetu AI Streamlit Command Center...")
    dashboard_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "frontend", "dashboard.py")
    subprocess.run(["streamlit", "run", dashboard_path, "--server.port=8501", "--server.address=0.0.0.0"])


def run_test():
    from backend.graph import run_pipeline
    print("🔬 Running KaushalSetu 8-Agent LangGraph verification test...")
    sample_state = {
        "worker_name": "Ramesh Kumar",
        "location": "Peenya, Bengaluru, Karnataka",
        "preferred_language": "Hindi",
        "trade_description": "Mai pichhle 5 saal se MIG aur TIG welding kar raha hu. Heavy mild steel plates aur argon gas torch se joints banata hu.",
        "experience_years": 5.0,
        "uploaded_image": None,
        "phone_number": "+91 98450 12894",
        "agent_logs": []
    }
    result = run_pipeline(sample_state)
    print("\n✅ Verification Test Completed Successfully!")
    print(f"Candidate: {result['worker_name']}")
    print(f"Accredited Role: {result['nsqf_mapping']['matched_role']} (NSQF Level {result['nsqf_mapping']['nsqf_level']})")
    print(f"Employability Score: {result['employability_passport']['employability_score']}/100")
    print(f"Passport ID: {result['employability_passport']['passport_id']}")
    print(f"Top Matched MSME: {result['matched_jobs'][0]['company']}")
    print(f"Total Agents Completed: {len(result['agent_logs'])}")


if __name__ == "__main__":
    mode = sys.argv[1] if len(sys.argv) > 1 else "test"
    if mode == "api":
        run_api()
    elif mode == "streamlit":
        run_streamlit()
    elif mode == "test":
        run_test()
    else:
        print(f"Unknown mode: {mode}. Choose from 'api', 'streamlit', or 'test'.")
