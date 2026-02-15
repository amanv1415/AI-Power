import { Schema, model, Document } from 'mongoose';
import { IRecommendation } from '../types/index.js';

const recommendationSchema = new Schema<IRecommendation & Document>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    contentId: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 1,
    },
    reason: String,
  },
  { timestamps: true }
);

recommendationSchema.index({ userId: 1, createdAt: -1 });

export const Recommendation = model<IRecommendation & Document>('Recommendation', recommendationSchema);
