import express from 'express';
import { addReview, getReviewsByProductId } from '../controllers/review.controller.js';

const router = express.Router();

router.post('/add', addReview);
router.get('/product/:productId', getReviewsByProductId);

export default router;