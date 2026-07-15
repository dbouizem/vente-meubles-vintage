import { apiUrl } from './api';

const parseResponse = async (response, fallback) => {
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.message || fallback);
  return payload;
};

export async function createOrder(order) {
  const response = await fetch(apiUrl('/orders'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(localStorage.getItem('authToken')
        ? { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        : {}),
    },
    body: JSON.stringify(order),
  });
  return parseResponse(response, 'Impossible de créer la commande.');
}

export async function getOrder(token) {
  const response = await fetch(apiUrl(`/orders/${token}`));
  return parseResponse(response, 'Commande introuvable.');
}
