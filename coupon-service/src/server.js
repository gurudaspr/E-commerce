import express from 'express';
import 'dotenv/config';
import connectDB from './config/db.js';
import couponRoutes from './routes/coupon.routes.js';

const app = express();
app.use(express.json());

app.use('/api/v1/coupons', couponRoutes);
app.use('/', (req, res) => {
    res.send('coupon service is running');
});

connectDB();
app.listen(process.env.PORT || 5006, () => {
    console.log(`coupon service running on port ${process.env.PORT || 5006}`);
});


