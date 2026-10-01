import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroImpactBanner } from './components/HeroImpactBanner';
import { TechnicalTransparencyPanel } from './components/TechnicalTransparencyPanel';
import { BeforeAfterTransformationCard } from './components/BeforeAfterTransformationCard';
import { WorkerIntakePanel } from './components/WorkerIntakePanel';
import { PipelineTrackerPanel } from './components/PipelineTrackerPanel';
import { EmployabilityPassportCard } from './components/EmployabilityPassportCard';
import { FutureIncomeSimulator } from './components/FutureIncomeSimulator';
import { BharatImpactDashboard } from './components/BharatImpactDashboard';
import { WhyKaushalSetuCard } from './components/WhyKaushalSetuCard';
import { BottomPanel } from './components/BottomPanel';
import { ExecutiveSummaryView } from './components/ExecutiveSummaryView';
import { CodebaseExplorerModal } from './components/CodebaseExplorerModal';
import { LangGraphArchitectureModal } from './components/LangGraphArchitectureModal';
import { AgentReasoningTraceModal } from './components/AgentReasoningTraceModal';
import { ScoringFormulaModal } from './components/ScoringFormulaModal';
import { JudgeWalkthroughModal } from './components/JudgeWalkthroughModal';
import { PublicVerificationModal } from './components/PublicVerificationModal';
import { DeveloperSettingsModal } from './components/DeveloperSettingsModal';
import { AgentState } from './types';
import { executeAgentPipeline } from './services/agentPipeline';
import { PRESET_PROFILES } from './data/presets';
import { LanguageCode } from './utils/translations';
import confetti from 'canvas-confetti';

