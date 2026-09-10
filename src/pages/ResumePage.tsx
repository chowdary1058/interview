import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { resumeService, ResumeStatusResponse } from '../services/resumeService';
import {
  FileText,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  FileCheck
} from 'lucide-react';

export const ResumePage: React.FC = () => {
  const [backendStatus, setBackendStatus] = useState<ResumeStatusResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  useEffect(() => {
    resumeService.getResumeStatus()
      .then((res) => {
        setBackendStatus(res);
      })
      .catch((e) => {
        console.warn('Backend resume status error', e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-[#050608] text-neutral-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="space-y-2 border-b border-neutral-900 pb-6">
          <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>RESUME INGESTION & MATCHING GATEWAY</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Resume Intelligence Interface
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400">
            Connect your engineering resume to calibrate role difficulty and generate custom-tailored interview inquiries.
          </p>
        </div>

        {/* Backend Connectivity Status Box */}
        <div className="bg-[#080a0f] border border-neutral-850 rounded-2xl p-4 sm:p-5 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white flex items-center space-x-2">
                <span>FastAPI Service Endpoint:</span>
                <span className="font-mono text-cyan-300">GET /resume/</span>
              </div>
              <p className="text-neutral-400 text-[11px] mt-0.5">
                {backendStatus?.message || 'Resume service gateway is operational and ready for schema parsing.'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 font-mono text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Connected</span>
          </div>
        </div>

        {/* Drag and Drop Zone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-3xl p-10 text-center transition-all cursor-pointer relative bg-[#080a0f] ${
            isDragging
              ? 'border-cyan-400 bg-cyan-500/5'
              : 'border-neutral-800 hover:border-neutral-700'
          }`}
        >
          <input
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />

          <div className="max-w-md mx-auto space-y-4 pointer-events-none">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-blue-600/20 to-cyan-400/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
              <UploadCloud className="w-7 h-7" />
            </div>

            {uploadedFile ? (
              <div className="space-y-1">
                <div className="text-sm font-bold text-emerald-400 flex items-center justify-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Resume Attached: {uploadedFile.name}</span>
                </div>
                <div className="text-xs text-neutral-400 font-mono">
                  {(uploadedFile.size / 1024).toFixed(1)} KB • Ready for extraction
                </div>
              </div>
            ) : (
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">
                  Drop your resume here, or <span className="text-cyan-400">browse files</span>
                </h3>
                <p className="text-xs text-neutral-400">
                  Supports PDF, DOCX, or TXT up to 10MB.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Informative Note regarding backend functionality */}
        <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs text-neutral-400 leading-relaxed space-y-1">
          <div className="font-semibold text-neutral-300 flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Architecture Notice</span>
          </div>
          <p>
            The platform connects directly with the backend <code className="text-neutral-300 font-mono">GET /resume/</code> route. As your FastAPI backend is expanded with full NLP parsing pipelines, this view will automatically hydrate candidate experience timelines and match personalized interview prompts.
          </p>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-2">
          <Link
            to="/interview/create"
            className="px-6 py-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-blue-500/20 flex items-center space-x-2 transition-all"
          >
            <span>Configure Interview From Profile</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
