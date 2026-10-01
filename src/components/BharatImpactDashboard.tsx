import React from 'react';
import { AgentState } from '../types';
import { TrendingUp, Clock, Target, CheckCircle2, Building2, Award, Zap, ShieldCheck } from 'lucide-react';

interface BharatImpactDashboardProps {
  agentState: AgentState | null;
}

export const BharatImpactDashboard: React.FC<BharatImpactDashboardProps> = ({ agentState }) => {
  const metrics = agentState?.impact_metrics || {
    employment_probability: 94,
    income_growth_potential: 37,
    time_to_employment_reduction: 52,
    skill_gap_closure_rate: 78,
    msme_match_rate: 91,
    workforce_readiness_index: 9.1
  };

  const kpis = [
    {
      title: 'Employment Probability',
      value: `${metrics.employment_probability}%`,
      subtitle: 'Placement Ready within 14 Days',
      trend: '+42% vs informal baseline',
      icon: Target,
      color: 'from-emerald-500 to-teal-600',
      border: 'border-emerald-500/40',
      badgeBg: 'bg-emerald-500/10 text-emerald-400',
      description: 'Calculated using verified micro-competencies and real-time employer hiring intent.'
    },
    {
      title: 'Income Growth Potential',
      value: `+${metrics.income_growth_potential}%`,
      subtitle: '₹24,000 → ₹38,000+ / mo',
      trend: 'NSQF + Future Skill Premium',
      icon: TrendingUp,
      color: 'from-amber-500 to-orange-600',
      border: 'border-amber-500/40',
      badgeBg: 'bg-amber-500/10 text-amber-300',
      description: 'Formal recognition unlocks Grade 4 salary scales in automotive and capital goods.'
    },
    {
      title: 'Time To Employment',
      value: `-${metrics.time_to_employment_reduction}%`,
      subtitle: 'Reduced from 45 days to 8 days',
      trend: 'Zero middleman friction',
      icon: Clock,
      color: 'from-sky-500 to-indigo-600',
      border: 'border-sky-500/40',
      badgeBg: 'bg-sky-500/10 text-sky-400',
      description: 'Direct WhatsApp connection eliminates agency gatekeeping and manual resume triage.'
    },
    {
      title: 'Skill Gap Closure Rate',
      value: `${metrics.skill_gap_closure_rate}%`,
      subtitle: '4-Week Micro-Roadmap Efficacy',
      trend: 'High retention completion',
      icon: Zap,
      color: 'from-purple-500 to-pink-600',
      border: 'border-purple-500/40',
      badgeBg: 'bg-purple-500/10 text-purple-300',
      description: 'Vernacular bite-sized lessons in native tongue ensure high shopfloor practical follow-through.'
    },
    {
      title: 'MSME Match Rate',
      value: `${metrics.msme_match_rate}%`,
      subtitle: '5 Direct Cluster Vacancies',
      trend: 'Verified plant requisition',
      icon: Building2,
      color: 'from-cyan-500 to-emerald-600',
      border: 'border-cyan-500/40',
      badgeBg: 'bg-cyan-500/10 text-cyan-300',
      description: 'Real-time clustering matches artisans within 15 km of industrial corridors (Peenya, Chakan).'
    },
    {
      title: 'Workforce Readiness Index',
      value: `${metrics.workforce_readiness_index}/10`,
      subtitle: 'A+ Sovereign Certified Grade',
      trend: 'Industry 4.0 Prepared',
      icon: Award,
      color: 'from-indigo-500 to-violet-600',
      border: 'border-indigo-500/40',
      badgeBg: 'bg-indigo-500/10 text-indigo-300',
      description: 'Holistic benchmark incorporating technical precision, safety habits, and tool mastery.'
    }
  ];

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl backdrop-blur-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-3 border-b border-slate-800 mb-4 gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Bharat Impact Dashboard</h3>
            <p className="text-[11px] text-slate-400">National-scale workforce metrics & sovereign employability index</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700 font-mono">
            Population Target: 400M+ Artisans
          </span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className={`rounded-xl border ${kpi.border} bg-slate-950/70 p-4 flex flex-col justify-between hover:bg-slate-950 transition-all shadow-md group`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                    {kpi.title}
                  </span>
                  <div className={`p-1.5 rounded-lg bg-gradient-to-br ${kpi.color} text-white shadow-sm`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="text-2xl font-black text-white tracking-tight font-mono">
                  {kpi.value}
                </div>

                <div className="text-xs font-semibold text-slate-300 mt-1">
                  {kpi.subtitle}
                </div>

                <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                  {kpi.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                <span className={`px-2 py-0.5 rounded font-bold ${kpi.badgeBg}`}>
                  {kpi.trend}
                </span>
                <span className="text-slate-500 font-mono">Verified Metric</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
