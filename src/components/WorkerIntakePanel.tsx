import React, { useState } from 'react';
import { PRESET_PROFILES, PresetProfile, SAMPLE_IMAGES } from '../data/presets';
import { Sparkles, UploadCloud, Mic, MapPin, Briefcase, Globe, User, Image as ImageIcon, CheckCircle, RefreshCw, AlertTriangle, Clock } from 'lucide-react';
import { AgentState } from '../types';
import { VisionAnalysisCard } from './VisionAnalysisCard';

interface WorkerIntakePanelProps {
  onTriggerPipeline: (inputs: {
    worker_name: string;
    location: string;
    preferred_language: string;
    trade_description: string;
    experience_years: number;
    phone_number: string;
    uploaded_image?: string | null;
  }) => void;
  isRunning: boolean;
  agentState?: AgentState | null;
}

export const WorkerIntakePanel: React.FC<WorkerIntakePanelProps> = ({
  onTriggerPipeline,
  isRunning,
  agentState
}) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('p1');
  const [workerName, setWorkerName] = useState<string>(PRESET_PROFILES[0].name);
  const [location, setLocation] = useState<string>(PRESET_PROFILES[0].location);
  const [language, setLanguage] = useState<string>(PRESET_PROFILES[0].language);
  const [experience, setExperience] = useState<number>(PRESET_PROFILES[0].experience);
  const [phone, setPhone] = useState<string>(PRESET_PROFILES[0].phone);
  const [tradeDescription, setTradeDescription] = useState<string>(PRESET_PROFILES[0].tradeDescription);
  const [uploadedImage, setUploadedImage] = useState<string | null>(PRESET_PROFILES[0].imageThumbnail);
  const [isSimulatingSpeech, setIsSimulatingSpeech] = useState<boolean>(false);

  const handleSelectPreset = (preset: PresetProfile) => {
    setSelectedPresetId(preset.id);
    setWorkerName(preset.name);
    setLocation(preset.location);
    setLanguage(preset.language);
    setExperience(preset.experience);
    setPhone(preset.phone);
    setTradeDescription(preset.tradeDescription);
    setUploadedImage(preset.imageThumbnail);
  };

  const handleCustomFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectQuickImage = (key: keyof typeof SAMPLE_IMAGES) => {
    setUploadedImage(SAMPLE_IMAGES[key]);
  };

  const handleSpeechSimulation = () => {
    setIsSimulatingSpeech(true);
    setTimeout(() => {
      setIsSimulatingSpeech(false);
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workerName.trim() || !tradeDescription.trim()) return;

    onTriggerPipeline({
      worker_name: workerName,
      location,
      preferred_language: language,
      trade_description: tradeDescription,
      experience_years: experience,
      phone_number: phone,
      uploaded_image: uploadedImage
    });
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl flex flex-col h-full backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400">
            <User className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">Worker Intake Form</h2>
            <p className="text-[11px] text-slate-400">Multimodal Vernacular Blue-Collar Profile</p>
          </div>
        </div>
        <span className="text-[10px] font-semibold bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
          Node 1 Inputs
        </span>
      </div>

      {/* Preset Profiles Selector */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            ⚡ Candidate Benchmark Presets
          </label>
          <span className="text-[10px] text-amber-400 font-mono">Includes Vision Test</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {PRESET_PROFILES.map((p) => {
            const isSelected = selectedPresetId === p.id;
            const isDogTest = p.id === 'p5';
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => handleSelectPreset(p)}
                className={`text-left p-2 rounded-xl border text-xs transition-all ${
                  isSelected
                    ? isDogTest
                      ? 'bg-amber-950/40 border-amber-500 text-amber-200 shadow-sm'
                      : 'bg-orange-500/15 border-orange-500/50 text-orange-200 shadow-sm'
                    : isDogTest
                    ? 'bg-amber-950/20 border-amber-800/60 hover:bg-amber-950/30 text-amber-300'
                    : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 text-slate-300'
                }`}
              >
                <div className="font-bold truncate text-white flex items-center justify-between">
                  <span>{p.name}</span>
                  {isDogTest && <span className="text-[9px] text-amber-400 font-mono">TEST</span>}
                </div>
                <div className="text-[10px] text-slate-400 truncate">{p.roleTitle}</div>
                <div className="text-[9px] text-amber-400/80 font-medium mt-0.5">{p.location.split(',')[0]}</div>
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Worker Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <span>Worker Full Name</span>
              </label>
              <input
                type="text"
                required
                value={workerName}
                onChange={(e) => setWorkerName(e.target.value)}
                placeholder="e.g. Ramesh Kumar"
                className="w-full bg-slate-800/90 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <span>WhatsApp Contact</span>
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98450 XXXXX"
                className="w-full bg-slate-800/90 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors font-mono"
              />
            </div>
          </div>

          {/* Location & Preferred Language */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                <span>Industrial Location</span>
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Peenya, Bengaluru"
                className="w-full bg-slate-800/90 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-sky-400" />
                <span>Preferred Language</span>
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500 transition-colors"
              >
                <option value="Hindi">Hindi (हिंदी)</option>
                <option value="Marathi">Marathi (मराठी)</option>
                <option value="Tamil">Tamil (தமிழ்)</option>
                <option value="Telugu">Telugu (తెలుగు)</option>
                <option value="Kannada">Kannada (ಕನ್ನಡ)</option>
                <option value="Bengali">Bengali (বাংলা)</option>
                <option value="English">English</option>
              </select>
            </div>
          </div>

          {/* Experience Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                <span>Hands-on Experience</span>
              </label>
              <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                {experience} Years
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="20"
              step="0.5"
              value={experience}
              onChange={(e) => setExperience(parseFloat(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
            />
          </div>

          {/* Trade Description with Voice Simulation */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                <span>Trade Description (Vernacular Voice/Text)</span>
              </label>
              <button
                type="button"
                onClick={handleSpeechSimulation}
                className={`text-[10px] flex items-center gap-1 px-2 py-0.5 rounded transition-all ${
                  isSimulatingSpeech
                    ? 'bg-rose-500 text-white animate-pulse'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                }`}
                title="Simulate speech-to-text recording"
              >
                <Mic className="w-3 h-3 text-rose-400" />
                <span>{isSimulatingSpeech ? 'Listening...' : 'Voice Input'}</span>
              </button>
            </div>
            <textarea
              required
              rows={3}
              value={tradeDescription}
              onChange={(e) => setTradeDescription(e.target.value)}
              placeholder="Describe your craft, tools used, metals worked on, or machines operated in your native language..."
              className="w-full bg-slate-800/90 border border-slate-700 rounded-lg p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors resize-none leading-relaxed font-sans"
            />
          </div>

          {/* Multimodal Image Upload & Judge Test Presets */}
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
                <span>Workpiece / Tool Photo (Gemini Vision)</span>
              </span>
              <span className="text-[10px] text-emerald-400/90 font-mono">Multimodal Ready</span>
            </label>

            {/* Quick Test Image Buttons */}
            <div className="flex items-center gap-1.5 mb-2 overflow-x-auto pb-1 text-[10px]">
              <span className="text-slate-500 shrink-0 font-medium">Verify Real Photos:</span>
              <button
                type="button"
                onClick={() => handleSelectQuickImage('welding')}
                className="px-2.5 py-1 rounded bg-orange-950/40 hover:bg-orange-900/60 text-orange-300 border border-orange-500/40 shrink-0 font-bold"
                title="Inspect real welder torch and weldment evidence"
              >
                🔥 Welder Working
              </button>
              <button
                type="button"
                onClick={() => handleSelectQuickImage('electrician')}
                className="px-2.5 py-1 rounded bg-sky-950/40 hover:bg-sky-900/60 text-sky-300 border border-sky-500/40 shrink-0 font-bold"
                title="Inspect industrial 415V distribution panel and multimeter"
              >
                ⚡ Electrician Panel
              </button>
              <button
                type="button"
                onClick={() => handleSelectQuickImage('solar')}
                className="px-2.5 py-1 rounded bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/40 shrink-0 font-bold"
                title="Inspect rooftop solar PV combiner box and inverters"
              >
                ☀️ Solar Installation
              </button>
              <button
                type="button"
                onClick={() => handleSelectQuickImage('dog')}
                className="px-2 py-0.5 rounded bg-amber-950/40 hover:bg-amber-900/50 text-amber-300 border border-amber-500/40 shrink-0 font-semibold"
                title="Test Vision AI with a domestic dog photo to prove it flags non-trade images!"
              >
                🐕 Dog (Flag Test)
              </button>
              <button
                type="button"
                onClick={() => handleSelectQuickImage('selfie')}
                className="px-2 py-0.5 rounded bg-indigo-950/40 hover:bg-indigo-900/50 text-indigo-300 border border-indigo-500/40 shrink-0 font-semibold"
                title="Test Vision AI with a selfie to prove it penalizes non-trade photos!"
              >
                🤳 Selfie (Flag Test)
              </button>
            </div>

            {uploadedImage ? (
              <div className="space-y-2">
                {(() => {
                  const isFlaggedNonTrade = agentState?.vision_audit && agentState.vision_audit.is_trade_related === false;
                  return (
                    <div className={`relative group rounded-xl overflow-hidden border p-2 flex items-center gap-3 ${
                      isFlaggedNonTrade
                        ? 'border-rose-500/50 bg-rose-950/30'
                        : 'border-emerald-500/40 bg-slate-800/80'
                    }`}>
                      <img
                        src={uploadedImage}
                        alt="Workpiece Evidence"
                        className="w-16 h-12 rounded-lg object-cover border border-slate-700 bg-slate-900 shrink-0"
                      />
                      <div className="flex-1 min-w-0 text-xs">
                        {isFlaggedNonTrade ? (
                          <>
                            <div className="font-semibold text-rose-400 flex items-center gap-1 text-[11px]">
                              <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                              <span>Non-Trade Evidence Flagged</span>
                            </div>
                            <div className="text-[10px] text-rose-300/80 truncate">
                              Image rejected: No vocational tools or PPE found
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="font-semibold text-emerald-400 flex items-center gap-1 text-[11px]">
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span>Gemini Vision Verified</span>
                            </div>
                            <div className="text-[10px] text-slate-400 truncate">
                              Tools, PPE & shopfloor workspace validated
                            </div>
                          </>
                        )}
                      </div>
                      <label className="cursor-pointer text-[10px] bg-slate-700 hover:bg-slate-600 text-white px-2 py-1 rounded border border-slate-600 transition-colors shrink-0">
                        Change
                        <input type="file" accept="image/*" onChange={handleCustomFileUpload} className="hidden" />
                      </label>
                    </div>
                  );
                })()}
                {/* Forensic Vision Analysis Breakdown */}
                <VisionAnalysisCard imageSrc={uploadedImage} agentState={agentState || null} />
              </div>
            ) : (
              <label className="border-2 border-dashed border-amber-500/40 hover:border-amber-400/70 rounded-xl p-3.5 flex flex-col items-center justify-center cursor-pointer transition-colors bg-amber-950/10">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs mb-0.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Visual Verification Pending</span>
                </div>
                <span className="text-[11px] text-slate-300 text-center font-medium">Upload workplace image to validate tools & PPE</span>
                <span className="text-[9px] text-slate-500 mt-1">PNG, JPG, or SVG up to 25MB • Contributes +15 pts to Employability</span>
                <input type="file" accept="image/*" onChange={handleCustomFileUpload} className="hidden" />
              </label>
            )}
          </div>
        </div>

        {/* Submit Pipeline Trigger Button */}
        <div className="pt-3">
          <button
            type="submit"
            disabled={isRunning}
            className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all ${
              isRunning
                ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                : 'bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 active:scale-[0.99] text-white shadow-orange-500/20'
            }`}
          >
            {isRunning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-orange-400" />
                <span>Executing 8-Agent LangGraph Pipeline...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Trigger Autonomous Intelligence Pipeline</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
