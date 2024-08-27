import mongoose from 'mongoose';


const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cartItems: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            default : 1
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
});

const Cart =  mongoose.model('cart', cartSchema);
export default Cart;