export default function App() {
  const [agentState, setAgentState] = useState<AgentState | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  // Default is LIVE AI MODE (Never default to demo mode for judges)
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [viewMode, setViewMode] = useState<'executive' | 'detailed'>('detailed');

  // Modal toggles
  const [isCodeModalOpen, setIsCodeModalOpen] = useState<boolean>(false);
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState<boolean>(false);
  const [isReasoningTraceModalOpen, setIsReasoningTraceModalOpen] = useState<boolean>(false);
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState<boolean>(false);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState<boolean>(false);
  const [isJudgeWalkthroughOpen, setIsJudgeWalkthroughOpen] = useState<boolean>(false);
  const [isDeveloperSettingsOpen, setIsDeveloperSettingsOpen] = useState<boolean>(false);

  // Auto-run initial evaluation with the first preset profile on mount in Live Mode
  useEffect(() => {
    const initialPreset = PRESET_PROFILES[0];
    handleTriggerPipeline({
      worker_name: initialPreset.name,
      location: initialPreset.location,
      preferred_language: initialPreset.language,
      trade_description: initialPreset.tradeDescription,
      experience_years: initialPreset.experience,
      phone_number: initialPreset.phone,
      uploaded_image: initialPreset.imageThumbnail
    }, 250);
  }, []);

  const handleTriggerPipeline = async (
    inputs: {
      worker_name: string;
      location: string;
      preferred_language: string;
      trade_description: string;
      experience_years: number;
      phone_number: string;
      uploaded_image?: string | null;
    },
    customDelay?: number
  ) => {
    setIsRunning(true);
    setCurrentStepIndex(0);

    // Initial state setup
    setAgentState((prev) => ({
      worker_name: inputs.worker_name,
      location: inputs.location,
      preferred_language: inputs.preferred_language,
      trade_description: inputs.trade_description,
      experience_years: inputs.experience_years,
      phone_number: inputs.phone_number,
      uploaded_image: inputs.uploaded_image,
      agent_logs: [],
      pipeline_status: 'RUNNING'
    }));

    const stepDelay = customDelay !== undefined ? customDelay : (isDemoMode ? 550 : 250);

    try {
      const finalState = await executeAgentPipeline(
        inputs,
        (stepName, stepIndex, log, partialState) => {
          setCurrentStepIndex(stepIndex);
          setAgentState((prev) => ({
            ...(prev as AgentState),
            ...partialState,
            current_step: stepName
          }));
        },
        { stepDelayMs: stepDelay, isRealMode: !isDemoMode }
      );
      setAgentState(finalState);

      // Trigger celebratory particle burst on successful evaluation
      confetti({
        particleCount: 40,
        spread: 55,
        origin: { y: 0.45 }
      });
    } catch (err) {
      console.error('Pipeline error:', err);
    } finally {
      setIsRunning(false);
    }
  };

  const handleTriggerDemoRun = () => {
    const demoPreset = PRESET_PROFILES[2] || PRESET_PROFILES[0];
    handleTriggerPipeline({
      worker_name: demoPreset.name,
      location: demoPreset.location,
      preferred_language: demoPreset.language,
      trade_description: demoPreset.tradeDescription,
      experience_years: demoPreset.experience,
      phone_number: demoPreset.phone,
      uploaded_image: demoPreset.imageThumbnail
    }, 300);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      {/* Top Header with 3-Way UX View Switcher & Language Toggle */}
      <Header
        onOpenCodeExplorer={() => setIsCodeModalOpen(true)}
        isRunning={isRunning}
        isDemoMode={isDemoMode}
        onOpenDeveloperSettings={() => setIsDeveloperSettingsOpen(true)}
        onOpenJudgeWalkthrough={() => setIsJudgeWalkthroughOpen(true)}
        viewMode={viewMode}
        onSelectViewMode={setViewMode}
        language={language}
        onSelectLanguage={setLanguage}
      />

      {/* Main Command Center Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* PRIORITY 1: HERO IMPACT BANNER */}
        <HeroImpactBanner
          agentState={agentState}
          isRunning={isRunning}
          isDemoMode={isDemoMode}
          onOpenFormulaModal={() => setIsFormulaModalOpen(true)}
          onOpenJudgeWalkthrough={() => setIsJudgeWalkthroughOpen(true)}
          onTriggerDemoRun={handleTriggerDemoRun}
        />

        {/* PRIORITY 11: TECHNICAL TRANSPARENCY & AI TELEMETRY PANEL */}
        <TechnicalTransparencyPanel
          agentState={agentState}
          isRunning={isRunning}
          isDemoMode={isDemoMode}
          onOpenArchitectureModal={() => setIsArchitectureModalOpen(true)}
          onOpenReasoningTraceModal={() => setIsReasoningTraceModalOpen(true)}
          onOpenCodeExplorer={() => setIsCodeModalOpen(true)}
        />

        {/* VIEW MODE SWITCHING: EXECUTIVE VIEW vs COMMAND CENTER VIEW */}
        {viewMode === 'executive' ? (
          <ExecutiveSummaryView
            agentState={agentState}
            onOpenFormulaModal={() => setIsFormulaModalOpen(true)}
            onOpenVerificationModal={() => setIsVerificationModalOpen(true)}
          />
        ) : (
          <>
            {/* PRIORITY 2: BEFORE VS AFTER TRANSFORMATION CARD */}
            <BeforeAfterTransformationCard
              agentState={agentState}
            />

            {/* TOP 3-PANEL COMMAND CENTER GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              {/* LEFT PANEL: Worker Intake Form with Gemini Vision Audit (col-span 4) */}
              <div className="lg:col-span-4 flex flex-col">
                <WorkerIntakePanel
                  onTriggerPipeline={(inputs) => handleTriggerPipeline(inputs)}
                  isRunning={isRunning}
                  agentState={agentState}
                />
              </div>

              {/* CENTER PANEL: Autonomous Employability Engine (col-span 4) */}
              <div className="lg:col-span-4 flex flex-col">
                <PipelineTrackerPanel
                  agentState={agentState}
                  isRunning={isRunning}
                  currentStepIndex={currentStepIndex}
                  isDemoMode={isDemoMode}
                />
              </div>

              {/* RIGHT PANEL: Upgraded Employability Passport Card with Real PDF Export (col-span 4) */}
              <div className="lg:col-span-4 flex flex-col">
                <EmployabilityPassportCard
                  passport={agentState?.employability_passport || null}
                  nsqfMapping={agentState?.nsqf_mapping || null}
                  onOpenScoringModal={() => setIsFormulaModalOpen(true)}
                />
              </div>
            </div>

            {/* PRIORITY 8: FUTURE INCOME SIMULATOR */}
            <FutureIncomeSimulator
              agentState={agentState}
            />

            {/* PRIORITY 6: BHARAT NATIONAL IMPACT METRICS */}
            <BharatImpactDashboard
              agentState={agentState}
            />

            {/* PRIORITY 5: WHY KAUSHALSETU COMPARISON SECTION */}
            <WhyKaushalSetuCard />

            {/* BOTTOM PANEL: Upgraded MSME Job Radar (with wa.me deep links) & WhatsApp Outreach Timeline */}
            <BottomPanel
              learningPlan={agentState?.learning_plan || null}
              futureGaps={agentState?.future_skill_gaps || null}
              matchedJobs={agentState?.matched_jobs || null}
              outreachPayload={agentState?.outreach_payload || null}
              skillGraph={agentState?.skill_graph || null}
            />
          </>
        )}
      </main>

      {/* Footer Info */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-5 px-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto w-full gap-2">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-300">KaushalSetu AI</span>
          <span>•</span>
          <span className="text-slate-400">National Digital Workforce Infrastructure</span>
          <span>•</span>
          <span className="text-emerald-400 font-semibold">Transforming Informal Skills into Verified Employability</span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <button
            onClick={() => setIsJudgeWalkthroughOpen(true)}
            className="text-amber-400 hover:text-amber-300 underline font-semibold flex items-center gap-1"
          >
            <span>🏆 Judge Presentation Walkthrough</span>
          </button>
          <span>•</span>
          <button
            onClick={() => setIsFormulaModalOpen(true)}
            className="text-orange-400 hover:text-orange-300 underline font-semibold"
          >
            Scoring Formula
          </button>
          <span>•</span>
          <button
            onClick={() => setIsReasoningTraceModalOpen(true)}
            className="text-indigo-400 hover:text-indigo-300 underline font-semibold"
          >
            Reasoning Trace
          </button>
          <span>•</span>
          <button
            onClick={() => setIsArchitectureModalOpen(true)}
            className="text-emerald-400 hover:text-emerald-300 underline font-semibold"
          >
            LangGraph DAG
          </button>
          <span>•</span>
          <button
            onClick={() => setIsCodeModalOpen(true)}
            className="text-slate-400 hover:text-slate-300 underline font-semibold"
          >
            Python Backend
          </button>
        </div>
      </footer>

      {/* Codebase Explorer Modal */}
      <CodebaseExplorerModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
      />

      {/* LangGraph Architecture DAG Modal */}
      <LangGraphArchitectureModal
        isOpen={isArchitectureModalOpen}
        onClose={() => setIsArchitectureModalOpen(false)}
      />

      {/* Agent Reasoning Trace Modal */}
      <AgentReasoningTraceModal
        isOpen={isReasoningTraceModalOpen}
        onClose={() => setIsReasoningTraceModalOpen(false)}
        agentState={agentState}
      />

      {/* Transparent Scoring Formula Modal */}
      <ScoringFormulaModal
        isOpen={isFormulaModalOpen}
        onClose={() => setIsFormulaModalOpen(false)}
        agentState={agentState}
      />

      {/* Hackathon Judge Presentation Walkthrough Modal */}
      <JudgeWalkthroughModal
        isOpen={isJudgeWalkthroughOpen}
        onClose={() => setIsJudgeWalkthroughOpen(false)}
        agentState={agentState}
      />

      {/* Public DigiLocker Verification Modal */}
      <PublicVerificationModal
        isOpen={isVerificationModalOpen}
        onClose={() => setIsVerificationModalOpen(false)}
        passport={agentState?.employability_passport || null}
        nsqfMapping={agentState?.nsqf_mapping || null}
      />

      {/* Discreet Developer Settings Modal */}
      <DeveloperSettingsModal
        isOpen={isDeveloperSettingsOpen}
        onClose={() => setIsDeveloperSettingsOpen(false)}
        isDemoMode={isDemoMode}
        onToggleDemoMode={() => setIsDemoMode(!isDemoMode)}
      />
    </div>
  );
}
