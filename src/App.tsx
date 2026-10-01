import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroImpactBanner } from './components/HeroImpactBanner';
import { BeforeAfterTransformationCard } from './components/BeforeAfterTransformationCard';
import { WorkerIntakePanel } from './components/WorkerIntakePanel';
import { PipelineTrackerPanel } from './components/PipelineTrackerPanel';
import { EmployabilityPassportCard } from './components/EmployabilityPassportCard';
import { FutureIncomeSimulator } from './components/FutureIncomeSimulator';
import { BharatImpactDashboard } from './components/BharatImpactDashboard';
import { BottomPanel } from './components/BottomPanel';
import { CodebaseExplorerModal } from './components/CodebaseExplorerModal';
import { AgentState } from './types';
import { executeAgentPipeline } from './services/agentPipeline';
import { PRESET_PROFILES } from './data/presets';
import confetti from 'canvas-confetti';

export default function App() {
  const [agentState, setAgentState] = useState<AgentState | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState<boolean>(false);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);

  // Auto-run initial evaluation with the first preset profile on mount
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
    }, 400);
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

    const stepDelay = customDelay !== undefined ? customDelay : (isDemoMode ? 650 : 350);

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
        { stepDelayMs: stepDelay }
      );
      setAgentState(finalState);

      // Trigger particle burst on successful completion in demo mode
      if (isDemoMode) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.5 }
        });
      }
    } catch (err) {
      console.error('Pipeline error:', err);
    } finally {
      setIsRunning(false);
    }
  };

  const handleTriggerDemoRun = () => {
    // Pick an exciting preset (EV Assembly & Retrofit) for the hackathon demo
    const demoPreset = PRESET_PROFILES[2] || PRESET_PROFILES[0];
    handleTriggerPipeline({
      worker_name: demoPreset.name,
      location: demoPreset.location,
      preferred_language: demoPreset.language,
      trade_description: demoPreset.tradeDescription,
      experience_years: demoPreset.experience,
      phone_number: demoPreset.phone,
      uploaded_image: demoPreset.imageThumbnail
    }, 700);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      {/* Top Header */}
      <Header
        onOpenCodeExplorer={() => setIsCodeModalOpen(true)}
        isRunning={isRunning}
        isDemoMode={isDemoMode}
        onToggleDemoMode={() => setIsDemoMode(!isDemoMode)}
      />

      {/* Main Command Center Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* PRIORITY 1: HERO IMPACT BANNER */}
        <HeroImpactBanner
          agentState={agentState}
          isRunning={isRunning}
          isDemoMode={isDemoMode}
          onToggleDemoMode={() => setIsDemoMode(!isDemoMode)}
          onTriggerDemoRun={handleTriggerDemoRun}
        />

        {/* PRIORITY 2: BEFORE VS AFTER TRANSFORMATION CARD */}
        <BeforeAfterTransformationCard
          agentState={agentState}
        />

        {/* TOP 3-PANEL COMMAND CENTER GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* LEFT PANEL: Worker Intake Form (col-span 4) */}
          <div className="lg:col-span-4 flex flex-col">
            <WorkerIntakePanel
              onTriggerPipeline={(inputs) => handleTriggerPipeline(inputs)}
              isRunning={isRunning}
            />
          </div>

          {/* CENTER PANEL: Autonomous Employability Engine (col-span 4) - Priority 4 & 9 */}
          <div className="lg:col-span-4 flex flex-col">
            <PipelineTrackerPanel
              agentState={agentState}
              isRunning={isRunning}
              currentStepIndex={currentStepIndex}
              isDemoMode={isDemoMode}
            />
          </div>

          {/* RIGHT PANEL: Upgraded Employability Passport Card (col-span 4) - Priority 3 */}
          <div className="lg:col-span-4 flex flex-col">
            <EmployabilityPassportCard
              passport={agentState?.employability_passport || null}
              nsqfMapping={agentState?.nsqf_mapping || null}
            />
          </div>
        </div>

        {/* PRIORITY 8: FUTURE INCOME SIMULATOR */}
        <FutureIncomeSimulator
          agentState={agentState}
        />

        {/* PRIORITY 5: BHARAT IMPACT DASHBOARD */}
        <BharatImpactDashboard
          agentState={agentState}
        />

        {/* BOTTOM PANEL: Upgraded MSME Job Radar (Priority 6) & WhatsApp Outreach (Priority 7) */}
        <BottomPanel
          learningPlan={agentState?.learning_plan || null}
          futureGaps={agentState?.future_skill_gaps || null}
          matchedJobs={agentState?.matched_jobs || null}
          outreachPayload={agentState?.outreach_payload || null}
          skillGraph={agentState?.skill_graph || null}
        />
      </main>

      {/* Footer Info */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-5 px-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto w-full gap-2">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-300">KaushalSetu AI</span>
          <span>•</span>
          <span className="text-slate-400">National Sovereign Workforce Infrastructure</span>
          <span>•</span>
          <span className="text-emerald-400 font-semibold">Transforming Informal Skills into Verified Employability</span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span>FastAPI + LangGraph + Python 3.11 + React</span>
          <span>•</span>
          <button
            onClick={() => setIsCodeModalOpen(true)}
            className="text-indigo-400 hover:text-indigo-300 underline font-semibold"
          >
            Inspect Source Code
          </button>
        </div>
      </footer>

      {/* Codebase Explorer Modal */}
      <CodebaseExplorerModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
      />
    </div>
  );
}
