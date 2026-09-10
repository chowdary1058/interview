/**
 * Centralized API client for Interview Pro AI
 * Communicates with FastAPI backend using VITE_API_BASE_URL
 */

const DEFAULT_BACKEND_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8000';

export function getApiBaseUrl(): string {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('interview_pro_api_url');
    if (saved) return saved.trim().replace(/\/$/, '');
  }
  return DEFAULT_BACKEND_URL.replace(/\/$/, '');
}

export function setApiBaseUrl(url: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('interview_pro_api_url', url.trim().replace(/\/$/, ''));
  }
}

let isBackendReachable = false;
let lastCheckTime = 0;

export async function checkBackendHealth(): Promise<boolean> {
  const now = Date.now();
  if (now - lastCheckTime < 10000 && lastCheckTime !== 0) {
    return isBackendReachable;
  }
  const baseUrl = getApiBaseUrl();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(`${baseUrl}/docs`, {
      method: 'GET',
      signal: controller.signal,
      mode: 'cors'
    }).catch(() => null);
    clearTimeout(timeoutId);
    isBackendReachable = Boolean(res && (res.ok || res.status < 500));
  } catch {
    isBackendReachable = false;
  }
  lastCheckTime = now;
  return isBackendReachable;
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  fallbackFn?: () => Promise<T> | T
): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const headers: Record<string, string> = {
      ...(options.headers as Record<string, string> || {}),
    };

    // Don't set Content-Type if sending FormData (browser adds boundary automatically)
    if (!(options.body instanceof FormData) && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    const res = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      const errorText = await res.text().catch(() => '');
      throw new Error(`API Error ${res.status}: ${errorText || res.statusText}`);
    }

    isBackendReachable = true;
    return await res.json();
  } catch (err: any) {
    // If backend is down or network failed and fallback is provided, use fallback seamlessly
    console.warn(`FastAPI backend unreachable at ${url} (${err?.message || 'NetworkError'}).`);
    if (fallbackFn) {
      console.info(`[Interview Pro AI] Running in realistic simulation mode for endpoint ${endpoint}`);
      return await fallbackFn();
    }
    throw err;
  }
}
