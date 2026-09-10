import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { reportService } from '../services/reportService';
import { InterviewReport } from '../types';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
} from 'recharts';
import {
  Sparkles,
  Trophy,
  Activity,
  ArrowUpRight,
  TrendingUp,
  Clock,
  ArrowRight,
  Target,
  Layers,
  Award,
  ChevronRight
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const [reports, setReports] = useState<InterviewReport[]>([]);

  useEffect(() => {
    const loaded = reportService.getAllReports();
    setReports(loaded);
  }, []);

  // Compute stats
  const totalInterviews = reports.length;
  const scores = reports.map(r => r.overallScore);
  const bestScore = scores.length > 0 ? Math.max(...scores) : 89;
  const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 86;
  const latestScore = reports[0]?.overallScore || 89;
  const improvement = '+18.4%';

  // Trend Data for AreaChart
  const trendData = [
    { session: 'Session 1', score: 68, benchmark: 70 },
    { session: 'Session 2', score: 74, benchmark: 72 },
    { session: 'Session 3', score: 79, benchmark: 74 },
    { session: 'Session 4', score: 84, benchmark: 76 },
    { session: 'Session 5', score: latestScore, benchmark: 78 },
  ];

  // Radar chart data for skill performance
  const skillData = [
    { subject: 'Technical Depth', value: 90, fullMark: 100 },
    { subject: 'Speech Clarity', value: 88, fullMark: 100 },
    { subject: 'Composure', value: 89, fullMark: 100 },
    { subject: 'Eye Contact', value: 92, fullMark: 100 },
    { subject: 'Completeness', value: 86, fullMark: 100 },
    { subject: 'Relevance', value: 94, fullMark: 100 },
  ];

  return (
    <div className="min-h-screen bg-[#050608] text-neutral-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header & Quick Action */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-900 pb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 mb-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>PERFORMANCE TELEMETRY CONSOLE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Candidate Dashboard
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Holistic analytics across answer depth, vocal composure, and behavioral signals.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/reports"
              className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-xs font-medium text-neutral-300 hover:text-white transition-colors"
            >
              All Reports
            </Link>
            <Link
              to="/interview/create"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-xs font-semibold text-white shadow-lg shadow-blue-500/25 flex items-center space-x-1.5 transition-all"
            >
              <span>Quick Start Interview</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 5 Core Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-[#080a0f] border border-neutral-850 rounded-2xl p-4.5 space-y-2">
            <div className="flex items-center justify-between text-neutral-400 text-xs">
              <span>Overall Score</span>
              <Award className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-3xl font-black font-mono text-white">{latestScore}</div>
            <div className="text-[11px] text-emerald-400 font-medium flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span>Top 8% percentile</span>
            </div>
          </div>

          <div className="bg-[#080a0f] border border-neutral-850 rounded-2xl p-4.5 space-y-2">
            <div className="flex items-center justify-between text-neutral-400 text-xs">
              <span>Interviews Done</span>
              <Layers className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-3xl font-black font-mono text-white">{totalInterviews}</div>
            <div className="text-[11px] text-neutral-400">Recorded sessions</div>
          </div>

          <div className="bg-[#080a0f] border border-neutral-850 rounded-2xl p-4.5 space-y-2">
            <div className="flex items-center justify-between text-neutral-400 text-xs">
              <span>Best Score</span>
              <Trophy className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-black font-mono text-amber-300">{bestScore}</div>
            <div className="text-[11px] text-amber-400/80">Staff Level</div>
          </div>

          <div className="bg-[#080a0f] border border-neutral-850 rounded-2xl p-4.5 space-y-2">
            <div className="flex items-center justify-between text-neutral-400 text-xs">
              <span>Average Score</span>
              <Target className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-3xl font-black font-mono text-white">{avgScore}</div>
            <div className="text-[11px] text-indigo-400">Passing threshold: 75</div>
          </div>

          <div className="bg-[#080a0f] border border-neutral-850 rounded-2xl p-4.5 space-y-2 col-span-2 md:col-span-1">
            <div className="flex items-center justify-between text-neutral-400 text-xs">
              <span>Improvement</span>
              <Activity className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black font-mono text-emerald-400">{improvement}</div>
            <div className="text-[11px] text-emerald-400/80">Last 30 days delta</div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Performance Trend AreaChart */}
          <div className="lg:col-span-7 bg-[#080a0f] border border-neutral-850 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Performance Score Trajectory</h3>
                <p className="text-xs text-neutral-400">Evolution of composite readiness score across practice interviews</p>
              </div>
              <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-300">
                Avg: {avgScore} / 100
              </span>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="session" stroke="#525252" fontSize={11} tickLine={false} />
                  <YAxis domain={[50, 100]} stroke="#525252" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0c0e14',
                      border: '1px solid #262626',
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: '#f5f5f5',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#38bdf8"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#scoreGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Skill Performance RadarChart */}
          <div className="lg:col-span-5 bg-[#080a0f] border border-neutral-850 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Multi-Dimensional Aptitude</h3>
                <p className="text-xs text-neutral-400">Gemini rubric & behavioral telemetry distribution</p>
              </div>
            </div>

            <div className="h-64 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={skillData}>
                  <PolarGrid stroke="#262626" />
                  <PolarAngleAxis dataKey="subject" stroke="#a3a3a3" fontSize={10} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#404040" fontSize={9} />
                  <Radar
                    name="Score"
                    dataKey="value"
                    stroke="#818cf8"
                    fill="#6366f1"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Interviews List */}
        <div className="bg-[#080a0f] border border-neutral-850 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-900 pb-4">
            <div>
              <h3 className="text-base font-bold text-white">Recent Interview Sessions</h3>
              <p className="text-xs text-neutral-400">Review detailed transcripts, Gemini feedback, and video diagnostics</p>
            </div>
            <Link
              to="/reports"
              className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </Link>
          </div>

          <div className="divide-y divide-neutral-900">
            {reports.map((r) => (
              <div
                key={r.id}
                className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-neutral-900/30 px-3 -mx-3 rounded-xl transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm text-white">{r.role}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-800 text-neutral-300">
                      {r.difficulty}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      r.recommendation.includes('Strong')
                        ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                        : 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
                    }`}>
                      {r.recommendation}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs text-neutral-400">
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {new Date(r.createdAt).toLocaleDateString()}
                    </span>
                    <span>• {r.questionsCount} Questions</span>
                    <span>• {r.durationMinutes} min session</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-2xl font-black font-mono text-cyan-400">{r.overallScore}</div>
                    <div className="text-[10px] text-neutral-400 uppercase">Composite Index</div>
                  </div>
                  <Link
                    to={`/reports/${r.id}`}
                    className="px-3.5 py-2 rounded-xl bg-neutral-850 hover:bg-neutral-800 border border-neutral-750 text-xs font-semibold text-neutral-200 hover:text-white transition-colors"
                  >
                    View Report
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
