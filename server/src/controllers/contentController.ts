import { Request, Response } from 'express';
import { MediaItem } from '../models/MediaItem.js';
import { Recommendation } from '../models/Recommendation.js';
import { analyzeContent, generatePersonalizedRecommendations } from '../services/aiService.js';

export const getTrending = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;

    const items = await MediaItem.find()
      .sort({ views: -1, likes: -1 })
      .limit(limit)
      .lean();

    res.json(items);
  } catch (error) {
    console.error('Get trending error:', error);
    res.status(500).json({ error: 'Failed to fetch trending content' });
  }
};

export const search = async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;
    const category = req.query.category as string;
    const type = req.query.type as string;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const filter: any = {};

    if (query) {
      filter.$text = { $search: query };
    }

    if (category) {
      filter.category = category;
    }

    if (type) {
      filter.type = type;
    }

    const total = await MediaItem.countDocuments(filter);
    const results = await MediaItem.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    res.json({
      results,
      total,
      page,
      limit,
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Failed to search' });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const item = await MediaItem.findById(id);
    if (!item) {
      return res.status(404).json({ error: 'Content not found' });
    }

    // Increment views
    item.views += 1;
    await item.save();

    res.json(item);
  } catch (error) {
    console.error('Get by ID error:', error);
    res.status(500).json({ error: 'Failed to fetch content' });
  }
};

export const getRecommendations = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      // Return trending for unauthenticated users
      const trending = await MediaItem.find()
        .sort({ views: -1 })
        .limit(parseInt(req.query.limit as string) || 5)
        .lean();
      return res.json(trending);
    }

    const limit = parseInt(req.query.limit as string) || 5;
    const allContent = await MediaItem.find().lean();

    // Generate recommendations
    const recommendations = await generatePersonalizedRecommendations(
      req.userId,
      ['Technology', 'Entertainment'],
      allContent,
      limit
    );

    res.json(recommendations);
  } catch (error) {
    console.error('Get recommendations error:', error);
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
};

export const getByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const limit = parseInt(req.query.limit as string) || 10;

    const items = await MediaItem.find({ category })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    res.json(items);
  } catch (error) {
    console.error('Get by category error:', error);
    res.status(500).json({ error: 'Failed to fetch content' });
  }
};

export const analyzeContentEndpoint = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const item = await MediaItem.findById(id);
    if (!item) {
      return res.status(404).json({ error: 'Content not found' });
    }

    // Perform AI analysis
    const analysis = await analyzeContent(item.title + ' ' + item.description);

    // Save analysis to database
    item.aiAnalysis = analysis;
    await item.save();

    res.json(analysis);
  } catch (error) {
    console.error('Analyze content error:', error);
    res.status(500).json({ error: 'Failed to analyze content' });
  }
};

export const likeContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const item = await MediaItem.findById(id);
    if (!item) {
      return res.status(404).json({ error: 'Content not found' });
    }

    item.likes += 1;
    await item.save();

    res.json({ success: true, likes: item.likes });
  } catch (error) {
    console.error('Like content error:', error);
    res.status(500).json({ error: 'Failed to like content' });
  }
};

export const createContent = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { title, description, type, url, category, tags, thumbnail } = req.body;

    const item = new MediaItem({
      title,
      description,
      type,
      url,
      category,
      tags: tags || [],
      thumbnail,
      views: 0,
      likes: 0,
    });

    await item.save();

    res.status(201).json(item);
  } catch (error) {
    console.error('Create content error:', error);
    res.status(500).json({ error: 'Failed to create content' });
  }
};

export const updateContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const item = await MediaItem.findByIdAndUpdate(id, updates, { new: true });
    if (!item) {
      return res.status(404).json({ error: 'Content not found' });
    }

    res.json(item);
  } catch (error) {
    console.error('Update content error:', error);
    res.status(500).json({ error: 'Failed to update content' });
  }
};
