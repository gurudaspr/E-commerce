import express from 'express';
import {createCoupon, getCouponByCode } from  '../controllers/coupon.controller.js';



const router = express.Router();

router.get('/:code', getCouponByCode);
router.post('/', createCoupon);

export default router;