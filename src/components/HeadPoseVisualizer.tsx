import React from 'react';
import { HeadPose } from '../types';
import { Compass, Eye, Crosshair } from 'lucide-react';

interface HeadPoseVisualizerProps {
  headPose: HeadPose;
  eyeContact: number;
  attention: number;
  faceDetected: boolean;
}

export const HeadPoseVisualizer: React.FC<HeadPoseVisualizerProps> = ({
  headPose = { pitch: 0, yaw: 0, roll: 0 },
  eyeContact = 90,
  attention = 92,
  faceDetected = true,
}) => {
  // Map yaw (-30 to +30) and pitch (-30 to +30) to percentage offset in the crosshair circle
  const clampedYaw = Math.max(-25, Math.min(25, headPose.yaw));
  const clampedPitch = Math.max(-25, Math.min(25, headPose.pitch));
  const offsetX = (clampedYaw / 25) * 22; // px
  const offsetY = (clampedPitch / 25) * 22; // px

  return (
    <div className="bg-[#090b10] border border-neutral-800/90 rounded-xl p-3.5 text-neutral-300">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2 text-xs font-semibold text-neutral-300 uppercase tracking-wider">
          <Compass className="w-4 h-4 text-cyan-400" />
          <span>Spatial & Attention</span>
        </div>
        <div className="flex items-center space-x-1.5 font-mono text-[10px]">
          <span className={`w-1.5 h-1.5 rounded-full ${faceDetected ? 'bg-emerald-400' : 'bg-red-500'}`} />
          <span className={faceDetected ? 'text-emerald-400' : 'text-red-400'}>
            {faceDetected ? 'Face Locked' : 'Searching Face'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-2">
        {/* Gimbal crosshair */}
        <div className="relative h-24 bg-neutral-950/80 border border-neutral-900 rounded-lg flex items-center justify-center overflow-hidden">
          {/* Grid lines */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-[1px] bg-neutral-800/80" />
            <div className="h-full w-[1px] bg-neutral-800/80 absolute" />
          </div>
          {/* Target bounds */}
          <div className="w-12 h-12 rounded-full border border-dashed border-neutral-700/60" />

          {/* Dynamic head pose dot */}
          <div
            className="absolute w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] transition-all duration-300 ease-out border border-white"
            style={{
              transform: `translate(${offsetX}px, ${offsetY}px)`,
            }}
          />

          <div className="absolute bottom-1 right-1.5 text-[9px] font-mono text-neutral-400">
            P:{headPose.pitch}° Y:{headPose.yaw}°
          </div>
        </div>

        {/* Eye contact & Attention stats */}
        <div className="flex flex-col justify-between py-1 text-xs space-y-2">
          <div>
            <div className="flex justify-between text-[11px] text-neutral-400 mb-0.5">
              <span className="flex items-center space-x-1">
                <Eye className="w-3 h-3 text-blue-400" />
                <span>Eye Contact</span>
              </span>
              <span className="font-mono text-neutral-200">{eyeContact}%</span>
            </div>
            <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500"
                style={{ width: `${eyeContact}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] text-neutral-400 mb-0.5">
              <span className="flex items-center space-x-1">
                <Crosshair className="w-3 h-3 text-indigo-400" />
                <span>Attention</span>
              </span>
              <span className="font-mono text-neutral-200">{attention}%</span>
            </div>
            <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-400 rounded-full transition-all duration-500"
                style={{ width: `${attention}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
