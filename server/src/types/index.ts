export interface IUser {
  _id?: string;
  email: string;
  username: string;
  password: string;
  avatar?: string;
  preferences: {
    categories: string[];
    aiRecommendations: boolean;
    theme: 'light' | 'dark';
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IMediaItem {
  _id?: string;
  title: string;
  description: string;
  type: 'image' | 'video' | 'article' | 'podcast';
  url: string;
  thumbnail?: string;
  duration?: number;
  views: number;
  likes: number;
  createdAt?: Date;
  updatedAt?: Date;
  tags: string[];
  category: string;
  aiAnalysis?: IContentAnalysis;
}

export interface IContentAnalysis {
  sentiment: 'positive' | 'neutral' | 'negative' | 'mixed';
  topics: string[];
  keywordScore: number;
  engagement: number;
  recommendations: string[];
}

export interface IRecommendation {
  _id?: string;
  userId: string;
  contentId: string;
  score: number;
  reason: string;
  createdAt?: Date;
}

export interface AuthPayload {
  userId: string;
  email: string;
}
