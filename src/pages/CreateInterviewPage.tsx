import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { interviewService } from '../services/interviewService';
import { DifficultyLevel } from '../types';
import {
  Sparkles,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RefreshCw,
  Cpu,
  Layers,
  HelpCircle
} from 'lucide-react';

const COMMON_ROLES = [
  'Frontend Engineer',
  'Full Stack Engineer',
  'Backend Engineer',
  'Machine Learning Engineer',
  'System Design / Architect',
  'Product Manager',
];

const DIFFICULTY_LEVELS: DifficultyLevel[] = ['Entry', 'Junior', 'Mid-level', 'Senior', 'Staff/Lead'];

const SUGGESTED_SKILLS: Record<string, string[]> = {
  'Frontend Engineer': ['React', 'TypeScript', 'Web Performance', 'Accessibility (a11y)', 'State Management', 'CSS Architecture'],
  'Full Stack Engineer': ['React', 'Node.js', 'PostgreSQL', 'REST & GraphQL APIs', 'Docker', 'System Architecture'],
  'Backend Engineer': ['Distributed Systems', 'Go / Node.js', 'PostgreSQL', 'Redis', 'Kafka', 'Microservices', 'Concurrency'],
  'Machine Learning Engineer': ['PyTorch', 'LLM Fine-Tuning', 'MLOps', 'Vector Databases', 'Transformer Architecture', 'Inference Optimization'],
  'System Design / Architect': ['High Availability', 'Sharding & Replication', 'Event-Driven Architecture', 'Cap Theorem', 'Caching Strategies'],
  'Product Manager': ['Roadmapping', 'User Research', 'A/B Testing', 'Data Metrics', 'Technical Empathy'],
};

