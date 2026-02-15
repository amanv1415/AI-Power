import { Request, Response } from 'express';
import { MediaItem } from '../models/MediaItem.js';
import { User } from '../models/User.js';
import { sendSuccess, sendError, sendCreated, sendNotFound } from '../utils/responseHandler.js';
import { HTTP_STATUS, ERROR_MESSAGES } from '../utils/constants.js';

export const getStats = async (req: Request, res: Response) => {
  try {
    const totalContent = await MediaItem.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalViews = await MediaItem.aggregate([
      { $group: { _id: null, totalViews: { $sum: '$views' } } },
    ]);
    const totalLikes = await MediaItem.aggregate([
      { $group: { _id: null, totalLikes: { $sum: '$likes' } } },
    ]);

    const stats = {
      totalContent,
      totalUsers,
      totalViews: totalViews[0]?.totalViews || 0,
      totalLikes: totalLikes[0]?.totalLikes || 0,
      timestamp: new Date().toISOString(),
    };

    sendSuccess(res, stats);
  } catch (error) {
    console.error('Get stats error:', error);
    sendError(res, ERROR_MESSAGES.INTERNAL_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

export const getContentStats = async (req: Request, res: Response) => {
  try {
    const byType = await MediaItem.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
          totalViews: { $sum: '$views' },
          totalLikes: { $sum: '$likes' },
        },
      },
    ]);

    const byCategory = await MediaItem.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalViews: { $sum: '$views' },
        },
      },
    ]);

    const topContent = await MediaItem.find()
      .sort({ views: -1 })
      .limit(10)
      .select('title views likes type category');

    sendSuccess(res, {
      byType,
      byCategory,
      topContent,
    });
  } catch (error) {
    console.error('Get content stats error:', error);
    sendError(res, ERROR_MESSAGES.INTERNAL_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};
