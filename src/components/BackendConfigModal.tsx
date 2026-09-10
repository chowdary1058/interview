import React, { useState, useEffect } from 'react';
import { getApiBaseUrl, setApiBaseUrl, checkBackendHealth } from '../services/api';
import { X, Server, CheckCircle2, AlertCircle, RefreshCw, ExternalLink } from 'lucide-react';

interface BackendConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStatusChange?: (isOnline: boolean) => void;
}

export const BackendConfigModal: React.FC<BackendConfigModalProps> = ({
  isOpen,
  onClose,
  onStatusChange,
}) => {
  const [url, setUrl] = useState(getApiBaseUrl());
  const [testing, setTesting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'offline'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      setUrl(getApiBaseUrl());
      testConnection(getApiBaseUrl());
    }
  }, [isOpen]);

  const testConnection = async (targetUrl: string) => {
    setTesting(true);
    setMessage('Pinging FastAPI backend...');
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      const res = await fetch(`${targetUrl.replace(/\/$/, '')}/docs`, {
        method: 'GET',
        signal: controller.signal,
        mode: 'cors'
      }).catch(() => null);
      clearTimeout(timeoutId);

      if (res && (res.ok || res.status < 500)) {
        setStatus('success');
        setMessage('FastAPI backend is online and responding.');
        if (onStatusChange) onStatusChange(true);
      } else {
        setStatus('offline');
        setMessage('Backend not responding at this URL. Realistic simulation fallback active.');
        if (onStatusChange) onStatusChange(false);
      }
    } catch {
      setStatus('offline');
      setMessage('Cannot connect to backend. Realistic simulation fallback active.');
      if (onStatusChange) onStatusChange(false);
    } finally {
      setTesting(false);
    }
  };

  const handleSave = () => {
    setApiBaseUrl(url);
    testConnection(url);
    setTimeout(() => {
      onClose();
    }, 400);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg bg-[#0c0e14] border border-neutral-800 rounded-2xl p-6 shadow-2xl text-neutral-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800/60 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">FastAPI Backend Gateway</h3>
            <p className="text-xs text-neutral-400">Configure or verify the FastAPI service URL</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
              API Base URL (VITE_API_BASE_URL)
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="http://localhost:8000"
                className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-neutral-100 focus:outline-none focus:border-blue-500 transition-colors font-mono"
              />
              <button
                type="button"
                onClick={() => testConnection(url)}
                disabled={testing}
                className="px-3.5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium flex items-center space-x-1.5 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin' : ''}`} />
                <span>Test</span>
              </button>
            </div>
          </div>

          <div className={`p-3.5 rounded-xl border text-xs flex items-start space-x-2.5 ${
            status === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
              : status === 'offline'
              ? 'bg-amber-500/10 border-amber-500/20 text-amber-300'
              : 'bg-neutral-900 border-neutral-800 text-neutral-400'
          }`}>
            {status === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <div className="font-semibold">
                {status === 'success' ? 'Connected to FastAPI Backend' : 'Simulation Mode Active'}
              </div>
              <p className="text-neutral-400 leading-relaxed">{message}</p>
            </div>
          </div>

          <div className="bg-neutral-950/60 border border-neutral-900 rounded-xl p-3 text-xs space-y-1.5">
            <div className="text-neutral-400 font-medium">Mapped Endpoints:</div>
            <div className="grid grid-cols-2 gap-1 font-mono text-[11px] text-neutral-300">
              <span>• POST /interview/start</span>
              <span>• POST /speech/transcribe</span>
              <span>• POST /emotion/detect</span>
              <span>• POST /monitor/live</span>
              <span>• POST /analysis/analyze</span>
              <span>• POST /scoring/calculate</span>
              <span>• GET /report/</span>
              <span>• GET /resume/</span>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-800/60 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 transition-colors"
            >
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
