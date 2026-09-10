import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Camera, CameraOff, Mic, MicOff, AlertCircle, RefreshCw, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { LiveMonitorResponse } from '../types';

interface LiveCameraStreamProps {
  onFrameCaptured?: (frameBlob: Blob) => void;
  isCapturing?: boolean;
  liveTelemetry?: LiveMonitorResponse | null;
  className?: string;
}

export const LiveCameraStream: React.FC<LiveCameraStreamProps> = ({
  onFrameCaptured,
  isCapturing = true,
  liveTelemetry,
  className = '',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [permissionState, setPermissionState] = useState<'prompt' | 'granted' | 'denied' | 'error'>('prompt');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isVideoEnabled, setIsVideoEnabled] = useState<boolean>(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);

  const startCamera = useCallback(async () => {
    try {
      setPermissionState('prompt');
      setErrorMessage('');

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Browser MediaDevices API is not supported on this device/environment.');
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user',
        },
        audio: true,
      });

      setStream(mediaStream);
      setIsVideoEnabled(true);
      setIsAudioEnabled(true);
      setPermissionState('granted');

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.warn('Camera/Microphone permission error:', err);
      setPermissionState('denied');
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setErrorMessage('Camera and microphone permission was denied in your browser. Please allow permissions in your address bar.');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setErrorMessage('No camera or microphone hardware was detected on this device.');
      } else {
        setErrorMessage(err.message || 'Could not initialize video/audio hardware.');
      }
    }
  }, []);

  useEffect(() => {
    startCamera();

    return () => {
      // Clean cleanup of media tracks
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [startCamera]);

  // Handle stream attach when granted
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream, permissionState]);

  // Throttled frame capture loop (every 1.8 seconds)
  useEffect(() => {
    if (permissionState !== 'granted' || !isCapturing || !isVideoEnabled) return;

    const interval = setInterval(() => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas || video.readyState < 2) return;

      canvas.width = 320;
      canvas.height = 240;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob && onFrameCaptured) {
          onFrameCaptured(blob);
        }
      }, 'image/jpeg', 0.85);
    }, 1800);

    return () => clearInterval(interval);
  }, [permissionState, isCapturing, isVideoEnabled, onFrameCaptured]);

  const toggleVideo = () => {
    if (!stream) return;
    const videoTracks = stream.getVideoTracks();
    if (videoTracks.length > 0) {
      const nextState = !videoTracks[0].enabled;
      videoTracks[0].enabled = nextState;
      setIsVideoEnabled(nextState);
    }
  };

  const toggleAudio = () => {
    if (!stream) return;
    const audioTracks = stream.getAudioTracks();
    if (audioTracks.length > 0) {
      const nextState = !audioTracks[0].enabled;
      audioTracks[0].enabled = nextState;
      setIsAudioEnabled(nextState);
    }
  };

  return (
    <div className={`relative bg-[#080a0f] border border-neutral-800/90 rounded-2xl overflow-hidden flex flex-col justify-between ${className}`}>
      {/* Hidden processing canvas for frame extraction */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Video Viewport */}
      <div className="relative w-full h-full min-h-[260px] flex items-center justify-center bg-black/60 overflow-hidden">
        {permissionState === 'granted' && isVideoEnabled ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover transform -scale-x-100"
            />
            {/* Neural Face Guide Overlay */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="relative w-44 h-56 rounded-3xl border border-dashed border-cyan-400/30 flex items-center justify-center">
                {/* Corner markers */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />

                {/* Sub-label */}
                <div className="absolute -bottom-6 px-2 py-0.5 rounded bg-black/80 border border-neutral-800 text-[10px] font-mono text-cyan-400 tracking-wider">
                  POSE TRACKING ACTIVE
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="p-6 text-center max-w-sm flex flex-col items-center">
            {permissionState === 'denied' ? (
              <>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">Camera Permission Required</h4>
                <p className="text-xs text-neutral-400 mb-4 leading-relaxed">{errorMessage}</p>
                <button
                  type="button"
                  onClick={startCamera}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center space-x-2 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Request Permissions Again</span>
                </button>
              </>
            ) : !isVideoEnabled ? (
              <div className="text-neutral-500 text-xs flex flex-col items-center">
                <CameraOff className="w-8 h-8 mb-2" />
                <span>Camera feed is currently paused</span>
              </div>
            ) : (
              <div className="text-neutral-400 text-xs flex flex-col items-center">
                <RefreshCw className="w-6 h-6 animate-spin text-cyan-400 mb-2" />
                <span>Initializing camera hardware...</span>
              </div>
            )}
          </div>
        )}

        {/* Top Floating Telemetry Pills */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-neutral-800 text-[10px] font-mono text-neutral-200 flex items-center space-x-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${isVideoEnabled && permissionState === 'granted' ? 'bg-emerald-400 animate-pulse' : 'bg-neutral-500'}`} />
              <span>{isVideoEnabled && permissionState === 'granted' ? 'HD RECORDER' : 'OFFLINE'}</span>
            </span>

            {liveTelemetry && (
              <span className="px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-neutral-800 text-[10px] font-mono text-cyan-300">
                Eye: {liveTelemetry.eye_contact}%
              </span>
            )}
          </div>

          <div className="flex items-center space-x-1.5">
            {liveTelemetry && (
              <span className="px-2 py-0.5 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-500/40 text-[10px] font-mono text-blue-300 capitalize">
                {liveTelemetry.emotion}
              </span>
            )}
          </div>
        </div>

        {/* Bottom Hardware Control Bar */}
        <div className="absolute bottom-3 inset-x-3 flex items-center justify-between pointer-events-auto">
          <div className="flex items-center space-x-2 bg-black/80 backdrop-blur-md border border-neutral-800/80 rounded-xl p-1 shadow-lg">
            <button
              type="button"
              onClick={toggleVideo}
              title={isVideoEnabled ? 'Turn camera off' : 'Turn camera on'}
              className={`p-2 rounded-lg text-xs transition-colors ${
                isVideoEnabled ? 'text-neutral-200 hover:bg-neutral-800' : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
              }`}
            >
              {isVideoEnabled ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={toggleAudio}
              title={isAudioEnabled ? 'Mute microphone' : 'Unmute microphone'}
              className={`p-2 rounded-lg text-xs transition-colors ${
                isAudioEnabled ? 'text-neutral-200 hover:bg-neutral-800' : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
              }`}
            >
              {isAudioEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            </button>
          </div>

          <span className="text-[10px] font-mono text-neutral-400 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-neutral-800">
            {isAudioEnabled ? 'MIC ON' : 'MIC MUTED'}
          </span>
        </div>
      </div>
    </div>
  );
};
