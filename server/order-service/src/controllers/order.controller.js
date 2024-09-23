import razorpayInstance from "../config/razorpay.js";
import crypto from 'crypto';
import 'dotenv/config';


export const createOrder = async (req, res) => {
    console.log("hitting createOrder");

    try {
        const { amount } = req.body;
        const options = {
            amount: amount * 100, // Razorpay expects amount in paisa
            currency: 'INR',
            receipt: 'receipt_' + Math.random().toString(36).substring(7),
        };

        const order = await razorpayInstance.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const body = razorpay_order_id + '|' + razorpay_payment_id;
        console.log(body,'body');
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_SECRET)
            .update(body.toString())
            .digest('hex');
        if (expectedSignature === razorpay_signature) {
            // Payment is successful
            console.log("Payment is successful");
            res.json({ success: true, message: 'Payment verified successfully' });
        } else {
            // Payment verification failed
            console.log("Payment verification failed");
            res.status(400).json({ success: false, message: 'Invalid signature' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }

}