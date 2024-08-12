import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import 'dotenv/config'

const app = express();

//proxy middleware
const authProxy = createProxyMiddleware({ target: process.env.AUTH_SERVICE_URL, changeOrigin: true });
const userProxy = createProxyMiddleware({ target: process.env.USER_SERVICE_URL, changeOrigin: true });
const productProxy = createProxyMiddleware({ target: process.env.PRODUCT_SERVICE_URL, changeOrigin: true });
const orderProxy = createProxyMiddleware({ target: process.env.ORDER_SERVICE_URL, changeOrigin: true });
const couponProxy = createProxyMiddleware({ target: process.env.COUPON_SERVICE_URL, changeOrigin: true });
const adminProxy = createProxyMiddleware({ target: process.env.ADMIN_SERVICE_URL, changeOrigin: true });


//proxy routes

app.use('/auth', authProxy);
app.use('/users', userProxy);
app.use('/products', productProxy);
app.use('/orders', orderProxy);
app.use('/coupons', couponProxy);
app.use('/admin', adminProxy);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`API Gateway running on port${PORT}`);
});