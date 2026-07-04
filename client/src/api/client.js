const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || data.errors?.[0]?.msg || 'Request failed');
  return data;
}

export const api = {
  getProfile: () => request('/profile'),
  getProjects: () => request('/projects'),
  submitContact: (body) => request('/contact', { method: 'POST', body: JSON.stringify(body) }),
  health: () => request('/health'),
};
