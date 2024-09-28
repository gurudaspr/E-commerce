import express from 'express';
import { addReview, getReviewsByProductId } from '../controllers/review.controller.js';

const router = express.Router();

router.post('/', addReview);
router.get('/:productId/reviews', getReviewsByProductId);   

export default router;