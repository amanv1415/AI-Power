// Content and Media types
export interface MediaItem {
  id: string;
  title: string;
  description: string;
  type: 'image' | 'video' | 'article' | 'podcast';
  url: string;
  thumbnail?: string;
  duration?: number;
  views: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  category: string;
  aiAnalysis?: ContentAnalysis;
}

export interface ContentAnalysis {
  sentiment: 'positive' | 'neutral' | 'negative' | 'mixed';
  topics: string[];
  keywordScore: number;
  engagement: number;
  recommendations: string[];
}

export interface Recommendation {
  id: string;
  userId: string;
  contentId: string;
  score: number;
  reason: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  preferences: UserPreferences;
  createdAt: string;
}

export interface UserPreferences {
  categories: string[];
  aiRecommendations: boolean;
  theme: 'light' | 'dark';
}

export interface SearchResult {
  results: MediaItem[];
  total: number;
  Page: number;
  limit: number;
}
