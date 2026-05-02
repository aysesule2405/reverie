// API client — thin wrapper around fetch
// Automatically attaches the JWT Authorization header from localStorage.
// For JSON requests, sets Content-Type automatically.
// For FormData requests, leaves Content-Type unset so the browser can
// add the correct multipart boundary itself.

const API_BASE = (import.meta as any).env?.VITE_API_BASE || '/api';

type ReqOptions = RequestInit & { headers?: Record<string, string> };

async function request(path: string, options: ReqOptions = {}) {
  const headers: Record<string, string> = { ...(options.headers || {}) };

  // Always attach the Bearer token if one is stored
  const token = localStorage.getItem('token');
  if (token) headers['Authorization'] = `Bearer ${token}`;

  // Only set JSON content type when the body is NOT a FormData instance.
  // For FormData the browser must set Content-Type itself (it adds the boundary).
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  const text = await res.text();
  let data: any = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    const message = data?.message ?? 'API error';
    const err: any = new Error(message);
    err.status = res.status;
    throw err;
  }

  return data;
}

export const api = {
  // JSON requests
  get:  (path: string)              => request(path, { method: 'GET' }),
  post: (path: string, body?: any)  => request(path, { method: 'POST', body: JSON.stringify(body) }),
  put:  (path: string, body?: any)  => request(path, { method: 'PUT',  body: JSON.stringify(body) }),
  del:  (path: string)              => request(path, { method: 'DELETE' }),

  // FormData requests (file uploads) — body is passed through as-is
  postForm: (path: string, form: FormData) => request(path, { method: 'POST', body: form }),
  putForm:  (path: string, form: FormData) => request(path, { method: 'PUT',  body: form }),
};
