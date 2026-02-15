import { validationResult, body, param, query } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateSignup = [
  body('email').isEmail().normalizeEmail(),
  body('username').isLength({ min: 3, max: 30 }).trim().escape(),
  body('password').isLength({ min: 6 }),
  handleValidationErrors,
];

export const validateSignin = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
  handleValidationErrors,
];

export const validateContentCreation = [
  body('title').isLength({ min: 5, max: 200 }).trim().escape(),
  body('description').optional().trim().escape(),
  body('type').isIn(['image', 'video', 'article', 'podcast']),
  body('category').notEmpty().trim(),
  body('url').isURL(),
  body('tags').optional().isArray(),
  handleValidationErrors,
];

export const validateSearch = [
  query('q').optional().trim().escape(),
  query('category').optional().trim(),
  query('type').optional().isIn(['image', 'video', 'article', 'podcast']),
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
  handleValidationErrors,
];

export const validateContentId = [
  param('id').isMongoId(),
  handleValidationErrors,
];

function handleValidationErrors(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}
