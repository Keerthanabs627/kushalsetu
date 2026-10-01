import React, { useState } from 'react';
import { LearningPlan, MSMEJob, OutreachPayload, FutureSkillGap, SkillGraph } from '../types';
import {
  BookOpen,
  Building2,
  Send,
  Zap,
  CheckCircle,
  ExternalLink,
  Copy,
  Clock,
  MapPin,
  TrendingUp,
  Phone,
  Layers,
  Sparkles,
  AlertCircle,
  Calendar,
  Users
} from 'lucide-react';

interface BottomPanelProps {
  learningPlan: LearningPlan | null;
  futureGaps: FutureSkillGap[] | null;
  matchedJobs: MSMEJob[] | null;
  outreachPayload: OutreachPayload | null;
  skillGraph: SkillGraph | null;
}

export const BottomPanel: React.FC<BottomPanelProps> = ({
  learningPlan,
  futureGaps,
  matchedJobs,
  outreachPayload,
  skillGraph
}) => {
  const [activeTab, setActiveTab] = useState<'roadmap' | 'jobs' | 'outreach' | 'graph'>('jobs');
  const [copiedLang, setCopiedLang] = useState<'vernacular' | 'english' | null>(null);

  const handleCopy = (text: string, type: 'vernacular' | 'english') => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedLang(type);
      setTimeout(() => setCopiedLang(null), 2000);
    }
  };

  const hasData = Boolean(learningPlan || matchedJobs || outreachPayload);

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl backdrop-blur-sm">
      {/* Tabs Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-800 flex-wrap">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'jobs'
                ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>MSME Job Radar</span>
            {matchedJobs && (
              <span className="text-[10px] bg-slate-900 text-emerald-300 px-1.5 py-0.2 rounded-full font-mono">
                {matchedJobs.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('outreach')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'outreach'
                ? 'bg-indigo-500 text-white shadow-sm shadow-indigo-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>WhatsApp Outreach</span>
            <span className="text-[10px] bg-slate-900 text-indigo-300 px-1.5 py-0.2 rounded-full font-mono">
              Ready
            </span>
          </button>

          <button
            onClick={() => setActiveTab('roadmap')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'roadmap'
                ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>4-Week Future Skills Roadmap</span>
          </button>

          <button
            onClick={() => setActiveTab('graph')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'graph'
                ? 'bg-purple-500 text-white shadow-sm shadow-purple-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Competency Graph</span>
          </button>
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Verified MSME Requisitions Live</span>
        </div>
      </div>

      {/* Tab Contents */}
      <div className="pt-4">
        {!hasData ? (
          <div className="py-12 text-center text-slate-500 text-xs">
            Awaiting pipeline execution to populate downstream learning pathways and MSME matches...
          </div>
        ) : (
          <>
            {/* TAB 1: UPGRADED MSME JOB RADAR (Priority 6) */}
            {activeTab === 'jobs' && matchedJobs && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-800/40 p-3 rounded-xl border border-slate-800 gap-2">
                  <div>
                    <h3 className="font-bold text-sm text-white flex items-center gap-2">
                      <span>MSME Cluster Opportunity Radar</span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                        {matchedJobs.length} Live Openings
                      </span>
                    </h3>
                    <p className="text-xs text-slate-300">
                      Matched directly from Chakan, Peenya, Okhla, Ambattur, and Manesar auto/industrial corridors.
                    </p>
                  </div>
                  <div className="text-xs text-slate-400">
                    Direct Contact • Zero Middleman Deduction
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {matchedJobs.map((job) => {
                    const demandBadge =
                      job.demand_level === 'Critical'
                        ? 'bg-rose-500/15 border-rose-500/40 text-rose-300'
                        : job.demand_level === 'Surge'
                        ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                        : 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300';

                    const probBadge =
                      job.interview_probability === 'Very High' || job.interview_probability === 'Guaranteed Shortlist'
                        ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-300'
                        : 'bg-sky-950/70 border-sky-500/50 text-sky-300';

                    return (
                      <div
                        key={job.id}
                        className="bg-slate-800/70 rounded-xl border border-slate-700/80 p-4 flex flex-col justify-between hover:border-emerald-500/60 hover:bg-slate-800 transition-all shadow-md group"
                      >
                        <div>
                          {/* Top Row: Company & Match % */}
                          <div className="flex justify-between items-start gap-2 mb-2">
                            <div>
                              <div className="font-black text-sm text-white group-hover:text-emerald-300 transition-colors">
                                {job.company}
                              </div>
                              <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                                <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
                                <span>{job.cluster}, {job.city}</span>
                              </div>
                            </div>
                            <span className="text-xs font-black text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30 shrink-0 font-mono">
                              {job.match_score}% Match
                            </span>
                          </div>

                          {/* Role */}
                          <div className="font-bold text-xs text-indigo-300 mb-2">
                            {job.role}
                          </div>

                          {/* Priority 6 Core Badges: Salary, Demand Level, Interview Probability */}
                          <div className="grid grid-cols-2 gap-2 my-2.5 text-[10px]">
                            {/* Salary */}
                            <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                              <span className="text-slate-400 block font-medium">Monthly Package</span>
                              <span className="text-xs font-black text-amber-300 font-mono block mt-0.5">
                                {job.salary_range.split('/')[0]}
                              </span>
                            </div>

                            {/* Interview Probability */}
                            <div className={`p-2 rounded-lg border ${probBadge}`}>
                              <span className="text-slate-400 block font-medium">Interview Prob.</span>
                              <span className="text-xs font-black block mt-0.5">
                                {job.interview_probability}
                              </span>
                            </div>
                          </div>

                          {/* Demand Level & Vacancies Pill */}
                          <div className="flex items-center justify-between text-[10px] mb-2.5">
                            <span className={`px-2 py-0.5 rounded border font-bold ${demandBadge}`}>
                              Demand: {job.demand_level}
                            </span>
                            <span className="text-slate-400 font-medium">
                              🔥 {job.vacancies} Vacancies Active
                            </span>
                          </div>

                          {/* Key Perks */}
                          <div className="flex flex-wrap gap-1 mb-3">
                            {job.benefits.slice(0, 3).map((b, i) => (
                              <span key={i} className="text-[9px] bg-slate-900/90 text-slate-300 px-1.5 py-0.5 rounded border border-slate-800">
                                {b}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Recruiter Action Bar */}
                        <div className="pt-2.5 border-t border-slate-800 flex items-center justify-between text-xs">
                          <div className="text-[10px] text-slate-400 truncate max-w-[120px]">
                            Lead: <span className="text-slate-200">{job.contact_person.split('(')[0]}</span>
                          </div>
                          <a
                            href={`https://api.whatsapp.com/send?phone=${job.contact_whatsapp.replace(/[^0-9]/g, '')}&text=Hello%20${encodeURIComponent(job.contact_person)},%20I%20am%20applying%20for%20the%20${encodeURIComponent(job.role)}%20position%20with%20my%20KaushalSetu%20verified%20passport.`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 rounded-lg shadow-sm transition-all active:scale-95"
                          >
                            <Phone className="w-3 h-3" />
                            <span>WhatsApp HR</span>
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: UPGRADED WHATSAPP OUTREACH TAB (Priority 7) */}
            {activeTab === 'outreach' && outreachPayload && (
              <div className="space-y-4">
                {/* Priority 7 Header Metric Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight block">
                      Dispatch Status
                    </span>
                    <span className="text-sm font-black text-emerald-400 flex items-center gap-1.5 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>{outreachPayload.dispatch_status}</span>
                    </span>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight block">
                      Target Employers
                    </span>
                    <span className="text-sm font-black text-indigo-300 flex items-center gap-1.5 mt-0.5">
                      <Users className="w-4 h-4 text-indigo-400" />
                      <span>{outreachPayload.target_employers_count || 5} MSME Hiring Leads</span>
                    </span>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight block">
                      Payload Format
                    </span>
                    <span className="text-sm font-black text-amber-300 flex items-center gap-1.5 mt-0.5">
                      <Send className="w-4 h-4 text-amber-400" />
                      <span>Bilingual WhatsApp + QR</span>
                    </span>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight block">
                      Expected Response
                    </span>
                    <span className="text-sm font-black text-sky-400 flex items-center gap-1.5 mt-0.5">
                      <Clock className="w-4 h-4 text-sky-400" />
                      <span>{outreachPayload.expected_response_window || '24–48 Hours'}</span>
                    </span>
                  </div>
                </div>

                {/* Priority 7: Outreach Timeline Steps */}
                <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                  <div className="text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Outreach & Placement Execution Timeline</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-[10px]">
                    {outreachPayload.timeline_steps?.map((step, sIdx) => {
                      const isDone = step.status === 'DONE';
                      const isCurrent = step.status === 'CURRENT';
                      return (
                        <div
                          key={sIdx}
                          className={`p-2 rounded-lg border ${
                            isCurrent
                              ? 'bg-indigo-950/50 border-indigo-500/70 text-indigo-200'
                              : isDone
                              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                              : 'bg-slate-900/60 border-slate-800 text-slate-500'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1 font-mono font-bold">
                            <span>Step {sIdx + 1}</span>
                            <span>{step.time}</span>
                          </div>
                          <div className="font-semibold leading-tight">{step.step}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bilingual Generated Message Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Vernacular Message */}
                  <div className="bg-slate-950 rounded-xl border border-slate-800 p-3.5 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-amber-400">🇮🇳 Vernacular Format (Hindi / Regional)</span>
                        <button
                          onClick={() => handleCopy(outreachPayload.whatsapp_message_vernacular, 'vernacular')}
                          className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-white bg-slate-800 px-2 py-0.5 rounded transition-colors"
                        >
                          {copiedLang === 'vernacular' ? <CheckCircle className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedLang === 'vernacular' ? 'Copied!' : 'Copy'}</span>
                        </button>
                      </div>
                      <pre className="text-[11px] font-sans text-slate-200 bg-slate-900/80 p-3 rounded-lg border border-slate-800/80 whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto">
                        {outreachPayload.whatsapp_message_vernacular}
                      </pre>
                    </div>
                    <div className="mt-2 text-[10px] text-slate-500 flex justify-between items-center">
                      <span>Dispatched with verified DigiLocker QR signature link.</span>
                      <a
                        href={outreachPayload.direct_whatsapp_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-400 hover:underline font-bold text-[11px]"
                      >
                        Send via WhatsApp →
                      </a>
                    </div>
                  </div>

                  {/* English Format */}
                  <div className="bg-slate-950 rounded-xl border border-slate-800 p-3.5 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-sky-400">🇬🇧 English Recruiter Format</span>
                        <button
                          onClick={() => handleCopy(outreachPayload.whatsapp_message_english, 'english')}
                          className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-white bg-slate-800 px-2 py-0.5 rounded transition-colors"
                        >
                          {copiedLang === 'english' ? <CheckCircle className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedLang === 'english' ? 'Copied!' : 'Copy'}</span>
                        </button>
                      </div>
                      <pre className="text-[11px] font-sans text-slate-200 bg-slate-900/80 p-3 rounded-lg border border-slate-800/80 whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto">
                        {outreachPayload.whatsapp_message_english}
                      </pre>
                    </div>
                    <div className="mt-2 text-[10px] text-slate-500 flex justify-between items-center">
                      <span>Standard corporate format for HR, vendors, and industrial parks.</span>
                      <a
                        href={outreachPayload.direct_whatsapp_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sky-400 hover:underline font-bold text-[11px]"
                      >
                        Send to Recruiter →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: 4-WEEK UPSKILLING ROADMAP */}
            {activeTab === 'roadmap' && learningPlan && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-800/40 p-3 rounded-xl border border-slate-800 gap-2">
                  <div>
                    <h3 className="font-bold text-sm text-white">{learningPlan.roadmap_title}</h3>
                    <p className="text-xs text-emerald-400">{learningPlan.target_outcome}</p>
                  </div>
                  {futureGaps && futureGaps.length > 0 && (
                    <div className="flex items-center gap-1.5 bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded-lg text-purple-300 text-xs font-semibold">
                      <Zap className="w-3.5 h-3.5 text-purple-400" />
                      <span>Wage Multiplier Target: +{futureGaps[0].potential_wage_boost_percentage}%</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {learningPlan.weeks.map((week) => (
                    <div
                      key={week.week_number}
                      className="bg-slate-800/50 rounded-xl border border-slate-700/60 p-3.5 flex flex-col justify-between hover:border-slate-600 transition-colors"
                    >
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] font-black uppercase tracking-wider text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                            WEEK {week.week_number}
                          </span>
                          <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                            <Clock className="w-3 h-3 text-slate-400" /> {week.est_hours} hrs
                          </span>
                        </div>

                        <h4 className="font-bold text-xs text-white mb-2 leading-snug">
                          {week.theme}
                        </h4>

                        <div className="space-y-1 mb-3">
                          {week.daily_micro_modules.slice(0, 3).map((mod, i) => (
                            <div key={i} className="text-[11px] text-slate-300 flex items-start gap-1.5 leading-tight">
                              <span className="text-indigo-400 mt-0.5">•</span>
                              <span className="line-clamp-1">{mod}</span>
                            </div>
                          ))}
                        </div>

                        <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800 text-[10px] mb-2">
                          <span className="font-bold text-amber-400 block mb-0.5">🛠️ Shopfloor Practical:</span>
                          <span className="text-slate-300 line-clamp-2">{week.shopfloor_practical_task}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                        <span className="text-emerald-400 font-semibold truncate max-w-[130px]">
                          🏅 {week.badge_earned}
                        </span>
                        <span className="text-slate-400 text-[9px]">Bharat Skills</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: COMPETENCY KNOWLEDGE GRAPH */}
            {activeTab === 'graph' && skillGraph && (
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-slate-800/40 p-3 rounded-xl border border-slate-800">
                  <div>
                    <h3 className="font-bold text-sm text-white">Competency Knowledge Topology</h3>
                    <p className="text-xs text-slate-400">
                      Interconnected competency node weights, tool relationships, and skill synergy vectors.
                    </p>
                  </div>
                  <div className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-lg border border-indigo-500/20">
                    Competency Index: {skillGraph.competency_index}%
                  </div>
                </div>

                <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 min-h-[220px] flex flex-col justify-center">
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {skillGraph.nodes.map((node) => {
                      const isRoot = node.category === 'core_trade';
                      const isPrimary = node.category === 'primary';
                      const isTool = node.category === 'tool';

                      let badgeColor = 'bg-slate-800 border-slate-700 text-slate-300';
                      if (isRoot) badgeColor = 'bg-orange-500/20 border-orange-500 text-orange-200 font-bold scale-105 shadow-md shadow-orange-500/20';
                      else if (isPrimary) badgeColor = 'bg-indigo-500/20 border-indigo-500/60 text-indigo-200';
                      else if (isTool) badgeColor = 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 text-[10px]';

                      return (
                        <div
                          key={node.id}
                          className={`px-3 py-1.5 rounded-xl border text-xs flex items-center gap-2 transition-transform hover:scale-105 ${badgeColor}`}
                        >
                          <span>{node.label}</span>
                          <span className="font-mono text-[9px] bg-slate-900/80 px-1.5 py-0.5 rounded">
                            {node.weight}%
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-400">
                    <div>
                      Strongest Competency Cluster: <span className="text-white font-bold">{skillGraph.strongest_cluster}</span>
                    </div>
                    <div>
                      Active Vectors: <span className="text-emerald-400 font-mono">{skillGraph.edges.length} cross-skill connections</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
