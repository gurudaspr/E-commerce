import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
        enum: ['pending ,confirmed', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
        required: true
    }

}, { timestamps: true });

// Middleware to calculate totalPrice
orderSchema.pre('save', async function (next) {
    const itemsTotal = this.items.reduce((total, item) => total + (item.price * item.quantity), 0);

    if (this.coupon) {
        const coupon = await Coupon.findById(this.coupon);
        
        if (coupon && coupon.expiryDate >= new Date()) {
            if (coupon.discountType === 'percentage') {
                this.totalPrice = itemsTotal * (1 - coupon.discountValue / 100);
            } else if (coupon.discountType === 'fixed') {
                this.totalPrice = Math.max(itemsTotal - coupon.discountValue, 0);
            }
        } else {
            this.totalPrice = itemsTotal;
        }
    } else {
        this.totalPrice = itemsTotal;
    }

    next();
});
const Order = mongoose.model('order', orderSchema);
export default Order;