import { apiRequest } from './api';
import { InterviewConfig, DifficultyLevel } from '../types';

export interface StartInterviewPayload {
  role: string;
  difficulty: string;
  skills: string[];
  questions: string[];
}

export interface StartInterviewResponse {
  interview_id?: string;
  id?: string;
  role: string;
  difficulty: string;
  skills: string[];
  questions: string[];
  status?: string;
}

export const interviewService = {
  async startInterview(payload: StartInterviewPayload): Promise<StartInterviewResponse> {
    return apiRequest<StartInterviewResponse>(
      '/interview/start',
      {
        method: 'POST',
        body: JSON.stringify(payload),
      },
      // Intelligent fallback simulator if local FastAPI is offline
      () => ({
        interview_id: `int_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        id: `int_${Date.now()}`,
        role: payload.role,
        difficulty: payload.difficulty,
        skills: payload.skills,
        questions: payload.questions,
        status: 'active',
      })
    );
  },

  getDefaultQuestions(role: string, difficulty: DifficultyLevel): string[] {
    const questionBank: Record<string, string[]> = {
      'Frontend Engineer': [
        'Can you explain how the React reconciliation algorithm and Virtual DOM work under the hood?',
        'How would you diagnose and resolve a severe layout thrashing or render-blocking performance issue on a large web application?',
        'Describe your approach to state management in complex client-side applications. When do you choose local state versus server cache versus global stores?',
        'How do you ensure accessibility (WCAG 2.1 AA) and resilient keyboard navigation across custom component libraries?'
      ],
      'Full Stack Engineer': [
        'Walk through how you design an idempotent API endpoint that processes financial transactions with high concurrency.',
        'Describe an architecture for handling real-time push notifications across hundreds of thousands of concurrent WebSocket connections.',
        'How do you approach database schema migrations in zero-downtime continuous deployment pipelines?',
        'Explain how you balance client-side rendering with server-side rendering or edge hydration for optimal Core Web Vitals.'
      ],
      'Backend Engineer': [
        'Explain how you would architect a globally distributed rate limiter that avoids race conditions across multiple clusters.',
        'How do you mitigate database connection pool starvation under extreme traffic spikes in microservice architectures?',
        'Compare optimistic locking with pessimistic locking in PostgreSQL, including when each is appropriate.',
        'Walk through your incident response protocol when a critical service begins throwing intermittent 504 Gateway Timeouts.'
      ],
      'Machine Learning Engineer': [
        'How do you detect and remediate model drift, data distribution shift, and latency degradation in production inference pipelines?',
        'Explain the architectural tradeoffs between quantization, distillation, and speculative decoding for low-latency LLM serving.',
        'Describe your approach to evaluating RAG (Retrieval-Augmented Generation) pipelines for retrieval precision and hallucination prevention.',
        'How do you manage training reproducibility across distributed GPU nodes with mixed precision?'
      ],
      'System Design / Architect': [
        'Design a high-throughput, low-latency metrics aggregation system capable of ingesting 10 million events per second.',
        'How would you architect a fault-tolerant multi-region failover strategy with active-active databases and eventual consistency?',
        'Explain the CAP theorem tradeoffs when selecting between DynamoDB, CockroachDB, and Redis for a global gaming leaderboard.',
        'How do you prevent cascading failures and manage circuit breaking in asynchronous event-driven architectures?'
      ],
      'Product Manager': [
        'How do you prioritize technical debt against high-impact user-facing feature requests when engineering capacity is constrained?',
        'Describe a time when quantitative product telemetry contradicted qualitative customer feedback. How did you decide what to ship?',
        'Walk me through how you construct a north star metric and guardrail metrics for a new generative AI product feature.',
        'How do you run post-launch retrospectives when an experiment yields statistically neutral results?'
      ]
    };

    const matchingKey = Object.keys(questionBank).find(k => role.toLowerCase().includes(k.toLowerCase().split(' ')[0])) || 'Full Stack Engineer';
    return questionBank[matchingKey] || questionBank['Full Stack Engineer'];
  }
};
