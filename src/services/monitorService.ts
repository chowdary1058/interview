import { apiRequest } from './api';
import { LiveMonitorResponse } from '../types';

export const monitorService = {
  async sendLiveFrame(imageBlob: Blob): Promise<LiveMonitorResponse> {
    const formData = new FormData();
    formData.append('file', imageBlob, 'monitor_frame.jpg');

    return apiRequest<LiveMonitorResponse>(
      '/monitor/live',
      {
        method: 'POST',
        body: formData,
      },
      // Intelligent fallback simulator
      () => {
        const jitter = (Math.random() - 0.5) * 4;
        const eyeJitter = (Math.random() - 0.5) * 6;
        return {
          emotion: Math.random() > 0.3 ? 'focused' : 'confident',
          confidence: Math.min(99, Math.max(78, Math.round(88 + jitter))),
          eye_contact: Math.min(100, Math.max(70, Math.round(92 + eyeJitter))),
          head_pose: {
            pitch: parseFloat((1.2 + Math.random() * 2 - 1).toFixed(1)),
            yaw: parseFloat((-0.8 + Math.random() * 3 - 1.5).toFixed(1)),
            roll: parseFloat((0.2 + Math.random() * 1.5 - 0.75).toFixed(1)),
          },
          attention: Math.min(99, Math.max(80, Math.round(94 + jitter * 0.8))),
          face_detected: true,
          timestamp: Date.now(),
        };
      }
    );
  }
};
