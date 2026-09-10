import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { reportService } from '../services/reportService';
import { InterviewReport } from '../types';
import {
  Trophy,
  Award,
  Sparkles,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Share2,
  RefreshCw,
  Eye,
  Mic,
  Smile,
  ShieldCheck,
  Activity
} from 'lucide-react';

export const InterviewCompletePage: React.FC = () => {
  const navigate = useNavigate();
  const [report, setReport] = useState<InterviewReport | null>(null);
  const [animatedScore, setAnimatedScore] = useState<number>(0);

  useEffect(() => {
    const reportId = sessionStorage.getItem('last_completed_report_id');
    let currentReport: InterviewReport | undefined;

    if (reportId) {
      currentReport = reportService.getReportById(reportId);
    }
    if (!currentReport) {
      const all = reportService.getAllReports();
      currentReport = all[0];
    }

    if (currentReport) {
      setReport(currentReport);
      const target = currentReport.overallScore || 89;

      // Animate counting up to score
      let start = 0;
      const duration = 1400; // ms
      const stepTime = 20;
      const totalSteps = duration / stepTime;
      const stepIncrement = target / totalSteps;

      const timer = setInterval(() => {
        start += stepIncrement;
        if (start >= target) {
          setAnimatedScore(target);
          clearInterval(timer);
        } else {
          setAnimatedScore(Math.floor(start));
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, []);

  if (!report) {
    return (
      <div className="min-h-screen bg-[#050608] text-white flex items-center justify-center p-6">
        <RefreshCw className="w-8 h-8 animate-spin text-cyan-400" />
      </div>
    );
  }

  const { breakdown } = report;

  return (
    <div className="min-h-screen bg-[#040508] text-neutral-100 flex flex-col justify-center py-16 px-4 sm:px-6 relative overflow-hidden">
      {/* Cinematic ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-blue-600/10 via-cyan-500/10 to-transparent blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-2xl mx-auto w-full text-center space-y-8">
        {/* Top Status */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>ALL INTERVIEW MODULES FINALIZED</span>
        </div>

        {/* Headline */}
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
            Interview Complete.
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 max-w-md mx-auto">
            Your performance telemetry across verbal depth, vocal composure, and behavioral signals has been synthesized.
          </p>
        </div>

        {/* Radial Composite Score Card */}
        <div className="bg-[#080a0f] border border-neutral-850 rounded-3xl p-8 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="relative w-36 h-36 mx-auto rounded-full bg-neutral-950 border-4 border-cyan-400/80 flex flex-col items-center justify-center shadow-[0_0_40px_#22d3ee25]">
            <span className="text-5xl font-black font-mono text-white tracking-tight">
              {animatedScore}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400 mt-1">
              Overall Score
            </span>
          </div>

          <div className="space-y-2">
            <div className="inline-block px-4 py-1.5 rounded-full text-sm font-bold bg-blue-500/15 border border-blue-500/30 text-cyan-300">
              {report.recommendation}
            </div>
            <div className="text-xs text-neutral-400">
              Role: <span className="text-white font-medium">{report.role}</span> ({report.difficulty})
            </div>
          </div>

          {/* 5 Core Breakdown Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4 border-t border-neutral-850">
            <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 text-center space-y-1">
              <div className="text-lg font-bold font-mono text-cyan-400">{breakdown.answerQuality}%</div>
              <div className="text-[10px] text-neutral-400">Answer Quality</div>
            </div>
            <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 text-center space-y-1">
              <div className="text-lg font-bold font-mono text-blue-400">{breakdown.confidence}%</div>
              <div className="text-[10px] text-neutral-400">Confidence</div>
            </div>
            <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 text-center space-y-1">
              <div className="text-lg font-bold font-mono text-indigo-400">{breakdown.attention}%</div>
              <div className="text-[10px] text-neutral-400">Attention</div>
            </div>
            <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 text-center space-y-1">
              <div className="text-lg font-bold font-mono text-emerald-400">{breakdown.speaking}%</div>
              <div className="text-[10px] text-neutral-400">Speaking</div>
            </div>
            <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 text-center space-y-1 col-span-2 sm:col-span-1">
              <div className="text-lg font-bold font-mono text-purple-400">{breakdown.emotionStability}%</div>
              <div className="text-[10px] text-neutral-400">Composure</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            to={`/reports/${report.id}`}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-xl shadow-blue-500/25 flex items-center justify-center space-x-2 transition-all"
          >
            <span>View Full Report</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/interview/create"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-semibold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 transition-colors"
          >
            Practice Another Session
          </Link>
        </div>
      </div>
    </div>
  );
};
