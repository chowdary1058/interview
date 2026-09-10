import { apiRequest } from './api';
import { ScoringCalculateResponse } from '../types';

export interface ScoringPayload {
  answer_score: number;
  confidence: number;
  attention: number;
  emotion: string;
}

export const scoringService = {
  async calculateScore(payload: ScoringPayload): Promise<ScoringCalculateResponse> {
    return apiRequest<ScoringCalculateResponse>(
      '/scoring/calculate',
      {
        method: 'POST',
        body: JSON.stringify(payload),
      },
      // Intelligent fallback simulator
      () => {
        // Weighted composite calculation:
        // 50% answer quality, 25% confidence, 15% attention, 10% emotion stability
        const emotionBonus = ['confident', 'calm', 'focused'].includes(payload.emotion.toLowerCase()) ? 92 : 78;
        const computed = Math.round(
          payload.answer_score * 0.50 +
          payload.confidence * 0.25 +
          payload.attention * 0.15 +
          emotionBonus * 0.10
        );

        const clampedScore = Math.min(99, Math.max(45, computed));

        let recommendation = 'Needs More Practice';
        if (clampedScore >= 88) {
          recommendation = 'Strong Hire';
        } else if (clampedScore >= 78) {
          recommendation = 'Hire / High Potential';
        } else if (clampedScore >= 68) {
          recommendation = 'Borderline / Follow-up Needed';
        }

        return {
          overall_score: clampedScore,
          recommendation,
        };
      }
    );
  }
};
