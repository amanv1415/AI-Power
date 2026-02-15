import { Schema, model, Document } from 'mongoose';
import { IUser } from '../types/index.js';

const userSchema = new Schema<IUser & Document>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: String,
    preferences: {
      categories: [String],
      aiRecommendations: { type: Boolean, default: true },
      theme: { type: String, enum: ['light', 'dark'], default: 'light' },
    },
  },
  { timestamps: true }
);

userSchema.pre('save', function (next) {
  // Note: Password hashing will be done in the controller
  next();
});

export const User = model<IUser & Document>('User', userSchema);
