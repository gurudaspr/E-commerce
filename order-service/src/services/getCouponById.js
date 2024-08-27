import axios from 'axios';

async function getCouponById(id) {
    try {
        const response = await axios.get(`${process.env.COUPON_SERVICE_URL}/api/v1/coupons/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching coupon details:', error);
        return null;
    }
}

export default getCouponById;