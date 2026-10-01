"""
KaushalSetu AI: Database Service
Modular SQLite storage for MVP with clean abstraction layer designed for PostgreSQL migration.
Stores evaluated artisans, verified skills, NSQF passports, and job matches.
"""

import sqlite3
import json
import os
from typing import Dict, Any, List, Optional
from datetime import datetime

DB_FILE = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "kaushalsetu.db")


def get_db_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()

    # Workers Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS workers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        worker_id TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        location TEXT NOT NULL,
        preferred_language TEXT NOT NULL,
        trade_description TEXT NOT NULL,
        experience_years REAL DEFAULT 0,
        phone_number TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    # Evaluations Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS evaluations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        worker_id TEXT NOT NULL,
        nsqf_level INTEGER,
        matched_role TEXT,
        readiness_score REAL,
        verified_skills_json TEXT,
        skill_graph_json TEXT,
        future_gaps_json TEXT,
        learning_plan_json TEXT,
        matched_jobs_json TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (worker_id) REFERENCES workers(worker_id)
    );
    """)

    # Employability Passports Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS passports (
        passport_id TEXT PRIMARY KEY,
        worker_id TEXT NOT NULL,
        worker_name TEXT NOT NULL,
        nsqf_level INTEGER NOT NULL,
        primary_trade TEXT NOT NULL,
        employability_score REAL NOT NULL,
        salary_band TEXT NOT NULL,
        verification_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (worker_id) REFERENCES workers(worker_id)
    );
    """)

    conn.commit()
    conn.close()


def save_evaluation_record(worker_id: str, state: Dict[str, Any]) -> str:
    init_db()
    conn = get_db_connection()
    cursor = conn.cursor()

    # Upsert worker
    cursor.execute("""
    INSERT OR REPLACE INTO workers (worker_id, name, location, preferred_language, trade_description, phone_number)
    VALUES (?, ?, ?, ?, ?, ?)
    """, (
        worker_id,
        state.get("worker_name", "Artisan"),
        state.get("location", "India"),
        state.get("preferred_language", "Hindi"),
        state.get("trade_description", ""),
        state.get("phone_number", "+91 9876543210")
    ))

    nsqf_mapping = state.get("nsqf_mapping", {})
    passport = state.get("employability_passport", {})

    # Save evaluation
    cursor.execute("""
    INSERT INTO evaluations (
        worker_id, nsqf_level, matched_role, readiness_score,
        verified_skills_json, skill_graph_json, future_gaps_json,
        learning_plan_json, matched_jobs_json
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        worker_id,
        nsqf_mapping.get("nsqf_level", 4),
        nsqf_mapping.get("matched_role", "Skilled Technician"),
        nsqf_mapping.get("readiness_percentage", 85.0),
        json.dumps(state.get("verified_skills", [])),
        json.dumps(state.get("skill_graph", {})),
        json.dumps(state.get("future_skill_gaps", [])),
        json.dumps(state.get("learning_plan", {})),
        json.dumps(state.get("matched_jobs", []))
    ))

    passport_id = passport.get("passport_id", f"KS-PASSPORT-{worker_id[:8]}")
    cursor.execute("""
    INSERT OR REPLACE INTO passports (
        passport_id, worker_id, worker_name, nsqf_level, primary_trade,
        employability_score, salary_band, verification_hash
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        passport_id,
        worker_id,
        state.get("worker_name", "Artisan"),
        nsqf_mapping.get("nsqf_level", 4),
        nsqf_mapping.get("matched_role", "Skilled Technician"),
        passport.get("employability_score", 88.0),
        nsqf_mapping.get("expected_salary_band", "₹25,000 - ₹35,000 / month"),
        passport.get("verification_hash", "0x9f4b7a12cd")
    ))

    conn.commit()
    conn.close()
    return passport_id


def get_all_workers() -> List[Dict[str, Any]]:
    init_db()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM workers ORDER BY created_at DESC")
    rows = cursor.fetchall()
    result = [dict(r) for r in rows]
    conn.close()
    return result


def get_passport_by_id(passport_id: str) -> Optional[Dict[str, Any]]:
    init_db()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM passports WHERE passport_id = ?", (passport_id,))
    row = cursor.fetchone()
    conn.close()
    return dict(row) if row else None
