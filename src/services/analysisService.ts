import { apiRequest } from './api';
import { AnswerAnalysisResponse } from '../types';

export interface AnalyzePayload {
  transcription: string;
  emotion: {
    dominant_emotion: string;
  };
}

export const analysisService = {
  async analyzeAnswer(payload: AnalyzePayload): Promise<AnswerAnalysisResponse> {
    return apiRequest<AnswerAnalysisResponse>(
      '/analysis/analyze',
      {
        method: 'POST',
        body: JSON.stringify(payload),
      },
      // Intelligent fallback simulator
      () => {
        const text = payload.transcription || '';
        const words = text.split(/\s+/).filter(Boolean);
        const wordCount = words.length;

        // Detect common filler words
        const fillerList = ['um', 'uh', 'like', 'you know', 'actually', 'basically', 'sort of'];
        const foundFillers: string[] = [];
        const lower = text.toLowerCase();
        fillerList.forEach(f => {
          const regex = new RegExp(`\\b${f}\\b`, 'g');
          const count = (lower.match(regex) || []).length;
          for (let i = 0; i < count; i++) {
            foundFillers.push(f);
          }
        });

        const fillerPenalty = Math.min(25, foundFillers.length * 3);
        const lengthBonus = wordCount > 30 ? 15 : wordCount > 15 ? 8 : 0;
        const speakingScore = Math.min(98, Math.max(65, 82 - fillerPenalty + lengthBonus));
        const confidenceScore = Math.min(99, Math.max(70, 86 - (foundFillers.length * 2)));

        return {
          word_count: wordCount,
          filler_words: foundFillers,
          speaking_score: speakingScore,
          confidence_score: confidenceScore,
          dominant_emotion: payload.emotion?.dominant_emotion || 'confident',
        };
      }
    );
  }
};
