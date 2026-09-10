import React, { useEffect, useState } from 'react';
import { Mic } from 'lucide-react';

interface AudioWaveformProps {
  isRecording: boolean;
  barCount?: number;
}

export const AudioWaveform: React.FC<AudioWaveformProps> = ({
  isRecording,
  barCount = 20,
}) => {
  const [heights, setHeights] = useState<number[]>(new Array(barCount).fill(15));

  useEffect(() => {
    if (!isRecording) {
      setHeights(new Array(barCount).fill(10));
      return;
    }

    const interval = setInterval(() => {
      setHeights(
        Array.from({ length: barCount }, () => Math.floor(Math.random() * 65) + 15)
      );
    }, 90);

    return () => clearInterval(interval);
  }, [isRecording, barCount]);

  return (
    <div className="flex items-center space-x-1 h-8 px-2">
      {heights.map((h, i) => (
        <div
          key={i}
          className={`w-1 rounded-full transition-all duration-75 ${
            isRecording
              ? 'bg-gradient-to-t from-blue-500 to-cyan-400'
              : 'bg-neutral-800'
          }`}
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
};
