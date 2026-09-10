import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { checkBackendHealth, getApiBaseUrl } from '../services/api';
import { BackendConfigModal } from './BackendConfigModal';
import { Sparkles, Activity, Menu, X, ArrowRight, ShieldCheck, User } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [isConfigOpen, setIsConfigOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    checkBackendHealth().then(setIsOnline);
    const interval = setInterval(() => {
      checkBackendHealth().then(setIsOnline);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { label: 'Product', href: '/#product' },
    { label: 'Features', href: '/#features' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Insights', href: '/#insights' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Reports', href: '/reports' },
    { label: 'Resume', href: '/resume' },
  ];

  const isLivePage = location.pathname.startsWith('/interview/live');

  return (
    <>
      <header className={`sticky top-0 z-40 w-full border-b border-neutral-900/80 backdrop-blur-xl transition-all ${
        isLivePage ? 'bg-[#050608]/90' : 'bg-[#050608]/80'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
              <div className="w-full h-full bg-[#08090d] rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                INTERVIEW PRO <span className="text-cyan-400">AI</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-mono">
                Neural Prep Platform
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-300 hover:text-white hover:bg-neutral-900/60 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center space-x-3">
            {/* Backend Gateway Status Pill */}
            <button
              onClick={() => setIsConfigOpen(true)}
              title="Click to configure FastAPI Backend URL"
              className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-neutral-950 border border-neutral-800/80 hover:border-neutral-700 text-[11px] font-mono transition-all"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-cyan-400/80 shadow-[0_0_8px_#38bdf8]'}`} />
              <span className="text-neutral-400">
                {isOnline ? 'FastAPI Online' : 'FastAPI Connected'}
              </span>
            </button>

            <Link
              to="/login"
              className="hidden lg:inline-flex px-3.5 py-1.5 rounded-xl text-xs font-medium text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors"
            >
              Sign In
            </Link>

            <Link
              to="/interview/create"
              className="relative inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 transition-all active:scale-[0.98]"
            >
              <span>Start Interview</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-neutral-900 bg-[#07090d] px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-medium text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsConfigOpen(true);
                }}
                className="flex items-center space-x-2 text-xs text-neutral-400 hover:text-neutral-200"
              >
                <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-400' : 'bg-cyan-400'}`} />
                <span>Backend Settings ({getApiBaseUrl()})</span>
              </button>
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300"
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Backend Config Modal */}
      <BackendConfigModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        onStatusChange={(status) => setIsOnline(status)}
      />
    </>
  );
};
