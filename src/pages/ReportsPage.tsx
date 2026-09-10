import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { reportService } from '../services/reportService';
import { InterviewReport } from '../types';
import {
  FileText,
  Clock,
  ChevronRight,
  TrendingUp,
  Award,
  ArrowRight,
  Sparkles,
  Search
} from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const [reports, setReports] = useState<InterviewReport[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    // Check backend GET /report/ while retrieving persistent records
    reportService.fetchBackendReportSummary().catch(() => {});
    setReports(reportService.getAllReports());
  }, []);

  const filteredReports = reports.filter(r =>
    r.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.difficulty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.recommendation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050608] text-neutral-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-900 pb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 mb-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>PERFORMANCE ARCHIVES</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Interview Evaluation Reports
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Comprehensive telemetry dossiers generated from your live AI interview simulations.
            </p>
          </div>

          <Link
            to="/interview/create"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-xs font-semibold text-white shadow-lg shadow-blue-500/25 flex items-center space-x-1.5 transition-all self-start sm:self-auto"
          >
            <span>New Practice Session</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Search & Filter bar */}
        <div className="flex items-center space-x-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by role, seniority, or recommendation..."
              className="w-full bg-[#080a0f] border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-neutral-200 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
          <span className="text-xs text-neutral-500 font-mono">
            Showing {filteredReports.length} {filteredReports.length === 1 ? 'Report' : 'Reports'}
          </span>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-[#080a0f] border border-neutral-850 rounded-2xl p-6 shadow-xl space-y-4 hover:border-neutral-750 transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-neutral-900 border border-neutral-800 text-cyan-300">
                    {report.difficulty} Tier
                  </span>
                  <div className="flex items-center space-x-1.5 text-xs text-neutral-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {report.role}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {report.skills.slice(0, 4).map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-850 text-[10px] text-neutral-400"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-900 text-xs">
                  <div className="space-y-0.5">
                    <div className="text-[10px] text-neutral-500 uppercase tracking-wider">
                      Verdict
                    </div>
                    <div className={`font-bold ${
                      report.recommendation.includes('Strong')
                        ? 'text-emerald-400'
                        : 'text-blue-400'
                    }`}>
                      {report.recommendation}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-black font-mono text-cyan-400">
                      {report.overallScore}
                    </div>
                    <div className="text-[9px] text-neutral-500 uppercase">Composite</div>
                  </div>
                </div>

                <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                  {report.summaryFeedback}
                </p>
              </div>

              <div className="pt-2 border-t border-neutral-900/80 flex items-center justify-between">
                <span className="text-[11px] text-neutral-500 font-mono">
                  {report.questionsCount} Questions • {report.durationMinutes} min session
                </span>

                <Link
                  to={`/reports/${report.id}`}
                  className="px-4 py-2 rounded-xl bg-neutral-850 hover:bg-neutral-800 border border-neutral-750 text-xs font-semibold text-white flex items-center space-x-1 transition-colors"
                >
                  <span>Full Analysis</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
