import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { CreateInterviewPage } from './pages/CreateInterviewPage';
import { LiveInterviewPage } from './pages/LiveInterviewPage';
import { InterviewCompletePage } from './pages/InterviewCompletePage';
import { ReportsPage } from './pages/ReportsPage';
import { ReportDetailPage } from './pages/ReportDetailPage';
import { ResumePage } from './pages/ResumePage';
import { AuthPages } from './pages/AuthPages';

// Layout wrapper to conditionally hide Navbar & Footer on Live Interview screen
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isLiveInterview = location.pathname.startsWith('/interview/live');

  return (
    <div className="min-h-screen bg-[#050608] text-neutral-100 flex flex-col font-sans selection:bg-cyan-500/25 selection:text-cyan-200">
      {!isLiveInterview && <Navbar />}
      <div className="flex-1">{children}</div>
      {!isLiveInterview && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/interview/create" element={<CreateInterviewPage />} />
          <Route path="/interview/live" element={<LiveInterviewPage />} />
          <Route path="/interview/complete" element={<InterviewCompletePage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/reports/:id" element={<ReportDetailPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/login" element={<AuthPages initialMode="login" />} />
          <Route path="/register" element={<AuthPages initialMode="register" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
