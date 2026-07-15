import { apiUrl } from './api';

const headers = (json = false) => ({
  ...(json ? { 'Content-Type': 'application/json' } : {}),
  Authorization: `Bearer ${localStorage.getItem('authToken')}`,
});
const parse = async (response) => {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || 'La requête a échoué.');
  return data;
};
export const getProfile = () =>
  fetch(apiUrl('/account/profile'), { headers: headers() }).then(parse);
export const updateProfile = (data) =>
  fetch(apiUrl('/account/profile'), {
    method: 'PUT',
    headers: headers(true),
    body: JSON.stringify(data),
  }).then(parse);
export const getAccountOrders = () =>
  fetch(apiUrl('/account/orders'), { headers: headers() }).then(parse);
export const getFavorites = () =>
  fetch(apiUrl('/account/favorites'), { headers: headers() }).then(parse);
export const addFavorite = (id) =>
  fetch(apiUrl(`/account/favorites/${id}`), { method: 'POST', headers: headers() }).then(parse);
export const removeFavorite = (id) =>
  fetch(apiUrl(`/account/favorites/${id}`), { method: 'DELETE', headers: headers() }).then(parse);
