import { Router } from 'express';
import * as contentController from '../controllers/contentController.js';
import { authMiddleware } from '../middleware/auth.js';
import { 
  validateContentCreation, 
  validateSearch, 
  validateContentId 
} from '../middleware/validation.js';

const router = Router();

router.get('/trending', contentController.getTrending);
router.get('/search', validateSearch, contentController.search);
router.get('/recommendations', contentController.getRecommendations);
router.get('/category/:category', contentController.getByCategory);
router.get('/:id', validateContentId, contentController.getById);
router.post('/:id/analyze', authMiddleware, validateContentId, contentController.analyzeContentEndpoint);
router.post('/:id/like', validateContentId, contentController.likeContent);
router.post('/', authMiddleware, validateContentCreation, contentController.createContent);
router.put('/:id', authMiddleware, validateContentId, contentController.updateContent);

export default router;
