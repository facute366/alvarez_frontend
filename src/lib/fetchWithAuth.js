export default async function fetchWithAuth(url, options = {}) {
  const token = localStorage.getItem('authToken');
  if (!token) throw new Error('Token not found');

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = headers['Content-Type'] || 'application/json';
  }

  const res = await fetch(url, { ...options, headers });
  let data = null;
  try { data = await res.json(); } catch {}
  return { ok: res.ok, status: res.status, data };
}
