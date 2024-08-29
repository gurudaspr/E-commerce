import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true
    },
    discountType: {
        type: String,
        enum: ['percentage', 'fixed'],
        required: true
    },
    discountValue: {
        type: Number,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    minimumOrderAmount: {
        type: Number,
        default: 0
    }
});

const Coupon = mongoose.model('Coupon', couponSchema);
export default Coupon;