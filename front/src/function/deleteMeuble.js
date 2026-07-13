import { apiUrl } from '../config/api';

async function deleteMeuble(id) {
  const url = apiUrl(`/admin/${id}`);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
    },
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || 'Erreur lors de la suppression du meuble');
  }

  return responseData;
}
export default deleteMeuble;
