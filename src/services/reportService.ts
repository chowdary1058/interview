import { apiRequest } from './api';
import { InterviewReport } from '../types';

const LOCAL_STORAGE_REPORTS_KEY = 'interview_pro_reports_history';

// Seed sample historical reports so user can immediately inspect rich analytics
const DEFAULT_INITIAL_REPORTS: InterviewReport[] = [
  {
    id: 'rep_1741589001',
    role: 'Senior Full-Stack Engineer',
    difficulty: 'Senior',
    skills: ['React', 'Node.js', 'System Design', 'PostgreSQL'],
    overallScore: 89,
    recommendation: 'Strong Hire',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    durationMinutes: 24,
    questionsCount: 4,
    breakdown: {
      answerQuality: 91,
      confidence: 88,
      attention: 92,
      speaking: 86,
      emotionStability: 89,
      technicalDepth: 88,
    },
    questionResults: [
      {
        questionIndex: 1,
        question: 'Walk through how you design an idempotent API endpoint that processes financial transactions with high concurrency.',
        transcription: 'I utilize unique idempotency keys stored in an atomic Redis cache with a short TTL. When a request arrives, we execute a SETNX check. If the key exists, we immediately return the cached processing status or completed transaction payload. For the database tier, we use optimistic locking with version numbers.',
        audioDurationSeconds: 42,
        emotion: {
          dominant_emotion: 'confident',
          emotion_scores: { confident: 0.92, calm: 0.85, neutral: 0.70 }
        },
        monitoringSamples: [],
        analysis: {
          word_count: 58,
          filler_words: ['basically'],
          speaking_score: 88,
          confidence_score: 92,
          dominant_emotion: 'confident',
        },
        evaluation: {
          relevance: 94,
          correctness: 92,
          completeness: 89,
          clarity: 93,
          technicalDepth: 90,
          communication: 91,
          overallScore: 92,
          summary: 'Exemplary architectural understanding of distributed locking and database consistency.',
          strengths: ['Clear use of Redis SETNX pattern', 'Optimistic concurrency control addressed'],
          weaknesses: ['Could briefly touch on distributed two-phase commit edge cases'],
          modelAnswerHighlights: ['Mention dead-letter queue recovery and reconciliation jobs'],
        },
        recordedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      },
      {
        questionIndex: 2,
        question: 'Describe an architecture for handling real-time push notifications across hundreds of thousands of concurrent WebSocket connections.',
        transcription: 'We scale horizontal WebSocket server nodes behind an ALB using sticky sessions or Redis Pub/Sub backplane. The nodes maintain lightweight persistent TCP connections, while an asynchronous event broker routes messages based on client channel subscriptions.',
        audioDurationSeconds: 38,
        emotion: {
          dominant_emotion: 'focused',
          emotion_scores: { focused: 0.94, confident: 0.86, calm: 0.81 }
        },
        monitoringSamples: [],
        analysis: {
          word_count: 48,
          filler_words: [],
          speaking_score: 92,
          confidence_score: 89,
          dominant_emotion: 'focused',
        },
        evaluation: {
          relevance: 91,
          correctness: 89,
          completeness: 87,
          clarity: 92,
          technicalDepth: 88,
          communication: 90,
          overallScore: 89,
          summary: 'Solid comprehension of pub/sub fanout and connection termination handling.',
          strengths: ['Concise explanation of the Redis pub/sub backplane', 'Zero filler words'],
          weaknesses: ['Could detail heartbeat and reconnect backoff strategy'],
          modelAnswerHighlights: ['Explain backpressure and socket ping/pong health monitoring'],
        },
        recordedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      }
    ],
    summaryFeedback: 'Exceptional communication with crisp technical clarity and confident behavioral poise throughout all questions.',
    keyStrengths: [
      'Crisp architectural explanations with precise terminology',
      'High eye contact consistency (94% on average) and calm vocal posture',
      'Zero nervous pauses or excessive filler expressions'
    ],
    improvementAreas: [
      'Incorporate quantitative benchmarking numbers into distributed systems answers',
      'Explicitly discuss disaster recovery scenarios'
    ]
  },
  {
    id: 'rep_1741502400',
    role: 'Staff Machine Learning Engineer',
    difficulty: 'Staff/Lead',
    skills: ['LLMs', 'PyTorch', 'Distributed Systems', 'MLOps'],
    overallScore: 84,
    recommendation: 'Hire / High Potential',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    durationMinutes: 31,
    questionsCount: 4,
    breakdown: {
      answerQuality: 86,
      confidence: 82,
      attention: 88,
      speaking: 84,
      emotionStability: 85,
      technicalDepth: 93,
    },
    questionResults: [],
    summaryFeedback: 'High technical depth in machine learning pipelines, with very thorough model evaluation strategies.',
    keyStrengths: [
      'Superb understanding of speculative decoding and latency optimization',
      'Disciplined focus on production observability and data quality'
    ],
    improvementAreas: [
      'Pace complex mathematical explanations with periodic summary checkpoints'
    ]
  }
];

export const reportService = {
  // Query backend GET /report/ while supporting client persistence
  async fetchBackendReportSummary(): Promise<any> {
    return apiRequest<any>(
      '/report/',
      { method: 'GET' },
      () => ({
        status: 'ok',
        endpoint: '/report/',
        message: 'FastAPI report summary endpoint active.',
      })
    );
  },

  getAllReports(): InterviewReport[] {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_REPORTS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to parse stored reports', e);
    }
    // Seed defaults
    this.saveReports(DEFAULT_INITIAL_REPORTS);
    return DEFAULT_INITIAL_REPORTS;
  },

  getReportById(id: string): InterviewReport | undefined {
    const reports = this.getAllReports();
    return reports.find(r => r.id === id);
  },

  saveReports(reports: InterviewReport[]): void {
    try {
      localStorage.setItem(LOCAL_STORAGE_REPORTS_KEY, JSON.stringify(reports));
    } catch (e) {
      console.warn('Failed to save reports locally', e);
    }
  },

  addReport(report: InterviewReport): void {
    const reports = this.getAllReports();
    const updated = [report, ...reports.filter(r => r.id !== report.id)];
    this.saveReports(updated);
  }
};
