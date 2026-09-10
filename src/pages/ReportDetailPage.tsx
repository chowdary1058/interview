import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { reportService } from '../services/reportService';
import { InterviewReport } from '../types';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Cpu,
  Clock,
  Mic,
  Smile,
  Eye,
  Share2,
  Printer,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const ReportDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<InterviewReport | null>(null);

  useEffect(() => {
    if (id) {
      const found = reportService.getReportById(id);
      if (found) {
        setReport(found);
      } else {
        const all = reportService.getAllReports();
        setReport(all[0] || null);
      }
    }
  }, [id]);

  if (!report) {
    return (
      <div className="min-h-screen bg-[#050608] text-white flex flex-col items-center justify-center p-6 space-y-4">
        <h2 className="text-xl font-bold">Report not found</h2>
        <Link to="/reports" className="text-cyan-400 text-sm hover:underline">
          Return to Reports
        </Link>
      </div>
    );
  }

  const { breakdown } = report;

  const radarData = [
    { subject: 'Answer Quality', value: breakdown.answerQuality, fullMark: 100 },
    { subject: 'Confidence', value: breakdown.confidence, fullMark: 100 },
    { subject: 'Attention', value: breakdown.attention, fullMark: 100 },
    { subject: 'Speaking Clarity', value: breakdown.speaking, fullMark: 100 },
    { subject: 'Composure', value: breakdown.emotionStability, fullMark: 100 },
    { subject: 'Technical Depth', value: breakdown.technicalDepth, fullMark: 100 },
  ];

  const barData = [
    { category: 'Quality', score: breakdown.answerQuality },
    { category: 'Confidence', score: breakdown.confidence },
    { category: 'Attention', score: breakdown.attention },
    { category: 'Speaking', score: breakdown.speaking },
    { category: 'Depth', score: breakdown.technicalDepth },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#050608] text-neutral-100 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation & Header Actions */}
        <div className="flex items-center justify-between border-b border-neutral-900 pb-4">
          <Link
            to="/reports"
            className="flex items-center space-x-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Reports</span>
          </Link>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-xs font-medium text-neutral-300 hover:text-white flex items-center space-x-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Dossier</span>
            </button>
            <Link
              to="/interview/create"
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-xs font-semibold text-white shadow-md shadow-blue-500/25 transition-all"
            >
              Practice Again
            </Link>
          </div>
        </div>

        {/* Executive Summary Card */}
        <div className="bg-[#080a0f] border border-neutral-850 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-neutral-900 border border-neutral-800 text-cyan-300">
                  {report.difficulty} Engineering Tier
                </span>
                <span className="text-xs text-neutral-500 font-mono">
                  Recorded on {new Date(report.createdAt).toLocaleDateString()} • {report.durationMinutes} min session
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {report.role} Evaluation Dossier
              </h1>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                {report.summaryFeedback}
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {report.skills.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-300"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Score Radial Badge */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-neutral-950/70 border border-neutral-800 text-center space-y-3">
              <div className="w-28 h-28 rounded-full border-4 border-cyan-400 bg-neutral-900 flex flex-col items-center justify-center shadow-[0_0_30px_#22d3ee25]">
                <span className="text-4xl font-black font-mono text-white">{report.overallScore}</span>
                <span className="text-[9px] uppercase font-bold text-cyan-400">Score</span>
              </div>
              <div>
                <div className="text-base font-bold text-white">{report.recommendation}</div>
                <div className="text-xs text-neutral-400 mt-0.5">Automated Hiring Index</div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts & Analytical Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Radar Aptitude Chart */}
          <div className="lg:col-span-6 bg-[#080a0f] border border-neutral-850 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Multi-Dimensional Capability Radar</h3>
            <p className="text-xs text-neutral-400">Holistic balance of knowledge depth, vocal clarity, and behavioral poise</p>

            <div className="h-64 w-full flex items-center justify-center pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#262626" />
                  <PolarAngleAxis dataKey="subject" stroke="#a3a3a3" fontSize={11} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#404040" fontSize={9} />
                  <Radar
                    name="Score"
                    dataKey="value"
                    stroke="#38bdf8"
                    fill="#0284c7"
                    fillOpacity={0.35}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart Breakdown */}
          <div className="lg:col-span-6 bg-[#080a0f] border border-neutral-850 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Domain Scoring Breakdown</h3>
            <p className="text-xs text-neutral-400">Aggregated index across individual telemetry channels</p>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="category" stroke="#525252" fontSize={11} tickLine={false} />
                  <YAxis domain={[0, 100]} stroke="#525252" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0c0e14',
                      border: '1px solid #262626',
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: '#f5f5f5',
                    }}
                  />
                  <Bar dataKey="score" fill="#6366f1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Strengths & Weaknesses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#080a0f] border border-neutral-850 rounded-2xl p-6 space-y-4">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5" />
              <span>Demonstrated Strengths</span>
            </div>
            <ul className="space-y-2.5 text-xs text-neutral-300">
              {report.keyStrengths.map((str, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span className="leading-relaxed">{str}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#080a0f] border border-neutral-850 rounded-2xl p-6 space-y-4">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
              <AlertCircle className="w-5 h-5" />
              <span>Actionable Improvement Areas</span>
            </div>
            <ul className="space-y-2.5 text-xs text-neutral-300">
              {report.improvementAreas.map((area, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span className="leading-relaxed">{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Question-by-Question Transcripts & Gemini Feedback */}
        {report.questionResults.length > 0 && (
          <div className="bg-[#080a0f] border border-neutral-850 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-neutral-850 pb-4">
              <h3 className="text-lg font-bold text-white">Question Transcripts & Gemini Evaluations</h3>
              <p className="text-xs text-neutral-400">Granular responses with speech analytics and model answer rubrics</p>
            </div>

            <div className="space-y-8 divide-y divide-neutral-900">
              {report.questionResults.map((qRes, idx) => (
                <div key={idx} className={`space-y-4 ${idx > 0 ? 'pt-8' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-cyan-300 font-mono text-xs font-bold">
                        Question {qRes.questionIndex}
                      </span>
                      <span className="text-xs text-neutral-400 font-mono">
                        {qRes.audioDurationSeconds}s response
                      </span>
                    </div>
                    <span className="font-mono text-sm font-bold text-cyan-400">
                      Score: {qRes.evaluation.overallScore} / 100
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white">
                    &ldquo;{qRes.question}&rdquo;
                  </h4>

                  {/* Transcribed Candidate Answer */}
                  <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 text-xs text-neutral-300 leading-relaxed font-mono">
                    <span className="text-neutral-500 block text-[10px] font-bold uppercase mb-1">
                      Candidate Answer:
                    </span>
                    &ldquo;{qRes.transcription}&rdquo;
                  </div>

                  {/* Evaluation Rubric */}
                  <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20 space-y-3">
                    <div className="flex items-center space-x-2 text-xs font-bold text-purple-300">
                      <Cpu className="w-4 h-4" />
                      <span>Gemini Technical Evaluation</span>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {qRes.evaluation.summary}
                    </p>

                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-1 text-center">
                      <div className="bg-neutral-900/60 p-2 rounded-lg">
                        <div className="text-cyan-400 font-bold font-mono text-xs">{qRes.evaluation.relevance}%</div>
                        <div className="text-[10px] text-neutral-400">Relevance</div>
                      </div>
                      <div className="bg-neutral-900/60 p-2 rounded-lg">
                        <div className="text-blue-400 font-bold font-mono text-xs">{qRes.evaluation.correctness}%</div>
                        <div className="text-[10px] text-neutral-400">Correct</div>
                      </div>
                      <div className="bg-neutral-900/60 p-2 rounded-lg">
                        <div className="text-indigo-400 font-bold font-mono text-xs">{qRes.evaluation.completeness}%</div>
                        <div className="text-[10px] text-neutral-400">Complete</div>
                      </div>
                      <div className="bg-neutral-900/60 p-2 rounded-lg">
                        <div className="text-emerald-400 font-bold font-mono text-xs">{qRes.evaluation.clarity}%</div>
                        <div className="text-[10px] text-neutral-400">Clarity</div>
                      </div>
                      <div className="bg-neutral-900/60 p-2 rounded-lg">
                        <div className="text-purple-400 font-bold font-mono text-xs">{qRes.evaluation.technicalDepth}%</div>
                        <div className="text-[10px] text-neutral-400">Tech Depth</div>
                      </div>
                      <div className="bg-neutral-900/60 p-2 rounded-lg">
                        <div className="text-cyan-400 font-bold font-mono text-xs">{qRes.evaluation.communication}%</div>
                        <div className="text-[10px] text-neutral-400">Communication</div>
                      </div>
                    </div>

                    {qRes.evaluation.modelAnswerHighlights.length > 0 && (
                      <div className="pt-2 border-t border-purple-500/20 text-xs space-y-1">
                        <span className="font-semibold text-purple-200">Recommended Model Highlights:</span>
                        <ul className="list-disc list-inside text-neutral-400 space-y-0.5">
                          {qRes.evaluation.modelAnswerHighlights.map((hl, i) => (
                            <li key={i}>{hl}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
