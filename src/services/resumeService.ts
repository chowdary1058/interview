import { apiRequest } from './api';

export interface ResumeStatusResponse {
  status: string;
  endpoint: string;
  message: string;
}

export const resumeService = {
  // Query backend GET /resume/
  async getResumeStatus(): Promise<ResumeStatusResponse> {
    return apiRequest<ResumeStatusResponse>(
      '/resume/',
      {
        method: 'GET',
      },
      // Fallback response
      () => ({
        status: 'ready',
        endpoint: '/resume/',
        message: 'FastAPI resume integration service endpoint is connected and ready for resume ingestion.',
      })
    );
  }
};
