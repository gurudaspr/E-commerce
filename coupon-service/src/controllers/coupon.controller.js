import Coupon from "../models/coupon.model.js";



export async function createCoupon(req, res) {
    const {code, discountType, discountValue, expiryDate, minimumOrderAmount} = req.body;
    try {
        if(!code || !discountType || !discountValue || !expiryDate || !minimumOrderAmount) {
            return res.status(400).json({message: 'All fields are required'});
        }
        const coupon = new Coupon({
            code,
            discountType,
            discountValue,
            expiryDate,
            minimumOrderAmount
        });
        await coupon.save();
        return res.status(201).json(coupon);
        
    } catch (error) {
        console.error('Error creating coupon:', error.message);
        return res.status(500).json({message: 'Internal server error'});
        
    }
}

export async function getCouponByCode(req, res) {
    const {code} = req.params;
    try {
        const coupon = await Coupon.findOne({code});
        if (!coupon) {
            return res.status(404).json({message: 'Coupon not found'});
        }
        return res.status(200).json(coupon);
    } catch (error) {
        console.error('Error getting coupon by code:', error.message);
        return res.status(500).json({message: 'Internal server error'});
    }
}