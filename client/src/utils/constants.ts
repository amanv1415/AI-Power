export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const CATEGORIES = [
  'Technology',
  'Entertainment',
  'Education',
  'News',
  'Sports',
  'Music',
  'Business',
  'Health',
];

export const CONTENT_TYPES = [
  { value: 'image', label: 'Image' },
  { value: 'video', label: 'Video' },
  { value: 'article', label: 'Article' },
  { value: 'podcast', label: 'Podcast' },
];

export const SENTIMENT_COLORS: Record<string, string> = {
  positive: '#10b981',
  neutral: '#6b7280',
  negative: '#ef4444',
  mixed: '#f59e0b',
};
