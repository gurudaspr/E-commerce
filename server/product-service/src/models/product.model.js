import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    image: {
        type: String,
        required: true
    },
    averageRating: {
        type: Number,
        default: 0,
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;