import { apiUrl } from '../../../services/api';

async function updateProduct(id, data) {
  const response = await fetch(apiUrl(`/admin/${id}`), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || 'Erreur lors de la modification du meuble');
  }

  return responseData;
}

export default updateProduct;
