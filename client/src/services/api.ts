import axios from 'axios';
import { API_BASE_URL } from '@/utils/constants';
import { MediaItem, SearchResult, ContentAnalysis } from '@/types';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const contentService = {
  // Get trending content
  getTrending: async (limit = 10) => {
    const response = await api.get<MediaItem[]>('/content/trending', { params: { limit } });
    return response.data;
  },

  // Search content
  search: async (query: string, filters?: Record<string, any>) => {
    const response = await api.get<SearchResult>('/content/search', {
      params: { q: query, ...filters },
    });
    return response.data;
  },

  // Get content by ID
  getById: async (id: string) => {
    const response = await api.get<MediaItem>(`/content/${id}`);
    return response.data;
  },

  // Get recommendations
  getRecommendations: async (limit = 5) => {
    const response = await api.get<MediaItem[]>('/content/recommendations', {
      params: { limit },
    });
    return response.data;
  },

  // Create content
  create: async (data: Partial<MediaItem>) => {
    const response = await api.post<MediaItem>('/content', data);
    return response.data;
  },

  // Update content
  update: async (id: string, data: Partial<MediaItem>) => {
    const response = await api.put<MediaItem>(`/content/${id}`, data);
    return response.data;
  },

  // Get AI Analysis
  analyzeContent: async (id: string) => {
    const response = await api.post<ContentAnalysis>(`/content/${id}/analyze`, {});
    return response.data;
  },

  // Like content
  like: async (id: string) => {
    const response = await api.post(`/content/${id}/like`, {});
    return response.data;
  },

  // Get by category
  getByCategory: async (category: string, limit = 10) => {
    const response = await api.get<MediaItem[]>('/content/category/' + category, {
      params: { limit },
    });
    return response.data;
  },
};

export const authService = {
  // Sign up
  signup: async (email: string, password: string, username: string) => {
    const response = await api.post('/auth/signup', { email, password, username });
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    return response.data;
  },

  // Sign in
  signin: async (email: string, password: string) => {
    const response = await api.post('/auth/signin', { email, password });
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
  },

  // Get profile
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};

export default api;
