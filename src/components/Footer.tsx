import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Terminal, Shield, Cpu, Activity } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-neutral-900 bg-[#040507] text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center p-1">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-extrabold text-white text-sm tracking-tight">
                INTERVIEW PRO <span className="text-cyan-400">AI</span>
              </span>
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Practice Like It’s Real. Perform Like You’re Ready. Next-generation neural interview simulator analyzing speech, emotion, and technical rigor.
            </p>
            <div className="flex items-center space-x-2 pt-1 font-mono text-[11px] text-neutral-400">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>FastAPI Architecture v2.4</span>
            </div>
          </div>

          {/* Col 2: Platform */}
          <div className="space-y-2.5">
            <div className="text-xs font-semibold text-neutral-200 uppercase tracking-wider">
              Platform
            </div>
            <ul className="space-y-2">
              <li>
                <Link to="/interview/create" className="hover:text-cyan-400 transition-colors">
                  Create Interview
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-cyan-400 transition-colors">
                  Performance Dashboard
                </Link>
              </li>
              <li>
                <Link to="/reports" className="hover:text-cyan-400 transition-colors">
                  Historical Reports
                </Link>
              </li>
              <li>
                <Link to="/resume" className="hover:text-cyan-400 transition-colors">
                  Resume Gateway
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: AI Intelligence Engine */}
          <div className="space-y-2.5">
            <div className="text-xs font-semibold text-neutral-200 uppercase tracking-wider">
              Neural Telemetry
            </div>
            <ul className="space-y-2">
              <li className="flex items-center space-x-1.5">
                <Cpu className="w-3.5 h-3.5 text-blue-400" />
                <span>Speech & Filler Analysis</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                <span>Emotion & Confidence Scorer</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                <span>Head Pose & Eye Contact</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Gemini 3.8 Evaluation Proxy</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Systems Status */}
          <div className="space-y-2.5">
            <div className="text-xs font-semibold text-neutral-200 uppercase tracking-wider">
              API Diagnostics
            </div>
            <div className="bg-neutral-950 border border-neutral-900 rounded-xl p-3.5 font-mono text-[11px] space-y-1.5 text-neutral-400">
              <div className="flex justify-between">
                <span>Latency</span>
                <span className="text-neutral-200">~18ms</span>
              </div>
              <div className="flex justify-between">
                <span>Telemetry Rate</span>
                <span className="text-neutral-200">0.5 Hz (Throttled)</span>
              </div>
              <div className="flex justify-between">
                <span>Model Engine</span>
                <span className="text-cyan-400">gemini-3.8-flash</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-900/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-400">
          <div>
            © {new Date().getFullYear()} Interview Pro AI. Production-grade interview intelligence.
          </div>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <a href="#privacy" className="hover:text-neutral-400">Privacy Policy</a>
            <a href="#terms" className="hover:text-neutral-400">Terms of Service</a>
            <a href="#security" className="hover:text-neutral-400">Data Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
