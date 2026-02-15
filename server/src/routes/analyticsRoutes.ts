import { Router } from 'express';
import * as analyticsController from '../controllers/analyticsController.js';

const router = Router();

router.get('/stats', analyticsController.getStats);
router.get('/content-stats', analyticsController.getContentStats);

export default router;
