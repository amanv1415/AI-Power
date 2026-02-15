import { Schema, model, Document } from 'mongoose';
import { IMediaItem } from '../types/index.js';

const contentAnalysisSchema = new Schema({
  sentiment: { type: String, enum: ['positive', 'neutral', 'negative', 'mixed'] },
  topics: [String],
  keywordScore: Number,
  engagement: Number,
  recommendations: [String],
});

const mediaItemSchema = new Schema<IMediaItem & Document>(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    description: String,
    type: {
      type: String,
      required: true,
      enum: ['image', 'video', 'article', 'podcast'],
    },
    url: {
      type: String,
      required: true,
    },
    thumbnail: String,
    duration: Number,
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    tags: [String],
    category: {
      type: String,
      required: true,
      index: true,
    },
    aiAnalysis: contentAnalysisSchema,
  },
  { timestamps: true }
);

mediaItemSchema.index({ title: 'text', description: 'text' });
mediaItemSchema.index({ category: 1, createdAt: -1 });

export const MediaItem = model<IMediaItem & Document>('MediaItem', mediaItemSchema);
