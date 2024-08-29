import axios from 'axios';

async function getCouponByCode(couponCode) {
    try {
        const response = await axios.get(`${process.env.COUPON_SERVICE_URL}/api/v1/coupons/apply-coupon/${couponCode}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching coupon details:', error);
        return null;
    }
}

export default getCouponByCode;