import { apiUrl } from './api';

async function postCredentials(path, credentials) {
  const response = await fetch(apiUrl(path), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) throw new Error(payload.message || 'La requête a échoué.');
  return payload;
}

export const login = (credentials) => postCredentials('/login', credentials);
export const signup = (credentials) => postCredentials('/signup', credentials);
