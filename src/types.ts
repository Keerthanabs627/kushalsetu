export interface VerifiedSkill {
  skill_name: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Master';
  confidence_score: number;
  evidence: string;
  tools_identified: string[];
  evidence_source?: string;
}

export interface GraphNode {
  id: string;
  label: string;
  category: 'core_trade' | 'primary' | 'secondary' | 'tool';
  weight: number;
  proficiency?: string;
}

export interface GraphEdge {
  source: string;
  target: string;
  relationship: string;
  strength: number;
}

export interface SkillGraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
  competency_index: number;
  strongest_cluster: string;
}

export interface NSQFMapping {
  matched_role: string;
  qp_code: string;
  sector: string;
  nsqf_level: number;
  readiness_percentage: number;
  justification: string;
  gaps_for_next_level: string[];
  next_target_role: string;
  expected_salary_band: string;
  current_base_salary: number;
  nsqf_certified_salary: number;
  future_specialized_salary: number;
  statutory_citation?: string;
}

export interface FutureSkillGap {
  gap_name: string;
  trend_category: string;
  market_demand_urgency: 'Critical' | 'High' | 'Medium';
  potential_wage_boost_percentage: number;
  nsqf_impact: string;
}

export interface LearningWeek {
  week_number: number;
  theme: string;
  daily_micro_modules: string[];
  shopfloor_practical_task: string;
  recommended_portal: string;
  est_hours: number;
  badge_earned: string;
}

export interface LearningPlan {
  roadmap_title: string;
  target_outcome: string;
  weeks: LearningWeek[];
}

export interface MSMEJob {
  id: string;
  company: string;
  cluster: string;
  city: string;
  state: string;
  role: string;
  nsqf_required: number;
  salary_range: string;
  salary_numeric: number;
  vacancies: number;
  contact_person: string;
  contact_whatsapp: string;
  key_requirements: string[];
  benefits: string[];
  match_score: number;
  demand_level: 'Critical' | 'Surge' | 'High';
  interview_probability: 'Very High' | 'High' | 'High Match Potential';
  dataset_source?: string;
}

export interface EmployabilityPassport {
  passport_id: string;
  worker_name: string;
  location: string;
  preferred_language: string;
  primary_trade: string;
  qp_code: string;
  sector: string;
  nsqf_level: number;
  employability_score: number;
  score_grade: string;
  expected_salary_band: string;
  verified_skills_count: number;
  verified_skills_summary: string[];
  verification_hash: string;
  issued_by: string;
  issue_date: string;
  status: string;
  digilocker_compatible: boolean;
  employment_probability: number;
  future_skills_readiness: number;
  career_path_trajectory: string;
  market_demand_score: 'High' | 'Very High' | 'Critical Demand';
  placement_status: 'Prioritized for MSME Matching' | 'Placement Ready' | 'Interview Scheduled' | 'Direct Fast-Track';
}

export interface OutreachPayload {
  whatsapp_message_vernacular: string;
  whatsapp_message_english: string;
  direct_whatsapp_url: string;
  shareable_url: string;
  action_buttons: { label: string; type: string }[];
  dispatch_status: string;
  generated_at: string;
  target_employers_count: number;
  expected_response_window: string;
  timeline_steps: { step: string; time: string; status: 'DONE' | 'CURRENT' | 'PENDING' }[];
  is_valid_link: boolean;
}

export interface AgentLog {
  agent: string;
  timestamp: string;
  status: 'RUNNING' | 'COMPLETED' | 'ERROR';
  message: string;
  confidence: number;
  execution_ms?: number;
  reasoning_summary?: string;
  evidence_used?: string;
  detected_skills?: string[];
  decision_rationale?: string;
  tokens_used_estimate?: number;
  state_inputs_summary?: string;
  state_outputs_summary?: string;
}

export interface BharatImpactMetrics {
  employment_probability: number;
  income_growth_potential: number;
  time_to_employment_reduction: number;
  skill_gap_closure_rate: number;
  msme_match_rate: number;
  workforce_readiness_index: number;
}

export interface VisionAuditResult {
  is_trade_related: boolean;
  non_trade_detected?: string | null;
  detected_objects: string[];
  detected_tools: string[];
  detected_ppe: string[];
  workspace_context: string;
  vision_confidence: number;
  visual_inspection_notes: string;
  audit_timestamp: string;
}

export interface ScoringFormulaBreakdown {
  skill_points: number; // Max 40
  skill_raw_pct: number;
  nsqf_points: number; // Max 35
  nsqf_raw_pct: number;
  vision_points: number; // Max 15 (0 if non-trade or absent)
  vision_raw_pct: number;
  vision_verified: boolean;
  demand_points: number; // Max 10
  demand_raw_pct: number;
  total_score: number;
  formula_string: string;
}

export interface AgentState {
  worker_name: string;
  location: string;
  preferred_language: string;
  trade_description: string;
  uploaded_image?: string | null;
  experience_years?: number;
  phone_number?: string;
  verified_skills?: VerifiedSkill[];
  skill_graph?: SkillGraph;
  nsqf_mapping?: NSQFMapping;
  future_skill_gaps?: FutureSkillGap[];
  learning_plan?: LearningPlan;
  matched_jobs?: MSMEJob[];
  employability_passport?: EmployabilityPassport;
  outreach_payload?: OutreachPayload;
  agent_logs: AgentLog[];
  current_step?: string;
  pipeline_status: string;
  impact_metrics?: BharatImpactMetrics;
  is_real_ai?: boolean;
  ai_model?: string;
  vision_analyzed?: boolean;
  total_execution_ms?: number;
  vision_audit?: VisionAuditResult;
  scoring_formula?: ScoringFormulaBreakdown;
  visual_inspection_notes?: string;
}
