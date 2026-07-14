import { apiUrl } from './api';

async function parseResponse(response, fallbackMessage) {
  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.message || fallbackMessage);
  }

  return response.json();
}

export async function getProducts() {
  const response = await fetch(apiUrl('/meubles'));
  return parseResponse(response, 'Impossible de charger les produits.');
}

export async function getProduct(id) {
  const response = await fetch(apiUrl(`/meubles/${id}`));
  const products = await parseResponse(response, 'Produit introuvable.');
  return products[0] ?? null;
}

const adminHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
});

export async function getAdminProducts() {
  const response = await fetch(apiUrl('/admin/products'), { headers: adminHeaders() });
  return parseResponse(response, 'Impossible de charger les produits.');
}

export async function getAdminProduct(id) {
  const response = await fetch(apiUrl(`/admin/products/${id}`), { headers: adminHeaders() });
  return parseResponse(response, 'Produit introuvable.');
}
