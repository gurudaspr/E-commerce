import mongoose from "mongoose";


const addressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        min: 100000,
        max: 999999,
        required: true
    },

}, { timestamps: true });

const Address = mongoose.model('Address', addressSchema);
export default Address;
