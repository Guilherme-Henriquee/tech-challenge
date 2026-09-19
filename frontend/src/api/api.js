import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
});

// Anexa o token JWT (se existir) em toda requisicao
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('blog_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const PostsAPI = {
  list: () => api.get('/posts').then((r) => r.data),
  search: (q) => api.get('/posts/search', { params: { q } }).then((r) => r.data),
  get: (id) => api.get(`/posts/${id}`).then((r) => r.data),
  create: (data) => api.post('/posts', data).then((r) => r.data),
  update: (id, data) => api.put(`/posts/${id}`, data).then((r) => r.data),
  remove: (id) => api.delete(`/posts/${id}`),
};

export const AuthAPI = {
  login: (credentials) => api.post('/auth/login', credentials).then((r) => r.data),
  register: (data) => api.post('/auth/register', data).then((r) => r.data),
};

export default api;
