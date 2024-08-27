import express from 'express';
import { createCoupon, getCouponByCode, getCouponById } from '../controllers/coupon.controller.js';



const router = express.Router();

router.get('/apply-coupon/:code', getCouponByCode);
router.get('/:id', getCouponById);
router.post('/', createCoupon);

export default router;