export const CreateInterviewPage: React.FC = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState<string>('Full Stack Engineer');
  const [customRole, setCustomRole] = useState<string>('');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Senior');
  const [skills, setSkills] = useState<string[]>(['React', 'Node.js', 'PostgreSQL', 'System Architecture']);
  const [newSkillInput, setNewSkillInput] = useState<string>('');
  const [questions, setQuestions] = useState<string[]>([]);
  const [newQuestionInput, setNewQuestionInput] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Sync questions when role or difficulty changes
  useEffect(() => {
    const activeRole = role === 'Custom' ? customRole || 'Software Engineer' : role;
    const defaultQs = interviewService.getDefaultQuestions(activeRole, difficulty);
    setQuestions(defaultQs);

    // Update skills suggestions
    if (SUGGESTED_SKILLS[activeRole]) {
      setSkills(SUGGESTED_SKILLS[activeRole].slice(0, 4));
    }
  }, [role, difficulty]);

  const activeRoleName = role === 'Custom' ? customRole.trim() : role;

  const handleAddSkill = () => {
    if (newSkillInput.trim() && !skills.includes(newSkillInput.trim())) {
      setSkills([...skills, newSkillInput.trim()]);
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleAddQuestion = () => {
    if (newQuestionInput.trim()) {
      setQuestions([...questions, newQuestionInput.trim()]);
      setNewQuestionInput('');
    }
  };

  const handleRemoveQuestion = (idx: number) => {
    setQuestions(questions.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!activeRoleName) {
      setError('Please select or specify a target engineering role.');
      return;
    }
    if (skills.length === 0) {
      setError('Please add at least one technical or domain skill.');
      return;
    }
    if (questions.length === 0) {
      setError('Please include at least one interview question to practice.');
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        role: activeRoleName,
        difficulty,
        skills,
        questions,
      };

      const res = await interviewService.startInterview(payload);

      // Save configured interview session into sessionStorage for the live runner
      const sessionConfig = {
        id: res.interview_id || res.id || `session_${Date.now()}`,
        role: activeRoleName,
        difficulty,
        skills,
        questions,
        createdAt: new Date().toISOString(),
      };

      sessionStorage.setItem('current_interview_session', JSON.stringify(sessionConfig));

      // Route to live interview screen
      navigate('/interview/live');
    } catch (err: any) {
      console.error('Failed to start interview:', err);
      setError(err?.message || 'Failed to start interview. Please check your backend connection or try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050608] text-neutral-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="space-y-2 border-b border-neutral-900 pb-6">
          <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>INTERVIEW CONFIGURATION PROTOCOL</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Configure Live AI Interview
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400">
            Customize target role, seniority level, and technical questions evaluated by our multi-modal neural engines.
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Role Selection */}
          <div className="bg-[#080a0f] border border-neutral-850 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Target Role</span>
              </label>
              <span className="text-xs text-neutral-400">Step 1 of 4</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {COMMON_ROLES.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`p-3 rounded-xl border text-xs font-medium text-left transition-all ${
                    role === r
                      ? 'bg-blue-600/15 border-blue-500 text-white shadow-md shadow-blue-500/10'
                      : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                  }`}
                >
                  {r}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setRole('Custom')}
                className={`p-3 rounded-xl border text-xs font-medium text-left transition-all ${
                  role === 'Custom'
                    ? 'bg-blue-600/15 border-blue-500 text-white shadow-md shadow-blue-500/10'
                    : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                }`}
              >
                + Custom Role...
              </button>
            </div>

            {role === 'Custom' && (
              <input
                type="text"
                value={customRole}
                onChange={(e) => setCustomRole(e.target.value)}
                placeholder="e.g. Lead DevOps Engineer / Site Reliability Architect"
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-100 focus:outline-none focus:border-blue-500 transition-colors"
                autoFocus
              />
            )}
          </div>

          {/* Section 2: Difficulty Level */}
          <div className="bg-[#080a0f] border border-neutral-850 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                <span>Difficulty / Seniority Tier</span>
              </label>
              <span className="text-xs text-neutral-400">Step 2 of 4</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {DIFFICULTY_LEVELS.map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setDifficulty(lvl)}
                  className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                    difficulty === lvl
                      ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md shadow-indigo-500/15'
                      : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Technical Skills Focus */}
          <div className="bg-[#080a0f] border border-neutral-850 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Core Competencies & Skills</span>
              </label>
              <span className="text-xs text-neutral-400">Step 3 of 4</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-200 flex items-center space-x-2 group hover:border-red-500/40"
                >
                  <span>{s}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(s)}
                    className="text-neutral-500 hover:text-red-400 transition-colors"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <input
                type="text"
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
                placeholder="Add skill tag (e.g. Kubernetes, WebSockets, Kafka)..."
                className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-neutral-100 focus:outline-none focus:border-cyan-400 transition-colors"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-xs font-semibold text-neutral-200 transition-colors flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Section 4: Questions Sequence */}
          <div className="bg-[#080a0f] border border-neutral-850 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                <HelpCircle className="w-4 h-4 text-purple-400" />
                <span>Interview Questions ({questions.length})</span>
              </label>
              <span className="text-xs text-neutral-400">Step 4 of 4</span>
            </div>

            <div className="space-y-3">
              {questions.map((q, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-start justify-between gap-3 text-xs leading-relaxed group"
                >
                  <div className="flex items-start space-x-3">
                    <span className="font-mono text-cyan-400 font-bold shrink-0 mt-0.5">
                      Q{idx + 1}
                    </span>
                    <span className="text-neutral-200">{q}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveQuestion(idx)}
                    className="text-neutral-500 hover:text-red-400 transition-colors p-1 opacity-60 group-hover:opacity-100"
                    title="Remove question"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <input
                type="text"
                value={newQuestionInput}
                onChange={(e) => setNewQuestionInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddQuestion();
                  }
                }}
                placeholder="Type custom technical question..."
                className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-neutral-100 focus:outline-none focus:border-purple-400 transition-colors"
              />
              <button
                type="button"
                onClick={handleAddQuestion}
                className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-xs font-semibold text-neutral-200 transition-colors flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Question</span>
              </button>
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex items-center justify-end space-x-4 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-xl shadow-blue-500/25 disabled:opacity-60 transition-all flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Negotiating with FastAPI Backend...</span>
                </>
              ) : (
                <>
                  <span>Begin Live AI Interview</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
