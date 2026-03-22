// Simple API client wrapper
// Use VITE_API_BASE if provided, otherwise default to '/api' so Vite proxy or absolute URL works
const API_BASE = (import.meta as any).env?.VITE_API_BASE || '/api';

type ReqOptions = RequestInit & { headers?: Record<string, string> };

async function request(path: string, options: ReqOptions = {}) {
  const headers: Record<string, string> = options.headers || {};
  const token = localStorage.getItem('token');
  if (token) headers['Authorization'] = `Bearer ${token}`;
  if (!headers['Content-Type']) headers['Content-Type'] = 'application/json';

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const text = await res.text();
  let data: any = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (e) {
    data = text;
  }
  if (!res.ok) {
    const message = data && data.message ? data.message : 'API error';
    const err: any = new Error(message);
    err.status = res.status;
    throw err;
  }
  return data;
}

export const api = {
  post: (path: string, body?: any) => request(path, { method: 'POST', body: JSON.stringify(body) }),
  put: (path: string, body?: any) => request(path, { method: 'PUT', body: JSON.stringify(body) }),
  del: (path: string) => request(path, { method: 'DELETE' }),
  get: (path: string) => request(path, { method: 'GET' })
};
