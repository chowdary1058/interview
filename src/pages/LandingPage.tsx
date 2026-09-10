import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { AIInterviewerCore } from '../three/AIInterviewerCore';
import {
  Sparkles,
  ArrowRight,
  Shield,
  Activity,
  Mic,
  Eye,
  Smile,
  BarChart3,
  Terminal,
  Cpu,
  CheckCircle2,
  Play,
  Flame,
  ChevronRight,
  TrendingUp,
  Volume2
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [heroCoreState, setHeroCoreState] = useState<'normal' | 'speaking' | 'listening'>('normal');

  return (
    <div className="relative min-h-screen bg-[#050608] text-neutral-100 overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-blue-600/10 via-indigo-600/5 to-transparent blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[800px] right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[160px] pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Text */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-800 text-neutral-300 text-xs shadow-inner"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-medium text-neutral-300">FastAPI & Gemini 3.8 Powered</span>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
                Practice Like It’s Real.{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300">
                  Perform Like You’re Ready.
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                AI-powered interview practice that understands your answers, voice, confidence, emotion and communication.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <Link
                to="/interview/create"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all active:scale-[0.98] flex items-center justify-center space-x-2"
              >
                <span>Start Your Interview</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#features"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-semibold text-neutral-300 hover:text-white bg-neutral-900/80 hover:bg-neutral-850 border border-neutral-800 transition-all flex items-center justify-center space-x-2"
              >
                <span>Explore the Experience</span>
              </a>
            </motion.div>

            {/* Micro Telemetry Metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="pt-6 grid grid-cols-3 gap-4 border-t border-neutral-900/80 text-left"
            >
              <div>
                <div className="text-2xl font-bold font-mono text-white">99.2%</div>
                <div className="text-xs text-neutral-400">Telemetry Accuracy</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-cyan-400">&lt;20ms</div>
                <div className="text-xs text-neutral-400">Inference Latency</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-indigo-400">6 Dims</div>
                <div className="text-xs text-neutral-400">Answer Evaluation</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive 3D AI Interviewer Core */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="relative w-full aspect-square max-w-[460px] rounded-3xl bg-neutral-950/60 border border-neutral-800/80 shadow-2xl backdrop-blur-md p-4 flex flex-col justify-between overflow-hidden group"
            >
              {/* Header inside 3D canvas */}
              <div className="flex items-center justify-between z-10 px-2 pt-1">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-[11px] font-mono tracking-wider text-neutral-400">
                    AI SYNAPSE v3.8
                  </span>
                </div>
                <span className="text-[10px] font-mono text-neutral-400 border border-neutral-800 px-2 py-0.5 rounded-full">
                  WebGL 3D Core
                </span>
              </div>

              {/* Three.js Canvas Scene */}
              <div className="relative w-full flex-1 flex items-center justify-center">
                <AIInterviewerCore
                  isSpeaking={heroCoreState === 'speaking'}
                  isListening={heroCoreState === 'listening'}
                  className="w-full h-full"
                  interactive={true}
                />
              </div>

              {/* Bottom Interactive Trigger buttons */}
              <div className="z-10 bg-[#0c0e14]/90 border border-neutral-800/80 rounded-2xl p-2.5 flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <button
                    type="button"
                    onClick={() => setHeroCoreState('speaking')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      heroCoreState === 'speaking'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    AI Speaking
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeroCoreState('listening')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      heroCoreState === 'listening'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    Listening
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeroCoreState('normal')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      heroCoreState === 'normal'
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    Idle
                  </button>
                </div>

                <span className="text-[11px] font-mono text-cyan-400/80 pr-1">
                  Move mouse to rotate
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Sections: 6 Cinematic Modules */}
      <section id="features" className="py-24 border-t border-neutral-900 bg-[#07080c] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">
              Comprehensive Intelligence Architecture
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Six Multi-Modal Diagnostic Engines
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Every pause, micro-expression, word choice, and system trade-off is evaluated by purpose-built neural models.
            </p>
          </div>

          {/* Feature 1: AI Interview Simulation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                AI Interview Simulation
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Adaptive questioning engines that dynamically probe deeper based on candidate responses. Replicates the rigorous scrutiny of FAANG and elite engineering managers.
              </p>
              <ul className="space-y-2 text-xs text-neutral-300 font-medium">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Customizable role benchmarks from Junior to Staff Architect</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Live Web Speech audio synthesis for natural voice delivery</span>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-7">
              <div className="bg-[#0c0e14] border border-neutral-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden font-mono text-xs">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-800/80 text-neutral-400">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-neutral-300">session_interactive_engine.sh</span>
                  </div>
                  <span className="text-[10px] text-cyan-400">POST /interview/start</span>
                </div>
                <div className="space-y-3">
                  <p className="text-blue-400 font-medium">// AI Interviewer Prompt Active</p>
                  <div className="bg-neutral-900/90 rounded-xl p-4 border border-neutral-800 text-neutral-200">
                    &quot;Explain how you would architect a globally distributed rate limiter that prevents race conditions without creating a single point of failure.&quot;
                  </div>
                  <div className="flex items-center space-x-3 text-neutral-400 text-[11px] pt-2">
                    <span className="text-emerald-400">● Role: Senior Backend</span>
                    <span className="text-indigo-400">● Difficulty: Senior</span>
                    <span className="text-cyan-400">● Live Audio Capture: Enabled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2: Speech Intelligence */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="bg-[#0c0e14] border border-neutral-800 rounded-2xl p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <div className="flex items-center space-x-2 text-xs font-semibold text-white">
                    <Mic className="w-4 h-4 text-cyan-400" />
                    <span>Neural Audio Telemetry</span>
                  </div>
                  <span className="font-mono text-[10px] text-cyan-400">POST /speech/transcribe</span>
                </div>

                <div className="p-3 bg-neutral-900/60 rounded-xl border border-neutral-800/80 text-xs text-neutral-300 leading-relaxed font-mono">
                  &quot;I prioritize fault isolation through circuit breakers and <span className="bg-amber-500/20 text-amber-300 px-1 py-0.5 rounded">basically</span> decouple high-frequency writes using partitioned Kafka streams.&quot;
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-neutral-900/40 border border-neutral-800 text-center">
                    <div className="text-xl font-bold font-mono text-cyan-400">142</div>
                    <div className="text-[10px] text-neutral-400">Words / Min</div>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-900/40 border border-neutral-800 text-center">
                    <div className="text-xl font-bold font-mono text-emerald-400">1.2%</div>
                    <div className="text-[10px] text-neutral-400">Filler Words</div>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-900/40 border border-neutral-800 text-center">
                    <div className="text-xl font-bold font-mono text-blue-400">92/100</div>
                    <div className="text-[10px] text-neutral-400">Speaking Clarity</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 order-1 lg:order-2 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Mic className="w-5 h-5" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Speech Intelligence
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Seamless multipart audio upload to `/speech/transcribe`. Automatically maps pacing, volume cadence, filler expressions (&quot;um&quot;, &quot;like&quot;, &quot;you know&quot;), and articulation consistency.
              </p>
            </div>
          </div>

          {/* Feature 3: Emotion Intelligence */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Smile className="w-5 h-5" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Emotion Intelligence
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Frame-by-frame emotion modeling via `/emotion/detect`. Measures confidence versus anxiety under complex engineering inquiries, calculating composure curves.
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="bg-[#0c0e14] border border-neutral-800 rounded-2xl p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <span className="text-xs font-semibold text-white">Micro-Expression Breakdown</span>
                  <span className="font-mono text-[10px] text-emerald-400">POST /emotion/detect</span>
                </div>
                <div className="space-y-2.5">
                  <div>
                    <div className="flex justify-between text-xs text-neutral-300 mb-1">
                      <span>Confident</span>
                      <span className="font-mono text-emerald-400">92%</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 rounded-full w-[92%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-neutral-300 mb-1">
                      <span>Focused / Composed</span>
                      <span className="font-mono text-cyan-400">88%</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-400 rounded-full w-[88%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-neutral-300 mb-1">
                      <span>Nervousness</span>
                      <span className="font-mono text-neutral-400">6%</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full w-[6%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 4: Behavioral Monitoring */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="bg-[#0c0e14] border border-neutral-800 rounded-2xl p-6 shadow-2xl grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between">
                  <div className="text-xs font-semibold text-neutral-300 mb-2 flex items-center space-x-1.5">
                    <Eye className="w-4 h-4 text-blue-400" />
                    <span>Eye Contact</span>
                  </div>
                  <div className="text-3xl font-mono font-bold text-white mb-1">94%</div>
                  <div className="text-[11px] text-emerald-400 font-medium">Direct focal lock</div>
                </div>
                <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between">
                  <div className="text-xs font-semibold text-neutral-300 mb-2 flex items-center space-x-1.5">
                    <Activity className="w-4 h-4 text-cyan-400" />
                    <span>Head Pose</span>
                  </div>
                  <div className="text-sm font-mono text-neutral-200 space-y-0.5">
                    <div>Pitch: +1.2°</div>
                    <div>Yaw: -0.8°</div>
                    <div>Roll: 0.1°</div>
                  </div>
                  <div className="text-[11px] text-cyan-400 font-medium mt-1">Balanced posture</div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 order-1 lg:order-2 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Behavioral Monitoring
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Continuous spatial triangulation via `/monitor/live`. Tracks eye contact stability, head tilt angles, attentiveness metrics, and face tracking continuity.
              </p>
            </div>
          </div>

          {/* Feature 5: AI Answer Evaluation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                AI Answer Evaluation
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Deep semantic analysis powered by server-side Gemini 3.8 Flash. Analyzes technical answers against 6 specific criteria: Relevance, Correctness, Completeness, Clarity, Technical Depth, and Communication.
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="bg-[#0c0e14] border border-neutral-800 rounded-2xl p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <span className="text-xs font-semibold text-white">Gemini 3.8 Evaluation Dimensions</span>
                  <span className="font-mono text-[10px] text-purple-400">POST /api/evaluate</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { label: 'Relevance', val: 94 },
                    { label: 'Correctness', val: 92 },
                    { label: 'Completeness', val: 88 },
                    { label: 'Clarity', val: 95 },
                    { label: 'Technical Depth', val: 90 },
                    { label: 'Communication', val: 91 },
                  ].map(dim => (
                    <div key={dim.label} className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 text-center">
                      <div className="text-lg font-bold font-mono text-cyan-400">{dim.val}%</div>
                      <div className="text-[10px] text-neutral-400 mt-0.5">{dim.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Feature 6: Performance Scoring */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="bg-[#0c0e14] border border-neutral-800 rounded-2xl p-6 shadow-2xl flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-neutral-400">Synthesis Result</span>
                  <div className="text-3xl font-extrabold text-white">Strong Hire</div>
                  <p className="text-xs text-neutral-400">92nd percentile amongst Senior Candidates</p>
                </div>
                <div className="w-24 h-24 rounded-full border-4 border-cyan-400/80 bg-neutral-900 flex flex-col items-center justify-center shadow-[0_0_25px_#22d3ee20]">
                  <span className="text-2xl font-black font-mono text-white">89</span>
                  <span className="text-[9px] uppercase tracking-wider text-cyan-400 font-bold">Index</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 order-1 lg:order-2 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Performance Scoring
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Composite calculation via `/scoring/calculate`. Weighted aggregation of verbal depth, attention consistency, and poise generates definitive hiring recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 border-t border-neutral-900 bg-[#050608]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">
              Seamless Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              How Interview Pro AI Works
            </h2>
            <p className="text-neutral-400 text-sm">
              From configuration to comprehensive report in four intelligent stages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Configure Interview',
                desc: 'Select target engineering role, difficulty tier, and core skill proficiencies to tailor question sequences.',
              },
              {
                step: '02',
                title: 'Enter AI Interview',
                desc: 'Grant camera and microphone access to step into an immersive full-screen interview stage.',
              },
              {
                step: '03',
                title: 'AI Analyzes You',
                desc: 'Speak naturally as the multi-modal neural engines continuously track answers, speech, and composure.',
              },
              {
                step: '04',
                title: 'Receive Performance Report',
                desc: 'Get an instant executive scoring report with granular strengths, filler breakdown, and model answers.',
              },
            ].map(item => (
              <div
                key={item.step}
                className="bg-neutral-950/60 border border-neutral-850 rounded-2xl p-6 space-y-3 relative group hover:border-neutral-700 transition-colors"
              >
                <div className="text-3xl font-black font-mono text-cyan-400/70 group-hover:text-cyan-400 transition-colors">
                  {item.step}
                </div>
                <h4 className="text-base font-bold text-white">{item.title}</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-neutral-900 bg-gradient-to-b from-[#050608] via-[#07090f] to-[#040507] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Ready to Dominate Your Next Technical Interview?
          </h2>
          <p className="text-neutral-400 text-base max-w-xl mx-auto">
            Experience the future of interview preparation with real-time feedback that sharpens your instincts.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/interview/create"
              className="px-8 py-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-xl shadow-blue-500/25 transition-all flex items-center space-x-2"
            >
              <span>Launch Live Interview Simulator</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
            <Link
              to="/dashboard"
              className="px-6 py-4 rounded-xl text-sm font-semibold text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 transition-all"
            >
              View Analytics Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
