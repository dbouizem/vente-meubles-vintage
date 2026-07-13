const API_HOST = import.meta.env.VITE_HOST || 'http://localhost';
const API_PORT = import.meta.env.VITE_PORT || '3000';

export const API_BASE_URL = `${API_HOST}:${API_PORT}`;

export const apiUrl = (path) => `${API_BASE_URL}${path}`;

export const imageUrl = (filename) => apiUrl(`/images/${filename}`);
