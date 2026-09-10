import React from 'react';
import { motion } from 'motion/react';
import { Smile, Zap, Eye, Compass, HeartPulse } from 'lucide-react';

interface EmotionVisualizerProps {
  dominantEmotion: string;
  scores?: Record<string, number>;
  compact?: boolean;
}

export const EmotionVisualizer: React.FC<EmotionVisualizerProps> = ({
  dominantEmotion = 'calm',
  scores = { confident: 0.88, calm: 0.82, focused: 0.91, neutral: 0.75 },
  compact = false,
}) => {
  const emotionColorMap: Record<string, { bg: string; text: string; border: string; glow: string }> = {
    confident: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', glow: 'shadow-emerald-500/20' },
    focused: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30', glow: 'shadow-cyan-500/20' },
    calm: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30', glow: 'shadow-blue-500/20' },
    thoughtful: { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/30', glow: 'shadow-indigo-500/20' },
    neutral: { bg: 'bg-neutral-800/40', text: 'text-neutral-300', border: 'border-neutral-700', glow: 'shadow-neutral-500/10' },
    nervous: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30', glow: 'shadow-amber-500/20' },
  };

  const currentTheme = emotionColorMap[dominantEmotion.toLowerCase()] || emotionColorMap.calm;

  return (
    <div className={`rounded-xl border ${currentTheme.border} ${currentTheme.bg} p-3.5 transition-all`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <HeartPulse className={`w-4 h-4 ${currentTheme.text} animate-pulse`} />
          <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
            Emotion State
          </span>
        </div>
        <span className={`text-xs font-bold capitalize px-2 py-0.5 rounded-md border ${currentTheme.border} ${currentTheme.text}`}>
          {dominantEmotion}
        </span>
      </div>

      {!compact && scores && (
        <div className="space-y-1.5 mt-3 pt-2.5 border-t border-neutral-800/60">
          {Object.entries(scores).map(([emo, val]) => {
            const pct = Math.round(val * 100);
            return (
              <div key={emo} className="space-y-0.5">
                <div className="flex justify-between text-[11px] text-neutral-400 capitalize">
                  <span>{emo}</span>
                  <span className="font-mono text-neutral-300">{pct}%</span>
                </div>
                <div className="w-full h-1 bg-neutral-900 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className={`h-full rounded-full ${
                      emo.toLowerCase() === dominantEmotion.toLowerCase()
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-400'
                        : 'bg-neutral-700'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
