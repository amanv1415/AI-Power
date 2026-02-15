import { create } from 'zustand';
import { MediaItem, User } from '@/types';

interface ContentStore {
  trendingContent: MediaItem[];
  recommendations: MediaItem[];
  searchResults: MediaItem[];
  selectedContent: MediaItem | null;
  loading: boolean;
  error: string | null;
  setTrendingContent: (content: MediaItem[]) => void;
  setRecommendations: (content: MediaItem[]) => void;
  setSearchResults: (content: MediaItem[]) => void;
  setSelectedContent: (content: MediaItem | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useContentStore = create<ContentStore>((set) => ({
  trendingContent: [],
  recommendations: [],
  searchResults: [],
  selectedContent: null,
  loading: false,
  error: null,
  setTrendingContent: (content) => set({ trendingContent: content }),
  setRecommendations: (content) => set({ recommendations: content }),
  setSearchResults: (content) => set({ searchResults: content }),
  setSelectedContent: (content) => set({ selectedContent: content }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: localStorage.getItem('authToken'),
  isAuthenticated: !!localStorage.getItem('authToken'),
  loading: false,
  setUser: (user) => set({ user }),
  setToken: (token) => {
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
    set({ token, isAuthenticated: !!token });
  },
  setLoading: (loading) => set({ loading }),
  logout: () => {
    localStorage.removeItem('authToken');
    set({ user: null, token: null, isAuthenticated: false });
  },
}));
