export type DifficultyLevel = 'Entry' | 'Junior' | 'Mid-level' | 'Senior' | 'Staff/Lead';

export interface InterviewConfig {
  id: string;
  role: string;
  difficulty: DifficultyLevel;
  skills: string[];
  questions: string[];
  createdAt: string;
}

export interface SpeechTranscribeResponse {
  transcription: string;
  duration?: number;
  confidence?: number;
}

export interface EmotionDetectionResponse {
  dominant_emotion: string;
  emotion_scores: Record<string, number>;
}

export interface HeadPose {
  pitch: number;
  yaw: number;
  roll: number;
}

export interface LiveMonitorResponse {
  emotion: string;
  confidence: number;
  eye_contact: number;
  head_pose: HeadPose;
  attention: number;
  face_detected: boolean;
  timestamp?: number;
}

export interface AnswerAnalysisResponse {
  word_count: number;
  filler_words: string[] | number;
  speaking_score: number;
  confidence_score: number;
  dominant_emotion: string;
}

export interface AnswerEvaluationResponse {
  relevance: number;
  correctness: number;
  completeness: number;
  clarity: number;
  technicalDepth: number;
  communication: number;
  overallScore: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  modelAnswerHighlights: string[];
  isFallback?: boolean;
}

export interface ScoringCalculateResponse {
  overall_score: number;
  recommendation: string;
}

export interface QuestionResult {
  questionIndex: number;
  question: string;
  transcription: string;
  audioDurationSeconds: number;
  emotion: EmotionDetectionResponse;
  monitoringSamples: LiveMonitorResponse[];
  analysis: AnswerAnalysisResponse;
  evaluation: AnswerEvaluationResponse;
  recordedAt: string;
}

export interface InterviewReport {
  id: string;
  role: string;
  difficulty: DifficultyLevel;
  skills: string[];
  overallScore: number;
  recommendation: string;
  createdAt: string;
  durationMinutes: number;
  questionsCount: number;
  breakdown: {
    answerQuality: number;
    confidence: number;
    attention: number;
    speaking: number;
    emotionStability: number;
    technicalDepth: number;
  };
  questionResults: QuestionResult[];
  summaryFeedback: string;
  keyStrengths: string[];
  improvementAreas: string[];
}

export interface BackendStatus {
  baseUrl: string;
  isOnline: boolean;
  lastChecked: string;
  simulationFallback: boolean;
}
